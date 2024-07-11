const {
  createSupplier,
  getSuppliers,
  getSupplierById,
  updateSupplier,
  deleteSupplierById,
} = require('./service')

exports.createSupplier = async (req, res, next) => {
  try {
    const result = await createSupplier(req.body)
    res.status(200).json({ status: 'success', result })
  } catch (e) {
    console.error('Error during Create Supplier:', e) // Log errors
    return res
      .status(500)
      .json({ status: 'fail', error: 'Internal server error' })
  }
}
exports.getSuppliers = async (req, res, next) => {
  try {
    const result = await getSuppliers()
    res.status(200).json({ status: 'success', result })
  } catch (e) {
    console.error('Error during get Supplier:', e) // Log errors
    return res
      .status(500)
      .json({ status: 'fail', error: 'Internal server error' })
  }
}

// invoke by id
exports.getSupplierById = async (req, res, next) => {
  try {
    const result = await getSupplierById(req.params.id)
    if (!result) {
      res
        .status(400)
        .json({ status: 'fail', error: "Couldn't find the supplier by id" })
    }
    res.status(200).json({ status: 'success', result })
  } catch (e) {
    console.error('Error during get Supplier by id:', e) // Log errors
    return res
      .status(500)
      .json({ status: 'fail', error: 'Internal server error' })
  }
}
exports.updateSupplier = async (req, res, next) => {
  try {
    const result = await updateSupplier(req.params.id, req.body)
    if (!result.nModified) {
      res
        .status(400)
        .json({ status: 'fail', error: "Couldn't find the supplier by id" })
    }
    res.status(200).json({ status: 'success', result })
  } catch (e) {
    console.error('Error during update Supplier:', e) // Log errors
    return res
      .status(500)
      .json({ status: 'fail', error: 'Internal server error' })
  }
}

exports.deleteSupplierById = async (req, res, next) => {
  try {
    const result = await deleteSupplierById(req.params.id)
    if (!result) {
      res
        .status(400)
        .json({ status: 'fail', error: "Couldn't find the supplier by id" })
    }
    res.status(200).json({ status: 'success', result })
  } catch (e) {
    console.error('Error during delete supplier:', e) // Log errors
    return res
      .status(500)
      .json({ status: 'fail', error: 'Internal server error' })
  }
}
