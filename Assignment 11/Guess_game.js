// Q7_GuessGame.js
const secretNumber = Math.floor(Math.random() * 50) + 1;
const userGuess = 25; 

if (userGuess === secretNumber) {
  console.log("Correct guess!");
} else if (Math.abs(userGuess - secretNumber) <= 3) {
  console.log("Very close!");
} else if (userGuess > secretNumber) {
  console.log("Too high");
} else if (userGuess < secretNumber) {
  console.log("Too low");
}
console.log(`Secret: ${secretNumber}, Guess: ${userGuess}`);
