function Person(name) {
  this.name = name;
}
Person.prototype.getName = function() {
  console.log("Name: " + this.name);
};
function Student(name, branch) {
  Person.call(this, name); 
  this.branch = branch;
}
Student.prototype = Object.create(Person.prototype);
Student.prototype.constructor = Student;
Student.prototype.getBranch = function() {
  console.log("Branch: " + this.branch);
};
Student.prototype.getDetails = function() {
  console.log("Name: " + this.name + ", Branch: " + this.branch);
};
const person1 = new Person("Aditya");
person1.getName();

const student1 = new Student("Aditya", "Computer Science");
student1.getName();    
student1.getBranch();  
student1.getDetails();
console.log(student1 instanceof Student);  
console.log(student1 instanceof Person);   
console.log(student1 instanceof Object);  
console.log(student1.__proto__ === Student.prototype);         
console.log(Student.prototype.__proto__ === Person.prototype);   
console.log(Person.prototype.__proto__ === Object.prototype);    