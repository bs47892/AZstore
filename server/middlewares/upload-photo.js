/*
const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

aws.config.update({
  secretAccessKey: process.env.AWSSecretKey,
  accessKeyId: process.env.AWSAccessKeyId
});

const s3 = new aws.S3();

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "amazon-clone-v1",
    acl: "public-read",
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      cb(null, Date.now().toString());
    }
  })
});

module.exports = upload;
*/

/*
const express = require('express');
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' }); // This specifies the directory where uploaded files should be stored

const app = express();

app.post('/upload', upload.single('myFile'), (req, res) => {
  const file = req.file;
  // req.file contains information about the uploaded file
  const fileName = req.file.filename;
  const filePath = req.file.path;
  // Process the uploaded file here
  res.send('File uploaded successfully!');
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
*/


const express = require('express');
const multer = require("multer");

// Define storage for the uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/"); // the directory where uploaded files will be stored
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // set a unique filename for the uploaded file
  },
});

// Define file filter to allow only certain file types
const fileFilter = function (req, file, cb) {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/gif"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Only jpeg, png, and gif files are allowed"), false);
  }
};

// Create a multer instance with the storage and file filter options
const upload = multer({
  storage: storage,

});

module.exports = upload;