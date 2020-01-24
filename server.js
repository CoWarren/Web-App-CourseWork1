const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const MongoClient = require('mongodb').MongoClient;
let db;
MongoClient.connect('mongodb://localhost:27017', (err, client) =>{
    db = client.db('web')
})
  
app.listen(3000, () => {
    console.log('Open at localhost:3000')
    })