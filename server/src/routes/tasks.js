import express from "express";
import Task from "../models/Task.js";
import { createId, memoryStore } from "../lib/memoryStore.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();
router.use(requireAuth);

function normalizeTask(task) {
  return {
    id: task.id || task._id.toString(),
    title: task.title,
    description: task.description,
    priority: task.priority,
    status: task.status,
    dueDate: task.dueDate,
    estimateMinutes: task.estimateMinutes,
    category: task.category,
    createdAt: task.createdAt
  };
}

router.get("/", async (req, res, next) => {
  try {
    const tasks = req.app.locals.useMemory
      ? memoryStore.tasks.filter((task) => task.userId === req.userId)
      : await Task.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.json(tasks.map(normalizeTask));
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { title, description, priority, status, dueDate, estimateMinutes, category } = req.body;
    if (!title) return res.status(400).json({ message: "Task title is required" });

    const payload = {
      title,
      description: description || "",
      priority: priority || "Medium",
      status: status || "Pending",
      dueDate: dueDate || null,
      estimateMinutes: Number(estimateMinutes) || 45,
      category: category || "General",
      userId: req.userId
    };

    if (req.app.locals.useMemory) {
      const task = { id: createId(), ...payload, createdAt: new Date() };
      memoryStore.tasks.unshift(task);
      return res.status(201).json(normalizeTask(task));
    }

    const task = await Task.create(payload);
    res.status(201).json(normalizeTask(task));
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", async (req, res, next) => {
  try {
    if (req.app.locals.useMemory) {
      const task = memoryStore.tasks.find((item) => item.id === req.params.id && item.userId === req.userId);
      if (!task) return res.status(404).json({ message: "Task not found" });
      Object.assign(task, req.body);
      return res.json(normalizeTask(task));
    }

    const task = await Task.findOneAndUpdate({ _id: req.params.id, userId: req.userId }, req.body, { new: true });
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(normalizeTask(task));
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    if (req.app.locals.useMemory) {
      const index = memoryStore.tasks.findIndex((item) => item.id === req.params.id && item.userId === req.userId);
      if (index === -1) return res.status(404).json({ message: "Task not found" });
      memoryStore.tasks.splice(index, 1);
      return res.status(204).end();
    }

    const task = await Task.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

export default router;
