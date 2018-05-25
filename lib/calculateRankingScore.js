function log10(val) {
  return Math.log(val) / Math.log(10);
}

module.exports.calculateRankingScore = (termsRankInfo, numOfMatchWords, myLocMapping, myDocID, totalDocument) =>{


        let finalScore = 0;
        let avgTFIDF = 0;
        let avgHighestTagScore = 0;


        let nunTermInRankInfo = Object.keys(termsRankInfo).length;
        // this will loop through all the term and ranking info. Then calculate them
        Object.keys( termsRankInfo).forEach( key => {
          
          let rankInfo = termsRankInfo[key];
          let tf = parseFloat(rankInfo.postFreq / rankInfo.locAllWord);
          let idf = log10( parseFloat(rankInfo.numDocPerToken / rankInfo.postFreq));
          //console.log(tf + " " + rankInfo.dictFreq + " " + idf);
          avgTFIDF += 0.2 * (tf * idf);
          avgHighestTagScore += 0.4 * rankInfo.highestTagScore;
        });

        avgTFIDF /= nunTermInRankInfo ;
        avgHighestTagScore /= nunTermInRankInfo ;
        finalScore = avgTFIDF + avgHighestTagScore + numOfMatchWords * 0.4; 


        // mapping all the ranking info
        myLocMapping[myDocID].termInfo = termsRankInfo;
        myLocMapping[myDocID].totalWordFound = numOfMatchWords;
        myLocMapping[myDocID].finalScore = finalScore;
        myLocMapping[myDocID].avgHighestTagScore = avgHighestTagScore;
        myLocMapping[myDocID].avgTFIDF = avgTFIDF;


        return finalScore;
}