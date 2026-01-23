const transactionForm = document.getElementById("transactionForm");
const transactionList = document.getElementById("transactionList");
const transactionTemplate = document.getElementById("transactionTemplate");
const totalIncome = document.getElementById("totalIncome");
const totalExpense = document.getElementById("totalExpense");
const balanceAmount = document.getElementById("balanceAmount");
const balancePill = document.getElementById("balancePill");
const pulseFill = document.getElementById("pulseFill");
const pulseLabel = document.getElementById("pulseLabel");
const countChip = document.getElementById("countChip");
const typeControl = document.getElementById("typeControl");
const typeInput = document.getElementById("type");
const clearAllButton = document.getElementById("clearAll");

const STORAGE_KEY = "budgetiq-transactions";

const defaultTransactions = [
  {
    id: crypto.randomUUID(),
    type: "income",
    amount: 3200,
    category: "Salary",
    date: new Date().toISOString().split("T")[0],
    note: "Monthly payroll",
  },
  {
    id: crypto.randomUUID(),
    type: "expense",
    amount: 240,
    category: "Groceries",
    date: new Date().toISOString().split("T")[0],
    note: "Weekly staples",
  },
  {
    id: crypto.randomUUID(),
    type: "expense",
    amount: 120,
    category: "Utilities",
    date: new Date().toISOString().split("T")[0],
    note: "Electricity bill",
  },
];

const formatCurrency = (value) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);

const formatDate = (value) => {
  const date = new Date(value);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const getTransactions = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultTransactions));
    return [...defaultTransactions];
  }

  try {
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
};

const saveTransactions = (transactions) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
};

const updateOverview = (transactions) => {
  const income = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((sum, transaction) => sum + transaction.amount, 0);
  const expense = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((sum, transaction) => sum + transaction.amount, 0);
  const balance = income - expense;

  totalIncome.textContent = formatCurrency(income);
  totalExpense.textContent = formatCurrency(expense);
  balanceAmount.textContent = formatCurrency(balance);

  if (balance > 0) {
    balancePill.textContent = "Healthy";
    balancePill.style.background = "#d9f0e3";
    balancePill.style.color = "#2d6a4f";
  } else if (balance < 0) {
    balancePill.textContent = "Overdrawn";
    balancePill.style.background = "#f7d2d2";
    balancePill.style.color = "#9c2a2a";
  } else {
    balancePill.textContent = "Neutral";
    balancePill.style.background = "var(--accent-soft)";
    balancePill.style.color = "var(--accent-dark)";
  }

  const activityTotal = income + expense;
  const pulsePercent = activityTotal === 0 ? 0 : Math.min((expense / activityTotal) * 100, 100);
  pulseFill.style.width = `${pulsePercent}%`;
  pulseLabel.textContent =
    activityTotal === 0
      ? "No activity yet"
      : `${Math.round(pulsePercent)}% of activity is expenses`;
};

const renderTransactions = (transactions) => {
  transactionList.innerHTML = "";
  countChip.textContent = `${transactions.length} transaction${transactions.length === 1 ? "" : "s"}`;

  if (!transactions.length) {
    const empty = document.createElement("p");
    empty.textContent = "No transactions yet. Add your first entry to get started.";
    empty.className = "transaction-meta";
    transactionList.appendChild(empty);
    return;
  }

  transactions
    .slice()
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .forEach((transaction) => {
      const clone = transactionTemplate.content.cloneNode(true);
      const item = clone.querySelector(".transaction");
      const title = clone.querySelector(".transaction-title");
      const meta = clone.querySelector(".transaction-meta");
      const amount = clone.querySelector(".transaction-amount");
      const button = clone.querySelector(".icon-button");

      item.classList.add(transaction.type);
      title.textContent = transaction.category;
      meta.textContent = `${formatDate(transaction.date)} · ${transaction.note || "No note"}`;
      amount.textContent = `${transaction.type === "expense" ? "-" : "+"}${formatCurrency(
        transaction.amount
      )}`;

      button.addEventListener("click", () => {
        const updated = transactions.filter((entry) => entry.id !== transaction.id);
        saveTransactions(updated);
        render(updated);
      });

      transactionList.appendChild(clone);
    });
};

const render = (transactions) => {
  updateOverview(transactions);
  renderTransactions(transactions);
};

const addTransaction = (formData) => {
  const amountValue = Number(formData.get("amount"));
  const category = formData.get("category").trim();
  const date = formData.get("date");
  const note = formData.get("note").trim();

  if (!amountValue || amountValue <= 0) {
    return;
  }

  const transactions = getTransactions();
  transactions.push({
    id: crypto.randomUUID(),
    type: formData.get("type"),
    amount: amountValue,
    category,
    date,
    note,
  });

  saveTransactions(transactions);
  render(transactions);
};

const setTodayDate = () => {
  const dateInput = document.getElementById("date");
  const today = new Date().toISOString().split("T")[0];
  dateInput.value = today;
};

const setupTypeControl = () => {
  typeControl.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button) {
      return;
    }

    const value = button.dataset.value;
    if (!value) {
      return;
    }

    typeInput.value = value;
    typeControl.querySelectorAll(".segment").forEach((segment) => {
      segment.classList.toggle("active", segment.dataset.value === value);
    });
  });
};

transactionForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(transactionForm);
  addTransaction(formData);
  transactionForm.reset();
  setTodayDate();
  typeInput.value = "income";
  typeControl.querySelectorAll(".segment").forEach((segment) => {
    segment.classList.toggle("active", segment.dataset.value === "income");
  });
});

clearAllButton.addEventListener("click", () => {
  localStorage.removeItem(STORAGE_KEY);
  render([]);
});

setupTypeControl();
setTodayDate();
render(getTransactions());
