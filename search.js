const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Url = require("./models/ulr-model");
router.post("/", (req, res) => {
  const errors = {};
  Url.findOne({ docid: req.body.docid })
    .then(url => {
      if (!url) {
        errors.docid = "There is no URL with this docid " + req.body.docid;
        return res.status(400).json(errors);
      }
      res.json(url);
    })
    .catch(err => res.status(404).json(err));
});

module.exports = router;
