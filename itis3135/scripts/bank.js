class BankAccount {
  constructor() {
    this.balance = 0;
    this.transactions = [];
  }

  deposit(amount) {
    if (amount > 0) {
      this.transactions.push({ type: "deposit", amount: amount });
      this.balance += amount;
      return `Successfully deposited $${amount}. New balance: $${this.balance}`;
    } else {
      return "Deposit amount must be greater than zero.";
    }
  }

  withdraw(amount) {
    if (amount > 0 && amount <= this.balance) {
      this.transactions.push({ type: "withdraw", amount: amount });
      this.balance -= amount;
      return `Successfully withdrew $${amount}. New balance: $${this.balance}`;
    } else {
      return "Insufficient balance or invalid amount.";
    }
  }

  checkBalance() {
    return `Current balance: $${this.balance}`;
  }

  listAllDeposits() {
    const deposits = this.transactions
      .filter((t) => t.type === "deposit")
      .map((t) => t.amount);
    return `Deposits: ${deposits.join(",")}`;
  }

  listAllWithdrawals() {
    const withdrawals = this.transactions
      .filter((t) => t.type === "withdraw")
      .map((t) => t.amount);
    return `Withdrawals: ${withdrawals.join(",")}`;
  }
}

const myAccount = new BankAccount();

const amountInput = document.getElementById("amount-input");
const depositBtn = document.getElementById("deposit-btn");
const withdrawBtn = document.getElementById("withdraw-btn");
const balanceBtn = document.getElementById("balance-btn");
const resetBtn = document.getElementById("reset-btn");
const bankMessage = document.getElementById("bank-message");
const balanceValue = document.getElementById("balance-value");
const depositCount = document.getElementById("deposit-count");
const withdrawCount = document.getElementById("withdraw-count");
const transactionCount = document.getElementById("transaction-count");
const transactionList = document.getElementById("transaction-list");

function getAmount() {
  const amount = Number(amountInput.value);
  if (!Number.isFinite(amount) || amount <= 0) {
    return null;
  }
  return amount;
}

// prettier-ignore
function renderAccount(message = "") {
  balanceValue.textContent = `$${myAccount.balance}`;
  depositCount.textContent = myAccount.transactions.filter(
    (transaction) => transaction.type === "deposit"
  ).length;
  withdrawCount.textContent = myAccount.transactions.filter(
    (transaction) => transaction.type === "withdraw"
  ).length;
  transactionCount.textContent = myAccount.transactions.length;
  bankMessage.textContent = message || myAccount.checkBalance();

  transactionList.innerHTML = "";
  if (!myAccount.transactions.length) {
    const emptyItem = document.createElement("li");
    emptyItem.textContent = "No transactions yet.";
    transactionList.appendChild(emptyItem);
    return;
  }

  myAccount.transactions
    .slice()
    .reverse()
    .forEach((transaction) => {
      const item = document.createElement("li");
      item.className = `transaction-item transaction-${transaction.type}`;
      item.textContent = `${transaction.type === "deposit" ? "Deposit" : "Withdrawal"}: $${transaction.amount}`;
      transactionList.appendChild(item);
    });
}

depositBtn.addEventListener("click", () => {
  const amount = getAmount();
  if (amount === null) {
    renderAccount("Enter a valid deposit amount greater than zero.");
    return;
  }

  renderAccount(myAccount.deposit(amount));
});

withdrawBtn.addEventListener("click", () => {
  const amount = getAmount();
  if (amount === null) {
    renderAccount("Enter a valid withdrawal amount greater than zero.");
    return;
  }

  renderAccount(myAccount.withdraw(amount));
});

balanceBtn.addEventListener("click", () => {
  renderAccount(myAccount.checkBalance());
});

resetBtn.addEventListener("click", () => {
  myAccount.balance = 0;
  myAccount.transactions = [];
  amountInput.value = "";
  renderAccount("Account reset to zero.");
});

renderAccount();
