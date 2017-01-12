var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var path = require('path');
var user = require("./routes/users");
var theater = require("./routes/theaters");
var city = require("./routes/cities");
var area = require("./routes/areas");
var failure = require("./routes/failures");
var login = require("./routes/login");
var routes = require('./routes/index');
var md5 = require('md5');
var app = express();
var port = process.env.PORT || 4000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use('/', routes);

function REST(){
    var self = this;
    self.connectMysql();
}


module.exports = app;

REST.prototype.connectMysql = function() {
    var self = this;
    var pool      =    mysql.createPool({
        connectionLimit : 100,
        host     : 'localhost',
        user     : 'root',
        password : '',
        database : 'cinemark_reports_prod',
        debug    :  false
    });
    pool.getConnection(function(err,connection){
        if(err) {
            self.stop(err);
        } else {
            self.configureExpress(connection);
        }
    });
};

REST.prototype.configureExpress = function(connection) {
    var self = this;
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    var router = express.Router();
    app.use('/api', router);
    var user_router = new user(router,connection,md5);
    var theater_router = new theater(router,connection);
    var city_router = new city(router,connection);
    var area_router = new area(router,connection);
    var failure_router = new failure(router, connection);
    var login_router = new login(router, connection, md5);
    self.startServer();
};

REST.prototype.startServer = function() {
    app.listen(port ,function(){
        console.log("All right ! I am alive at Port " + port);
    });
};

REST.prototype.stop = function(err) {
    console.log("ISSUE WITH MYSQL \n" + err);
    process.exit(1);
};

new REST();


