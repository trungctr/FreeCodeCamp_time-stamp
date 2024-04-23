// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// [Get]/api/:date
app.get("/api/:date?", function (req, res) {
  let reqDate = req.params.date
  let check = Number(reqDate)
  let er= { error : "Invalid Date" };
  if(!reqDate){
    let date = Date(Date.now())
    res.json({"unix":Date.parse(date),"utc": date.toString().split(' (')[0]});
  }
  if(check){
    let gmt= new Date(check)
    res.json({"unix":check,"utc": gmt.toGMTString()});
  }
  else{
    let unix = new Date(reqDate)
    let check2 = JSON.stringify(unix)
    if(check2 == 'null'){
      res.json(er);
    }
    res.json({"unix":Date.parse(unix),"utc": unix.toGMTString()});
  }
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
