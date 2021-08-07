import firebase from "firebase";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBxJXHflsdQWHtdaNioumqyd_LDX3CbDXk",
    authDomain: "realalbum-d8dd5.firebaseapp.com",
    databaseURL: "https://realalbum-d8dd5-default-rtdb.firebaseio.com",
    projectId: "realalbum-d8dd5",
    storageBucket: "realalbum-d8dd5.appspot.com",
    messagingSenderId: "404908872506",
    appId: "1:404908872506:web:90784ae2dbad99c2293603",
    measurementId: "G-CGLRQ3XTGF"
  };
// firebase Realtime Database(게시판) 그리고 Cloud Firestore 둘 다 사용하려다 에러 발생 "[Firebase] Firebase App named '[DEFAULT]' already exists 에러"
// firebase.initialize 를 두번 사용해서 앞서 사용했던 DB참조를 초기화시키기 때문.
// if (!firebase.apps.length) {
//     firebase.initializeApp(firebaseConfig);
// } else {
//     firebase.app();
// }
    firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();
const app = firebase.firestore();

// export { storage, app };
export default firebase;