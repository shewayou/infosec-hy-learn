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

// The next 2 comment blocks pertain to 3: frameguard: X-Frame-Options or Content-Security-Policy
/* *** Use only helmet contentSecurityPolicy and NO xFrameOptions at all.
app.use(helmet(
  { xFrameOptions: { action: "deny" }  }  
));
// The above learned from:::  https://helmetjs.github.io/#x-frame-options   
*** */
/* ***
app.use(
  helmet.contentSecurityPolicy( {
      directives: { "frame-ancestors": [ "'none'" ] }
  }
));
*** */
app.use(helmet.frameguard( { action: "deny" })); // 3: frameguard: X-Frame-Options or Content-Security-Policy



app.use(  helmet.xssFilter(  ));  // 4: Cross-site scripting (XSS) 

app.use(  helmet.noSniff(  ));  // 5: instructing the browser to not bypass the provided Content-Type. 

app.use( helmet.ieNoOpen());  // 6: Prevent IE from Opening Untrusted HTML

// 7: Ask Browsers to Access Your Site via HTTPS Only with helmet.hsts()
const ninetyDaysInSeconds= 90*24*60*60;
app.use( helmet.hsts(  { maxAge: ninetyDaysInSeconds, force: true }  ));  // 7: HTTP Strict Transport Security (HSTS)

// 8: Disable DNS Prefetching
app.use(helmet.dnsPrefetchControl({ allow: false }))

// 9: Disable Client-Side Caching
app.use(helmet.noCache( ))

// 10: Content-Security-Policy
app.use(
  helmet.contentSecurityPolicy( {
      directives: { "defaultSrc": ["'self'"], "scriptSrc": ["'self'", 'trusted-cdn.com'] }
    } 
));




app.use('/_api', api);
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});


app.listen( PORT, () => {
  console.log( `Hsiwei Yu: Info Security App Started on port ${PORT}`);
} );