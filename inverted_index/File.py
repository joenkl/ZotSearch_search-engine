import os
import json

class File(object):

    def __init__(self, filePath, fileName):
        self.name = fileName
        self.path = filePath

    def readJson(self):

        if self.name and self.path:
            extension = os.path.splitext(self.name)[1]
            if (extension.lower() == '.json'):
                with open(self.path + self.name) as jsonFile:
                    jsonData = json.loads(jsonFile.read())
                    return jsonData
            else:
                print('File extension need to be json')
        else:
            print('File name and file path need to be define')
        
        return dict()

    def readText(self):
        if self.name and self.path:
            with open(self.path + self.name) as f:
                return f.read()
        else:
            print('File name and file path need to be define')


    def setName(self,fileName):
        self.name = fileName

    def setPath(self,filePath):
        self.path = filePath