const storageKey = 'savedAccount';
let state = Object.freeze({
  account: null
});
const routes = {
    '/login': { 
      templateId: 'login', 
      title: 'Login - Bank App' 
    },
    '/dashboard': { 
      templateId: 'dashboard', 
      title: 'Dashboard - Bank App',
      init: refresh
    },
    '/credits': { 
      templateId: 'credits', 
      title: 'Credits - Bank App' 
    },
}; 

function navigate(path) {
    window.history.pushState({}, path, path);
    updateRoute();
}

function updateRoute() {
  const path = window.location.pathname;
  const route = routes[path];

  if (!route) {
    return navigate('/dashboard');
  }

  const template = document.getElementById(route.templateId);
  const view = template ? template.content.cloneNode(true) : null;
  const app = document.getElementById('app');
  
  if (app && view) {
    app.innerHTML = '';
    app.appendChild(view);
    document.title = route.title;
  }

  if (typeof route.init === 'function') {
    route.init();
  }
}

function onLinkClick(event) {
    event.preventDefault();
    navigate(event.target.href);
}

window.onpopstate = () => updateRoute();
updateRoute();

async function register() {
  const registerForm = document.getElementById('registerForm');
  const formData = new FormData(registerForm);
  const jsonData = JSON.stringify(Object.fromEntries(formData));
  const result = await createAccount(jsonData);

  if (result.error) {
    return updateElement('registerError', result.error);
  }

  updateState('account', result);  // ✅ Update state properly
  navigate('/dashboard');
}

async function createAccount(account) {
    try {
      const response = await fetch('//localhost:5000/api/accounts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: account
      });
      return await response.json();
    } catch (error) {
      return { error: error.message || 'Unknown error' };
    }
}

function updateElement(id, textOrNode) {
  const element = document.getElementById(id);
  if (!element) {
    console.warn(`Element with id '${id}' not found.`);
    return;
  }
  element.textContent = ''; 
  element.append(textOrNode); 
}



async function login() {
  const loginForm = document.getElementById('loginForm');
  const user = loginForm.user.value;
  const data = await getAccount(user);

  if (data.error) {
      return updateElement('loginError', data.error);
  }

  updateState('account', data);  // ✅ Update state properly
  navigate('/dashboard');
}


async function getAccount(user) {
    try {
      const response = await fetch('//localhost:5000/api/accounts/' + encodeURIComponent(user));
      return await response.json();
    } catch (error) {
      return { error: error.message || 'Unknown error' };
    }
}
// Define updateDashboard FIRST
function updateDashboard() {
  if (!state.account) return navigate('/login');

  updateElement('description', state.account.description);
  updateElement('balance', state.account.balance.toFixed(2));
  updateElement('currency', state.account.currency);

  if (!state.account.transactions || state.account.transactions.length === 0) {
    console.warn("No transactions found!");
    return;
  }

  const transactionsTable = document.getElementById('transactions');
  if (!transactionsTable) {
    console.error("Transactions table not found!");
    return;
  }

  transactionsTable.innerHTML = ''; // Clear existing rows

  for (const transaction of state.account.transactions) {
    transactionsTable.appendChild(createTransactionRow(transaction));
  }
}

async function refresh() {
  await updateAccountData();

  if (typeof updateDashboard === "function") {
    updateDashboard();
  } else {
    console.warn("updateDashboard is not defined!");
  }
}

function createTransactionRow(transaction) {
  const tr = document.createElement('tr');

  const dateTd = document.createElement('td');
  dateTd.textContent = transaction.date;

  const objectTd = document.createElement('td');
  objectTd.textContent = transaction.object;

  const amountTd = document.createElement('td');
  amountTd.textContent = transaction.amount.toFixed(2);

  tr.appendChild(dateTd);
  tr.appendChild(objectTd);
  tr.appendChild(amountTd);

  return tr;
}

function updateState(property, newData) {
  state = Object.freeze({
    ...state,
    [property]: newData
  });

  // Only store the username, not full account data
  if (property === 'account' && newData) {
    localStorage.setItem(storageKey, newData.user);
  } else if (property === 'account' && !newData) {
    localStorage.removeItem(storageKey);
  }
}


function logout() {
  updateState('account', null);
  navigate('/login');
}
async function init() {
  const savedUser = localStorage.getItem(storageKey);
  if (savedUser) {
    const data = await getAccount(savedUser);
    if (!data.error) {
      updateState('account', data);
    }
  }

  // Initialize routing
  window.onpopstate = () => updateRoute();
  updateRoute();
}

init();
async function updateAccountData() {
  const account = state.account;
  if (!account) {
    return logout();
  }

  const data = await getAccount(account.user);
  if (data.error) {
    return logout();
  }

  updateState('account', data);
}

function showTransactionDialog() {
  const dialog = document.getElementById('transactionDialog');
  if (dialog) {
    dialog.showModal();
  } else {
    console.warn("Transaction dialog not found.");
  }
}

function closeTransactionDialog() {
  const dialog = document.getElementById('transactionDialog');
  if (dialog) {
    dialog.close();
  }
}

async function submitTransaction(event) {
  event.preventDefault();

  const form = document.getElementById('transactionForm');
  const formData = new FormData(form);
  const transactionData = Object.fromEntries(formData);
  transactionData.amount = parseFloat(transactionData.amount);

  const user = state.account?.user;
  if (!user) {
    console.error("User not found in state!");
    return;
  }

  const response = await fetch(`//localhost:5000/api/accounts/${encodeURIComponent(user)}/transactions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(transactionData),
  });

  if (!response.ok) {
    console.error(`Transaction failed: ${response.status}`);
    return;
  }

  closeTransactionDialog();
  await refresh(); // Reloads transactions
}

document.getElementById('transactionForm').addEventListener('submit', submitTransaction);
document.addEventListener("DOMContentLoaded", function () {
  const transactionForm = document.getElementById("transactionForm");

  if (transactionForm) {
    transactionForm.addEventListener("submit", submitTransaction);
  } else {
    console.error("Transaction form not found!");
  }
});
