// Q5_WeatherPlanner.js
const temperature = 14; 
const isRaining = false;
const windSpeed = 22; 

let advice;
if (isRaining) {
  advice = "Stay indoors with hot coffee.";
} else if (temperature > 35) {
  advice = "Go swimming.";
} else if (temperature < 15 && windSpeed > 20) {
  advice = "Too cold and windy — stay home.";
} else {
  advice = "Perfect day for a walk.";
}
console.log(advice);
