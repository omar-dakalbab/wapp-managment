const Message = require("../models/messageModel");
const logger = require("../utils/logger");
const { VERIFY_TOKEN } = require("../config/config");

const verifyWebhook = (req, res) => {
    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    if (mode === "subscribe" && token === VERIFY_TOKEN) {
        logger.info("✅ Webhook Verified!");
        res.status(200).send(challenge);
    } else {
        logger.warn("❌ Webhook verification failed");
        res.sendStatus(403);
    }
};

const handleIncomingMessages = async (req, res) => {
    const body = req.body;

    if (body.object) {
        if (body.entry && body.entry[0].changes && body.entry[0].changes[0].value.messages) {
            const message = body.entry[0].changes[0].value.messages[0];

            const senderWaId = message.from;
            const messageContent = message.text.body;
            const senderName = body.entry[0].changes[0].value.contacts[0]?.profile?.name || "Unknown";
            const phoneNumber = body.entry[0].changes[0].value.metadata?.display_phone_number || "Unknown";
            const messageId = message.id;
            const messageType = message.type;
            const phoneNumberId = body.entry[0].changes[0].value.metadata?.phone_number_id || "Unknown";

            logger.info(`📩 New Message from ${senderName} (${senderWaId}): ${messageContent}`);

            try {
                const existingMessage = await Message.findOne({ messageId: message.id });

                if (!existingMessage) {
                    const newMessage = new Message({
                        senderName,
                        senderWaId,
                        messageId: message.id,
                        messageContent,
                        timestamp: new Date(message.timestamp * 1000),
                    });

                    await newMessage.save();
                    req.io.emit("new_message", newMessage);

                    res.sendStatus(200);
                } else {
                    logger.warn("⚠️ Duplicate message ignored:", message.id);
                }

            } catch (error) {
                logger.error("❌ Error saving message to DB:", error.message);
                res.status(500).send({ error: "Failed to save message to DB" });
            }
        } else {
            res.sendStatus(404);
        }
    } else {
        res.status(400).send({ error: "Invalid webhook structure" });
    }
};

module.exports = { verifyWebhook, handleIncomingMessages };
