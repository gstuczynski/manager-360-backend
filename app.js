const express = require("express");
const multer  = require('multer')
const bodyParser = require("body-parser");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, '../uploads'),
  filename: (req, file, cb) =>  cb(null, file.originalname)
})

const upload = multer({ storage: storage }).array('images', 12)
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/upload',(req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.status(500).send(err)
    } else {
      res.sendStatus(200)
    }
  })
})

app.listen(3000);