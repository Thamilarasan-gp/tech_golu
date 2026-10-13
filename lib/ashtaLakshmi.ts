export interface LakshmiStory {
  id: number;
  name: string;
  tamilName: string;
  subtitle: string;
  image: string;
  badges: {
    icon: string;
    tamil: string;
    english: string;
  }[];
  tamilStory: string;
  englishStory: string;
  sloka: string;
  durationSeconds: number;
}

export const ASHTA_LAKSHMI_DATA: LakshmiStory[] = [
  {
    id: 1,
    name: "Adi Lakshmi",
    tamilName: "ஸ்ரீ ஆதி லட்சுமி",
    subtitle: "Primordial Prosperity & Peace",
    image: "/images/lakshmi-1.jpg",
    badges: [
      { icon: "🪙", tamil: "ஆதி செல்வம்", english: "Primordial Wealth" },
      { icon: "🪷", tamil: "மன அமைதி", english: "Inner Peace" },
      { icon: "🏵️", tamil: "பேரருள்", english: "Divine Grace" }
    ],
    tamilStory:
      "ஆதி லட்சுமி பிரபஞ்சத்தின் ஆதி சக்தியாக விளங்கும் தயாபரி. இவர் அனைத்து செல்வம், ஆன்மீக அமைதி மற்றும் நலன்களின் மூலமாகும். தூய்மையும், பக்தியும், நல்ல எண்ணங்களும் நிறைந்த உள்ளங்களில் நிலையாக வாசம் செய்கிறார். நவராத்திரி கொலுவில் இவரை வணங்குவதால் வாழ்வின் தொடக்கம் முதல் முடிவு வரை மங்களமும் பேரின்பமும் தழைக்கும்.",
    englishStory:
      "Adi Lakshmi is the primordial form of Goddess Lakshmi, the eternal source of all prosperity, peace, and spiritual well-being. She blesses those who cultivate purity of mind and unconditional devotion. Worshiping her during Navaratri Golu brings continuous harmony and auspicious beginnings into our lives.",
    sloka: "Sumanasa Vandita Sundari Madhavi | Chandra Sahodari Hema Maye ||",
    durationSeconds: 125
  },
  {
    id: 2,
    name: "Dhana Lakshmi",
    tamilName: "ஸ்ரீ மகாலட்சுமி (தன லட்சுமி)",
    subtitle: "Goddess of Wealth & Prosperity",
    image: "/images/lakshmi-2.jpg",
    badges: [
      { icon: "🪙", tamil: "செல்வம்", english: "Wealth" },
      { icon: "🪷", tamil: "செழிப்பு", english: "Prosperity" },
      { icon: "🏵️", tamil: "நல்லதிர்ஷ்டம்", english: "Good Fortune" }
    ],
    tamilStory:
      "மகாலட்சுமி செல்வம், செழிப்பு, நல்லதிர்ஷ்டம் மற்றும் அனைத்து வளங்களையும் அருளும் தெய்வம். அவர் தூய்மையும், உழைப்பும், நல்ல மனமும் உள்ள இடங்களில் வாசம் செய்கிறார். நவராத்திரி கொலுவில், சமுதாய வாழ்க்கையில் நலமும் வளமும் கிடைக்க இவரை வழிபடுகிறோம்.",
    englishStory:
      "Goddess Lakshmi is the divine embodiment of wealth, prosperity, good fortune and abundance. She blesses those who value purity, hard work and a kind heart. During Navaratri Golu, we worship her for a prosperous and harmonious life.",
    sloka: "Dhidhimi Dhindhimi Dhindhimi Dhindhimi | Dhundhubhi Nada Supurna Maye ||",
    durationSeconds: 138
  },
  {
    id: 3,
    name: "Dhanya Lakshmi",
    tamilName: "ஸ்ரீ தான்ய லட்சுமி",
    subtitle: "Food, Agriculture & Nourishment",
    image: "/images/lakshmi-3.jpg",
    badges: [
      { icon: "🌾", tamil: "உணவு வளம்", english: "Food Security" },
      { icon: "🌱", tamil: "விவசாயம்", english: "Agriculture" },
      { icon: "🏵️", tamil: "பசிநீக்கம்", english: "Nourishment" }
    ],
    tamilStory:
      "தான்ய லட்சுமி உணவு, விவசாயம் மற்றும் வளமான வாழ்வை அருளும் தயாபரி. கைகளில் நெற்கதிர்களையும், கரும்பையும் ஏந்தி உலகத்து உயிரினங்கள் அனைத்திற்கும் பசியின்றி அமுது அளிக்கிறார். உழவுத் தொழிலை போற்றவும், தானிய வளங்கள் பெருகவும் நவராத்திரி நன்னாளில் தான்ய லட்சுமியை வணங்குகிறோம்.",
    englishStory:
      "Dhanya Lakshmi bestows food, agricultural bounty, and nourishment, ensuring sustenance for all living beings. Holding golden paddy stalks and sugarcane, she removes famine and blesses our homes with fruitful harvest and daily abundance.",
    sloka: "Ayi Kali Kalmasha Nashini Kamini | Vaidika Rupa Pradarshayute ||",
    durationSeconds: 142
  },
  {
    id: 4,
    name: "Gaja Lakshmi",
    tamilName: "ஸ்ரீ கஜ லட்சுமி",
    subtitle: "Royal Grace & Auspiciousness",
    image: "/images/lakshmi-4.jpg",
    badges: [
      { icon: "🐘", tamil: "அரச மகிமை", english: "Royal Dignity" },
      { icon: "👑", tamil: "மங்களம்", english: "Auspiciousness" },
      { icon: "🏵️", tamil: "வெற்றி", english: "Triumph" }
    ],
    tamilStory:
      "கஜ லட்சுமி பாற்கடல் கடையும் போது தோன்றிய உன்னத மங்கள தேவதை. இருபுறமும் கம்பீரமான வெள்ளை யானைகள் பொற்குடங்களால் புனித தீர்த்தம் அபிஷேகம் செய்ய அமர்ந்திருக்கும் இவர், அரச போகத்தையும், சமூகத்தில் நன்மதிப்பையும், வாகன யோகத்தையும், சகல காரிய வெற்றிகளையும் அருளுகிறார்.",
    englishStory:
      "Gaja Lakshmi brings royal dignity, authority, and splendid prosperity. Flanked by majestic elephants pouring sacred water from golden urns, she dispels misfortune and bestows royal grace, respect, and victory across all endeavors.",
    sloka: "Jaya Jaya He Madhusudana Kamini | Gaja Lakshmi Rupa Namostute ||",
    durationSeconds: 130
  },
  {
    id: 5,
    name: "Santana Lakshmi",
    tamilName: "ஸ்ரீ சந்தான லட்சுமி",
    subtitle: "Family Harmony & Noble Lineage",
    image: "/images/lakshmi-5.jpg",
    badges: [
      { icon: "👶", tamil: "பிள்ளைப்பேறு", english: "Children" },
      { icon: "🏡", tamil: "குடும்ப இன்பம்", english: "Family Joy" },
      { icon: "🏵️", tamil: "வம்ச விருத்தி", english: "Lineage" }
    ],
    tamilStory:
      "சந்தான லட்சுமி வாஞ்சை நிறைந்த தாயன்பின் தெய்வீக வடிவம். தனது மடியில் மழலை குழந்தையை ஏந்தி, குடும்பத்தில் நற்குழந்தை பாக்கியத்தையும், குழந்தைகளின் நல்வாழ்வையும், இல்லற அமைதியையும் அருளுகிறார். குடும்ப பந்தங்கள் அன்பால் பிணைக்கப்பட இவரை நவராத்திரியில் வழிபடுகிறோம்.",
    englishStory:
      "Santana Lakshmi cradles an infant child lovingly in her lap, symbolizing the blessing of virtuous children, healthy generations, and warm family affection. She protects the household and preserves the sacred bond of family harmony.",
    sloka: "Ayi Gaja Vahini Mohini Chakrini | Raga Vivardhini Jnanamaye ||",
    durationSeconds: 135
  },
  {
    id: 6,
    name: "Veera Lakshmi",
    tamilName: "ஸ்ரீ வீர லட்சுமி",
    subtitle: "Courage, Valor & Strength",
    image: "/images/lakshmi-6.jpg",
    badges: [
      { icon: "⚔️", tamil: "வீரம்", english: "Valor" },
      { icon: "🛡️", tamil: "மனவலிமை", english: "Fortitude" },
      { icon: "🦁", tamil: "அச்சமின்மை", english: "Fearlessness" }
    ],
    tamilStory:
      "வீர லட்சுமி அல்லது தைரிய லட்சுமி மனதிடத்தையும், அஞ்சாநெஞ்சத்தையும் அருளும் பராசக்தி. சிங்கத்தின் அருகே வாள், கேடயம், சக்கரம் ஏந்தி அருள்புரியும் இவர், தீமைகளையும் அச்சங்களையும் தகர்த்து, நீதியை காக்கவும், வாழ்க்கையின் சவால்களை வெல்லவும் அபார தைரியத்தை அளிக்கிறார்.",
    englishStory:
      "Veera Lakshmi, also revered as Dhairya Lakshmi, imparts boundless courage, physical vigor, and moral fearlessness. Seated beside a lion with sword and shield, she empowers devotees to face life's fiercest storms with calm determination.",
    sloka: "Jaya Vara Varnini Vaishnavi Bhargavi | Mantra Swarupini Mantramaye ||",
    durationSeconds: 140
  },
  {
    id: 7,
    name: "Vijaya Lakshmi",
    tamilName: "ஸ்ரீ விஜய லட்சுமி",
    subtitle: "Victory & Supreme Success",
    image: "/images/lakshmi-7.jpg",
    badges: [
      { icon: "🚩", tamil: "வெற்றி", english: "Success" },
      { icon: "🏆", tamil: "சாதனை", english: "Achievement" },
      { icon: "🏵️", tamil: "தடைநீக்கம்", english: "Overcoming" }
    ],
    tamilStory:
      "விஜய லட்சுமி தொட்ட காரியங்கள் யாவிலும் தடையற்ற வெற்றியைத் தரும் மங்கள நாயகி. கையில் வெற்றிக்கொடியை ஏந்தி, சோம்பல், பயம், எதிர்மறை எண்ணங்கள் ஆகியவற்றை விரட்டி, உன்னதமான சாதனைகளையும் நல்வெற்றிகளையும் தந்து வாழ்க்கையை வழிநடத்துகிறார்.",
    englishStory:
      "Vijaya Lakshmi carries the sacred victory banner, ensuring triumph in all righteous undertakings. She removes hurdles, banishes self-doubt, and crowns hard work with enduring victory and joyful fulfillment.",
    sloka: "Kamala Vasini Kamala Mukhi | Karuna Kataksha Vilasiniye ||",
    durationSeconds: 128
  },
  {
    id: 8,
    name: "Vidya Lakshmi",
    tamilName: "ஸ்ரீ வித்யா லட்சுமி",
    subtitle: "Knowledge, Arts & Wisdom",
    image: "/images/lakshmi-8.jpg",
    badges: [
      { icon: "📚", tamil: "கல்வி", english: "Education" },
      { icon: "🪕", tamil: "கலை ஞானம்", english: "Fine Arts" },
      { icon: "🦢", tamil: "மெய்யறிவு", english: "True Wisdom" }
    ],
    tamilStory:
      "வித்யா லட்சுமி அறிவு, கலை மற்றும் ஞானத்தின் ஜோதி வடிவமானவர். கையில் வீணையையும், வேத சுவடிகளையும் தாங்கி, அறியாமை இருளைப் போக்கி அறிவுக்கண்ணைத் திறக்கிறார். மாணவர்கள் கல்வி சிறக்கவும், கலைஞர்கள் புகழ் பெறவும் வித்யா லட்சுமியின் திருவருள் இன்றியமையாதது.",
    englishStory:
      "Vidya Lakshmi bestows supreme knowledge, musical wisdom, and spiritual intellect. Seated with the divine Veena, sacred books, and the white swan of discernment, she lights the lamp of learning to dispel the darkness of ignorance.",
    sloka: "Pranata Surottama Kamala Kare | Vidya Lakshmi Sada Palaya Maam ||",
    durationSeconds: 145
  }
];

export function getLakshmiDataById(id: number): LakshmiStory {
  const found = ASHTA_LAKSHMI_DATA.find((l) => l.id === id);
  return found || ASHTA_LAKSHMI_DATA[1]; // Defaults to Dhana Lakshmi / Maha Lakshmi
}
