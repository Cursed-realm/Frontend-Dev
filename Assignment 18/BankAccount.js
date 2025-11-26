class BankAccount {
  #balance;

  constructor() {
    this.#balance = 0;
  }

  deposit(amount) {
    if (amount > 0) this.#balance += amount;
  }

  withdraw(amount) {
    if (amount > this.#balance) {
      throw new Error("Insufficient balance");
    }
    this.#balance -= amount;
  }

  getBalance() {
    return this.#balance;
  }
}

const acc = new BankAccount();
acc.deposit(1000);
console.log("Balance after deposit:", acc.getBalance());

try {
  acc.withdraw(1200);
} catch (e) {
  console.log("Error:", e.message);
}

acc.withdraw(500);
console.log("Balance after withdrawal:", acc.getBalance());
