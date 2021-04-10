import firebase from 'firebase'
const firebaseConfig = {
    apiKey: "AIzaSyB7Rc6oXABOf-l5_os3TWVOM19p6tcjK90",
    authDomain: "striped-torus-309508.firebaseapp.com",
    databaseURL: "https://striped-torus-309508-default-rtdb.firebaseio.com",
    projectId: "striped-torus-309508",
    storageBucket: "striped-torus-309508.appspot.com",
    messagingSenderId: "1042883046569",
    appId: "1:1042883046569:web:904697ab31341a41f10db8",
    measurementId: "G-D1YMCBT73M"
  };
 const DB = firebase.initializeApp(firebaseConfig);
export default DB;