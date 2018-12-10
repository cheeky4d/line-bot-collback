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
app.post('/webhooks', (req, res) => {
    let reply_token = req.body.events[0].replyToken
    let msg = req.body.events[0].message.text
    reply(reply_token, msg)
    res.sendStatus(200)
})
app.listen(PORT, () => console.log(`Listening on ${PORT}`))

function reply(reply_token) {
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer {h3MOG4XttJfbMVHWMLjavfqiiNxix9LqFhujfrCMI7Fp2IaFJp9ONJYOyM6y4g+nY6hpjvk0UhwS/AgmPfenIeSsXQWVm1o3pm9KdrlDhI46+sSjRXOwzhTgIVbiMrbsLJ97VtvoBoMAui+B5T2q+AdB04t89/1O/w1cDnyilFU=}'
    }
    let body = JSON.stringify({
        replyToken: reply_token,
        messages: [{
            type: 'text',
            text: 'Hello'
        },
        {
            type: 'text',
            text: 'How are you?'
        }]
    })
    request.post({
        url: 'https://api.line.me/v2/bot/message/reply',
        headers: headers,
        body: body
    }, (err, res, body) => {
        console.log('status = ' + res.statusCode);
    });
}