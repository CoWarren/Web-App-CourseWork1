const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const MongoClient = require("mongodb").MongoClient;

let db;
//connecting to the mongoDB database
MongoClient.connect("mongodb://localhost:27017", (err, client) => {
  db = client.db("web");
});
//middleware
app.use(bodyParser.json());
//------

//api get
app.get("/", (req, res, next) => {
  res.send("Select a collection, e.g., /collections/messages");
});

//lets you get the collection youre requesting
app.param("collectionName", (req, res, next, collectionName) => {
  req.collection = db.collection(collectionName);
  return next();
});

//getting the collection and displaying all its content
app.get("/collections/:collectionName", (req, res, next) => {
  req.collection.find({}).toArray((e, results) => {
    if (e) return next(e);
    res.send(results);
  });
});

app.post("/collections/:collectionName", (req, res, next) => {
//   req.collection.insert({
//     email: req.body.email,
//     password: req.body.password,
//     type: req.body.type
//   });
    console.log(req);
  res.send({ok: 'accepted'});
});

//opening server on port 3000
app.listen(3000, () => {
  console.log("Open at localhost:3000");
});
