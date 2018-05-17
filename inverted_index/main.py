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

    start = time.time()


    fileName = "/WEBPAGES_RAW/" + location # generate a new location
    htmlData = File(fileDirectory, fileName).readText() # looking to the file and return html text

    # using beautifulSoup to extract html data
    soup = BeautifulSoup(htmlData, 'html.parser')
    
   

    # create posting
    wPost = Posting()
    
    
    # find all the text found in the html data
    htmlTexts = soup.findAll(text=True)
    htmlTexts = filter(tag_visible, htmlTexts) # filter out comment
    allTexts = " ".join(text.strip() for text in htmlTexts)
    allTexts = soup.getText()
    

    wordList = Tokenize(allTexts).extractToken() #extra all the text
    wPost.addWord(wordList) #add the word, word's frequency
    


    # update the word tagScore

    #find all the tag found in the html
    '''
    tags = set()
    for tag in soup.find_all(True):
        if tag.name not in tags:
            tags.add(tag.name)
    '''
    #tagDict is from Ranking.py
    tags = tagDict.keys()

    urlTitle = ''
    # loop through each tag and update the tag score
    for tag in tags:
        tagScore = tagValue(tag) # count the equavalient tag score
        
        if (tag.lower() == 'title'):
            urlTitle = soup.find(tag).getText().strip()

        
        for word in soup.find_all(tag):
            wordList = Tokenize(word.text.strip()).extractToken() #extra all the text
            wPost.addTagScore(wordList, tagScore) #update the tagscore

    end = time.time()
    print("Parse HTML " , end - start)


    start = time.time()   
    wDict.extractAndUpdatePosting(wPost)

    numOfTerm = wDict.getNumOfUniqueTerm()
    wDict.resetCount()
    totalWordCount = 0
    docID = Location(location, urlLink, numOfTerm, urlTitle, totalWordCount).insertToDatabase()
    wPost.insertDataToDatabase(docID)
    end = time.time()  

    print("Insert to database: ", end - start)


    i += 1
    if i % 100 == 0:
        percent = i * 100.0 / size
        print( "About ", percent ,' percent of document has been parsed')
    