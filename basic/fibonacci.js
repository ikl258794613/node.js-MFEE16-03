// function fibMemo (n ,cache = []){
//     if (cache[n]){
//         return cache[n];
//     }else{
//         if(n<=2){
//             cache[n]=1
//         }else{
//             cache[n]=fibMemo(n-1,cache)+fibMemo(n-2,cache)
//         }
//         return cache[n]
//     }
// }
// O(n) 
// fibMemo(20)
//6765

// 使用矩陣快速冪算出 O(log(n)) 

function multiply (A,B){
    let c00 = A[0][0] * B[0][0] +A[0][1] * B[1][0];
    let c01 = A[0][0] * B[0][1] +A[0][1] * B[1][1];
    let c10 = A[1][0] * B[0][0] +A[1][1] * B[1][0];
    let c11 = A[1][0] * B[0][1] +A[1][1] * B[1][1];
    let C =[
        [c00,c01],
        [c10,c11]
    ]
    return C
}
let A =[
    [1,1],
    [1,0]
]
// 計算A矩陣的n次方
function powOfA(n){
    //n的1次方
    if(n==1){return A};
    //n的偶數次方
    if(n%2==0){
        let Ak = powOfA(n/2)
        return multiply(Ak,Ak)
    }
    //n的奇數次方
    let Ak = powOfA((n-1)/2)
    return multiply(multiply(A, Ak), Ak)
}

function fibonacci(n) {
    if (n <= 1) { return n }
    return powOfA(n-1)[0][0]
}

fibonacci(20)

// 我使用的closure(失敗) 


// function fibonacci (){
//     let memo = [0,1];
//         function fib(n){
//             let result = memo[n];
//             if(typeof result !== "number"){
//             result = fib(n-1) +fib(n-2);
//             memo[n] = result;
//         }
//         return result;
//     };
//     return fib;
// };

// let f = fibonacci();
// f(20)

//老師的

// var fibonacci = function(){
//     var memo = [0, 1];  //  負責記憶的陣列
//     var fib = function(n){
//     // 每次計算前都看一下，這次要計算的值有沒有在 memo 這個陣列中
//     // 有的話表示已經計算過，就直接回傳。
//     // 沒有的話，就開始計算，並將計算結果存(記憶)起來。
//     var result = memo[n]; 
//     if(typeof result !== 'number'){
//       result = fib(n-1) + fib(n-2);
//       memo[n] = result;
//     }
//     return result;
//   };
//   return fib;
// };

// 執行過這行後，也就是呼叫了fibonacci這個函式
// 這個函式回傳的是fib這個函式，記得，這個時候 fib 並沒有被執行
// 而 memo 是 fibonacci 的一個區域變數
// var f = fibonacci(); 

// 執行 f(10) 的這時候才是真的去執行 fib，fib 有用到 memo
// 這時候如果放斷點的話，會看到 memo 會被放在 closure 這個區中
// 記得，closure 是用參考的方式在存取的
// f(10); 

