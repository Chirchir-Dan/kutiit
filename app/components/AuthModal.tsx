"use client";

import { useState } from "react";
import { supabaseBrowserClient } from "@/lib/supabaseClient";
import { useToast } from "@/app/components/Toast";

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
}

export default function AuthModal({ open, onClose }: AuthModalProps) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { showToast } = useToast();

  if (!open) return null;

  const handleSubmit = async () => {
    console.log("➡️ SUBMIT CLICKED", { email, name, isSignup });

    setErrorMessage("");

    if (!email.trim()) {
      setErrorMessage("Please enter your email.");
      return;
    }

    if (isSignup && !name.trim()) {
      setErrorMessage("Please enter your name.");
      return;
    }

    setIsLoading(true);

    const { error } = await supabaseBrowserClient.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: isSignup,
        data: isSignup ? { full_name: name.trim() } : undefined,
        emailRedirectTo: `${window.location.origin}/`,
      },
    });

    setIsLoading(false);

    console.log("➡️ SUPABASE ERROR:", error);

    if (error) {
      const raw = (
        (error as any)?.error_description ||
        (error as any)?.details ||
        error.message ||
        ""
      )
        .toString()
        .toLowerCase();

      console.log("🔥 RAW ERROR:", raw);

      // LOGIN → user does not exist → switch to signup
      if (
        !isSignup &&
        (
          raw.includes("user not found") ||
          raw.includes("signups not allowed") ||
          raw.includes("signup not allowed") ||
          raw.includes("signups not allowed for otp")
        )
      ) {
        showToast("No account found. Please create one.", "error");
        setIsSignup(true);
        return;
      }

      // SIGNUP → missing name metadata
      if (isSignup && raw.includes("full_name")) {
        setErrorMessage("Please enter your name.");
        return;
      }

      // fallback
      setErrorMessage(error.message);
      showToast(error.message, "error");
      return;
    }

    showToast(
      isSignup
        ? "Check your inbox to finish creating your account."
        : "Check your inbox to sign in.",
      "success"
    );

    onClose();
  };

  return (
    <div className="text-white fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-black border border-red-600 rounded-lg p-6 w-full max-w-md relative">

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 hover:text-red-400 transition"
        >
          ✕
        </button>

        {/* Title */}
        <h2 className="text-xl font-bold mb-2 text-green-400">
          {isSignup ? "Create account" : "Log in"}
        </h2>

        <p className="text-sm text-white mb-4">
          {isSignup
            ? "Enter your details to create your account."
            : "Enter your email to receive a sign‑in link."}
        </p>

        {/* Name field */}
        {isSignup && (
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-black border border-green-600 rounded px-3 py-2 text-white mb-3 focus:border-green-400 outline-none transition"
          />
        )}

        {/* Email field */}
        <input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-black border border-green-600 rounded px-3 py-2 text-white mb-3 focus:border-green-400 outline-none transition"
        />

        {/* Error message */}
        {errorMessage && (
          <p className="text-red-400 text-sm mb-3">{errorMessage}</p>
        )}

        {/* Submit button */}
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className={`w-full py-2 rounded-md transition ${
            isLoading
              ? "bg-green-800 text-gray-300 cursor-not-allowed"
              : "bg-green-600 text-white hover:bg-green-700"
          }`}
        >
          {isLoading
            ? "Sending link..."
            : isSignup
            ? "Create account"
            : "Continue with Email"}
        </button>

        {/* Divider */}
        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-red-600"></div>
          <span className="mx-3 text-sm text-gray-400">or</span>
          <div className="flex-grow border-t border-red-600"></div>
        </div>

        {/* Facebook */}
        <button
          onClick={() => {
            showToast("Redirecting to Facebook…", "success");
            supabaseBrowserClient.auth.signInWithOAuth({
              provider: "facebook",
              options: { redirectTo: `${window.location.origin}/` },
            });
          }}
          className="w-full py-2 rounded-md font-medium transition-colors"
          style={{ backgroundColor: "#1877F2", color: "white" }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#166FE5")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#054597")}
        >
          Continue with Facebook
        </button>

        {/* Switch mode */}
        <div className="mt-4 text-sm text-gray-300 text-center">
          {isSignup ? (
            <>
              Already have an account?{" "}
              <button
                className="text-green-400 hover:underline"
                onClick={() => {
                  console.log("➡️ Switching to LOGIN mode");
                  setIsSignup(false);
                  setErrorMessage("");
                }}
              >
                Log in
              </button>
            </>
          ) : (
            <>
              No account yet?{" "}
              <button
                className="text-green-400 hover:underline"
                onClick={() => {
                  console.log("➡️ Switching to SIGNUP mode");
                  setIsSignup(true);
                  setErrorMessage("");
                }}
              >
                Create one
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
