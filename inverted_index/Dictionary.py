from pymongo import MongoClient, InsertOne, DeleteMany, ReplaceOne, UpdateOne
from Database import db, client, dictBulkUpdate, dictFindTerm
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
        self.totalWordCount = 0

    def words(self):
        return self.wordsDict



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


        for key, value in posting.myDict().items():

            # for now Word and ID are the same
            posting.updateWordID(key, key) # update the posting id 
            
            if key in self.wordsDict:
                self.wordsDict[key].frequency += value.frequency
            else:
                self.updateDictionary(key, key, value.frequency, 0)
            



    def updateDictionary(self, id, word, frequency, numDocPerToken):
        dic = DictionaryModel(id, word, frequency, numDocPerToken)
        self.wordsDict[id] = dic

    def updateWordID(self, word, id):

        if word in self.wordsDict:
            self.wordsDict[word].id = id

    def updateDictionaryDB(self):

        bulk_update = []

        for key, value in self.wordsDict.items():
            
            document = dictFindTerm(key)

            if document:
                f = document['frequency']
                numDoc = document['numDocPerToken']
                bulk_update.append( UpdateOne( findWord(key), setFrequency(f + value.frequency, numDoc + 1)))

            else:
                bulk_update.append( InsertOne( insertDict(key, value.frequency, 1)))

        
        if len(bulk_update) > 0:
            dictBulkUpdate(bulk_update)


    