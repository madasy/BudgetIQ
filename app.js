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
const accountSelect = document.getElementById("account");
const categoryList = document.getElementById("categoryList");
const csvFileInput = document.getElementById("csvFile");
const csvAccountSelect = document.getElementById("csvAccount");
const importCsvButton = document.getElementById("importCsv");
const csvStatus = document.getElementById("csvStatus");
const rebuildHoldingsButton = document.getElementById("rebuildHoldings");
const rebuildStatus = document.getElementById("rebuildStatus");
const receiptFileInput = document.getElementById("receiptFile");
const receiptVendorInput = document.getElementById("receiptVendor");
const receiptAmountInput = document.getElementById("receiptAmount");
const receiptCategoryInput = document.getElementById("receiptCategory");
const receiptDateInput = document.getElementById("receiptDate");
const receiptAccountSelect = document.getElementById("receiptAccount");
const createReceiptButton = document.getElementById("createReceipt");
const useLocalAiToggle = document.getElementById("useLocalAi");
const analyzeReceiptButton = document.getElementById("analyzeReceipt");
const receiptStatus = document.getElementById("receiptStatus");
const sankeyChart = document.getElementById("sankeyChart");
const sankeyEmpty = document.getElementById("sankeyEmpty");
const accountList = document.getElementById("accountList");
const categoryListPanel = document.getElementById("categoryListPanel");
const newAccountNameInput = document.getElementById("newAccountName");
const newCategoryNameInput = document.getElementById("newCategoryName");
const addAccountButton = document.getElementById("addAccount");
const addCategoryButton = document.getElementById("addCategory");
const accountBalances = document.getElementById("accountBalances");
const investCost = document.getElementById("investCost");
const investValue = document.getElementById("investValue");
const investPnl = document.getElementById("investPnl");
const holdingTable = document.getElementById("holdingTable");
const holdingEmpty = document.getElementById("holdingEmpty");
const holdingList = document.getElementById("holdingList");
const holdingSymbolInput = document.getElementById("holdingSymbol");
const holdingNameInput = document.getElementById("holdingName");
const holdingQuantityInput = document.getElementById("holdingQuantity");
const holdingCostInput = document.getElementById("holdingCost");
const holdingPriceInput = document.getElementById("holdingPrice");
const addHoldingButton = document.getElementById("addHolding");
const clearTransactionsButton = document.getElementById("clearTransactions");
const clearTransactionsStatus = document.getElementById("clearTransactionsStatus");
const updatePricesButton = document.getElementById("updatePrices");
const priceStatus = document.getElementById("priceStatus");
const investmentLots = document.getElementById("investmentLots");
const investmentLotsEmpty = document.getElementById("investmentLotsEmpty");

const STORAGE_KEY = "budgetiq-transactions";
const STORAGE_ACCOUNTS = "budgetiq-accounts";
const STORAGE_CATEGORIES = "budgetiq-categories";
const STORAGE_HOLDINGS = "budgetiq-holdings";
const STORAGE_INVESTMENTS = "budgetiq-investments";
const PRICE_PROXY_URL = "http://localhost:8787/price";

const defaultAccounts = [
  { id: "anish-bank-1", label: "Anish · Bank Account 1" },
  { id: "anish-bank-2", label: "Anish · Bank Account 2" },
  { id: "anish-credit", label: "Anish · Credit Card" },
  { id: "anish-3a", label: "Anish · 3a Savings" },
  { id: "anish-invest", label: "Anish · Investments" },
  { id: "partner-bank-1", label: "Partner · Bank Account 1" },
  { id: "partner-bank-2", label: "Partner · Bank Account 2" },
];

const defaultCategories = [
  "Salary",
  "Groceries",
  "Utilities",
  "Rent",
  "Travel",
  "Childcare",
  "Investments",
  "Savings",
  "Transfer In",
  "FX Exchange",
  "Misc",
  "TWINT",
  "Card Payment",
  "Receipts",
  "Income",
  "Expense",
];

const defaultHoldings = [];

const getAccounts = () => {
  const stored = localStorage.getItem(STORAGE_ACCOUNTS);
  if (!stored) {
    localStorage.setItem(STORAGE_ACCOUNTS, JSON.stringify(defaultAccounts));
    return [...defaultAccounts];
  }
  try {
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) && parsed.length ? parsed : [...defaultAccounts];
  } catch (error) {
    return [...defaultAccounts];
  }
};

const saveAccounts = (nextAccounts) => {
  localStorage.setItem(STORAGE_ACCOUNTS, JSON.stringify(nextAccounts));
};

const getCategories = () => {
  const stored = localStorage.getItem(STORAGE_CATEGORIES);
  if (!stored) {
    localStorage.setItem(STORAGE_CATEGORIES, JSON.stringify(defaultCategories));
    return [...defaultCategories];
  }
  try {
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) && parsed.length ? parsed : [...defaultCategories];
  } catch (error) {
    return [...defaultCategories];
  }
};

const saveCategories = (nextCategories) => {
  localStorage.setItem(STORAGE_CATEGORIES, JSON.stringify(nextCategories));
};

const getHoldings = () => {
  const stored = localStorage.getItem(STORAGE_HOLDINGS);
  if (!stored) {
    localStorage.setItem(STORAGE_HOLDINGS, JSON.stringify(defaultHoldings));
    return [...defaultHoldings];
  }
  try {
    const parsed = JSON.parse(stored);
    if (!Array.isArray(parsed)) {
      return [...defaultHoldings];
    }
    return parsed.map((holding) => ({
      ...holding,
      lastPricePerUnit: holding.lastPricePerUnit || holding.currentPrice || holding.costPerUnit || 0,
      currency: holding.currency || "CHF",
    }));
  } catch (error) {
    return [...defaultHoldings];
  }
};

const saveHoldings = (nextHoldings) => {
  localStorage.setItem(STORAGE_HOLDINGS, JSON.stringify(nextHoldings));
};

const getInvestments = () => {
  const stored = localStorage.getItem(STORAGE_INVESTMENTS);
  if (!stored) {
    localStorage.setItem(STORAGE_INVESTMENTS, JSON.stringify([]));
    return [];
  }
  try {
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
};

const saveInvestments = (nextInvestments) => {
  localStorage.setItem(STORAGE_INVESTMENTS, JSON.stringify(nextInvestments));
};

let accounts = getAccounts();
let categories = getCategories();
let holdings = getHoldings();
let investments = getInvestments();

const defaultTransactions = [
  {
    id: crypto.randomUUID(),
    type: "income",
    amount: 3200,
    category: "Salary",
    date: new Date().toISOString().split("T")[0],
    note: "Monthly payroll",
    account: accounts[0]?.id || "anish-bank-1",
  },
  {
    id: crypto.randomUUID(),
    type: "expense",
    amount: 240,
    category: "Groceries",
    date: new Date().toISOString().split("T")[0],
    note: "Weekly staples",
    account: accounts[0]?.id || "anish-bank-1",
  },
  {
    id: crypto.randomUUID(),
    type: "expense",
    amount: 120,
    category: "Utilities",
    date: new Date().toISOString().split("T")[0],
    note: "Electricity bill",
    account: accounts[2]?.id || "anish-credit",
  },
];

const formatCurrency = (value) =>
  new Intl.NumberFormat("de-CH", {
    style: "currency",
    currency: "CHF",
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
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed.map((transaction) => ({
      ...transaction,
      account: transaction.account || accounts[0].id,
    }));
  } catch (error) {
    return [];
  }
};

const saveTransactions = (transactions) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
};

const updateOverview = (transactions) => {
  if (!totalIncome || !totalExpense || !balanceAmount || !balancePill || !pulseFill || !pulseLabel) {
    return;
  }
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

const accountLabel = (accountId) => {
  const match = accounts.find((account) => account.id === accountId);
  return match ? match.label : "Unknown account";
};

const renderTransactions = (transactions) => {
  if (!transactionList || !countChip || !transactionTemplate) {
    return;
  }
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
      meta.textContent = `${formatDate(transaction.date)} · ${accountLabel(transaction.account)} · ${
        transaction.note || "No note"
      }`;
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
  renderSankey(transactions);
  renderAccountBalances(transactions);
  renderHoldingsSummary();
};

const addTransaction = (formData) => {
  const amountValue = Number(formData.get("amount"));
  const category = formData.get("category").trim();
  const date = formData.get("date");
  const note = formData.get("note").trim();
  const account = formData.get("account");

  if (!amountValue || amountValue <= 0) {
    return;
  }

  if (!categories.includes(category)) {
    categories.push(category);
    saveCategories(categories);
    populateCategoryDatalist();
    renderCategoryList();
  }

  const transactions = getTransactions();
  transactions.push({
    id: crypto.randomUUID(),
    type: formData.get("type"),
    amount: amountValue,
    category,
    date,
    note,
    account,
  });

  saveTransactions(transactions);
  render(transactions);
};

const setTodayDate = () => {
  const dateInput = document.getElementById("date");
  const today = new Date().toISOString().split("T")[0];
  if (dateInput) {
    dateInput.value = today;
  }
  if (receiptDateInput) {
    receiptDateInput.value = today;
  }
};

const populateAccountSelects = () => {
  [accountSelect, csvAccountSelect, receiptAccountSelect].forEach((select) => {
    if (!select) {
      return;
    }
    select.innerHTML = "";
    accounts.forEach((account) => {
      const option = document.createElement("option");
      option.value = account.id;
      option.textContent = account.label;
      select.appendChild(option);
    });
    if (accounts[0]) {
      select.value = accounts[0].id;
    }
  });
};

const populateCategoryDatalist = () => {
  if (!categoryList) {
    return;
  }
  categoryList.innerHTML = "";
  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    categoryList.appendChild(option);
  });
  if (receiptCategoryInput) {
    receiptCategoryInput.setAttribute("list", "categoryList");
  }
};

const renderAccountList = () => {
  if (!accountList) {
    return;
  }
  accountList.innerHTML = "";
  accounts.forEach((account) => {
    const row = document.createElement("div");
    row.className = "manage-item";
    const input = document.createElement("input");
    input.type = "text";
    input.value = account.label;
    const saveButton = document.createElement("button");
    saveButton.type = "button";
    saveButton.className = "primary";
    saveButton.textContent = "Save";
    saveButton.addEventListener("click", () => {
      const nextLabel = input.value.trim();
      if (!nextLabel) {
        return;
      }
      accounts = accounts.map((item) =>
        item.id === account.id ? { ...item, label: nextLabel } : item
      );
      saveAccounts(accounts);
      populateAccountSelects();
      renderAccountList();
      render(getTransactions());
    });
    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.className = "ghost";
    removeButton.textContent = "Remove";
    removeButton.addEventListener("click", () => {
      if (accounts.length === 1) {
        return;
      }
      const confirmed = window.confirm(`Remove ${account.label}? Existing entries will keep the label.`);
      if (!confirmed) {
        return;
      }
      accounts = accounts.filter((item) => item.id !== account.id);
      saveAccounts(accounts);
      populateAccountSelects();
      renderAccountList();
      render(getTransactions());
    });
    row.append(input, saveButton, removeButton);
    accountList.appendChild(row);
  });
};

const renderCategoryList = () => {
  if (!categoryListPanel) {
    return;
  }
  categoryListPanel.innerHTML = "";
  categories.forEach((category) => {
    const row = document.createElement("div");
    row.className = "manage-item";
    const input = document.createElement("input");
    input.type = "text";
    input.value = category;
    const saveButton = document.createElement("button");
    saveButton.type = "button";
    saveButton.className = "primary";
    saveButton.textContent = "Save";
    saveButton.addEventListener("click", () => {
      const nextValue = input.value.trim();
      if (!nextValue) {
        return;
      }
      if (categories.includes(nextValue) && nextValue !== category) {
        return;
      }
      categories = categories.map((item) => (item === category ? nextValue : item));
      saveCategories(categories);
      populateCategoryDatalist();
      renderCategoryList();
      const transactions = getTransactions();
      const updated = transactions.map((transaction) => ({
        ...transaction,
        category: transaction.category === category ? nextValue : transaction.category,
      }));
      saveTransactions(updated);
      render(updated);
    });
    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.className = "ghost";
    removeButton.textContent = "Remove";
    removeButton.addEventListener("click", () => {
      const confirmed = window.confirm(`Remove ${category}? Existing entries will keep the name.`);
      if (!confirmed) {
        return;
      }
      categories = categories.filter((item) => item !== category);
      if (!categories.length) {
        categories = [...defaultCategories];
      }
      saveCategories(categories);
      populateCategoryDatalist();
      renderCategoryList();
    });
    row.append(input, saveButton, removeButton);
    categoryListPanel.appendChild(row);
  });
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

const normalizeAmount = (raw) => {
  if (!raw) {
    return 0;
  }
  const cleaned = raw.replace(/\s/g, "").replace(",", ".");
  return Number(cleaned);
};

const parseSwissDate = (raw) => {
  const [day, month, year] = raw.split(".");
  if (!day || !month || !year) {
    return new Date().toISOString().split("T")[0];
  }
  const fullYear = year.length === 2 ? `20${year}` : year;
  return `${fullYear}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
};

const parseSlashDate = (raw) => {
  const cleaned = raw.replace(/\uFEFF/g, "").trim();
  const [day, month, year] = cleaned.split("/");
  if (!day || !month || !year) {
    return new Date().toISOString().split("T")[0];
  }
  return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
};

const guessCategory = (text, amount) => {
  const upper = text.toUpperCase();
  if (amount > 0 && (upper.includes("GEHALT") || upper.includes("SALARY"))) {
    return "Salary";
  }
  if (upper.includes("TWINT")) {
    return "TWINT";
  }
  if (upper.includes("CARD") || upper.includes("KARTE")) {
    return "Card Payment";
  }
  if (upper.includes("MIETE") || upper.includes("RENT")) {
    return "Rent";
  }
  return amount > 0 ? "Income" : "Expense";
};

const parseMigrosCsv = (text, accountId) => {
  const lines = text.split(/\r?\n/).map((line) => line.trim());
  const headerIndex = lines.findIndex((line) => line.startsWith("Datum;"));
  if (headerIndex === -1) {
    return [];
  }
  const dataLines = lines.slice(headerIndex + 1).filter(Boolean);
  return dataLines.map((line) => {
    const [date, bookingText, amountRaw] = line.split(";");
    const amount = normalizeAmount(amountRaw);
    const type = amount < 0 ? "expense" : "income";
    const category = guessCategory(bookingText, amount);
    if (!categories.includes(category)) {
      categories.push(category);
    }
    return {
      id: crypto.randomUUID(),
      type,
      amount: Math.abs(amount),
      category,
      date: parseSwissDate(date),
      note: bookingText,
      account: accountId,
    };
  });
};

const extractHoldingName = (activityName, fallback) => {
  if (!activityName) {
    return fallback || "";
  }
  const cleaned = activityName.replace(/\"/g, "").trim();
  const parts = cleaned.split("x ");
  if (parts.length > 1) {
    return parts[1].trim();
  }
  return cleaned;
};

const updateHoldingsFromYuh = ({
  asset,
  quantityRaw,
  pricePerUnitRaw,
  feeRaw,
  buySell,
  activityName,
  debitRaw,
  currency,
}) => {
  if (!asset || asset === "SWQ") {
    return false;
  }
  const quantity = Number(quantityRaw);
  const pricePerUnit = Number(pricePerUnitRaw);
  const feeAmount = normalizeAmount(feeRaw || "");
  if (!quantity || !pricePerUnit) {
    return false;
  }
  const isSell = buySell && buySell.toUpperCase() === "SELL";
  const debitAmount = Math.abs(normalizeAmount(debitRaw || ""));
  const totalCost = debitAmount || pricePerUnit * quantity + feeAmount;
  const existing = holdings.find((holding) => holding.symbol === asset);
  if (!existing && isSell) {
    return false;
  }
  if (!existing) {
    holdings = [
      ...holdings,
      {
        id: crypto.randomUUID(),
        symbol: asset,
        name: extractHoldingName(activityName, asset),
        quantity,
        costPerUnit: totalCost / quantity,
        currentPrice: pricePerUnit,
        lastPricePerUnit: pricePerUnit,
        currency: currency || "CHF",
      },
    ];
    return true;
  }

  if (isSell) {
    const nextQuantity = Math.max(existing.quantity - quantity, 0);
    if (!nextQuantity) {
      holdings = holdings.filter((holding) => holding.symbol !== asset);
    } else {
      holdings = holdings.map((holding) =>
        holding.symbol === asset
          ? {
              ...holding,
              quantity: nextQuantity,
              lastPricePerUnit: pricePerUnit,
            }
          : holding
      );
    }
    return true;
  }

  const existingCostBasis = existing.quantity * existing.costPerUnit;
  const newCostBasis = totalCost;
  const combinedQuantity = existing.quantity + quantity;
  const nextCostPerUnit = combinedQuantity ? (existingCostBasis + newCostBasis) / combinedQuantity : 0;
  holdings = holdings.map((holding) =>
    holding.symbol === asset
      ? {
          ...holding,
          name: existing.name || extractHoldingName(activityName, asset),
          quantity: combinedQuantity,
          costPerUnit: nextCostPerUnit,
          currentPrice: holding.currentPrice || pricePerUnit,
          lastPricePerUnit: pricePerUnit,
          currency: holding.currency || currency || "CHF",
        }
      : holding
  );
  return true;
};

const addInvestmentLot = ({
  date,
  activityType,
  activityName,
  buySell,
  quantity,
  pricePerUnit,
  feeAmount,
  debitAmount,
  currency,
  asset,
}) => {
  investments.push({
    id: crypto.randomUUID(),
    date,
    activityType,
    activityName,
    buySell,
    quantity,
    pricePerUnit,
    feeAmount,
    debitAmount,
    currency,
    asset,
  });
};

const parseYuhCsv = (text, accountId) => {
  const normalized = text.replace(/\uFEFF/g, "");
  const lines = normalized.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
  const headerIndex = lines.findIndex((line) => line.startsWith("DATE;ACTIVITY TYPE;"));
  if (headerIndex === -1) {
    return { transactions: [], holdingsChanged: false };
  }
  const dataLines = lines.slice(headerIndex + 1);
  const rows = dataLines.map((line) => line.split(";"));
  const transactions = [];
  let holdingsChanged = false;

  rows.forEach((columns) => {
    const date = (columns[0] || "").trim();
    const activityType = (columns[1] || "").trim();
    const activityName = (columns[2] || "").trim();
    const debit = columns[3];
    const debitCurrency = columns[4];
    const credit = columns[5];
    const creditCurrency = columns[6];
    const recipient = columns[9];
    const sender = columns[10];
    const feeRaw = columns[11];
    const buySell = columns[12];
    const quantityRaw = columns[13];
    const asset = columns[14];
    const pricePerUnit = columns[15];

    if (!activityType) {
      return;
    }

    if (activityType === "REWARD_RECEIVED") {
      return;
    }

    if (activityType === "INVEST_RECURRING_ORDER_REJECTED") {
      return;
    }

    if (activityName && activityName.toLowerCase().includes("declined")) {
      return;
    }

    const debitAmount = normalizeAmount(debit || "");
    const creditAmount = normalizeAmount(credit || "");
    const isDebit = debitAmount < 0 || debitAmount > 0;
    let amount = isDebit ? Math.abs(debitAmount) : Math.abs(creditAmount);
    if (!amount) {
      const hasInvestmentActivity =
        activityType === "INVEST_RECURRING_ORDER_EXECUTED" || activityType === "INVEST_ORDER_EXECUTED";
      if (hasInvestmentActivity) {
        const fallbackAmount =
          Math.abs(normalizeAmount(debit || "")) ||
          Math.abs(Number(quantityRaw) * Number(pricePerUnit) + normalizeAmount(feeRaw || ""));
        amount = fallbackAmount;
      }
      if (!amount) {
        return;
      }
    }
    const currency = isDebit ? debitCurrency : creditCurrency;
    const description = activityName?.replace(/\"/g, "").trim() || activityType;

    let type = isDebit ? "expense" : "income";
    let category = "Misc";

    if (activityType === "CARD_TRANSACTION_OUT") {
      type = "expense";
      category = "Card Payment";
    } else if (activityType === "PAYMENT_TRANSACTION_IN") {
      type = "income";
      category = "Transfer In";
    } else if (activityType === "GOAL_AUTO_DEPOSIT") {
      type = "expense";
      category = "Savings";
    } else if (
      activityType === "INVEST_RECURRING_ORDER_EXECUTED" ||
      activityType === "INVEST_ORDER_EXECUTED"
    ) {
      type = "expense";
      category = "Investments";
      const quantityValue = Number(quantityRaw);
      const priceValue = Number(pricePerUnit);
      const feeAmount = normalizeAmount(feeRaw || "");
      if (quantityValue && priceValue) {
        addInvestmentLot({
          date: parseSlashDate(date),
          activityType,
          activityName: description,
          buySell,
          quantity: quantityValue,
          pricePerUnit: priceValue,
          feeAmount,
          debitAmount: Math.abs(debitAmount),
          currency: debitCurrency || creditCurrency || "CHF",
          asset,
        });
      }
      const updated = updateHoldingsFromYuh({
        asset,
        quantityRaw,
        pricePerUnitRaw: pricePerUnit,
        feeRaw,
        buySell,
        activityName: description,
        debitRaw: debit,
        currency: debitCurrency || creditCurrency,
      });
      holdingsChanged = holdingsChanged || updated;
    } else if (activityType === "BANK_AUTO_ORDER_EXECUTED") {
      type = isDebit ? "expense" : "income";
      category = "FX Exchange";
    }

    if (!categories.includes(category)) {
      categories.push(category);
    }

    const noteParts = [description];
    if (recipient) {
      noteParts.push(`Recipient: ${recipient.replace(/\"/g, "").trim()}`);
    }
    if (sender) {
      noteParts.push(`Sender: ${sender.replace(/\"/g, "").trim()}`);
    }
    if (currency && currency !== "CHF") {
      noteParts.push(`Currency: ${currency}`);
    }
    if (asset && asset === "SWQ") {
      return;
    }

    transactions.push({
      id: crypto.randomUUID(),
      type,
      amount,
      category,
      date: parseSlashDate(date),
      note: noteParts.filter(Boolean).join(" · "),
      account: accountId,
    });
  });

  return { transactions, holdingsChanged };
};

const importCsv = async () => {
  if (!csvFileInput || !csvAccountSelect || !csvStatus) {
    return;
  }
  const file = csvFileInput.files[0];
  if (!file) {
    csvStatus.textContent = "Choose a CSV file to import.";
    return;
  }
  const text = await file.text();
  const trimmed = text.trimStart().replace(/^\uFEFF/, "");
  const yuhResult = trimmed.startsWith("DATE;ACTIVITY TYPE;")
    ? parseYuhCsv(text, csvAccountSelect.value)
    : { transactions: parseMigrosCsv(text, csvAccountSelect.value), holdingsChanged: false };
  const imported = yuhResult.transactions;
  if (!imported.length) {
    csvStatus.textContent = "No transactions found. Check the CSV format.";
    return;
  }
  const transactions = getTransactions();
  const merged = transactions.concat(imported);
  saveTransactions(merged);
  saveCategories(categories);
  if (yuhResult.holdingsChanged) {
    saveHoldings(holdings);
    renderHoldings();
  }
  if (trimmed.startsWith("DATE;ACTIVITY TYPE;")) {
    saveInvestments(investments);
    renderInvestmentLots();
  }
  populateCategoryDatalist();
  renderCategoryList();
  render(merged);
  csvStatus.textContent = `Imported ${imported.length} transactions.`;
  csvFileInput.value = "";
};

const rebuildHoldingsFromCsv = async () => {
  if (!csvFileInput || !rebuildStatus) {
    return;
  }
  const file = csvFileInput.files[0];
  if (!file) {
    rebuildStatus.textContent = "Choose a Yuh CSV file first.";
    return;
  }
  const text = await file.text();
  const trimmed = text.trimStart().replace(/^\uFEFF/, "");
  if (!trimmed.startsWith("DATE;ACTIVITY TYPE;")) {
    rebuildStatus.textContent = "This is not a Yuh CSV file.";
    return;
  }

  const previousHoldings = holdings;
  const previousInvestments = investments;
  holdings = [];
  investments = [];
  const result = parseYuhCsv(text, csvAccountSelect?.value || "");
  if (!result.holdingsChanged) {
    holdings = previousHoldings;
    investments = previousInvestments;
    rebuildStatus.textContent = "No holdings found in this CSV.";
    return;
  }
  saveHoldings(holdings);
  saveInvestments(investments);
  renderHoldings();
  renderHoldingsSummary();
  renderInvestmentLots();
  rebuildStatus.textContent = `Holdings rebuilt from ${file.name}. ${investments.length} lots added.`;
};

const setupReceiptScanner = () => {
  if (!receiptFileInput || !receiptVendorInput || !receiptCategoryInput || !createReceiptButton) {
    return;
  }
  receiptFileInput.addEventListener("change", () => {
    const file = receiptFileInput.files[0];
    if (!file) {
      return;
    }
    const baseName = file.name.replace(/\.[^/.]+$/, "");
    receiptVendorInput.value = baseName.replace(/[_-]+/g, " ").trim();
    receiptCategoryInput.value = "Receipts";
    if (receiptStatus) {
      receiptStatus.textContent = "Drafted from filename. Run local analysis for more detail.";
    }
  });

  createReceiptButton.addEventListener("click", () => {
    const amount = Number(receiptAmountInput.value);
    if (!amount || amount <= 0) {
      return;
    }
    const transactions = getTransactions();
    transactions.push({
      id: crypto.randomUUID(),
      type: "expense",
      amount,
      category: receiptCategoryInput.value.trim() || "Receipts",
      date: receiptDateInput.value || new Date().toISOString().split("T")[0],
      note: receiptVendorInput.value.trim() || "Receipt scan",
      account: receiptAccountSelect.value,
    });
    saveTransactions(transactions);
    render(transactions);
    receiptVendorInput.value = "";
    receiptAmountInput.value = "";
    receiptCategoryInput.value = "";
    receiptFileInput.value = "";
    if (receiptStatus) {
      receiptStatus.textContent = "Receipt added as expense.";
    }
  });
};

const renderAccountBalances = (transactions) => {
  if (!accountBalances) {
    return;
  }
  const totals = new Map();
  accounts.forEach((account) => {
    totals.set(account.id, 0);
  });
  transactions.forEach((transaction) => {
    const delta = transaction.type === "income" ? transaction.amount : -transaction.amount;
    totals.set(transaction.account, (totals.get(transaction.account) || 0) + delta);
  });
  accountBalances.innerHTML = "";
  accounts.forEach((account) => {
    const card = document.createElement("div");
    card.className = "account-card";
    const label = document.createElement("p");
    label.textContent = account.label;
    const amount = document.createElement("h4");
    amount.textContent = formatCurrency(totals.get(account.id) || 0);
    card.append(label, amount);
    accountBalances.appendChild(card);
  });
};

const renderHoldings = () => {
  if (!holdingList) {
    return;
  }
  holdingList.innerHTML = "";
  holdings.forEach((holding) => {
    const row = document.createElement("div");
    row.className = "manage-item";
    const symbolInput = document.createElement("input");
    symbolInput.type = "text";
    symbolInput.value = holding.symbol;
    const nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.value = holding.name || "";
    const qtyInput = document.createElement("input");
    qtyInput.type = "number";
    qtyInput.step = "0.0001";
    qtyInput.min = "0";
    qtyInput.value = holding.quantity;
    const costInput = document.createElement("input");
    costInput.type = "number";
    costInput.step = "0.01";
    costInput.min = "0";
    costInput.value = holding.costPerUnit;
    const priceInput = document.createElement("input");
    priceInput.type = "number";
    priceInput.step = "0.01";
    priceInput.min = "0";
    priceInput.value = holding.currentPrice;
    const saveButton = document.createElement("button");
    saveButton.type = "button";
    saveButton.className = "primary";
    saveButton.textContent = "Save";
    saveButton.addEventListener("click", () => {
      const nextSymbol = symbolInput.value.trim();
      if (!nextSymbol) {
        return;
      }
      holdings = holdings.map((item) =>
        item.id === holding.id
          ? {
              ...item,
              symbol: nextSymbol,
              name: nameInput.value.trim(),
              quantity: Number(qtyInput.value) || 0,
              costPerUnit: Number(costInput.value) || 0,
              currentPrice: Number(priceInput.value) || 0,
              lastPricePerUnit: item.lastPricePerUnit || Number(priceInput.value) || 0,
            }
          : item
      );
      saveHoldings(holdings);
      renderHoldings();
      renderHoldingsSummary();
    });
    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.className = "ghost";
    removeButton.textContent = "Remove";
    removeButton.addEventListener("click", () => {
      holdings = holdings.filter((item) => item.id !== holding.id);
      saveHoldings(holdings);
      renderHoldings();
      renderHoldingsSummary();
    });
    row.append(symbolInput, nameInput, qtyInput, costInput, priceInput, saveButton, removeButton);
    holdingList.appendChild(row);
  });
};

const renderHoldingsSummary = () => {
  if (!investCost || !investValue || !investPnl || !holdingTable || !holdingEmpty) {
    return;
  }
  const totalCost = holdings.reduce(
    (sum, holding) => sum + holding.quantity * holding.costPerUnit,
    0
  );
  const totalValue = holdings.reduce((sum, holding) => {
    const price = holding.currentPrice || holding.lastPricePerUnit || holding.costPerUnit || 0;
    return sum + holding.quantity * price;
  }, 0);
  const pnl = totalValue - totalCost;

  investCost.textContent = formatCurrency(totalCost);
  investValue.textContent = formatCurrency(totalValue);
  investPnl.textContent = formatCurrency(pnl);
  investPnl.className = pnl >= 0 ? "value-positive" : "value-negative";

  holdingTable.innerHTML = "";
  if (!holdings.length) {
    holdingEmpty.style.display = "block";
    return;
  }
  holdingEmpty.style.display = "none";
  holdings.forEach((holding) => {
    const row = document.createElement("div");
    row.className = "holding-row";
    const marketPrice = holding.currentPrice || holding.lastPricePerUnit || holding.costPerUnit || 0;
    const title = document.createElement("div");
    const name = holding.name ? `${holding.symbol} · ${holding.name}` : holding.symbol;
    const currency = holding.currency ? ` · ${holding.currency}` : "";
    title.innerHTML = `<strong>${name}</strong><br /><span>${holding.quantity} units${currency}</span>`;
    const cost = document.createElement("div");
    cost.innerHTML = `<strong>${formatCurrency(
      holding.quantity * holding.costPerUnit
    )}</strong><br /><span>Cost basis</span>`;
    const value = document.createElement("div");
    value.innerHTML = `<strong>${formatCurrency(
      holding.quantity * marketPrice
    )}</strong><br /><span>Market value</span>`;
    const pnlValue = holding.quantity * (marketPrice - holding.costPerUnit);
    const pnlCell = document.createElement("div");
    pnlCell.innerHTML = `<strong class=\"${
      pnlValue >= 0 ? "value-positive" : "value-negative"
    }\">${formatCurrency(pnlValue)}</strong><br /><span>P/L</span>`;
    row.append(title, cost, value, pnlCell);
    holdingTable.appendChild(row);
  });
};

const renderInvestmentLots = () => {
  if (!investmentLots || !investmentLotsEmpty) {
    return;
  }
  investmentLots.innerHTML = "";
  if (!investments.length) {
    investmentLotsEmpty.style.display = "block";
    return;
  }
  investmentLotsEmpty.style.display = "none";
  investments
    .slice()
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .forEach((lot) => {
      const row = document.createElement("div");
      row.className = "investment-lot";
      const title = document.createElement("div");
      title.innerHTML = `<strong>${lot.asset}</strong><br /><span>${lot.activityName}</span>`;
      const date = document.createElement("div");
      date.innerHTML = `<strong>${formatDate(lot.date)}</strong><br /><span>Date</span>`;
      const qty = document.createElement("div");
      qty.innerHTML = `<strong>${lot.quantity}</strong><br /><span>Quantity</span>`;
      const price = document.createElement("div");
      price.innerHTML = `<strong>${formatCurrency(lot.pricePerUnit)}</strong><br /><span>Unit price</span>`;
      const total = document.createElement("div");
      const totalCost = lot.quantity * lot.pricePerUnit + (lot.feeAmount || 0);
      const direction = lot.buySell ? lot.buySell.toUpperCase() : "BUY";
      total.innerHTML = `<strong>${formatCurrency(totalCost)}</strong><br /><span>${direction}</span>`;
      row.append(title, date, qty, price, total);
      investmentLots.appendChild(row);
    });
};

const fetchPriceForSymbol = async (symbol) => {
  const response = await fetch(`${PRICE_PROXY_URL}?symbol=${encodeURIComponent(symbol)}`);
  if (!response.ok) {
    throw new Error("Price fetch failed");
  }
  const payload = await response.json();
  if (!payload || typeof payload.price !== "number") {
    throw new Error("Invalid price response");
  }
  return payload.price;
};

const refreshHoldingPrices = async () => {
  if (!updatePricesButton || !priceStatus) {
    return;
  }
  if (!holdings.length) {
    priceStatus.textContent = "No holdings to update.";
    return;
  }
  priceStatus.textContent = "Updating prices...";
  let updatedCount = 0;
  let failedCount = 0;
  const nextHoldings = [];

  for (const holding of holdings) {
    try {
      const price = await fetchPriceForSymbol(holding.symbol);
      updatedCount += 1;
      nextHoldings.push({
        ...holding,
        currentPrice: price,
        lastPricePerUnit: holding.lastPricePerUnit || price,
      });
    } catch (error) {
      failedCount += 1;
      nextHoldings.push({
        ...holding,
        currentPrice: holding.currentPrice || holding.lastPricePerUnit || holding.costPerUnit,
      });
    }
  }

  holdings = nextHoldings;
  saveHoldings(holdings);
  renderHoldings();
  renderHoldingsSummary();
  if (!updatedCount) {
    priceStatus.textContent = "No prices updated. Is the local proxy running?";
    return;
  }
  priceStatus.textContent = `Updated ${updatedCount} of ${holdings.length} holdings.${
    failedCount ? ` (${failedCount} failed)` : ""
  }`;
};

const analyzeReceiptLocal = async () => {
  if (!useLocalAiToggle || !receiptStatus) {
    return;
  }
  if (!useLocalAiToggle.checked) {
    receiptStatus.textContent = "Enable the local AI toggle to run analysis.";
    return;
  }
  if (!receiptFileInput || !receiptVendorInput || !receiptCategoryInput) {
    return;
  }
  const file = receiptFileInput.files[0];
  if (!file) {
    receiptStatus.textContent = "Add a receipt image first.";
    return;
  }

  receiptStatus.textContent = "Analyzing locally...";

  const baseName = file.name.replace(/\.[^/.]+$/, "");
  const vendor = baseName.replace(/[_-]+/g, " ").trim();
  receiptVendorInput.value = vendor || receiptVendorInput.value;
  if (!receiptCategoryInput.value) {
    receiptCategoryInput.value = guessCategory(vendor, -1);
  }
  receiptStatus.textContent =
    "Local analysis complete (heuristic). Connect a local model to replace this step.";
};

const renderSankey = (transactions) => {
  if (!sankeyChart || !sankeyEmpty) {
    return;
  }
  const expenses = transactions.filter((transaction) => transaction.type === "expense");
  if (!expenses.length) {
    sankeyChart.innerHTML = "";
    sankeyEmpty.style.display = "block";
    return;
  }

  sankeyEmpty.style.display = "none";
  const totals = new Map();
  const targets = new Map();
  const links = new Map();

  expenses.forEach((transaction) => {
    const source = accountLabel(transaction.account);
    const target = transaction.category;
    const key = `${source}__${target}`;
    totals.set(source, (totals.get(source) || 0) + transaction.amount);
    targets.set(target, (targets.get(target) || 0) + transaction.amount);
    links.set(key, (links.get(key) || 0) + transaction.amount);
  });

  const sources = Array.from(totals.entries());
  const targetEntries = Array.from(targets.entries());
  const totalValue = expenses.reduce((sum, tx) => sum + tx.amount, 0) || 1;

  const width = sankeyChart.clientWidth || 800;
  const nodeWidth = 16;
  const nodeGap = 12;
  const height =
    Math.max(sources.length, targetEntries.length) * 48 + 80;

  const yScale = (entries) => {
    const available = height - (entries.length + 1) * nodeGap;
    let offset = nodeGap;
    return entries.map(([label, value]) => {
      const nodeHeight = Math.max(18, (value / totalValue) * available);
      const node = { label, value, y: offset, height: nodeHeight };
      offset += nodeHeight + nodeGap;
      return node;
    });
  };

  const sourceNodes = yScale(sources);
  const targetNodes = yScale(targetEntries);

  const accountColors = ["#cf5c36", "#b04c2d", "#2d6a4f", "#4d908e", "#8b5e34"];
  const sourceColor = new Map();
  sourceNodes.forEach((node, index) => {
    sourceColor.set(node.label, accountColors[index % accountColors.length]);
  });

  sankeyChart.setAttribute("viewBox", `0 0 ${width} ${height}`);
  sankeyChart.innerHTML = "";

  const createSvgElement = (tag) => document.createElementNS("http://www.w3.org/2000/svg", tag);

  links.forEach((value, key) => {
    const [sourceLabel, targetLabel] = key.split("__");
    const sourceNode = sourceNodes.find((node) => node.label === sourceLabel);
    const targetNode = targetNodes.find((node) => node.label === targetLabel);
    if (!sourceNode || !targetNode) {
      return;
    }

    const sourceYOffset = sourceNode.y + sourceNode.height / 2;
    const targetYOffset = targetNode.y + targetNode.height / 2;
    const thickness = Math.max(6, (value / totalValue) * (height * 0.6));
    const startX = 120;
    const endX = width - 120;

    const path = createSvgElement("path");
    const curve = 0.3 * (endX - startX);
    path.setAttribute(
      "d",
      `M ${startX} ${sourceYOffset} C ${startX + curve} ${sourceYOffset}, ${endX - curve} ${targetYOffset}, ${endX} ${targetYOffset}`
    );
    path.setAttribute("stroke", sourceColor.get(sourceLabel));
    path.setAttribute("stroke-width", thickness);
    path.setAttribute("class", "sankey-link");
    sankeyChart.appendChild(path);
  });

  sourceNodes.forEach((node) => {
    const rect = createSvgElement("rect");
    rect.setAttribute("x", "96");
    rect.setAttribute("y", node.y);
    rect.setAttribute("width", nodeWidth);
    rect.setAttribute("height", node.height);
    rect.setAttribute("fill", sourceColor.get(node.label));
    sankeyChart.appendChild(rect);

    const label = createSvgElement("text");
    label.setAttribute("x", "88");
    label.setAttribute("y", node.y + node.height / 2 + 4);
    label.setAttribute("text-anchor", "end");
    label.setAttribute("class", "sankey-label");
    label.textContent = node.label;
    sankeyChart.appendChild(label);
  });

  targetNodes.forEach((node) => {
    const rect = createSvgElement("rect");
    rect.setAttribute("x", width - 112);
    rect.setAttribute("y", node.y);
    rect.setAttribute("width", nodeWidth);
    rect.setAttribute("height", node.height);
    rect.setAttribute("class", "sankey-node");
    sankeyChart.appendChild(rect);

    const label = createSvgElement("text");
    label.setAttribute("x", width - 120);
    label.setAttribute("y", node.y + node.height / 2 + 4);
    label.setAttribute("text-anchor", "end");
    label.setAttribute("class", "sankey-label");
    label.textContent = node.label;
    sankeyChart.appendChild(label);
  });
};

if (importCsvButton && csvFileInput) {
  importCsvButton.addEventListener("click", () => {
    importCsv();
  });

  csvFileInput.addEventListener("change", () => {
    if (!csvFileInput.files[0]) {
      if (csvStatus) {
        csvStatus.textContent = "Waiting for a CSV file.";
      }
      return;
    }
    if (csvStatus) {
      csvStatus.textContent = `Ready to import ${csvFileInput.files[0].name}.`;
    }
  });
}

if (rebuildHoldingsButton) {
  rebuildHoldingsButton.addEventListener("click", () => {
    rebuildHoldingsFromCsv();
  });
}

if (transactionForm && typeControl && typeInput) {
  setupTypeControl();
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
}

if (clearAllButton) {
  clearAllButton.addEventListener("click", () => {
    localStorage.removeItem(STORAGE_KEY);
    render([]);
  });
}

populateAccountSelects();
populateCategoryDatalist();
setTodayDate();
setupReceiptScanner();
renderAccountList();
renderCategoryList();
renderHoldings();
renderInvestmentLots();
render(getTransactions());

if (addAccountButton && newAccountNameInput) {
  addAccountButton.addEventListener("click", () => {
    const label = newAccountNameInput.value.trim();
    if (!label) {
      return;
    }
    accounts = [...accounts, { id: crypto.randomUUID(), label }];
    saveAccounts(accounts);
    newAccountNameInput.value = "";
    populateAccountSelects();
    renderAccountList();
    renderAccountBalances(getTransactions());
  });
}

if (addCategoryButton && newCategoryNameInput) {
  addCategoryButton.addEventListener("click", () => {
    const category = newCategoryNameInput.value.trim();
    if (!category) {
      return;
    }
    if (!categories.includes(category)) {
      categories = [...categories, category];
      saveCategories(categories);
      populateCategoryDatalist();
      renderCategoryList();
    }
    newCategoryNameInput.value = "";
  });
}

if (analyzeReceiptButton) {
  analyzeReceiptButton.addEventListener("click", () => {
    analyzeReceiptLocal();
  });
}

if (addHoldingButton) {
  addHoldingButton.addEventListener("click", () => {
    const symbol = holdingSymbolInput.value.trim();
    const quantity = Number(holdingQuantityInput.value) || 0;
    const costPerUnit = Number(holdingCostInput.value) || 0;
    const currentPrice = Number(holdingPriceInput.value) || 0;
    if (!symbol || !quantity) {
      return;
    }
    holdings = [
      ...holdings,
      {
        id: crypto.randomUUID(),
        symbol,
        name: holdingNameInput.value.trim(),
        quantity,
        costPerUnit,
        currentPrice,
        lastPricePerUnit: currentPrice || costPerUnit,
        currency: "CHF",
      },
    ];
    saveHoldings(holdings);
    holdingSymbolInput.value = "";
    holdingNameInput.value = "";
    holdingQuantityInput.value = "";
    holdingCostInput.value = "";
    holdingPriceInput.value = "";
    renderHoldings();
    renderHoldingsSummary();
  });
}

if (updatePricesButton) {
  updatePricesButton.addEventListener("click", () => {
    refreshHoldingPrices();
  });
}

if (clearTransactionsButton) {
  clearTransactionsButton.addEventListener("click", () => {
    const confirmed = window.confirm("Remove all transactions? This cannot be undone.");
    if (!confirmed) {
      return;
    }
    localStorage.removeItem(STORAGE_KEY);
    if (clearTransactionsStatus) {
      clearTransactionsStatus.textContent = "All transactions removed.";
    }
    render([]);
  });
}
