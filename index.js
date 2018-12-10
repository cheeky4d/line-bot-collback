const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const path = require('path')

const app = express()
const PORT = process.env.PORT || 5000
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.post('/webhooks', (req, res) => res.sendStatus(200))
app.listen(PORT, () => console.log(`Listening on ${PORT}`))

