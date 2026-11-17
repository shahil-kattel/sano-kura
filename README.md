# सानो कुरा (Sano Kura) - Nepali Digital News Portal

**सानो कुरा (Sano Kura)** is a modern, high-performance, full-featured Nepali news website built with Next.js 14, React, TypeScript, and Tailwind CSS. The primary language is **Nepali (नेपाली)** with seamless instant translation to **English** at the click of a button.

🔗 **GitHub Repository:** [https://github.com/shahil-kattel/sano-kura](https://github.com/shahil-kattel/sano-kura)

---

## 🌟 Key Features

### 1. 🇳🇵 Bilingual Support (नेपाली / English)
- **Primary Language:** Authentic Nepali typography (Devanagari / Mukta font), Bikram Sambat (वि.सं.) calendar dates, Nepali numerals (०, १, २...), and culturally accurate journalistic content.
- **English Translation Toggle:** Instant switcher button (`नेपाली | English`) in header, navigation bar, and directly on article reading pages.
- Converts all navigation headers, dates, news titles, excerpts, full body articles, tags, authors, and interface elements seamlessly.

### 2. 📰 Complete News Portal Sections & Pages
Every single page and link opens when clicked:
- **गृहपृष्ठ (Home):** Breaking news flash ticker, Lead hero story, Trending/Most Read numbered sidebar (१, २, ३, ४, ५), Special Highlights, Politics, Economy, Sports, Columns, Photo/Video spotlights.
- **सातै प्रदेश (7 Provinces Interactive News):** Dedicated coverage for Koshi, Madhesh, Bagmati, Gandaki, Lumbini, Karnali, and Sudurpashchim provinces.
- **बजार परिसूचक (Live Market Widgets):**
  - **नेप्से (NEPSE Index):** Live index ticker, turnover, and top market movers.
  - **सुन/चाँदी (Bullion):** Fine Gold (छापावाल सुन) and Silver (चाँदी) rates per tola / 10g.
  - **विदेशी मुद्रा (Forex):** Nepal Rastra Bank USD, EUR, GBP, AED, QAR exchange rates.
- **समाचार विधा (Categories):**
  - [राजनीति (Politics)](/category/politics)
  - [समाज (Society)](/category/society)
  - [अर्थ / वाणिज्य (Economy)](/category/economy)
  - [खेलकुद (Sports)](/category/sports)
  - [विचार (Opinion & Editorial)](/category/opinion)
  - [मनोरञ्जन (Entertainment & Arts)](/category/entertainment)
  - [विश्व (World News)](/category/world)
  - [प्रविधि (Technology)](/category/technology)
  - [जीवनशैली (Lifestyle & Health)](/category/lifestyle)
- **समाचार विस्तृत पृष्ठ (Article Detail):**
  - Multiple in-depth paragraphs, pull quotes, and high-resolution photo captions.
  - Reading toolbar: Font size adjuster (A-, A, A+), Text-to-speech audio reader simulation, bookmark toggle, and social copy link.
  - Interactive reader comment section with immediate submission and display.
  - Related stories & trending sidebar.
- **खोज (Live Search):** Real-time search across titles, content, categories, and tags in both Nepali and English (`/search?q=...`).
- **फोटो तथा भिडियो (Multimedia Gallery):** High-definition photography and video stories with interactive fullscreen lightbox modal (`/gallery`).
- **ई-कागज (Digital E-Paper):** Interactive newspaper daily print layout with page switcher (Pages 1 to 8), zoom in/out, and PDF download (`/epaper`).
- **सुरक्षित समाचार (Saved Bookmarks):** LocalStorage-backed bookmarking feature to save articles for later reading (`/bookmarks`).
- **हाम्रो बारेमा (About Us):** Organization mission, editorial principles, and official Press Council Nepal registration numbers (`/about`).
- **सम्पर्क (Contact Us):** Office address, newsroom phones, emails, and interactive inquiry form with validation feedback (`/contact`).
- **सम्पादकीय टिम (Editorial Team):** Leadership board, bureau chiefs, and journalist profiles (`/team`).
- **विज्ञापन (Advertise):** Media kit, readership demographics (50L+ readers), banner rate card, and sponsor packages (`/advertise`).
- **गोपनीयता नीति (Privacy Policy):** Compliant digital privacy terms (`/privacy`).
- **प्रयोगका सर्तहरू (Terms of Service):** Standard copyright and community conduct terms (`/terms`).

---

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Library:** React 18, TypeScript
- **Styling:** Tailwind CSS, PostCSS, Google Fonts (Mukta & Inter)
- **Icons:** Lucide React & Custom SVG
- **Deployment:** Vercel / Node.js production ready

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/shahil-kattel/sano-kura.git
cd sano-kura
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for production
```bash
npm run build
npm run start
```

---

## 📜 Statutory Details

- **कम्पनी दर्ता नं.:** २३८०१/०७९/०८०
- **प्रेस काउन्सिल नेपाल दर्ता नं.:** १४२५/०८०-८१
- **सूचना तथा प्रसारण विभाग दर्ता नं.:** २१३०/०७९-८०
- **सर्वाधिकार सुरक्षित:** © सानो कुरा मिडिया प्रा.लि.
