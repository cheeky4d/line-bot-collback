const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const path = require('path')
const PORT = process.env.PORT || 5000

express()
    .use(bodyParser.urlencoded({ extended: false }))
    .use(bodyParser.json())
    .use(express.static(path.join(__dirname, 'public')))
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')
    .post('/', (req, res) => {
      let reply_token = req.body.events[0].replyToken
      reply(reply_token)
      res.sendStatus(200)
    })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

  function reply(reply_token) {
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer {4EsKNf/CN1c5fUaTuyINPM7Q7nizwxZRGceXgLhZyYR4DV/03j8VqnmPiyEjfrdWY6hpjvk0UhwS/AgmPfenIeSsXQWVm1o3pm9KdrlDhI5YeZdWX/mOkpD2XFzdG+TG4EEoay0VcPbtlW8WPFBS1QdB04t89/1O/w1cDnyilFU=}'
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