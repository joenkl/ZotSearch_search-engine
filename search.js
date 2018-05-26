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
const numOfResults = 20;



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

  var uniqueSearchWordSet = new Set(searchWordTerm);
  var numOfSearchUniqueWord = uniqueSearchWordSet.size;
  var rawResultData = myPostDB.getPosting(searchWordTerm);
  rawResultData
    .then(re => {


      let myLocMapping = {};
      let highTier = {};
      let lowerTier = {};

      re.forEach(item => {
        let allSearchTermFound = false; 
        let countSumFre = item.countSumFre;
        if(item.post.length == numOfSearchUniqueWord){
            allSearchTermFound = true;
        }

        let myDocID = createLocMapping.createLocMapping(myLocMapping, item);
        let numOfMatchWords = findAllMatchWords.findAllMatchWords(searchWordTerm, searchWordPos, allSearchTermFound,item).length;
        let termsRankInfo = findRankingInfo.findRankingInfo(item);


        let finalScore = calculateRankingScore.calculateRankingScore( termsRankInfo,numOfMatchWords,myLocMapping,myDocID, totalDocument, countSumFre);
        


        
        if (numOfMatchWords > 0 && allSearchTermFound) {
          highTier[myDocID] = finalScore;
        } else {
          lowerTier[myDocID] = finalScore;
        }

      });



      let finalTier = [];
      // sort the object and look at the high tier list
      finalTier = sortDictionary.sortDictionary(numOfResults, highTier);


      // looking at the lower list if we don't have enough
      if (finalTier.length < numOfResults) {
        let numStillRequire = numOfResults - finalTier.length;

        finalTier.push(...sortDictionary.sortDictionary(numOfResults + 1, lowerTier));
      }
      


      let finalResult = [];
      let finalTierLength = finalTier.length;
      for (var i = 0; i < finalTierLength; i++) {
        let docID = finalTier[i][0];
        
        let temp = {"_id":  docID, 
            "title": myLocMapping[docID].title,
            "url": myLocMapping[docID].url, 
            "finalScore": myLocMapping[docID].finalScore,
            "matchWords": myLocMapping[docID].normNumOfMatchWords,
            "tfidf": myLocMapping[docID].totalTFIDF,
            "highestTagScore": myLocMapping[docID].normHighestTagScore,
            "totalTagScore": myLocMapping[docID].normTotalTagScore
        };
        finalResult.push(temp);
        
      }

      res.json(finalResult);

    })
    .catch(error => {
      console.log(error);
    });
  console.log("Finish");
});

module.exports = router;
