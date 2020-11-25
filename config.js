import firebase from 'firebase'; 
import '@firebase/firestore'; 
// Required for side-effects 
require("firebase/firestore");

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCyxrRncEl9js615srnbYRGlAv4ZVjJyDQ",
    authDomain: "bartertech-8853a.firebaseapp.com",
    databaseURL: "https://bartertech-8853a.firebaseio.com",
    projectId: "bartertech-8853a",
    storageBucket: "bartertech-8853a.appspot.com",
    messagingSenderId: "718765145645",
    appId: "1:718765145645:web:ed7151b02d7f14f961c2a4"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
if (!firebase.apps.length) {
    firebase.initializeApp({});
}
//export default firebase.database() 
var db = firebase.firestore(); 
export default db;