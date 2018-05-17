const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Posting = require("./models/Posting");
router.post("/", (req, res) => {
  const errors = {};
  Posting.find({ wordID: req.body.word })
    .limit(20)
    .then(w => {
      if (!w) {
        errors.word = "There is no URL with this word " + req.body.word;
        return res.status(400).json(errors);
      }
      res.json(w);
    })
    .catch(err => res.status(404).json(err));
});

module.exports = router;
