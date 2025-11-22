let currentSalary = 50000; // Starting salary
const incrementRate = 7; // Annual increment in %

const projection = [];

for (let year = 1; year <= 5; year++) {
  currentSalary += (incrementRate / 100) * currentSalary;
  projection.push({ Year: year, Salary: Math.round(currentSalary) });
}

console.table(projection); // Show salary for each year
