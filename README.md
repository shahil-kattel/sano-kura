# सानो कुरा (Sano Kura) - Nepali Digital News Portal & Newsroom CMS

**सानो कुरा (Sano Kura)** is a modern, high-performance, full-featured Nepali news website and comprehensive newsroom CMS built with **Next.js 14 (App Router)**, **React 18**, **TypeScript**, and **Tailwind CSS**. The primary language is **Nepali (नेपाली)** with seamless instant translation to **English** at the click of a button.

🔗 **GitHub Repository:** [https://github.com/shahil-kattel/sano-kura](https://github.com/shahil-kattel/sano-kura)

---

## 🛠️ Complete Admin CMS Panel (`/admin`)

The portal includes a dedicated, full-screen Newsroom Content Management System (CMS) located at [`/admin`](http://localhost:3000/admin) with real-time site synchronization:

| Admin Section | Path | Capabilities |
| :--- | :--- | :--- |
| **ड्यासबोर्ड (Dashboard)** | `/admin` | Total articles count, active breaking count, live NEPSE index, pending comments counter, quick action buttons, recent published articles, and moderation desk |
| **सबै समाचार (Articles Manager)** | `/admin/news` | Searchable, category-filtered, and status-filtered table of all stories with 1-click toggles for Breaking, Lead Story, and Trending, plus edit and delete actions |
| **नयाँ समाचार (Write Article)** | `/admin/news/new` | Full bilingual news authoring form (Nepali & English headlines, subtitles, excerpts, rich paragraphs), category selection, province assignment, photo URL & caption, author details, and tags |
| **समाचार सम्पादन (Edit Article)** | `/admin/news/edit/[id]` | Pre-populated editor to update any live article's text, category, image, or flags with instant live website updates |
| **विधा व्यवस्थापन (Categories)** | `/admin/categories` | Add, edit, or delete news categories with custom brand colors, bilingual names, and URL slugs |
| **ताजा / ब्रेकिङ नियन्त्रक (Breaking Ticker)** | `/admin/breaking` | Real-time breaking news control: broadcast urgent flash alerts immediately to the top red ticker, or promote/demote existing stories with 1 click |
| **बजार भाउ सम्पादक (Market Rates)** | `/admin/markets` | Update live NEPSE index, point changes, and turnover; fine gold and silver bullion rates per tola/10g; and NRB foreign exchange rates (USD, EUR, GBP, AED, QAR, AUD) |
| **मिडिया ग्यालरी (Gallery Manager)** | `/admin/gallery` | Add photo stories and video spotlights with custom photo credits, locations, and descriptions |
| **टिप्पणी प्रमाणीकरण (Comments)** | `/admin/comments` | Reader feedback moderation desk to approve, review, or delete reader comments |
| **ई-कागज व्यवस्थापन (E-Paper)** | `/admin/epaper` | Manage daily digital print newspaper editions, dates, volume/issue numbers, and front-page lead banners |
| **साइट सेटिङहरू (Site Settings)** | `/admin/settings` | Configure portal name (NP/EN), taglines, Press Council Nepal & Dept. of Information registration numbers, PAN, office addresses, phone numbers, and editorial emails |

---

## 🌟 Public Portal Features

### 1. 🇳🇵 Bilingual Support (नेपाली / English)
- **Primary Language:** Authentic Nepali typography (Devanagari / Mukta font), Bikram Sambat (वि.सं.) calendar dates (e.g., `२०८१ मंसिर २ गते, मंगलबार`), and Nepali numerals (`०, १, २...`).
- **Instant Translation:** Header, navbar, and article-level `नेपाली | English` toggle switches all content seamlessly.

### 2. 📰 Complete News Portal Sections & Pages
Every single page and link opens when clicked:
- **गृहपृष्ठ (Home):** Breaking news flash ticker, Lead hero story, Trending/Most Read numbered sidebar (१, २, ३, ४, ५), Special Highlights, Politics, Economy, Sports, Columns, Photo/Video spotlights.
- **सातै प्रदेश (7 Provinces Interactive News):** Dedicated coverage for Koshi, Madhesh, Bagmati, Gandaki, Lumbini, Karnali, and Sudurpashchim provinces.
- **बजार परिसूचक (Live Market Widgets):** Live NEPSE stock ticker, bullion gold/silver rates, and foreign exchange rates.
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
- **समाचार विस्तृत पृष्ठ (Article Detail):** Multi-paragraph rich text, pull quotes, photo credits, font size adjuster (A-, A, A+), audio text-to-speech simulation, bookmarking, and interactive reader comments.
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
- Open Public Portal: [http://localhost:3000](http://localhost:3000)
- Open Admin CMS: [http://localhost:3000/admin](http://localhost:3000/admin)

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
