// lib/firebaseAdmin.ts
import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

// 1️⃣ Ensure env variable exists
if (!process.env.FIREBASE_SERVICE_ACCOUNT) {
  throw new Error(
    "❌ FIREBASE_SERVICE_ACCOUNT_BASE64 is missing in .env.local"
  );
}

// 2️⃣ Decode the Base64 string
const decoded = Buffer.from(
  process.env.FIREBASE_SERVICE_ACCOUNT,
  "base64"
).toString("utf-8");

// 3️⃣ Parse it into JSON
const serviceAccount = JSON.parse(decoded);

// 4️⃣ Initialize Firebase Admin (once)
if (!getApps().length) {
  initializeApp({
    credential: cert(serviceAccount),
  });
}

// 5️⃣ Export the admin auth instance
export const adminAuth = getAuth();
