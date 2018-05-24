var fcoffset = fuction (word1, word2, offset){

    let word = [];
    let i = 0;
    let j = 0;

    while( (i < len(word1)) && (j < len(word2)){
        if(word1[i] == word2[j]){
            j++;
        }
        else{
            if (word1[i] + offset >= word2[j]){
                word.push(word2[j]);
            }
            else{
                i++;
            }
        }   
    }


    return word;


}