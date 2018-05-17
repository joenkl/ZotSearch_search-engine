def postingSchema(wordID,  docID,  frequency, tagScore, position):

    return {
                "wordID" : wordID,
                "docID" : docID,
                "frequency" : frequency,
                "tagScore" : tagScore,
                "Position": position
            }


def update