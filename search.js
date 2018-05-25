const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Posting = require("./models/Posting");
const Loc = require("./models/Location");
const natural = require("natural");
const tokenizer = new natural.WordTokenizer();
const stopwords = require("./lib/stopwords");
const myPostDB = require("./lib/getPosting");
const createLocMapping = require("./lib/createLocMapping");
const findAllMatchWords= require("./lib/findAllMatchWords");
const findRankingInfo = require("./lib/findRankingInfo");
const calculateRankingScore = require("./lib/calculateRankingScore");
const sortDictionary = require("./lib/sortDictionary");

const stemmer = natural.PorterStemmer;

const totalDocument = 37497;
const numOfResults = 10;

function log10(val) {
  return Math.log(val) / Math.log(10);
}

var findRankingInfo = item => {
  // post frequency
  // location total word count
  // dict frequency
  let result = {};

  const myPosting = item.post;
  // loop through post to find posting frequency
  myPosting.forEach(post => {
    let rankInfo = new Object();
    rankInfo.postFreq = post.frequency;
    rankInfo.tagScore = post.tagScore;
    result[post.wordID] = rankInfo;
  });

  // loop through dictinoary and find posting frequency
  const myDict = item.dict;
  myDict.forEach(dict => {
    let rankInfo = result[dict._id];
    rankInfo.dictFreq = dict.frequency;
  });

  const locationFreq = item.loc[0].totalWordCount;
  Object.keys(result).forEach(key => {
    result[key].locAllWord = locationFreq;
  });

  return result;
};

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
    { $limit: 1000 },
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
      searchWordTerm.push(stemmer.stem(term));
      searchWordPos.push(i);
    }
  });
  var rawResultData = getPosting(searchWordTerm);
  rawResultData
    .then(re => {
      let myLoc = {};
      let highTier = {};
      let lowerTier = {};

      re.forEach(item => {
        let myDocID = item.loc[0]._id;
        let myDocUrl = item.loc[0].url;
        let title = item.loc[0].title;
        // creating a mapping with docID
        let obj = new Object();
        obj.title = title;
        obj.url = myDocUrl;
        myLoc[myDocID] = obj;

        // create dictionary to posting
        let myDict = {};
        for (let i = 0; i < item.post.length; i++) {
          myDict[item.post[i].wordID] = i;
        }

        let myDocID = createLocMapping.createLocMapping(myLocMapping, item);

        let numOfMatchWords = findAllMatchWords.findAllMatchWords(searchWordTerm, searchWordPos, numOfSearchUniqueWord,item).length;
        let termsRankInfo = findRankingInfo.findRankingInfo(item);

        let matchWord = word1.length; // num of term found

        // this will find all the term and it's ranking info
        let allTermRankInfo = findRankingInfo(item);
        let finalScore = 0;
        let avgTFIDF = 0;
        let avgTagScore = 0;

        let numOfSearchTerm = Object.keys(allTermRankInfo).length;
        // this will loop through all the term and ranking info. Then calculate them
        Object.keys(allTermRankInfo).forEach(key => {
          let termRankInfo = allTermRankInfo[key];
          let tf = parseFloat(termRankInfo.postFreq / termRankInfo.locAllWord);
          let idf = log10(parseFloat(totalDocument / termRankInfo.dictFreq));

          avgTFIDF += 0.2 * (tf * idf);
          avgTagScore += 0.4 * termRankInfo.tagScore;
        });

        avgTFIDF /= numOfSearchTerm;
        avgTagScore /= numOfSearchTerm;

        finalScore = avgTFIDF + avgTagScore + matchWord * 0.4;

        myLoc[myDocID].termInfo = allTermRankInfo;
        myLoc[myDocID].totalWordFound = matchWord;
        myLoc[myDocID].finalScore = finalScore;
        myLoc[myDocID].avgTagScore = avgTagScore;
        myLoc[myDocID].avgTFIDF = avgTFIDF;

        // if the number of term found is greater than 0
        if (word1.length > 0 && myPost.length > 1) {
          highTier[myDocID] = finalScore;
        } else {
          lowerTier[myDocID] = finalScore;
        }
      });

      // sort the object and look at the high tier list
      finalTier = sortDictionary.sortDictionary(numOfResults, highTier);


      // looking at the lower list if we don't have enough
      if (finalTier.length < numOfResults) {
        let numStillRequire = numOfResults - finalTier.length;

        finalTier.push(...sortDictionary.sortDictionary(numOfResults + 1, lowerTier));
      }

      let result = [];

      // loop through the high tier
      let arrayLength = finalResult[0].length;
      for (var i = 0; i < arrayLength; i++) {
        let docID = finalResult[0][i][0];
        // console.log(myLoc[docID].title + " : " +  myLoc[docID].url + " " + finalResult[0][i][1] + " " + myLoc[docID].totalWordFound + " "+ JSON.stringify(myLoc[docID].termInfo));
        let temp = {
          _id: docID,
          title: myLoc[docID].title,
          url: myLoc[docID].url,
          finalScore: myLoc[docID].finalScore,
          matchWords: myLoc[docID].totalWordFound,
          tfidf: myLoc[docID].avgTFIDF,
          tagScore: myLoc[docID].avgTagScore
        };
        result.push(temp);
      }

      // loop through the low tier
      arrayLength = finalResult[1].length;
      for (var i = 0; i < arrayLength; i++) {
        let docID = finalResult[1][i][0];
        // console.log(myLoc[docID].title + " : " +  myLoc[docID].url + " " + finalResult[1][i][1] + " " + myLoc[docID].totalWordFound + " " + JSON.stringify(myLoc[docID].termInfo));
        let temp = {
          _id: docID,
          title: myLoc[docID].title,
          url: myLoc[docID].url,
          finalScore: myLoc[docID].finalScore,
          matchWords: myLoc[docID].totalWordFound,
          tfidf: myLoc[docID].avgTFIDF,
          tagScore: myLoc[docID].avgTagScore
        };
        result.push(temp);
      }

      res.json(result);
    })
    .catch(error => {
      console.log(error);
    });
  console.log("Finish");
});

module.exports = router;
