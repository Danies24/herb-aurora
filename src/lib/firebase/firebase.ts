import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier } from "firebase/auth";
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASYREMENT_ID,
};
console.log(
  "FIREBASE_API_KEY",
  process.env.FIREBASE_API_KEY,
  firebaseConfig.authDomain,
  firebaseConfig.appId,
  firebaseConfig.projectId,
  firebaseConfig.apiKey,
  firebaseConfig.storageBucket,
  firebaseConfig.measurementId
);

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { auth, RecaptchaVerifier };
