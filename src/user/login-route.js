const express = require('express')
const userController = require('./controller.js')

const router = express.Router()
router.route('/').post(userController.logInUser)

module.exports = router
