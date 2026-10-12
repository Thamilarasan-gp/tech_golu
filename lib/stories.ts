export interface DollStory {
  id: number;
  name: string;
  tamilName: string;
  title: string;
  category: string;
  padiTier: string;
  stepNumber: number;
  significance: string;
  summary: string;
  fullStory: string[];
  interestingFacts: string[];
  symbolism: {
    item: string;
    meaning: string;
  }[];
  sloka: {
    verse: string;
    meaning: string;
  };
  accentColor: string;
  themeTag: string;
  imageUrl?: string;
}

export const GOLU_DOLLS: DollStory[] = [
  {
    id: 1,
    name: "Lord Ganesha",
    tamilName: "விநாயகர் (Lord Vinayagar)",
    title: "Prathama Vandana — The Remover of Obstacles",
    category: "Supreme Deities",
    padiTier: "Tier 1 — The Divine Pinnacle",
    stepNumber: 1,
    significance:
      "Lord Ganesha is worshipped first before any ritual, endeavor, or festival. On the Navaratri Golu steps, Ganesha presides at the apex or center of the top tier, blessing the home with auspiciousness, intellect, and seamless beginnings.",
    summary:
      "Lord Ganesha with his elephant head teaches us wisdom, listening carefully to good counsel, and overcoming every bump on life's path with a cheerful heart and sweet modak!",
    fullStory: [
      "In traditional South Indian homes during Navaratri, no Golu arrangement begins without first consecrating Lord Ganesha. Revered as Vignaharta (the eliminator of impediments) and Buddhipradayaka (the bestower of sharp intellect), Ganesha's presence anchors the spiritual sanctity of the exhibition.",
      "According to timeless lore, when Maharishi Vyasa sought to dictate the monumental epic Mahabharata, he asked Lord Ganesha to scribe it. Ganesha agreed on one solemn condition: Vyasa must recite continuously without pause. When Ganesha's quill broke midway, the deity did not pause—he broke off his own right tusk to continue writing without hesitation, exemplifying supreme dedication to sacred knowledge and tireless focus.",
      "During the nine auspicious nights of Navaratri, Ganesha is offered fragrant Kozhukattai (steamed jaggery rice dumplings) and fresh Arugampul (Bermuda grass), reminding every visitor that true wisdom resides in humility, clarity of thought, and devotion to the divine."
    ],
    interestingFacts: [
      "Ganesha's large ears represent the virtue of active listening, while his small mouth signifies speaking measured, gentle words.",
      "His mouse vehicle (Mooshika) symbolizes mastery over wandering desires and restless ego.",
      "The single broken tusk highlights how noble learning requires self-sacrifice and unwavering resolve.",
      "Traditional Golu steps always place Ganesha on the topmost step or beside the Kalasam as the guardian of the household."
    ],
    symbolism: [
      { item: "Modak (Kozhukattai)", meaning: "The ultimate sweetness of spiritual realization and inner contentment." },
      { item: "Elephant Head", meaning: "Profound wisdom, royal grace, and intellectual sharpness." },
      { item: "Ankusha (Axe/Axe-hook)", meaning: "Severing materialistic bonds and attachments." },
      { item: "Mooshika (Vahana)", meaning: "Subduing restless minds and channelizing sensory energy." }
    ],
    sloka: {
      verse: "Agajanana Padmarkam Gajananam Aharnisham | Anekadantam Bhaktanam Ekadantam Upasmahe ||",
      meaning: "Day and night, I meditate upon the elephant-faced Lord who brings boundless joy to Mother Parvati, and who blesses his devotees with auspiciousness."
    },
    accentColor: "#E26D39",
    themeTag: "Auspicious Beginnings"
  },
  {
    id: 2,
    name: "Goddess Lakshmi",
    tamilName: "மகாலட்சுமி (Goddess Maha Lakshmi)",
    title: "Ashta Lakshmi — Goddess of Auspicious Fortune & Purity",
    category: "Tridevi (Divine Feminine)",
    padiTier: "Tier 1 — The Divine Pinnacle",
    stepNumber: 1,
    significance:
      "Goddess Lakshmi embodies holistic wealth, grace, beauty, and inner peace. During Navaratri, the middle three nights (Days 4 to 6) are dedicated specifically to her worship, invoking flourishing prosperity and virtuous abundance in every household.",
    summary:
      "Mother Lakshmi sits upon a pure pink lotus flower, showering golden blessings not merely of coins, but of good health, knowledge, food, patience, and kind character!",
    fullStory: [
      "As one of the prime Goddesses presiding over Navaratri, Goddess Lakshmi emerged during the cosmic Samudra Manthana (the Churning of the Ocean of Milk). Emerging serene on a fully blossomed pink lotus with fragrant garland in hand, she chose Lord Maha Vishnu as her eternal consort, restoring balance and illumination to the cosmos.",
      "In the tradition of Navaratri Golu, Lakshmi is honoured not merely as the giver of gold (Dhana), but as the custodian of the eight-fold Ashta Lakshmis: Dhanya (nourishing harvest), Dhairya (unshakable courage), Gaja (royal dignity), Santana (fruitful lineage), Vijaya (victory in righteous tasks), Vidya (sacred learning), and Adi (primordial wisdom).",
      "Homes are illuminated with brass deepams (oil lamps) at dusk during Golu so that Lakshmi's radiant presence may banish gloom, strife, and cold darkness, welcoming warmth, harmony, and generous hospitality."
    ],
    interestingFacts: [
      "The four arms of Goddess Lakshmi represent the four cardinal goals of human existence: Dharma (righteousness), Artha (wealth), Kama (genuine desires), and Moksha (spiritual freedom).",
      "The lotus upon which she sits grows out of muddy water yet remains pristine and untainted, teaching us to live ethically despite worldly turmoil.",
      "Traditional Tamil families place silver coins and freshly husked paddy near Lakshmi's Golu idol during Friday poojas."
    ],
    symbolism: [
      { item: "Pink Lotus (Padma)", meaning: "Purity, divine detachment, and spiritual evolution." },
      { item: "Gold Coins cascading", meaning: "Flowing material and spiritual blessings given to benevolent hearts." },
      { item: "Two Elephants showering water", meaning: "Eternal grace, regal devotion, and uninterrupted spiritual flow." },
      { item: "Abhaya Mudra", meaning: "Reassurance of divine protection from fear and anxiety." }
    ],
    sloka: {
      verse: "Namasthesthu Mahamaye Sreepeethe Surapoojithe | Shanka Chakra Ghadhahasthe Mahalakshmi Namosthuthe ||",
      meaning: "Salutations to the Supreme Mother of Divine Grace, seated on the auspicious seat, worshipped by celestial beings, holding conch, discus and mace."
    },
    accentColor: "#C59B27",
    themeTag: "Prosperity & Grace"
  },
  {
    id: 3,
    name: "Goddess Saraswati",
    tamilName: "சரஸ்வதி (Goddess Saraswati)",
    title: "Jnana Dayini — Goddess of Knowledge, Music & Wisdom",
    category: "Tridevi (Divine Feminine)",
    padiTier: "Tier 1 — The Divine Pinnacle",
    stepNumber: 1,
    significance:
      "Goddess Saraswati presides over speech, intellect, music, fine arts, and self-realization. The final three nights of Navaratri and the celebrated day of Saraswati Pooja are dedicated to her, marking the consecration of books, tools, and musical instruments.",
    summary:
      "Goddess Saraswati wears pristine white silks and plays the melodious Veena. She shows us that knowledge and creative arts are the most priceless treasures in the universe!",
    fullStory: [
      "Clothed in spotless white silk representing pure, unblemished consciousness (Sattva Guna), Goddess Saraswati sits gracefully beside flowing crystalline waters. In her sacred hands, she cradles the divine Veena (named Vipanchi), the holy Vedas, and a crystal Rosary (Japamala).",
      "During Saraswati Pooja on the ninth day of Navaratri, every child in traditional households places their textbooks, pencils, and musical instruments at the feet of the Goddess. No studies or worldly work are performed on that day; instead, prayers are offered in gratitude for the faculty of thought, expression, and learning.",
      "On Vijayadasami (the tenth victorious day), young children are initiated into their very first alphabets through the sacred ceremony of 'Vidyarambham' or 'Aksharabhyasam', writing their maiden words in golden plates of raw rice while chanting Saraswati's name."
    ],
    interestingFacts: [
      "The strings of Saraswati's Veena symbolize the subtle vibrations of speech, cosmos, and creative human thought.",
      "Her sacred companion, the pristine White Swan (Hamsa), possesses the legendary ability to separate pure milk from water, illustrating spiritual discernment (Viveka).",
      "The peacock standing near her reminds artists to restrain vanity and pride when blessed with extraordinary talents."
    ],
    symbolism: [
      { item: "Veena (Stringed Lute)", meaning: "Harmony of life, mastery of emotions, and fine musical arts." },
      { item: "Pustaka (Sacred Palm Leaf Script)", meaning: "Universal knowledge, timeless wisdom, and sacred scriptures." },
      { item: "White Lotus & Garb", meaning: "Pure unadulterated intellect, untouched by ignorance or greed." },
      { item: "Crystal Beads (Japamala)", meaning: "Contemplation, mindfulness, and regular spiritual reflection." }
    ],
    sloka: {
      verse: "Saraswati Namasthubhyam Varade Kama Roopini | Vidyarambham Karishyami Siddhir Bhavathu Me Sada ||",
      meaning: "Salutations to Goddess Saraswati, the giver of boons and fulfilled aspirations. As I embark on my learning, may wisdom and success attend me always."
    },
    accentColor: "#D4AF37",
    themeTag: "Wisdom & Arts"
  },
  {
    id: 4,
    name: "Goddess Durga",
    tamilName: "துர்க்கை அம்மன் (Mahishasuramardini)",
    title: "Mahishasuramardini — The Invincible Force of Righteousness",
    category: "Supreme Shakti",
    padiTier: "Tier 2 — The Cosmic Powers",
    stepNumber: 2,
    significance:
      "Goddess Durga is the fierce and loving protector who personifies Shakti—the collective cosmic energy of all divinities. Navaratri celebrates her nine epic nights of battle against dark forces, culminating in victory over ignorance and injustice.",
    summary:
      "Riding fearlessly atop a golden lion with ten celestial weapons, Mother Durga protects everyone from fear, showing that good and truth will always triumph over bullying and evil!",
    fullStory: [
      "When the tyrannical shape-shifting buffalo demon Mahishasura wreaked havoc across the three worlds, exploiting a boon that no man or god could defeat him, the celestial devas united their spiritual effulgence. From that blazing conflagration of energy arose the supreme goddess: Durga.",
      "Bestowed with Shiva's trident, Vishnu's Sudarshana chakra, Indra's thunderbolt, and Himavat's regal lion vahana, the Mother fought Mahishasura across nine arduous days and nights. Each night revealed a different divine form (the Navadurgas—Shailaputri, Brahmacharini, Chandraghanta, Kushmanda, Skandamata, Katyayani, Kalaratri, Mahagauri, and Siddhidatri).",
      "On the tenth morning—Vijayadasami—Durga vanquished Mahishasura, establishing the timeless law that arrogance and cruelty will inevitably crumble before fearless truth and unswerving righteousness."
    ],
    interestingFacts: [
      "The word 'Durga' in Sanskrit translates to 'the fortress' or 'that which is impassable to misfortune', signaling impenetrable defense for her devotees.",
      "Durga's lion vahana exemplifies courage, ferocious resolve, and controlled ferocity in the service of justice.",
      "Her ten hands represent the ten directions, showing that divine compassion protects righteous seekers from every corner of the universe."
    ],
    symbolism: [
      { item: "Trishula (Trident)", meaning: "Mastery over the three gunas: Sattva (peace), Rajas (activity), and Tamas (inertia)." },
      { item: "Chakra (Discus)", meaning: "The relentless circle of cosmic time and unerring precision of justice." },
      { item: "Lion Vahana", meaning: "Unbounded royal courage guided by moral discipline." },
      { item: "Conch (Shankha)", meaning: "The primordial sound of victory resonating across the heavens." }
    ],
    sloka: {
      verse: "Sarva Mangala Mangalye Shive Sarvartha Sadhike | Sharanye Trayambake Gauri Narayani Namosthuthe ||",
      meaning: "Salutations to Narayani, who is the auspiciousness in all things auspicious, the achiever of all goals, the three-eyed Mother of refuge."
    },
    accentColor: "#6B1D2F",
    themeTag: "Courage & Victory"
  },
  {
    id: 5,
    name: "Lord Murugan",
    tamilName: "முருகப்பெருமான் (Lord Karthikeya / Skanda)",
    title: "Velavan — The Lord of Valor, Youth & Spiritual Wisdom",
    category: "Sacred Guardian",
    padiTier: "Tier 2 — The Cosmic Powers",
    stepNumber: 2,
    significance:
      "Lord Murugan, affectionately venerated across Tamil Nadu and diaspora communities worldwide as the Tamil Kadavul, represents boundless youthful energy, supreme valor, eloquence, and profound spiritual realization.",
    summary:
      "Lord Murugan holds the sparkling spear called the 'Vel' and rides a magnificent dancing peacock. He taught his father Lord Shiva the profound secret of the sacred Omkara!",
    fullStory: [
      "Lord Murugan manifested from the six divine sparks of Lord Shiva's third eye, nurtured by the six Krittika maidens at the sacred Saravana Poigai. Bestowed with the luminous golden Vel (spear) by his mother Parvati, Murugan led the celestial forces to conquer the demonic tyrant Surapadman at Tiruchendur.",
      "Instead of annihilating his foe, the compassionate Murugan transformed Surapadman into a resplendent peacock to be his vehicle and a proud rooster to adorn his victory banner, illustrating that divine victory transmutes hatred into surrendered devotion.",
      "In the famous encounter at Swamimalai, Lord Murugan explained the deepest philosophical meaning of the primordial mantra 'OM' (Pranava) to his own father Shiva, earning the revered title 'Swaminatha'—the guru to the cosmic preceptor."
    ],
    interestingFacts: [
      "Lord Murugan's six sacred abode shrines along hills and coastal shores in Tamil Nadu are affectionately known as the 'Arupadai Veedu'.",
      "The Vel is shaped broad at the base, long in the shaft, and sharp at the tip—symbolizing wide knowledge, deep contemplation, and pinpoint intellectual focus.",
      "The peacock vehicle displays pride vanquished and beauty consecrated to the divine."
    ],
    symbolism: [
      { item: "Jnana Vel (Spear of Light)", meaning: "Sharp intellect, piercing truth, and destruction of inner ignorance." },
      { item: "Peacock (Mayil)", meaning: "Transmutation of ego into sublime, surrendered grace." },
      { item: "Rooster Banner (Seval)", meaning: "The dawn of divine consciousness awakening humanity from dark sleep." },
      { item: "Six Faces (Shanmukha)", meaning: "Omnipresent awareness seeing across all directions of existence." }
    ],
    sloka: {
      verse: "Murugane Senthil Nagar Vadivelane | Shanmukhane Saravanabhava Guhane Namosthuthe ||",
      meaning: "O Lord Muruga, dweller of seaside Senthil Nagar with radiant Vel, six-faced guardian born of the lotus pond, I bow unto your lotus feet."
    },
    accentColor: "#8E2323",
    themeTag: "Valor & Illumination"
  },
  {
    id: 6,
    name: "Marapachi Dolls",
    tamilName: "மரப்பாச்சி பொம்மைகள் (Traditional Wooden Couple)",
    title: "Parampara Dampati — Ancient Heirloom of Marital Harmony",
    category: "Traditional Heritage",
    padiTier: "Tier 3 — Heritage & Household",
    stepNumber: 3,
    significance:
      "Marapachi dolls are handcrafted wooden male-and-female pairs, carved from red sandalwood or country teak. They are among the oldest cultural staples of Navaratri Golu, handed down as precious maternal heirlooms across four to five generations.",
    summary:
      "These dark wooden king-and-queen dolls are dressed in colourful sarees and dhotis by children and grandparents each year, carrying the blessings and memories of great-grandmothers!",
    fullStory: [
      "No traditional Tamil or Telugu Golu is considered complete without the revered Marapachi couple positioned prominently on the central steps. Traditionally carved from red sandalwood (Raktachandan), these dolls possess subtle herbal properties that absorb moisture and repel insects, keeping the festive surroundings clean and fragrant.",
      "When a daughter wed in ancient times, her mother gifted her a newly carved Marapachi pair as part of her bridal trousseau. The wooden couple represented the bride and groom, symbolizing unbreakable marital companionship, health, and mutual respect.",
      "Year after year, mothers and daughters take out these cherished family dolls from wooden trunks, tenderly bathe them, and drape them in miniature silk pattu pudavais (sarees), zari dhotis, and seed-pearl jewels. In this intimate ritual, living family heritage bridges generations across centuries."
    ],
    interestingFacts: [
      "Carved from natural medicinal red sanders, touching the smooth wood was historically believed to calm childhood anxieties and skin ailments.",
      "Because wood endures for centuries without cracking if cared for, many Marapachi dolls in South Indian homes are over 100 to 150 years old.",
      "Children are actively invited to drape and style the Marapachi dolls, teaching young minds craftsmanship, patience, and festive storytelling."
    ],
    symbolism: [
      { item: "Red Sandalwood / Country Teak", meaning: "Enduring resilience, medicinal healing, and natural eco-harmony." },
      { item: "Male & Female Pair", meaning: "Equality, mutual harmony, and the sacred balance of family life." },
      { item: "Heirloom Handoff", meaning: "The uninterrupted chain of maternal love and cultural legacy." }
    ],
    sloka: {
      verse: "Mangalyam Tantunanena Mama Jivana Hetuna | Kante Badhnami Subhage Tvam Jeeva Sharadam Shatam ||",
      meaning: "This sacred bond is the foundation of my life's harmony. May you live in joy, health, and grace for a hundred autumns."
    },
    accentColor: "#5C4A42",
    themeTag: "Heritage & Love"
  },
  {
    id: 7,
    name: "Dasavataram Set",
    tamilName: "தசாவதாரம் (The Ten Cosmic Incarnations)",
    title: "Dharma Samsthapana — The Cosmic Evolution of Avatars",
    category: "Epic Narratives",
    padiTier: "Tier 3 — Heritage & Household",
    stepNumber: 3,
    significance:
      "The Dasavataram depicts the ten major incarnations of Lord Vishnu across the four Yugas. Displayed sequentially on the Golu steps, it illustrates the eternal protection of cosmic Dharma and mirrors the natural evolution of life on Earth.",
    summary:
      "From a tiny golden fish saving ancient seeds from a storm, to Rama standing for honour and Krishna playing his flute, these ten stories show how kindness protects our planet!",
    fullStory: [
      "The Dasavataram doll set is one of the most intellectually fascinating displays in any Golu exhibition. The sequence traces Lord Vishnu's avatars: Matsya (fish), Kurma (tortoise), Varaha (boar), Narasimha (half-lion half-man), Vamana (dwarf sage), Parashurama (warrior ascetic), Rama (righteous king), Balarama/Buddha, Krishna (divine teacher), and Kalki (herald of the new age).",
      "Centuries before modern evolutionary science was documented, the Dasavataram metaphorically charted the progression of life: originating in aquatic oceans (Matsya), shifting to amphibious life (Kurma), terrestrial animals (Varaha), the transitional humanoid (Narasimha), the early human (Vamana), the forest wanderer (Parashurama), the organized civilized sovereign (Rama), the philosopher statesman (Krishna), and the future custodian.",
      "Whenever moral order and ecological harmony falter in the cosmos, the divine descends in tailored form to restore balance, reminding human beings that each of us holds a duty to protect truth and safeguard the vulnerable."
    ],
    interestingFacts: [
      "Matsya avatar saved sacred seeds, herbs, and the Vedas during the universal deluge in a sturdy cosmic ark.",
      "Narasimha avatar taught that the divine cannot be contained by walls, day or night, inside or outside—truth permeates every atom.",
      "Visitors often spend the most time at this tier, quizzing children on identifying all ten avatars in correct sequence."
    ],
    symbolism: [
      { item: "Matsya (Aquatic)", meaning: "Preservation of life's foundation amidst chaos." },
      { item: "Kurma (Amphibious)", meaning: "Unwavering stability supporting the heavy churning of life." },
      { item: "Rama (Righteous Ruler)", meaning: "Sacrifice of personal comfort for duty, honor, and truth." },
      { item: "Krishna (Flute & Geeta)", meaning: "Detached action, joy in existence, and spiritual self-realization." }
    ],
    sloka: {
      verse: "Yada Yada Hi Dharmasya Glanir Bhavati Bharata | Abhyutthanam Adharmasya Tadatmanam Srijamyaham ||",
      meaning: "Whenever there is a decline in righteousness and a rise in unrighteousness, O Bharata, at that time I manifest Myself to protect the good and restore cosmic order."
    },
    accentColor: "#2A6F97",
    themeTag: "Cosmic Dharma"
  },
  {
    id: 8,
    name: "Chettiar & Aachi",
    tamilName: "செட்டியார் & ஆச்சி (Village Merchant Couple)",
    title: "Vaniga Vaibhavam — The Spirit of Commerce, Hospitality & Abundance",
    category: "Community & Society",
    padiTier: "Tier 4 — Worldly Community",
    stepNumber: 4,
    significance:
      "Placed on the lower tiers of the Golu, the Chettiar (trader) and his wife Aachi represent the agrarian village economy, bustling bazaars, honest commerce, and the generous hospitality that defines South Indian harvest celebrations.",
    summary:
      "Chettiar mama and Aachi sit happily with tiny brass measuring cups, bowls of lentils, rice, and jaggery, welcoming every guest with broad smiles and warm hospitality!",
    fullStory: [
      "In the thoughtful architectural hierarchy of a traditional Navaratri Golu, the top tiers honour celestial divinities, the middle tiers remember sages, epics, and family ancestors, and the lower tiers depict the thriving everyday world—villages, farmers, craftsmen, and traders.",
      "Chettiar and Aachi dolls sit cross-legged with an infectious, benevolent smile. Before them, children and families place miniature clay or brass bowls filled with nine sacred grains (Navadhanyam), pulses, lentils, cardamom, rock candy, and tiny brass balance scales (Tharasu).",
      "This charming pair honours the industrious merchant communities of Chettinad and Tamil Nadu whose sea-trade, architectural philanthropy, and deep hospitality built temple cities. They remind every Golu visitor that honest livelihood, sharing grain with neighbors, and smiling hospitality are holy forms of divine worship."
    ],
    interestingFacts: [
      "Visitors often affectionately place small real coins or grain grains in Chettiar's miniature brass bowl for good luck and bountiful business.",
      "The doll features a jovial rotund merchant with a traditional white cotton veshti and sacred ash (Vibhuti), while Aachi wears a bright checkered Madurai Sungudi saree.",
      "It represents the fundamental Navaratri value of 'Sundal Parimattram'—freely sharing nutritious legumes and snacks with all visitors without caste or economic distinction."
    ],
    symbolism: [
      { item: "Navadhanyam (Nine Grains)", meaning: "Agrarian prosperity, health, and seasonal vitality." },
      { item: "Tharasu (Weighing Scale)", meaning: "Honesty in trade, moral balance, and fair judgment." },
      { item: "Open Palm Smile", meaning: "Hospitality (Athithi Devo Bhava) welcoming every guest into the home." }
    ],
    sloka: {
      verse: "Annadanam Param Danam Vidyadanam Atah Param | Annena Kshanika Triptih Yavadjivam Cha Vidyaya ||",
      meaning: "Sharing food is among the highest virtues, for it nourishes the soul; when coupled with welcoming kindness, it blesses the entire community."
    },
    accentColor: "#A36B00",
    themeTag: "Community & Sharing"
  }
];

export function getDollById(id: number): DollStory {
  const found = GOLU_DOLLS.find((d) => d.id === id);
  return found || GOLU_DOLLS[0];
}
