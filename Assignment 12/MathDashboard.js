let x = 16.75;
let rounded = Math.round(x);
let sqrt = Math.sqrt(x);
let power = Math.pow(x, 3);
let random= Math.floor(Math.random() * 41) + 10; 
let s = `Math Dashboard for x = ${x}
- Rounded: ${rounded}
- Square root: ${sqrt}
- Power (x^3): ${power}
- Random (10-50): ${random}`;
console.log(s);
module.exports = { x, rounded, sqrt, power, random};