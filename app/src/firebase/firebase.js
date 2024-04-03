// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';

// import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
// import { getFirestore } from 'firebase/firestore';
// import AsyncStorage from '@react-native-async-storage/async-storage'; // Assurez-vous d'importer AsyncStorage

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBP0GcAQvvz9FBuoXzBsG65hjMCKOIcvUo",
  authDomain: "h-7201c.firebaseapp.com",
  databaseURL: "https://h-7201c-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "h-7201c",
  storageBucket: "h-7201c.appspot.com",
  messagingSenderId: "809695204683",
  appId: "1:809695204683:web:76e8a3564f1c5e5fcc44ce",
  measurementId: "G-XZ6652VLZM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);

export { app, auth, analytics }