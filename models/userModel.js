const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String, // Hash before saving!
    role: { type: String, enum: ["admin", "employee"], default: "employee" },
    assignedChats: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }]
});

module.exports = mongoose.model("User", userSchema);
