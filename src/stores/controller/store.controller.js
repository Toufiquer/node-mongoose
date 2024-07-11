const {
  createStore,
  getStores,
  getStoreById,
  updateStore,
  deleteStoreById,
} = require('../service/store.service')

exports.createStore = async (req, res, next) => {
  try {
    const result = await createStore(req.body)
    res.status(200).json({ status: 'success', result })
  } catch (e) {
    console.error('Error during create Store:', e) // Log errors
    return res
      .status(500)
      .json({ status: 'fail', error: 'Internal server error' })
  }
}
exports.getStores = async (req, res, next) => {
  try {
    const result = await getStores()
    res.status(200).json({ status: 'success', result })
  } catch (e) {
    console.error('Error during get Store:', e) // Log errors
    return res
      .status(500)
      .json({ status: 'fail', error: 'Internal server error' })
  }
}

// invoke by id
exports.getStoreById = async (req, res, next) => {
  try {
    const result = await getStoreById(req.params.id)
    if (!result) {
      res
        .status(400)
        .json({ status: 'fail', error: "Couldn't find the store by id" })
    }
    res.status(200).json({ status: 'success', result })
  } catch (e) {
    console.error('Error during get Store by id:', e) // Log errors
    return res
      .status(500)
      .json({ status: 'fail', error: 'Internal server error' })
  }
}
exports.updateStore = async (req, res, next) => {
  try {
    const result = await updateStore(req.params.id, req.body)
    if (!result.nModified) {
      res
        .status(400)
        .json({ status: 'fail', error: "Couldn't find the store by id" })
    }
    res.status(200).json({ status: 'success', result })
  } catch (e) {
    console.error('Error during Update Store:', e) // Log errors
    return res
      .status(500)
      .json({ status: 'fail', error: 'Internal server error' })
  }
}

exports.deleteStoreById = async (req, res, next) => {
  try {
    const result = await deleteStoreById(req.params.id)
    if (!result) {
      res
        .status(400)
        .json({ status: 'fail', error: "Couldn't find the store by id" })
    }
    res.status(200).json({ status: 'success', result })
  } catch (e) {
    console.error('Error during delete Store:', e) // Log errors
    return res
      .status(500)
      .json({ status: 'fail', error: 'Internal server error' })
  }
}
