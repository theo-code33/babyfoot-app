import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const isProd = process.env.REACT_APP_PROD === "production";

const firebaseConfig = {
  apiKey: isProd ? process.env.REACT_APP_API_KEY_PROD : process.env.REACT_APP_API_KEY,
  authDomain: isProd ? process.env.REACT_APP_AUTH_DOMAIN_PROD : process.env.REACT_APP_AUTH_DOMAIN,
  projectId: isProd ? process.env.REACT_APP_PROJECT_ID_PROD : process.env.REACT_APP_PROJECT_ID,
  storageBucket: isProd ? process.env.REACT_APP_STORAGE_BUCKET_PROD : process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: isProd ? process.env.REACT_APP_MESSAGING_SENDER_ID_PROD : process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: isProd ? process.env.REACT_APP_APP_ID_PROD : process.env.REACT_APP_APP_ID,
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const storage = getStorage(app);

export { app, db, storage };
