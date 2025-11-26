function boilWater() {
  return new Promise((resolve, reject) => {
    const time = 1000 + Math.random() * 1000; // 1–2 seconds
    console.log("Step 1: Boiling water...");

    setTimeout(() => {
      // ~20% chance to fail
      if (Math.random() < 0.2) {
        reject("Kettle stopped working while boiling water.");
      } else {
        console.log("Water boiled ✅");
        resolve("hot water");
      }
    }, time);
  });
}

function brewCoffee(hotWater) {
  return new Promise((resolve, reject) => {
    const time = 1000 + Math.random() * 1000;
    console.log("Step 2: Brewing coffee with", hotWater, "...");

    setTimeout(() => {
      if (Math.random() < 0.2) {
        reject("Coffee machine jammed during brewing.");
      } else {
        console.log("Coffee brewed ☕");
        resolve("brewed coffee");
      }
    }, time);
  });
}

function pourIntoCup(brewedCoffee) {
  return new Promise((resolve, reject) => {
    const time = 1000 + Math.random() * 1000;
    console.log("Step 3: Pouring", brewedCoffee, "into the cup...");

    setTimeout(() => {
      if (Math.random() < 0.2) {
        reject("Oops! Spilled the coffee while pouring.");
      } else {
        console.log("Coffee poured into the cup 🥤");
        resolve("Coffee ready for the team!");
      }
    }, time);
  });
}

// Promise chaining to simulate the full coffee-making process
boilWater()
  .then((hotWater) => {
    return brewCoffee(hotWater);
  })
  .then((brewedCoffee) => {
    return pourIntoCup(brewedCoffee);
  })
  .then((finalMessage) => {
    console.log(finalMessage);
  })
  .catch((error) => {
    console.error("Coffee process failed:", error);
  });
