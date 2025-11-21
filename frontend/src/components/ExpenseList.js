import React, { useState } from "react";
import API from "../api";

export default function ExpenseList({ expenses, onDelete, onEdit }) {
  const [showAllThis, setShowAllThis] = useState(false);
  const [showAllLast, setShowAllLast] = useState(false);
  const [showAllOlder, setShowAllOlder] = useState(false);

  const maxItems = 5;

  const remove = async (id) => {
    await API.delete(`/expenses/${id}`);
    onDelete(id);
  };

  //Group
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const thisMonth = [];
  const lastMonth = [];
  const older = [];

  expenses.forEach((e) => {
    const d = new Date(e.date);
    const month = d.getMonth();
    const year = d.getFullYear();

    if (year === currentYear && month === currentMonth) {
      thisMonth.push(e);
    } else if (
      year === currentYear &&
      month === currentMonth - 1
    ) {
      lastMonth.push(e);
    } else {
      older.push(e);
    }
  });

  //Render
  const renderGroup = (title, list, showAll, setShowAll) => {
    if (list.length === 0) return null;

    const visible = showAll ? list : list.slice(0, maxItems);

    return (
      <div className="card">
        <h2>{title}</h2>
        <hr />

        {visible.map((e) => (
          <div key={e._id} className="expense-item">
            <div>
              <div>
                <strong>{e.title}</strong>
                <span className="small"> ({e.category})</span>
              </div>
              <div className="small">
                {new Date(e.date).toLocaleDateString()}
              </div>
            </div>

            <div style={{ textAlign: "right" }}>
              <div>
                <strong>{e.amount} THB</strong>
              </div>

              <div style={{ display: "flex", gap: 8 }}>
                <button className="edit-btn" onClick={() => onEdit(e)}>
                  Edit
                </button>
                <button className="delete-btn" onClick={() => remove(e._id)}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}

        {list.length > maxItems && (
          <button
            className="seeall-btn"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? "Show Less" : "See All"}
          </button>
        )}
      </div>
    );
  };

  return (
    <div>
      {expenses.length === 0 && <p className="small">No expenses yet</p>}

      {renderGroup("📅 This Month", thisMonth, showAllThis, setShowAllThis)}
      {renderGroup("📆 Last Month", lastMonth, showAllLast, setShowAllLast)}
      {renderGroup("🗂️ Older Expenses", older, showAllOlder, setShowAllOlder)}
    </div>
  );
}
