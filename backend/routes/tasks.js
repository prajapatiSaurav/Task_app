const express = require("express");
const pool = require("../db");
const auth = require("../middleware/middleauth");

const router = express.Router();


router.get("/", auth, async (req, res) => {
  try {
    const tasks = await pool.query(
      "SELECT * FROM tasks WHERE user_id=$1",
      [req.user.id]
    );

    res.json(tasks.rows);
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch tasks" });
  }
});


router.post("/", auth, async (req, res) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({ msg: "Title required" });
    }

    const task = await pool.query(
      "INSERT INTO tasks (user_id, title) VALUES ($1,$2) RETURNING *",
      [req.user.id, title]
    );

    
    res.status(201).json({
      msg: "Task added successfully",
      task: task.rows[0],
    });

  } catch (err) {
    res.status(500).json({ msg: "Failed to create task" });
  }
});

module.exports = router;