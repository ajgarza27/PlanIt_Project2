const router = require("express").Router();
const homeRoutes = require("./homeroutes");
const taskRoutes = require("./taskroutes"); // Import task routes

// Use home routes for root paths
router.use("/", homeRoutes);
// Use task routes for /tasks path
router.use("/tasks", taskRoutes);

module.exports = router;
