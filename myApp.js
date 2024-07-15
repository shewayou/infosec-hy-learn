const express = require('express');
const helmet= require('helmet')
const PORT = process.env.PORT || 3030;

const app = express();


module.exports = app;
const api = require('./server.js');
app.use(express.static('public'));
app.disable('strict-transport-security');

app.disable('x-powered-by');

// 11: 
app.use(
  helmet( 
));

// 9: Disable Client-Side Caching
app.use(helmet.noCache( ))

// 10: Content-Security-Policy
app.use(
  helmet.contentSecurityPolicy( {
      directives: { "defaultSrc": ["'self'"], "styleSrc": [ 'style.com'] }
    } 
));




app.use('/_api', api);
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});


app.listen( PORT, () => {
  console.log( `Hsiwei Yu: Info Security App Started on port ${PORT}`);
} );
