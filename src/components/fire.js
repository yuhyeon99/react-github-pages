import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDeSjfXo9H27ahWWSQYpHoc-2wiJiG9apQ",
    authDomain: "crudtest-4d90b.firebaseapp.com",
    projectId: "crudtest-4d90b",
    storageBucket: "crudtest-4d90b.appspot.com",
    messagingSenderId: "289393287781",
    appId: "1:289393287781:web:23115b74af2c23ff57dc8c",
    measurementId: "G-HKTX50VR16"
  };

const fire = firebase.initializeApp(firebaseConfig);

export default firebase;