// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey:"",
    authDomain:"",
    projectId:"",
    storageBucket:"",
    messagingSenderId:"",
    appId:"",
  };


const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
