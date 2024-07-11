const Brand = require('../../brands/schema/Brand')
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProductById,
} = require('../service/product.service')

exports.createProduct = async (req, res, next) => {
  try {
    const result = await createProduct(req.body)
    const { _id: productId, brand } = result
    await Brand.updateOne({ _id: brand.id }, { $push: { products: productId } })
    res.status(200).json({ status: 'success', result })
  } catch (e) {
    // if require field is not provided
    console.error('Error during create Product:', e) // Log errors
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
exports.getProducts = async (req, res, next) => {
  try {
    const result = await getProducts()
    res.status(200).json({ status: 'success', result })
  } catch (e) {
    console.error('Error during get Products:', e) // Log errors
    return res
      .status(500)
      .json({ status: 'fail', error: 'Internal server error' })
  }
}

// invoke by id
exports.getProductById = async (req, res, next) => {
  try {
    const result = await getProductById(req.params.id)
    if (!result) {
      res
        .status(400)
        .json({ status: 'fail', error: "Couldn't find the product by id" })
    }
    res.status(200).json({ status: 'success', result })
  } catch (e) {
    console.error('Error during get Product by Id:', e) // Log errors
    return res
      .status(500)
      .json({ status: 'fail', error: 'Internal server error' })
  }
}
exports.updateProduct = async (req, res, next) => {
  try {
    const result = await updateProduct(req.params.id, req.body)
    if (!result.nModified) {
      res
        .status(400)
        .json({ status: 'fail', error: "Couldn't find the product by id" })
    }
    res.status(200).json({ status: 'success', result })
  } catch (e) {
    console.error('Error during update Product:', e) // Log errors
    return res
      .status(500)
      .json({ status: 'fail', error: 'Internal server error' })
  }
}

exports.deleteProductById = async (req, res, next) => {
  try {
    const result = await deleteProductById(req.params.id)
    if (!result) {
      res
        .status(400)
        .json({ status: 'fail', error: "Couldn't find the product by id" })
    }
    res.status(200).json({ status: 'success', result })
  } catch (e) {
    console.error('Error during delete Product:', e) // Log errors
    return res
      .status(500)
      .json({ status: 'fail', error: 'Internal server error' })
  }
}
