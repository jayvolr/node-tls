const fs = require('fs'),
    http = require('http'),
    https = require('https'),
    express = require('express');

const app = express();

if (process.env.NODE_ENV === "production") {
  app.all('*', (req, res, next)=>{
    if(req.headers['x-forwarded-proto'] === 'https'){
       // OK, continue
       return next();
     };
     res.redirect('https://' + req.headers.host + req.path);
   });
}

app
  .set("view engine", "hjs")
  .use(express.static('public'))

  .get('/', (req, res)=>{
    res.render("index");
  })
  .get('/about', (req, res)=>{
    res.render("about");
  })
  .listen(3000, ()=>{
    console.log("Server listening on port 3000...");
  });

  if (process.env.NODE_ENV === "production") {

    var options = {
      key: fs.readFileSync('/etc/letsencrypt/live/jayvolr.me/privkey.pem'),
      cert: fs.readFileSync('/etc/letsencrypt/live/jayvolr.me/cert.pem')
    };

    var server = https.createServer(options, app).listen(443, ()=>{
      console.log("TLS server listening on port 443...");
    })

  }
