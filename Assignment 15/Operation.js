function applyOperation(numbers, operation) {
  let result = [];
  for (let i = 0; i < numbers.length; i++) {
    result.push(operation(numbers[i]));
  }
  return result;
}
function double(num) {
  return num * 2;
}
function square(num) {
  return num * num;
}
let numbers = [1, 2, 3, 4];
let doubled = applyOperation(numbers, double);
console.log("Doubled:", doubled);
let squared = applyOperation(numbers, square);
console.log("Squared:", squared); 