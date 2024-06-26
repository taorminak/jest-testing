const BankAccount = require("../src/BankAccount");

describe("Bank Account", () => {
  let account;
  const accountTypes = ["checking", "savings"];

  beforeEach(() => {
    account = new BankAccount();
  });

  //add a function createGivenCheckingAccount which return a bank account with checking

  describe("Account initialization", () => {
    it("should initialize with a zero balance", () => {
      const zeroBalance = 0;

      expect(account.balance).toBe(zeroBalance);
    });

    describe.each(accountTypes)("Account type initialization", (type) => {
      let typeSpecificAccount;

      beforeEach(() => {
        typeSpecificAccount = new BankAccount(type);
      });

      it(`should initialize with a string type`, () => {
        let type = typeSpecificAccount.type;
        const typeString = "string";

        const actualType = typeof type;

        expect(actualType).toBe(typeString); //have it readable
      });

      it(`should be a ${type} type account`, () => {
        expect(typeSpecificAccount.type).toMatch(/^(checking|savings)$/);
      });

      it("should initialize with a numeric balance", () => {
        const balance = typeSpecificAccount.balance;
        const typeNumber = "number";

        expect(typeof balance).toBe(typeNumber);
      });

      // it("should initialize with a zero balance", () => {
      //   const zeroBalance = 0;

      //   expect(typeSpecificAccount.balance).toBe(zeroBalance);
      // });
    });

    describe("Deposit", () => {
      accountTypes.forEach((type) => {
        beforeEach(() => {
          account = new BankAccount(type);
        });
      });

      const addedAmounts = [
        100000000000, 
        500, 
        1235.5
      ];
      it.each(addedAmounts)("should deposit funds into account", (amount) => {
        const initialBalance = account.balance; //can call a helper function

        account.deposit(amount);

        const expectedBalance = initialBalance + amount;
        expect(account.balance).toBe(expectedBalance);
      });

      const negativeAmounts = [
        -1000000000, 
        -509, 
        -0.01
      ];
      it.each(negativeAmounts)(
        "should throw a new error when provided with a negative amount for deposit",
        (amount) => {
          const resultAddDeposit = () => {
            account.deposit(amount);
          };

          expect(resultAddDeposit).toThrow("Invalid deposit amount");
        }
      );

      const invalidAmounts = ["hundred", false, undefined];
      it.each(invalidAmounts)(
        "should throw a new error when added amount is not a number",
        (amount) => {
          const resultAddDeposit = () => {
            account.deposit(amount);
          };

          expect(resultAddDeposit).toThrow("Invalid deposit amount");
        }
      );

      it("should throw a new error when provided with a zero amount for deposit", () => {
        const zeroAmount = 0;
        const resultAddDeposit = () => {
          account.deposit(zeroAmount);
        };

        expect(resultAddDeposit).toThrow("Invalid deposit amount");
      });
    });

    describe("Withdrawal", () => {
      accountTypes.forEach((type) => {
        beforeEach(() => {
          account = new BankAccount(type);
        });
      });

      const withdrawnAmounts = [
        [1000, 1500],
        [500, 988],
        [1235.5, 1873.78],
      ];
      it.each(withdrawnAmounts)(
        "should withdraw funds from the account when the amount is valid",
        (amount, initialBalance) => { //amountToWithdraw
          account.balance = initialBalance;

          account.withdraw(amount);
          const expectedBalance = initialBalance - amount;

          expect(account.balance).toBe(expectedBalance);
        }
      );

      const negativeWithdrawals = [-160, -9, -0.0451];
      it.each(negativeWithdrawals)(
        "should throw a new error when a withdrawl has a negative value",
        (withdrawal) => {
          const resultWithdraw = () => {
            account.withdraw(withdrawal);
          };

          expect(resultWithdraw).toThrow("Invalid withdrawal amount");
        }
      );

      const invalidWithdrawals = ["billion", true, undefined];
      it.each(invalidWithdrawals)(
        "should throw a new error when a withdrawl value is not a number",
        (withdrawal) => {
          const resultWithdraw = () => {
            account.withdraw(withdrawal);
          };

          expect(resultWithdraw).toThrow("Invalid withdrawal amount");
        }
      );

      const withdrawals = [100, 23746465, 0.067];
      it.each(withdrawals)(
        "should throw an error when withdrawing from an account with zero balance",
        (withdrawal) => {
          account.balance = 0;
          account.type = "checking" || "savings";

          const resultWithdraw = () => {
            account.withdraw(withdrawal);
          };

          expect(resultWithdraw).toThrow("Insufficient funds");
        }
      );

      describe("Checking Account", () => {
        beforeEach(() => {
          account = new BankAccount("checking");
        });
        const withdrawalsFromChecking = [
          [1501, 1500],
          [500, 88],
          [1235.5, 1073.78],
        ];
        it.each(withdrawalsFromChecking)(
          "should throw a new error when a type od account is checking and the withdrawal is bigger than balance",
          (withdrawal, balance) => {
            account.balance = balance;

            const resultWithdraw = () => {
              account.withdraw(withdrawal);
            };

            expect(resultWithdraw).toThrow("Insufficient funds");
          }
        );
      });

      describe("Savings Account", () => {
        beforeEach(() => {
          account = new BankAccount("savings");
        });
        const overdraftWithdrawalsFromSavings = [
          [100, 50],
          [90, 10],
          [200, 155],
        ];
        it.each(overdraftWithdrawalsFromSavings)(
          "should allow withdrawing an amount greater than balance with savings account overdraft",
          (withdrawal, balance) => {
            account.balance = balance;
            const initialBalance = account.balance;

            account.withdraw(withdrawal);

            const expectedBalance = initialBalance - withdrawal;
            expect(account.balance).toBe(expectedBalance);
          }
        );

        const withdrawalsFromSavings = [
          [1201, 1100],
          [500, 388],
          [1235.5, 1135],
        ];
        it.each(withdrawalsFromSavings)(
          "should throw a new error when a type of account is savings and the withdrawal is bigger than balance plus 100",
          (withdrawal, balance) => {
            account.balance = balance;

            const resultWithdraw = () => {
              account.withdraw(withdrawal);
            };

            expect(resultWithdraw).toThrow("Insufficient funds");
          }
        );
      });
    });

    describe("Balance Inquiry", () => {
      accountTypes.forEach((type) => {
        beforeEach(() => {
          account = new BankAccount(type);
        });
      });

      const balances = [1000, 56, 0.01, -76];

      it.each(balances)("should return the numeric balance", (balance) => {
        account.balance = balance;
        const typeNumber = "number";

        const returnedBalance = account.checkBalance();

        expect(typeof returnedBalance).toBe(typeNumber);
      });

      it.each(balances)("should return the current balance", (balance) => {
        account.balance = balance;

        const returnedBalance = account.checkBalance();

        expect(returnedBalance).toBe(balance);
      });
    });

    describe("Interest Calculation", () => {
      accountTypes.forEach((type) => {
        beforeEach(() => {
          account = new BankAccount(type);
        });
      });

      const rates = [2005047847, 1000, 0.05, -7384];
      it.each(rates)(
        "should calculate interest for saving accounts",
        (rate) => {
          account.type = "savings";

          const expectedInterest = account.balance * (rate / 100);
          const result = account.calculateInterest(rate);

          expect(result).toBe(expectedInterest);
        }
      );

      it.each(rates)(
        "should throw an error when the type of account is checking",
        (rate) => {
          account.type = "checking";

          const resultWithdraw = () => {
            account.calculateInterest(rate);
          };

          expect(resultWithdraw).toThrow(
            "Interest can only be calculated for savings account"
          );
        }
      );
    });

    describe("Transaction sequence", () => {
      accountTypes.forEach((type) => {
        beforeEach(() => {
          account = new BankAccount(type);
        });
      });

      const transactionSequenceList = [
        [[200, 300.98, -250, 450, -1.01], 699.97],
        [[500, -300, 100, 200], 500],
        [[1000, -500, -300, -200, 700], 700],
      ];
      it.each(transactionSequenceList)(
        "should handle a sequence of deposits and withdrawals correctly",
        (transactions, expectedBalance) => {
          transactions.forEach((transaction) => {
            if (transaction > 0) {
              account.deposit(transaction);
            } else {
              account.withdraw(Math.abs(transaction));
            }
          });

          expect(account.balance).toBe(expectedBalance);
        }
      );
    });
  });
});
