const { generateIatExp } = require('../../utils/generate-exp')
const { generateRandomBytes } = require('../../utils/generate-hash')
const { creteJWT, checkJWT } = require('../../utils/jwt')
const { sendMailByMailApp } = require('../../utils/node-mail')
const { decryptPassword } = require('../../utils/passwordCryptr')
const {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUserById,
  getUserEmailPass,
} = require('./service')

exports.createUser = async (req, res, next) => {
  try {
    const uniqueTokenForVerification = generateRandomBytes()

    const { iat, exp } = generateIatExp()
    const result = await createUser({
      ...req.body,
      passResetToken: uniqueTokenForVerification,
      passResetExpires: exp,
    })
    console.log('result : ', result)
    console.log('result id : ', result._id)
    const mailData = {
      from: { name: 'Toufiquer Rahman', address: process.env.APP_USER_EMAIL },
      to: [result.email],
      subject: 'Account created successfully',
      text: 'Your account has been created.',
      html: `<a href="${req.protocol}://${req.get('host')}${req.originalUrl}/verify/${uniqueTokenForVerification}/${result._id}">Verify</a>`,
    }
    const senderMail = process.env.APP_USER_EMAIL
    const pass = process.env.APP_PASSWORD
    sendMailByMailApp(mailData, senderMail, pass)
    res.status(200).json({ status: 'success', result: { ...result, pass: '' } })
  } catch (e) {
    // if require field is not provided
    console.error('Error during create User:', e) // Log errors
    if (e.message.includes('validation failed')) {
      return res.status(400).json({
        status: 'fail',

        error: `${Object.keys(e.errors).join(' ')} is empty`,
      })
    } else if (e.message.includes('duplicate key')) {
      return res.status(400).json({
        status: 'fail',
        error: `${Object.keys(e.keyValue).join(' ')} are must be unique`,
      })
    } else {
      return res
        .status(500)
        .json({ status: 'fail', error: 'Internal server error' })
    }
  }
}
exports.getUsers = async (req, res, next) => {
  try {
    const result = await getUsers()
    res.status(200).json({ status: 'success', result })
  } catch (e) {
    console.error('Error during get Users:', e) // Log errors
    return res
      .status(500)
      .json({ status: 'fail', error: 'Internal server error' })
  }
}
exports.logInUser = async (req, res, next) => {
  try {
    // Check for required fields
    const { email, pass } = req.body
    if (!email || !pass) {
      return res
        .status(400)
        .json({ status: 'fail', error: 'Please provide email and password' })
    }

    // Get user data from the database
    const dbUser = await getUserEmailPass(req.body) // Handle errors within getUserEmailPass()

    // Validate password
    if (decryptPassword(dbUser.pass) !== req.body.pass) {
      return res
        .status(403)
        .json({ status: 'fail', error: "Password doesn't match" })
    }

    // Check user status
    if (dbUser.status !== 'active') {
      return res
        .status(401)
        .json({ status: 'fail', error: `User is ${dbUser.status}` })
    }

    // Generate JWT token
    const token = creteJWT(req.body.email)

    if (token) {
      return res.status(200).json({ status: 'success', token })
    } else {
      return res.status(500).json({
        status: 'fail',
        error: 'Error generating token', // Provide more specific message
      })
    }
  } catch (e) {
    console.error('Error during login:', e) // Log errors
    return res
      .status(500)
      .json({ status: 'fail', error: 'Internal server error' })
  }
}

exports.getSelf = async (req, res, next) => {
  try {
    return res.json({
      isLogIn: true,
      verifyToken: true,
    })
  } catch (e) {
    console.error('Error during self:', e) // Log errors
    return res
      .status(500)
      .json({ status: 'fail', error: 'Internal server error' })
  }
}

// invoke by id
exports.userVerify = async (req, res, next) => {
  try {
    const token = req.params['token']
    const id = req.params['id']
    if (!token || !id) {
      res
        .status(400)
        .json({ status: 'fail', error: "Couldn't find token and id" })
    }
    // console.log('req : ', { token: token, id: id })
    // get the user
    const result = await getUserById(id)
    if (!result) {
      res
        .status(400)
        .json({ status: 'fail', error: "Couldn't find the user by id" })
    }
    console.log('result : ', result)
    if (result.passResetExpires >= Math.floor(new Date())) {
      result.passResetExpires = undefined
      result.passResetToken = undefined
      result.save({ validationBeforeSave: false })
      res
        .status(200)
        .json({ status: 'success', message: 'Your verification completed' })
    } else {
      res.status(500).json({
        status: 'fail',
        error: 'Your token expire. Please contact our team.',
      })
    }
  } catch (e) {
    console.error('Error during Verify user:', e) // Log errors
    return res
      .status(500)
      .json({ status: 'fail', error: 'Internal server error' })
  }
}
exports.getUserById = async (req, res, next) => {
  try {
    const result = await getUserById(req.params.id)
    if (!result) {
      res
        .status(400)
        .json({ status: 'fail', error: "Couldn't find the user by id" })
    }
    res.status(200).json({ status: 'success', result })
  } catch (e) {
    console.error('Error during get User by Id:', e) // Log errors
    return res
      .status(500)
      .json({ status: 'fail', error: 'Internal server error' })
  }
}
exports.updateUser = async (req, res, next) => {
  try {
    const result = await updateUser(req.params.id, req.body)
    if (!result.nModified) {
      res
        .status(400)
        .json({ status: 'fail', error: "Couldn't find the user by id" })
    }
    res.status(200).json({ status: 'success', result })
  } catch (e) {
    console.error('Error during update User:', e) // Log errors
    return res
      .status(500)
      .json({ status: 'fail', error: 'Internal server error' })
  }
}

exports.deleteUserById = async (req, res, next) => {
  try {
    const result = await deleteUserById(req.params.id)
    if (!result) {
      res
        .status(400)
        .json({ status: 'fail', error: "Couldn't find the user by id" })
    }
    res.status(200).json({ status: 'success', result })
  } catch (e) {
    console.error('Error during delete User:', e) // Log errors
    return res
      .status(500)
      .json({ status: 'fail', error: 'Internal server error' })
  }
}
