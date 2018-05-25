module.exports.findRankingInfo =  (item) =>{
    // post frequency
    // location total word count
    // dict frequency 
      let result = {};
  
      const myPosting = item.post;
      // loop through post to find posting frequency
      myPosting.forEach( (post) => {
         let rankInfo = new Object();
         rankInfo.postFreq = post.frequency;
         rankInfo.totalTagScore = post.totalTagScore;
         rankInfo.highestTagScore = post.highestTagScore;
         result[post.wordID] = rankInfo;
      });
  
      // loop through dictinoary and find posting frequency
      const myDict = item.dict;
      myDict.forEach( (dict) => {
        let rankInfo = result[dict._id];
        rankInfo.dictFreq = dict.frequency;
        rankInfo.numDocPerToken = dict.numDocPerToken;
  
     });
  
     const locationFreq = item.loc[0].totalWordCount;
     Object.keys( result ).forEach( key => {
        result[key].locTotalWordCount = locationFreq;
      });
      
  
     return result;
  }