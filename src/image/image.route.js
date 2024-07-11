const express = require('express')

const imageController = require('./image.controller.js')
const uploader = require('../../middleware/uploader.js')

const router = express.Router()

router.route('/').post(uploader.single('image'), imageController.fileUpload)
router.route('/many').post(uploader.array('image'), imageController.filesUpload)

module.exports = router

/**
 * response => 
{
    "fieldname": "image",
    "originalname": "banner.jpg",
    "encoding": "7bit",
    "mimetype": "image/jpeg",
    "destination": "images/",
    "filename": "dd449316f4406f32311fa00c97b55f01",
    "path": "images\\dd449316f4406f32311fa00c97b55f01",
    "size": 104036
}

 * 
 * */
