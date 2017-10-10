/// <reference path=""../typings/index.d.ts"/>
var mysql = require("mysql");
// import mysql from 'mysql'
require('dotenv').config();

var connection = mysql.createConnection({
  host     : process.env.MYSQL_HOST
  user     : process.env.MYSQL_USER,
  password : process.env.MYSQL_PASSWORD,
  database : process.env.MYSQL_DATABASE
});


export namespace MySql{
    export class MySqlBasic{
        public queries = {
            selectAllPersons:'SELECT * from demo_persons',
            selectCountPersons:'SELECT count(*) as nrPersons from demo_persons'
        }
        constructor(){
            connection.connect();
        }
        executeQuery (query:string,callback:(results:[any],fields:[any])=>void ) {
            connection.query(query, function (error, results, fields) {
                if (error) throw error;
                callback(results,fields);
              });
        }
        endConnection() {
            connection.end();
        }
    }

}


