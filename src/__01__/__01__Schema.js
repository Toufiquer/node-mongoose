const mongoose = require('mongoose')
const validator = require('validator')

const { ObjectId } = mongoose.Schema.Types

const __01__Schema = mongoose.Schema(
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
    products: [{ type: ObjectId, ref: 'Product' }],
    suppliers: [
      {
        name: String,
        contactNumber: String,
        supplierId: { type: ObjectId, ref: 'Supplier' },
      },
    ],
    workStatus: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ['in-stock', 'out-of-stock', 'discontinued'],
        message: "status can't be {VALUE}",
      },
      default: 'active',
    },
    productId: { type: ObjectId, required: true, ref: 'Product' },
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
    unit: {
      type: String,
      required: [true, 'Please provide a valid unit name'],
      enum: {
        values: ['kg', 'litre', 'pcs', 'bag'],
        message: "unit can't be {VALUE}, must be kg/litre/pcs/bag",
      },
    },
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
    category: {
      type: String,
      required: true,
    },
    brand: {
      name: { type: String, required: true },
      id: { type: ObjectId, ref: 'Brand', required: true },
    },
    price: {
      type: Number,
      required: true,
      min: [0, 'product price must be positive'],
    },
    quantity: {
      type: Number,
      required: [true, 'Please provide a valid quantity'],
      min: [0, 'quantity must be positive'],
      validate: {
        validator: (value) => Number.isInteger(value),
        message: 'Quantity must be an integer',
      },
    },

    store: {
      name: {
        type: String,
        required: [true, 'Please provide a valid store name'],
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
          message: '{Value} is not a valid store name',
        },
      },
      id: { type: ObjectId, ref: 'Store', required: true },
      supplier: {
        name: {
          type: String,
          required: [true, 'Please provide a valid store name'],
        },
        id: { type: ObjectId, ref: 'Supplier' },
      },
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
    totalSell: [
      {
        // Year as a number
        _id: { type: Number, required: true },
        january: {
          totalSell: { type: Number, required: true },
          customerAndProduct: [
            {
              customerId: { type: String, required: true },
              products: [
                {
                  date: { type: Date, required: true },
                  productIds: [{ type: String, required: true }],
                  totalPayment: { type: Number, required: true },
                },
              ],
            },
          ],
        },
        february: {
          totalSell: { type: Number, required: true },
          customerAndProduct: [
            {
              customerId: { type: String, required: true },
              products: [
                {
                  date: { type: Date, required: true },
                  productIds: [{ type: String, required: true }],
                  totalPayment: { type: Number, required: true },
                },
              ],
            },
          ],
        },
        march: {
          totalSell: { type: Number, required: true },
          customerAndProduct: [
            {
              customerId: { type: String, required: true },
              products: [
                {
                  date: { type: Date, required: true },
                  productIds: [{ type: String, required: true }],
                  totalPayment: { type: Number, required: true },
                },
              ],
            },
          ],
        },
        april: {
          totalSell: { type: Number, required: true },
          customerAndProduct: [
            {
              customerId: { type: String, required: true },
              products: [
                {
                  date: { type: Date, required: true },
                  productIds: [{ type: String, required: true }],
                  totalPayment: { type: Number, required: true },
                },
              ],
            },
          ],
        },
        may: {
          totalSell: { type: Number, required: true },
          customerAndProduct: [
            {
              customerId: { type: String, required: true },
              products: [
                {
                  date: { type: Date, required: true },
                  productIds: [{ type: String, required: true }],
                  totalPayment: { type: Number, required: true },
                },
              ],
            },
          ],
        },
        june: {
          totalSell: { type: Number, required: true },
          customerAndProduct: [
            {
              customerId: { type: String, required: true },
              products: [
                {
                  date: { type: Date, required: true },
                  productIds: [{ type: String, required: true }],
                  totalPayment: { type: Number, required: true },
                },
              ],
            },
          ],
        },
        july: {
          totalSell: { type: Number, required: true },
          customerAndProduct: [
            {
              customerId: { type: String, required: true },
              products: [
                {
                  date: { type: Date, required: true },
                  productIds: [{ type: String, required: true }],
                  totalPayment: { type: Number, required: true },
                },
              ],
            },
          ],
        },
        august: {
          totalSell: { type: Number, required: true },
          customerAndProduct: [
            {
              customerId: { type: String, required: true },
              products: [
                {
                  date: { type: Date, required: true },
                  productIds: [{ type: String, required: true }],
                  totalPayment: { type: Number, required: true },
                },
              ],
            },
          ],
        },
        september: {
          totalSell: { type: Number, required: true },
          customerAndProduct: [
            {
              customerId: { type: String, required: true },
              products: [
                {
                  date: { type: Date, required: true },
                  productIds: [{ type: String, required: true }],
                  totalPayment: { type: Number, required: true },
                },
              ],
            },
          ],
        },
        october: {
          totalSell: { type: Number, required: true },
          customerAndProduct: [
            {
              customerId: { type: String, required: true },
              products: [
                {
                  date: { type: Date, required: true },
                  productIds: [{ type: String, required: true }],
                  totalPayment: { type: Number, required: true },
                },
              ],
            },
          ],
        },
        november: {
          totalSell: { type: Number, required: true },
          customerAndProduct: [
            {
              customerId: { type: String, required: true },
              products: [
                {
                  date: { type: Date, required: true },
                  productIds: [{ type: String, required: true }],
                  totalPayment: { type: Number, required: true },
                },
              ],
            },
          ],
        },
        december: {
          totalSell: { type: Number, required: true },
          customerAndProduct: [
            {
              customerId: { type: String, required: true },
              products: [
                {
                  date: { type: Date, required: true },
                  productIds: [{ type: String, required: true }],
                  totalPayment: { type: Number, required: true },
                },
              ],
            },
          ],
        },
      },
    ],
  },
  { timestamps: true }
)

// Simplified pre-save middleware to update status based on quantity
__01__Schema.pre('save', function (next) {
  if (this.quantity === 0) {
    this.status = 'out-of-stock'
  } else if (this.quantity > 0 && this.status === 'out-of-stock') {
    this.status = 'in-stock'
  }
  next()
})

const __03__ = mongoose.model('__03__', __01__Schema)
module.exports = __03__
