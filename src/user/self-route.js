const express = require('express')
const userController = require('./controller.js')

const router = express.Router()
router.route('/').post(userController.getSelf)

module.exports = router
