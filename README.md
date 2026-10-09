# National Computer Centre (NCC) — Official Website

[![Live Website](https://img.shields.io/badge/Live%20Website-nationalcomputercentre.com-0B6AA8?style=for-the-badge&logo=googlechrome&logoColor=white)](https://nationalcomputercentre.com/)
[![React](https://img.shields.io/badge/React%2019-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS%20v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![React Router](https://img.shields.io/badge/React%20Router%20v7-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white)](https://reactrouter.com/)
[![GSAP](https://img.shields.io/badge/GSAP%203-88CE02?style=for-the-badge&logo=greensock&logoColor=white)](https://gsap.com/)

> **Client Project Notice**: This website was designed and developed as a **freelance client project** by **Krishnakant Rout** for **National Computer Centre**, a government-recognised computer training institute established in 1998 in Mulund West, Mumbai. The developer does not own or operate the National Computer Centre business.

---

## 🌐 Live Demo

Explore the live production website:  
🔗 **[https://nationalcomputercentre.com/](https://nationalcomputercentre.com/)**

---

## 📌 Project Overview

**National Computer Centre (NCC)** is a prominent computer and vocational training institute located in Mulund West, Mumbai, with over 28 years of educational service and more than 35,000 students trained.

This web application serves as the institute's primary digital portal. It provides prospective students and working professionals with:
- An extensive, interactive catalog of **77+ certified computer and IT training programs** across **13 domain categories**.
- Full course syllabi with modular breakdowns and practical learning roadmaps.
- Instant, friction-free admission inquiries and 1-day free practical trial bookings via direct WhatsApp messaging.
- Verified institute credentials, student reviews, faculty leadership spotlight, and location guidance.

The site is engineered for rapid page loading, smooth scrolling transitions, accessibility, and high mobile responsiveness.

---

## ✨ Key Features

### 1. Comprehensive Course Catalog & Filtering
- **77+ Curated Programs**: Complete offerings covering MS-CIT, Tally Prime with GST, Advanced Excel & MIS, Python, Data Analytics, Full Stack Web Development, Graphic Design, CAD/CAM, AI tools, and typing certifications.
- **13 Categories with Real-Time Filtering**: Dynamic category pills (`CategoryFilterPills`) with live course counter badges.
- **Deep-Linkable Filters**: Course categories sync with URL search queries (`/courses?category=data-analysis`), enabling shareable filtered views.

### 2. Rich Course Detail Experience
- **Dedicated Route Architecture**: Each course has an SEO-friendly URL (`/courses/:slug` and `/online-courses/:slug`).
- **Interactive Syllabus Accordion**: Multi-module topic explorer with individual toggles and quick **Expand All / Collapse All** controls.
- **Visual Course Badging**: Displays duration, skill level, and training highlights.
- **Automated Related Courses**: Algorithmic carousel recommending relevant programs in the same category.
- **Ambient Thumbnail Fallback**: Custom `CourseThumbnail` component featuring an ambient blurred backdrop that adapts to various image dimensions, plus fallback handling for missing media.

### 3. Lead Generation & Admission Inquiry System
- **Direct WhatsApp Funnel**: Instant conversion pipeline dispatching structured messages directly to the admissions team (`+91 98211 15699`), avoiding server friction and ensuring rapid lead response times.
- **Multi-Touch Inquiry Points**:
  - **Embedded Hero Form**: Quick lead capture right above the fold on desktop.
  - **Mobile Inquiry Card**: Clean stacked inquiry card positioned prominently on mobile viewports.
  - **Course Detail Form**: Context-aware form that automatically locks in the selected course.
  - **Global Booking Modal**: Pop-up dialog accessible from any page with ESC key dismiss and background scroll locking.
- **Schema Validation with Zod**: Robust client-side validation for phone numbers and mandatory fields.

### 4. High-Performance UI Animations & Micro-Interactions
- **GSAP & ScrollTrigger Animations**: Scroll-triggered timeline reveals for section headings, benefit cards, and statistics via the custom `useMotionReveal` hook.
- **Hero Crossfade & Typewriter**: 4-second background image carousel with preloading alongside an automated typewriter headline cycling through popular disciplines.
- **Interactive Animated Counters**: `IntersectionObserver`-backed smooth numerical easing for institutional metrics (28+ years, 35,000+ students, 4.7★ rating).
- **Accessibility / Reduced Motion**: Automatically honors the user's `prefers-reduced-motion: reduce` system preference.

### 5. Technical SEO & Local Search Optimization
- **Schema.org Structured Data**: Integrated JSON-LD schema for `EducationalOrganization`, `LocalBusiness`, and `Course` catalogs.
- **Dynamic Document Titles & Meta Descriptions**: Custom titles and descriptions update on every route navigation (`HomePage`, `AllCourses`, `OnlineCourses`, `ContactPage`, `CourseDetail`).
- **Open Graph & Twitter Cards**: Complete social preview metadata.

---

## 🛠️ Tech Stack

### Core Framework & Build Tools
| Technology | Description |
| :--- | :--- |
| **[React 19](https://react.dev/)** | Component-based UI library powering declarative views and hooks |
| **[Vite](https://vite.dev/)** | Next-generation frontend tooling providing lightning-fast HMR and optimized builds |
| **[JavaScript (ES Modules)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)** | Modern ECMAScript with native modules and JSX syntax |

### Routing & Navigation
| Technology | Description |
| :--- | :--- |
| **[React Router v7](https://reactrouter.com/)** | Client-side declarative routing, nested routes, search params handling, and scroll restoration |

### Styling & Design System
| Technology | Description |
| :--- | :--- |
| **[Tailwind CSS v4](https://tailwindcss.com/)** | Utility-first CSS framework configured via `@tailwindcss/vite` |
| **Custom Semantic Token System** | Brand color variables (NCC Deep Blue `#0B6AA8`, Bright Cyan `#2DB3E3`, Success `#6FBE44`) |
| **[Google Fonts (Poppins)](https://fonts.google.com/specimen/Poppins)** | Professional modern typography loaded via Google Fonts |

### Animation & Icons
| Technology | Description |
| :--- | :--- |
| **[GSAP 3](https://gsap.com/)** | High-performance animation engine powering timelines and transforms |
| **[ScrollTrigger](https://gsap.com/scrolltrigger/)** | GSAP plugin driving scroll-synchronized viewport reveals |
| **[Lucide React](https://lucide.dev/)** | Consistent, modern SVG icon library |

### Validation & Quality
| Technology | Description |
| :--- | :--- |
| **[Zod](https://zod.dev/)** | Schema validation for lead forms |
| **[ESLint](https://eslint.org/)** | Code quality and linting rules |

---

## 📂 Project Structure

```text
National-Computer-Centre/
├── public/                     # Static assets served as-is
│   ├── favicon.png             # Site favicon
│   ├── favicon.svg             # Vector favicon
│   ├── apple-touch-icon.png    # iOS touch icon
│   └── icons.svg               # SVG sprite definitions
├── src/
│   ├── assets/                 # Institute media & course flyers
│   │   ├── Cad cam/            # CAD/CAM software images
│   │   ├── courses/            # 65+ course flyer graphics
│   │   ├── classroom-logo.png  # Classroom photography
│   │   ├── Logo-2.jpeg         # Secondary branding logo
│   │   ├── ncc-logo.png        # Official NCC brand mark
│   │   └── Owner.jpeg          # Founder & Director photograph
│   ├── components/             # Reusable UI & section components
│   │   ├── AllCourses.jsx          # Full catalog page with search params
│   │   ├── CategoryFilterPills.jsx # Interactive category filter pills
│   │   ├── CompactEnquiryForm.jsx  # Hero & mobile lead capture form (Zod)
│   │   ├── CourseCard.jsx          # Individual course presentation card
│   │   ├── CourseDetail.jsx        # Dynamic course syllabus & overview view
│   │   ├── CourseEnquiryForm.jsx   # Dedicated course lead inquiry form
│   │   ├── CourseIcon.jsx          # Dynamic Lucide icon mapper
│   │   ├── CourseThumbnail.jsx     # Resilient course thumbnail with blur backdrop
│   │   ├── EnquiryModal.jsx        # Global 1-day free trial pop-up modal
│   │   ├── Footer.jsx              # 4-column footer with quick links & hours
│   │   ├── FounderSection.jsx      # Leadership spotlight with parallax
│   │   ├── HeroSlider.jsx          # Crossfade slider with typewriter effect
│   │   ├── MostPopularCourses.jsx  # Featured courses horizontal carousel
│   │   ├── Navbar.jsx              # Responsive header with scroll-aware styling
│   │   ├── OnlineCourses.jsx       # Live online courses catalog view
│   │   ├── OurCoursesSection.jsx   # Homepage category-tabbed course showcase
│   │   ├── ScrollToTop.jsx         # Automatic viewport reset on route changes
│   │   ├── Stats.jsx               # Animated counter statistics section
│   │   ├── StudentsFeedback.jsx    # Student testimonial review slider
│   │   └── WhyExtraSkills.jsx      # Value propositions & career benefits
│   ├── data/                   # Structured data sources
│   │   ├── courses.js          # 77+ course objects, modules, topics & categories
│   │   └── nccData.js          # Business details, stats, FAQs & reviews
│   ├── hooks/                  # Custom React hooks
│   │   └── useMotionReveal.js  # GSAP ScrollTrigger animation hook
│   ├── pages/                  # Top-level page containers
│   │   ├── HomePage.jsx        # Homepage assembling all modular sections
│   │   └── ContactPage.jsx     # Contact, location map & trial booking page
│   ├── utils/                  # Helper utilities
│   │   └── courseImages.js     # Vite glob image importer & slug resolver
│   ├── App.css                 # Base application styles
│   ├── App.jsx                 # Root component, routing setup & global modal
│   ├── index.css               # Global styles & Tailwind base layers
│   ├── main.jsx                # React DOM entry point
│   └── styles.css              # NCC brand color variables & theme configuration
├── index.html                  # HTML entry point with JSON-LD schema & meta tags
├── package.json                # Project dependencies and npm scripts
├── vite.config.js              # Vite configuration with React & Tailwind plugins
└── eslint.config.js            # ESLint flat configuration
```

---

## 🚀 Getting Started

### Prerequisites
Make sure you have **Node.js** (v18 or higher recommended) and **npm** installed on your system:
```bash
node -v
npm -v
```

### Installation
1. Clone the repository to your local machine:
   ```bash
   git clone https://github.com/krishnakantrout/National-Computer-Centre.git
   ```
2. Navigate into the project directory:
   ```bash
   cd National-Computer-Centre
   ```
3. Install project dependencies:
   ```bash
   npm install
   ```

### Running Locally
Start the Vite development server with Hot Module Replacement (HMR):
```bash
npm run dev
```
Open your browser and navigate to the local server URL displayed in your terminal (typically `http://localhost:5173/`).

### Available Scripts
The following npm scripts are configured in `package.json`:

| Command | Action |
| :--- | :--- |
| `npm run dev` | Starts the Vite local development server |
| `npm run build` | Compiles and bundles production-ready assets into the `dist/` directory |
| `npm run preview` | Locally serves and previews the generated production build |
| `npm run lint` | Runs ESLint across the project to check for syntax and linting errors |

---

## 📦 Production Build

To generate an optimized, minified production build:
```bash
npm run build
```

This compiles all React components, bundles CSS, resolves asset imports, and outputs static production files to the `dist/` directory.

To test the generated build locally before deploying:
```bash
npm run preview
```

---

## 🚀 Deployment on Hostinger

This project is hosted on **Hostinger** and deployed using **Hostinger File Manager**. Follow the exact deployment steps below:

### Step 1: Create the Production Bundle
Run the build command on your local machine:
```bash
npm run build
```
This generates a production folder named `dist/` containing:
- `index.html`
- `assets/` (bundled JS, CSS, and optimized image files)
- Static files from `public/` (favicons, icons)

### Step 2: Access Hostinger File Manager
1. Log into your **Hostinger hPanel** dashboard.
2. Select your hosting plan and navigate to **Websites** → click **Manage** on `nationalcomputercentre.com`.
3. Open **File Manager** (Files → File Manager).
4. Navigate to the website root directory:
   ```text
   public_html/
   ```

### Step 3: Upload the Build Files
1. Open the local `dist/` folder.
2. Upload the **contents** of the `dist` folder directly into `public_html/`.  
   *(Do **not** upload the `dist` folder itself; `index.html` must be placed directly inside `public_html/`)*.
3. If replacing an older build, delete or overwrite existing asset files inside `public_html/assets/`.

### Step 4: Configure SPA Routing (`.htaccess`)
Because this application uses **React Router (`BrowserRouter`)**, refreshing a sub-page (such as `/courses` or `/contact`) requires the web server to rewrite requests back to `index.html`.

Create or edit the `.htaccess` file inside `public_html/` and ensure it contains the following configuration:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_FILENAME} !-l
  RewriteRule . /index.html [L]
</IfModule>
```

Save the file. Client-side navigation, deep links, and page refreshes will now function smoothly across the entire site.

---

## 👨‍💻 What I Worked On

As the freelance frontend developer on this project, I was responsible for the end-to-end frontend architecture, design implementation, and deployment:

- **End-to-End Application Architecture**: Configured React 19 + Vite tooling with modular component architecture, custom hooks, and centralized data layers.
- **Data Modeling & Catalog Engineering**: Structured and maintained the entire catalog of **77+ courses** with syllabi, topics, categories, prerequisites, and image associations in `courses.js`.
- **Conversion-Focused Lead Funnel**: Built multi-point admission inquiry flows, WhatsApp dispatch integration, and modal dialogs with Zod schema validation to maximize student inquiries.
- **Brand-Centric Design System**: Implemented a responsive design system utilizing Tailwind CSS v4 and CSS variables matching the institute’s branding (Deep Blue, Cyan, Green).
- **Smooth Animations & Micro-Interactions**: Authored GSAP ScrollTrigger timelines, typewriter effects, background crossfade cycles, and numerical counters with strict `prefers-reduced-motion` compliance.
- **Search Engine Optimization**: Implemented Schema.org JSON-LD structured data and route-level meta descriptions targeting local discovery for computer training in Mulund West.
- **Production Optimization & Deployment**: Built production bundles with Vite and executed zero-downtime manual deployments to Hostinger shared hosting with Apache SPA rewrites.

---

## 🔮 Future Improvements

Realistic enhancements that can be introduced in future iterations:

- [ ] **Code Splitting & Route-Level Lazy Loading**: Implement `React.lazy()` and `Suspense` for routes (`CourseDetail`, `ContactPage`, `AllCourses`) to reduce the initial JavaScript bundle size.
- [ ] **Live Search & Fuzzy Matching**: Add a global search input with instant keyword matching across course titles, topics, and syllabus descriptions.
- [ ] **Modern Image Format Pipeline**: Convert legacy JPEG/PNG course banners to modern AVIF/WebP formats with responsive `srcset` attributes to improve mobile performance.
- [ ] **Headless CMS / Backend Lead Storage**: Connect inquiry forms to a lightweight serverless endpoint or Google Sheets API so leads are stored centrally alongside WhatsApp notifications.
- [ ] **Automated CI/CD Deployment**: Set up a GitHub Actions workflow with FTP/SSH deployment to automatically push builds to Hostinger upon merging to `main`.

---

## 👤 Author

**Krishnakant Rout**  
*Freelance Frontend / Full-Stack Web Developer*  

- **GitHub**: [@krishnakantrout](https://github.com/krishnakantrout)  
- **Project Role**: Freelance Developer (Design, Frontend Engineering & Hostinger Deployment)  
- **Client**: [National Computer Centre](https://nationalcomputercentre.com/)

---

## 📄 License & Attribution

- **Source Code**: Developed by Krishnakant Rout for National Computer Centre.
- **Branding, Trademarks & Media**: All institute names, logos, course materials, and photography are proprietary to **National Computer Centre, Mulund West**. All rights reserved.
