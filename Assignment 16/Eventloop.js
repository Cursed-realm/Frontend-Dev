/*
Predicted output:
1) Script start
2) Script end
3) Promise callback
4) Timeout callback

Reason (short):
- Synchronous logs ("Script start" and "Script end") run first.
- Promise.then is a microtask, which runs right after the current call stack is empty.
- setTimeout is a macrotask, which runs later, in the next event loop tick.
*/

console.log("Script start");

setTimeout(() => console.log("Timeout callback"), 0);

Promise.resolve().then(() => console.log("Promise callback"));

console.log("Script end");

// Actual result will match the prediction for the same reason:
// microtasks (Promises) are processed before macrotasks (setTimeout)
// once the main script finishes.
