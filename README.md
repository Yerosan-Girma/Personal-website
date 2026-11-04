# Yerosan Girma — Personal Developer Portfolio

[![Live Production Portfolio](https://img.shields.io/badge/Portfolio-Live_Site-blue?style=for-the-badge&logo=vercel)](https://yerosan-girma.vercel.app/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React_18-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

A modern, high-performance personal portfolio website for **Yerosan Girma**, Full-Stack Software Engineer based in Addis Ababa, Ethiopia. Designed to showcase engineering projects, verified technical competencies, education at Haramaya University, and direct client/recruiter contact channels.

---

## 🌟 Overview & Key Highlights

- **Aesthetic Direction:** Minimalist, editorial engineering aesthetic with high contrast, responsive typography, and subtle ambient lighting.
- **Dark & Light Modes:** Seamless theme switching with OS preference auto-detection and persistent storage.
- **Interactive Resume Modal:** Integrated, printable/downloadable Curriculum Vitae viewer (`window.print()` formatted for A4/Letter).
- **Featured Projects Showcase:** Deep dives into 6 verified production applications with problem/solution breakdowns, technical specifications, and live demo links:
  1. **Kiray Bet (ኪራይ ቤት)** — Ethiopian Home Rental Marketplace (Featured Flagship)
  2. **E-Learning Platform** — Course Management & Automated Certification System
  3. **MarketHub** — Multi-Vendor E-Commerce Platform with Stripe
  4. **WabiSeminar Live** — Low-Latency Seminar & WebSocket Communication
  5. **Digital Equb (ዲጂታል እቁብ)** — Rotational Savings Fintech Platform
  6. **Haven Cafe & Bistro** — Artisan Hospitality Showcase & Table Reservation
- **Recruiter-Friendly Technical Skills:** Scannable, filterable skill directory across Frontend, Backend, Databases, and DevOps with real-time search.
- **Verified GitHub Activity:** Real contribution calendar heat map, live repository statistics, and open-source project cards.
- **Validated Contact Form:** Multi-field validation, loading state, success celebration, and fallback to native email client.
- **Smooth Navigation:** Lenis inertial smooth scrolling and active-section spy indicators.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend Framework** | React 18, React Router 7 |
| **Language & Tooling** | TypeScript, Vite 6 |
| **Styling & UI** | Tailwind CSS v4, Motion (Framer Motion), Lucide React |
| **Smooth Scrolling** | Lenis by Studio Freight |
| **Forms & Communication** | Web3Forms API, Direct Email Client Gateway |
| **Hosting & CI/CD** | Vercel, Render |

---

## 📁 Project Architecture

```text
├── public/
│   ├── favicon.svg          # Custom SVG monogram favicon
│   ├── robots.txt           # Search crawler directives
│   └── sitemap.xml          # XML sitemap for SEO indexation
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── image/       # Verified project screenshot assets
│   │   │   └── portfolio/
│   │   │       ├── About.tsx                 # Engineering background & principles
│   │   │       ├── Contact.tsx               # Direct channels & validated form
│   │   │       ├── CustomCursor.tsx          # Lag-follow cursor (fine pointers only)
│   │   │       ├── Experience.tsx            # Education, freelance & bootcamps
│   │   │       ├── Footer.tsx                # Navigation links & copyright
│   │   │       ├── githubData.ts             # Verified GitHub commit & repo data
│   │   │       ├── GithubSection.tsx         # Activity calendar & public repos
│   │   │       ├── Hero.tsx                  # Introduction, roles & CTAs
│   │   │       ├── InteractiveBackground.tsx # Lightweight ambient particle mesh
│   │   │       ├── Navbar.tsx                # Glassmorphic header & mobile drawer
│   │   │       ├── Projects.tsx              # Flagship & project cards with case studies
│   │   │       ├── ResumeModal.tsx           # Printable CV viewer & PDF generator
│   │   │       ├── SectionHeader.tsx         # Standardized section headings
│   │   │       ├── Services.tsx              # Full-stack capabilities & workflow
│   │   │       ├── Skills.tsx                # Filterable categorized tech stack
│   │   │       └── ThemeToggle.tsx           # Dark/Light mode switch
│   │   ├── context/
│   │   │   └── ThemeContext.tsx              # Context provider with localStorage sync
│   │   ├── layouts/
│   │   │   └── RootLayout.tsx                # Base router layout outlet
│   │   ├── pages/
│   │   │   ├── NotFoundPage.tsx              # Custom 404 page
│   │   │   └── PortfolioPage.tsx             # Main single-page portfolio layout
│   │   ├── App.tsx                           # App root with ThemeProvider & Router
│   │   └── routes.tsx                        # Client-side router configuration
│   ├── styles/
│   │   ├── fonts.css                         # Inter, Plus Jakarta Sans, JetBrains Mono
│   │   ├── index.css                         # Main CSS entry point
│   │   ├── tailwind.css                      # Tailwind v4 configuration & theme tokens
│   │   └── theme.css                         # Color systems (Light & Dark)
│   ├── main.tsx                              # React DOM mount point
│   └── vite-env.d.ts                         # Environment variable type declarations
├── index.html                                # SEO metadata, JSON-LD schema & preconnects
├── package.json                              # Project dependencies & build scripts
├── tsconfig.json                             # TypeScript compiler configuration
├── vercel.json                               # Vercel SPA routing configuration
└── vite.config.mjs                           # Vite build config & vendor chunking
```

---

## 🔐 Environment Variables

The contact form uses Web3Forms or EmailJS. To configure your keys locally, create a `.env` file in the root directory:

```env
# Web3Forms Public Access Key
VITE_WEB3FORMS_ACCESS_KEY=your_web3forms_access_key

# EmailJS Configuration (Optional Alternative)
VITE_EMAILJS_SERVICE_ID=your_emailjs_service_id
VITE_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
VITE_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
```

> **Security Note:** Vite exposes variables prefixed with `VITE_` to the browser client. Never place private server secrets or database passwords in client `.env` files.

---

## 💻 Local Development

### 1. Prerequisites

- **Node.js**: v18.0.0 or higher
- **npm** or **pnpm**

### 2. Installation

```bash
git clone https://github.com/Yerosan-Girma/Personal-website.git
cd Personal-website
npm install
```

### 3. Start Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Build for Production

```bash
npm run build
```

The optimized static assets will be compiled into the `dist/` directory.

---

## 🚀 Deployment (Vercel)

The repository includes a production-ready `vercel.json` with SPA rewrite rules:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

### Steps to Deploy:

1. Import the repository into your Vercel Dashboard.
2. Verify project build settings:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`
3. Add the environment variables:
   - `VITE_WEB3FORMS_ACCESS_KEY`
4. Deploy.

---

## 📬 Contact & Connect

- **Engineer:** Yerosan Girma
- **Email:** [yerosang463@gmail.com](mailto:yerosang463@gmail.com)
- **LinkedIn:** [linkedin.com/in/yerosan-girma-30005b37a](https://www.linkedin.com/in/yerosan-girma-30005b37a)
- **GitHub:** [github.com/Yerosan-Girma](https://github.com/Yerosan-Girma)
- **Location:** Addis Ababa, Ethiopia
