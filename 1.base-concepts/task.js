"use strict";

function solveEquation(a, b, c) {
	const d = b ** 2 - 4 * a * c;
	if (d < 0) {
		return [];
	}
	if (d === 0) {
		const root = -b / (2 * a);
		return [root];
	}
	const sqrtD = Math.sqrt(d);
	const root1 = (-b + sqrtD) / (2 * a);
	const root2 = (-b - sqrtD) / (2 * a);
	return [root1, root2];
}

function calculateTotalMortgage(percent, contribution, amount, countMonths) {
	const p = parseFloat(percent);
	const c = parseFloat(contribution);
	const a = parseFloat(amount);
	const n = parseFloat(countMonths);

	if ([p, c, a, n].some(isNaN)) {
		return false;
	}

	const S = a - c;
	if (S <= 0) {
		return 0;
	}

	const P = p / 100 / 12;

	const monthlyPayment = S * (P + P / (Math.pow(1 + P, n) - 1));

	const total = monthlyPayment * n;

	return Math.round(total * 100) / 100;
}
function testCase() {
  const tests = [
    { percent: 10, contribution: 0, amount: 50000, countMonths: 12, expected: 52749.53 },
    { percent: 10, contribution: 1000, amount: 50000, countMonths: 12, expected: 51694.54 },
    { percent: 10, contribution: 0, amount: 20000, countMonths: 24, expected: 22149.56 },
    { percent: 10, contribution: 1000, amount: 20000, countMonths: 24, expected: 21042.09 },
    { percent: 10, contribution: 20000, amount: 20000, countMonths: 24, expected: 0 },
    { percent: 10, contribution: 0, amount: 10000, countMonths: 36, expected: 11616.19 },
    { percent: 15, contribution: 0, amount: 10000, countMonths: 36, expected: 12479.52 }
  ];

  tests.forEach(({ percent, contribution, amount, countMonths, expected }, i) => {
    const result = calculateTotalMortgage(percent, contribution, amount, countMonths);
    const passed = Math.abs(result - expected) < 0.01;
    console.log(`Тест ${i+1}: ${passed ? 'YES' : 'NO'} ожидалось ${expected}, получено ${result}`);
  });
}