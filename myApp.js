const express = require('express');
const hemlet= require('helmet')
const PORT = process.env.PORT || 3030;

const app = express();


module.exports = app;
const api = require('./server.js');
app.use(express.static('public'));
app.disable('strict-transport-security');
app.use('/_api', api);
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});


app.listen( PORT, () => {
  console.log( `:brocoli:Useful Programmer Info Security App Started on port ${PORT}`);
} );
