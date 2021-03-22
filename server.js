const express = require('express');

const app = express();

app.use(express.static('./dist/paymentsense-coding-challenge-website'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: 'dist/paymentsense-coding-challenge-website/'}),
);

app.listen(process.env.PORT || 8080);

console.log('express server is listening ' + process.env.PORT)