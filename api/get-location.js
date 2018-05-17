const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const loc = require("../models/Location");
router.post("/", (req, res) => {
  const errors = {};

  docIDList = ["38-7", "0-1"];
  loc
    .find({ _id: { $in: docIDList } })
    .then(l => {
      res.json(l);
    })
    .catch(err => res.status(404).json(err));

  // location
  //   .findOne({ _id: req.body.docid })
  //   .then(docid => {
  //     if (!docid) {
  //       errors.docid = "There is no URL with this word " + req.body.docid;
  //       return res.status(400).json(errors);
  //     }
  //     res.json(docid);
  //   })
  //   .catch(err => res.status(404).json(err));
});

module.exports = router;
