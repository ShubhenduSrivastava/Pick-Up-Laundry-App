
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"; 
import {getFirestore} from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDhXReXmc6oKGhOlii_bZzxdCRoYXnFgNM",
  authDomain: "laundry-application-2997d.firebaseapp.com",
  projectId: "laundry-application-2997d",
  storageBucket: "laundry-application-2997d.appspot.com",
  messagingSenderId: "265774791884",
  appId: "1:265774791884:web:5de05d00bdedbed87c9669",
  measurementId: "G-MZL20P40VG"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore();

export {auth, db};