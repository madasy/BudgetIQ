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

const STORAGE_KEY = "budgetiq-transactions";
const STORAGE_ACCOUNTS = "budgetiq-accounts";
const STORAGE_CATEGORIES = "budgetiq-categories";

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
  "TWINT",
  "Card Payment",
  "Receipts",
  "Income",
  "Expense",
];

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

let accounts = getAccounts();
let categories = getCategories();

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
    const label = document.createElement("span");
    label.textContent = account.label;
    const button = document.createElement("button");
    button.type = "button";
    button.className = "ghost";
    button.textContent = "Remove";
    button.addEventListener("click", () => {
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
    row.append(label, button);
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
    const label = document.createElement("span");
    label.textContent = category;
    const button = document.createElement("button");
    button.type = "button";
    button.className = "ghost";
    button.textContent = "Remove";
    button.addEventListener("click", () => {
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
    row.append(label, button);
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
  const imported = parseMigrosCsv(text, csvAccountSelect.value);
  if (!imported.length) {
    csvStatus.textContent = "No transactions found. Check the CSV format.";
    return;
  }
  const transactions = getTransactions();
  const merged = transactions.concat(imported);
  saveTransactions(merged);
  saveCategories(categories);
  populateCategoryDatalist();
  renderCategoryList();
  render(merged);
  csvStatus.textContent = `Imported ${imported.length} transactions.`;
  csvFileInput.value = "";
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
