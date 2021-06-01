function powerOfTwo(n){
    return Math.log2(n) % 1 === 0;
}

powerOfTwo(8)

function powerOfTWO(n){
    if(n<0){
        return false;
    }
    if(n===1){
        return true;
    }
    while(n>3){
        if(n%2 !=0)return false;
        n = parseInt(n/2);
    }
    return n%2 === 0;
}

powerOfTWO(8)

