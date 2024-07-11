const {
  createCategory,
  getCategory,
  getCategoryById,
  updateCategory,
  deleteCategoryById,
} = require('../service/category.service')

exports.createCategory = async (req, res, next) => {
  try {
    const result = await createCategory(req.body)
    res.status(200).json({ status: 'success', result })
  } catch (e) {
    console.error('Error during create Category:', e) // Log errors
    return res
      .status(500)
      .json({ status: 'fail', error: 'Internal server error' })
  }
}
exports.getCategory = async (req, res, next) => {
  try {
    const result = await getCategory()
    res.status(200).json({ status: 'success', result })
  } catch (e) {
    console.error('Error during get Category:', e) // Log errors
    return res
      .status(500)
      .json({ status: 'fail', error: 'Internal server error' })
  }
}

// invoke by id
exports.getCategoryById = async (req, res, next) => {
  try {
    const result = await getCategoryById(req.params.id)
    if (!result) {
      res
        .status(400)
        .json({ status: 'fail', error: "Couldn't find the category by id" })
    }
    res.status(200).json({ status: 'success', result })
  } catch (e) {
    console.error('Error during get Category by Id:', e) // Log errors
    return res
      .status(500)
      .json({ status: 'fail', error: 'Internal server error' })
  }
}
exports.updateCategory = async (req, res, next) => {
  try {
    const result = await updateCategory(req.params.id, req.body)
    if (!result.nModified) {
      res
        .status(400)
        .json({ status: 'fail', error: "Couldn't find the category by id" })
    }
    res.status(200).json({ status: 'success', result })
  } catch (e) {
    console.error('Error during update Category:', e) // Log errors
    return res
      .status(500)
      .json({ status: 'fail', error: 'Internal server error' })
  }
}

exports.deleteCategoryById = async (req, res, next) => {
  try {
    const result = await deleteCategoryById(req.params.id)
    if (!result) {
      res
        .status(400)
        .json({ status: 'fail', error: "Couldn't find the category by id" })
    }
    res.status(200).json({ status: 'success', result })
  } catch (e) {
    console.error('Error during delete Category:', e) // Log errors
    return res
      .status(500)
      .json({ status: 'fail', error: 'Internal server error' })
  }
}
