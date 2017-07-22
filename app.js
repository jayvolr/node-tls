const express = require('express');
var app = express();

app
  .set("view engine", "hjs")

  .get('/', (req, res)=>{
    res.render("index");
  })
  .get('/about', (req, res)=>{
    res.render("about");
  })

  .listen(3000, ()=>{
    console.log("Server listening on port 3000...");
  });
