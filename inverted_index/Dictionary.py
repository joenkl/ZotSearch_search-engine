from pymongo import MongoClient, InsertOne, DeleteMany, ReplaceOne, UpdateOne
from Database import db, client, dictBulkUpdate
from DictionaryModel import *
from Posting import Posting 

class Dictionary(object):

    '''
        wordsDict
            @key = word
            @value:
                @id = id
                @frequency = frequency
    '''

    def __init__(self):
        self.wordsDict = dict()
        self.uniqueTerm = 0

    def words(self):
        return self.wordsDict

    def getNumOfUniqueTerm(self):
        return self.uniqueTerm 

    def resetCount(self):
        self.count = 0



    def add(self, dictModel):

        word = dictModel.word
        if word in self.wordsDict:
            self.wordsDict[word].frequency += dictModel.frequency
        else:
            self.wordsDict[word].frequency = dictModel.frequency
    
    '''
        Posting 
            @key = term
            @value:
                @frequency = frequency
                @tagScore = tagScore
    '''
    def extractAndUpdatePosting(self, posting):

        bulk_update = []
        for key, value in posting.myDict().items():

            if key in self.wordsDict:
                posting.updateWordID(key, self.wordsDict[key].id) # update posting id
                self.wordsDict[key].frequency += value.frequency
                posting.updateWordID(key, key)
                bulk_update.append( UpdateOne( findWord(key), setFrequency(value.frequency)))
            else:
                self.updateDictionary(key, key, value.frequency)
                posting.updateWordID(key, key)
                bulk_update.append( InsertOne( insertDict(key, value.frequency)))
        
        if len(bulk_update) > 0:
            dictBulkUpdate(bulk_update)
        
        self.count += posting.getCount()



    def updateDictionary(self, id, word, frequency):
        dic = DictionaryModel(id, word, frequency)
        self.wordsDict[word] = dic

    def updateWordID(self, word, id):

        if word in self.wordsDict:
            self.wordsDict[word].id = id