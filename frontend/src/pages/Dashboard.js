import React, { useEffect, useState } from "react";
import API from "../api";
import AddExpense from "../components/AddExpense";
import EditExpense from "../components/EditExpense";
import FilterExpense from "../components/FilterExpense";
import ExpenseList from "../components/ExpenseList";
import Summary from "../components/Summary";

export default function Dashboard() {
  const [allExpenses, setAllExpenses] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [lastFilter, setLastFilter] = useState(null); // FIXED

  const userName = localStorage.getItem("name") || "";

  // Modal state
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Data for editing
  const [editExpenseData, setEditExpenseData] = useState(null);

  // Fetch data from API
  const fetch = async () => {
    const res = await API.get("/expenses");
    setAllExpenses(res.data);
    setExpenses(res.data);
  };

  useEffect(() => {
    fetch();
  }, []);

  const totalExpenses = expenses.reduce((sum, e) => sum + (e.amount || 0), 0);

  // Modal handlers
  const openAddModal = () => setIsAddOpen(true);
  const closeAddModal = () => setIsAddOpen(false);

  const openEditModal = (exp) => {
    setEditExpenseData(exp);
    setIsEditOpen(true);
  };

  const closeEditModal = () => {
    setIsEditOpen(false);
    setEditExpenseData(null);
  };

  const openFilterModal = () => setIsFilterOpen(true);
  const closeFilterModal = () => setIsFilterOpen(false);

  // ADD EXPENSE
  const onAdd = (exp) => {
    setAllExpenses((prev) => [exp, ...prev]);
    setExpenses((prev) => [exp, ...prev]);
  };

  // FIXED — UPDATE EXPENSE
  const onUpdate = (updated) => {
    setAllExpenses((prev) =>
      prev.map((e) => (e._id === updated._id ? updated : e))
    );

    // Update visible list too
    setExpenses((prev) =>
      prev.map((e) => (e._id === updated._id ? updated : e))
    );
  };

  // DELETE EXPENSE
  const onDelete = (id) => {
    setAllExpenses((prev) => prev.filter((e) => e._id !== id));
    setExpenses((prev) => prev.filter((e) => e._id !== id));
  };

  // APPLY FILTER
  const applyFilter = ({ sortOrder, period, startDate, endDate }) => {
    setLastFilter({ sortOrder, period, startDate, endDate });

    let filtered = [...allExpenses];

    // SORT
    if (sortOrder === "newest") {
      filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else {
      filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
    }

    // PERIOD FILTER
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() - 7);
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const yearStart = new Date(now.getFullYear(), 0, 1);

    filtered = filtered.filter((e) => {
      const date = new Date(e.date);

      if (period === "today") return date >= todayStart;
      if (period === "week") return date >= weekStart;
      if (period === "month") return date >= monthStart;
      if (period === "year") return date >= yearStart;

      if (period === "custom") {
        if (!startDate || !endDate) return true;
        const s = new Date(startDate);
        const en = new Date(endDate);
        en.setHours(23, 59, 59, 999);
        return date >= s && date <= en;
      }

      return true;
    });

    setExpenses(filtered);
  };

  return (
    <div className="container">

      {/* TOP CARD */}
      <div className="card card-divider">
        <h1>Welcome, {userName}</h1>
        <hr />
        <h2>Total Expenses...</h2>
        <h1>฿ {totalExpenses.toLocaleString()}</h1>

        <div className="btn-container">
          <button onClick={openAddModal} className="add-expense-btn">
            Add Expense
          </button>

          <button onClick={openFilterModal} className="filter-expense-btn">
            Filter / Sort
          </button>
        </div>
      </div>

      {/* EXPENSE LIST */}
      <ExpenseList
        expenses={expenses}
        onDelete={onDelete}
        onEdit={openEditModal}
      />

      {/* SUMMARY */}
      <Summary expenses={expenses} />

      {/* MODALS */}
      {isAddOpen && <AddExpense onClose={closeAddModal} onAdd={onAdd} />}

      {isEditOpen && (
        <EditExpense
          expense={editExpenseData}
          onClose={closeEditModal}
          onUpdate={onUpdate}
        />
      )}

      {isFilterOpen && (
        <FilterExpense onClose={closeFilterModal} onApply={applyFilter} />
      )}
    </div>
  );
}
