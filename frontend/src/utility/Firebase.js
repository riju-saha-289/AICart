
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "aicart-db012.firebaseapp.com",
  projectId: "aicart-db012",
  storageBucket: "aicart-db012.firebasestorage.app",
  messagingSenderId: "367902287698",
  appId: "1:367902287698:web:31adf605b5746e6b81bc8b"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account"
});

export { auth, googleProvider,};


