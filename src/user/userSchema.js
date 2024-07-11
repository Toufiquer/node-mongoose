const mongoose = require('mongoose')
const validator = require('validator')
const { encryptPassword } = require('../../utils/passwordCryptr')

const { ObjectId } = mongoose.Schema.Types

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      unique: [true, 'User already exists'],
      lowercase: true,
      required: [true, 'Email is required'],
      validator: [validator.isEmail, 'Please provide a valid email'],
    },
    pass: { type: String, required: [true, 'Please provide a valid password'] },
    status: {
      type: String,
      enum: ['active', 'inactive', 'block'],
      default: 'active',
    },
    name: {
      type: String,
      trim: true,
      lowercase: true,
      minLength: [3, 'Name must be at least 3 characters'],
      maxLength: [100, 'Name is too large, max characters 100'],
    },
    bio: { type: String },
    imageURL: [
      {
        type: String,
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
    contactNumber: [
      {
        type: String,
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
    },
    presentAddress: {
      type: String,
    },
    permanentAddress: {
      type: String,
    },
    role: {
      type: String,
      lowercase: true,
      enum: {
        values: [
          'owner',
          'admin',
          'manager',
          'account manager',
          'delivery boy',
          'web-editor',
          'customer',
        ],
        message: '{Value} is not a valid role!',
      },
    },
    location: {
      type: String,
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
    passChangedAt: Date,
    passResetToken: String,
    passResetExpires: Date,
  },
  { timestamps: true }
)

// ! Only invoke when user is created
// Simplified pre-save middleware to update for encrypted passwords
userSchema.pre('save', function (next) {
  if (this.pass) {
    const enCryptPass = encryptPassword(this.pass)
    this.pass = enCryptPass
  }
  next()
})

const User = mongoose.model('User', userSchema)
module.exports = User
