import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDdpbPGQX6K4C4UdXGPDMCIeeG5l0bxXrs",
  authDomain: "react-blogs-app-928d7.firebaseapp.com",
  projectId: "react-blogs-app-928d7",
  storageBucket: "react-blogs-app-928d7.appspot.com",
  messagingSenderId: "398186326638",
  appId: "1:398186326638:web:885db326705e7e57b8947f"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
