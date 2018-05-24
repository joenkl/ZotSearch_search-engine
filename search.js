const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Posting = require("./models/Posting");
const Loc = require("./models/Location");
const natural = require("natural");
const tokenizer = new natural.WordTokenizer();
const stopwords = require("./lib/stopwords");
const stemmer = natural.PorterStemmer;

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

  Posting.find({ wordID: req.body.word.toLowerCase() })
    .limit(30)
    .populate("Location")
    .then(w => {
      if (!w) {
        errors.word = "There is no URL with this word " + req.body.word;
        return res.status(400).json(errors);
      }

      postingList = w;

      for (let item in w) {
        if (item.post.length > 1) {
          // w map to dictionary<Term, Position>
          for()
          
          let word1 = []; // dictionary to first term in searchWordTerm
          let len = searchWordTerm.length;
          let i = 1;
          let done = false;
          while (i < len && !done) {
            let offset = seearhWordPos[i] - searchWordTerm[i - 1];
            let word2 = []; // postDic[words]

            word1 = fcoff(word1, word2, offset);

            if (word1.length === 0) {
              done = true;
            }
            i++;
          }
        }
      }

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
