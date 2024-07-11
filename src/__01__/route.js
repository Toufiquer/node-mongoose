const express = require('express')
const __01__Controller = require('./controller.js')

const router = express.Router()
router
  .route('/')
  .post(__01__Controller.create__03__)
  .get(__01__Controller.get__04__)

router
  .route('/:id')
  .get(__01__Controller.get__03__ById)
  .patch(__01__Controller.update__03__)
  .delete(__01__Controller.delete__03__ById)
module.exports = router

//
/** POST -> Example for route("/") ***/
// post -> req.body
// {
//   "name": "Apple",
//   "description": "Fresh, crisp, red apple"
//   "unit": "kg",
//   "imageURL": "https://example.com/apple.jpg",
//   "category": "Fruit",
//   "brand": {
//     "name": "Apple Inc.",
//     "id": "64d89e8c1919500f97496c24" // Replace with actual ObjectId
//   },
//   "quantity": 100,
//   "status": "in-stock"
// }

// post -> response
// {
//     "status": "success",
//     "result": {
//         "status": "in-stock",
//         "_id": "6685238e7c21724c040564b0",
//         "name": "apple 1",
//         "description": "Fresh, crisp, red apple",
//         "unit": "kg",
//         "imageURL": "https://example.com/apple.jpg",
//         "category": "Fruit",
//         "brand": {
//             "name": "Apple Inc.",
//             "id": "64d89e8c1919500f97496c24"
//         },
//         "quantity": 100,
//         "createdAt": "2024-07-03T10:10:22.215Z",
//         "updatedAt": "2024-07-03T10:10:22.215Z",
//         "__v": 0
//     }
// }

/** GET -> Example for route("/") ***/
// get -> response
// {
//     "status": "success",
//     "result": [
//         {
//             "brand": {
//                 "name": "Apple Inc.",
//                 "id": "64d89e8c1919500f97496c24"
//             },
//             "status": "in-stock",
//             "_id": "668522ca5ee6da5744aa20d5",
//             "name": "apple",
//             "description": "Fresh, crisp, red apple",
//             "unit": "kg",
//             "imageURL": "https://example.com/apple.jpg",
//             "category": "Fruit",
//             "quantity": 100,
//             "createdAt": "2024-07-03T10:07:06.699Z",
//             "updatedAt": "2024-07-03T10:07:06.699Z",
//             "__v": 0
//         },
//         {
//             "brand": {
//                 "name": "Apple Inc.",
//                 "id": "64d89e8c1919500f97496c24"
//             },
//             "status": "in-stock",
//             "_id": "6685238e7c21724c040564b0",
//             "name": "apple 1",
//             "description": "Fresh, crisp, red apple",
//             "unit": "kg",
//             "imageURL": "https://example.com/apple.jpg",
//             "category": "Fruit",
//             "quantity": 100,
//             "createdAt": "2024-07-03T10:10:22.215Z",
//             "updatedAt": "2024-07-03T10:10:22.215Z",
//             "__v": 0
//         }
//     ]
// }

/** GET -> Example for route("/:id") ***/
// get -> http://localhost:5000/v1/__02__/668522ca5ee6da5744aa20d5
// get -> response
// {
//     "status": "success",
//     "result": {
//         "brand": {
//             "name": "Apple Inc.",
//             "id": "64d89e8c1919500f97496c24"
//         },
//         "status": "in-stock",
//         "_id": "668522ca5ee6da5744aa20d5",
//         "name": "apple",
//         "description": "Fresh, crisp, red apple",
//         "unit": "kg",
//         "imageURL": "https://example.com/apple.jpg",
//         "category": "Fruit",
//         "quantity": 100,
//         "createdAt": "2024-07-03T10:07:06.699Z",
//         "updatedAt": "2024-07-03T10:07:06.699Z",
//         "__v": 0
//     }
// }

/** PATCH -> Example for route("/:id") ***/
// patch -> http://localhost:5000/v1/__02__/668522ca5ee6da5744aa20d5
// req.body
// {
//   "name": "Apple 222",
//   "description": "Fresh, crisp, red apple",
//   "unit": "kg",
//   "imageURL": "https://example.com/apple.jpg",
//   "category": "Fruit",
//   "brand": {
//     "name": "Apple Inc.",
//     "id": "64d89e8c1919500f97496c24" // Replace with actual ObjectId
//   },
//   "quantity": 100,
//   "status": "in-stock"
// }

// patch -> response
// {
//     "status": "success",
//     "result": {
//         "n": 1,
//         "nModified": 1,
//         "ok": 1
//     }
// }

/** DELETE -> Example for route("/:id") ***/
// delete -> http://localhost:5000/v1/__02__/6685271d81b69013a8c75bbb
// delete -> response
// {
//     "status": "success",
//     "result": {
//         "n": 1,
//         "ok": 1,
//         "deletedCount": 1
//     }
// }
