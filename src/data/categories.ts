export interface CategoryInfo {
  slug: string;
  name: {
    np: string;
    en: string;
  };
  description: {
    np: string;
    en: string;
  };
  color: string;
  iconName?: string;
}

export const CATEGORIES: CategoryInfo[] = [
  {
    slug: "politics",
    name: { np: "राजनीति", en: "Politics" },
    description: {
      np: "समसामयिक राष्ट्रिय राजनीति, संसद्, सरकार र राजनीतिक दलका गतिविधिहरू।",
      en: "Contemporary national politics, parliament, government policies and party activities.",
    },
    color: "#b91c1c",
  },
  {
    slug: "society",
    name: { np: "समाज", en: "Society" },
    description: {
      np: "नेपाली समाज, मानव अधिकार, वातावरण, विकास तथा जनसरोकारका विषयहरू।",
      en: "Nepali society, human rights, environment, public interest and grassroots development.",
    },
    color: "#0369a1",
  },
  {
    slug: "economy",
    name: { np: "अर्थ / वाणिज्य", en: "Economy & Business" },
    description: {
      np: "नेपाली अर्थतन्त्र, सेयर बजार (नेप्से), बैंकिङ, लगानी र व्यापारिक समाचार।",
      en: "National economy, NEPSE stock market, banking, fiscal policy and entrepreneurship.",
    },
    color: "#15803d",
  },
  {
    slug: "sports",
    name: { np: "खेलकुद", en: "Sports" },
    description: {
      np: "नेपाल क्रिकेट, राष्ट्रिय फुटबल, अन्तर्राष्ट्रिय खेल र खेलाडीहरूको अपडेट।",
      en: "Nepal cricket, football, international tournaments and athletes' achievements.",
    },
    color: "#c2410c",
  },
  {
    slug: "opinion",
    name: { np: "विचार", en: "Opinion & Columns" },
    description: {
      np: "विज्ञहरूको दृष्टिकोण, विश्लेषणात्मक लेख, सम्पादकीय र समसामयिक ब्लग।",
      en: "Expert perspectives, analytical columns, editorials and intellectual discourse.",
    },
    color: "#6b21a8",
  },
  {
    slug: "entertainment",
    name: { np: "मनोरञ्जन", en: "Entertainment" },
    description: {
      np: "नेपाली चलचित्र, सङ्गीत, नाटक, फेसन र सेलिब्रेटी जीवनशैली।",
      en: "Nepali cinema, music, performing arts, fashion and celebrity spotlights.",
    },
    color: "#be185d",
  },
  {
    slug: "world",
    name: { np: "विश्व", en: "World News" },
    description: {
      np: "अन्तर्राष्ट्रिय कूटनीति, छिमेकी देशहरू र विश्वव्यापी प्रमुख घटनाक्रमहरू।",
      en: "Global diplomacy, geopolitics, neighboring nations and major world events.",
    },
    color: "#4338ca",
  },
  {
    slug: "technology",
    name: { np: "प्रविधि", en: "Technology" },
    description: {
      np: "नवीनतम प्रविधि, एआई, स्मार्टफोन, स्टार्टअप र डिजिटल नेपाल अभियान।",
      en: "Emerging tech, artificial intelligence, startups, smartphones and Digital Nepal.",
    },
    color: "#0f766e",
  },
  {
    slug: "lifestyle",
    name: { np: "जीवनशैली", en: "Lifestyle & Health" },
    description: {
      np: "स्वास्थ्य, खानपान, यात्रा, सौन्दर्य र सकारात्मक जीवनका टिप्स।",
      en: "Health, nutrition, travel, wellness and positive living practices.",
    },
    color: "#b45309",
  },
];
