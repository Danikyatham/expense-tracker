// Initialize expenses array
let expenses = [];

// DOM elements
const expenseForm = document.getElementById('expense-form');
const expenseList = document.getElementById('expense-list');
const totalAmount = document.getElementById('total-amount');
const availableMoneyInput = document.getElementById('available-money-input');
const remainingBalance = document.getElementById('remaining-balance');
const darkModeToggle = document.getElementById('dark-mode-toggle');

// Event listener for form submission
expenseForm.addEventListener('submit', handleFormSubmit);

// Update expense list
function updateExpenseList() {
    expenseList.innerHTML = '';
    expenses.forEach((expense, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${expense.name}</td>
            <td>₹${expense.amount.toFixed(2)}</td>
            <td><button id=dltbtn onclick="removeExpense(${index})">Delete</button></td>
        `;
        expenseList.appendChild(row);
    });
}

// Update total amount
function updateTotalAmount() {
    const total = expenses.reduce((acc, expense) => acc + expense.amount, 0);
    totalAmount.textContent = `Total Expenses: ₹${total.toFixed(2)}`;
}

// Update remaining balance
function updateRemainingBalance() {
    const availableMoney = parseFloat(availableMoneyInput.value);
    const totalExpenses = expenses.reduce((acc, expense) => acc + expense.amount, 0);
    const remaining = availableMoney - totalExpenses;
    remainingBalance.textContent = `Remaining Balance: ₹${remaining.toFixed(2)}`;
}

// Remove expense
function removeExpense(index) {
    expenses.splice(index, 1);
    updateExpenseList();
    updateTotalAmount();
    updateRemainingBalance();
}

// Dark mode toggle
darkModeToggle.addEventListener('change', () => {
    document.body.classList.toggle('dark-mode');
});

// Handle form submission
function handleFormSubmit(e) {
    e.preventDefault();
    const name = document.getElementById('expense-name').value;
    const amount = parseFloat(document.getElementById('expense-amount').value);

    if (name && amount) {
        expenses.push({ name, amount });
        updateExpenseList();
        updateTotalAmount();
        updateRemainingBalance();
        expenseForm.reset();
    }
}

// Event listener for available money input
availableMoneyInput.addEventListener('input', updateRemainingBalance);

// Initialize
updateExpenseList();
updateTotalAmount();
