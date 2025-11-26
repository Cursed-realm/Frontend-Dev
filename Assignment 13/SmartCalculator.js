"use strict";

// Custom Error Classes
class InvalidOperationError extends Error {
  constructor(operation) {
    super(`Invalid operation: "${operation}". Supported operations: add, subtract, divide, power, root`);
    this.name = 'InvalidOperationError';
    this.operation = operation;
  }
}

class DivideByZeroError extends Error {
  constructor() {
    super('Cannot divide by zero');
    this.name = 'DivideByZeroError';
  }
}

class NegativeRootError extends Error {
  constructor(number) {
    super(`Cannot calculate square root of negative number: ${number}`);
    this.name = 'NegativeRootError';
    this.number = number;
  }
}

// Smart Calculator Class
class SmartCalculator {
  constructor() {
    this.validOperations = ["add", "subtract", "divide", "power", "root"];
    this.results = [];
  }

  calculate(operation, num1, num2) {
    let result;
    
    switch (operation.toLowerCase()) {
      case "add":
        result = num1 + num2;
        break;
        
      case "subtract":
        result = num1 - num2;
        break;
        
      case "divide":
        if (num2 === 0) {
          throw new DivideByZeroError();
        }
        result = num1 / num2;
        break;
        
      case "power":
        result = Math.pow(num1, num2);
        break;
        
      case "root":
        if (num1 < 0) {
          throw new NegativeRootError(num1);
        }
        result = Math.sqrt(num1);
        break;
        
      default:
        throw new InvalidOperationError(operation);
    }
    
    return result;
  }

  executeOperation(operation, num1, num2) {
    try {
      const result = this.calculate(operation, num1, num2);
      
      this.results.push({
        operation: operation,
        num1: num1,
        num2: num2,
        result: result,
        status: 'SUCCESS',
        error: null
      });
      
      return {
        success: true,
        result: result,
        message: this.formatResult(operation, num1, num2, result)
      };
      
    } catch (error) {
      this.results.push({
        operation: operation,
        num1: num1,
        num2: num2,
        result: null,
        status: 'FAILED',
        error: error.message
      });
      
      return {
        success: false,
        result: null,
        message: `❌ ${error.message}`,
        errorType: error.name
      };
    }
  }

  formatResult(operation, num1, num2, result) {
    switch (operation.toLowerCase()) {
      case "add":
        return `${num1} + ${num2} = ${result}`;
      case "subtract":
        return `${num1} - ${num2} = ${result}`;
      case "divide":
        return `${num1} ÷ ${num2} = ${result}`;
      case "power":
        return `${num1} ^ ${num2} = ${result}`;
      case "root":
        return `√${num1} = ${result}`;
      default:
        return `${operation}(${num1}, ${num2}) = ${result}`;
    }
  }

  printSummary() {
    console.log('\n' + '═'.repeat(80));
    console.log('                      📊 CALCULATION SUMMARY REPORT                      ');
    console.log('═'.repeat(80));
    
    const successful = this.results.filter(r => r.status === 'SUCCESS').length;
    const failed = this.results.filter(r => r.status === 'FAILED').length;
    
    console.log(`\n📈 Overall Statistics:`);
    console.log(`   Total Operations: ${this.results.length}`);
    console.log(`   ✅ Successful: ${successful} (${((successful/this.results.length)*100).toFixed(1)}%)`);
    console.log(`   ❌ Failed: ${failed} (${((failed/this.results.length)*100).toFixed(1)}%)`);
    
    console.log('\n' + '─'.repeat(80));
    console.log('                         DETAILED RESULTS                         ');
    console.log('─'.repeat(80));
    
    this.results.forEach((item, index) => {
      console.log(`\n${index + 1}. Operation: ${item.operation.toUpperCase()}`);
      console.log(`   Input: num1 = ${item.num1}, num2 = ${item.num2}`);
      
      if (item.status === 'SUCCESS') {
        console.log(`   ✅ Status: ${item.status}`);
        console.log(`   Result: ${this.formatResult(item.operation, item.num1, item.num2, item.result)}`);
        console.log(`   Value: ${item.result}`);
      } else {
        console.log(`   ❌ Status: ${item.status}`);
        console.log(`   Error: ${item.error}`);
      }
    });
    
    console.log('\n' + '═'.repeat(80));
    
    // Error breakdown
    const errorTypes = {};
    this.results.filter(r => r.status === 'FAILED').forEach(r => {
      const errorName = r.error.split(':')[0];
      errorTypes[errorName] = (errorTypes[errorName] || 0) + 1;
    });
    
    if (Object.keys(errorTypes).length > 0) {
      console.log('\n🚨 Error Breakdown:');
      Object.entries(errorTypes).forEach(([error, count]) => {
        console.log(`   ${error}: ${count} occurrence(s)`);
      });
      console.log('═'.repeat(80));
    }
  }
}

// Main Execution
console.log('🧮 SMART CALCULATOR - ADVANCED ERROR HANDLING\n');

const calculator = new SmartCalculator();
const operations = ["add", "divide", "power", "root", "subtract"];
const num1 = 25, num2 = 0;

console.log('Input Values:');
console.log(`  num1 = ${num1}`);
console.log(`  num2 = ${num2}`);
console.log(`  Operations to test: ${operations.join(', ')}`);
console.log('\n' + '─'.repeat(80));

// Execute all operations
operations.forEach((operation, index) => {
  console.log(`\n[${index + 1}/${operations.length}] Testing: ${operation.toUpperCase()}`);
  const response = calculator.executeOperation(operation, num1, num2);
  
  if (response.success) {
    console.log(`✅ Success: ${response.message}`);
  } else {
    console.log(`${response.message}`);
    console.log(`   Error Type: ${response.errorType}`);
  }
});

// Test additional edge cases
console.log('\n\n' + '═'.repeat(80));
console.log('                    TESTING ADDITIONAL EDGE CASES                    ');
console.log('═'.repeat(80));

const edgeCases = [
  { op: "multiply", n1: 10, n2: 5, desc: "Invalid operation" },
  { op: "root", n1: -16, n2: 0, desc: "Negative root" },
  { op: "divide", n1: 100, n2: 0, desc: "Divide by zero" },
  { op: "power", n1: 2, n2: 10, desc: "Valid power" },
  { op: "add", n1: -50, n2: 50, desc: "Add with negatives" }
];

edgeCases.forEach((test, index) => {
  console.log(`\n[${index + 1}/${edgeCases.length}] ${test.desc}: ${test.op}(${test.n1}, ${test.n2})`);
  const response = calculator.executeOperation(test.op, test.n1, test.n2);
  
  if (response.success) {
    console.log(`✅ Success: ${response.message}`);
  } else {
    console.log(`${response.message}`);
  }
});

// Print final summary
calculator.printSummary();
calculator.results.forEach(item => {
  const op = item.operation.padEnd(11);
  const n1 = String(item.num1).padEnd(6);
  const n2 = String(item.num2).padEnd(6);
  const res = item.status === 'SUCCESS' 
    ? String(item.result.toFixed(2)).padEnd(16) 
    : 'ERROR'.padEnd(16);
  const status = item.status === 'SUCCESS' ? '✅ PASS' : '❌ FAIL';
  
  console.log(`│ ${op} │ ${n1} │ ${n2} │ ${res} │ ${status} │`);
});
console.log('\n✨ Calculator session completed successfully!\n');