const mongoose = require('mongoose')
const validator = require('validator')

const ObjectId = mongoose.Schema.Types

const exampleSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'Please provide a a brand name'],
      maxLength: 300,
      unique: true,
      lowercase: true,
    },
    description: String,
    email: {
      type: String,
      lowercase: true,
      validator: [validator.isEmail, 'Please provide a valid email'],
    },
    website: {
      type: String,
      validator: [validator.isURL, 'Please provide a valid url'],
    },
    location: String,
    products: [{ type: ObjectId, ref: 'Product' }],
    suppliers: [
      {
        name: String,
        contactNumber: String,
        supplierId: { type: ObjectId, ref: 'Supplier' },
      },
    ],
    status: {
      type: String,
      enum: ['active', 'inactive'],
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
    status: {
      type: String,
      required: true,
      enum: {
        values: ['in-stock', 'out-of-stock', 'discontinued'],
        message: "status can't be {VALUE}",
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
    description: String,
    manager: {
      name: String,
      description: String,
      contactNumber: String,
      id: { type: ObjectId, ref: 'User' },
    },
  },
  { timestamps: true }
)

const Example__ = mongoose.model('Example__', exampleSchema)
module.exports = Example__

//const totalSell= [
//     {
//       2022: {
//         january: {
//           totalSell: 2000,
//           customerAndProduct: [
//             {
//               customerId: '123',
//               products: [
//                 { date: '1-1-2022', productIds: ['123'], totalPayment: 345 },
//               ],
//             },
//           ],
//         },
//         february: {
//           totalSell: 2000,
//           customerAndProduct: [
//             {
//               customerId: '123',
//               products: [
//                 { date: '1-1-2022', productIds: ['123'], totalPayment: 345 },
//               ],
//             },
//           ],
//         },
//         march: {
//           totalSell: 2000,
//           customerAndProduct: [
//             {
//               customerId: '123',
//               products: [
//                 { date: '1-1-2022', productIds: ['123'], totalPayment: 345 },
//               ],
//             },
//           ],
//         },
//         april: {
//           totalSell: 2000,
//           customerAndProduct: [
//             {
//               customerId: '123',
//               products: [
//                 { date: '1-1-2022', productIds: ['123'], totalPayment: 345 },
//               ],
//             },
//           ],
//         },
//         may: {
//           totalSell: 2000,
//           customerAndProduct: [
//             {
//               customerId: '123',
//               products: [
//                 { date: '1-1-2022', productIds: ['123'], totalPayment: 345 },
//               ],
//             },
//           ],
//         },
//         june: {
//           totalSell: 2000,
//           customerAndProduct: [
//             {
//               customerId: '123',
//               products: [
//                 { date: '1-1-2022', productIds: ['123'], totalPayment: 345 },
//               ],
//             },
//           ],
//         },
//         july: {
//           totalSell: 2000,
//           customerAndProduct: [
//             {
//               customerId: '123',
//               products: [
//                 { date: '1-1-2022', productIds: ['123'], totalPayment: 345 },
//               ],
//             },
//           ],
//         },
//         august: {
//           totalSell: 2000,
//           customerAndProduct: [
//             {
//               customerId: '123',
//               products: [
//                 { date: '1-1-2022', productIds: ['123'], totalPayment: 345 },
//               ],
//             },
//           ],
//         },
//         september: {
//           totalSell: 2000,
//           customerAndProduct: [
//             {
//               customerId: '123',
//               products: [
//                 { date: '1-1-2022', productIds: ['123'], totalPayment: 345 },
//               ],
//             },
//           ],
//         },
//         october: {
//           totalSell: 2000,
//           customerAndProduct: [
//             {
//               customerId: '123',
//               products: [
//                 { date: '1-1-2022', productIds: ['123'], totalPayment: 345 },
//               ],
//             },
//           ],
//         },
//         november: {
//           totalSell: 2000,
//           customerAndProduct: [
//             {
//               customerId: '123',
//               products: [
//                 { date: '1-1-2022', productIds: ['123'], totalPayment: 345 },
//               ],
//             },
//           ],
//         },
//         december: {
//           totalSell: 2000,
//           customerAndProduct: [
//             {
//               customerId: '123',
//               products: [
//                 { date: '1-1-2022', productIds: ['123'], totalPayment: 345 },
//               ],
//             },
//           ],
//         },
//       },
//       2023: {
//         january: {
//           totalSell: 2000,
//           customerAndProduct: [
//             {
//               customerId: '123',
//               products: [
//                 { date: '1-1-2023', productIds: ['123'], totalPayment: 345 },
//               ],
//             },
//           ],
//         },
//         february: {
//           totalSell: 2000,
//           customerAndProduct: [
//             {
//               customerId: '123',
//               products: [
//                 { date: '1-1-2023', productIds: ['123'], totalPayment: 345 },
//               ],
//             },
//           ],
//         },
//         march: {
//           totalSell: 2000,
//           customerAndProduct: [
//             {
//               customerId: '123',
//               products: [
//                 { date: '1-1-2023', productIds: ['123'], totalPayment: 345 },
//               ],
//             },
//           ],
//         },
//         april: {
//           totalSell: 2000,
//           customerAndProduct: [
//             {
//               customerId: '123',
//               products: [
//                 { date: '1-1-2023', productIds: ['123'], totalPayment: 345 },
//               ],
//             },
//           ],
//         },
//         may: {
//           totalSell: 2000,
//           customerAndProduct: [
//             {
//               customerId: '123',
//               products: [
//                 { date: '1-1-2023', productIds: ['123'], totalPayment: 345 },
//               ],
//             },
//           ],
//         },
//         june: {
//           totalSell: 2000,
//           customerAndProduct: [
//             {
//               customerId: '123',
//               products: [
//                 { date: '1-1-2023', productIds: ['123'], totalPayment: 345 },
//               ],
//             },
//           ],
//         },
//         july: {
//           totalSell: 2000,
//           customerAndProduct: [
//             {
//               customerId: '123',
//               products: [
//                 { date: '1-1-2023', productIds: ['123'], totalPayment: 345 },
//               ],
//             },
//           ],
//         },
//         august: {
//           totalSell: 2000,
//           customerAndProduct: [
//             {
//               customerId: '123',
//               products: [
//                 { date: '1-1-2023', productIds: ['123'], totalPayment: 345 },
//               ],
//             },
//           ],
//         },
//         september: {
//           totalSell: 2000,
//           customerAndProduct: [
//             {
//               customerId: '123',
//               products: [
//                 { date: '1-1-2023', productIds: ['123'], totalPayment: 345 },
//               ],
//             },
//           ],
//         },
//         october: {
//           totalSell: 2000,
//           customerAndProduct: [
//             {
//               customerId: '123',
//               products: [
//                 { date: '1-1-2023', productIds: ['123'], totalPayment: 345 },
//               ],
//             },
//           ],
//         },
//         november: {
//           totalSell: 2000,
//           customerAndProduct: [
//             {
//               customerId: '123',
//               products: [
//                 { date: '1-1-2023', productIds: ['123'], totalPayment: 345 },
//               ],
//             },
//           ],
//         },
//         december: {
//           totalSell: 2000,
//           customerAndProduct: [
//             {
//               customerId: '123',
//               products: [
//                 { date: '1-1-2023', productIds: ['123'], totalPayment: 345 },
//               ],
//             },
//           ],
//         },
//       },
//     },
//   ],
