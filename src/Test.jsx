import { useState, useEffect } from "react";
import {
  topOptions,
  mouthOptions,
  colorOptions,
  otherColorOptions,
  facialHairOptions,
  accessoryOptions,
  clothingOptions,
  eyeTypeOptions,
  eyebrowOptions,
  graphicOptions,
  facialColorOptions,
  hairColorOptions,
  skinColorOptions,
} from "./avatarOptionx";
import {
  FaUser,
  FaPaintBrush,
  FaSmile,
  FaTshirt,
  FaGlasses,
  FaRedo,
} from "react-icons/fa";

const Test = () => {
  const [avatarDataUri, setAvatarDataUri] = useState("");
  const [hairColor, setHairColor] = useState("BrownDark");
  const [skinColor, setSkinColor] = useState("Brown");
  const [backgroundColor, setBackgroundColor] = useState("Blue");
  const [accessoriesColor, setAccessoriesColor] = useState("Red");
  const [clothesColor, setClothesColor] = useState("Black");
  const [facialHairColor, setFacialHairColor] = useState("Black");
  const [hatColor, setHatColor] = useState("PastelPink");
  const [top, setTop] = useState("LongHairStraight");
  const [mouth, setMouth] = useState("Default");
  const [facialHair, setFacialHair] = useState("Blank");
  const [accessories, setAccessories] = useState("Blank");
  const [clothing, setClothing] = useState("ShirtCrewNeck");
  const [eyes, setEyes] = useState("Default");
  const [eyebrows, setEyebrows] = useState("Default");
  const [graphic, setGraphic] = useState("Bat");
  const [gender, setGender] = useState("female");
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState("appearance");

  const handleReset = () => {
    setHairColor("BrownDark");
    setSkinColor("Brown");
    setClothesColor("Black");
    setFacialHairColor("Black");
    setTop(gender === "female" ? "LongHairStraight" : "ShortHairShortFlat");
    setMouth("Default");
    setFacialHair("None");
    setClothing("ShirtCrewNeck");
    setEyes("Default");
    setEyebrows("Default");
  };

  const convertToUri = (uri) => {};

  useEffect(() => {
    const avatar = `https://avataaars.io/?avatarStyle=Circle&topType=${top}&hatColor=${otherColorOptions[hatColor]}&accessoriesType=${accessories}&clotheType=${clothing}&clotheColor=${otherColorOptions[clothesColor]}&graphicType=${graphic}&eyeType=${eyes}&eyebrowType=${eyebrows}&facialHairType=${facialHair}&facialHairColor=${colorOptions[facialHairColor]}&hairColor=${colorOptions[hairColor]}&skinColor=${colorOptions[skinColor]}&mouthType=${mouth}`;
    setAvatarDataUri(avatar);

    convertToUri();

    console.log("Avatar Data URI:", avatarDataUri);
  }, [
    hairColor,
    skinColor,
    backgroundColor,
    accessoriesColor,
    clothesColor,
    facialHairColor,
    hatColor,
    top,
    mouth,
    facialHair,
    accessories,
    clothing,
    eyes,
    eyebrows,
    graphic,
  ]);

  const handleSendToFlutter = () => {
    if (window.AvatarChannel) {
      window.AvatarChannel.postMessage(avatarDataUri);
    } else {
      console.log("Avatar SVG Data URI:", avatarDataUri);
    }
  };

  const renderColorSelect = (label, value, setter, colorOptions) => (
    <div className="mb-4">
      <label
        className={`block text-sm font-semibold mb-1 ${
          darkMode ? "text-white" : "text-gray-700"
        }`}
      >
        {label}
      </label>
      <select
        className={`w-full p-2 rounded-lg shadow-sm focus:outline-none ${
          darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
        }`}
        value={value}
        onChange={(e) => {
          setter(e.target.value);
        }}
      >
        {Object.keys(colorOptions).map((name) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );

  const renderSelect = (label, value, setter, options) => (
    <div className="mb-4">
      <label
        className={`block text-sm font-semibold mb-1 ${
          darkMode ? "text-white" : "text-gray-700"
        }`}
      >
        {label}
      </label>
      <select
        className={`w-full p-2 rounded-lg shadow-sm focus:outline-none ${
          darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
        }`}
        value={value}
        onChange={(e) => setter(e.target.value)}
      >
        {Object.entries(options).map(([label, value]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );

  const tabs = [
    { key: "appearance", icon: <FaUser />, label: "Appearance" },
    { key: "colors", icon: <FaPaintBrush />, label: "Theme" },
    { key: "face", icon: <FaSmile />, label: "Face" },
    { key: "clothing", icon: <FaTshirt />, label: "Clothing" },
    { key: "accessories", icon: <FaGlasses />, label: "Accessories" },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "appearance":
        return (
          <>
            {renderSelect("Top (Hair Style)", top, setTop, topOptions)}
            {renderSelect(
              "Facial Hair",
              facialHair,
              setFacialHair,
              facialHairOptions
            )}
          </>
        );
      case "colors":
        return (
          <>
            {top !== "NoHair" ? (
              <>
                {[
                  "WinterHat1",
                  "WinterHat2",
                  "WinterHat3",
                  "WinterHat4",
                ].includes(top) ? (
                  <>
                    {renderColorSelect(
                      "Hat Color",
                      hatColor,
                      setHatColor,
                      otherColorOptions
                    )}
                  </>
                ) : (
                  <>
                    {renderColorSelect(
                      "Hair Color",
                      hairColor,
                      setHairColor,
                      hairColorOptions
                    )}
                  </>
                )}
              </>
            ) : (
              ""
            )}

            {renderColorSelect(
              "Skin Color",
              skinColor,
              setSkinColor,
              skinColorOptions
            )}

            {facialHair !== "Blank" && (
              <>
                {renderColorSelect(
                  "Facial Hair Color",
                  facialHairColor,
                  setFacialHairColor,
                  facialColorOptions
                )}
              </>
            )}
          </>
        );
      case "face":
        return (
          <>
            {renderSelect("Mouth", mouth, setMouth, mouthOptions)}
            {renderSelect("Eyes", eyes, setEyes, eyeTypeOptions)}
            {renderSelect("Eyebrows", eyebrows, setEyebrows, eyebrowOptions)}
          </>
        );
      case "clothing":
        return (
          <>
            {renderSelect("Clothing", clothing, setClothing, clothingOptions)}

            {!["BlazerShirt", "BlazerSweater"].includes(clothing) && (
              <>
                {renderColorSelect(
                  "Clothes Color",
                  clothesColor,
                  setClothesColor,
                  otherColorOptions
                )}
              </>
            )}

            {clothing === "GraphicShirt" && (
              <>
                {renderSelect(
                  "Graphic style",
                  graphic,
                  setGraphic,
                  graphicOptions
                )}
              </>
            )}
          </>
        );
      case "accessories":
        return (
          <>
            {renderSelect(
              "Accessories",
              accessories,
              setAccessories,
              accessoryOptions
            )}
            {renderColorSelect(
              "Accessories Color",
              accessoriesColor,
              setAccessoriesColor,
              colorOptions
            )}
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className="relative flex flex-col h-screen font-sans"
      style={{
        backgroundImage: "url(/assets/mbg.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className={`absolute inset-0 z-0 ${
          darkMode ? "bg-black/70" : "bg-black/30"
        }`}
      />

      <div className="z-20 w-full px-4 py-3 flex justify-between items-center backdrop-blur-md bg-white/70 dark:bg-black/50 shadow-md">
        <button
          onClick={handleReset}
          className="flex items-center gap-2 px-3 py-1 bg-red-600 text-white rounded-md font-semibold shadow hover:bg-red-700"
        >
          <FaRedo /> Reset
        </button>

        <select
          className={`p-2 rounded-lg shadow-sm focus:outline-none ${
            darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
          }`}
          value={gender}
          onChange={(e) => {
            const selected = e.target.value;
            setGender(selected);
            setTop(
              selected === "male" ? "ShortHairShortFlat" : "LongHairStraight"
            );
          }}
        >
          <option value="female">Female</option>
          <option value="male">Male</option>
        </select>
      </div>

      <div
        className={`relative z-10 flex flex-col h-full ${
          darkMode ? "text-white" : "text-gray-900"
        }`}
      >
        {/* Avatar section */}
        <div className="flex justify-center items-center p-5">
          {avatarDataUri && (
            <img
              src={avatarDataUri}
              alt="avatar"
              className="w-64 h-64 rounded-full shadow-lg"
            />
          )}
        </div>

        {/* Main area with tabs and scrollable content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar Tabs */}
          <div
            className={`w-22 flex flex-col items-center gap-4 pt-6 px-2 overflow-y-auto ${
              darkMode ? "bg-black/30" : "bg-white/60"
            } rounded-r-2xl shadow-lg`}
          >
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex flex-col items-center p-2 rounded-lg transition hover:bg-blue-500/30 ${
                  activeTab === tab.key ? "bg-blue-500/40 w-full px-8" : ""
                }`}
              >
                <span className="text-xl">{tab.icon}</span>
                <span className="text-xs mt-1">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Scrollable content panel */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {/* Reset and Gender */}

            <div
              className={`rounded-2xl shadow-md p-4 space-y-4 ${
                darkMode
                  ? "bg-black/50 backdrop-blur"
                  : "bg-white/80 backdrop-blur-md"
              }`}
            >
              {renderTabContent()}
            </div>

            <button
              onClick={handleSendToFlutter}
              className="w-full mt-4 p-3 bg-blue-600 hover:bg-blue-700 transition text-white rounded-xl font-semibold shadow-md"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Test;
