


var express = require("express"); //using the express framework 
var db = require('./db-connections'); 
var app = express(); // set variable app to be an instance of express framework. From now on, app is the express 
 
app.use(express.json()); // json() is a method inbuilt in express to recognize the incoming Request Object from the web client as a JSON Object. 
const path = require('path');
app.use(express.static("./public")); 

var express = require("express");
var app = express();

app.use(express.json());

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/product', function(req, res){
    res.sendFile(path.join(__dirname, 'public', 'product.html'));
});

app.get('/update_product', function(req, res){
    res.sendFile(path.join(__dirname, 'public', 'update_product.html'));
});

app.get('/post_product', function(req, res){
    res.sendFile(path.join(__dirname, 'public', 'post_product.html'));
});

app.route("/test").get( function (req, res) {
    res.json({ message: "hello world" });
});

app.route("/test").post( function (req, res) {
    res.json({ message: "post method" });
});
 
app.route('/products').get(function(req,res){ 
    var sql='SELECT * FROM `E-COMMERCE`.PRODUCT'; 
    db.query(sql,function(error,result){ 
        if(error){ 
            throw error; 
        }else{ 
            res.json(result); 
        } 
    }) 
})

app.route('/product/:id').get( function (req, res) {

    
    var sql = "SELECT * FROM `E-COMMERCE`.PRODUCT where id = ?";
    
    // the parameter to replace the ?
    var parameter = [req.params.id]
    
    db.query(sql,parameter, function(error, result){
        if(error){
            throw error;
        }else{
            //return result as json
            res.json(result);
        }
    }); 
  
  });

  app.route('/product').post( function (req, res) {

    // we do not need the id, it will be auto increment
    var sql = "INSERT INTO `E-COMMERCE`.PRODUCT (name, description, price, category_id, picture) VALUES (?, ?, ?, ?, ?)";
  
    //get the values from the req.body
    //the variable sequence should be the same as the insert sequence in the insert sql
    var parameters = [req.body.name, req.body.description, req.body.price, req.body.category_id, req.body.picture];
    
    db.query(sql, parameters, function(error, result){
        if(error){
            throw error;
        }else{
            //return result as json
            res.json(result);
        }
    });
  
  });

  app.route('/product/:id').put( function (req, res) {

    // update sql statement for one restaurant 
    var sql = "UPDATE `E-COMMERCE`.PRODUCT SET name = ?, description = ?, price = ?, category_id = ?, picture = ? WHERE id = ?";
  
    //get the values from the req.body
    //the variable sequence should be the same as the update sequence in the insert sql
    var parameters = [req.body.name, req.body.description, req.body.price, req.body.category_id, req.body.picture, 
        req.params.id
    ];
    
    db.query(sql, parameters, function(error, result){
        if(error){
            throw error;
        }else{
            //return result as json
            res.json(result);
        }
    });
  
  });

  app.route('/product/:id').delete( function (req, res) {

    
    var sql = "DELETE FROM `E-COMMERCE`.PRODUCT WHERE id = ?";
  
    var parameters = [req.params.id]; 
    
    db.query(sql, parameters, function(error, result){
        if(error){
            throw error;
        }else{
            //return result as json
            res.json(result);
        }
    });
  
  });

  app.route('/category').get( function (req, res) {

    var sql = "SELECT * `E-COMMERCE`.CATEGORY";
    //perform query to database from web server
    db.query(sql, function(error, result){
        if(error){
            throw error;
        }else{
            //return result as json
            res.json(result);
        }
    });
  
  });
  
  
  app.route('/category').post( function (req, res) {
  
    //implement insert query to insert data into the restaurant using placeholder values
    // we do not need the id, it will be auto increment
    var sql = "INSERT INTO `E-COMMERCE`.CATEGORY (name) VALUES (?)";
   
    var parameters = [req.body.name];
    
    db.query(sql, parameters, function(error, result){
        if(error){
            throw error;
        }else{
            //return result as json
            res.json(result);
        }
    });
  
  });
  
  app.route('/category/:id').put( function (req, res) {
  

    var sql = "UPDATE `E-COMMERCE`.CATEGORY SET name = ? WHERE id = ?";
  
    
    var parameters = [req.body.name 
      ,req.params.id 
    ];
    
    db.query(sql, parameters, function(error, result){
        if(error){
            throw error;
        }else{
            //return result as json
            res.json(result);
        }
    });
  
  });
  
  app.route('/category/:id').delete( function (req, res) {
  
    var sql = "DELETE FROM `E-COMMERCE`.CATEGORY WHERE id = ?";
  
    var parameters = [req.params.id]; 

    db.query(sql, parameters, function(error, result){
        if(error){
            throw error;
        }else{
            //return result as json
            res.json(result);
        }
    });
  
  });

app.listen(9090,"127.0.0.1")
console.log("webserver running @ http://127.0.0.1:9090");
