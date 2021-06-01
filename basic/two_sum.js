// return every pair of numbers from 'numArray' that adds up to the 'targetSum'
// function twoSum (numArray, targetSum) { ... }

// twoSum([1, 6, 4, 5, 3, 3], 7)
// [[6, 1], [3, 4]]

// 條件：
// 輸出的結果必須是陣列中含有陣列（array of arrays），例如：[[6, 1], [3, 4]]
// 任何在 numArrays 中的數字是不可以被重複使用

// 1.白癡寫法:用兩個for迴圈

function twoSum(nums, target) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = 0; j < nums.length; j++) {
      if (nums[i] + nums[j] == target) {
        return [i, j];
      }
    }
  }
}

twoSum([1, 6, 4, 5, 3, 3], 7);

// 2.Hash寫法

function twoSum(numsArray, target) {
  let passPair = [];
  let notPassPair = [];
  for (let currNum of numsArray) {
    let counterPart = target - currNum;
    let counterPartIndex = notPassPair.indexOf(counterPart);
    if (counterPartIndex !== -1) {
      notPassPair.splice(counterPartIndex, 1);
      passPair.push([currNum, counterPart]);
    } else {
      notPassPair.push(currNum);
    }
  }
  return passPair;
}
twoSum([1, 6, 4, 5, 3, 3], 7);

//3.加上Map

function twoSum(numsArray, target) {
  let notPassPair = new Map();
  let passPair = [];
  for (let i = 0; i < numsArray.length; i++) {
    let counterPart = target - numsArray[i];
    if (notPassPair.has(counterPart)) {
      notPassPair.delete(counterPart);
      passPair.push(numsArray[i], counterPart);
    } else {
      notPassPair.set(numsArray[i], "");
    }
  }
  return passPair;
}
twoSum([1, 6, 4, 5, 3, 3], 7);
