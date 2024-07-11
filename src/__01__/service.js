const __03__ = require('./__01__Schema')

exports.create__03__ = async (data) => {
  const result = await __03__.create(data)
  return result
}
exports.get__04__ = async (data) => {
  // const result = await __03__.find({}).select('-field -field')
  const result = await __03__.find({})
  return result
}
exports.get__03__ById = async (id) => {
  // const result = await __03__.find({}).select('-field -field')
  const result = await __03__.findOne({ _id: id })
  return result
}
exports.update__03__ = async (id, data) => {
  const result = await __03__.updateOne({ _id: id }, data, {
    runValidators: true,
  })
  return result
}

exports.delete__03__ById = async (id) => {
  const result = await __03__.deleteOne({ _id: id })
  return result
}
