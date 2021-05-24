function fibMemo (n ,cache = []){
    if (cache[n]){
        return cache[n];
    }else{
        if(n<=2){
            cache[n]=1
        }else{
            cache[n]=fibMemo(n-1,cache)+fibMemo(n-2,cache)
        }
        return cache[n]
    }
}

// fibMemo(20)
//6765