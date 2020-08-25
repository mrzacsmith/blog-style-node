const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db.js')

// load config
dotenv.config({ path: './config/config.env' })

connectDB()

const app = express()

const PORT = process.env.PORT || 5555
app.listen(PORT, () => {
  console.log(
    `\n** Server running in ${process.env.NODE_ENV} mode on port ${PORT} **\n`
  )
})
