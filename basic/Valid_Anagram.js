//Given two strings s and t, write a function to determine if t is an anagram of s.

// For example,
// s = "anagram", t = "nagaram", return true.
// s = "rat", t = "car", return false.

// Note:
// You may assume the string contains only lowercase alphabets.


function isAnagram (a,b){
    if(a.length != b.length){
        return false;
    }
    let X = a.split("").sort().join("");
    let Y = b.split("").sort().join("");
    return X == Y;
}

isAnagram ("like","ekil")