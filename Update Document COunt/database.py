import pymongo
from pymongo import *


client = MongoClient('localhost', 27017)
db = client.Data2


def findAllDocID():
    l = list()
    cursor = db.Location.find()
    for document in cursor:
        l.append(document["_id"])

    return l
    


def locationInsertOne(docID, wordCount):
    db.Location.update_one( {"_id": docID} , {"$set": {"totalWordCount": wordCount }})
    

        
def findWordFrequency(docID):

    cursor = db.Posting.find({'docID': docID})

    totalWordCount = 0
    for document in cursor:
        x = document["frequency"]
        if(isinstance(x, int)):
            totalWordCount += x

    return totalWordCount
    


docList = findAllDocID()

i = 0
for docID in docList:
    wordCount = findWordFrequency(docID)
    locationInsertOne(docID, wordCount)
    i +=1
    if(i%100 == 0):
        print(i)
