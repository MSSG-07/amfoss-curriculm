### HTML Templates and Routes in a Web App

## ASSIGNMENT
```js
const routes = {
  '/login': { 
    templateId: 'login', 
    title: 'Login - Bank App' 
  },
  '/dashboard': { 
    templateId: 'dashboard', 
    title: 'Dashboard - Bank App',
    onDisplay: () => console.log('Dashboard is shown') 
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
    return navigate('/login'); 

  const template = document.getElementById(route.templateId);
  const view = template.content.cloneNode(true);
  const app = document.getElementById('app');
  app.innerHTML = '';
  app.appendChild(view);
  document.title = route.title;
  if (route.onDisplay) {
    route.onDisplay();
  }
}}

function onLinkClick(event) {
  event.preventDefault();
  navigate(event.target.href);
}
```
## CHALLENGE
***Added a new template and route for a third page that shows the credits for this app.***
```html
<template id="credits">
        <section id="creditsPage">
          <a href="/credits" onclick="onLinkClick(event)">Credits</a>
            <h2>Credits</h2>
            <p>By: Ayrus@25></p>
            <button onclick="showPage('transaction')">Back</button>
        </section>
    </template>
```
```js
const routes = {
  '/login': { templateId: 'login' },
  '/dashboard': { templateId: 'dashboard' },
  '/credits': { templateId: 'credits' }, }
```

### Build a Login and Registration Form

## ASSIGNMENT
***Styling the  bank app using css.***
```css
body {
  font-family: Arial, sans-serif;
  background: rgb(58, 126, 205);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200vh;
  margin: 0;
}
.container {
  background: #f5f5f5;
  padding: 40px;
  border-radius: 10px;
  width: 200px;
  height: 250%;
  text-align: center;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
}
h1 {
  font-size: 24px;
  color: rgb(8, 157, 226);
  margin-bottom: 10px;
  top:50px;
}

h2 {
  font-size: 20px;
  color: rgb(58, 126, 205);
  margin-bottom: 15px;
}
form {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  align-items: center;
}

label {
  display: block;
  text-align: left;
  font-weight: bold;
  margin: 10px 0 5px;
  width: 90%;
}

input {
  width: 90%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
}
button {
  width: 90%;
  padding: 10px;
  background-color: rgb(58, 126, 205);
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: rgb(8, 157, 226);
}
```
The interface after styling:
![Screenshot of the login page after adding CSS styles](./login.png)
## CHALLENGE
***Show an error message in the HTML if the user already exists.***
```html
<div id="error" hidden style="color: red;"></div>
```
```js
function showError(message) {
            const errorDiv = document.getElementById('error');
            errorDiv.textContent = message;
            errorDiv.hidden = false;
            }
```
same has been implemented in the login portal too.
### Methods of Fetching and Using Data
## ASSIGNMENT
Added comments and refactored app.js to improve the code quality.
Created  a constant to extract server api base URL,the createAccount function and getAccount function is regrouped to reudce the bulkiness of the code and the comments were added for the better understanding of the web app.
## CHALLENGE
```css
.dashboard-container {
  max-width: 700px;
  background: white;
  padding: 20px;
  margin: 20px auto;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  text-align: center;
  font-family: 'Arial', sans-serif;
}
.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #2b2b3d;
  color: white;
  padding: 15px;
  border-radius: 10px 10px 0 0;
}

.logout-btn {
  background: transparent;
  color: white;
  border: 1px solid white;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
}

.logout-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}
.balance-section {
  background: linear-gradient(to right, #4facfe, #00f2fe);
  color: white;
  padding: 15px;
  font-size: 28px;
  font-weight: bold;
  border-radius: 5px;
  margin-top: -10px;
}
.account-name {
  font-size: 20px;
  font-weight: bold;
  margin: 15px 0;
  text-align: left;
}
.add-transaction {
  background: #007bff;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  float: right;
}

.add-transaction:hover {
  background: #0056b3;
}

.transactions-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

.transactions-table th, .transactions-table td {
  padding: 12px;
  text-align: left;
}

.transactions-table th {
  background: #007bff;
  color: white;
}

.transactions-table tr:nth-child(even) {
  background: #f2f2f2;
}

@media (max-width: 600px) {
  .dashboard-container {
    max-width: 90%;
    padding: 15px;
  }

  .balance-section {
    font-size: 24px;
  }

  .add-transaction {
    width: 100%;
    text-align: center;
  }
}
```

### Concepts of State Management
## ASSIGNMENT
```js
const API_BASE_URL = 'http://localhost:5000/api/accounts';
const STORAGE_KEY = 'savedUser'; 

function updateState(property, newData) {
  state = Object.freeze({
    ...state,
    [property]: newData
  });
  if (property === 'account' && newData) {
    localStorage.setItem(storageKey, newData.user);
  } else if (property === 'account' && !newData) {
    localStorage.removeItem(storageKey);
  }
}

async function init() {
  const savedUser = localStorage.getItem(storageKey);
  if (savedUser) {
    const data = await getAccount(savedUser);
    if (!data.error) {
      updateState('account', data);
    }
  }};
```
## CHALLENGE
Implementing the transaction dialog box;
```html
<template id="dashboard">
    <div class="dashboard-container">
      <div class="dashboard-header">
        <h2>Bank App</h2>
        <button class="logout-btn" onclick="logout()">LOGOUT</button>
      </div>
      <div class="balance-section">
        <span>Balance</span>
        <div id="balance">0.00</div>
        <span id="currency">$</span>
      </div>
      <h2 class="account-name" id="description">Your Account</h2>
      <button class="add-transaction" onclick="showTransactionDialog()">ADD TRANSACTION</button>
      <dialog id="transactionDialog">
        <form id="transactionForm">
          <h2>ADD TRANSACTION</h2>
      
          <label for="date">DATE</label>
          <input type="date" id="date" name="date" required>
      
          <label for="object">OBJECT</label>
          <input type="text" id="object" name="object" required>
      
          <label for="amount">AMOUNT (USE NEGATIVE VALUE FOR DEBIT)</label>
          <input type="number" id="amount" name="amount" required>
      
          <div class="dialog-buttons">
            <button type="button" onclick="closeTransactionDialog()">CANCEL</button>
            <button type="submit">OK</button>
          </div>
        </form>
      </dialog>
      <table class="transactions-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Object</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody id="transactions"></tbody>
      </table>
    </div>
  </template>
```
Styling using CSS
```css
dialog {
  width: 400px;
  padding: 20px;
  border: none;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  text-align: center;
}

.dialog-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
}

button {
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button[type="submit"] {
  background: #007bff;
  color: white;
}

button[type="button"] {
  background: red;
  color: white;
}
.logout-btn,
.add-transaction {
  font-size: 14px; 
  padding: 8px 12px; 
  border-radius: 5px;
}

.logout-btn {
  width: auto; 
  height: 30px;
}

.add-transaction {
  width: auto;
  height: 35px;
  margin-top: 10px;
}

```
Enhancing interactivity using javascript
```js
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
  await refresh();
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

  ```