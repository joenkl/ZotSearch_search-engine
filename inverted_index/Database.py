import pymongo
from pymongo import MongoClient, InsertOne, DeleteMany, ReplaceOne, UpdateOne

'''
url = 'mongodb://jnguyen:demonjos@ds014648.mlab.com:14648/icssearch'
client = MongoClient("ds014648.mlab.com", 14648)
db = client['icssearch']
db.authenticate('jnguyen', 'demonjos')
'''

# create index for 



client = MongoClient('localhost', 27017)
db = client.cs121Test



def dictBulkUpdate(bulkUpdate):
    db.Dictionary.bulk_write(bulkUpdate)
    

def locationInsertOne(docID,locSchema):
    db.Location.update_one( {"_id": docID} , {"$set": locSchema}, upsert=True)
    

def postingBulkUpdate(bulkUpdate):
    db.Posting.bulk_write(bulkUpdate)


def dictFindTerm(term):
    return db.Dictionary.find_one({'_id': term})
        


