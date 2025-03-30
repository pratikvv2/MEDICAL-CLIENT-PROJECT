// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import { getStorage } from "firebase/storage";




 
  let  firebaseConfig = {
       apiKey: "AIzaSyCLwv3qliyb_sWF7HAhc6mfu0d4zRcEki8",
        authDomain: "ivhydration-test.firebaseapp.com",
        projectId: "ivhydration-test",
        storageBucket: "ivhydration-test.appspot.com",
        messagingSenderId: "277137861012",
        appId: "1:277137861012:web:41a5b572c1c8b27c734781"
    };


// Initialize Firebase
const APP = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
const FIRESTORE = getFirestore(APP);
// const STORAGE = getStorage(APP);
const AUTH = getAuth(APP);


export {
    APP,
    FIRESTORE,
    // STORAGE,
    AUTH
}
