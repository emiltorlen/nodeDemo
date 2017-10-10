/// <reference path="../typings/index.d.ts"/>
require('dotenv').config({path: __dirname + '\\.env'});

import fs from 'fs':
var express = require('express');
var app = express();
// var https = require("https");
var bodyParser = require('body-parser')
import {MySql} from './mysql'

let appSql = new MySql.MySqlBasic();

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Content-Type');

    // // Set to true if you need the website to include cookies in the requests sent
    // // to the API (e.g. in case you use sessions)
    // res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

// app.use(express.bodyParser());
app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: false }));


app.get("/",function(req,res){
    appSql.executeQuery(appSql.queries.selectAllPersons,(results,fields)=>{
        res.send(results); 
    })
})

app.get("/count",(req,res)=>{
    appSql.executeQuery(appSql.queries.selectCountPersons,(result,fields)=>{
        res.send(result);
    })
})

app.listen(3000,function(){
    console.log("Running...");
})

