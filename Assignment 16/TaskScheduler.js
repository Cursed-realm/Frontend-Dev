console.log("Start"); // 1. Runs immediately (synchronous)

// Macrotask: setTimeout adds its callback to the macrotask queue
setTimeout(() => {
  console.log("Inside setTimeout (macrotask)");
}, 0);

// Microtask: Promise.then adds its callback to the microtask queue
Promise.resolve()
  .then(() => {
    console.log("Inside Promise.then (microtask)");
  });

console.log("End"); // 2. Runs immediately after "Start" (still synchronous)

/*
Expected log order:
1) "Start"
2) "End"
3) "Inside Promise.then (microtask)"
4) "Inside setTimeout (macrotask)"

Why microtasks run before macrotasks:

- JavaScript first runs all synchronous code on the call stack ("Start" and "End").
- When the stack is empty, the event loop checks the microtask queue (Promises).
- It runs all microtasks (all .then callbacks) before moving on.
- Only after all microtasks are finished, the event loop takes the next macrotask
  from the macrotask queue (like setTimeout callbacks).

So even though both are "asynchronous", Promise.then (microtask) is given higher
priority than setTimeout (macrotask), which is why its log appears first.
*/