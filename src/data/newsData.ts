export interface NewsArticle {
  id: string;
  slug: string;
  title: {
    np: string;
    en: string;
  };
  subtitle: {
    np: string;
    en: string;
  };
  excerpt: {
    np: string;
    en: string;
  };
  content: {
    np: string[];
    en: string[];
  };
  category: string;
  categoryName: {
    np: string;
    en: string;
  };
  image: string;
  imageCaption: {
    np: string;
    en: string;
  };
  author: {
    name: { np: string; en: string };
    role: { np: string; en: string };
    avatar: string;
  };
  date: string; // ISO
  dateNep: string;
  readTime: {
    np: string;
    en: string;
  };
  views: number;
  isBreaking?: boolean;
  isLead?: boolean;
  isTrending?: boolean;
  isEditorPick?: boolean;
  province?: "koshi" | "madhesh" | "bagmati" | "gandaki" | "lumbini" | "karnali" | "sudurpashchim";
  tags: {
    np: string[];
    en: string[];
  };
}

export const NEWS_ARTICLES: NewsArticle[] = [
  // 1. LEAD STORY - Politics & Infrastructure
  {
    id: "lead-1",
    slug: "nepal-clean-energy-export-milestone-regional-grid",
    title: {
      np: "नेपालको जलविद्युत दक्षिण एसियाली बजारमा: भारत र बंगलादेशसँग ऐतिहासिक त्रिपक्षीय विद्युत सम्झौता कार्यान्वयनमा",
      en: "Nepal's Clean Energy Landmark: Historic Trilateral Electricity Trade Pact with India & Bangladesh Takes Effect",
    },
    subtitle: {
      np: "ऊर्जा मन्त्रालयद्वारा पहिलो चरणमा ४० मेगावाट बिजुली बंगलादेश निर्यात सुरू, वार्षिक करोडौं डलर आम्दानी हुने अपेक्षा",
      en: "Energy Ministry initiates 40 MW export to Bangladesh in the first phase; multi-million dollar annual revenue expected",
    },
    excerpt: {
      np: "नेपाल, भारत र बंगलादेशबीच भएको ऐतिहासिक त्रिपक्षीय सम्झौता औपचारिक रूपमा कार्यान्वयनमा आएको छ। यससँगै नेपाल क्षेत्रीय हरित ऊर्जा केन्द्र बन्ने बाटोमा अगाडि बढेको छ।",
      en: "The landmark trilateral power trading pact between Nepal, India, and Bangladesh is officially operational, marking a transformative leap for Nepal as a regional green energy powerhouse.",
    },
    content: {
      np: [
        "काठमाडौँ — नेपाल, भारत र बंगलादेशबीच हस्ताक्षर भएको ऐतिहासिक त्रिपक्षीय विद्युत व्यापार सम्झौता औपचारिक रूपमा कार्यान्वयनमा आएको छ। ऊर्जा, जलस्रोत तथा सिँचाइ मन्त्रालयका अनुसार नेपाल विद्युत प्राधिकरणले ढल्केबर–मुजफ्फरपुर अन्तरदेशीय प्रसारण लाइन हुँदै बंगलादेशतर्फ ४० मेगावाट बिजुली निर्यात सुरु गरेको छ।",
        "यस ऐतिहासिक कदमले नेपालको स्वच्छ ऊर्जा क्षेत्रलाई दक्षिण एसियाली क्षेत्रीय बजारमा स्थापित गर्न ठूलो भूमिका खेल्ने विश्वास ऊर्जाविद्हरूले व्यक्त गरेका छन्। कार्यक्रममा सम्बोधन गर्दै ऊर्जा मन्त्रीले नेपालको जलविद्युत सम्भावना अब आन्तरिक खपतमा मात्र सीमित नरही छिमेकी मुलुकहरूको कार्बन उत्सर्जन न्यूनीकरण र आर्थिक समृद्धिको संवाहक बनेको बताउनुभयो।",
        "सम्झौता अनुसार आगामी पाँच वर्षसम्म हरेक वर्षको जुन १५ देखि नोभेम्बर १५ सम्म नेपालले बंगलादेशलाई बिजुली बिक्री गर्नेछ। यसबाट नेपालले प्रतियुनिट करिब ६.४ अमेरिकी सेन्ट आम्दानी गर्नेछ, जसले देशको विदेशी मुद्रा सञ्चितिमा उल्लेख्य योगदान पुर्‍याउनेछ।",
        "निजी क्षेत्रका ऊर्जा प्रवर्द्धकहरूले पनि यस सम्झौतालाई ऐतिहासिक उपलब्धि भन्दै स्वागत गरेका छन्। उनीहरूका अनुसार प्रसारण पूर्वाधारको थप विस्तार भएमा नेपालले आगामी दशकभित्र १० हजार मेगावाटभन्दा बढी विद्युत क्षेत्रीय बजारमा निर्यात गर्न सक्ने क्षमता राख्दछ।",
      ],
      en: [
        "KATHMANDU — The historic tripartite electricity trading agreement signed between Nepal, India, and Bangladesh has officially entered into force. According to the Ministry of Energy, Water Resources, and Irrigation, the Nepal Electricity Authority (NEA) has commenced exporting 40 megawatts of clean electricity toward Bangladesh via the Dhalkebar-Muzaffarpur cross-border transmission corridor.",
        "Energy specialists have hailed this milestone as a watershed moment positioning Nepal's abundant renewable hydropower on the broader South Asian energy map. Addressing the inaugural ceremony, the Energy Minister highlighted that Nepal's hydro capability is transitioning from domestic sufficiency to actively helping regional partners curb carbon emissions.",
        "Under the signed five-year framework, Nepal will supply electricity annually from June 15 to November 15. The designated tariff of roughly 6.4 US cents per unit will generate crucial foreign exchange earnings and bolster national financial reserves.",
        "Private clean energy developers welcomed the landmark pact, emphasizing that with expedited investment in high-voltage transmission interconnectors, Nepal is poised to export over 10,000 megawatts across regional borders within the coming decade.",
      ],
    },
    category: "politics",
    categoryName: { np: "राजनीति", en: "Politics" },
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1200&q=80",
    imageCaption: {
      np: "नेपालको जलविद्युत आयोजना तथा प्रसारण लाइन पूर्वाधार।",
      en: "Transmission lines and hydropower infrastructure in Nepal.",
    },
    author: {
      name: { np: "सन्तोष न्यौपाने", en: "Santosh Neupane" },
      role: { np: "वरिष्ठ राजनीतिक संवाददाता", en: "Senior Political Correspondent" },
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    },
    date: "2026-11-17T09:30:00Z",
    dateNep: "२०८१ मंसिर २ गते",
    readTime: { np: "४ मिनेट पढाइ", en: "4 min read" },
    views: 18450,
    isBreaking: true,
    isLead: true,
    isTrending: true,
    tags: {
      np: ["जलविद्युत", "ऊर्जा निर्यात", "नेपाल-भारत-बंगलादेश", "राजनीति"],
      en: ["Hydropower", "Energy Export", "Regional Trade", "Politics"],
    },
  },

  // 2. ECONOMY - NEPSE & Startup
  {
    id: "econ-1",
    slug: "nepse-index-rallies-bull-run-tech-stocks-record-turnover",
    title: {
      np: "नेप्से परिसूचकमा ५२ अंकको उछाल, कारोबार रकम १२ अर्ब माथि पुग्दा लगानीकर्तामा उत्साह",
      en: "NEPSE Rallies 52 Points with Record Turnover Exceeding Rs 12 Billion Amid Strong Investor Optimism",
    },
    subtitle: {
      np: "बैंकिङ, जलविद्युत र उत्पादनमूलक समूहमा हरियाली; ब्याजदर घट्दा पुँजी बजारमा लगानी ओइरियो",
      en: "Banking, hydro, and manufacturing sectors surge; softer interest rates trigger aggressive capital market inflow",
    },
    excerpt: {
      np: "नेपाल स्टक एक्सचेञ्ज (नेप्से) परिसूचक ५२.४ अंकले बढेर २,८१० बिन्दुमा पुगेको छ। मौद्रिक नीतिको लचिलोपन र वित्तीय तरलताले बजारमा सकारात्मक तरङ्ग ल्याएको छ।",
      en: "The benchmark NEPSE index gained 52.4 points to reach 2,810 points with vibrant trading volume, spurred by easy monetary liquidity and institutional buying.",
    },
    content: {
      np: [
        "काठमाडौँ — नेपाल स्टक एक्सचेञ्ज (नेप्से) परिसूचकमा लगातार चौथो दिन दोहोरो अंकको वृद्धि देखिएको छ। मंगलबारको कारोबारमा नेप्से ५२.४ अंकले बढेर २ हजार ८१०.५ अंकमा बन्द भएको छ। दिनभरिमा ३१२ कम्पनीका २ करोड ७० लाख कित्ता सेयर किनबेच हुँदा कुल १२ अर्ब ३५ करोड रुपैयाँ बराबरको ऐतिहासिक कारोबार भएको छ।",
        "वाणिज्य बैंकहरूले निक्षेप तथा कर्जाको ब्याजदर घटाएसँगै संस्थागत तथा व्यक्तिगत लगानीकर्ताहरू सेयर बजारमा आकर्षित भएका हुन्। खासगरी जलविद्युत र फाइनान्स समूहका कम्पनीहरूको सेयर मूल्यमा १० प्रतिशतको सकारात्मक सर्किट लागेको छ।",
        "बजार विश्लेषकहरूका अनुसार नेपाल राष्ट्र बैंकले हालै ल्याएको नीतिगत सहजीकरण र बैंकिङ प्रणालीमा रहेको पर्याप्त तरलताका कारण बजारले दिगो वृद्धिको लय समातेको छ। यसले रियल इस्टेट तथा अन्य उत्पादनशील क्षेत्रमा समेत सकारात्मक प्रभाव पार्ने आँकलन गरिएको छ।",
      ],
      en: [
        "KATHMANDU — The Nepal Stock Exchange (NEPSE) witnessed double-digit growth for the fourth consecutive trading session. On Tuesday, the benchmark index soared 52.4 points to close at 2,810.5 points. A staggering 27 million shares across 312 listed companies exchanged hands, clocking an impressive turnover of Rs 12.35 billion.",
        "The bull momentum follows concerted base rate cuts by commercial banks, which prompted institutional treasuries and retail investors to redeploy capital into equities. Hydropower and financial services led the charge with multiple scrips hitting their 10% upper circuit limits.",
        "Capital market analysts observe that recent regulatory easing by Nepal Rastra Bank paired with abundant system liquidity has provided strong technical momentum. The rally is expected to reinforce business sentiment across industrial sectors.",
      ],
    },
    category: "economy",
    categoryName: { np: "अर्थ / वाणिज्य", en: "Economy" },
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80",
    imageCaption: {
      np: "काठमाडौँस्थित सेयर बजार कारोबार डिस्प्ले।",
      en: "Stock market trading chart and financial ticker.",
    },
    author: {
      name: { np: "प्रशान्त अधिकारी", en: "Prashant Adhikari" },
      role: { np: "अर्थ ब्यूरो प्रमुख", en: "Economy Bureau Chief" },
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    },
    date: "2026-11-17T11:15:00Z",
    dateNep: "२०८१ मंसिर २ गते",
    readTime: { np: "३ मिनेट पढाइ", en: "3 min read" },
    views: 14200,
    isTrending: true,
    tags: {
      np: ["नेप्से", "सेयर बजार", "अर्थतन्त्र", "लगानी"],
      en: ["NEPSE", "Stock Market", "Economy", "Investment"],
    },
  },

  // 3. SPORTS - Cricket
  {
    id: "sports-1",
    slug: "nepal-cricket-t20-series-victory-rohit-paudel-masterclass",
    title: {
      np: "रोहित पौडेलको विस्फोटक शतकसँगै नेपालले जित्यो त्रिकोणात्मक टी-२० सिरिजको उपाधि",
      en: "Rohit Paudel's Blistering Century Powers Nepal to Tri-Nation T20 International Series Trophy",
    },
    subtitle: {
      np: "टियु मैदान कीर्तिपुरमा २० हजार दर्शकका अगाडि नेपालले रच्यो इतिहास, कप्तान रोहित ‘प्लेयर अफ द म्याच’ घोषित",
      en: "Nepal scripts historic victory in front of 20,000 roaring fans at Kirtipur; skipper Rohit adjudged Player of the Match",
    },
    excerpt: {
      np: "कीर्तिपुरस्थित त्रिवि अन्तर्राष्ट्रिय क्रिकेट मैदानमा भएको फाइनल खेलमा नेपालले उत्कृष्ट प्रदर्शन गर्दै त्रिकोणात्मक टी-२० सिरिजको ट्रफी उचालेको छ। कप्तान रोहित पौडेलको अविजित १०२ रन निर्णायक बन्यो।",
      en: "Captain Rohit Paudel's sensational unbeaten 102 off 54 balls propelled the Rhinos to a dominant victory in the tri-series final, sparking euphoric celebrations across Nepal.",
    },
    content: {
      np: [
        "काठमाडौँ — कीर्तिपुरस्थित त्रिवि क्रिकेट मैदानमा नेपाली राष्ट्रिय क्रिकेट टोलीले फेरि एकपटक आफ्नो दबदबा प्रमाणित गरेको छ। मंगलबार सम्पन्न त्रिकोणात्मक टी-२० अन्तर्राष्ट्रिय सिरिजको फाइनल भिडन्तमा नेपालले शानदार जित दर्ता गर्दै च्याम्पियन बनेको छ।",
        "टस जितेर पहिले ब्याटिङ रोजेको नेपालले निर्धारित २० ओभरमा ३ विकेट गुमाएर २१५ रनको विशाल योगफल खडा गरेको थियो। कप्तान रोहित पौडेलले केवल ५४ बलमा ८ चौका र ६ छक्का प्रहार गर्दै अविजित १०२ रन बनाए। यो रोहितको टी-२० अन्तर्राष्ट्रिय करियरको दोस्रो शतक हो। कुशल भुर्तेलले आक्रामक ४५ र दीपेन्द्र सिंह ऐरीले द्रुत ३२ रनको योगदान दिए।",
        "जवाफी ब्याटिङमा उत्रिएको विपक्षी टोली नेपाली स्पिनरहरूको कसिलो बलिङसामु १८.४ ओभरमा १५० रनमै समेटियो। सोमपाल कामी र सन्दीप लामिछानेले समान ३–३ विकेट लिए। कीर्तिपुरको रातो माटोमा हजारौं दर्शकले राष्ट्रिय झण्डा फहराउँदै जीतको उत्सव मनाए।",
      ],
      en: [
        "KATHMANDU — Nepal's national men's cricket team stamped their authority on home turf once again, lifting the prestigious Tri-Nation T20 International Series trophy at the TU International Cricket Ground in Kirtipur on Tuesday.",
        "Electing to bat first after winning the toss, Nepal piled on a formidable 215 for 3 in their stipulated 20 overs. Skipper Rohit Paudel played an innings of sheer brilliance, smashing an unbeaten 102 runs off merely 54 deliveries, decorated with 8 boundaries and 6 colossal sixes. Kushal Bhurtel contributed a solid 45, while Dipendra Singh Airee delivered quick-fire cameos.",
        "In response, the opposition was bowled out for 150 runs in 18.4 overs against disciplined bowling spearheaded by Sompal Kami and Sandeep Lamichhane, who claimed three wickets apiece. Thousands of impassioned fans waved the red-and-blue national flag in euphoric jubilation.",
      ],
    },
    category: "sports",
    categoryName: { np: "खेलकुद", en: "Sports" },
    image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=1200&q=80",
    imageCaption: {
      np: "त्रिवि क्रिकेट मैदान कीर्तिपुरमा नेपाली खेलाडीहरूको जितको खुसीयाली।",
      en: "Celebrations at the cricket ground after thrilling victory.",
    },
    author: {
      name: { np: "विनोद पाण्डे", en: "Binod Pandey" },
      role: { np: "खेलकुद सम्पादक", en: "Sports Editor" },
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    },
    date: "2026-11-17T13:45:00Z",
    dateNep: "२०८१ मंसिर २ गते",
    readTime: { np: "३ मिनेट पढाइ", en: "3 min read" },
    views: 22100,
    isBreaking: true,
    isTrending: true,
    tags: {
      np: ["नेपाल क्रिकेट", "रोहित पौडेल", "टी-२०", "क्यान", "खेलकुद"],
      en: ["Nepal Cricket", "Rohit Paudel", "T20", "CAN", "Sports"],
    },
  },

  // 4. SOCIETY & ENVIRONMENT - Himalayas
  {
    id: "society-1",
    slug: "himalayan-glaciers-climate-resilience-study-nepal-mountains",
    title: {
      np: "जलवायु परिवर्तनको मारमा हिमाल: सगरमाथा क्षेत्रका हिमनदी जोगाउन स्थानीय समुदायको उदाहरणीय अभियान",
      en: "Himalayas on the Frontline of Climate Change: Khumbu Sherpa Community Launches Pioneering Glacial Conservation Network",
    },
    subtitle: {
      np: "हिमनदी पग्लने क्रम तीव्र बन्दै गर्दा प्रारम्भिक चेतावनी प्रणाली र वातावरणमैत्री पर्यटन नीति लागु",
      en: "As glacial retreat accelerates, high-altitude sherpa communities deploy real-time early warning sensors and zero-waste trekking",
    },
    excerpt: {
      np: "सगरमाथा आधार शिविर र खुम्बु क्षेत्रमा जलवायु परिवर्तनका कारण हिमनदी तीव्र रूपमा खुम्चिँदै गएका छन्। यसलाई रोक्न र जोखिम न्यूनीकरण गर्न स्थानीय समुदायले आधुनिक प्रविधिको साथ लिएर संरक्षण अभियान थालेका छन्।",
      en: "Facing unprecedented warming and glacial melt in the Everest region, indigenous communities in Khumbu are pairing traditional ecological wisdom with satellite sensor networks to safeguard mountain livelihoods.",
    },
    content: {
      np: [
        "सोलुखुम्बु — जलवायु परिवर्तनको प्रत्यक्ष असर विश्वको सर्वोच्च शिखर सगरमाथा र वरपरका हिमनदीहरूमा स्पष्ट देखिन थालेको छ। अन्तर्राष्ट्रिय एकीकृत पर्वतीय विकास केन्द्र (इसिमोड) र स्थानीय शेर्पा समुदायले संयुक्त रूपमा तयार पारेको ताजा प्रतिवेदन अनुसार विगत दुई दशकमा हिमाली क्षेत्रको तापक्रम विश्वव्यापी औसतभन्दा दोब्बर गतिमा बढिरहेको छ।",
        "हिमनदी पग्लिएर बनेका खतरनाक हिमतालहरू फुट्ने जोखिम (ग्लोफ) बढेपछि खुम्बु पासाङल्हामु गाउँपालिकाले इम्जा र च्छो रोल्पा क्षेत्रमा स्वचालित पूर्वसूचना प्रणाली जडान गरेको छ। यसले तटीय क्षेत्रका हजारौं बासिन्दालाई सम्भावित बाढीबाट जोगिन पूर्वजानकारी दिनेछ।",
        "अभियानमा सहभागी स्थानीय युवाहरूले वातावरणमैत्री पदयात्रा (ग्रिन ट्रेकिङ) आचारसंहिता लागु गरेका छन्। स्थानीय शेर्पा अगुवा आङ दावाले भन्नुभयो, 'हिमाल हाम्रा देवता हुन् र हाम्रो जीवनको आधार हुन्। हामीले आफ्नो थातथलो जोगाउन आफैं अग्रसर हुनुपरेको छ।'",
      ],
      en: [
        "SOLUKHUMBU — The tangible ramifications of global climate shifts are increasingly pronounced across Mount Everest and its adjoining glacial systems. According to joint research published by ICIMOD and local high-altitude sherpa organizations, temperatures across the Hindu Kush Himalaya are climbing at twice the global average.",
        "To mitigate the catastrophic threats of Glacial Lake Outburst Floods (GLOFs), local rural municipalities have operationalized early-warning sensor matrices around fragile glacial basins such as Imja Tsho and Tsho Rolpa, protecting downstream valley communities.",
        "Local environmental stewards have rolled out stringent sustainable mountaineering charters requiring complete biodegradable waste recovery. 'These snowy peaks are our sacred guardians and lifeblood. Local vigilance combined with global climate justice is essential,' remarked indigenous conservation leader Ang Dawa Sherpa.",
      ],
    },
    category: "society",
    categoryName: { np: "समाज", en: "Society" },
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80",
    imageCaption: {
      np: "सगरमाथा क्षेत्रको मनोरम दृश्य तथा हिमनदी।",
      en: "Breathtaking vista of the Everest mountain range in Nepal.",
    },
    author: {
      name: { np: "सरिता तामाङ", en: "Sarita Tamang" },
      role: { np: "पर्यावरण तथा समाज संवाददाता", en: "Environment & Society Reporter" },
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
    },
    date: "2026-11-17T08:00:00Z",
    dateNep: "२०८१ मंसिर २ गते",
    readTime: { np: "४ मिनेट पढाइ", en: "4 min read" },
    views: 9800,
    province: "koshi",
    tags: {
      np: ["जलवायु परिवर्तन", "हिमाल", "सगरमाथा", "पर्यावरण", "समाज"],
      en: ["Climate Change", "Everest", "Himalayas", "Environment", "Society"],
    },
  },

  // 5. TECHNOLOGY - AI & Digital Nepal
  {
    id: "tech-1",
    slug: "nepal-digital-ai-innovation-hub-kathmandu-startup-ecosystem",
    title: {
      np: "नेपालमै विकास भयो नेपाली भाषा बुझ्ने ठूलो एआई मोडेल: प्रशासनिक काम र शिक्षामा क्रान्तिको अपेक्षा",
      en: "Nepal Unveils First Indigenous Nepali Language Large AI Model to Transform Public Administration & Education",
    },
    subtitle: {
      np: "नेपाली इन्जिनियरहरूको टोलीद्वारा ११० अर्ब टोकनमा आधारित ओपन-सोर्स देवनागरी एलएलएम सार्वजनिक",
      en: "Engineered by Kathmandu AI research lab on 110-billion Devanagari tokens; opens new horizons for vernacular tech",
    },
    excerpt: {
      np: "नेपालका युवा सफ्टवेयर इन्जिनियरहरू र अनुसन्धानकर्ताहरूको टोलीले नेपाली भाषा, स्थानीय भाषाहरू र देवनागरी लिपिका लागि विशेष रूपमा तालिम प्राप्त आर्टिफिसियल इन्टेलिजेन्स (एआई) मोडेल सार्वजनिक गरेका छन्।",
      en: "A dynamic consortium of Nepali AI researchers and university labs has successfully launched an open-source Large Language Model finely tuned for Nepali linguistic nuances and administrative terminology.",
    },
    content: {
      np: [
        "काठमाडौँ — नेपालको सूचना प्रविधि क्षेत्रमा एउटा महत्वपूर्ण कोशेढुङ्गा हासिल भएको छ। काठमाडौँस्थित ओपन एआई रिसर्च ग्रुप र त्रिभुवन विश्वविद्यालयका अनुसन्धानकर्ताहरूले संयुक्त रूपमा 'सञ्जीवनी एआई' नामक बृहत् भाषिक मोडेल सार्वजनिक गरेका छन्।",
        "यो मोडेलले नेपाली भाषाका व्याकरण, मुहावरा, कानुनी दस्तावेज र विभिन्न क्षेत्रीय लवजहरूलाई ९८ प्रतिशत शुद्धताका साथ बुझ्न र प्रशोधन गर्न सक्ने विकासकर्ताहरूको दाबी छ। यसलाई सरकारी कार्यालयहरूमा सेवाग्राहीका निवेदन विश्लेषण गर्न, डिजिटल स्वास्थ्य परामर्श दिन र विद्यालयहरूमा स्थानीय पाठ्यक्रम पढाउन प्रयोग गर्न सकिनेछ।",
        "सूचना प्रविधि मन्त्रालयले यस परियोजनालाई 'डिजिटल नेपाल फ्रेमवर्क' अन्तर्गत प्राथमिकतामा राख्ने घोषणा गरेको छ। यसले नेपाली युवाहरूलाई स्वदेशमै उच्च-स्तरीय टेक रोजगारी सिर्जना गर्न मद्दत पुर्‍याउने विश्वास गरिएको छ।",
      ],
      en: [
        "KATHMANDU — Nepal's burgeoning tech sector marked a watershed achievement today as a consortium of young engineers and Tribhuvan University computer scientists unveiled 'Sanjeevani AI', an indigenous foundational language model tailored for Devanagari scripts.",
        "Trained across more than 110 billion curated tokens spanning classical Nepali literature, legal gazettes, and vernacular dialogues, the model achieves over 98% accuracy in syntactic reasoning and dialect comprehension. Potential deployments span automated citizen grievance routing, telemedicine triage, and personalized regional education.",
        "The Ministry of Information and Communication Technology announced strategic grants under the Digital Nepal Framework to integrate the system into government web portals and court records processing.",
      ],
    },
    category: "technology",
    categoryName: { np: "प्रविधि", en: "Technology" },
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
    imageCaption: {
      np: "काठमाडौँमा प्रविधि र सफ्टवेयर अनुसन्धानकर्ताहरूको काम।",
      en: "Nepali software engineers at a tech innovation incubator.",
    },
    author: {
      name: { np: "अमित श्रेष्ठ", en: "Amit Shrestha" },
      role: { np: "प्रविधि संवाददाता", en: "Technology Editor" },
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80",
    },
    date: "2026-11-17T07:20:00Z",
    dateNep: "२०८१ मंसिर २ गते",
    readTime: { np: "३ मिनेट पढाइ", en: "3 min read" },
    views: 11200,
    isEditorPick: true,
    tags: {
      np: ["एआई", "प्रविधि", "डिजिटल नेपाल", "स्टार्टअप", "सफ्टवेयर"],
      en: ["AI", "Technology", "Digital Nepal", "Startups", "Software"],
    },
  },

  // 6. OPINION - Editorial & Thought
  {
    id: "opinion-1",
    slug: "rethinking-youth-emigration-nepal-economic-future-pathway",
    title: {
      np: "युवा जनशक्तिको पलायन रोक्न नीतिगत पुनर्विचार: रेमिट्यान्सको विकल्प स्वदेशी उद्यमशीलता",
      en: "Rethinking Youth Outmigration: Transforming Nepal from a Remittance Dependency to an Enterprise Economy",
    },
    subtitle: {
      np: "दैनिक हजारौं युवा विमानस्थलबाट बाहिरिँदा देशको उत्पादन प्रणाली कमजोर बन्दै, आन्तरिक उत्पादनमा सहुलियत दिनुपर्ने आवश्यकता",
      en: "Why structural incentives for domestic manufacturing, agro-tech, and tax credits are crucial to retaining young talent",
    },
    excerpt: {
      np: "नेपालको अर्थतन्त्रलाई लामो समयसम्म रेमिट्यान्सले धान्न सक्दैन। युवा जनशक्तिलाई स्वदेशमै रोक्न कृषि आधुनिकीकरण, प्रविधि उद्योग र कर सहुलियतसहितको साहसिक नीतिगत सुधार आवश्यक भइसकेको छ।",
      en: "Relying indefinitely on overseas remittance is an unsustainable gamble. Nepal must implement radical reforms in agro-processing, digital industries, and startup capital access to unlock youthful potential at home.",
    },
    content: {
      np: [
        "हरेक दिन त्रिभुवन अन्तर्राष्ट्रिय विमानस्थलको प्रस्थान कक्षमा देखिने दृश्यले हरेक सचेत नेपालीको मन भारी बनाउँछ। आफ्नो जीवनको ऊर्जाशील समय देशको विकासमा लगाउनुपर्ने हजारौं युवा पासपोर्ट बोकेर खाडी र युरोपका गन्तव्यतिर उडिरहेका छन्।",
        "विदेशी मुद्रा आर्जन र गरिबी निवारणमा रेमिट्यान्सले तत्काल राहत दिएको सत्य हो, तर यसको दीर्घकालीन मूल्य देशले उत्पादन क्षेत्रको ह्रास र प्रतिभा पलायन (ब्रेन ड्रेन) को रूपमा तिरिरहेको छ। गाउँका उर्वर खेतहरू बाँझिएका छन्, उद्योगहरू कामदारको अभावमा छटपटाइरहेका छन्।",
        "अब राज्यले परम्परागत घोषणापत्रबाट माथि उठेर युवा उद्यमशीलतालाई व्यवहारमै प्रोत्साहन गर्नुपर्छ। बिनाधितो सहुलियतपूर्ण ऋण, प्रविधि स्टार्टअपलाई ५ वर्षसम्म पूर्ण कर छुट, र व्यावसायिक कृषिलाई बजार प्रत्याभूति दिन सके मात्र हाम्रो जनशक्ति यहीँ स्वाभिमानका साथ बाँच्न सक्नेछ।",
      ],
      en: [
        "The daily departure lines at Tribhuvan International Airport represent a poignant reminder of our national paradox: hundreds of energetic, educated youth departing in search of dignified livelihoods abroad while our domestic productive capacities remain dormant.",
        "While inward remittances have provided vital macroeconomic balance, the enduring structural cost is visible in abandoned terraced farms, depleted skilled trades, and intellectual drain across every sector.",
        "The state must replace bureaucratic rhetoric with resolute action: collateral-free incubation credit lines, multi-year tax holidays for tech export ventures, and institutional forward-contracts for agricultural produce. Only when domestic opportunities match global aspirations will Nepal thrive.",
      ],
    },
    category: "opinion",
    categoryName: { np: "विचार", en: "Opinion" },
    image: "https://images.unsplash.com/photo-1455849318743-b2233052fcff?auto=format&fit=crop&w=1200&q=80",
    imageCaption: {
      np: "नेपाली युवा उद्यमशीलता र आर्थिक बहस।",
      en: "Reflections on youth enterprise and economic policy in Nepal.",
    },
    author: {
      name: { np: "डा. महेश कार्की", en: "Dr. Mahesh Karki" },
      role: { np: "अर्थशास्त्री तथा स्तम्भकार", en: "Economist & Columnist" },
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80",
    },
    date: "2026-11-17T06:15:00Z",
    dateNep: "२०८१ मंसिर २ गते",
    readTime: { np: "५ मिनेट पढाइ", en: "5 min read" },
    views: 8900,
    tags: {
      np: ["विचार", "युवा", "अर्थतन्त्र", "उद्यमशीलता", "रेमिट्यान्स"],
      en: ["Opinion", "Youth", "Economy", "Enterprise", "Remittance"],
    },
  },

  // 7. ENTERTAINMENT - Nepali Cinema & Art
  {
    id: "ent-1",
    slug: "nepali-cinema-international-film-festival-standing-ovation",
    title: {
      np: "टोरन्टो अन्तर्राष्ट्रिय चलचित्र महोत्सवमा नेपाली फिल्म ‘उकाली-ओराली’ लाई दर्शकको स्ट्यान्डिङ ओभेसन",
      en: "Nepali Feature Film 'Ukali-Orali' Receives 8-Minute Standing Ovation at Toronto International Film Festival",
    },
    subtitle: {
      np: "नेपाली मौलिक कथा, अर्गानिक अभिनय र हिमाली जीवनशैलीको जीवन्त चित्रणले विश्व मञ्चमा पायो उच्च प्रशंसा",
      en: "Director Prakash Shrestha's authentic portrayal of high-altitude transhumance and family bonds captivates international critics",
    },
    excerpt: {
      np: "क्यानडाको प्रतिष्ठित टोरन्टो अन्तर्राष्ट्रिय चलचित्र महोत्सवमा प्रदर्शन भएको नेपाली चलचित्र 'उकाली-ओराली' ले विश्वभरका दर्शक तथा समीक्षकको मन जितेको छ।",
      en: "Screened at the prestigious Toronto International Film Festival, the evocative Nepali drama earned resounding critical acclaim, signaling a vibrant golden era for Himalayan cinema.",
    },
    content: {
      np: [
        "टोरन्टो / काठमाडौँ — नेपाली मौलिक सिनेमाले अन्तर्राष्ट्रिय मञ्चमा फेरि एकपटक देशको गौरव बढाएको छ। निर्देशक प्रकाश श्रेष्ठको निर्देशनमा बनेको नेपाली कथानक चलचित्र 'उकाली-ओराली' को विश्व प्रिमियरमा उपस्थित विदेशी दर्शक र समीक्षकहरूले ८ मिनेटसम्म उठेर ताली बजाएका छन्।",
        "चलचित्रले नेपालको उच्च हिमाली क्षेत्रमा भेडापालन गरेर गुजारा चलाउने एक दुर्गम परिवारको संघर्ष, शिक्षाप्रतिको चाहना र बसाइँसराइको पीडालाई अत्यन्त कलात्मक ढङ्गले प्रस्तुत गरेको छ। मुख्य भूमिकामा रहेका अभिनेता तथा अभिनेत्रीको जीवन्त अभिनयले हलमा उपस्थित धेरैलाई भावुक बनाएको थियो।",
        "हलिउड रिपोर्टर र भेराइटी म्यागजिनले फिल्मको समीक्षा गर्दै नेपाली सिनेमाको सिनेम्याटोग्राफी र अर्गानिक ध्वनिलाई ५ मध्ये ४.५ स्टार रेटिङ दिएका छन्। चलचित्र आगामी पुस महिनामा नेपालभर प्रदर्शनमा आउने निर्माण पक्षले जनाएको छ।",
      ],
      en: [
        "TORONTO / KATHMANDU — In a resonant triumph for Nepali cinema, director Prakash Shrestha's feature film 'Ukali-Orali' earned an exhilarating eight-minute standing ovation at its world premiere at the Toronto International Film Festival (TIFF).",
        "Set against the rugged, breathtaking slopes of western Nepal, the film depicts the intergenerational journey of a nomadic herding family confronting climate shifts, modernization, and the pursuit of schooling. The unvarnished, emotionally authentic performances brought audiences to tears.",
        "Major trade publications including Variety and The Hollywood Reporter commended the film's poetic cinematography and authentic ambient soundscapes, awarding it rave reviews. The film is slated for nationwide theatrical release across Nepal this winter.",
      ],
    },
    category: "entertainment",
    categoryName: { np: "मनोरञ्जन", en: "Entertainment" },
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1200&q=80",
    imageCaption: {
      np: "अन्तर्राष्ट्रिय फिल्म फेस्टिभलमा नेपाली चलचित्रको प्रिमियर।",
      en: "Cinema screen and audience during international film festival.",
    },
    author: {
      name: { np: "सुनिता लामा", en: "Sunita Lama" },
      role: { np: "मनोरञ्जन संवाददाता", en: "Entertainment Correspondent" },
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
    },
    date: "2026-11-17T05:00:00Z",
    dateNep: "२०८१ मंसिर २ गते",
    readTime: { np: "३ मिनेट पढाइ", en: "3 min read" },
    views: 13400,
    isTrending: true,
    tags: {
      np: ["नेपाली चलचित्र", "मनोरञ्जन", "अन्तर्राष्ट्रिय अवार्ड", "सिनेमा"],
      en: ["Nepali Cinema", "Entertainment", "Film Festival", "Movies"],
    },
  },

  // 8. WORLD - International Relations & COP
  {
    id: "world-1",
    slug: "global-climate-summit-loss-and-damage-fund-mountain-nations",
    title: {
      np: "विश्व जलवायु सम्मेलन: पर्वतीय मुलुकहरूको आवाज बुलन्द गर्दै नेपालद्वारा 'हानि-नोक्सानी कोष' बाट न्यायोचित सहयोगको माग",
      en: "Global Climate Summit: Nepal Champions Mountain Nations, Urging Immediate Access to Loss and Damage Fund",
    },
    subtitle: {
      np: "नेपाली प्रतिनिधिमण्डलद्वारा हिमाली राष्ट्रहरूको साझा घोषणापत्र प्रस्तुत, विकसित मुलुकहरूलाई वित्तीय प्रतिबद्धता पूरा गर्न दबाब",
      en: "Nepali delegation presents joint mountain declaration, pressing industrialized nations to honor loss and damage pledges",
    },
    excerpt: {
      np: "विश्व जलवायु शिखर सम्मेलनमा नेपालले हिमाली तथा पर्वतीय राष्ट्रहरूको नेतृत्व गर्दै कार्बन उत्सर्जन नगर्ने मुलुकहरूले जलवायु विपत्तिको भारी बोक्न नहुने तर्क दृढताका साथ प्रस्तुत गरेको छ।",
      en: "At the World Climate Summit, Nepal spearheaded a coalition of mountain states, demanding equitable, direct access to international loss and damage climate finance.",
    },
    content: {
      np: [
        "बाकु / काठमाडौँ — विश्व जलवायु परिवर्तन सम्बन्धी २९औं पक्ष राष्ट्र सम्मेलन (कोप-२९) मा नेपालले पर्वतीय पारिस्थितिक प्रणालीको रक्षाका लागि विश्व समुदायको ध्यानाकर्षण गराएको छ। नेपाली उच्चस्तरीय प्रतिनिधिमण्डलले सम्मेलनको पूर्ण सत्रमा सम्बोधन गर्दै हिमाल पग्लँदा उत्पन्न हुने संकट केवल नेपालको मात्र नभई तल्लो तटीय क्षेत्रका २ अर्ब जनताको खाद्य र पानी सुरक्षासँग जोडिएको बताएको छ।",
        "नेपालले स्थापना गरिएको 'हानि-नोक्सानी कोष' (लस एण्ड ड्यामेज फण्ड) बाट अति जोखिममा रहेका हिमाली मुलुकहरूलाई विना सर्त सिधै अनुदान उपलब्ध गराउनुपर्ने माग राखेको छ। जटिल प्रक्रिया र ऋणका रूपमा दिइने सहायता अस्वीकार्य हुने नेपालको अडान थियो।",
        "विभिन्न २० भन्दा बढी पर्वतीय राष्ट्रहरूले नेपालको प्रस्तावलाई समर्थन गर्दै संयुक्त घोषणापत्रमा हस्ताक्षर गरेका छन्। यसले अन्तर्राष्ट्रिय वार्ताहरूमा नेपालको कूटनीतिक प्रभाव बढाएको परराष्ट्र विज्ञहरूले टिप्पणी गरेका छन्।",
      ],
      en: [
        "BAKU / KATHMANDU — At the ongoing UN Climate Change Conference, Nepal assumed a decisive leadership role for fragile mountain ecosystems, spotlighting that melting glaciers endanger food and water security for two billion downstream inhabitants across South and Southeast Asia.",
        "The Nepali delegation vehemently argued that the operationalized Loss and Damage Fund must disburse direct, unconditional grants rather than cumbersome loans to vulnerable mountain countries bearing the brunt of zero-carbon culpability.",
        "Over twenty mountain and island nations endorsed Nepal's multilateral resolution, reflecting growing diplomatic sway in international environmental negotiations.",
      ],
    },
    category: "world",
    categoryName: { np: "विश्व", en: "World" },
    image: "https://images.unsplash.com/photo-1569163139599-0f4517e36f51?auto=format&fit=crop&w=1200&q=80",
    imageCaption: {
      np: "विश्व जलवायु सम्मेलनको मुख्य सभा हल।",
      en: "Delegates assembled at the World Climate Summit plenary.",
    },
    author: {
      name: { np: "दीपेन्द्र अधिकारी", en: "Dipendra Adhikari" },
      role: { np: "अन्तर्राष्ट्रिय मामिला सम्पादक", en: "International Affairs Editor" },
      avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80",
    },
    date: "2026-11-17T04:30:00Z",
    dateNep: "२०८१ मंसिर २ गते",
    readTime: { np: "४ मिनेट पढाइ", en: "4 min read" },
    views: 7600,
    tags: {
      np: ["विश्व", "जलवायु सम्मेलन", "नेपाल कूटनीति", "पर्यावरण"],
      en: ["World", "COP", "Diplomacy", "Environment", "Climate"],
    },
  },

  // 9. LIFESTYLE & HEALTH - Wellness & Travel
  {
    id: "life-1",
    slug: "annapurna-circuit-sustainable-eco-trekking-wellness-travel",
    title: {
      np: "अन्नपूर्ण पदमार्गमा नयाँ इको-ट्रेक रुट सञ्चालन: स्थानीय अर्गानिक खानपान र योग पर्यटनले लियो गति",
      en: "Annapurna Circuit Introduces Sustainable Eco-Trails: Local Organic Gastronomy & Yoga Trekking Surge in Popularity",
    },
    subtitle: {
      np: "गण्डकी प्रदेश सरकारद्वारा सडक विस्तार नभएका परम्परागत हिमाली बाटोहरूको संरक्षण, स्वदेशी तथा विदेशी पर्यटक आकर्षित",
      en: "Gandaki Province revitalizes traditional walking pathways untouched by vehicular roads, blending mindfulness with pristine nature",
    },
    excerpt: {
      np: "अन्नपूर्ण पदमार्ग क्षेत्रमा मोटरबाटोको प्रभाव कम गर्दै नयाँ वैकल्पिक पदमार्ग र अर्गानिक वेलनेस रिसोर्टहरू सञ्चालनमा आएका छन्। यसले शान्त वातावरणमा पदयात्रा गर्न चाहनेहरूको आकर्षण बढाएको छ।",
      en: "To preserve authentic trekking thrills amidst road expansion, Gandaki authorities have opened pristine alternative footpaths spotlighting organic dining, homestays, and sunrise meditation lodges.",
    },
    content: {
      np: [
        "पोखरा — विश्वप्रसिद्ध अन्नपूर्ण पदमार्गमा पदयात्रीहरूको अनुभवलाई थप समृद्ध बनाउन नयाँ वैकल्पिक 'इको-ट्रेकिङ रुट' सञ्चालनमा ल्याइएको छ। मोटरबाटोले परम्परागत पदमार्ग बिग्रिएको गुनासो आइरहेका बेला गण्डकी प्रदेश पर्यटन मन्त्रालय र अन्नपूर्ण संरक्षण क्षेत्र आयोजना (एक्याप) ले नयाँ बाटोहरू पहिचान गरी मार्किङ गरेका छन्।",
        "नयाँ रुटमा स्थानीय गाउँलेहरूद्वारा सञ्चालित होमस्टेहरूमा कोदो, फापर, हिमाली सिमी र लोकल स्याउबाट बनेका परिकारहरू पस्कने गरिएको छ। यसका साथै विहानको सूर्योदयसँगै ध्यान र योग शिविरहरू आयोजना गरिन थालिएको छ।",
        "मनाङ र मुस्ताङका स्थानीय व्यवसायीहरूका अनुसार यस वर्ष युरोप, अमेरिकाका साथै छिमेकी भारत र आन्तरिक नेपाली युवा पर्यटकहरूको आगमनमा ३५ प्रतिशतले वृद्धि भएको छ। यसले हिमाली गाउँहरूको अर्थतन्त्र उकास्न ठूलो टेवा पुर्‍याएको छ।",
      ],
      en: [
        "POKHARA — To reinvigorate the world-renowned Annapurna Circuit, the Gandaki Provincial Tourism Board together with the Annapurna Conservation Area Project (ACAP) has inaugurated a network of scenic alternative 'Eco-Trek' trails insulated from vehicular traffic.",
        "The newly mapped trails emphasize community-owned eco-lodges offering locally harvested buckwheat, high-altitude millet, and organic apple culinary specialties. In addition, sunrise mindfulness and Himalayan yoga retreats have witnessed burgeoning interest.",
        "Local hospitality operators in Manang and Mustang report a 35% surge in international and domestic trekking footfalls this autumn, rejuvenating grassroots livelihoods.",
      ],
    },
    category: "lifestyle",
    categoryName: { np: "जीवनशैली", en: "Lifestyle" },
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    imageCaption: {
      np: "अन्नपूर्ण पदमार्गमा ट्रेकिङ र रमणीय प्रकृतिको आनन्द लिँदै पर्यटकहरू।",
      en: "Trekkers taking in the majestic panoramic views in Annapurna region.",
    },
    author: {
      name: { np: "प्रिया गुरुङ", en: "Priya Gurung" },
      role: { np: "जीवनशैली तथा यात्रा स्तम्भकार", en: "Lifestyle & Travel Writer" },
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    },
    date: "2026-11-17T03:30:00Z",
    dateNep: "२०८१ मंसिर २ गते",
    readTime: { np: "३ मिनेट पढाइ", en: "3 min read" },
    views: 6500,
    province: "gandaki",
    tags: {
      np: ["जीवनशैली", "अन्नपूर्ण", "पर्यटन", "स्वास्थ्य", "ट्रेकिङ"],
      en: ["Lifestyle", "Annapurna", "Tourism", "Health", "Trekking"],
    },
  },

  // 10. PROVINCIAL NEWS - Madhesh & Agriculture
  {
    id: "prov-1",
    slug: "madhesh-province-solar-irrigation-revolution-paddy-farmers",
    title: {
      np: "मधेशका किसानलाई राहत: सोलार सिँचाइ प्रणाली विस्तारसँगै चैते धान र तरकारी उत्पादनमा दोब्बर वृद्धि",
      en: "Relief for Madhesh Farmers: Solar Irrigation Drives Record Yield in Spring Paddy and High-Value Vegetables",
    },
    subtitle: {
      np: "धनुषा, महोत्तरी र सिरहाका ५ हजार बिघा खेतमा सौर्य सिँचाइ जडान, डिजेल पम्पको खर्च जोगिँदा किसान खुसी",
      en: "Solar pump installations across 5,000 bighas replace costly diesel generators, boosting farmer incomes in Dhanusha and Siraha",
    },
    excerpt: {
      np: "तराई मधेशमा हिउँद र खडेरीको समयमा सिँचाइको अभाव झेल्दै आएका किसानहरूका लागि सोलार बोरिङ योजना वरदान सावित भएको छ। विद्युतको भर पर्नु नपर्दा उत्पादन लागत आधा घटेको छ।",
      en: "Solar-powered deep tubewells have revolutionized farming in Madhesh, drastically lowering irrigation costs and insulating staple crop cycles from dry-spells.",
    },
    content: {
      np: [
        "जनकपुरधाम — मधेश प्रदेशमा कृषि उत्पादन बढाउन सुरु गरिएको मुख्यमन्त्री सौर्य सिँचाइ कार्यक्रमले उत्साहजनक नतिजा दिएको छ। धनुषा, महोत्तरी र सर्लाहीका दुर्गम गाउँहरूमा सौर्य ऊर्जाबाट चल्ने पानी तान्ने पम्पहरू जडान गरिएपछि सिँचाइ नपाएर बाँझो रहने हजारौं बिघा जमिन हरियाली बनेको छ।",
        "किसानहरूले यसअघि डिजेल पम्प प्रयोग गर्दा प्रतिघण्टा ५०० रुपैयाँभन्दा बढी खर्च गर्नुपर्थ्यो। अब सौर्य प्रणाली निःशुल्क उपलब्ध भएपछि चैते धान र मौसमी तरकारी खेतीमा उत्साह छाएको किसान रामप्रसाद यादवले बताए।",
        "कृषि विकास निर्देशनालयले आगामी आर्थिक वर्षभित्र थप १० हजार परिवारलाई यस योजनामा समेट्ने तयारी गरेको छ। यसले मधेशलाई फेरि देशकै मुख्य अन्न भण्डारका रूपमा स्थापित गर्न मद्दत गर्ने अपेक्षा गरिएको छ।",
      ],
      en: [
        "JANAKPUR — The Chief Minister Solar Irrigation Initiative in Madhesh Province is yielding transformative outcomes for agrarian livelihoods. Across interior tracts of Dhanusha, Mahottari, and Sarlahi, hundreds of solar tubewells have revived parched farmlands into lush green paddies.",
        "Farmers who once incurred heavy recurring outlays on diesel pumps now irrigate fields at zero operational cost, enabling multiple cropping cycles annually. 'This has completely turned around our household economics,' noted local vegetable farmer Ram Prasad Yadav.",
        "The Provincial Agriculture Directorate announced plans to scale the initiative to cover an additional 10,000 farming households across the plains by next year.",
      ],
    },
    category: "society",
    categoryName: { np: "समाज", en: "Society" },
    image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&q=80",
    imageCaption: {
      np: "तराईका हरियाली खेतहरू र आधुनिक सौर्य सिँचाइ सुविधा।",
      en: "Lush green agricultural fields in the Terai plains of Nepal.",
    },
    author: {
      name: { np: "राजेन्द्र मण्डल", en: "Rajendra Mandal" },
      role: { np: "मधेश ब्यूरो प्रमुख", en: "Madhesh Bureau Chief" },
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    },
    date: "2026-11-17T02:45:00Z",
    dateNep: "२०८१ मंसिर २ गते",
    readTime: { np: "३ मिनेट पढाइ", en: "3 min read" },
    views: 5200,
    province: "madhesh",
    tags: {
      np: ["मधेश", "कृषि", "सिँचाइ", "किसान", "सौर्य ऊर्जा"],
      en: ["Madhesh", "Agriculture", "Irrigation", "Farmers", "Solar"],
    },
  },

  // 11. POLITICS - Governance & Constitution
  {
    id: "pol-2",
    slug: "parliament-unanimously-passes-e-governance-public-service-bill",
    title: {
      np: "संसद्द्वारा 'विद्युतीय सुशासन तथा सार्वजनिक सेवा विधेयक' सर्वसम्मत पारित: अब सरकारी काममा लाइन बस्नु नपर्ने",
      en: "Parliament Unanimously Passes Digital Public Services Act: Paving the Way for Paperless, Queue-Free Governance",
    },
    subtitle: {
      np: "राष्ट्रिय परिचयपत्रबाटै सबै सरकारी सेवा प्राप्त हुने, सेवाग्राहीलाई तोकिएको समयमै काम नभए क्षतिपूर्ति दिने व्यवस्था",
      en: "Citizens can access citizen services via verified National ID; time-bound service guarantees introduced for administrative offices",
    },
    excerpt: {
      np: "प्रतिनिधिसभाबाट विद्युतीय सुशासन विधेयक सर्वसम्मतले पारित भएको छ। यसले सरकारी कार्यालयका सबै झन्झटिला कागजी प्रक्रिया अन्त्य गरी अनलाइन नागरिक एपमार्फत सेवा दिन बाटो खुला गरेको छ।",
      en: "The House of Representatives has unanimously endorsed the Digital Public Services Act, establishing citizen rights to rapid online government approvals and paperless bureaucratic workflows.",
    },
    content: {
      np: [
        "काठमाडौँ — संसद्को दुवै सदनबाट 'विद्युतीय सुशासन तथा सार्वजनिक सेवा प्रवाह विधेयक २०८१' सर्वसम्मत रूपमा पारित भएको छ। राष्ट्रपतिबाट प्रमाणीकरण भएपछि यो कानुन औपचारिक रूपमा लागु हुनेछ।",
        "नयाँ कानुन अनुसार अब राहदानी, सवारी चालक अनुमतिपत्र, नागरिकताको प्रतिलिपि, जग्गा दर्ता र कर चुक्ता लगायतका ५० भन्दा बढी आधारभूत नागरिक सेवाहरू पूर्ण रूपमा डिजिटल हुनेछन्। नागरिकहरूले लाइन बस्नुपर्ने बाध्यता अन्त्य गर्न हरेक मन्त्रालय र विभागलाई ६ महिनाभित्र आफ्ना सेवा नागरिक एपसँग अन्तरआबद्ध गर्न समय दिइएको छ।",
        "विधेयकमा सेवाग्राहीको काम तोकिएको समयभित्र विनाकारण रोकेमा सम्बन्धित अधिकृतमाथि विभागीय कारबाही हुने र सेवाग्राहीलाई क्षतिपूर्ति दिने कडा प्रावधान समेत राखिएको छ। यस कदमलाई सुशासनका पक्षधरहरूले स्वागत गरेका छन्।",
      ],
      en: [
        "KATHMANDU — In a decisive push toward digital transparency, both houses of parliament have unanimously enacted the landmark Digital Public Services Act 2026.",
        "Under the sweeping legislation, more than 50 frontline citizen services including passports, driving licenses, vital registrations, land tax assessments, and business permits will transition entirely to the integrated Nagarik App portal. Inter-agency data sharing will eliminate duplicate physical verification.",
        "Crucially, the law introduces time-bound administrative accountability, penalizing unwarranted delays and providing compensation to affected citizens.",
      ],
    },
    category: "politics",
    categoryName: { np: "राजनीति", en: "Politics" },
    image: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1200&q=80",
    imageCaption: {
      np: "संसद् भवन नयाँ बानेश्वरमा विधेयक पारित हुँदै।",
      en: "Federal Parliament building in New Baneshwor, Kathmandu.",
    },
    author: {
      name: { np: "सन्तोष न्यौपाने", en: "Santosh Neupane" },
      role: { np: "वरिष्ठ राजनीतिक संवाददाता", en: "Senior Political Correspondent" },
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    },
    date: "2026-11-16T16:00:00Z",
    dateNep: "२०८१ मंसिर १ गते",
    readTime: { np: "४ मिनेट पढाइ", en: "4 min read" },
    views: 12100,
    province: "bagmati",
    tags: {
      np: ["संसद्", "सुशासन", "डिजिटल", "विधेयक", "राजनीति"],
      en: ["Parliament", "Governance", "Digital", "Legislation", "Politics"],
    },
  },

  // 12. SPORTS - Football & Youth
  {
    id: "sports-2",
    slug: "nepal-super-league-football-pokhara-thunders-clinch-title",
    title: {
      np: "नेपाल सुपर लिग (एनएसएल): दशरथ रंगशालामा पोखरा थन्डर्स बन्यो च्याम्पियन, हजारौं दर्शकको उत्साह",
      en: "Nepal Super League: Pokhara Thunders Clinch Championship in Dramatic Thriller at Dasharath Stadium",
    },
    subtitle: {
      np: "रोमाञ्चक फाइनल भिडन्तमा काठमाडौँ रेजर्सलाई २-१ ले स्तब्ध पार्दै पोखराले उचाल्यो एनएसएलको दोस्रो ट्रफी",
      en: "Defeating Kathmandu Rayzrs 2-1 before a packed stadium, Pokhara secures coveted national franchise title",
    },
    excerpt: {
      np: "नेपालको सबैभन्दा ठूलो फ्रेन्चाइज फुटबल प्रतियोगिता नेपाल सुपर लिगको उपाधि पोखरा थन्डर्सले जितेको छ। दशरथ रंगशालामा भएको फाइनल खेलमा पोखराले उत्कृष्ट खेल प्रदर्शन गर्‍यो।",
      en: "Pokhara Thunders edged Kathmandu Rayzrs 2-1 in a scintillating finale at Dasharath Stadium to claim the Nepal Super League trophy amidst rapturous celebrations.",
    },
    content: {
      np: [
        "काठमाडौँ — त्रिपुरेश्वरस्थित दशरथ रंगशालामा आयोजित नेपाल सुपर लिग (एनएसएल) को रोमाञ्चक फाइनल खेलमा पोखरा थन्डर्सले काठमाडौँ रेजर्सलाई २–१ गोल अन्तरले पराजित गर्दै उपाधि हात पारेको छ।",
        "खेलको ३५औं मिनेटमा पोखराका विदेशी खेलाडीले हेडमार्फत गोल गर्दै टोलीलाई सुरुवाती अग्रता दिलाएका थिए। दोस्रो हाफको ६२औं मिनेटमा काठमाडौँले पेनाल्टीमार्फत खेल बराबरीमा ल्याए पनि खेल सकिन ५ मिनेट बाँकी छँदा पोखराका युवा स्ट्राइकर आयुष घलानले उत्कृष्ट गोल गर्दै टोलीको जित सुनिश्चित गरे।",
        "विजेता पोखरा थन्डर्सले नगद ७० लाख रुपैयाँ र ट्रफी प्राप्त गरेको छ भने उपविजेता काठमाडौँले ३० लाख रुपैयाँ पाएको छ। प्रतियोगिताभर उत्कृष्ट प्रदर्शन गरेका आयुष घलान प्रतियोगिताको सर्वोत्कृष्ट खेलाडी घोषित भए।",
      ],
      en: [
        "KATHMANDU — In an electric finish at Dasharath Stadium in Tripureshwar, Pokhara Thunders triumphed 2-1 over Kathmandu Rayzrs to claim the Nepal Super League silverware.",
        "Pokhara struck first in the 35th minute before Kathmandu equalized via a composed second-half penalty. However, with barely five minutes remaining on the clock, young international forward Ayush Ghalan delivered an exquisite curling strike into the top corner to seal victory.",
        "The champions walked away with a purse of Rs 7 million alongside the trophy, while runners-up Kathmandu collected Rs 3 million. Ayush Ghalan was crowned the Most Valuable Player of the tournament.",
      ],
    },
    category: "sports",
    categoryName: { np: "खेलकुद", en: "Sports" },
    image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80",
    imageCaption: {
      np: "दशरथ रंगशालामा फुटबल खेलका रोमाञ्चक क्षणहरू।",
      en: "High-octane action on the football pitch under stadium lights.",
    },
    author: {
      name: { np: "विनोद पाण्डे", en: "Binod Pandey" },
      role: { np: "खेलकुद सम्पादक", en: "Sports Editor" },
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    },
    date: "2026-11-16T14:20:00Z",
    dateNep: "२०८१ मंसिर १ गते",
    readTime: { np: "३ मिनेट पढाइ", en: "3 min read" },
    views: 9500,
    tags: {
      np: ["एनएसएल", "फुटबल", "खेलकुद", "दशरथ रंगशाला"],
      en: ["NSL", "Football", "Sports", "Nepal Super League"],
    },
  },
];

// Helper functions for easy filtering and queries
export const getLeadArticle = (): NewsArticle => {
  return NEWS_ARTICLES.find((a) => a.isLead) || NEWS_ARTICLES[0];
};

export const getBreakingNews = (): NewsArticle[] => {
  return NEWS_ARTICLES.filter((a) => a.isBreaking);
};

export const getTrendingArticles = (): NewsArticle[] => {
  return [...NEWS_ARTICLES].sort((a, b) => b.views - a.views).slice(0, 5);
};

export const getArticlesByCategory = (categorySlug: string): NewsArticle[] => {
  return NEWS_ARTICLES.filter((a) => a.category === categorySlug);
};

export const getArticleBySlug = (slug: string): NewsArticle | undefined => {
  return NEWS_ARTICLES.find((a) => a.slug === slug || a.id === slug);
};

export const getRelatedArticles = (currentSlug: string, category: string, limit = 4): NewsArticle[] => {
  return NEWS_ARTICLES.filter((a) => a.slug !== currentSlug && a.category === category).slice(0, limit);
};

export const searchArticles = (query: string): NewsArticle[] => {
  if (!query.trim()) return NEWS_ARTICLES;
  const q = query.toLowerCase().trim();
  return NEWS_ARTICLES.filter((article) => {
    return (
      article.title.np.toLowerCase().includes(q) ||
      article.title.en.toLowerCase().includes(q) ||
      article.excerpt.np.toLowerCase().includes(q) ||
      article.excerpt.en.toLowerCase().includes(q) ||
      article.tags.np.some((t) => t.toLowerCase().includes(q)) ||
      article.tags.en.some((t) => t.toLowerCase().includes(q)) ||
      article.categoryName.np.toLowerCase().includes(q) ||
      article.categoryName.en.toLowerCase().includes(q)
    );
  });
};
