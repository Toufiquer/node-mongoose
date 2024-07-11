/*
|-----------------------------------------
| setting up Authorization for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: Toufiquer, July, 2024
|-----------------------------------------
*/

module.exports = (...roles) => {
  return (req, res, next) => {
    const userRole = req.user?.role
    if (!roles.includes(userRole)) {
      return res
        .status(403)
        .json({ status: 'fail', error: "You don't have authorization." })
    } else {
      next()
    }
  }
}
