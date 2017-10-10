"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path=""../typings/index.d.ts"/>
var mysql = require("mysql");
// import mysql from 'mysql'
require('dotenv').config();
var connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
});
var MySql;
(function (MySql) {
    var MySqlBasic = /** @class */ (function () {
        function MySqlBasic() {
            this.queries = {
                selectAllPersons: 'SELECT * from demo_persons',
                selectCountPersons: 'SELECT count(*) as nrPersons from demo_persons'
            };
            connection.connect();
        }
        MySqlBasic.prototype.executeQuery = function (query, callback) {
            connection.query(query, function (error, results, fields) {
                if (error)
                    throw error;
                callback(results, fields);
            });
        };
        MySqlBasic.prototype.endConnection = function () {
            connection.end();
        };
        return MySqlBasic;
    }());
    MySql.MySqlBasic = MySqlBasic;
})(MySql = exports.MySql || (exports.MySql = {}));
