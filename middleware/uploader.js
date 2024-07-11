const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
  // where to save the image like aws mongoose
  destination: 'images/',
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    cb(null, uniqueSuffix + '-' + file.originalname)
  },
})

const uploader = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const supportedImage = /png|jpg/
    const extension = path.extname(file.originalname)
    if (supportedImage.test(extension)) {
      cb(null, true)
    } else {
      cb(new Error('Must be a png/jpg img'))
    }
  },
  limits: {
    fileSize: 5000000,
  },
})
module.exports = uploader
