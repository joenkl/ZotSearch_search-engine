class PostingModel():

    def __init__(self, wordID, docID, frequency,tagScore, highestTagScore, position):
        self.wordID = wordID
        self.docID = docID
        self.frequency = frequency
        self.tagScore = tagScore
        self.highestTagScore = highestTagScore
        self.position = position









def postingSchema(wordID,  docID,  frequency, tagScore, highestTagScore, position):

    return {
                "wordID" : wordID,
                "docID" : docID,
                "frequency" : frequency,
                "totalTagScore" : tagScore,
                "highestTagScore": highestTagScore,
                "Position": position
            }
        
