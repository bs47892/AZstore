const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
//const mongoose = require("mongoose");
//const dotenv = require("dotenv");
//const cors = require("cors");

const app = express();

// Middlewares
//app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get ("/", (req,res)=>{
    res.json("Hello world");
});

app.post ("/", (req, res)=>{
    console.log(req.body.name);
});
app.listen(3000, err => {
    if (err) {
      console.log(err);
    } else {
      console.log("Listening on PORT", 3000);
    }
  });
