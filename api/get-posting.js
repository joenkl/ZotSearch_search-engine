const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const posting = require("../models/Posting");
router.post("/", (req, res) => {
  const errors = {};
  posting
    .findOne({ wordID: req.body.wordID })
    .then(w => {
      if (!w) {
        errors.wordID = "There is no URL with this word " + req.body.wordID;
        return res.status(400).json(errors);
      }
      res.json(w);
    })
    .catch(err => res.status(404).json(err));
});

module.exports = router;
