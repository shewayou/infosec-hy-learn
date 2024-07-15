const express = require('express');
const helmet= require('helmet')
const PORT = process.env.PORT || 3030;

const app = express();


module.exports = app;
const api = require('./server.js');
app.use(express.static('public'));
app.disable('strict-transport-security');

app.disable('x-powered-by');
app.use(helmet());  // HY 20240714  exercise # 2
app.use(helmet.hidePoweredBy());
/* Multiple lines of comment
*/

/* *** Use only helmet contentSecurityPolicy and NO xFrameOptions at all.
// app.use(helmet.frameguard( { action: "deny" }));
app.use(helmet(
  { xFrameOptions: { action: "deny" }  }  
));
// The above learned from:::  https://helmetjs.github.io/#x-frame-options   
*** */

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: { "frame-ancestors": [ "'none'" ], },
    },
  })
);



app.use('/_api', api);
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});


app.listen( PORT, () => {
  console.log( `Hsiwei Yu: Info Security App Started on port ${PORT}`);
} );
