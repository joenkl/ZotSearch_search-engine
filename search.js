const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Posting = require("./models/Posting");
const Loc = require("./models/Location");
const natural = require("natural");
const tokenizer = new natural.WordTokenizer();
const stopwords = require("./lib/stopwords");
const stemmer = natural.PorterStemmer;

function getPosting(searchQueries) {
  return Posting.aggregate([
    { $match: { wordID: { $in: searchQueries } } },
    {
      $group: {
        _id: "$docID",
        post: { $push: "$$ROOT" },
        count: { $sum: 1 },
        countSumFre: { $sum: "$frequency" }
      }
    },
    {
      $sort: { count: -1, countSumFre: -1 }
    },
    { $limit: 10 },
    {
      $lookup: {
        from: "Location",
        localField: "post.docID",
        foreignField: "_id",
        as: "loc"
      }
    },
    {
      $lookup: {
        from: "Dictionary",
        localField: "post.wordID",
        foreignField: "_id",
        as: "dict"
      }
    }
  ]);
}

router.post("/", (req, res) => {
  const errors = {};
  var totalFrequencyOfTheWord;
  var postingList = [];
  var locationList = [];

  const resultArray = tokenizer.tokenize(req.body.word.toLowerCase());
  var searchWordTerm = [];
  var seearhWordPos = [];

  resultArray.forEach((item, i) => {
    let term = item.trim();
    if (!stopwords.has(term) && term.length > 2) {
      searchWordTerm.push(stemmer.stem(term));
      seearhWordPos.push(i);
    }
  });

  var searchQueries = ["computer", "science"];
  console.log(searchQueries);

  var rawResultData = getPosting(searchQueries);
  rawResultData
    .then(re => {
      console.log(re);
      // re.foreach(r => {
      //   console.log(r);
      // });
      res.json(re);
    })
    .catch(error => {
      console.log(error);
    });
  console.log("Finish");
});

module.exports = router;
