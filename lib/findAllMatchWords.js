const findPositionOffset = require("./findPositionOffset");

module.exports.findAllMatchWords= (
  searchWordTerm,
  searchWordPos,
  allSearchTermFound,
  item
) => {

  let myPost = item.post;
  let myPostLength = myPost.length;

  let myPostMap = {};
  for (let i = 0; i < myPostLength; i++) {
    myPostMap[myPost[i].wordID] = i;
  }

  let word1 = myPost[0].Position; // first term
  if ( allSearchTermFound ) {
    let len = searchWordTerm.length;

    let i = 1;
    let done = false;

    while (i < len && !done) {

      let offset = searchWordPos[i] - searchWordPos[i - 1];
      let word2 = myPost[myPostMap[searchWordTerm[i]]].Position;
      

      word1 = findPositionOffset.findPositionOffset(word1, word2, offset);
      if (word1.length === 0) {
        done = true;
      }
      i++;
    }
  }

  return word1;

};
