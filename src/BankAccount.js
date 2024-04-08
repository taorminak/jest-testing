class BankAccount {
    constructor(type) {
      this.balance = 0;
      this.type = type; // Type of account (e.g., "checking" or "savings")
    }
  
    // Deposit funds into the account
    deposit(amount) {
      if (typeof amount !== 'number' || amount <= 0) {
        throw new Error('Invalid deposit amount');
      }
      this.balance += amount;
    }
  
    // Withdraw funds from the account
    withdraw(amount) {
      if (typeof amount !== 'number' || amount <= 0) {
        throw new Error('Invalid withdrawal amount');
      }
      if (this.type === 'checking') {
        if (amount > this.balance) {
          throw new Error('Insufficient funds');
        }
      } else if (this.type === 'savings') {
        // Allow overdraft of up to 100 for savings account
        if (amount > this.balance + 100) {
          throw new Error('Insufficient funds');
        }
      }
      this.balance -= amount;
    }
  
    // Check the current balance
    checkBalance() {
      return this.balance;
    }
  
    // Calculate interest for savings account
    calculateInterest(rate) {
      if (this.type !== 'savings') {
        throw new Error('Interest can only be calculated for savings account');
      }
      const interest = this.balance * (rate / 100);
      this.balance += interest;
      return interest;
    }
  }
  
  module.exports = BankAccount;
  