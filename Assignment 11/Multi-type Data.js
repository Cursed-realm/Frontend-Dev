const str = "Bluebell";
const num = 12345;
const bool = true;
const arr = [10, "Shreshti"];
const obj = { id: 1, active: true };
const nothing = null;
let notDefined;

const summary = [
  { label: "String", value: str, type: typeof str },
  { label: "Number", value: num, type: typeof num },
  { label: "Boolean", value: bool, type: typeof bool },
  { label: "Array", value: arr, type: Array.isArray(arr) ? "array" : typeof arr },
  { label: "Object", value: obj, type: Array.isArray(obj) ? "array" : typeof obj },
  { label: "Null", value: nothing, type: typeof nothing },
  { label: "Undefined", value: notDefined, type: typeof notDefined }
];

console.table(summary); 
