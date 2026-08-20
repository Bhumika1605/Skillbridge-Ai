import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD6O542VFOo4AO9Wl6Up-v5kBIo4FQkx9A",
  authDomain: "bhumika-main.firebaseapp.com",
  projectId: "bhumika-main",
  storageBucket: "bhumika-main.firebasestorage.app",
  messagingSenderId: "636563116973",
  appId: "1:636563116973:web:898e0f59127e72c6980724",
  measurementId: "G-EMCX303V65",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;