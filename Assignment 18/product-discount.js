function Product(name, price) {
  this.name = name;
  this.price = price;
}

Product.prototype.applyDiscount = function(percent) {
  return this.price * (1 - percent / 100);
};

// Create 3 products
const p1 = new Product("Shoes", 120);
const p2 = new Product("Watch", 200);
const p3 = new Product("Bag", 80);

// Apply discounts using prototype method
console.log(p1.name, "discounted price:", p1.applyDiscount(10));
console.log(p2.name, "discounted price:", p2.applyDiscount(15));
console.log(p3.name, "discounted price:", p3.applyDiscount(5));

/*
Abstraction helps hide details:
- user calls applyDiscount(percent) without knowing price calc logic
- method can be changed internally without affecting external code
*/
