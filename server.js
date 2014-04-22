// Voting and products server

var express = require('express'),
app = express(),
MongoClient = require('mongodb').MongoClient,
config={
    serverPort:8112,
    dbHost:"mongodb://192.168.1.77:3001"
};


/**
 * Configure express server
 */

//app.use(express.bodyParser())
app.set('view engine', 'html');
app.use(express.static(__dirname));
app.use(express.json());
app.set('partials', __dirname);
app.set('views', __dirname);


app.listen(config.serverPort);
console.log('Listening on port ' + config.serverPort);

var productCount = -1;

app.post('/product', function(req, res){
  //console.log("Body is", req.body);
  console.log("request intercepted");
  console.log("Body is", req.body);
  //res.send("Hello world");
  res.end("product add attempt");

  MongoClient.connect(config.dbHost, function(err, db) {
    if(err) return false;

    var collection = db.collection('product');

    collection.insert(req.body, function(err, docs) {
      collection.count(function(err, count) {
        console.log(count, " products in collection");
        productCount = count;
        db.close();
      });
    });
  });
});

app.get('/products', function(req, res){
  MongoClient.connect(config.dbHost, function(err, db) {
    if(err) return false;

    var collection = db.collection('product');

    collection.find().toArray(function(err, results) {

      var products = {results:results, lastCount:productCount}
      res.json(products);
      // Let's close the db
      db.close();
    });
  });
});