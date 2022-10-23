import firebase from "firebase/compat/app";
import "firebase/compat/auth";

// const firebaseConfig = {
//   apiKey: "AIzaSyC6J388mYZhs8qewfXbvGGyCH4-UrduNcE",
//   authDomain: "appchat-otp.firebaseapp.com",
//   projectId: "appchat-otp",
//   storageBucket: "appchat-otp.appspot.com",
//   messagingSenderId: "1062020832907",
//   appId: "1:1062020832907:web:f3ae90cb4274835ee07e8e",
// };


const firebaseConfig = {
  apiKey: "AIzaSyCtjU0vSMETMtuBD5jI8DLPJmo4JJJwy6U",
  authDomain: "appchat-otp-9b355.firebaseapp.com",
  projectId: "appchat-otp-9b355",
  storageBucket: "appchat-otp-9b355.appspot.com",
  messagingSenderId: "640110285312",
  appId: "1:640110285312:web:601e9f23abcf000ee07ee5"
};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);


export default firebase;
