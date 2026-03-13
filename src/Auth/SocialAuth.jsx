import React from "react";
import { useNavigate } from "react-router-dom";

const GOOGLE_LOGIN_URL = "https://buyzaar.infinityfreeapp.com/wp-login.php?loginSocial=google";

export default function SocialAuth() {
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    window.location.href = GOOGLE_LOGIN_URL;
  };

  return (
    <div className="flex flex-col items-center mt-4">
      <button
        onClick={handleGoogleLogin}
        className="flex items-center gap-2 bg-white border border-gray-300 rounded-lg px-6 py-3 shadow-sm hover:bg-gray-50 transition"
      >
        <img
          src="https://developers.google.com/identity/images/g-logo.png"
          alt="Google logo"
          className="w-5 h-5"
        />
        <span className="text-gray-700 font-medium">Continue with Google</span>
      </button>
    </div>
  );
}
