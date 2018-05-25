class DictionaryModel(object):

    def __init__(self, id, word, frequency, numDocPerToken):
        self.id = 0
        self.word = word
        self.frequency = frequency
        self.numDocPerToken = numDocPerToken


def insertDict(word, frequency, numDocPerToken):
    return {
                #"_id" : self.id,
                "_id" : word,
                "frequency" : frequency,
                "numDocPerToken": numDocPerToken
            }
    

def findWord(word):
    return {
                "_id": word
           }

def setFrequency(frequency, numDocPerToken):
    return  {
                "$set":
                {
                    "frequency": frequency,
                    "numDocPerToken": numDocPerToken
                }
            }