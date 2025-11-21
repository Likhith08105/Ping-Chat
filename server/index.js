const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const messageRoutes = require("./routes/messages");
const cloudRoutes = require("./routes/cloudinary");
const socket = require("socket.io");
const Multer = require("multer");
const http = require('http');
    
const httpServer = http.createServer()
const app = express();
// Load .env located in the server directory explicitly so running the script
// from a different working directory still loads correct variables.
require("dotenv").config({ path: __dirname + '/.env' });

app.use(cors());
app.use(express.json());

// Prefer MONGO_URI (matches .env) but fall back to MONGO_URL if present
const mongoUri = process.env.MONGO_URI || process.env.MONGO_URL;
if (!mongoUri) {
  console.error('MongoDB connection string is not defined. Set MONGO_URI or MONGO_URL in your .env');
} 

mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connetion Successfull");
  })
  .catch((err) => {
    console.log(err.message);
  });
  
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/cloud", cloudRoutes);

const PORT = process.env.PORT || 5000
const server = app.listen(PORT,()=>{
    console.log(`Server running on Port ${PORT}`);
})

const io = socket(server,{
  cors :{
    origin : '*',
    credentials : true
  }
})

global.onlineUsers = new Map();

io.on("connection", (socket)=>{
  console.log('connect to socket', socket.id);
  global.chatSocket = socket;

  socket.on("add-user", (userId)=>{
    onlineUsers.set(userId, socket.id);
    // Broadcast to all clients that this user is now online
    socket.broadcast.emit("user-online", userId);
  })

  socket.on("send-msg", (data)=>{
    const sendUnderSocket = onlineUsers.get(data.to);
    if(sendUnderSocket){
      socket.to(sendUnderSocket).emit("msg-recieve", {
        message: data.message,
        type: data.type || "text",
        from: data.from
      })
    }
  })

  socket.on("send-notification", (data)=>{
    const sendUnderSocket = onlineUsers.get(data.to);
    if(sendUnderSocket){
      socket.to(sendUnderSocket).emit("notification-recieve",data.message)
    }
  })

  // Handle user disconnect
  socket.on("disconnect", () => {
    console.log('user disconnected', socket.id);
    // Find and remove the user from onlineUsers map
    for (let [userId, socketId] of onlineUsers.entries()) {
      if (socketId === socket.id) {
        onlineUsers.delete(userId);
        // Broadcast to all clients that this user is now offline
        socket.broadcast.emit("user-offline", userId);
        break;
      }
    }
  });

  // Send initial online users list when a user connects
  socket.on("get-online-users", () => {
    const onlineUsersList = Array.from(onlineUsers.keys());
    socket.emit("online-users-list", onlineUsersList);
  });

})