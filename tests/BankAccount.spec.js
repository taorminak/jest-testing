const BankAccount = require("../src/BankAccount");

describe("Bank Account", () => {
  let account;

  beforeEach(() => {
    account = new BankAccount();
  });

  it("should initialize with a zero balance", () => {
    const balance = account.balance;

    expect(balance).toBe(0);
  });

  const accountTypes = ["checking", "savings"];
  it.each(accountTypes)("should initialize with the correct type", (type) => {
    account = new BankAccount(type);
    const accountType = account.type;

    expect(accountType).toMatch(/^(checking|savings)$/);
  });

  const addedAmounts = [1000, 500, 1235.5];
  it.each(addedAmounts)("should deposit funds into account", (amount) => {
    const initialBalance = account.balance;

    account.deposit(amount);

    const expectedBalance = initialBalance + amount;

    expect(account.balance).toBe(expectedBalance);
  });

  const negativeAmounts = [-100, -509, -0.01, "hundred"];
  it.each(negativeAmounts)(
    "should throw a new error when provided with a negative amount for deposit or when the amount is not a number",
    (amount) => {
      const resultAddDeposit = () => {
        account.deposit(amount);
      };

      expect(resultAddDeposit).toThrow("Invalid deposit amount");
    }
  );

  const withdrawnAmounts = [
    [1000, 1500],
    [500, 988],
    [1235.5, 1873.78],
  ];
  it.each(withdrawnAmounts)(
    "should withdraw funds from the account",
    (amount, initialBalance) => {
      account.balance = initialBalance;

      account.withdraw(amount);
      const expectedBalance = initialBalance - amount;

      expect(account.balance).toBe(expectedBalance);
    }
  );

  const negativeWithdrawals = [-160, -9, -0.0451, true];
  it.each(negativeWithdrawals)(
    "should throw a new error when a withdrawl has a negative value or when the value is not a number",
    (withdrawal) => {
      const resultWithdraw = () => {
        account.withdraw(withdrawal);
      };

      expect(resultWithdraw).toThrow("Invalid withdrawal amount");
    }
  );

  const withdrawalsFromChecking = [
    [1501, 1500],
    [500, 88],
    [1235.5, 1073.78],
  ];
  it.each(withdrawalsFromChecking)(
    "should throw a new error when a type od account is checking and the withdrawal is bigger than balance",
    (withdrawal, balance) => {
      account.type = "checking";
      account.balance = balance;
      const resultWithdraw = () => {
        account.withdraw(withdrawal);
      };

      expect(resultWithdraw).toThrow("Insufficient funds");
    }
  );

  const withdrawalsFromSavings = [
    [1201, 1100],
    [500, 388],
    [1235.5, 1135],
  ];
  it.each(withdrawalsFromSavings)(
    "should throw a new error when a type od account is savings and the withdrawal is bigger than balance plus 100",
    (withdrawal, balance) => {
      account.type = "savings";
      account.balance = balance;

      const resultWithdraw = () => {
        account.withdraw(withdrawal);
      };

      expect(resultWithdraw).toThrow("Insufficient funds");
    }
  );

  const balancies = [1000, 56, 0.01, -76];
  it.each(balancies)("should return the current balance", (balance) => {
    account.balance = balance;

    const returnedBalance = account.checkBalance();

    expect(returnedBalance).toBe(balance);
  });

  const rates = [200, 1000, 0.05];
  it.each(rates)("should calculate interest for saving accounts", (rate) => {
    account.type = "savings";

    const expectedInterest = account.balance * (rate / 100);
    const result = account.calculateInterest(rate);

    expect(result).toBe(expectedInterest);
  });

  it.each(rates)("should throw an error when the type of account is checking", (rate)=> {
    account.type = "checking";

    const resultWithdraw = () => {
        account.calculateInterest(rate);
      };

    expect(resultWithdraw).toThrow("Interest can only be calculated for savings account");
  })
});
