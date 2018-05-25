module.exports.findPositionOffset = (word1, word2, offset) => {
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