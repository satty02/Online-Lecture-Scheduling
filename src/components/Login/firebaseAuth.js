import { initializeApp } from 'firebase/app';
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyBiXQJKOyMRcRzxztVnofTW8Ab-MY5n2Jk",
    authDomain: "lecturescheduling-16ce1.firebaseapp.com",
    projectId: "lecturescheduling-16ce1",
    storageBucket: "lecturescheduling-16ce1.appspot.com",
    messagingSenderId: "158015871565",
    appId: "1:158015871565:web:58744e7971ed203bac9a04",
    measurementId: "G-K4QHHBTN64"
}

const app = initializeApp(firebaseConfig);

 const auth = getAuth(app);

 export {auth, app as default}