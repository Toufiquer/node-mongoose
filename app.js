const express = require('express')
const app = express()
const cors = require('cors')

const productRoute = require('./src/products/routes/product.route')
const brandsRoute = require('./src/brands/routes/brand.route')
const categoryRoute = require('./src/category/routes/category.route')
const stocksRoute = require('./src/stocks/routes/stock.route')
const storesRoute = require('./src/stores/routes/store.route')
const supplierRoute = require('./src/supplier/route')
const userRoute = require('./src/user/route')
const userLoginRoute = require('./src/user/login-route')
const userVerifyRoute = require('./src/user/verify-route')
const selfRoute = require('./src/user/self-route')

const imageRoute = require('./src/image/image.route')

const verifyToken = require('./middleware/verifyToken')
const hitRouteLog = require('./middleware/hitRouteLog')
const authorization = require('./middleware/authorization')

// middle ware
app.use(express.json())
app.use(cors())

app.use('/v1/products', hitRouteLog, productRoute)
app.use('/v1/brands', hitRouteLog, brandsRoute)
app.use('/v1/category', hitRouteLog, categoryRoute)
app.use('/v1/stocks', hitRouteLog, stocksRoute)
app.use('/v1/stores', hitRouteLog, storesRoute)
app.use('/v1/supplier', hitRouteLog, supplierRoute)
app.use('/v1/user', hitRouteLog, userRoute)
app.use('/v1/user/login', hitRouteLog, userLoginRoute)
app.use('/v1/user/verify', hitRouteLog, userVerifyRoute)
app.use(
  '/v1/user/self',
  verifyToken,
  hitRouteLog,
  authorization('admin', 'manager'),
  selfRoute
)

app.use('/v1/file-upload', imageRoute)

app.get('/', (req, res) => {
  res.send({ message: 'Node server is fully running' })
})

app.get('/test', (req, res, next) => {
  res.send({ message: 'Node server is fully running on /test route' })
})

app.all('*', (req, res, next) => {
  res.send({ message: 'URL Not Found' })
})

module.exports = app
