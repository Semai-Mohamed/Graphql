const { io } = require("socket.io-client");

const URL = "http://localhost:3001/freelance-chat";

// --- Client 1 (The Receiver) ---
// This client will be 'freelancer1'
const freelancerSocket = io(URL);

freelancerSocket.on('connect', () => {
    console.log(`✅ RECEIVER connected with id: ${freelancerSocket.id}`);
    // Join the room with its own name to receive messages
    freelancerSocket.emit('joinRoom', 'freelancer1');
    console.log(`[Receiver] Joined room: freelancer1`);
});

// Listen for messages
freelancerSocket.on('receiveMessage', (data) => {
    console.log(`✅✅✅ MESSAGE RECEIVED by freelancer1:`, data);
    // Clean up after test
    freelancerSocket.disconnect();
    clientSocket.disconnect();
});


// --- Client 2 (The Sender) ---
// This client will be 'client1'
const clientSocket = io(URL);

clientSocket.on('connect', () => {
    console.log(`✅ SENDER connected with id: ${clientSocket.id}`);
    // Join its own room
    clientSocket.emit('joinRoom', 'client1');
    console.log(`[Sender] Joined room: client1`);

    // Wait 2 seconds, then send a message TO 'freelancer1'
    setTimeout(() => {
        const payload = {
            from: "client1",
            to: "freelancer1",
            message: "Hello from the test script!"
        };
        console.log(`\n🚀 [Sender] Sending message to 'freelancer1'...`);
        clientSocket.emit('sendMessage', payload);
    }, 2000);
});