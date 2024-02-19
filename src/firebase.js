import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_API_KEY,
  authDomain: "shopping-list-d8c60.firebaseapp.com",
  projectId: "shopping-list-d8c60",
  storageBucket: "shopping-list-d8c60.appspot.com",
  messagingSenderId: "275771603898",
  appId: "1:275771603898:web:17f7a36ae5475ca0317b83"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
