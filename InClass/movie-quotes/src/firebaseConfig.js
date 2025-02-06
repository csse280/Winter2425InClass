import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
  apiKey: "AIzaSyD5GmmSz9dcYDcgC7AdI0zqAJVEm8WOYx8",
  authDomain: "fisherds-movie-quotes-2025.firebaseapp.com",
  projectId: "fisherds-movie-quotes-2025",
  storageBucket: "fisherds-movie-quotes-2025.firebasestorage.app",
  messagingSenderId: "384313753084",
  appId: "1:384313753084:web:0ae6889b99ddcce1c60679",
  measurementId: "G-VM4XNKQCVK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export { db };