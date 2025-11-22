const totalPurchase = 7200;
let discountPercent = 0;

if (totalPurchase >= 10000) {
  discountPercent = 25;
} else if (totalPurchase >= 5000) {
  discountPercent = 15;
} else if (totalPurchase >= 2000) {
  discountPercent = 5;
}

const discountAmount = (discountPercent / 100) * totalPurchase;
const finalPrice = Math.round(totalPurchase - discountAmount);

console.log(`Original Total: ₹${totalPurchase}`);
console.log(`Discount: ${discountPercent}%`);
console.log(`Final Price: ₹${finalPrice}`);
