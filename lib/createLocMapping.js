module.exports.createLocMapping = (locMap, item) =>{
    
    let myDocID = item.loc[0]._id;
    let myDocUrl = item.loc[0].url;
    let title = item.loc[0].title;
    // creating a mapping with docID
    let obj = new Object();
    obj.title = title;
    obj.url = myDocUrl;
    locMap[myDocID] = obj;

    return myDocID;
}