const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const port = process.env.port || 9000;
const url = require("./search");

//Using body_parser dependencies to grab search queries
//from user's browser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const db = require("./config/keys").mongoURI;
var currentTime = new Date();
mongoose
  .connect(db)
  .then(console.log("Connected to database at " + currentTime))
  .catch(err => console.log.err(err));

app.use("/search", url);

app.get("/", (req, res) => res.send("This is Home Page"));
app.listen(port, () => console.log(`Server is running on port ${port}`));
