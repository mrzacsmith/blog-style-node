const path = require('path')
const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const helmet = require('helmet')
const exphbs = require('express-handlebars')

const indexRouter = require('./routes/index.js')

const connectDB = require('./config/db.js')

// load config
dotenv.config({ path: './config/config.env' })

connectDB()

const app = express()
app.use(helmet())

// logging for dev only
if (process.env.NODE_ENV == 'development') {
  app.use(morgan('dev'))
}

// handlebars
app.engine('.hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', '.hbs')

// static files
app.use(express.static(path.join(__dirname, 'public')))

// routes
app.use('/', indexRouter)

const PORT = process.env.PORT || 5555
app.listen(PORT, () => {
  console.log(
    `\n** Server running in ${process.env.NODE_ENV} mode on port ${PORT} **`
  )
})
