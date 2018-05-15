def inverted_index_model(word, url, frequency):
    return "{ 'term': %s, 'url': %s, termInfo: { 'frequency': %d}  }" %(word, url, frequency)