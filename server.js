var crypto = require('./routes/encrypt');
var app   = require('express')();
var http = require('http').Server(app);
var bodyParser = require("body-parser");
var mysql = require("mysql");
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'cinemark_reports_prod'
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// GET Area
app.get('/api/area',function(req,res){
    var data = {
        "error":1,
        "Areas":""
    };
    connection.query("SELECT * from areas",function(err, rows, fields){
        if(rows.length != 0){
            data["error"] = 0;
            data["Areas"] = rows;
            res.json(data);
        }else{
            data["Areas"] = 'No Areas Found..';
            res.json(data);
        }
    });
});
// GET Profile
app.get('/api/profile', function (req, res) {
    var data = {
        "error":1,
        "Profiles":""
    };
    connection.query("SELECT * from profiles", function (err, rows, fields) {
        if(rows.length!=0){
            data["error"] = 0;
            data["Profiles"] = rows;
            res.json(data);
        }else{
            data["Profiles"] = 'No Profiles Found..';
            res.json(data);
        }
    });
});
// GET Users
app.get('/api/users', function (req, res) {
    var data = {
        "error":1,
        "Users":""
    };
    connection.query("SELECT * from users", function (err, rows, fields) {
        if(rows.length!=0){
            data["error"] = 0;
            data["Users"] = rows;
            res.json(data);
        }else{
            data["Users"] = 'No Users Found..';
            res.json(data);
        }
    });
});
// GET Categorias
app.get('/api/categories', function (req, res) {
    var data = {
        "error":1,
        "Category":""
    };
    connection.query("Select * from categories", function (err, rows, fields) {
        if(rows.length!=0){
            data["error"]=0;
            data["Categories"] = rows;
            res.json(data);
        }else{
            data["Categories"] = 'No Categories Found..';
            res.json(data);
        }
    });
});
//GET Theaters
app.get('/api/theaters', function (req, res) {
    var data ={
        "error": 1,
        "Theaters": ""
    };
    connection.query("Select * from theaters", function (err, rows, fields) {
        if(rows.length!=0){
            data["error"] =0;
            data["Theaters"] = rows;
            res.json(data);
        }else {
            data["Theaters"] = 'No Categories Found..';
            res.json(data);
        }
    });
});

app.post('/api/login',function(req,res){
    var email = req.body.email;
    var password = req.body.password;
    var encryppassword = encrypt(password);
    var data = {
        "error":1,
        "Book":""
    };
    if(!!email && !!password){
        connection.query("INSERT INTO users VALUES('',?,?)",[email,password],function(err, rows, fields){
            if(!!err){
                data["Users"] = "Error Adding data";
            }else{
                data["error"] = 0;
                data["Users"] = "Added Successfully";
            }
            res.json(data);
        });
    }else{
        data["User"] = "Please provide all required data (i.e : Email, Password)";
        res.json(data);
    }
});

app.post("/api/area", function(req, res){
    var area = getArea(req.body);

    db.query("INSERT INTO areas(name, created_at, updated_at) VALUES (?,?,?)",
        [area.name, area.created_at, area.updated_at],
        function(err, result){
            sendResponse(res, "inserted", result ?result.insertId:null, err);
        });
});

app.post('/api/area',function(req,res){
    var name = req.body.name;
    var data = {
        "error":1,
        "Areas":""
    };
    if(!!name){
        connection.query("INSERT INTO areas (name) VALUES('', ?)",[name],function(err, rows, fields){
            if(!!err){
                data["Areas"] = "Error Adding data";
            }else{
                data["error"] = 0;
                data["Areas"] = "Area Added Successfully";
            }
            res.json(data);
        });
    }else{
        data["Areas"] = "Please provide all required data (i.e : Name)";
        res.json(data);
    }
});

app.put('/api/area',function(req,res){
    var id = req.body.id;
    var name = req.body.name;
    var data = {
        "error":1,
        "Areas":""
    };
    if(!!id && !!name ){
        connection.query("UPDATE areas SET name=? WHERE id=?",[name, id],function(err, rows, fields){
            if(!!err){
                data["Areas"] = "Error Updating data";
            }else{
                data["error"] = 0;
                data["Areas"] = "Updated Area Successfully";
            }
            res.json(data);
        });
    }else{
        data["Areas"] = "Please provide all required data (i.e : id, name)";
        res.json(data);
    }
});

app.delete('/api/area',function(req,res){
    var id = req.body.id;
    var data = {
        "error":1,
        "Areas":""
    };
    if(!!id){
        connection.query("DELETE FROM areas WHERE id=?",[id],function(err, rows, fields){
            if(!!err){
                data["Areas"] = "Error deleting data";
            }else{
                data["error"] = 0;
                data["Areas"] = "Delete Area Successfully";
            }
            res.json(data);
        });
    }else{
        data["Areas"] = "Please provide all required data (i.e : id )";
        res.json(data);
    }
});

http.listen(8080,function(){
    console.log("Connected & Listen to port 8080");
});
