const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const location = require("../models/Posting");
router.post("/", (req, res) => {
  const errors = {};
  location
    .findOne({ _id: req.body.docid })
    .then(docid => {
      if (!docid) {
        errors.docid = "There is no URL with this word " + req.body.docid;
        return res.status(400).json(errors);
      }
      res.json(docid);
    })
    .catch(err => res.status(404).json(err));
});

module.exports = router;
