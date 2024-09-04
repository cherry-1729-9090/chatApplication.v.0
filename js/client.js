// Client-side code (client.js)
// const skinbikb
const socket = io('http://localhost:3000');

// Select the elements
const form = document.getElementById('send-container');
const messageInput = document.getElementById('message');
const messageContainer = document.querySelector('.container');

// Function to append message to the container
const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
};

// Prompt for name once when the page loads
const name = prompt('Enter your name to join');

// Emit new user joined event with the name
socket.emit('new-user-joined', name);

// Handle 'user-joined' event to display the message in the container
socket.on('user-joined', (name) => {
    append(`${name} joined the chat`, 'left');
});

// Listen for form submission to send messages
form.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent the form from submitting normally
    const message = messageInput.value;
    append(`You: ${message}`, 'right'); // Append your own message
    socket.emit('send', message); // Emit the send event
    messageInput.value = ''; // Clear the input field
});

// Listen for messages received from the server
socket.on('recieve', data => {
    append(`${data.name}: ${data.message}`, 'left');
});

// console.log(socket)
console.log(socket.broadcast)