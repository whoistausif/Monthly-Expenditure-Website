function addRow() {
  const table = document.querySelector("#expense-table tbody");
  const newRow = document.createElement("tr");
  newRow.innerHTML = `
    <td><input type="text" placeholder="New Category"></td>
    <td><input type="number" placeholder="0" /></td>
    <td class="action-col"><button class="remove-btn" onclick="removeRow(this)">Remove</button></td>
  `;
  table.appendChild(newRow);
}

function removeRow(btn) {
  btn.closest("tr").remove();
  calculateTotal();
}

function calculateTotal() {
  const rows = document.querySelectorAll("#expense-table tbody tr");
  let total = 0;
  rows.forEach(row => {
    const amountInput = row.cells[1].querySelector("input");
    const value = parseFloat(amountInput.value);
    if (!isNaN(value)) total += value;
  });
  const budget = parseFloat(document.getElementById("budget").value);
  const remaining = isNaN(budget) ? 0 : budget - total;
  document.getElementById("total").textContent = total.toFixed(2);
  document.getElementById("remaining").textContent = remaining.toFixed(2);
}

document.addEventListener("DOMContentLoaded", () => {
  const now = new Date();
  const formatted = now.toLocaleString("en-IN", {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
  document.getElementById("datetime").textContent = formatted;

  // Make labels slightly larger and cleaner
  const style = document.createElement("style");
  style.textContent = `
    label {
      font-size: 1.1em;
      font-weight: 600;
      display: block;
      margin-bottom: 6px;
    }
    @media print {
      footer {
        display: block;
        text-align: center;
        font-size: 1em;
        margin-top: 40px;
        color: #444;
      }
    }
  `;
  document.head.appendChild(style);

  // Add footer stamp
  const footer = document.createElement("footer");
  footer.textContent = "Thanks For Using Monthly Expenditure Website By Mohammad Tausif";
  footer.style.display = "none";
  document.body.appendChild(footer);
});