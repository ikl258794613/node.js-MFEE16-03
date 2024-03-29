// (1) 請問下列程式執行後的結果為何？為什麼？

console.log("start");

(function () {
  console.log("IIFE");
  setTimeout(function () {
    console.log("Timeout");
  }, 1000);
})();

console.log("end");
// (2) 請問下列程式執行的結果為何？為什麼？

console.log("start");

(function () {
  console.log("IIFE");
  setTimeout(function () {
    console.log("Timeout");
  }, 0);
})();

console.log("end");
// (3) 請問下列程式執行的結果為何？為什麼？

const bar = () => console.log("bar");

const baz = () => console.log("baz");

const foo = () => {
    console.log("foo");
    bar();
    baz();
};

foo();
// (4) 請問下列程式執行的結果為何？為什麼？

const bar = () => console.log("bar");

const baz = () => console.log("baz");

const foo = () => {
    console.log("foo");
    setTimeout(bar, 0);
    baz();
};

foo();

//自己認為的
// 1.      
// start
// IIFE
// end
// Timeout

// 2.
// start
// IIFE
// end
// Timeout

// 3.
// foo
// bar
// baz

// 4.
// foo
// baz
// bar

//實際解答
// 1.
// start
// IIFE
// end
// Timeout

// 2.
// start
// IIFE
// end
// Timeout

// 3.
// foo
// bar
// baz

// 4.
// foo
// baz
// bar