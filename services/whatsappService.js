const axios = require("axios");
const { ACCESS_TOKEN, PHONE_NUMBER_ID } = require("../config/config");
const logger = require("../utils/logger");

const sendWhatsAppMessage = async (to, text) => {
    try {
        await axios.post(
            `https://graph.facebook.com/v17.0/${PHONE_NUMBER_ID}/messages`,
            {
                messaging_product: "whatsapp",
                to,
                type: "text",
                text: { body: text },
            },
            {
                headers: {
                    Authorization: `Bearer ${ACCESS_TOKEN}`,
                    "Content-Type": "application/json",
                },
            }
        );
        logger.info(`✅ Message sent to ${to}`);
    } catch (error) {
        logger.error("❌ Error sending message:", error.response ? error.response.data : error.message);
        throw new Error(error.message);
    }
};

module.exports = { sendWhatsAppMessage };
