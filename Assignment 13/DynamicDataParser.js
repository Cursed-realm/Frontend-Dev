const apiData = ["25", "true", "false", "NaN", " ", "100px", "3.14", null, undefined];
const validNumeric = [];
const invalidNumeric = [];
console.log("=== DATA CONVERSION REPORT ===\n");
apiData.forEach((value, index) => {
    const numValue = Number(value);
    const boolValue = Boolean(value);
    const strValue = String(value);
    const isValid = !isNaN(numValue) && numValue !== null && strValue.trim() !== "" && !/[a-z]/i.test(strValue);
    console.log(`[${index}] Original: ${strValue}`);
    console.log(`    Number: ${numValue} | Boolean: ${boolValue} | String: "${strValue}"`);
    if (isValid) {
        validNumeric.push(numValue);
        console.log(`    Status: ✓ VALID\n`);
    } else {
        invalidNumeric.push({ value: strValue, reason: isNaN(numValue) ? "NaN" : "Invalid format" });
        console.log(`    Status: ✗ INVALID\n`);
    }
});

console.log("=== SUMMARY ===");
console.log(`Valid Numeric Array: [${validNumeric.join(", ")}]`);
console.log(`\nInvalid Entries:`);
invalidNumeric.forEach(item => {
    console.log(`  - "${item.value}" (${item.reason})`);
});