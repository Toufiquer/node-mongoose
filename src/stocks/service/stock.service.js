const Stock = require('../schema/Stock')

exports.createStock = async (data) => {
  const result = await Stock.create(data)
  return result
}
exports.getStocks = async (data) => {
  // const result = await Stock.find({}).select('-field -field')
  const result = await Stock.find({})
  return result
}
exports.getStockById = async (id) => {
  // const result = await Stock.find({}).select('-field -field')
  const result = await Stock.findOne({ _id: id })
  return result
}
exports.updateStock = async (id, data) => {
  const result = await Stock.updateOne({ _id: id }, data, {
    runValidators: true,
  })
  return result
}

exports.deleteStockById = async (id) => {
  const result = await Stock.deleteOne({ _id: id })
  return result
}
