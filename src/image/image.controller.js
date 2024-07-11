exports.fileUpload = async (req, res) => {
  try {
    res.status(200).json(req.file)
  } catch (e) {
    console.error('Error during file Upload:', e) // Log errors
    return res
      .status(500)
      .json({ status: 'fail', error: 'Internal server error' })
  }
}
exports.filesUpload = async (req, res) => {
  try {
    console.log(req)
    res.status(200).json(req.files)
  } catch (e) {
    console.error('Error during files Upload:', e) // Log errors
    return res
      .status(500)
      .json({ status: 'fail', error: 'Internal server error' })
  }
}
