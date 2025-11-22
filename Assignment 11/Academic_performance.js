
const marks = [88, 67, 95, 72, 80]; //marks
const anyDetained = marks.some(mark => mark < 35);
const total = marks.reduce((sum, m) => sum + m, 0);
const average = total / marks.length;
const percentage = ((total / (marks.length * 100)) * 100);

if (anyDetained) {
  console.log("Detained"); 
  console.log("Promoted with Distinction");
} else if (percentage >= 50) {
  console.log("Promoted");
} else {
  console.log("Detained");
}
console.log(`Average Score: ${average.toFixed(2)}`);
console.log(`Overall Percentage: ${percentage.toFixed(2)}%`);
