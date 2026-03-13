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
    }, 1000);

    return () => {
      clearInterval(interval);
      clearTimeout(redirectTimer);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 relative overflow-hidden py-20 lg:py-0">

      {/* Background Glow */}
      <div className="absolute w-[700px] h-[700px] bg-purple-300 opacity-30 rounded-full blur-3xl -top-40 -left-40"></div>
      <div className="absolute w-[700px] h-[700px] bg-indigo-300 opacity-30 rounded-full blur-3xl -bottom-40 -right-40"></div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10 min-h-screen flex items-center">

        <div className="grid lg:grid-cols-2 gap-12 items-center w-full">

          {/* LEFT SIDE */}
          <div>

            {/* Logo */}
            <div className="flex items-center gap-4 mb-10">
              <img
                src="/assets/app_logo.jpg"
                alt="DAF Logo"
                className="size-28 rounded-xl shadow-md"
              />
              <span className="text-2xl font-semibold text-gray-700">
                Diaspora African<br/> Forum
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight text-gray-900">
              Connecting the
              <span className="block bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                African Diaspora
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mt-8 text-xl text-gray-600 max-w-xl leading-relaxed">
              The official Diaspora African Forum mobile platform designed to
              connect members of the African diaspora, strengthen community
              engagement, and support impactful initiatives through
              communication, events, and secure donations.
            </p>

            {/* Store Buttons */}
            <div className="flex flex-wrap gap-6 mt-10">

              <a href={ANDROID_LINK} className="hover:scale-105 transition">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                  alt="Google Play"
                  className="h-16"
                />
              </a>

              <a href={IOS_LINK} className="hover:scale-105 transition">
                <img
                  src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                  alt="App Store"
                  className="h-16"
                />
              </a>

            </div>

            {/* Redirect Notice */}
            {(isAndroid || isIOS) && (
              <div className="flex items-center gap-2 mt-6 text-sm text-gray-500">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-ping"></span>
                Redirecting to your app store in
                <span className="font-semibold text-indigo-600 ml-1">
                  {countdown}
                </span>
                seconds...
              </div>
            )}

            <p className="text-xs text-gray-400 mt-10">
              Available for Android and iOS devices
            </p>

          </div>

          {/* RIGHT SIDE */}
          <div className="flex justify-center relative">

            {/* Glow */}
            <div className="absolute w-[500px] h-[500px] bg-gradient-to-r from-indigo-400 to-purple-400 blur-3xl opacity-30 rounded-full"></div>

            {/* Phone Screenshot */}
            <img
              src="/assets/app_screenshot.png"
              alt="DAF App Screenshot"
              className="relative w-[340px] md:w-[420px] lg:w-[600px] drop-shadow-2xl hover:scale-105 transition duration-300"
            />

          </div>

        </div>

      </div>

    </div>
  );
}