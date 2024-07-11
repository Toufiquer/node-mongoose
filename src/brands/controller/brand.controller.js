const {
  createBrand,
  getBrands,
  getBrandById,
  updateBrand,
  deleteBrandById,
} = require('../service/brand.service')

exports.createBrand = async (req, res, next) => {
  try {
    const result = await createBrand(req.body)
    res.status(200).json({ status: 'success', result })
  } catch (e) {
    console.error('Error during create Brand:', e) // Log errors
    return res
      .status(500)
      .json({ status: 'fail', error: 'Internal server error' })
  }
}
exports.getBrands = async (req, res, next) => {
  try {
    const result = await getBrands()
    res.status(200).json({ status: 'success', result })
  } catch (e) {
    console.error('Error during get Brand:', e) // Log errors
    return res
      .status(500)
      .json({ status: 'fail', error: 'Internal server error' })
  }
}

// invoke by id
exports.getBrandById = async (req, res, next) => {
  try {
    const result = await getBrandById(req.params.id)
    if (!result) {
      res
        .status(400)
        .json({ status: 'fail', error: "Couldn't find the brand by id" })
    }
    res.status(200).json({ status: 'success', result })
  } catch (e) {
    console.error('Error during get Brand by Id:', e) // Log errors
    return res
      .status(500)
      .json({ status: 'fail', error: 'Internal server error' })
  }
}
exports.updateBrand = async (req, res, next) => {
  try {
    const result = await updateBrand(req.params.id, req.body)
    if (!result.nModified) {
      res
        .status(400)
        .json({ status: 'fail', error: "Couldn't find the brand by id" })
    }
    res.status(200).json({ status: 'success', result })
  } catch (e) {
    console.error('Error during update Brand:', e) // Log errors
    return res
      .status(500)
      .json({ status: 'fail', error: 'Internal server error' })
  }
}

exports.deleteBrandById = async (req, res, next) => {
  try {
    const result = await deleteBrandById(req.params.id)
    if (!result) {
      res
        .status(400)
        .json({ status: 'fail', error: "Couldn't find the brand by id" })
    }
    res.status(200).json({ status: 'success', result })
  } catch (e) {
    console.error('Error during delete Brand:', e) // Log errors
    return res
      .status(500)
      .json({ status: 'fail', error: 'Internal server error' })
  }
}
