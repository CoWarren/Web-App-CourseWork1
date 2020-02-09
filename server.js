const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const MongoClient = require('mongodb').MongoClient;
//used to get rid of cors error and access-control-allow-origin error
const cors = require('cors')
let db;

app.use(cors())
app.use(bodyParser.json());

//connecting to the mongodb using nodejs driver
MongoClient.connect('mongodb://localhost:27017', (err, client) =>{
    db = client.db('web')
})

app.get('/', (req, res, next) => {
    res.send('Select a collection, e.g., /collections/messages')
    }
)

//lets you get the collection youre requesting
app.param('collectionName', (req, res, next, collectionName) => {
    req.collection = db.collection(collectionName)
    return next()
    })


//getting the collection and displaying all its content
app.get('/collections/:collectionName', (req, res, next) => {
    //projection excludes ID from being shown
    req.collection.find({}, {projection: {_id: 0}}).toArray((err, results) => {
        if (err) return next(err)
        res.send(results)
    }) 
})


//Storing user and course info to the mongoDB
app.post('/collections/:collectionName', (req, res, next) => {
    req.collection.insert(req.body, (err, results) => {
        if (err) return next(err)
        res.send(results.ops)
    })
})

  
  
app.listen(3000, () => {
    console.log('Open at localhost:3000')
    })