const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Posting = require("./models/Posting");
const Loc = require("./models/Location");
router.post("/", (req, res) => {
  const errors = {};
  var totalFrequencyOfTheWord;
  var postingList = [];
  var locationList = [];

  Posting.find({ wordID: req.body.word.toLowerCase() })
    .limit(30)
    .then(w => {
      if (!w) {
        errors.word = "There is no URL with this word " + req.body.word;
        return res.status(400).json(errors);
      }
      postingList = w;

      docIDList = [];
      postingList.forEach(p => {
        docIDList.push(p.docID);
      });

      // console.log(docIDList);
      Loc.find({ _id: { $in: docIDList } })
        .then(n => {
          n.forEach(item => {
            locationList.push(item);
          });

          res.json(locationList);
        })
        .catch(err => res.status(404).json(err));
    })
    .catch(err => res.status(404).json(err));
});

module.exports = router;
