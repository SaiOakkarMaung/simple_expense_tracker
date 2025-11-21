import React from "react";
import API from "../api";

export default function ExpenseList({ expenses, onDelete, onEdit }) {
  const remove = async (id) => {
    await API.delete(`/expenses/${id}`);
    onDelete(id);
  };

  return (
    <div className="card">
      <h2>Expenses</h2>
      <hr/>

      {expenses.length === 0 && <p className="small">No expenses yet</p>}

      {expenses.map((e) => (
        <div key={e._id} className="expense-item">
          <div>
            <div>
              <strong>{e.title}</strong>
              <span className="small">({e.category})</span>
            </div>
            <div className="small">{new Date(e.date).toLocaleDateString()}</div>
          </div>

          <div style={{ textAlign: "right" }}>
            <div>
              <strong>{e.amount} THB</strong>
            </div>

            <div style={{ display: "flex", gap: 8 }}>
              <button className="edit-btn" onClick={() => onEdit(e)}>Edit</button>
              <button className="delete-btn"onClick={() => remove(e._id)}>Delete</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
