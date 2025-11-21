import React, { useState } from "react";
import API from "../api";

import "./EditExpense.css";

export default function EditExpense({ expense, onClose, onUpdate }) {
  const [title, setTitle] = useState(expense.title);
  const [amount, setAmount] = useState(String(expense.amount)); // convert to string for filtering
  const [category, setCategory] = useState(expense.category);
  const [date, setDate] = useState(expense.date.substring(0, 10));

  const categories = [
    "Food",
    "Transport",
    "Shopping",
    "Bills",
    "Health",
    "Entertainment",
    "Savings",
    "Education",
    "Other",
  ];

  const submit = async (e) => {
    e.preventDefault();

    const amountNum = Number(amount);

    // VALIDATION — same as AddExpense
    if (!amount || isNaN(amountNum)) {
      alert("Amount must be a valid number.");
      return;
    }

    if (amountNum <= 0) {
      alert("Amount must be greater than 0.");
      return;
    }

    const payload = { title, amount: amountNum, category, date };

    const res = await API.put(`/expenses/${expense._id}`, payload);
    onUpdate(res.data);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <h2 className="popup-title">Edit Expense</h2>
        <hr />

        <form onSubmit={submit}>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <input
            type="text"
            inputMode="decimal"
            value={amount}
            onChange={(e) => {
              const val = e.target.value;
              // Only allow digits and optional decimal point
              if (/^[0-9]*\.?[0-9]*$/.test(val)) {
                setAmount(val);
              }
            }}
            required
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <input
            type="date"
            value={date}
            max={new Date().toISOString().split("T")[0]} 
            onChange={(e) => setDate(e.target.value)}
            required
          />

          <div className="actions">
            <button type="submit" className="edit-btn">
              Update
            </button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
