"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  closeLogin,
  openCart,
  resetAuthRedirect,
} from "@/redux/slices/uiSlice";
import { useState } from "react";
import { X } from "lucide-react";
import toast from "react-hot-toast";
import { auth } from "@/lib/firebase/firebase";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult,
} from "firebase/auth";
import { setCredentials } from "@/redux/slices/authSlice";
import { useRouter } from "next/navigation";
import { syncCartAfterLogin } from "@/lib/mergeCart";
import { handleClientError } from "@/utlls/handleError";

export default function LoginModal() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isLoginOpen, authRedirect } = useSelector(
    (state: RootState) => state.ui
  );
  const [step, setStep] = useState<"mobile" | "otp" | "register">("mobile");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [idToken, setIdToken] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    fullName: "",
    line1: "",
    line2: "",
    pincode: "",
    city: "",
    state: "",
  });

  const [confirmationResult, setConfirmationResult] =
    useState<ConfirmationResult | null>(null);

  const handlePostLoginRedirect = () => {
    if (authRedirect === "profile") {
      router.push("/profile");
    } else if (authRedirect === "checkout") {
      dispatch(openCart());
    }
    dispatch(resetAuthRedirect());
  };

  // --- 🔹 Send OTP ---
  const handleSendOtp = async () => {
    if (mobile.length !== 10) return toast.error("Enter a valid mobile number");
    try {
      setLoading(true);
      const fullPhone = "+91" + mobile;

      // setup invisible recaptcha
      const verifier = new RecaptchaVerifier(auth, "recaptcha-container", {
        size: "invisible",
      });
      await verifier.render();

      const confirmation = await signInWithPhoneNumber(
        auth,
        fullPhone,
        verifier
      );
      setConfirmationResult(confirmation);

      toast.success("OTP sent successfully ✨");
      setStep("otp");
    } catch (e: any) {
      console.error(e);
      if (e?.code === "auth/invalid-phone-number")
        toast.error("Invalid phone number format");
      else if (e?.code === "auth/quota-exceeded")
        toast.error("SMS quota exceeded, try again later");
      else toast.error("Failed to send OTP. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // --- 🔹 Verify OTP ---
  const handleVerifyOtp = async () => {
    if (otp.length !== 6) return toast.error("Enter 6-digit OTP");

    try {
      setLoading(true);
      await confirmationResult?.confirm(otp);

      const user = auth.currentUser;
      if (!user) throw new Error("No authenticated user found");
      const token = await user.getIdToken();
      setIdToken(token);
      const res = await fetch("/api/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken: token }),
      });
      const data = await res.json();
      console.log("data", data);

      if (data?.isNew) {
        toast("New user — please complete your profile 🌿");
        setStep("register");
      } else {
        toast.success("Welcome back 🌿");
        dispatch(
          setCredentials({
            user: {
              firebaseUid: user.uid,
              ...data.profile,
            },
            token,
          })
        );
        dispatch(closeLogin());
        await syncCartAfterLogin(token);
        handlePostLoginRedirect();
      }
    } catch (e) {
      console.error(e);
      toast.error("Invalid or expired OTP. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const saveRegistration = async () => {
    if (!idToken) return toast.error("Session expired, please login again");

    const { fullName, line1, line2, pincode } = formData;
    if (!fullName || !line1 || !line2 || !pincode)
      return toast.error("Please fill all required fields");

    try {
      setLoading(true);

      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to register user");

      toast.success("Profile saved successfully ✨");
      dispatch(setCredentials({ user: data.user, token: idToken }));
      dispatch(closeLogin());
      await syncCartAfterLogin(idToken);
      handlePostLoginRedirect();
    } catch (e: unknown) {
      handleClientError(e, "Failed to save profile");
    } finally {
      setLoading(false);
    }
    dispatch(closeLogin());
    toast.success("Profile saved successfully ✨");
  };

  return (
    <Dialog.Root open={isLoginOpen} onOpenChange={() => dispatch(closeLogin())}>
      <Dialog.Portal>
        {/* 🔹 Full blur overlay */}
        <Dialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-md z-[1100] transition-opacity duration-300" />

        {/* 🔹 Modal Card */}
        <Dialog.Content className="fixed z-[1200] left-1/2 top-1/2 w-[90%] max-w-md -translate-x-1/2 -translate-y-1/2 bg-white rounded-3xl shadow-xl p-6 md:p-8 focus:outline-none animate-in fade-in-50 duration-200">
          <button
            onClick={() => dispatch(closeLogin())}
            className="absolute top-8 right-8 p-1 rounded-full bg-herb-green hover:bg-herb-green-light text-white transition"
          >
            <X size={22} />
          </button>

          {/* Brand Section */}
          <Dialog.Title className="font-semibold text-lg md:text-xl text-herb-green mb-1">
            Welcome to Herb Aurora
          </Dialog.Title>
          <p className="text-sm text-herb-green-light mb-6">
            Where you feel the nature in your hands 🌿
          </p>

          {/* Step 1: Mobile Input */}
          {step === "mobile" && (
            <div className="space-y-5">
              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  placeholder="Enter your mobile number"
                  maxLength={10}
                  className="w-full border border-gray-300 rounded-xl px-3 py-2.5 text-gray-800 focus:ring-2 focus:ring-herb-green outline-none transition"
                />
              </div>

              <button
                onClick={handleSendOtp}
                disabled={loading}
                className={`w-full py-3 rounded-xl font-semibold text-white transition ${
                  loading
                    ? "bg-herb-green/70 cursor-not-allowed"
                    : "bg-herb-green hover:opacity-90"
                }`}
              >
                {loading ? "Sending..." : "Send OTP"}
              </button>

              {/* <div className="flex items-center justify-center gap-2 text-gray-400 text-sm">
                <span className="h-px bg-gray-200 w-1/4"></span>
                or
                <span className="h-px bg-gray-200 w-1/4"></span>
              </div> */}

              {/* Google Login */}
              {/* <button
                className="w-full py-3 rounded-xl border border-gray-300 flex items-center justify-center gap-2 hover:bg-gray-50 transition font-medium text-herb-green"
                onClick={() => toast("Google Login coming soon!")}
              >
                <img src="/google-icon.svg" alt="Google" className="w-5 h-5" />
                Login with Google
              </button> */}
            </div>
          )}

          {/* Step 2: OTP Verification */}
          {step === "otp" && (
            <div className="space-y-5">
              <p className="text-gray-700 text-sm">
                Enter OTP sent to{" "}
                <span className="font-medium text-herb-green">
                  +91 {mobile.slice(-4).padStart(10, "X")}
                </span>
              </p>

              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
                maxLength={6}
                className="w-full border border-gray-300 rounded-xl px-3 py-2.5 text-gray-800 focus:ring-2 focus:ring-herb-green outline-none transition"
              />

              <button
                onClick={handleVerifyOtp}
                disabled={loading}
                className={`w-full py-3 rounded-xl font-semibold text-white transition ${
                  loading
                    ? "bg-herb-green/70 cursor-not-allowed"
                    : "bg-herb-green hover:opacity-90"
                }`}
              >
                {loading ? "Verifying..." : "Verify & Continue"}
              </button>

              <button
                onClick={() => setStep("mobile")}
                className="text-sm text-herb-green-light hover:underline block mx-auto"
              >
                Edit mobile number
              </button>
            </div>
          )}

          {/* Step 3: User  Registration */}
          {step === "register" && (
            <div className="space-y-5">
              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  className="w-full border border-gray-300 rounded-xl px-3 py-2.5 text-gray-800 focus:ring-2 focus:ring-herb-green outline-none transition"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  value={mobile}
                  disabled
                  className="w-full border border-gray-200 bg-gray-100 rounded-xl px-3 py-2.5 text-gray-500 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Address Line 1
                </label>
                <input
                  type="text"
                  placeholder="House / Flat / Street name"
                  className="w-full border border-gray-300 rounded-xl px-3 py-2.5 text-gray-800 focus:ring-2 focus:ring-herb-green outline-none transition"
                  name="line1"
                  value={formData.line1}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Address Line 2
                </label>
                <input
                  type="text"
                  placeholder="Landmark / Area / City"
                  className="w-full border border-gray-300 rounded-xl px-3 py-2.5 text-gray-800 focus:ring-2 focus:ring-herb-green outline-none transition"
                  name="line2"
                  value={formData.line2}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Pincode
                </label>
                <input
                  type="text"
                  placeholder="Enter your area pincode"
                  maxLength={6}
                  className="w-full border border-gray-300 rounded-xl px-3 py-2.5 text-gray-800 focus:ring-2 focus:ring-herb-green outline-none transition"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleInputChange}
                />
              </div>

              <button
                onClick={saveRegistration}
                className="w-full py-3 rounded-xl font-semibold text-white bg-herb-green hover:opacity-90 transition"
              >
                Save
              </button>
            </div>
          )}

          {/* 🔹 Hidden reCAPTCHA div */}
          <div id="recaptcha-container"></div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
