// Firebase config
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
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// Send a message
function sendMessage(customMessage) {
  const msg = customMessage || document.getElementById("message-input").value;
  if (!msg.trim()) return;

  db.ref("messages").push({
    text: msg,
    time: Date.now()
  });

  document.getElementById("message-input").value = "";
}

// Listen for new messages
db.ref("messages").on("child_added", (snapshot) => {
  const msg = snapshot.val().text;
  document.getElementById("message-box").innerText = `📨 New: ${msg}`;
});

