import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBNi2trIhgI0CJqk3drM7L_pnt3bAlPSwk",
    authDomain: "inferno-4289f.firebaseapp.com",
    projectId: "inferno-4289f",
    storageBucket: "inferno-4289f.appspot.com",
    messagingSenderId: "741420939196",
    appId: "1:741420939196:web:ac4523c13bae06ee9d5db9",
    measurementId: "G-10C1TQHLZW"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const firebase_AUTH = getAuth(app);

export { app, db, firebase_AUTH};