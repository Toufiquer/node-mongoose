const mongoose = require('mongoose')
const validator = require('validator')

const { ObjectId } = mongoose.Schema.Types

const supplierSchema = mongoose.Schema(
  {
    email: {
      type: String,
      lowercase: true,
      validator: [validator.isEmail, 'Please provide a valid email'],
    },

    website: {
      type: String,
      validator: [validator.isURL, 'Please provide a valid url'],
    },

    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },


    name: {
      type: String,
      required: [true, 'Please provide a valid stock name'],
      trim: true,
      unique: [true, 'Please provide a valid stock name'],
      lowercase: true,
      minLength: [3, 'Name must be at least 3 characters'],
      maxLength: [100, 'Name is too large, max characters 100'],
    },

    description: { type: String, required: true },


    imageURL: [
      {
        type: String,
        required: true,
        validator: {
          validator: (value) => {
            if (!Array.isArray(value)) {
              return false
            }
            let isValid = true
            value.forEach((url) => {
              if (!validator.isURL(url)) {
                isValid = false
              }
            })
            return isValid
          },
          message: 'Please provide a valid image URL',
        },
      },
    ],


    brand: {
      name: { type: String, required: true },
      id: { type: ObjectId, ref: 'Brand', required: true },
    },





    manager: {
      name: String,
      description: String,
      contactNumber: String,
      id: { type: ObjectId, ref: 'User' },
    },

    contactNumber: [
      {
        type: String,
        require: [true, 'Please provide a valid contact number'],
        validator: {
          validator: (value) => {
            return validator.isMobilePhone(value)
          },
          message: 'Please provide a valid contact number',
        },
      },
    ],

    emergencyContactNumber: [
      {
        type: String,
        require: [true, 'Please provide a valid contact number'],
        validator: {
          validator: (value) => {
            return validator.isMobilePhone(value)
          },
          message: 'Please provide a valid contact number',
        },
      },
    ],

    tradeLicenseNumber: {
      type: Number,
      require: [true, 'Please provide a valid trade license number'],
    },

    presentAddress: {
      type: String,
      required: [true, 'Please provide a valid address'],
    },

    permanentAddress: {
      type: String,
      required: [true, 'Please provide a valid address'],
    },

    location: {
      type: String,
      required: [true, 'Please provide a valid location.'],
      lowercase: true,
      enum: {
        values: [
          'dhaka',
          'chattogram',
          'rajshahi',
          'sylhet',
          'khulna',
          'barishal',
          'rangpur',
          'mymensingh',
        ],
        message: '{Value} is not a valid division!',
      },
    },

    nationalIdImageURL: [
      {
        type: String,
        required: true,
        validator: {
          validator: (value) => {
            if (!Array.isArray(value)) {
              return false
            }
            let isValid = true
            value.forEach((url) => {
              if (!validator.isURL(url)) {
                isValid = false
              }
            })
            return isValid
          },
          message: 'Please provide a valid image URL',
        },
      },
    ],
  },
  { timestamps: true }
)

// Simplified pre-save middleware to update status based on quantity
supplierSchema.pre('save', function (next) {
  if (this.quantity === 0) {
    this.status = 'out-of-stock'
  } else if (this.quantity > 0 && this.status === 'out-of-stock') {
    this.status = 'in-stock'
  }
  next()
})

const Supplier = mongoose.model('Supplier', supplierSchema)
module.exports = Supplier
