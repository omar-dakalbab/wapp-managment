const express = require("express");
const { getAllMessages, sendMessage } = require("../controllers/messageController");

const router = express.Router();

router.get("/messages", getAllMessages);
router.post("/send-message", sendMessage);

module.exports = router;
