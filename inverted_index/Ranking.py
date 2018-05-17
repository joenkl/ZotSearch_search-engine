
tagDict = { 'title': 10, 
        'h1': 9, 'h2': 8, 'a':8, 'h3': 7,
        'h4': 6, 'h5':5, 'h6': 5,
        'b' : 4, 'strong': 4, 'em': 4, 'i': 4, 
        'p': 2, 'li': 2 }


# take only the highest one


def tagValue(tag):

    if tag.lower() in tagDict:
        return tagDict[tag]
    
    return 0
    