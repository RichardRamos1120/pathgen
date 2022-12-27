import { redirect } from '@sveltejs/kit';
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword,onAuthStateChanged,signOut} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyCn_6_Tjhu2dfg5KHawrMb1Vhn7Ts74wOU",
	authDomain: "pathgen-7eec6.firebaseapp.com",
	projectId: "pathgen-7eec6",
	storageBucket: "pathgen-7eec6.appspot.com",
	messagingSenderId: "407468014931",
	appId: "1:407468014931:web:3a0e3433688eea1659b5a6"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();


