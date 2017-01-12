/**
 * Created by devios on 10/01/17.
 */
var mysql   = require("mysql");

function REST_ROUTER(router,connection) {
    var self = this;
    self.handleRoutes(router,connection);
}

REST_ROUTER.prototype.handleRoutes = function(router,connection) {
    var self = this;

    router.get("/areas",function(req,res){
        var query = "SELECT * FROM ??";
        var table = ["areas"];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Success", "Areas" : {"name":rows}});

            }
        });
    });

    router.get("/areas/:id",function(req,res){
        var query = "SELECT * FROM ?? WHERE ??=?";
        var table = ["areas","id",req.params.id];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Success", "Areas" : rows});
            }
        });
    });

    router.post("/areas",function(req,res){
        var query = "INSERT INTO ??(??,??) VALUES (?,?)";
        var table = ["areas","name","id",req.body.name,req.body.id];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Area Added !"});
            }
        });
    });

    router.put("/areas",function(req,res){
        var query = "UPDATE ?? SET ?? = ?  WHERE ?? = ?";
        var table = ["areas","name",req.body.name];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Updated Area "});
            }
        });
    });

    router.delete("/areas/:id",function(req,res){
        var query = "DELETE from ?? WHERE ??=?";
        var table = ["areas","id",req.params.id];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Deleted the Area"});
            }
        });
    });
};

module.exports = REST_ROUTER;
