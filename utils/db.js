const mongoose = require("mongoose");
const { MONGO_URI } = require("../config/config");
const logger = require("./logger");

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        logger.info("✅ Connected to MongoDB Database");
    } catch (err) {
        logger.error("❌ MongoDB Connection Error:", err);
        process.exit(1);
    }
};

module.exports = connectDB;
