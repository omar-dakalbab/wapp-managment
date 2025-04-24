const express = require("express");
const cors = require("cors");
const http = require("http"); // Import HTTP for Socket.io
const { Server } = require("socket.io"); // Import Socket.io
const webhookRoutes = require("./routes/webhookRoutes");
const messageRoutes = require("./routes/messageRoutes");
const authRoutes = require("./routes/authRoutes");
const connectDB = require("./utils/db");
const logger = require("./utils/logger");
const { PORT } = require("./config/config");

const app = express();
const server = http.createServer(app); // Create an HTTP server

// Connect to MongoDB
connectDB();

app.use(express.json());
app.use(cors());

app.use(webhookRoutes);
app.use(messageRoutes);
app.use(authRoutes);

// Initialize Socket.io
const io = new Server(server, {
    cors: { origin: "*" },
});

io.on("connection", (socket) => {
    console.log("🔌 New client connected:", socket.id);

    socket.on("disconnect", () => {
        console.log("❌ Client disconnected");
    });
});

// Make io accessible in other files
app.set("socketio", io);

server.listen(PORT, () => {
    logger.info(`🚀 Server running on port ${PORT}`);
});
app.get("/", (req, res) => {
    res.send("Welcome to the WhatsApp API");
});

