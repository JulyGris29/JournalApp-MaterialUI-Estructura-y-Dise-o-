// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
import { getEnvironments } from '../helpers/getEnvironments';


const {
VITE_APIKEY,
VITE_AUTHDOMAIN,
VITE_PROJECTID,
VITE_STORAGEBUCKET,
VITE_MESSAGINGSENDERID,
VITE_APPID,
VITE_MEASUREMENTID,
  
} = getEnvironments();

// console.log(process.env);
// console.log( import.meta.env);

//Dev/Prod
// const firebaseConfig = {
  // apiKey: "AIzaSyBH7qLkIQS-HxmvLFzoci_cEC6bXfNR5ic",
  // authDomain: "react-cursos-f4f4b.firebaseapp.com",
  // projectId: "react-cursos-f4f4b",
  // storageBucket: "react-cursos-f4f4b.appspot.com",
  // messagingSenderId: "947208846477",
  // appId: "1:947208846477:web:4e77279f26680f7852f6c4"
// };

//Testing
// const firebaseConfig = {
//   apiKey: "AIzaSyC-yu0YsO7E1W0x-NEW4HvYhLP6CSjqteg",
//   authDomain: "testing-c141c.firebaseapp.com",
//   projectId: "testing-c141c",
//   storageBucket: "testing-c141c.appspot.com",
//   messagingSenderId: "21731311163",
//   appId: "1:21731311163:web:cb495d2afbb627a0f0261e",
//   measurementId: "G-HK4473PDDL"
// };

const firebaseConfig = {
    apiKey: VITE_APIKEY,
    authDomain: VITE_AUTHDOMAIN,
    projectId: VITE_PROJECTID,
    storageBucket: VITE_STORAGEBUCKET,
    messagingSenderId: VITE_MESSAGINGSENDERID,
    appId: VITE_APPID,
    measurementId: VITE_MEASUREMENTID,
  };
console.log(firebaseConfig)

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth( FirebaseApp );
export const FirebaseDB = getFirestore( FirebaseApp );

