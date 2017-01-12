var express = require('express'),
    _       = require('lodash');
var mysql   = require("mysql");
var ejwt    = require('express-jwt');
var jwt     = require('jsonwebtoken');
var config  = require('../config');


function REST_ROUTER(router,connection,md5) {
    var self = this;
    self.handleRoutes(router,connection,md5);
}
REST_ROUTER.prototype.handleRoutes = function(router,connection,md5) {

    router.get("/",function(req,res){
        res.json({"Message" : ""});
    });

    var jwtCheck = ejwt({
        secret: config.secretKey
    });

    function createToken(user) {
        return jwt.sign(_.omit(user, 'encrypted_password'), config.secretKey, { expiresIn: 60*60*5 });
    }

    function getUserDB(name, done) {
        connection.query('SELECT * FROM users WHERE name = ? LIMIT 1', [name], function(err, rows, fields) {
            if (err) throw err;
            //console.log(rows[0]);
            done(rows[0]);
        });
    }

    router.post('/login/create', function(req, res) {
        if (!req.body.name || !req.body.encrypted_password) {
            return res.status(400).send("You must send the username and the password");
        }

        getUserDB(req.body.name, function(user){
            if(!user) {
                user = {
                    name: req.body.name,
                    encrypted_password: req.body.encrypted_password,
                    email: req.body.email,
                    role: 'Regitered'
                };
                connection.query('INSERT INTO users SET ?', [user], function(err, result){
                    if (err) throw err;
                    newUser = {
                        id: result.insertId,
                        name: user.name,
                        encrypted_password: user.encrypted_password,
                        email: user.email,
                        role: 'Regitered'
                    };
                    //console.log(newUser);
                    res.status(201).send({
                        id_token: createToken(newUser)
                    });
                });
            }
            else res.status(400).send("A user with that username already exists");
        });
    });

    router.post('/login/', function(req, res) {
        if (!req.body.name || !req.body.encrypted_password) {
            return res.status(400).send("You must send the username and the password");
        }

        getUserDB(req.body.name, function(user){
            if (!user) {
                return res.status(401).send("The username is not existing");
            }

            if (user.encrypted_password !== req.body.encrypted_password) {
                return res.status(401).send("The username or password don't match");
            }

            console.log("hizo login perro!");
            res.status(201).send({
                id_token: createToken(user)

            });
        });
    });
    router.post('/dashboard/', function(req, res) {
        if (!req.body.name || !req.body.encrypted_password) {
            return res.send("You must send the username and the password");
        }

        getUserDB(req.body.name, function(user){
            if (!user) {
                return res.send("The username is not existing");
            }

            if (user.encrypted_password !== req.body.encrypted_password) {
                return res.send("The username or password don't match");
            }

            console.log("hizo login perro!");

            res.render('dashboard', { title: 'Hey', message: 'Hello there!' });
            // res.status(201).send({
            //     id_token: createToken(user)
            //
            // });
        });
    });

    router.get('/login/check/:name', function(req, res) {
        if (!req.params.name) {
            return res.status(400).send("You must send a username");
        }

        getUserDB(req.params.name, function(user){
            if(!user) res.status(201).send({name: "OK"});
            else res.status(400).send("A user with that username already exists");
        });
    });

};
// 3306
module.exports = REST_ROUTER;


