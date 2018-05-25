function log10(val) {
  return Math.log(val) / Math.log(10);
}

module.exports.calculateRankingScore = (termsRankInfo, numOfMatchWords, myLocMapping, myDocID, totalDocument) =>{


        let finalScore = 0;
        let avgTFIDF = 0;
        let avgHighestTagScore = 0; 
        let avgTotalTagScore = 0;
        let nunTermInRankInfo = Object.keys(termsRankInfo).length;
        let locTotalWordCount = 0;
        // this will loop through all the term and ranking info. Then calculate them
        Object.keys( termsRankInfo).forEach( key => {
          
          let rankInfo = termsRankInfo[key];
          let tf = parseFloat(rankInfo.postFreq / rankInfo.locTotalWordCount);
          let idf = log10( parseFloat(totalDocument / rankInfo.numDocPerToken )); 
          locTotalWordCount = rankInfo.locTotalWordCount;
          avgTFIDF +=  (tf * idf);
          avgHighestTagScore += rankInfo.highestTagScore;
          avgTotalTagScore += rankInfo.totalTagScore;
        });

        avgTFIDF /= nunTermInRankInfo;
        avgTotalTagScore /= locTotalWordCount;
        avgHighestTagScore /= nunTermInRankInfo ;

        let avgNumOfMatchWords = 0;
        if(numOfMatchWords != 0){
          avgNumOfMatchWords = log10(locTotalWordCount/numOfMatchWords);
        }
        console.log(avgTFIDF + " " + avgHighestTagScore + " " + avgTotalTagScore + " " + avgNumOfMatchWords);

        finalScore = (0.3) * avgTFIDF + (0.1) * (avgHighestTagScore / 10) + (0.1) * avgTotalTagScore + avgNumOfMatchWords * (0.5); 


        // mapping all the ranking info
        myLocMapping[myDocID].termInfo = termsRankInfo;
        myLocMapping[myDocID].totalWordFound = numOfMatchWords;
        myLocMapping[myDocID].finalScore = finalScore;
        myLocMapping[myDocID].avgHighestTagScore = avgHighestTagScore;
        myLocMapping[myDocID].avgTFIDF = avgTFIDF;


        return finalScore;
}