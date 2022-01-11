import firebase from "firebase";

var firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBXreqJ9UOXGS3IH3OKwOwcZ1ISG-y90hs",
  authDomain: "cataract-analyzer-rtdb.firebaseapp.com",
  databaseURL: "https://cataract-analyzer-rtdb-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "cataract-analyzer-rtdb",
  storageBucket: "cataract-analyzer-rtdb.appspot.com",
  messagingSenderId: "1054861562940",
  appId: "1:1054861562940:web:9905eab5630103de6a9f39",
  measurementId: "G-6G1ZMYM1PP"
});

var db = firebaseApp.firestore();

export { db };
