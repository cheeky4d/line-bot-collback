const express = require('express');

const app = express();
app.post('/webhooks', (req, res) => res.sendStatus(200))
app.get('/', (req, res) => res.end('<h1>Hello World</h1>');)

app.listen(4000, () => console.log('Server started on port 4000'));
