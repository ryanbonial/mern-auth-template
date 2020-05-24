const express = require('express');

const app = express();

app.get('/ping', (req, res) => res.send('pong'));

console.log('Server listening on http://127.0.0.1:4000/ping')
app.listen(4000);