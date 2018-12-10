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
    let replyToken = req.body.events[0].replyToken;
    let msg = req.body.events[0].message.text;

    console.log(`Message token : ${replyToken}`);
    console.log(`Message from chat : ${msg}`);

    res.json({
      status: 200,
      message: `Webhook is working!`
    });
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
