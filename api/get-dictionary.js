const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const dict = require("../models/Dictionary");
router.post("/", (req, res) => {
  const errors = {};
  dict
    .findOne({ _id: req.body.word })
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
