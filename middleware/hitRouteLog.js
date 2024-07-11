/*
|-----------------------------------------
| setting up HitRouteLog for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: Toufiquer, July, 2024
|-----------------------------------------
*/

module.exports = async (req, res, next) => {
  try {
    const route = req
    console.log('')
    console.log('')
    console.log('')
    console.log('hit the route : ', `${route.method}, ${route.baseUrl}`)
    console.log('')
    next()
  } catch (e) {
    console.error('Error during Log the route name:', e) // Log errors
    return res
      .status(500)
      .json({ status: 'fail', error: 'Internal server error' })
  }
}
