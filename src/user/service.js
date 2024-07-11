const { encryptPassword } = require('../../utils/passwordCryptr')
const User = require('./userSchema')

exports.createUser = async (data) => {
  console.log('Creating data : ', data)
  const result = await User.create(data)
  return result
}
exports.getUsers = async (data) => {
  // const result = await User.find({}).select('-field -field')
  const result = await User.find({}).select('-pass')
  return result
}
exports.getUserEmailPass = async (data) => {
  const { email } = data || {}
  const result = await User.findOne({ email: email }).select(
    'email pass role status'
  )
  return result
}

exports.getUserById = async (id) => {
  // const result = await User.find({}).select('-field -field')
  const result = await User.findOne({ _id: id }).select('-pass')
  return result
}
exports.updateUser = async (id, data) => {
  let updateData = { ...data }
  if (data.pass) {
    const enCryptPass = encryptPassword(data.pass)
    updateData.pass = enCryptPass
  }
  const result = await User.updateOne({ _id: id }, updateData, {
    runValidators: true,
  })
  return result
}

exports.deleteUserById = async (id) => {
  const result = await User.deleteOne({ _id: id })
  return result
}
