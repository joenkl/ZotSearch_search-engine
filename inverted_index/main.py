import inspect
import os
from Tokenize import Tokenize
from Ranking import tagValue, tagDict
from bs4 import BeautifulSoup
from Filter import filterList, tag_visible
import urllib.request
import lxml
import time
from Dictionary import Dictionary
from File import File
from Posting import Posting
from Location import Location
from DataParser import DataParser

currentDir = os.path.dirname(os.path.abspath(
    inspect.getfile(inspect.currentframe())))        


fileDirectory = currentDir
f = File(fileDirectory, "/WEBPAGES_RAW/bookkeeping.json")
jsonData = f.readJson()



i = 0
size = len(jsonData)


wDict = Dictionary()
# loop through the location:url from the bookkeeping.json file
for location, urlLink in jsonData.items():

    wPost = Posting()
    wDict = Dictionary()

    fileName = "/WEBPAGES_RAW/" + location # generate a new location
    data = File(fileDirectory, fileName).readText() # looking to the file and return html text


    parser = DataParser(htmlData) # create a parser class
    parser.processData() #process the given data


    visibleText = parser.getProcessTexts() # get all the visibletext in the document
    

    wordList = Tokenize(visibleText ).extractToken() #extra all the text
    wPost.addWord(wordList) #add the word, word's frequency
    
    
    parser.updatePostingTagScore(wPost) # this function will update the tag score of the Posting


    wDict.extractAndUpdatePosting(wPost)

    numOfUniqueTerm = wDict.popNumOfUniqueTerm()
    totalWordCount = 
    docID = Location(location, urlLink, numOfTerm, parser.getTitle(), totalWordCount).insertToDatabase()
    wPost.insertDataToDatabase(docID)



    i += 1
    if i % 100 == 0:
        percent = i * 100.0 / size
        print( "About ", percent ,' percent of document has been parsed')
    