// CONFIGURACION QUE SOLO ES PARA CONECTARTSE

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDY4F2lLaLiTFfbZxTEOklPqUEKQwCaep0",
  authDomain: "react-cursos-61ccc.firebaseapp.com",
  projectId: "react-cursos-61ccc",
  storageBucket: "react-cursos-61ccc.appspot.com",
  messagingSenderId: "447855870928",
  appId: "1:447855870928:web:43d03d208f82f873752fd5"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);

// AQUI VIENEN TODAS LAS FUNCIONALIDADES DE AUTENTICACION
export const FirebaseAuth = getAuth( FirebaseApp );

// CONFIGURACION DE MI BASE DE DATOS
export const FirebaseDB = getFirestore( FirebaseApp );