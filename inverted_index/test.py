import inspect
import os
from Tokenize import Tokenize
from Ranking import tagValue, tagDict
from bs4 import BeautifulSoup
from bs4.element import Comment
import urllib.request
import lxml

from Dictionary import Dictionary
from File import File
from Posting import Posting


filterList = ['style', 'script', '[document]', 'nav','menu']

def tag_visible(element):
    if element.parent.name in filterList:
        return False
    if isinstance(element, Comment):
        return False
    return True

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


    fileName = "/WEBPAGES_RAW/" + location # generate a new location
    htmlData = File(fileDirectory, fileName).readText() # looking to the file and return html text

    # using beautifulSoup to extract html data
    soup = BeautifulSoup(htmlData, 'html.parser')
    [s.extract() for s in soup(filterList)] # filter some of the information out
   

    
    
    # find all the text found in the html data
    htmlTexts = soup.findAll(text=True)
    htmlTexts = filter(tag_visible, htmlTexts) # filter out comment
    allTexts = " ".join(text.strip() for text in htmlTexts)
    allTexts = soup.getText()
    
    


    # update the word tagScore

    #find all the tag found in the html
    tags = set()
    for tag in soup.find_all(True):
        if tag.name not in tags:
            tags.add(tag.name)
    

    urlTitle = ''

    if(location == '0/1'):
        # loop through each tag and update the tag score
        for tag in tags:
            tagScore = tagValue(tag) # count the equavalient tag score
        
            if (tag.lower() == 'title'):
                urlTitle = soup.find(tag).getText().strip()
                print(urlTitle)
                input("debug")

        
            for word in soup.find_all(tag):
                print(word)