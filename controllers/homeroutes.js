const router = require("express").Router();
const { User, Task } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const taskData = await Task.findAll({      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });

    // Serialize data so the template can read it
    const tasks = taskData.map((task) => task.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render("login", {
      task,
      logged_in: req.isAuthenticated(),
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/task/:id", async (req, res) => {
  try {
    const taskData = await Task.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });

    const task = taskData.get({ plain: true });

    res.render("task", {
      ...task,
      logged_in: req.isAuthenticated(),
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get("/profile", withAuth, async (req, res) => {
  try {
    const user = await getUser(req);
    res.render("profile", {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.isAuthenticated()) {
    res.redirect("/profile");
    return;
  }

  res.render("all");
});

router.get("/all", async (req, res) => {
  try {
    const taskData = await Task.findAll();
    const tasks = taskData.map((task) => task.get({ plain: true }));
    const user = await getUser(req);
    res.render("all", {
      tasks,
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

async function getUser(req) {
  const userData = await User.findByPk(req.user.id, {
    attributes: { exclude: ["password"] },
  });

  return userData.get({ plain: true });
}
module.exports = router;