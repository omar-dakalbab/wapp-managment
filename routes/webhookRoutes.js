const express = require("express");
const { verifyWebhook, handleIncomingMessages } = require("../controllers/webhookController");

const router = express.Router();

router.get("/webhook", verifyWebhook);
router.post("/webhook", handleIncomingMessages);

module.exports = router;
