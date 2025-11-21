import express from "express";
import { addExpense, getExpenses, deleteExpense, updateExpense } from "../controllers/expenseController.js";
import { auth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(auth); // protect all expense routes

router.post("/", addExpense);
router.get("/", getExpenses);
router.delete("/:id", deleteExpense);
router.put("/:id", updateExpense);

export default router;
