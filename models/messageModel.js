const mongoose = require('mongoose');

// Define the schema for the incoming message
const messageSchema = new mongoose.Schema(
  {
    senderName: {
      type: String,
      required: true,
    },
    senderWaId: {
      type: String,
      required: true,
      unique: true, // Make sure wa_id is unique for each sender
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    messageId: {
      type: String,
      required: true,
      unique: true, // Unique message ID
    },
    messageContent: {
      type: String,
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
    messageType: {
      type: String,
      required: true,
    },
    phoneNumberId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Create the model
const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
