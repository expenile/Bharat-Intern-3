let transactions = [];
let totalExpense = 0;
let totalIncome = 0;

const categorySelect = document.getElementById("category-select");
const typeSelect = document.getElementById("type-select");
const amountInput = document.getElementById("amount-input");
const dateInput = document.getElementById("date-input");
const addBtn = document.getElementById("add-btn");
const expenseTableBody = document.getElementById("expense-table-body");
const totalAmountCell = document.getElementById("total-amount");

addBtn.addEventListener("click", function () {
  const category = categorySelect.value;
  const type = typeSelect.value;
  const amount = Number(amountInput.value);
  const date = dateInput.value;

  if (category === "") {
    alert("Please select a category");
    return;
  }
  if (isNaN(amount) || amount <= 0) {
    alert("Please enter a valid amount");
    return;
  }
  if (date === "") {
    alert("Please select a date");
    return;
  }

  const transaction = { category, type, amount, date };
  transactions.push(transaction);

  if (type === "income") {
    totalIncome += amount;
  } else {
    totalExpense += amount;
  }

  updateTable();
});

function updateTable() {
  while (expenseTableBody.firstChild) {
    expenseTableBody.removeChild(expenseTableBody.firstChild);
  }

  for (const transaction of transactions) {
    const newRow = expenseTableBody.insertRow();

    const categoryCell = newRow.insertCell();
    const typeCell = newRow.insertCell();
    const amountCell = newRow.insertCell();
    const dateCell = newRow.insertCell();
    const deleteCell = newRow.insertCell();

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener("click", function () {
      const index = transactions.findIndex((t) => t === transaction);
      transactions.splice(index, 1);

      if (transaction.type === "income") {
        totalIncome -= transaction.amount;
      } else {
        totalExpense -= transaction.amount;
      }

      updateTable();
    });

    categoryCell.textContent = transaction.category;
    typeCell.textContent = capitalizeFirstLetter(transaction.type);
    amountCell.textContent = transaction.amount.toFixed(2);
    dateCell.textContent = transaction.date;
    deleteCell.appendChild(deleteBtn);
  }

  totalAmountCell.textContent = (totalIncome - totalExpense).toFixed(2);
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
