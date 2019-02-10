const express = require("express");
const multer  = require('multer')
const bodyParser = require("body-parser");
const fs = require('fs');

const imagesDir = '../images360'

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, imagesDir),
  filename: (req, file, cb) =>  cb(null, file.originalname)
})

const upload = multer({ storage: storage }).array('images', 12)
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/all-images', (req, res) => {
  fs.readdir(imagesDir, (err, files) => {
    if(err){
      res.status(500).send("Something went wrong")
    }else {
      res.sendStatus(200)
    }
  })
})

app.post('/upload',(req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.status(500).send(err)
    } else {
      res.sendStatus(200)
    }
  })
})

app.listen(3050);