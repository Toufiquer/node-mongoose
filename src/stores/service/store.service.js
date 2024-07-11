const Store = require('../schema/Store')

exports.createStore = async (data) => {
  const result = await Store.create(data)
  return result
}
exports.getStores = async (data) => {
  // const result = await Store.find({}).select('-field -field')
  const result = await Store.find({})
  return result
}
exports.getStoreById = async (id) => {
  // const result = await Store.find({}).select('-field -field')
  const result = await Store.findOne({ _id: id })
  return result
}
exports.updateStore = async (id, data) => {
  const result = await Store.updateOne({ _id: id }, data, {
    runValidators: true,
  })
  return result
}

exports.deleteStoreById = async (id) => {
  const result = await Store.deleteOne({ _id: id })
  return result
}
