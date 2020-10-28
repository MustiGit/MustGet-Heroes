// Set up the server
const express = require('express')
const app = express()
const port = 3000
var bodyParser = require('body-parser')
app.use(bodyParser.json())

// Set up mongoose
const mongoose = require("mongoose")
require("./js/db")
var Save = require('./js/save')
const path = require('path');

app.get("/", function (req, res) {

    res.sendFile(path.join(__dirname + '/index.html'));
})

// Allow app to use /, /js and /pics directories
app.use('/js', express.static(__dirname + '/js'))
app.use('/', express.static(__dirname + '/'))
app.use('/pics', express.static(__dirname + '/pics'))


//For scoretable
app.get('/saves', (req, res) => {

    var searchParam = req.query;
    var query = {}

    if (searchParam["playerScore"]) {
        query["playerScore"] = searchParam["playerScore"]
    }
    else if (searchParam["name"]) {
        query["name"] = searchParam["name"]
    }
    else if (searchParam["class"]) {
        query["class"] = searchParam["class"]
    }
    else if (searchParam["playerLvl"]) {
        query["playerLvl"] = searchParam["playerLvl"]
    }
    
    Save.find(query).sort({"playerScore":-1}).limit(20)
        .exec(function (err, save) {

            if (err) {
                console.log("Find by id id error")
                res.status(500).send("Error in finding the ssbr")
            }
            else if (save) {
                res.status(200).send(save);
            }
            else {
                res.status(404).send("Save not found")
            }
        })
});

app.get("/save/", (req, res) => {
/* Find old save when requested, query is given in gamemanager.js:
                params: {
                    name: myUsername
                }*/
    Save.findOne(req.query, function (err, save) {
        if (err) {
            console.log("Find by id id error")
            res.status(500).send("Error in finding the save")
            console.log(err)
        }
        else if (save) {
            res.status(200).send(save);
            console.log("Old save found with given username: " + save)
        }
        else {
            console.log("Save not found by given username, logging in as new a user")
            res.status(404).send("Save not found")
        }
    });
});

// Update save
app.put("/save/:id", (req, res) => {

    // Take id and add it to username
    var username = req.params.id

    // Set new save with body of req and add it to updatequery (current player character stats)
    var new_save = req.body;
    var updatequery = { $set: new_save };

    // Set up query based on username
    var myquery = { name: username };

    // Find correct save based on username and update it
    Save.updateOne(myquery, updatequery, function (err, result) {
        if (err) throw err;
        console.log("1 save successfully updated");
        res.status(200).send("Save successfully updated.")
    });
})

// Make new save
app.post("/save", (req, res) => {

    // save = body of req (current character stats)
    var save = req.body;

    // Log it to console
    console.log("Save = ", save)

    // Give the save new mongoID
    save["_id"] = new mongoose.Types.ObjectId();

    // Make new model of it
    var saveModel = new Save(save)

    // And save it to DB
    saveModel.save(function (err) {

        if (err) {
            res.status(500).send("Error in saving: " + err)
            console.log("ERROR: " + err);
        }
        else {
            res.status(201).send("Save successful")
            console.log("1 document added to database.");
        }
    });
})

// Delete old save, based on given username
app.delete("/save/:id", (req, res) => {

    // Set id as username
    var username = req.params["id"];

    // Set up query based on username
    var myquery = { name: username };

    // Use query to find correct save and delete it
    Save.findOneAndDelete(myquery, function (err, save) {
        if (err) res.status(500).send("Internal error")
        else if (save) res.status(200).send("Save deleted")
        else res.status(403).send("Save not found")
    })
})

// Listen to port and log it to console
app.listen(port, function () {
    console.log(`Listening to port ${port}`)
})

