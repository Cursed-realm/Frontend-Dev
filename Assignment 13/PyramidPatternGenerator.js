"use strict";

function generatePyramid(rows) {
  console.log("=== PYRAMID PATTERN (using let) ===\n");
  
  // Outer loop: controls number of rows
  for (let i = 1; i <= rows; i++) {
    let line = "";
    
    // Inner loop: controls stars in each row
    for (let j = 1; j <= i; j++) {
      line += "* ";
    }
    
    console.log(line);
  }
}

// Default: 5 rows
generatePyramid(5);