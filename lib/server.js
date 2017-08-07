'use strict';

// https://www.npmjs.com/package/request

const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
app.set('port', port);
const request = require('request');

// MIDDLEWARE (transform stream)
// Every request will be run through this function and add these things to the request's header
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.get('/api/get/*', (req, res) => {
  // cuts '/api/search/' off of the string, leaving what comes after it
  let apiCall = req.url.slice('/api/get/'.length)
  // &rId=35171
  let apiReq = `http://food2fork.com/api/get?key=939b9610caaf12e8360247b3e729ce22&rId=${apiCall}`
  // fetch the api results then send them back to the front end as a respsonse (res)
  request.get(apiReq, (err, _, body) => {
    res.send(body)
  });
});

app.get('/api/search/*', (req, res) => {
  // cuts '/api/search/' off of the string, leaving what comes after it
  let apiCall = req.url.slice('/api/search/'.length)
  let apiReq = `http://food2fork.com/api/search?key=939b9610caaf12e8360247b3e729ce22&q=${apiCall}`
  // fetch the api results then send them back to the front end as a respsonse (res)
  request.get(apiReq, (err, _, body) => {
    res.send(body)
  });
});

app.get('/api/search/*', (req, res) => {
  // cuts '/api/search/' off of the string, leaving what comes after it
  let apiCall = req.url.slice('/api/search/'.length)
  let apiReq = `http://food2fork.com/api/search?key=939b9610caaf12e8360247b3e729ce22&sort=${apiCall}`
  // fetch the api results then send them back to the front end as a respsonse (res)
  request.get(apiReq, (err, _, body) => {
    res.send(body)
  });
});

app.listen(port, () =>
  console.log(`Listening on port: ${port}`)
)