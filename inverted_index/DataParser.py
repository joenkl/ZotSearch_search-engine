from bs4 import BeautifulSoup
from bs4.element import Comment
from Tokenize import Tokenize

class DataParser(object):


    def __init__(self, data):
        self.processTexts = " "
        self.soup = BeautifulSoup(data, 'html.parser')
        self.title = ""

    def processData(self):

        texts = self.soup.findAll(text=True) #get text
        filterTexts = filter(tagFilter, texts)  # filter out comment

        self.processTexts = self.processTexts.join(text.strip() for text in filterTexts) # store process text 

    def getProcessTexts(self):
        return self.processTexts

    
    def updatePostingTagScore(self, wPost):
        for tag in tagDict.keys():
            tagScore = getTagValue(tag) # count the equavalient tag score
        
            if (tag.lower() == 'title'):
                self.title = self.soup.find(tag).getText().strip()

        
            for word in self.soup.find_all(tag):
                wordList = Tokenize(word.text.strip()).extractToken() #extra all the text
                wPost.addTagScore(wordList, tagScore) #update the tagscore

        



def tagFilter(element):
    if element.parent.name in ['style', 'script', '[document]', 'nav', 'menu', 'head']:
        return False
    if isinstance(element, Comment):
        return False
    return True


tagDict = { 'title': 10, 'h1': 9, 'h2': 8, 'a':8, 'h3': 7, 'h4': 6, 'h5':5, 'h6': 5, 'b' : 4, 'strong': 4, 'em': 4, 'i': 4,  'p': 2, 'li': 2 }
        

def getTagValue(tag):
        
    if tag.lower() in tagDict:
        return tagDict[tag]

    return 0