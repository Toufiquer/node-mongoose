module.exports.generateRandomBytes = (length = 32) => {
  // Use crypto.randomBytes for secure random data generation
  const crypto = require('crypto')
  const randomBytes = crypto.randomBytes(length)

  // Convert the random bytes to a hexadecimal string (optional)
  return randomBytes.toString('hex')
}
