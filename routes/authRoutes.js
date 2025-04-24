const express = require("express");
const { register, login } = require("../controllers/authController");
const { authMiddleware, isAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", authMiddleware, isAdmin, register);
router.post("/login", login);

module.exports = router;
