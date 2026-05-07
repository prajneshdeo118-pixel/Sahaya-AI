<p align="center">
  <h1 align="center">🇮🇳 SahayakAI — Government Scheme Finder</h1>
  <p align="center">
    <em>An AI-powered platform that helps Indian citizens discover government welfare schemes they're eligible for — in seconds.</em>
  </p>
  <p align="center">
    <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white" alt="React 19" />
    <img src="https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white" alt="Vite 8" />
    <img src="https://img.shields.io/badge/Express-5-000000?logo=express&logoColor=white" alt="Express 5" />
    <img src="https://img.shields.io/badge/HuggingFace-AI-FFD21E?logo=huggingface&logoColor=black" alt="HuggingFace" />
    <img src="https://img.shields.io/badge/License-ISC-green" alt="License" />
  </p>
</p>

---

## 📖 What is SahayakAI?

**SahayakAI** (Hindi for "Helper AI") is a web application that makes it easy for anyone to find Indian government schemes they can benefit from. Millions of Indians miss out on financial aid, scholarships, pensions, and subsidies — simply because they don't know these schemes exist.

SahayakAI solves this by letting users enter a few basic details (like age, income, state, and category), and instantly showing them **every matching scheme** from a database of **3,400+ Central and State government programs**.

On top of that, each scheme can be **explained in simple language using AI** — so even someone without a technical background can understand what a scheme offers and how to apply.

---

## ✨ Key Features

| Feature | Description |
|---|---|
| 🔍 **Smart Scheme Matching** | Enter your profile and get a filtered list of schemes you're actually eligible for. |
| 🤖 **AI-Powered Explanations** | Click "Explain in Simple Terms" on any scheme and an AI model breaks it down in layman language. |
| 🏷️ **Category Filters** | Browse schemes by sector — Agriculture, Education, Health, Social Welfare, and more. |
| 🗺️ **State-Level Filtering** | Filter by any Indian state or union territory to see region-specific schemes. |
| 🔎 **Search** | Search schemes by name or keyword in real time. |
| 📄 **Detailed Scheme Pages** | View full details — eligibility, benefits, income limits, age requirements, and step-by-step application instructions. |
| 📑 **Pagination** | Browse results in pages (9 schemes per page) with smooth navigation. |
| 📱 **Responsive Design** | Works on desktops, tablets, and mobile phones. |

---

## 🧩 How It Works

```
┌──────────────────────┐
│  1. Enter Your Info   │   You fill in your age, income, state, and social category.
└──────────┬───────────┘
           ▼
┌──────────────────────┐
│  2. Smart Matching    │   The backend filters 3,400+ schemes against your profile.
└──────────┬───────────┘
           ▼
┌──────────────────────┐
│  3. View Results      │   See eligible schemes with benefits, eligibility & how to apply.
└──────────┬───────────┘
           ▼
┌──────────────────────┐
│  4. AI Explanation    │   Click a button to get any scheme explained like you're 10 years old.
└──────────────────────┘
```

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| **React 19** | UI component library |
| **Vite 8** | Lightning-fast dev server and build tool |
| **React Router 7** | Page navigation (Landing → Schemes → Scheme Detail) |
| **Axios** | API calls to the backend |
| **Lucide React** | Beautiful icon library |
| **Vanilla CSS** | Custom styling with animations and responsive layout |

### Backend
| Technology | Purpose |
|---|---|
| **Node.js** | Server-side runtime |
| **Express 5** | REST API framework |
| **Hugging Face Inference API** | AI-powered scheme explanations (Qwen 2.5 model) |
| **OpenAI SDK** | Alternative AI explanation service (GPT-3.5 Turbo) |
| **dotenv** | Environment variable management |
| **CORS** | Cross-origin request handling |

### Data
- **`schemes.json`** — A ~9 MB JSON file containing **3,400+ government schemes** with fields like name, eligibility, income limits, age requirements, benefits, categories, and application steps.

### Deployment
| Service | What's Hosted |
|---|---|
| **Vercel** | Frontend (React + Vite) |
| **Render** | Backend (Node.js + Express API) |

---

## 📁 Project Structure

```
SahayakAI/
├── backend/
│   ├── data/
│   │   └── schemes.json          # 3,400+ government schemes database
│   ├── services/
│   │   ├── filterService.js      # Core logic — filters schemes by user profile
│   │   ├── huggingfaceService.js # AI explanations via Hugging Face (primary)
│   │   └── openaiService.js      # AI explanations via OpenAI (alternative)
│   ├── server.js                 # Express server with API endpoints
│   ├── .env.example              # Template for environment variables
│   └── package.json
│
├── frontend/
│   ├── public/                   # Static assets (favicon, etc.)
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx        # Navigation bar
│   │   │   ├── Footer.jsx        # Footer section
│   │   │   ├── Sidebar.jsx       # Category sidebar (Agriculture, Health, etc.)
│   │   │   ├── FilterBar.jsx     # Search, state, and age filters
│   │   │   └── SchemeCard.jsx    # Individual scheme card with color-coding
│   │   ├── pages/
│   │   │   ├── LandingPage.jsx   # Home page with hero, features & resources
│   │   │   ├── SchemesPage.jsx   # Main page — browse and filter schemes
│   │   │   └── SchemeDetailPage.jsx # Full details + AI explanation
│   │   ├── App.jsx               # React Router setup
│   │   ├── main.jsx              # App entry point
│   │   └── index.css             # All styles (design system)
│   ├── index.html                # HTML template
│   └── package.json
│
├── .gitignore
└── README.md                     # You are here!
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher recommended)
- **npm** (comes with Node.js)
- A free **Hugging Face API Key** — [Get one here](https://huggingface.co/settings/tokens)

### 1. Clone the Repository

```bash
git clone https://github.com/prajneshdeo118/Sahaya-AI.git
cd Sahaya-AI
```

### 2. Set Up the Backend

```bash
cd backend
npm install
```

Create a `.env` file by copying the example:

```bash
cp .env.example .env
```

Edit the `.env` file and add your API key:

```env
PORT=5000
HUGGINGFACE_API_KEY=your_huggingface_api_key_here
```

Start the backend server:

```bash
npm start
```

The server will start at `http://localhost:5000`.

### 3. Set Up the Frontend

Open a new terminal:

```bash
cd frontend
npm install
```

Create a `.env` file (optional — defaults to localhost):

```env
VITE_API_URL=http://localhost:5000
```

Start the frontend dev server:

```bash
npm run dev
```

The app will open at `http://localhost:5173`.

---

## 🔌 API Endpoints

| Method | Endpoint | Description | Request Body |
|---|---|---|---|
| `POST` | `/api/find-schemes` | Find schemes matching a user profile | `{ age, income, category, sector, state }` |
| `POST` | `/api/explain-scheme` | Get an AI-generated simple explanation | `{ schemeName, schemeDetails }` |

### Example Request — Find Schemes

```bash
curl -X POST http://localhost:5000/api/find-schemes \
  -H "Content-Type: application/json" \
  -d '{"age": 25, "income": 200000, "state": "Maharashtra", "sector": "Education & Learning", "category": "All"}'
```

### Example Response

```json
{
  "success": true,
  "count": 47,
  "schemes": [
    {
      "id": "scheme_001",
      "name": "Post Matric Scholarship",
      "benefit": "Financial assistance for post-matric studies",
      "eligibility": "Students from economically weaker sections",
      "income_limit": 250000,
      "age_min": 16,
      "category": ["Education & Learning"],
      "state": ["Central"],
      "apply_steps": ["Visit the official portal", "Register with Aadhaar", "..."]
    }
  ]
}
```

---

## 🎯 Target Audience

SahayakAI is designed for:

- **Rural and semi-urban citizens** who may not be aware of government welfare programs
- **Students** looking for scholarships and education-related financial aid
- **Low-income families** seeking healthcare, housing, and food security benefits
- **Senior citizens** exploring pension and elderly care schemes
- **Women and minorities** seeking targeted empowerment and support programs
- **Persons with Disabilities** looking for dedicated assistance schemes
- **NGOs and social workers** who help communities access government benefits
- **Government officials** who want a quick reference of available schemes across sectors

---

## 💡 Use Cases

1. **A farmer in Rajasthan** wants to know which agriculture subsidies he qualifies for → enters his age, income, and state → instantly sees relevant Central and State schemes.

2. **A college student in Kerala** needs scholarship options → selects "Education" from the sidebar and enters her profile → gets a list of scholarships she's eligible for, with step-by-step application guides.

3. **An NGO worker** is helping a tribal community → filters by "ST" category and their state → gets all relevant welfare programs in one place.

4. **A senior citizen** wants to check pension schemes → enters age as 65 → the platform shows all pension and elderly care schemes.

5. **Someone who doesn't understand bureaucratic language** → clicks "Explain in Simple Terms" on any scheme → AI breaks down the complicated government language into simple, easy-to-understand sentences.

---

## 🧠 How the AI Explanation Works

When you click **"Explain in Simple Terms"** on a scheme detail page:

1. The frontend sends the scheme name and details to the backend.
2. The backend calls the **Hugging Face Inference API** using the **Qwen 2.5-7B-Instruct** model.
3. The AI receives a prompt like: *"Explain this government scheme to a layperson like you're explaining to a 5th grader."*
4. The AI returns a 3-4 sentence explanation in plain English.
5. The explanation appears on screen instantly.

> **Note:** The AI feature requires a valid Hugging Face API key. You can get one for free at [huggingface.co/settings/tokens](https://huggingface.co/settings/tokens).

---

## 🌐 Deployment

### Frontend (Vercel)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and import the repository
3. Set the **Root Directory** to `frontend`
4. Set the **Build Command** to `npm run build`
5. Set the **Output Directory** to `dist`
6. Add environment variable: `VITE_API_URL` = your deployed backend URL

### Backend (Render)

1. Go to [render.com](https://render.com) and create a new Web Service
2. Connect your GitHub repository
3. Set the **Root Directory** to `backend`
4. Set the **Build Command** to `npm install`
5. Set the **Start Command** to `node server.js`
6. Add environment variables: `HUGGINGFACE_API_KEY` and `PORT`

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork** the repository
2. Create a new branch: `git checkout -b feature/your-feature`
3. Make your changes and commit: `git commit -m "Add your feature"`
4. Push to your branch: `git push origin feature/your-feature`
5. Open a **Pull Request**

### Ideas for Contributions

- 🌍 Add multilingual support (Hindi, Telugu, Tamil, etc.)
- 📊 Add scheme comparison feature
- 🔔 Add notifications for new schemes
- 📱 Build a mobile app version
- 🗄️ Migrate to a database (MongoDB) for faster queries
- 🧪 Add unit and integration tests

---

## ⚠️ Important Notes

- The `.env` files contain sensitive API keys and are **not committed** to version control (listed in `.gitignore`).
- The `schemes.json` data is a static snapshot. Scheme details may change over time — always verify with official government portals.
- The AI explanation feature is powered by third-party APIs and requires an active internet connection.

---

## 📜 License

This project is licensed under the **ISC License**.

---

## 🙏 Acknowledgments

- **Government of India** — for open data on welfare schemes via [MyScheme](https://www.myscheme.gov.in)
- **Hugging Face** — for providing free-tier AI inference APIs
- **React, Vite, Express** — the incredible open-source tools that power this project

---

<p align="center">
  Made with ❤️ to bridge the gap between government welfare and the people who need it most.
</p>
