const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Posting = require("./models/Posting");
const Loc = require("./models/Location");
const natural = require("natural");
const tokenizer = new natural.WordTokenizer();
const stopwords = require("./lib/stopwords");
const Lemmer = require("lemmer");

router.post("/", (req, res) => {
  const errors = {};
  var totalFrequencyOfTheWord;
  var postingList = [];
  var locationList = [];

  const resultArray = tokenizer.tokenize(req.body.word.toLowerCase());
  var resultDict = {};
  resultArray.forEach((item, i) => {
    if (!stopwords.has(item.trim()) && item.length > 2) {
      resultDict[w] = i;
    }
  });

  console.log(resultDict);

  // var searchQueries = ["computer", "science"];
  // let rawSearchResults = posting
  //   .aggregate(
  //     [
  //       { $match: { wordID: { $in: searchQueries } } },
  //       {
  //         $group: {
  //           _id: "$docID",
  //           post: { $push: "$$ROOT" },
  //           count: { $sum: 1 },
  //           countSumFre: { $sum: "$frequency" }
  //         }
  //       },
  //       { $limit: 1000 },
  //       {
  //         $lookup: {
  //           from: "Location",
  //           localField: "post.docID",
  //           foreignField: "_id",
  //           as: "loc"
  //         }
  //       },
  //       {
  //         $lookup: {
  //           from: "Dictionary",
  //           localField: "post.wordID",
  //           foreignField: "_id",
  //           as: "dict"
  //         }
  //       }
  //     ],
  //     { allowDiskUse: true }
  //   )
  //   .then(result => {
  //     if (!result) {
  //       errors.word = "There is no URL with this word " + req.body.word;
  //       return res.status(400).json(errors);
  //     }
  //     return result;
  //   })
  //   .catch(err => res.status(404).json(err));

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
