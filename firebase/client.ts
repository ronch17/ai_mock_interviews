// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB4ofpriRFut15Y82QeA6tOZ26odbUyBCs",
    authDomain: "prepwise-3c3a2.firebaseapp.com",
    projectId: "prepwise-3c3a2",
    storageBucket: "prepwise-3c3a2.firebasestorage.app",
    messagingSenderId: "488095720247",
    appId: "1:488095720247:web:48278a2c9065b8153870b2",
    measurementId: "G-CHRFTTFKMF"
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);