import json as js
import os
import inspect

currentDir = os.path.dirname(os.path.abspath(
    inspect.getfile(inspect.currentframe())))
jsonPath = currentDir + '/WEBPAGES_RAW/bookkeeping.json'

jsonData = js.loads(open(jsonPath).read())

print(jsonData)

print('End')
