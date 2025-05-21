import { useState, useEffect } from 'react'
import { createAvatar } from '@dicebear/core'
import { avataaars } from '@dicebear/collection'
import {
  topOptions,
  mouthOptions,
  colorOptions,
  facialHairOptions,
  accessoryOptions,
  clothingOptions,
  eyeTypeOptions,
  eyebrowOptions
} from './avatarOptions'
import { FaUser, FaPaintBrush, FaSmile, FaTshirt, FaGlasses, FaRedo } from 'react-icons/fa'

const Home = () => {
  const [avatarDataUri, setAvatarDataUri] = useState('')
  const [hairColor, setHairColor] = useState('Brown Dark')
  const [skinColor, setSkinColor] = useState('Yellow')
  const [backgroundColor, setBackgroundColor] = useState('Blue')
  const [accessoriesColor, setAccessoriesColor] = useState('Red')
  const [clothesColor, setClothesColor] = useState('Green')
  const [facialHairColor, setFacialHairColor] = useState('Black')
  const [hatColor, setHatColor] = useState('Pastel Pink')
  const [top, setTop] = useState('longButNotTooLong')
  const [mouth, setMouth] = useState('default')
  const [facialHair, setFacialHair] = useState('none')
  const [accessories, setAccessories] = useState('prescription01')
  const [clothing, setClothing] = useState('shirtCrewNeck')
  const [eyes, setEyes] = useState('default')
  const [eyebrows, setEyebrows] = useState('default')
  const [gender, setGender] = useState('female')
  const [darkMode, setDarkMode] = useState(false)
  const [activeTab, setActiveTab] = useState('appearance')

  const handleReset = () => {
    setHairColor('Brown Dark')
    setSkinColor('Yellow')
    setBackgroundColor('Blue')
    setAccessoriesColor('Red')
    setClothesColor('Green')
    setFacialHairColor('Black')
    setHatColor('Pastel Pink')
    setTop(gender === 'female' ? 'longButNotTooLong' : 'shortFlat')
    setMouth('default')
    setFacialHair('none')
    setAccessories('prescription01')
    setClothing('shirtCrewNeck')
    setEyes('default')
    setEyebrows('default')
  }

  useEffect(() => {
    const avatar = createAvatar(avataaars, {
      seed: 'Felix',
      style: ['circle'],
      hairColor: [colorOptions[hairColor]],
      skinColor: [colorOptions[skinColor]],
      backgroundColor: [colorOptions[backgroundColor]],
      accessoriesColor: [colorOptions[accessoriesColor]],
      clothesColor: [colorOptions[clothesColor]],
      facialHairColor: [colorOptions[facialHairColor]],
      hatColor: [colorOptions[hatColor]],
      top: [top],
      mouth: [mouth],
      facialHair: [facialHair],
      accessoriesType: [accessories],
      clothing: [clothing],
      eyes: [eyes],
      eyebrows: [eyebrows],
      backgroundType: ['solid'],
    })
    setAvatarDataUri(avatar.toDataUri())

    
  }, [
    hairColor, skinColor, backgroundColor, accessoriesColor, clothesColor,
    facialHairColor, hatColor, top, mouth, facialHair, accessories, clothing, eyes, eyebrows
  ])

  const handleSendToFlutter = () => {
    if (window.AvatarChannel) {
      window.AvatarChannel.postMessage(avatarDataUri)
    } else {
      console.log('Avatar SVG Data URI:', avatarDataUri)
    }
  }

  const renderColorSelect = (label, value, setter) => (
    <div className="mb-4">
      <label className={`block text-sm font-semibold mb-1 ${darkMode ? 'text-white' : 'text-gray-700'}`}>
        {label}
      </label>
      <select
        className={`w-full p-2 rounded-lg shadow-sm focus:outline-none ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}
        value={value}
        onChange={(e) => setter(e.target.value)}
      >
        {Object.keys(colorOptions).map((name) => (
          <option key={name} value={name}>{name}</option>
        ))}
      </select>
    </div>
  )

  const renderSelect = (label, value, setter, options) => (
    <div className="mb-4">
      <label className={`block text-sm font-semibold mb-1 ${darkMode ? 'text-white' : 'text-gray-700'}`}>
        {label}
      </label>
      <select
        className={`w-full p-2 rounded-lg shadow-sm focus:outline-none ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}
        value={value}
        onChange={(e) => setter(e.target.value)}
      >
        {Object.entries(options).map(([label, value]) => (
          <option key={value} value={value}>{label}</option>
        ))}
      </select>
    </div>
  )

  const tabs = [
    { key: 'appearance', icon: <FaUser />, label: 'Appearance' },
    { key: 'colors', icon: <FaPaintBrush />, label: 'Colors' },
    { key: 'face', icon: <FaSmile />, label: 'Face' },
    { key: 'clothing', icon: <FaTshirt />, label: 'Clothing' },
    { key: 'accessories', icon: <FaGlasses />, label: 'Accessories' },
  ]

  const renderTabContent = () => {
    switch (activeTab) {
      case 'appearance':
        return (
          <>
            {renderSelect('Top (Hair Style)', top, setTop, topOptions)}
            {renderSelect('Facial Hair', facialHair, setFacialHair, facialHairOptions)}
          </>
        )
      case 'colors':
        return (
          <>
            {renderColorSelect('Hair Color', hairColor, setHairColor)}
            {renderColorSelect('Skin Color', skinColor, setSkinColor)}
            {/* {renderColorSelect('Background Color', backgroundColor, setBackgroundColor)} */}
            {renderColorSelect('Clothes Color', clothesColor, setClothesColor)}
            {renderColorSelect('Facial Hair Color', facialHairColor, setFacialHairColor)}
            {renderColorSelect('Hat Color', hatColor, setHatColor)}
          </>
        )
      case 'face':
        return (
          <>
            {renderSelect('Mouth', mouth, setMouth, mouthOptions)}
            {renderSelect('Eyes', eyes, setEyes, eyeTypeOptions)}
            {renderSelect('Eyebrows', eyebrows, setEyebrows, eyebrowOptions)}
          </>
        )
      case 'clothing':
        return (
          <>
            {renderSelect('Clothing', clothing, setClothing, clothingOptions)}
          </>
        )
      case 'accessories':
        return (
          <>
            {renderSelect('Accessories', accessories, setAccessories, accessoryOptions)}
            {renderColorSelect('Accessories Color', accessoriesColor, setAccessoriesColor)}

          </>
        )
      default:
        return null
    }
  }

  return (
    <div
      className="relative flex flex-col h-screen font-sans"
      style={{
        backgroundImage: 'url(/assets/mbg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className={`absolute inset-0 z-0 ${darkMode ? 'bg-black/70' : 'bg-black/30'}`} />


      <div className="z-20 w-full px-4 py-3 flex justify-between items-center backdrop-blur-md bg-white/70 dark:bg-black/50 shadow-md">
    <button
      onClick={handleReset}
      className="flex items-center gap-2 px-3 py-1 bg-red-600 text-white rounded-md font-semibold shadow hover:bg-red-700"
    >
      <FaRedo /> Reset
    </button>

    <select
      className={`p-2 rounded-lg shadow-sm focus:outline-none ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}
      value={gender}
      onChange={(e) => {
        const selected = e.target.value
        setGender(selected)
        setTop(selected === 'male' ? 'shortFlat' : 'longButNotTooLong')
      }}
    >
      <option value="female">Female</option>
      <option value="male">Male</option>
    </select>
  </div>

      <div className={`relative z-10 flex flex-col h-full ${darkMode ? 'text-white' : 'text-gray-900'}`}>
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
          <div className={`w-22 flex flex-col items-center gap-4 pt-6 px-2 overflow-y-auto ${darkMode ? 'bg-black/30' : 'bg-white/60'} rounded-r-2xl shadow-lg`}>
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex flex-col items-center p-2 rounded-lg transition hover:bg-blue-500/30 ${
                  activeTab === tab.key ? 'bg-blue-500/40 w-full px-8' : ''
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
            

            <div className={`rounded-2xl shadow-md p-4 space-y-4 ${darkMode ? 'bg-black/50 backdrop-blur' : 'bg-white/80 backdrop-blur-md'}`}>
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
  )
}

export default Home
