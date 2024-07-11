const Product = require('../schema/Product')

exports.createProduct = async (data) => {
  const result = await Product.create(data)
  return result
}
exports.getProducts = async (data) => {
  // const result = await Product.find({}).select('-products -suppliers')
  const result = await Product.find({})
  return result
}
exports.getProductById = async (id) => {
  // const result = await Product.find({}).select('-products -suppliers')
  const result = await Product.findOne({ _id: id })
  return result
}
exports.updateProduct = async (id, data) => {
  const result = await Product.updateOne({ _id: id }, data, {
    runValidators: true,
  })
  return result
}

exports.deleteProductById = async (id) => {
  const result = await Product.deleteOne({ _id: id })
  return result
}
