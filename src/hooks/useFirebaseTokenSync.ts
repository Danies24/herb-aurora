import { useEffect, useState } from "react";
import { onIdTokenChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setCredentials, logout } from "@/redux/slices/authSlice";
import toast from "react-hot-toast";
import { auth } from "@/lib/firebase/firebase";

export function useFirebaseTokenSync() {
  const dispatch = useDispatch();
  const [firebaseReady, setFirebaseReady] = useState(false);

  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, async (user) => {
      if (user) {
        try {
          const freshToken = await user.getIdToken();
          dispatch(
            setCredentials({
              user: {
                firebaseUid: user.uid,
                fullName: "",
                phone: user.phoneNumber || "",
              },
              token: freshToken,
            })
          );
        } catch (err) {
          console.error("Token refresh failed:", err);
          toast.error("Token refresh failed, please log in again.");
          dispatch(logout());
        }
      } else {
        dispatch(logout());
      }

      // ✅ Firebase session restoration completed (either user or null)
      setFirebaseReady(true);
    });

    return () => unsubscribe();
  }, [dispatch]);

  return firebaseReady;
}
