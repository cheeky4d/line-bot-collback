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
    let msg = req.body.events[0].message.text
    console.log(req.body.events[0]);
    reply(reply_token, req.body.events[0])
    res.sendStatus(200)
  })
  .listen(PORT, () => console.log(`Listening on ${PORT}`))

function reply(reply_token, msg) {
  let headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer {DKEDzTHZXm1K7Pn8AlsqJahFCVtEVab4YafO9XdLgfHBO4nn3+31RdkQIkiYYUmZS8iPzrJs1SXxtRHV/qhKi+SuKZAG2gQZQXk4qpPSRNy13ajj71DGaHlx8RjGaUzdhHOPa+oCoTOzt2QC5Srq2QdB04t89/1O/w1cDnyilFU=}'
  }
  let body = JSON.stringify({
    replyToken: reply_token,
    messages: [{
      type: 'text',
      text: messages(msg)
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

function messages(msg) {
  return msg
//   switch (msg) {
//     case "สวัสดี":
//       return "หวัดดีไอสัส"
//     case "ทำอะไรอยู่":
//       return "อ่านหนังสือ"
//     case "ชื่ออะไร":
//       return "ชื่อไรก็ได้โตแล้ว"
//     default:
//       return "xxxxx"
//   }
}
