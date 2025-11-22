
const expenses = [2500, 800, 5000, 1200, 600]; // [food, travel, rent, bills, leisure]
const total = expenses.reduce((sum, val) => sum + val, 0);
const average = (total / expenses.length).toFixed(2);

// Add 10% tax using assignment operator
let finalAmount = total;
finalAmount += 0.10 * finalAmount;

console.log(`Total: ₹${total}`);
console.log(`Average: ₹${average}`);
console.log(`Final after 10% tax: ₹${finalAmount.toFixed(2)}`);
