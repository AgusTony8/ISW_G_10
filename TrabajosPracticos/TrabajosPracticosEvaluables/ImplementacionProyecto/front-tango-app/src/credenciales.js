// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBwuGSqUrqsLNvnI2xMeTmNyfmJuDA5mVM",
    authDomain: "tango-app-16021.firebaseapp.com",
    projectId: "tango-app-16021",
    storageBucket: "tango-app-16021.appspot.com",
    messagingSenderId: "158499313384",
    appId: "1:158499313384:web:7d2626aa0c9e83d76d9b5d"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);

export default appFirebase;