import re
import nltk
from nltk.stem import WordNetLemmatizer
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
import string
from unidecode import unidecode
import enchant


#https://machinelearningmastery.com/clean-text-machine-learning-python/s
class Tokenize(object):
    
    
    
    def __init__(self, text):
        self.text = text
        self.punctuationTable = str.maketrans('', '', string.punctuation)
        self.stopWords = set(stopwords.words('english'))
        self.english = enchant.Dict("en_US")


    def extractToken(self):
        
        
        lemmatizer = WordNetLemmatizer()
        wordList = []
        textStr = self.text.strip().lower()

        for word in word_tokenize(textStr): # tokenize


            # remove word that are not alphabetic and stop word and check if the word is in range and it is an english word
            if  isAscii(word) and not is_number(word) and (word not in self.stopWords) and inRange(word): # and self.english.check(word): 
                wordList.append(lemmatizer.lemmatize(word))

        return wordList

def inRange(word):
    word = word.strip()
    return len(word) > 2 and len(word) < 255


def is_number(n):
    try:
        float(n)   
    except ValueError:
        return False
    return True

def isAscii(myString):
    try:
        myString.encode('ascii')
    except UnicodeEncodeError:
        return False
    return True


