const express = require('express'),
expressValidator = require('express-validator'),
bodyParser = require('body-parser'),
session = require('express-session'),
cookieParser = require('cookie-parser'),
flash = require('express-flash'),
app = express()

app.set('view engine', 'ejs')
app.set('port', process.env.PORT || 3030)

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(expressValidator())
app.use(express.static('public'))
app.use(cookieParser())
app.use(session({
    secret: 'sir',
    key: 'kukieni kaliti',
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge:60000}
}))
app.use(flash())

const router = require('./routes/router')
app.use('/', router)

app.use((req, res, next) => {
    res.status(404).send('404 Not Found')
    next()
})

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('500 Internal Server Error')
    next()
})

app.listen(app.get('port'), () => {
    console.log(`Server ishga tushdi. Port: ${app.get('port')}`)
})