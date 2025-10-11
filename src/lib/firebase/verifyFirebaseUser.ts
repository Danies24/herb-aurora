// src/lib/verifyFirebaseUser.ts
import { adminAuth } from "@/lib/firebase/firebaseAdmin";

export async function verifyFirebaseUser(req: Request) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    throw new Error("Missing or invalid authorization header");
  }

  const idToken = authHeader.split("Bearer ")[1];
  const decoded = await adminAuth.verifyIdToken(idToken);
  return decoded.uid;
}
