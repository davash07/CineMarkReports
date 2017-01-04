/**
 * Created by devios on 3/01/17.
 */

var app   = require('express')();
var http = require('http').Server(app);
var bodyParser = require("body-parser");
var mysql = require("mysql");
var connection = require("../connection");
//     mysql.createConnection({
//     host     : 'localhost',
//     user     : 'root',
//     password : '',
//     database : 'cinemark_reports_prod'
// });
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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

app.post('/api/area',function(req,res){
    var name = req.body.name;
    var data = {
        "error":1,
        "Areas":""
    };
    if(!!name){
        connection.query("INSERT INTO areas VALUES('',?)",[name],function(err, rows, fields){
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

// module.exports = router;