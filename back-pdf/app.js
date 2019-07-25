const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const pdf = require("html-pdf");
const pdfTemplate = require("./documents");
const app = express();

//cors config
app.use(cors());
//body parser config
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/create-pdf", (req, res) => {
  pdf.create(pdfTemplate(req.body, {})).toFile("file.pdf", err => {
    if (err) {
      res.send(Promise.reject());
    }
    res.send(Promise.resolve());
  });
});

app.get("/fetch-pdf", (req, res) => {
  res.sendFile(`${__dirname}/file.pdf`);
});
module.exports = app;
