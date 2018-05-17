
tagDict = { 'title': 7, 
        'h1': 6, 'h2': 6, 'h3': 6,
        'h4': 5, 'h5':5, 'h6': 5,
        'b' : 4,
        'p': 2}




def tagValue(tag):

    if tag.lower() in tagDict:
        return tagDict[tag]
    
    return 0
    