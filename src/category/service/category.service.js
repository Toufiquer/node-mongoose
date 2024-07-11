const Category = require('../schema/Category')

exports.createCategory = async (data) => {
  const result = await Category.create(data)
  return result
}
exports.getCategory = async (data) => {
  // const result = await Category.find({}).select('-field -field')
  const result = await Category.find({})
  return result
}
exports.getCategoryById = async (id) => {
  // const result = await Category.find({}).select('-field -field')
  const result = await Category.findOne({ _id: id })
  return result
}
exports.updateCategory = async (id, data) => {
  const result = await Category.updateOne({ _id: id }, data, {
    runValidators: true,
  })
  return result
}

exports.deleteCategoryById = async (id) => {
  const result = await Category.deleteOne({ _id: id })
  return result
}
