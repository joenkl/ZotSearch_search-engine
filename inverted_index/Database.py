import pymongo
from pymongo import MongoClient, InsertOne, DeleteMany, ReplaceOne, UpdateOne


url = 'mongodb://jnguyen:demonjos@ds014648.mlab.com:14648/icssearch'
client = MongoClient("ds014648.mlab.com", 14648)
db = client['icssearch']
db.authenticate('jnguyen', 'demonjos')


# create index for 


'''
client = MongoClient('localhost', 27017)
db = client.cs121
'''


def insertData(wordsDict, url):

    bulkUpdate = []
    for word, frequency in wordsDict.items():
            
            
        if db.Inverted_Index.find({'term': word, 'url': url }).limit(1).count() > 0 :
            bulkUpdate.append( UpdateOne({ 'term': word, 'url': url},  {'$set': { 'termInfo': { 'frequency': frequency}}}   ))
        else:
            bulkUpdate.append( InsertOne({ 'term': word, 'url': url, 'termInfo': { 'frequency': frequency}  }))
        
    if len(bulkUpdate) > 0:
        db.inverted_index.bulk_write(bulkUpdate)


def dictBulkUpdate(bulkUpdate):
    db.Dictionary.bulk_write(bulkUpdate)


def locationInsertOne(docID,locSchema):
    db.Location.update_one( {"_id": docID} , {"$set": locSchema}, upsert=True)
    

def postingBulkUpdate(bulkUpdate):
    db.Posting.bulk_write(bulkUpdate)

        


