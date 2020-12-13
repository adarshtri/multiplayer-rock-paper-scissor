'use strict';

const express = require('express');
let routes = require("./src/routes");
let bodyParser = require("body-parser");
let mongoose = require("mongoose");

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();

// use body parser for post request
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());


// connect to mongodb
mongoose.connect("mongodb://localhost:27017/mg", { useNewUrlParser: true});
let db = mongoose.connection;

// Added check for DB connection
if(!db)
    console.log("Error connecting db")
else
    console.log("Db connected successfully")

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);


app.use("/api", routes);
