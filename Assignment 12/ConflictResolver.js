var bonus = 5000;
function calculateSalary() {
	let salary = 40000;
	let isPermanent = true;
	let total = salary;
	if (isPermanent) {
		total += bonus;
	}
	console.log('Inside calculateSalary (local isPermanent =', isPermanent + '): Total salary =', total);
}
function calculateSalaryUsingGlobal() {
	let salary = 40000;
	let total = salary;
	if (typeof isPermanent !== 'undefined' && isPermanent) {
		total += bonus;
	}
	console.log('Inside calculateSalaryUsingGlobal (global isPermanent =', (typeof isPermanent === 'undefined' ? 'undefined' : isPermanent) + '): Total salary =', total);
}
calculateSalary();
isPermanent = false;
console.log('\nAfter assigning `isPermanent = false` at top-level (no let/var/const): global isPermanent =', isPermanent);
calculateSalary(); 
calculateSalaryUsingGlobal(); 
isPermanent = true;
console.log('\nSet global isPermanent =', isPermanent);
calculateSalaryUsingGlobal(); 