import { useEffect, useState } from "react";
import { isAndroid, isIOS } from "react-device-detect";

export default function Download() {
  const ANDROID_LINK =
    "https://play.google.com/store/apps/details?id=com.afriam.daf";
  const IOS_LINK =
    "https://apps.apple.com/us/app/diaspora-african-forum-app/id6759292158";

  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => Math.max(0, prev - 1));
    }, 1000);

    const redirectTimer = setTimeout(() => {
      if (isAndroid) window.location.href = ANDROID_LINK;
      if (isIOS) window.location.href = IOS_LINK;
    }, 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(redirectTimer);
    };
  }, []);

  return (
    <div className="min-h-screen relative flex items-center justify-center px-6 py-12 bg-gradient-to-br from-indigo-50 via-white to-purple-50 overflow-hidden">

      {/* Animated Gradient Blobs */}
      <div className="absolute w-96 h-96 bg-purple-300 opacity-30 rounded-full blur-3xl -top-20 -left-20 animate-pulse"></div>
      <div className="absolute w-96 h-96 bg-indigo-300 opacity-30 rounded-full blur-3xl -bottom-20 -right-20 animate-pulse"></div>

      {/* Main Card */}
      <div className="relative z-10 max-w-6xl w-full bg-white/80 backdrop-blur-lg shadow-2xl rounded-3xl border border-white/30 p-8 md:p-14 flex flex-col md:flex-row items-center gap-12">

        {/* LEFT SIDE */}
        <div className="flex-1 text-center md:text-left">

          {/* Logo */}
          <div className="flex justify-center md:justify-start mb-6">
            <img
              src="/assets/app_logo.jpg"
              alt="DAF Logo"
              className="w-24 h-24 rounded-2xl shadow-lg"
            />
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight mb-5">
            Connect with Africans
            <br />
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Across the World
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto md:mx-0">
            The Diaspora African Forum app connects Africans globally.
            Network, share ideas, discover opportunities and stay informed.
          </p>

          {/* Store Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">

            <a
              href={ANDROID_LINK}
              className="flex items-center justify-center text-white rounded-xl hover:scale-105 transition shadow-md"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                alt="Google Play"
                className="h-16"
              />
            </a>

            <a
              href={IOS_LINK}
              className="flex items-center justify-center text-white rounded-xl hover:scale-105 transition shadow-md"
            >
              <img
                src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                alt="App Store"
                className="h-16"
              />
            </a>
          </div>

          {/* Countdown */}
          {(isAndroid || isIOS) && (
            <div className="mt-6 flex items-center justify-center md:justify-start gap-2 text-sm text-gray-500">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
              Redirecting to your app store in{" "}
              <span className="font-semibold text-indigo-600">
                {countdown}
              </span>{" "}
              seconds...
            </div>
          )}

          {/* Footer Note */}
          <p className="text-xs text-gray-400 mt-8">
            Available for Android and iOS devices
          </p>
        </div>

        {/* RIGHT SIDE (PHONE MOCKUP) */}
        <div className="flex-1 flex justify-center">

          <div className="relative -mt-10">

            {/* Glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-400 to-purple-400 blur-2xl opacity-20 rounded-3xl"></div>

            {/* Screenshot */}
            <img
              src="/assets/app_screenshot.png"
              alt="DAF App Screenshot"
              className="relative w-64 md:w-80 lg:w-[500px] rounded-3xl hover:scale-105 transition duration-300"
            />

          </div>

        </div>

      </div>
    </div>
  );
}