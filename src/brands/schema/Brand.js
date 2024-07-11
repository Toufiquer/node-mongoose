const mongoose = require('mongoose')
const validator = require('validator')

const { ObjectId } = mongoose.Schema.Types

const brandSchema = mongoose.Schema(
  {
    products: [{ type: ObjectId, ref: 'Product' }],
    name: {
      type: String,
      required: [true, 'Please provide a valid brand name'],
      trim: true,
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
    imageURL: {
      type: String,
      required: true,
      validate: {
        validator: (value) => validator.isURL(value),
        message: 'Please provide a valid image URL',
      },
    },
    category: {
      type: String,
      required: true,
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
    status: {
      type: String,
      required: true,
      enum: {
        values: ['in-stock', 'out-of-stock', 'discontinued'],
        message: "status can't be {VALUE}",
      },
      default: 'in-stock',
    },
  },
  { timestamps: true }
)

// Simplified pre-save middleware to update status based on quantity
brandSchema.pre('save', function (next) {
  if (this.quantity === 0) {
    this.status = 'out-of-stock'
  } else if (this.quantity > 0 && this.status === 'out-of-stock') {
    this.status = 'in-stock'
  }
  next()
})

const Brand = mongoose.model('Brand', brandSchema)
module.exports = Brand
