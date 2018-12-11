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
    console.log(req.body.events);
    reply(reply_token, msg)
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
  switch (msg) {
    case "สวัสดี":
      return "สวัสดีครับเราคือ ฟาร์มเจ้านาย"
    case "ตรวจสอบสถาณะฟาร์ม":
      return "ท่านยังไม่ติดตั้งอุปกรณ์"
    case "สวัดดี":
      return "สวัสดีครับเราคือ ฟาร์มเจ้านาย"
    case "ชื่ออะไร":
      return "ชื่อฟาร์มเจ้านาย"
    case "ทำอะไรได้บ้าง":
      return "มีอะไรในฟาร์ที่พอจะทำได้ก็จะทำ"
     case "แสดงคำสั่ง":
      return "คำสั่งมีทั้งหมด ดังนี้ 1.ดูอุณหภูมิฟาร์ม 2.ปิดพัดลม 3เปิดพัดลม"
    case "ปิดพัดลม":
      return "อุปกรณ์ยังไม่ติดตั้ง"
     case "ดูอุณหภูมิ":
      return "อุปกรณ์ยังไม่ติดตั้ง"
    default:
      return "กรุณาพิมพ์คำสั่งที่ท่านต้องการสั่งการทำงานอุปกรณ์"
  }
}
