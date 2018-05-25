module.exports.sortDictionary = (numOfResults, tierDict) => {


    let items = Object.keys(tierDict).map(function(key) {
        return [key, tierDict[key]];
      });

    items.sort(function(first, second) {
        return second[1] - first[1];
    });

    return items.slice(0, numOfResults);
}