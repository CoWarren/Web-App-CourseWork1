const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const MongoClient = require('mongodb').MongoClient;
let db;
MongoClient.connect('mongodb://localhost:27017', (err, client) =>{
    db = client.db('web')
})

    app.get('/', (req, res, next) => {
        res.send('Select a collection, e.g., /collections/messages')
        }
    )

    app.param('collectionName', (req, res, next, collectionName) => {
        req.collection = db.collection(collectionName)
        return next()
    })

    app.get('/collections/:collectionName', (req, res, next) => {
        req.collection.find({}).toArray((e, results) => {
            if (e) return next(e)
            res.send(results)
            }
        ) 
    })

// get an email 
    app.get('/collections/:collectionName/:email', (req, res, next) => {
        console.log('searching json object with email:', req.params.email)
            req.collection.findOne({ email: (req.params.email) }, (e, result) => {
                if (e) return next(e)
                res.send(result)
                }
            )
        }   
    )

    //add a new user
    app.post('/collections/:collectionName/:email/:password', (req, res, next) => {
            req.collection.insert({email: (req.param.email), password: (req.param.password)}, (e, results) => {
                if (e) return next(e)
                res.send(results.ops)
                }
            )
        }
    )
        

app.listen(3000, () => {
    console.log('Open at localhost:3000')
    })