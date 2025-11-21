import React, { useState } from "react";

import "./FilterExpense.css";

export default function FilterExpense({ onClose, onApply }) {
  const [sortOrder, setSortOrder] = useState("newest");
  const [period, setPeriod] = useState("all");

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="filter-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="popup-title">Filter Expenses</h2>
        <hr />
        
        {/* SORT SECTION */}
        <div className="section">
          <h4>Sort By</h4>
          <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
            <option value="newest">Newest → Oldest</option>
            <option value="oldest">Oldest → Newest</option>
          </select>
        </div>

        {/* PERIOD SECTION */}
        <div className="section">
          <h4>Time Period</h4>
          <select value={period} onChange={(e) => setPeriod(e.target.value)}>
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
            <option value="custom">Custom Range</option>
          </select>
        </div>

        {/* CUSTOM RANGE */}
        {period === "custom" && (
          <div className="section">
            <h4>Select Range</h4>

            <label>Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />

            <label>End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        )}

        {/* BUTTONS */}
        <div className="actions">
          <button
            className="edit-btn"
            onClick={() => {
              onApply({ sortOrder, period, startDate, endDate });
              onClose();
            }}
          >
            Apply
          </button>
          <button onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
