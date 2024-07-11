const {
  create__03__,
  get__04__,
  get__03__ById,
  update__03__,
  delete__03__ById,
} = require('./service')

exports.create__03__ = async (req, res, next) => {
  try {
    const result = await create__03__(req.body)
    res.status(200).json({ status: 'success', result })
  } catch (e) {
    // if require field is not provided
    console.error('Error during create __03__:', e) // Log errors
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
exports.get__04__ = async (req, res, next) => {
  try {
    const result = await get__04__()
    res.status(200).json({ status: 'success', result })
  } catch (e) {
    console.error('Error during get __04__:', e) // Log errors
    return res
      .status(500)
      .json({ status: 'fail', error: 'Internal server error' })
  }
}

// invoke by id
exports.get__03__ById = async (req, res, next) => {
  try {
    const result = await get__03__ById(req.params.id)
    if (!result) {
      res
        .status(400)
        .json({ status: 'fail', error: "Couldn't find the __01__ by id" })
    }
    res.status(200).json({ status: 'success', result })
  } catch (e) {
    console.error('Error during get __03__ by Id:', e) // Log errors
    return res
      .status(500)
      .json({ status: 'fail', error: 'Internal server error' })
  }
}
exports.update__03__ = async (req, res, next) => {
  try {
    const result = await update__03__(req.params.id, req.body)
    if (!result.nModified) {
      res
        .status(400)
        .json({ status: 'fail', error: "Couldn't find the __01__ by id" })
    }
    res.status(200).json({ status: 'success', result })
  } catch (e) {
    console.error('Error during update __03__:', e) // Log errors
    return res
      .status(500)
      .json({ status: 'fail', error: 'Internal server error' })
  }
}

exports.delete__03__ById = async (req, res, next) => {
  try {
    const result = await delete__03__ById(req.params.id)
    if (!result) {
      res
        .status(400)
        .json({ status: 'fail', error: "Couldn't find the __01__ by id" })
    }
    res.status(200).json({ status: 'success', result })
  } catch (e) {
    console.error('Error during delete __03__:', e) // Log errors
    return res
      .status(500)
      .json({ status: 'fail', error: 'Internal server error' })
  }
}
