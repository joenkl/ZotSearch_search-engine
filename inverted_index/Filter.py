from bs4.element import Comment

filterList = ['style', 'script', '[document]', 'nav','menu', 'head']

def tag_visible(element):
    if element.parent.name in filterList:
        return False
    if isinstance(element, Comment):
        return False
    return True