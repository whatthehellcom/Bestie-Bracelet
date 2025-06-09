// app.js

// Import Firebase SDK functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getDatabase, ref, push, onChildAdded } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDBAQ0YqtmARCjQBc5T2cjxmIRcDvLyUl0",
  authDomain: "fir-configjs-c9f1f.firebaseapp.com",
  projectId: "fir-configjs-c9f1f",
  storageBucket: "fir-configjs-c9f1f.appspot.com",
  messagingSenderId: "28654546902",
  appId: "1:28654546902:web:5ec04fb4a93900483d7e77",
  measurementId: "G-7T6WLXSE0N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// DOM elements
const messageBox = document.getElementById('message-box');
const messageInput = document.getElementById('message-input');
const sendBtn = document.getElementById('send-btn');

// Send message function (also used by preset buttons)
export function sendMessage(text) {
  let message = text || messageInput.value.trim();
  if (message.length === 0) return;

  // Push message to Firebase Realtime Database
  push(ref(database, 'messages'), {
    text: message,
    timestamp: Date.now()
  });

  messageInput.value = '';
}

// Listen for new messages from Firebase
onChildAdded(ref(database, 'messages'), (data) => {
  const msg = data.val();
  displayMessage(msg.text);
});

// Display message on the chat
function displayMessage(text) {
  messageBox.textContent = text;
}

// Attach event listener to send button
sendBtn.addEventListener('click', () => {
  sendMessage();
});

// Make sendPresetMessage global for inline HTML calls
window.sendPresetMessage = sendMessage;
