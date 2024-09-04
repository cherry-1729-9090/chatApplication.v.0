// The socket.on() function takes event and then call back function to perform if that event happens
// 'new-user-joined', 'send' and 'recieve' are not built-in events, they are custom events that we have created
// we used the same event names on the client side to emit and listen to these events



const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

// Set up CORS middleware for Express (optional for additional routes)
app.use(cors({
    origin: 'http://127.0.0.1:5500', // Allow requests from this origin
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
    credentials: true
}));

// Set up Socket.io with CORS configuration
const io = new Server(server, {
    cors: {
        origin: "http://127.0.0.1:5500", // The client origin
        methods: ["GET", "POST"],
        allowedHeaders: ["Content-Type"],
        credentials: true
    }
});

const users = {};

io.on('connection', (socket) => {
    console.log('New connection:', socket.id);
    console.log(socket)
    console.log(socket.broadcast)
    socket.on('new-user-joined', (name) => {
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    });

    socket.on('send', (message) => {
        socket.broadcast.emit('recieve', { message: message, name: users[socket.id] });
    });

    socket.on('disconnect', () => {
        delete users[socket.id];
    });
});

// Start the server
server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
