/**
 * Created by Aishwarya on 6/15/2015.
 */
var http = require('http');
var request = require('request');
var mongo = require('mongodb');
var Server = new mongo.Server('localhost', 27017, {auto_reconnect: true});
var MongoClient = mongo.MongoClient;
var mongourl = 'mongodb://localhost:27017/local';
var express = require("express");
var bodyParser = require("body-parser");
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
var test,test1;

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/server', function(req, res, next) {
    res.send("This is a GET request");
});

app.post("/server",function(req,res, next){
    //console.log(req.body);
    //console.log(req.body.mydata);
    var jsondata = JSON.parse(req.body.mydata);
    //var latitude = jsondata.lat;
    //var longitude = jsondata.lon;
    var address = jsondata.address;
    var syscap = jsondata.system_capacity;
    var azmth = jsondata.azimuth;
    var tlt = jsondata.tilt;
    var arrtyp = jsondata.array_type;
    var modtyp = jsondata.module_type;
    var loss = jsondata.losses;
    var timeframe = jsondata.timeframe;
    request({
        url: 'http://developer.nrel.gov/api/pvwatts/v5.json?',
        qs: {
            api_key: 'MlxcfVUFAVksHh2f8b40XG7qFV5Tcq3gjmRn5W2v',
            "address": address,
            //"lat" : latitude,
            //"lon" : longitude,
            "system_capacity" : syscap,
            "azimuth" : azmth,
            "tilt" : tlt,
            "array_type" : arrtyp,
            "module_type" : modtyp,
            "losses" : loss,
            "timeframe":timeframe
        },
        method : 'GET'
    },
    function(error,response,body){
        if (error){
            console.log(error);
        }
        else {
            test = JSON.parse(body);
            test1=test;
            MongoClient.connect(mongourl, function (err, db) {
                if (err) {
                    console.log('Unable to connect to the MongoDB server. Error:', err);
                }
                else {
                    console.log('Connection established to', mongourl);
                    db.open(function (err, dbref) {
                        db.collection('example', function (err, collectionref) {
                            var present = collectionref.find({
                                "inputs.address": test.inputs.address,
                                "inputs.system_capacity" : test.inputs.system_capacity,
                                "inputs.azimuth" : test.inputs.azimuth,
                                "inputs.tilt" : test.inputs.tilt,
                                "inputs.array_type" : test.inputs.array_type,
                                "inputs.module_type" : test.inputs.module_type,
                                "inputs.losses" : test.inputs.losses,
                                "inputs.timeframe":test.inputs.timeframe})
                            .toArray(function(err,docs){
                                if (err) throw err;
                                console.log(docs.length);
                                if(docs.length == 0) {
                                    collectionref.insert(test1, function (err, result) {
                                        if (err) throw err;
                                        console.log("record added");
                                        db.close();
                                        console.log("Connection closed to database");
                                        console.log(docs.length);
                                    });
                                }
                                else{
                                    db.close();
                                    console.log("Connection closed to database");
                                }
                            });
                        });
                    });
                }
            });
            res.send(test);
        }
    });
});

app.listen(3000, function() {
    console.log('listening on port:3000');
});