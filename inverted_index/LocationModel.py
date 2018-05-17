def locationSchema(numOfTerm, url, docID, title, totalWordCount):    
    return  {
                "_id": docID,
                "url": url,
                "numOfTerm": numOfTerm,
                "title": title,
                "totalWordCount": totalWordCount
             }



