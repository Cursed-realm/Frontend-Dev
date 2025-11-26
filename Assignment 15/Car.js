function Car(brand, model) {
  this.brand = brand;
  this.model = model;
}
Car.prototype.getDetails = function() {
  console.log("Brand: " + this.brand + ", Model: " + this.model);
};
let car1 = new Car("Bugatti", "Divo");
let car2 = new Car("BMW", "M5 CS");
car1.getDetails();
car2.getDetails(); 
console.log(car1.getDetails === car2.getDetails);