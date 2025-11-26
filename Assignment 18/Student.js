class Student {
  constructor(name, marks) {
    this.name = name;
    this.marks = marks; // array of marks
  }

  calculateAverage() {
    const sum = this.marks.reduce((acc, val) => acc + val, 0);
    return sum / this.marks.length;
  }

  getGrade() {
    const avg = this.calculateAverage();
    if (avg >= 90) return "A";
    if (avg >= 75) return "B";
    if (avg >= 50) return "C";
    return "F";
  }
}

// Test 3 students
const s1 = new Student("Alice", [95, 88, 92]);
const s2 = new Student("Bob", [70, 65, 72]);
const s3 = new Student("Charlie", [40, 45, 35]);

console.log(`${s1.name} avg: ${s1.calculateAverage()}, grade: ${s1.getGrade()}`);
console.log(`${s2.name} avg: ${s2.calculateAverage()}, grade: ${s2.getGrade()}`);
console.log(`${s3.name} avg: ${s3.calculateAverage()}, grade: ${s3.getGrade()}`);
