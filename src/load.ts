/// <reference path="../typings/index.d.ts" />
require('dotenv').config();

const request = require('request');

console.log("Starting Load.js for creating requests")
setInterval(()=>{
    let url = "http://localhost:" + process.env.PORT + "/"
    console.log("making request to ",url)
    makeRequest(url);

},10000)
setInterval(()=>{
    let url = "http://localhost:" + process.env.PORT + "/count"
    console.log("making request to ",url)
    makeRequest(url)
},15000)

var makeRequest = (url)=>{
    request(url, { json: true }, (err, res, body) => {
        if (err) { return console.log(err); }
        console.log(body[0])
       });
}