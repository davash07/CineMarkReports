/**
 * Created by devios on 10/01/17.
 */
var mysql   = require("mysql");

function REST_ROUTER(router,connection) {
    var self = this;
    self.handleRoutes(router,connection);
}

REST_ROUTER.prototype.handleRoutes = function(router,connection) {
    //
    // //Allow CORS conections.
    // router.use(function(req, res, next) {
    //     res.setHeader('Access-Control-Allow-Origin', '*');
    //     res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    //     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    //     next();
    // });

    router.get("/failures",function(req,res){
        var query = "SELECT * FROM ??";
        var table = ["failures"];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Success", "Failures" : {"name":rows}});

            }
        });
    });

    router.get("/failures/:id",function(req,res){
        var query = "SELECT * FROM ?? WHERE ??=?";
        var table = ["failures","id",req.params.id];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Success", "failures" : rows});
            }
        });
    });

    router.post("/failures",function(req,res){
        var query = "INSERT INTO ??(??,??) VALUES (?,?)";
        var table = ["failures","name","id",req.body.name,req.body.id];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Failure Added !"});
            }
        });
    });

    router.put("/failures",function(req,res){
        var query = "UPDATE ?? SET ?? = ?  WHERE ?? = ?";
        var table = ["failures","name",req.body.name];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Updated failures "});
            }
        });
    });

    router.delete("/failures/:id",function(req,res){
        var query = "DELETE from ?? WHERE ??=?";
        var table = ["failures","id",req.params.id];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Deleted the failures"});
            }
        });
    });
    router.delete("/failures/",function(req,res){
        var query = "DELETE from ?? WHERE ??=?";
        var table = ["failures","id",req.params.id];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Deleted the failures"});
            }
        });
    });
};

module.exports = REST_ROUTER;
