"use strict";

// ════════════════════════════════════════════════════════════════════════════════
//                         STUDENT FORM VALIDATOR
// ════════════════════════════════════════════════════════════════════════════════

class StudentFormValidator {
  constructor() {
    this.validationRules = {
      name: {
        pattern: /^[A-Za-z\s]+$/,
        message: "Name must contain only alphabets and spaces"
      },
      email: {
        pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
        message: "Enter a valid email (example@domain.com)"
      },
      phone: {
        pattern: /^\d{10}$/,
        message: "Phone must be exactly 10 digits"
      },
      password: {
        pattern: /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/,
        message: "Password must have 1 uppercase, 1 number, 1 special character (@$!%*?&#), min 8 chars"
      }
    };
  }

  validate(field, value) {
    const rule = this.validationRules[field];
    if (!rule) return { valid: false, message: "Unknown field" };

    const valid = rule.pattern.test(value);
    return {
      valid: valid,
      message: valid ? `✅ ${field} is valid` : `❌ ${rule.message}`
    };
  }

  validateAll(formData) {
    const results = {};
    for (const [field, value] of Object.entries(formData)) {
      results[field] = this.validate(field, value);
    }
    return results;
  }

  displayResult(field, value, result) {
    const border = result.valid ? '✅ VALID' : '❌ INVALID';
    const color = result.valid ? '\x1b[32m' : '\x1b[31m'; // Green or Red
    const reset = '\x1b[0m';
    
    console.log(`${color}${border}${reset} | ${field.toUpperCase()}: "${value}"`);
    console.log(`         ${result.message}\n`);
  }
}

// ════════════════════════════════════════════════════════════════════════════════
//                              TEST CASES
// ════════════════════════════════════════════════════════════════════════════════

const validator = new StudentFormValidator();

console.log('═'.repeat(80));
console.log('                    STUDENT REGISTRATION FORM VALIDATOR');
console.log('═'.repeat(80));

// Test Data - 3 Examples
const testStudents = [
  {
    name: "John Doe",
    email: "john@example.com",
    phone: "9876543210",
    password: "Pass@123"
  },
  {
    name: "Jane123",  // Invalid: contains numbers
    email: "jane.smith@gmail.com",
    phone: "12345",  // Invalid: less than 10 digits
    password: "weakpass"  // Invalid: no uppercase, number, or special char
  },
  {
    name: "Alice Smith",
    email: "alice.invalid",  // Invalid: no @ or domain
    phone: "9998887770",
    password: "Strong@99"
  }
];

// Validate each student
testStudents.forEach((student, index) => {
  console.log(`\n${'─'.repeat(80)}`);
  console.log(`                       STUDENT ${index + 1} VALIDATION`);
  console.log('─'.repeat(80));
  
  const results = validator.validateAll(student);
  
  for (const [field, value] of Object.entries(student)) {
    validator.displayResult(field, value, results[field]);
  }
  
  const allValid = Object.values(results).every(r => r.valid);
  console.log(allValid ? '✅ Form Submission: ACCEPTED\n' : '❌ Form Submission: REJECTED\n');
});

console.log('═'.repeat(80));
console.log('                         VALIDATION COMPLETE');
console.log('═'.repeat(80));
