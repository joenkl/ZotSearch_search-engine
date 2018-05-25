from PostingModel import *
from pymongo import MongoClient, InsertOne, DeleteMany, ReplaceOne, UpdateOne
from Database import db, client, postingBulkUpdate

class Posting(object):


    def __init__(self):
        '''
            key = word
            value:
                  id:
                  frequency:
                  tagScore
        '''
        self.postDict = dict()
        self.counter = 0
        self.uniqueTerm = 0



    def addWord(self, wordsSet):
        
        for token in wordsSet:
            self.counter += 1

            if token in self.postDict:
                self.postDict[token].frequency += 1
                self.postDict[token].position.append(self.counter)
            else:
                termPosition = list()
                termPosition.append(self.counter)
                post = PostingModel('','', 1, 0,0, termPosition)
                self.postDict[token] = post

        self.uniqueTerm = len(self.postDict)
    
    def addTagScore(self, wordsSet, tagScore):
        
        for token in wordsSet:
            # only update the tagScore if it already exist in the system    
            if token in self.postDict:
                self.postDict[token].tagScore += tagScore

                if self.postDict[token].highestTagScore < tagScore:
                    self.postDict[token].highestTagScore = tagScore
                

    '''
    def insertDataToDatabase(self, docID):
        bulk_update = []
        for key, value in self.postDict.items():
            bulk_update.append( UpdateOne( 
                                {'wordID' : value.wordID, 
                                    'docID': docID}, 
                                    { '$set': postingSchema( value.wordID, docID, value.frequency, value.tagScore, value.position )},upsert=True) )
               
        if len(bulk_update) > 0:
            postingBulkUpdate(bulk_update)
    '''

    def insertDataToDatabase(self, docID):
        bulk_update = []
        for key, value in self.postDict.items():
            bulk_update.append( InsertOne( 
                    postingSchema( value.wordID, docID, value.frequency, value.tagScore, value.highestTagScore, value.position)
                    ))
               
        if len(bulk_update) > 0:
            postingBulkUpdate(bulk_update)

    def updateWordID(self, key, id):
        
        if key in self.postDict:
            self.postDict[key].wordID = id

    def myDict(self):
        return self.postDict
        

    def getCount(self):
        return len(self.postDict)







