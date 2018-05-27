function log10(val) {
  return Math.log(val) / Math.log(10);
}

function log2(val)
{
  return Math.log(val) / Math.log(2);
}

module.exports.calculateRankingScore = (
  termsRankInfo,
  numOfMatchWords,
  myLocMapping,
  myDocID,
  totalDocument,
  countSumFre
) => {

  let finalScore = 0;
  let totalTFIDF = 0;
  let normHighestTagScore = 0;
  let normTotalTagScore = 0;
  let nunTermInRankInfo = Object.keys(termsRankInfo).length;
  let locTotalWordCount = 0;
  let normNumOfMatchWords = 0;
  // this will loop through all the term and ranking info. Then calculate them
  Object.keys(termsRankInfo).forEach(key => {
    let rankInfo = termsRankInfo[key];
    let tf = parseFloat(rankInfo.postFreq / rankInfo.locTotalWordCount);
    let idf = log10(parseFloat(totalDocument / rankInfo.numDocPerToken));
    locTotalWordCount = rankInfo.locTotalWordCount;
    totalTFIDF += tf * idf;
    normHighestTagScore += rankInfo.highestTagScore;
    normTotalTagScore += rankInfo.totalTagScore;
  });

  // totalTFIDF /= nunTermInRankInfo;
  normTotalTagScore /= countSumFre;
  if (normTotalTagScore != 0) {
    normTotalTagScore = log10(normTotalTagScore);
  }

  normHighestTagScore /= nunTermInRankInfo;
  if(normHighestTagScore != 0){
    normHighestTagScore = log2(normHighestTagScore);
  }

  if (numOfMatchWords != 0) {
    normNumOfMatchWords = log10(numOfMatchWords * nunTermInRankInfo);
  }


  finalScore =
    0.3 * totalTFIDF +
    0.3 * normHighestTagScore +
    0.1 * normTotalTagScore +
    0.3 * normNumOfMatchWords;

  // mapping all the ranking info
  myLocMapping[myDocID].termInfo = termsRankInfo;
  myLocMapping[myDocID].normNumOfMatchWords = normNumOfMatchWords;
  myLocMapping[myDocID].finalScore = finalScore;
  myLocMapping[myDocID].normHighestTagScore = normHighestTagScore;
  myLocMapping[myDocID].normTotalTagScore = normTotalTagScore;
  myLocMapping[myDocID].totalTFIDF = totalTFIDF;

  return finalScore;
};
