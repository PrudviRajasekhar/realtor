// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDe0ETpNjFaZmMQtjmx2-9lAbPyl7sgCjg",
  authDomain: "realtor-react-f0587.firebaseapp.com",
  projectId: "realtor-react-f0587",
  storageBucket: "realtor-react-f0587.appspot.com",
  messagingSenderId: "590979324870",
  appId: "1:590979324870:web:c33d01efc8c0c20f34b0c7"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore()