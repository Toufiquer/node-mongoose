require('dotenv').config()
const { DBConnect } = require('./utils/dbConnect')

const app = require('./app')

// database connection
DBConnect()

// server
const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`App is running on port ${port}`)
})
