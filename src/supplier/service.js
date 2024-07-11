const Supplier = require('./supplierSchema')

exports.createSupplier = async (data) => {
  const result = await Supplier.create(data)
  return result
}
exports.getSuppliers = async (data) => {
  // const result = await Supplier.find({}).select('-field -field')
  const result = await Supplier.find({})
  return result
}
exports.getSupplierById = async (id) => {
  // const result = await Supplier.find({}).select('-field -field')
  const result = await Supplier.findOne({ _id: id })
  return result
}
exports.updateSupplier = async (id, data) => {
  const result = await Supplier.updateOne({ _id: id }, data, {
    runValidators: true,
  })
  return result
}

exports.deleteSupplierById = async (id) => {
  const result = await Supplier.deleteOne({ _id: id })
  return result
}
