const {
  createStock,
  getStocks,
  getStockById,
  updateStock,
  deleteStockById,
} = require('../service/stock.service')

exports.createStock = async (req, res, next) => {
  try {
    const result = await createStock(req.body)
    res.status(200).json({ status: 'success', result })
  } catch (e) {
    console.error('Error during create Stock:', e) // Log errors
    return res
      .status(500)
      .json({ status: 'fail', error: 'Internal server error' })
  }
}
exports.getStocks = async (req, res, next) => {
  try {
    const result = await getStocks()
    res.status(200).json({ status: 'success', result })
  } catch (e) {
    console.error('Error during get Stock:', e) // Log errors
    return res
      .status(500)
      .json({ status: 'fail', error: 'Internal server error' })
  }
}

// invoke by id
exports.getStockById = async (req, res, next) => {
  try {
    const result = await getStockById(req.params.id)
    if (!result) {
      res
        .status(400)
        .json({ status: 'fail', error: "Couldn't find the stock by id" })
    }
    res.status(200).json({ status: 'success', result })
  } catch (e) {
    console.error('Error during get Stock by Id:', e) // Log errors
    return res
      .status(500)
      .json({ status: 'fail', error: 'Internal server error' })
  }
}
exports.updateStock = async (req, res, next) => {
  try {
    const result = await updateStock(req.params.id, req.body)
    if (!result.nModified) {
      res
        .status(400)
        .json({ status: 'fail', error: "Couldn't find the stock by id" })
    }
    res.status(200).json({ status: 'success', result })
  } catch (e) {
    console.error('Error during update Stock:', e) // Log errors
    return res
      .status(500)
      .json({ status: 'fail', error: 'Internal server error' })
  }
}

exports.deleteStockById = async (req, res, next) => {
  try {
    const result = await deleteStockById(req.params.id)
    if (!result) {
      res
        .status(400)
        .json({ status: 'fail', error: "Couldn't find the stock by id" })
    }
    res.status(200).json({ status: 'success', result })
  } catch (e) {
    console.error('Error during delete Stock:', e) // Log errors
    return res
      .status(500)
      .json({ status: 'fail', error: 'Internal server error' })
  }
}
