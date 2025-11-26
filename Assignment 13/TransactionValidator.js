const transactions = [
  { id: 1, amount: 2000 },
  { id: 2, amount: -500 },
  { id: 3 },
  null,
  { id: 4, amount: 1500 },
  { id: 5, amount: 0 },
  { amount: 800 },
  { id: 6, amount: -100 },
  { id: 7, amount: 3000 }
];

// Custom Error Classes
class NegativeAmountError extends Error {
  constructor(id, amount) {
    super(`Negative amount detected: Transaction ID ${id} has amount ${amount}`);
    this.name = 'NegativeAmountError';
    this.transactionId = id;
    this.amount = amount;
    this.errorType = 'NEGATIVE_AMOUNT';
  }
}

class MissingPropertyError extends Error {
  constructor(property, transaction) {
    super(`Missing ${property}: Transaction is incomplete`);
    this.name = 'MissingPropertyError';
    this.property = property;
    this.transaction = transaction;
    this.errorType = 'MISSING_PROPERTY';
  }
}

class NullTransactionError extends Error {
  constructor(index) {
    super(`Null transaction detected at index ${index}`);
    this.name = 'NullTransactionError';
    this.index = index;
    this.errorType = 'NULL_TRANSACTION';
  }
}

// Validation Function
function validateTransaction(transaction, index) {
  // Check for null entry
  if (transaction === null || transaction === undefined) {
    throw new NullTransactionError(index);
  }

  // Check if transaction is an object
  if (typeof transaction !== 'object') {
    throw new Error(`Invalid transaction type at index ${index}`);
  }

  // Check for missing ID
  if (!transaction.hasOwnProperty('id') || transaction.id === null || transaction.id === undefined) {
    throw new MissingPropertyError('id', transaction);
  }

  // Check for missing amount
  if (!transaction.hasOwnProperty('amount') || transaction.amount === null || transaction.amount === undefined) {
    throw new MissingPropertyError('amount', transaction);
  }

  // Check for negative amount
  if (transaction.amount < 0) {
    throw new NegativeAmountError(transaction.id, transaction.amount);
  }

  // If all checks pass, return true
  return true;
}

// Main Processing Function
function processTransactions(transactionList) {
  // Task 3: Arrays to categorize results
  const validTransactions = [];
  const invalidTransactions = [];
  
  // Error categorization
  const errorSummary = {
    negativeAmount: [],
    missingProperty: [],
    nullTransaction: [],
    other: []
  };

  console.log('🔍 TRANSACTION VALIDATOR');
  console.log('═'.repeat(80));
  console.log(`\nProcessing ${transactionList.length} transactions...\n`);

  // Task 1: Loop through each transaction
  for (let i = 0; i < transactionList.length; i++) {
    const transaction = transactionList[i];
    
    // Task 5: Breakpoint here - Watch variables in debugger
    // Set breakpoint on the next line to inspect: transaction, i, validTransactions, invalidTransactions
    debugger; // Remove this line in production
    
    try {
      // Task 2: Validate and throw custom errors
      validateTransaction(transaction, i);
      
      // If validation passes, add to valid transactions
      validTransactions.push({
        index: i,
        transaction: transaction,
        status: 'VALID'
      });
      
      console.log(`✅ Transaction ${i + 1}: VALID`);
      console.log(`   ID: ${transaction.id}, Amount: ₹${transaction.amount.toLocaleString()}`);
      console.log('─'.repeat(80));
      
    } catch (error) {
      // Task 3: Catch and categorize errors
      const errorDetails = {
        index: i,
        transaction: transaction,
        error: error.message,
        errorType: error.errorType || 'UNKNOWN',
        status: 'INVALID'
      };
      
      invalidTransactions.push(errorDetails);
      
      // Categorize by error type
      if (error instanceof NegativeAmountError) {
        errorSummary.negativeAmount.push(errorDetails);
        console.log(`❌ Transaction ${i + 1}: FAILED - Negative Amount`);
        console.log(`   ID: ${error.transactionId}, Amount: ₹${error.amount}`);
      } else if (error instanceof MissingPropertyError) {
        errorSummary.missingProperty.push(errorDetails);
        console.log(`❌ Transaction ${i + 1}: FAILED - Missing ${error.property}`);
        console.log(`   Transaction: ${JSON.stringify(transaction)}`);
      } else if (error instanceof NullTransactionError) {
        errorSummary.nullTransaction.push(errorDetails);
        console.log(`❌ Transaction ${i + 1}: FAILED - Null Entry`);
        console.log(`   Index: ${error.index}`);
      } else {
        errorSummary.other.push(errorDetails);
        console.log(`❌ Transaction ${i + 1}: FAILED - Unknown Error`);
        console.log(`   Error: ${error.message}`);
      }
      
      console.log(`   Error: ${error.message}`);
      console.log('─'.repeat(80));
    }
  }

  // Task 4: Print final reports
  printFinalReport(validTransactions, invalidTransactions, errorSummary);
  
  return {
    valid: validTransactions,
    invalid: invalidTransactions,
    summary: errorSummary
  };
}

// Task 4: Final Report Function
function printFinalReport(valid, invalid, errorSummary) {
  const total = valid.length + invalid.length;
  const successRate = ((valid.length / total) * 100).toFixed(2);
  
  console.log('\n\n📊 FINAL VALIDATION REPORT');
  console.log('═'.repeat(80));
  
  // Overall Statistics
  console.log('\n📈 OVERALL STATISTICS:');
  console.log('─'.repeat(80));
  console.log(`Total Transactions Processed:  ${total}`);
  console.log(`✅ Valid Transactions:         ${valid.length} (${successRate}%)`);
  console.log(`❌ Invalid Transactions:       ${invalid.length} (${(100 - successRate).toFixed(2)}%)`);
  
  // Valid Transactions Summary
  if (valid.length > 0) {
    console.log('\n\n✅ VALID TRANSACTIONS DETAILS:');
    console.log('─'.repeat(80));
    
    let totalAmount = 0;
    valid.forEach((item, idx) => {
      console.log(`${idx + 1}. ID: ${item.transaction.id.toString().padEnd(5)} | Amount: ₹${item.transaction.amount.toLocaleString().padStart(10)}`);
      totalAmount += item.transaction.amount;
    });
    
    console.log('─'.repeat(80));
    console.log(`Total Valid Amount: ₹${totalAmount.toLocaleString()}`);
    console.log(`Average Transaction: ₹${(totalAmount / valid.length).toLocaleString(undefined, { maximumFractionDigits: 2 })}`);
  }
  
  // Error Breakdown
  console.log('\n\n❌ ERROR BREAKDOWN:');
  console.log('─'.repeat(80));
  console.log(`🚫 Negative Amount Errors:     ${errorSummary.negativeAmount.length}`);
  console.log(`⚠️  Missing Property Errors:   ${errorSummary.missingProperty.length}`);
  console.log(`🔴 Null Transaction Errors:    ${errorSummary.nullTransaction.length}`);
  console.log(`❓ Other Errors:               ${errorSummary.other.length}`);
  
  // Detailed Error Reports
  if (errorSummary.negativeAmount.length > 0) {
    console.log('\n\n🚫 NEGATIVE AMOUNT ERRORS:');
    console.log('─'.repeat(80));
    errorSummary.negativeAmount.forEach((err, idx) => {
      console.log(`${idx + 1}. Index: ${err.index} | ID: ${err.transaction?.id} | Amount: ₹${err.transaction?.amount}`);
    });
  }
  
  if (errorSummary.missingProperty.length > 0) {
    console.log('\n\n⚠️  MISSING PROPERTY ERRORS:');
    console.log('─'.repeat(80));
    errorSummary.missingProperty.forEach((err, idx) => {
      console.log(`${idx + 1}. Index: ${err.index} | Transaction: ${JSON.stringify(err.transaction)}`);
    });
  }
  
  if (errorSummary.nullTransaction.length > 0) {
    console.log('\n\n🔴 NULL TRANSACTION ERRORS:');
    console.log('─'.repeat(80));
    errorSummary.nullTransaction.forEach((err, idx) => {
      console.log(`${idx + 1}. Index: ${err.index}`);
    });
  }
  
  // Recommendations
  console.log('\n\n💡 RECOMMENDATIONS:');
  console.log('─'.repeat(80));
  if (errorSummary.negativeAmount.length > 0) {
    console.log('• Review and correct negative amount transactions');
  }
  if (errorSummary.missingProperty.length > 0) {
    console.log('• Complete missing transaction data (ID or Amount)');
  }
  if (errorSummary.nullTransaction.length > 0) {
    console.log('• Remove or replace null transaction entries');
  }
  if (valid.length === total) {
    console.log('🎉 All transactions are valid! No action needed.');
  }
  
  console.log('\n' + '═'.repeat(80));
}

// Execute the validator
const results = processTransactions(transactions);

// Export results (optional - for further processing)
console.log('\n\n📦 EXPORTABLE RESULTS:');
console.log(JSON.stringify(results, null, 2));