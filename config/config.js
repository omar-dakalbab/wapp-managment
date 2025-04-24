require("dotenv").config();

module.exports = {
    PORT: process.env.PORT || 3000,
    VERIFY_TOKEN: process.env.VERIFY_TOKEN,
    ACCESS_TOKEN: process.env.ACCESS_TOKEN,
    PHONE_NUMBER_ID: process.env.PHONE_NUMBER_ID,
    MONGO_URI: process.env.MONGO_URI, // MongoDB URI
};
