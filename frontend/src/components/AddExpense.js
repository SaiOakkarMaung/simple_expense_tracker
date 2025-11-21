import React, { useState } from "react";
import API from "../api";
import "./AddExpense.css";

export default function AddExpense({ onAdd, onClose }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [date, setDate] = useState("");

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

    if (!amount || isNaN(amountNum)) {
      alert("Amount must be a valid number.");
      return;
    }

    if (amountNum <= 0) {
      alert("Amount must be greater than 0.");
      return;
    }

    const payload = { title, amount: amountNum, category, date };

    const res = await API.post("/expenses", payload);
    onAdd(res.data);
    onClose();
  };

  return (
    <div className="add-modal-backdrop" onClick={onClose}>
      <div className="add-modal" onClick={(e) => e.stopPropagation()}>
        <h2 className="popup-title">Add Expense</h2>
        <hr />

        <form onSubmit={submit}>
          <input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <input
            type="text"
            inputMode="decimal"
            placeholder="Amount"
            value={amount}
            onChange={(e) => {
              const val = e.target.value;

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
            onChange={(e) => setDate(e.target.value)}
            required
          />

          <div className="actions">
            <button type="submit" className="add-expense-btn">
              Add
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
