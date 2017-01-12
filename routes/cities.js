/**
 * Created by devios on 6/01/17.
 */
var mysql   = require("mysql");

function REST_ROUTER(router,connection) {
    var self = this;
    self.handleRoutes(router,connection);
}

REST_ROUTER.prototype.handleRoutes = function(router,connection) {
    var self = this;
    //
    // router.use(function(req, res, next) {
    //     res.setHeader('Access-Control-Allow-Origin', '*');
    //     res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    //     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    //     next();
    // });

    router.get("/cities",function(req,res){
        // var query = "SELECT * FROM ??";
        var query = "SELECT c.id, t.city_id, c.name AS Ciudad, t.name AS Teatro FROM cities c, theaters t WHERE c.id = t.city_id";
        var table = ["cities"];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Success", "Cities" : {"name":rows, "theaters":rows}});

            }
        });
    });

    router.get("/cities/:id",function(req,res){
        var query = "SELECT * FROM ?? WHERE ??=?";
        var table = ["cities","id",req.params.id];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Success", "Cities" : rows});
            }
        });
    });

    router.post("/cities",function(req,res){
        var query = "INSERT INTO ??(??,??) VALUES (?,?)";
        var table = ["cities","name","id",req.body.name,req.body.id];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "User Added !"});
            }
        });
    });

    router.put("/cities",function(req,res){
        var query = "UPDATE ?? SET ?? = ?  WHERE ?? = ?";
        var table = ["cities","name",req.body.name];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Updated City "});
            }
        });
    });

    router.delete("/cities/:id",function(req,res){
        var query = "DELETE from ?? WHERE ??=?";
        var table = ["cities","id",req.params.id];
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
