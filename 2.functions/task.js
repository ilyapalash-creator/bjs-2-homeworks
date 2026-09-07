function getArrayParams(...arr) {
  if (arr.length === 0) {
    return { min: undefined, max: undefined, avg: 0 };
  }
  const min = Math.min(...arr);
  const max = Math.max(...arr);
  const sum = arr.reduce((acc, val) => acc + val, 0);
  const avg = parseFloat((sum / arr.length).toFixed(2));
  return { min, max, avg };
}

function summElementsWorker(...arr) {
  if (arr.length === 0) return 0;
  return arr.reduce((acc, val) => acc + val, 0);
}

function differenceMaxMinWorker(...arr) {
  if (arr.length === 0) return 0;
  const min = Math.min(...arr);
  const max = Math.max(...arr);
  return max - min;
}

function differenceEvenOddWorker(...arr) {
  if (arr.length === 0) return 0;
  let sumEven = 0;
  let sumOdd = 0;
  for (const val of arr) {
    if (val % 2 === 0) {
      sumEven += val;
    } else {
      sumOdd += val;
    }
  }
  return sumEven - sumOdd;
}

function averageEvenElementsWorker(...arr) {
  if (arr.length === 0) return 0;
  let sumEven = 0;
  let countEven = 0;
  for (const val of arr) {
    if (val % 2 === 0) {
      sumEven += val;
      countEven++;
    }
  }
  return countEven === 0 ? 0 : sumEven / countEven;
}

function makeWork(arrOfArr, func) {
  if (!arrOfArr || arrOfArr.length === 0) {
    return 0;
  }
  let maxWorkerResult = -Infinity;
  for (const data of arrOfArr) {
    const result = func(...data);
    if (result > maxWorkerResult) {
      maxWorkerResult = result;
    }
  }
  return maxWorkerResult;
}

console.log(getArrayParams(-99, 99, 10)); 
console.log(getArrayParams(1, 2, 3, -100, 10)); 
console.log(getArrayParams(5)); 

console.log(summElementsWorker()); 
console.log(summElementsWorker(10, 10, 11, 20, 10)); 

console.log(differenceMaxMinWorker()); 
console.log(differenceMaxMinWorker(10, 10, 11, 20, 10)); 

console.log(differenceEvenOddWorker(94, 51, 57, 41, 47, 66, 58, 10, 38, 17)); 
console.log(differenceEvenOddWorker(15, 97, 85, 64, 67, 10, 69, 40, 15, 35)); 

console.log(averageEvenElementsWorker(1, 2, 3, 4, 5, 6, 7, 8, 9)); 
console.log(averageEvenElementsWorker(15, 97, 85, 64, 67, 10, 69, 40, 15, 35)); 

const arr = [
  [10, 10, 11, 20, 10],
  [67, 10, 2, 39, 88],
  [72, 75, 51, 87, 43],
  [30, 41, 55, 96, 62]
];
console.log(makeWork(arr, summElementsWorker)); 
console.log(makeWork(arr, differenceMaxMinWorker)); 
console.log(makeWork(arr, differenceEvenOddWorker)); 