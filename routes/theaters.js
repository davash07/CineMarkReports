var mysql   = require("mysql");

function REST_ROUTER(router,connection,md5) {
    var self = this;
    self.handleRoutes(router,connection,md5);
}

REST_ROUTER.prototype.handleRoutes = function(router,connection,md5) {
    var self = this;
    router.get("/theaters",function(req,res){
        var query = "SELECT * FROM ??";
        var table = ["theaters"];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Success", "Users" : rows});
            }
        });
    });

    router.get("/theaters/:id",function(req,res){
        var query = "SELECT * FROM ?? WHERE ??=?";
        var table = ["theaters","id",req.params.id];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Success", "Users" : rows});
            }
        });
    });

    router.post("/theaters",function(req,res){
        var query = "INSERT INTO ??(??,??) VALUES (?,?)";
        var table = ["theaters","name","city_id",req.body.name,req.body.city_id];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "User Added !"});
            }
        });
    });

    router.put("/theaters",function(req,res){
            var query = "UPDATE ?? SET ?? = ?  WHERE ?? = ?";
        var table = ["theaters","name",req.body.name];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Updated City "});
            }
        });
    });

    router.delete("/theaters/:id",function(req,res){
        var query = "DELETE from ?? WHERE ??=?";
        var table = ["theaters","id",req.params.id];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Deleted the City"});
            }
        });
    });
};

module.exports = REST_ROUTER;
