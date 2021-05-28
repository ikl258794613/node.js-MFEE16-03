function ContainsDuplicate (n) {
    let N = new Set(n)
    if(n.length == N.size){
        return true;
    }else{
        return false;
    } 
}
let A = [1,1,2,3]
let B = [1,2,3]
ContainsDuplicate(A)
ContainsDuplicate(B)