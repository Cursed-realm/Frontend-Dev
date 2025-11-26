function getBugs() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldFail = Math.random() < 0.3; // 30% chance API fails

      if (shouldFail) {
        // Simulate API error
        reject("Failed to fetch bugs from server");
      } else {
        // Simulate successful bug list
        const bugs = ["UI glitch", "API timeout", "Login failure"];
        resolve(bugs);
      }
    }, 1000);
  });
}

// 2) Use the Promise and log with console.table()
getBugs()
  .then((bugs) => {
    console.log("Bug list fetched successfully:");
    console.table(bugs);
  })
  .catch((error) => {
    console.error("Bug API error:", error);
  });
