// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBnT9-1BStf384ih6Wy37nbShLaAOsRZoQ",
  authDomain: "pantry-tracking-a511a.firebaseapp.com",
  projectId: "pantry-tracking-a511a",
  storageBucket: "pantry-tracking-a511a.appspot.com",
  messagingSenderId: "969109937074",
  appId: "1:969109937074:web:3a4863620636ff01eb62ab",
  measurementId: "G-8HNG0NTESF",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const firestore = getFirestore(app);

export { firestore };
