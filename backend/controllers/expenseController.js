import Expense from "../models/Expense.js";

export const addExpense = async (req, res) => {
  try {
    const { title, amount, category, date } = req.body;
    if (!title || amount == null || !category || !date) return res.status(400).json({ error: "Missing fields" });

    const expense = new Expense({
      userId: req.userId,
      title,
      amount,
      category,
      date: new Date(date)
    });

    await expense.save();
    return res.status(201).json(expense);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const getExpenses = async (req, res) => {
  try {
    const { from, to, sortBy } = req.query; // optional
    const filter = { userId: req.userId };

    if (from && to) filter.date = { $gte: new Date(from), $lte: new Date(to) };

    let query = Expense.find(filter);

    if (sortBy === "amount_asc") query = query.sort({ amount: 1 });
    else if (sortBy === "amount_desc") query = query.sort({ amount: -1 });
    else query = query.sort({ date: -1 });

    const expenses = await query.exec();
    return res.json(expenses);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Expense.findOneAndDelete({ _id: id, userId: req.userId });
    if (!result) return res.status(404).json({ error: "Expense not found" });
    return res.json({ message: "Deleted" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const payload = req.body;
    const updated = await Expense.findOneAndUpdate({ _id: id, userId: req.userId }, payload, { new: true });
    if (!updated) return res.status(404).json({ error: "Not found" });
    return res.json(updated);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
