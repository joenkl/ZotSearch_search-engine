class Counter(object):


    def __init__(self, maxSize):
        # only to show how many
        self.i = 0 
        self.size = maxSize
    

    def increment(self):
        self.i += 1

    def printPercent(self):
        percent = self.i * 100.0 / self.size
        print( "About ", percent ,' percent of document has been parsed')

    def printCounter(self):
        print(self.i)


    def printPercentforEveryHundred(self):
        if self.i % 100 == 0:
            percent = self.i * 100.0 / self.size
            print( "About ", percent ,' percent of document has been parsed')

