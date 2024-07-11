const express = require('express')
const userController = require('./controller.js')

const router = express.Router()
router.route('/:token/:id').get(userController.userVerify)

module.exports = router
