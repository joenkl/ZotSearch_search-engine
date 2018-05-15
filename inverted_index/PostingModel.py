class PostingModel():

    def __init__(self, wordID, docID, frequency, tagScore, position):
        self.wordID = wordID
        self.docID = docID
        self.frequency = frequency
        self.tagScore = tagScore
        self.position = position









def postingSchema(wordID,  docID,  frequency, tagScore, position):

    return {
                "wordID" : wordID,
                "docID" : docID,
                "frequency" : frequency,
                "tagScore" : tagScore,
                "Position": position
            }
        
