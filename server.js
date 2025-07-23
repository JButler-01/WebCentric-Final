const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
const CONNECTION_URL = "mongodb://ufa3qitgzxiphldwf0hw:5NKAleEbN8jNAapzsT7M@bxqznnetit8o9hu-mongodb.services.clever-cloud.com:27017/bxqznnetit8o9hu";
const DATABASE_NAME = "bxqznnetit8o9hu";

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

var database, media_collection;

app.get('/api/media', (req, res) => {
    media_collection.find({}).toArray((error, result) => {
        if(error) {
            return res.status(500).send(error);
        }
        res.send(result);
    });
})

app.get('/api/media/:media_id', (req, res) => {
    var media_id = req.params.media_id;
    media_collection.find({"media_id": media_id}).toArray((error, result) => {

        if(error) {
            return res.status(500).send(error);
        }
        res.send(result);
    });   
})


app.post('/api/media', (req, res) => {
    media_collection.insert(req.body, (error, result) => {
        if(error) {
            return res.status(500).send(error);
        }
        res.send(result.result);
    });
})



app.delete('/api/media/:media_id', (req, res) => {  
    var media_id = req.params.media_id;
    media_collection.deleteOne({"media_id": media_id}, (error, result) => {
        if(error) {
            return res.status(500).send(error);
        }
        res.send(result.result);
    });
})

app.put('/api/media/:media_id', (req, res) => {
    var media_id = req.params.media_id;
    media_collection.updateOne({"media_id": media_id},
    {$set: {"media_name" : req.body.media_name, "type" : req.body.type, "genre" : req.body.genre, "length" : req.body.length, "release_date" : req.body.release_date}},
    function(error, result) {
        if(error) {
            return res.status(500).send(error);
        }
        res.send(result.result);
    });
})



app.listen(5000, () => {
    MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
        if(error) {
            throw error;
        }
        database = client.db(DATABASE_NAME);
        media_collection = database.collection("media");
        console.log("Connected to `" + DATABASE_NAME + "`!");
        console.log('Listening on localhost:5000');
      });
  });