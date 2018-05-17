from Database import locationInsertOne
from LocationModel import locationSchema


class Location(object):

    def __init__(self, docID, url, numOfTerm, title, totalWordCount):
        docID = docID.replace('/','-')
        self.docID = docID
        self.url = url
        self.numOfTerm = numOfTerm  
        self.title = title  


    def setValues(self, docID, url, numOfTerm, title, totalWordCount):
        docID = docID.replace('/','-')
        self.docID = docID
        self.url = url
        self.numOfTerm = numOfTerm
        self.title = title
        self.totalWordCount = totalWordCount

    def insertToDatabase(self):
        locationInsertOne( self.docID, locationSchema(self.numOfTerm,  self.url, self.docID, self.title, self.totalWordCount) ) 
        return self.docID



    