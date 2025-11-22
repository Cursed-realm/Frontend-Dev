const num1 = Math.floor(Math.random() * 20) + 1;
const num2 = Math.floor(Math.random() * 20) + 1;
const operators = ['+', '-', '*', '/'];
const op = operators[Math.floor(Math.random() * operators.length)];

let correctAnswer;
switch (op) {
  case '+':
    correctAnswer = num1 + num2;
    break;
  case '-':
    correctAnswer = num1 - num2;
    break;
  case '*':
    correctAnswer = num1 * num2;
    break;
  case '/':
    correctAnswer = (num1 / num2).toFixed(2);
    break;
}

console.log(`What is ${num1} ${op} ${num2}?`);
console.log(`Correct answer: ${correctAnswer}`);
