import pymongo
from pymongo import MongoClient

client = MongoClient('localhost', 27017)
db = client.icssearch


db.Posting.create_index(
    [("wordID", pymongo.ASCENDING), ("docID", pymongo.ASCENDING)],
    unique=True,
    name = "word-doc-id"
)


db.Posting.create_index( [("frequency", pymongo.DESCENDING)], name = "postFreq" )

