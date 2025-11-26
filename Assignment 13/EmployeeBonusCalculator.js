"use strict"; // Strict mode to prevent implicit globals

const employees = [
  { name: "Amit", salary: "45000", years: "5" },
  { name: "Sara", salary: "38000", years: "2" },
  { name: "Kiran", salary: "52000", years: "7" }
];

// Function to calculate bonus for an employee
function calculateBonus(employee) {
  try {
    // Validation: Check if employee object exists
    if (!employee || typeof employee !== 'object') {
      throw new Error('Invalid employee data');
    }

    // Validation: Check if required properties exist
    if (!employee.hasOwnProperty('name') || !employee.name) {
      throw new Error('Employee name is missing');
    }
    if (!employee.hasOwnProperty('salary')) {
      throw new Error('Employee salary is missing');
    }
    if (!employee.hasOwnProperty('years')) {
      throw new Error('Employee years is missing');
    }

    // Task 1: Convert salary and years to numbers
    const salary = Number(employee.salary);
    const years = Number(employee.years);

    // Validation: Check if conversion was successful
    if (isNaN(salary) || salary <= 0) {
      throw new Error(`Invalid salary value for ${employee.name}: ${employee.salary}`);
    }
    if (isNaN(years) || years < 0) {
      throw new Error(`Invalid years value for ${employee.name}: ${employee.years}`);
    }

    // Task 2: Calculate bonus based on years of service
    const bonusRate = years > 3 ? 0.1 : 0.05;
    const bonus = salary * bonusRate;
    const totalCompensation = salary + bonus;

    // Task 4: Use template strings to format output
    const output = `
╔════════════════════════════════════════════════════════╗
║  Employee: ${employee.name.padEnd(43)}║
╠════════════════════════════════════════════════════════╣
║  Base Salary:        ₹${salary.toLocaleString('en-IN').padStart(30)}  ║
║  Years of Service:   ${years.toString().padStart(30)}  ║
║  Bonus Rate:         ${(bonusRate * 100).toFixed(0)}%${' '.repeat(29)}║
║  Bonus Amount:       ₹${bonus.toLocaleString('en-IN').padStart(30)}  ║
║  Total Compensation: ₹${totalCompensation.toLocaleString('en-IN').padStart(30)}  ║
╚════════════════════════════════════════════════════════╝
    `;

    console.log(output);

    // Return calculated data for further use
    return {
      name: employee.name,
      salary: salary,
      years: years,
      bonusRate: bonusRate,
      bonus: bonus,
      totalCompensation: totalCompensation
    };

  } catch (error) {
    // Task 5: Handle errors with try...catch
    console.error(`❌ Error processing employee: ${error.message}`);
    return null;
  }
}

// Main function to process all employees
function processEmployees(employeeList) {
  console.log('\n🎯 EMPLOYEE BONUS CALCULATOR');
  console.log('='.repeat(56));

  const results = [];

  for (let i = 0; i < employeeList.length; i++) {
    const result = calculateBonus(employeeList[i]);
    if (result) {
      results.push(result);
    }
  }

  // Summary Report
  if (results.length > 0) {
    console.log('\n📊 SUMMARY REPORT');
    console.log('='.repeat(56));

    const totalSalary = results.reduce((sum, emp) => sum + emp.salary, 0);
    const totalBonus = results.reduce((sum, emp) => sum + emp.bonus, 0);
    const totalCompensation = results.reduce((sum, emp) => sum + emp.totalCompensation, 0);

    console.log(`Total Base Salary:        ₹${totalSalary.toLocaleString('en-IN')}`);
    console.log(`Total Bonus Payout:       ₹${totalBonus.toLocaleString('en-IN')}`);
    console.log(`Total Compensation:       ₹${totalCompensation.toLocaleString('en-IN')}`);
    console.log(`Average Bonus:            ₹${(totalBonus / results.length).toLocaleString('en-IN', { maximumFractionDigits: 2 })}`);
    console.log(`Employees Processed:      ${results.length}`);
  }

  return results;
}

// Execute the program
processEmployees(employees);

// Test with edge cases
console.log('\n\n🧪 TESTING EDGE CASES');
console.log('='.repeat(56));

const testCases = [
  { name: "TestUser1", salary: "invalid", years: "3" },  // Invalid salary
  { name: "TestUser2", salary: "50000", years: "abc" },  // Invalid years
  { name: "TestUser3", salary: "60000" },                // Missing years
  { salary: "70000", years: "4" },                       // Missing name
  { name: "TestUser5", salary: "80000", years: "4" }    // Valid data
];

testCases.forEach(testCase => {
  calculateBonus(testCase);
});