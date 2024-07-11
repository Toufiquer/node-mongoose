/*
|-----------------------------------------
| setting up VerifyToken for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: Toufiquer, July, 2024
|-----------------------------------------
*/

const { getUserEmailPass } = require('../src/user/service')
const { checkJWT } = require('../utils/jwt')

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')?.[1]
    if (!token) {
      return res
        .status(400)
        .json({ status: 'fail', error: 'Please provide a valid token' })
    } else {
      const deCodeJwtData = checkJWT(token)
      if (deCodeJwtData?.err?.message?.includes('jwt expired')) {
        return res.status(400).json({
          status: 'fail',
          isExpire: true,
          error: 'Token is invalid. Please login',
        })
      } else {
        // Get user data from the database
        const dbUser = await getUserEmailPass({
          email: deCodeJwtData.decoded?.email,
        })
        if (!dbUser.email) {
          return res
            .status(400)
            .json({ status: 'fail', error: 'Token is invalid' })
        }
        // save this user data in global req for using later.
        req.user = dbUser
      }
    }
    next()
  } catch (e) {
    console.error('Error during verify Token:', e) // Log errors
    return res
      .status(500)
      .json({ status: 'fail', error: 'Internal server error' })
  }
}
