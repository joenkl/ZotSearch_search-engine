class DictionaryModel(object):

    def __init__(self, id, word, frequency):
        self.id = 0
        self.word = word
        self.frequency = frequency


def insertDict(word, frequency):
    return {
                #"_id" : self.id,
                "word" : word,
                "frequency" : frequency
            }
    

def findWord(word):
    return {
                "word": word
           }

def setFrequency(frequency):
    return  {
                "$set":
                {
                    "frequency": frequency
                }
            }