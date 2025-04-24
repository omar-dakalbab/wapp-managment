const Message = require("../models/messageModel");
const { sendWhatsAppMessage } = require("../services/whatsappService");
const logger = require("../utils/logger");

const getAllMessages = async (req, res) => {
    try {
        const messages = await Message.find().sort({ timestamp: -1 });
        res.json(messages);
    } catch (err) {
        logger.error("❌ Error fetching messages:", err);
        res.status(500).json({ error: "Database error" });
    }
};

const sendMessage = async (req, res) => {
    const { to, text } = req.body;

    if (!to || !text) {
        return res.status(400).json({ error: "Missing 'to' or 'text' field" });
    }

    try {
        await sendWhatsAppMessage(to, text);
        res.status(200).json({ message: "Message sent successfully" });
    } catch (err) {
        logger.error("❌ Error sending message:", err.message);
        res.status(500).json({ error: "Failed to send message", details: err.message });
    }
};

module.exports = { getAllMessages, sendMessage };
