const Brand = require('../schema/Brand')

exports.createBrand = async (data) => {
  const result = await Brand.create(data)
  return result
}
exports.getBrands = async (data) => {
  // const result = await Brand.find({}).select('-field -field')
  const result = await Brand.find({}).populate('products')
  return result
}
exports.getBrandById = async (id) => {
  // const result = await Brand.find({}).select('-field -field')
  const result = await Brand.findOne({ _id: id })
  return result
}
exports.updateBrand = async (id, data) => {
  const result = await Brand.updateOne({ _id: id }, data, {
    runValidators: true,
  })
  return result
}

exports.deleteBrandById = async (id) => {
  const result = await Brand.deleteOne({ _id: id })
  return result
}
