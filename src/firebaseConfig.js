import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, GithubAuthProvider, signInWithPopup ,signInWithRedirect} from "firebase/auth";

// Your Firebase config (Replace with your actual Firebase credentials)
const firebaseConfig = {
    apiKey: "AIzaSyCVOYEjbIMtxd_VFOObEIsKrIFkOVI-9TA",
    authDomain: "miniproject-f8865.firebaseapp.com",
    projectId: "miniproject-f8865",
    storageBucket: "miniproject-f8865.firebasestorage.app",
    messagingSenderId: "372232351862",
    appId: "1:372232351862:web:ac267ad5c66c387563af57",
    measurementId: "G-YSWDQH7Z57"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Providers for Google & GitHub
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

export { auth, googleProvider, githubProvider, signInWithPopup ,signInWithRedirect};
