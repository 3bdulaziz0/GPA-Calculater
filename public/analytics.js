// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBjmenyrHQGYCv0IrWv0qBO4Qs6OrSyg-4",
    authDomain: "calc-my-gpa.firebaseapp.com",
    projectId: "calc-my-gpa",
    storageBucket: "calc-my-gpa.firebasestorage.app",
    messagingSenderId: "160025268052",
    appId: "1:160025268052:web:fc046c4f9e14a8f7ce02c1",
    measurementId: "G-SFH7V0Y401"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);