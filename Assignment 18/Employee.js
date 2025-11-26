class Employee {
  constructor(name, dept) {
    this.name = name;
    this.dept = dept;
  }

  work() {
    console.log(`${this.name} works in ${this.dept}`);
  }
}

class Manager extends Employee {
  constructor(name, dept) {
    super(name, dept);
  }

  work() {
    console.log(`${this.name} manages the ${this.dept} department`);
  }
}

const e = new Employee("Alice", "IT");
const m = new Manager("Bob", "HR");

e.work(); 
m.work(); 

/*
Polymorphism: Same work() method name, different behavior at runtime
*/
