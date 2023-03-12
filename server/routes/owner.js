const router = require("express").Router();
const Owner = require("../models/owner");
//const upload = require("../middlewares/upload-photo");
const multer = require('multer');

const express = require('express');
const path = require('path');

// Define storage options for Multer middleware
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + Date.now() +
     ext);
  }
});

// Create Multer middleware instance
const upload = multer({ storage: storage });

// POST api
router.post("/owners", upload.single("photo"), async (req, res) => {
  try {
    console.log(req.body);
    let owner = new Owner();
    owner.name = req.body.name;
    owner.about = req.body.about;

    if (req.file) {
      const { filename, path } = req.file;
      owner.photo = path;
    }

    await owner.save();

    res.json({
      success: true,
      message: "Successfully created a new owner"
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

// GET api
router.get("/owners", async (req, res) => {
  try {
    let owners = await Owner.find();

    res.json({
      success: true,
      owners: owners
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

module.exports = router;