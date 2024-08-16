const router = require("express").Router();
const { Task } = require("../../models"); // Adjust the path as needed

// Route to get all tasks
router.get("/", async (req, res) => {
  try {
    // Fetch all tasks from the database
    const taskData = await Task.findAll();
    // Serialize task data
    const tasks = taskData.map((task) => task.get({ plain: true }));
    // Render the 'all' template with tasks data
    res.render("all", { tasks, logged_in: req.isAuthenticated() });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Add more task-related routes here (e.g., for viewing, editing, deleting tasks)

module.exports = router;
