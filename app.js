// app.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getDatabase, ref, push, onChildAdded } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyDBAQ0YqtmARCjQBc5T2cjxmIRcDvLyUl0",
  authDomain: "fir-configjs-c9f1f.firebaseapp.com",
  projectId: "fir-configjs-c9f1f",
  storageBucket: "fir-configjs-c9f1f.appspot.com",
  messagingSenderId: "28654546902",
  appId: "1:28654546902:web:5ec04fb4a93900483d7e77",
  measurementId: "G-7T6WLXSE0N",
  databaseURL: "https://fir-configjs-c9f1f-default-rtdb.firebaseio.com"
};

// Init Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Send Message
window.sendMessage = function (msgText) {
  const input = document.getElementById("message-input");
  const message = msgText || input.value;
  if (message.trim() === "") return;
  push(ref(db, "messages"), {
    text: message,
    timestamp: Date.now()
  });
  input.value = "";
};

// Listen for Messages
const messageBox = document.getElementById("message-box");
onChildAdded(ref(db, "messages"), (snapshot) => {
  const msg = snapshot.val();
  const msgDiv = document.createElement("div");
  msgDiv.textContent = msg.text;
  msgDiv.className = "message";
  messageBox.appendChild(msgDiv);
});
