"use client";

import { supabaseBrowserClient } from "@/lib/supabaseClient";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

export default function AuthModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;

  const loginWithFacebook = () => {
    supabaseBrowserClient.auth.signInWithOAuth({
      provider: "facebook",
      options: {
        redirectTo: `${window.location.origin}/`,
      },
    });
  };

  return (
    <div className="text-white fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-black border border-red-600 rounded-lg p-6 w-full max-w-md relative">

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 hover:text-red-400"
        >
          ✕
        </button>

        {/* Supabase Auth UI */}
        <Auth
          supabaseClient={supabaseBrowserClient}
          providers={[]}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: "#00870d",        // your green
                  brandAccent: "#00d82b",  // your bright green
                  inputBackground: "#111",
                  inputText: "#ffffff",

                  // ⭐ Improve readability
                  inputLabelText: "#03d418",
                  inputBorder: "#03d418",
                  inputBorderFocus: "#00ec18",

                  // ⭐ Make "Forgot password?" + "Sign up" readable
                  anchorTextColor: "#04ab15",
                  anchorTextHoverColor: "#00ec18",
                },
              },
            },
            className: {
              anchor: "text-green-400 hover:text-green-300 text-sm font-medium",
            },
          }}
        />

        {/* Divider */}
        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-red-600"></div>
          <span className="mx-3 text-sm">or</span>
          <div className="flex-grow border-t border-red-600"></div>
        </div>

        {/* Facebook login button */}
        <button
          onClick={loginWithFacebook}
          className="w-full py-2 rounded-md font-medium transition-colors"
          style={{
            backgroundColor: "#1877F2",
            color: "white",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#166FE5")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#054597")}
        >
          Continue with Facebook
        </button>
      </div>
    </div>
  );
}
