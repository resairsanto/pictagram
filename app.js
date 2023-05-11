const express = require('express')
const app = express()
const router = require('./routes')
const session = require('express-session')
const port = 3000

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.use(session({
    secret: 'secret key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        sameSite: true
    }
}))

app.use(router)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})