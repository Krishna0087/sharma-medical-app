import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

const firebaseConfig = {
  apiKey: "AIzaSyAn7VQ39SFDxcRGuav2uM8hkPj5Z-5rXCE",
  authDomain: "jay-bhavani-medical.firebaseapp.com",
  projectId: "jay-bhavani-medical",
  storageBucket: "jay-bhavani-medical.firebasestorage.app",
  messagingSenderId: "946234447721",
  appId: "1:946234447721:web:e26f61b98c8b6f27888ff8"
};

const app = initializeApp(firebaseConfig);

export { app };
