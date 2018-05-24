const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Posting = require("./models/Posting");
const Loc = require("./models/Location");
const natural = require("natural");
const tokenizer = new natural.WordTokenizer();
const stopwords = require("./lib/stopwords");
const stemmer = natural.PorterStemmer;
const numOfResult = 10;
const totalDocument = 37497;


function log10(val) {
  return Math.log(val) / Math.log(10);
}


var calculateRanking = (item) =>{
  // post frequency
  // location total word count
  // dict frequency 
    let result = {};

    const myPosting = item.post;

    // loop through post to find posting frequency
    myPosting.forEach( (post) => {
       let rankInfo = new Object();
       rankInfo.postFreq = post.frequency;
       rankInfo.tagScore = post.tagScore;
       result[post.wordID] = rankInfo;
    });

    // loop through dictinoary and find posting frequency
    const myDict = item.dict;
    myDict.forEach( (dict) => {
      let rankInfo = result[dict._id];
      rankInfo.dictFreq = dict.frequency;

   });

   const locationFreq = item.loc[0].totalWordCount;
   Object.keys( result ).forEach( key => {
      result[key].locAllWord = locationFreq;
    });

   return result;
}

var fcoffset = (word1, word2, offset) => {
  let word = [];
  let i = 0;
  let j = 0;
  while (i < word1.length && j < word2.length) {
    if (word1[i] >= word2[j]) {
      j++;
    } else {
      if (word1[i] + offset >= word2[j]) {
        word.push(word2[j]);
        j++;
      } else {
        i++;
      }
    }
  }

  return word;
};

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
  var searchWordPos = [];

  resultArray.forEach((item, i) => {
    let term = item.trim();
    if (!stopwords.has(term) && term.length > 2) {
      // searchWordTerm.push(stemmer.stem(term));
      searchWordTerm.push(term);
      searchWordPos.push(i);
    }
  });

  var rawResultData = getPosting(searchWordTerm);
  rawResultData
    .then(re => {
      let myLoc = {};
      let highTier = {};
      let lowerTier = {};
      let finalResult = [];

      re.forEach(item => {
        let myDocID = item.loc[0]._id;
        let myDocUrl = item.loc[0].url;
        myLoc[myDocID] = myDocUrl;

        // create dictionary to posting
        let myDict = {};
        for (let i = 0; i < item.post.length; i++) {
          myDict[item.post[i].wordID] = i;
        }

        let myPost = item.post;
        let word1 = myPost[0].Position; // first term

        if (myPost.length > 1) {
          let len = searchWordTerm.length;
          let i = 1;
          let done = false;
          while (i < len && !done) {
            let offset = searchWordPos[i] - searchWordPos[i - 1];
            let word2 = myPost[myDict[searchWordTerm[i]]].Position;
            word1 = fcoffset(word1, word2, offset);
            if (word1.length === 0) {
              done = true;
            }
            i++;
          }
        }

        let matchWord = word1.length;

        let allTermRankInfo = calculateRanking(item);
        let finalScore = 0;
      
        Object.keys( allTermRankInfo ).forEach( key => {
          let termRankInfo = allTermRankInfo[key];
          let tf = parseFloat(termRankInfo.postFreq / termRankInfo.locAllWord);
          let idf = log10( parseFloat(totalDocument / termRankInfo.dictFreq));
          finalScore +=  0.4 * (tf * idf) + (0.5) * termRankInfo.tagScore + 0.1 * matchWord; 
        });


        if (word1.length > 0) {
          highTier[myDocID] = finalScore;
        } else {
          lowerTier[myDocID] = finalScore;
        }
      });







      // sort the object and look at the high tier list
      
      let items = Object.keys(highTier).map(function(key) {
        return [key, highTier[key]];
      });

      items.sort(function(first, second) {
        return second[1] - first[1];
      });

      finalResult.push(items.slice(0, 10));

      // looking at the lower list
      if (finalResult.length < 10) {
        let numStillRequire = numOfResult - finalResult.length;

        items = Object.keys(lowerTier).map(function(key) {
          return [key, lowerTier[key]];
        });

        items.sort(function(first, second) {
          return second[1] - first[1];
        });

        finalResult.push(items.slice(0, numStillRequire));
      }

      console.log("High Tier");
      // loop through the high tier
      let arrayLength = finalResult[0].length;
      for (var i = 0; i < arrayLength; i++) {
        let docID = finalResult[0][i][0];
        console.log(myLoc[docID] + " " + finalResult[0][i][1]);
      }

      console.log("Lower Tier");
      // loop through the low tier
      arrayLength = finalResult[1].length;
      for (var i = 0; i < arrayLength; i++) {
        let docID = finalResult[1][i][0];
        console.log(myLoc[docID] + " " + finalResult[1][i][1]);
      }
      

    })
    .catch(error => {
      console.log(error);
    });
  console.log("Finish");
});

module.exports = router;
