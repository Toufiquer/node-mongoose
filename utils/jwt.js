var jwt = require('jsonwebtoken')
const { generateIatExp } = require('./generate-exp')

module.exports.creteJWT = (email) => {
  const { iat, exp } = generateIatExp()
  const result = jwt.sign({ email, iat, exp }, process.env.CRYPTR_KEY)
  return result
}

module.exports.checkJWT = (token) => {
  // verify a token symmetric - synchronous
  return jwt.verify(token, process.env.CRYPTR_KEY, function (err, decoded) {
    return { err, decoded }
  })
}
