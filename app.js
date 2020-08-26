const path = require('path')
const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const morgan = require('morgan')
const helmet = require('helmet')
const exphbs = require('express-handlebars')
const passport = require('passport')
const session = require('express-session')
const indexRouter = require('./routes/index.js')
const authRouter = require('./routes/auth.js')
const MongoStore = require('connect-mongo')(session)
const connectDB = require('./config/db.js')

// load config
dotenv.config({ path: './config/config.env' })

// passport config
require('./config/passport.js')(passport)

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

// sessions middleware ~ before passport middleware //
app.use(
  session({
    secret: 'lskjdf20384lskjf',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
)

// passport middleware
app.use(passport.initialize())
app.use(passport.session())

// static files
app.use(express.static(path.join(__dirname, 'public')))

// routes
app.use('/', indexRouter)
app.use('/auth', authRouter)

const PORT = process.env.PORT || 5555
app.listen(PORT, () => {
  console.log(
    `\n** Server running in ${process.env.NODE_ENV} mode on port ${PORT} **`
  )
})
