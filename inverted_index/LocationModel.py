def locationSchema(numOfTerm, url, docID, title):    
    return  {
                "_id": docID,
                "url": url,
                "numOfTerm": numOfTerm,
                "title": title
             }



