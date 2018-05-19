import inspect
import os
import urllib.request
import lxml
import time

from Tokenize import Tokenize
from bs4 import BeautifulSoup
from Dictionary import Dictionary
from File import File
from Posting import Posting
from Location import Location
from DataParser import DataParser
from Counter import Counter



 
fileDirectory = os.path.dirname(os.path.abspath(
    inspect.getfile(inspect.currentframe())))

f = File(fileDirectory, "/WEBPAGES_RAW/bookkeeping.json") #locate the json file
jsonData = f.readJson() # read the json file

myCounter = Counter(len(jsonData))


# loop through the location:url from the bookkeeping.json file
for location, urlLink in jsonData.items():

    wPost = Posting() # create posting
    wDict = Dictionary() # create dictionary

    fileName = "/WEBPAGES_RAW/" + location # generate a new location
    data = File(fileDirectory, fileName).readText() # looking to the file and return html text


    parser = DataParser(data) # create a parser class
    parser.processData() #process the given data

    visibleText = parser.getProcessTexts() # get all the visibletext in the document
    

    wordList = Tokenize(visibleText).extractToken() #extra all the text
    wPost.addWord(wordList) #add the word, word's frequency, word's position to Posting 
    parser.updatePostingTagScore(wPost) # update the tag score of the Posting

    # Dictionary class will extract information from the Posting as well as update term id for Posting
    wDict.extractAndUpdatePosting(wPost)  

    totalWordCount = wPost.counter # the total Number of word found in document
    numOfUniqueTerm = wPost.uniqueTerm # total number of unique term found in document

    wDict.updateDictionaryDB() # update the dictionary Table
    docID = Location(location, urlLink, numOfUniqueTerm, parser.getTitleTagContent(), totalWordCount).insertToDatabase() #insert data into location table
    wPost.insertDataToDatabase(docID) # insert new information in Posting Table


    # use to show indexing process
    myCounter.increment()
    myCounter.printPercentforEveryHundred()

    