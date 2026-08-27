export const categories = [
  { slug: "office-basics",        name: "Office & Basics" },
  { slug: "accounting",           name: "Accounting & Data" },
  { slug: "programming",          name: "Software & Programming" },
  { slug: "design",               name: "Design & DTP" },
  { slug: "animation",            name: "Animation & Multimedia" },
  { slug: "digital-marketing",    name: "Digital Marketing" },
  { slug: "hardware-networking",  name: "Hardware & Networking" },
  { slug: "personality-english",  name: "Personality & English" },
  { slug: "school-special",       name: "School & Special" },
];

export const courses = [
  {
    slug: "diploma-in-computer-operating",
    title: "Diploma in Computer Operating",
    categorySlug: "office-basics",
    duration: "2 Months",
    featured: false,
    highlight: "Fundamental computer skills, Windows navigation, MS Office suite, and safe Internet communication.",
    description: "The Diploma in Computer Operating at National Computer Centre builds solid computing fundamentals for beginners and professionals. Students gain 100% practical hands-on experience in Windows operating systems, Microsoft Word, Excel, and PowerPoint, along with essential internet emailing protocols. This government-recognised diploma prepares you for modern administrative and office desk roles.",
    syllabus: [
      "Computer Fundamentals & Hardware Overview",
      "Windows OS & File Management",
      "MS Word: Documentation & Formatting",
      "MS Excel: Worksheets, Formulas & Basic Charts",
      "MS PowerPoint: Slide Presentations",
      "Internet, Email Etiquette & Online Safety"
    ],
    icon: "Monitor"
  },
  {
    slug: "certificate-course-in-ms-cit",
    title: "Certificate Course in MS-CIT",
    categorySlug: "office-basics",
    duration: "2 Months",
    featured: true,
    highlight: "Maharashtra State Government recognised IT literacy course essential for jobs and government exams.",
    description: "MS-CIT (Maharashtra State Certificate in Information Technology) is the gold standard IT literacy certification course recognized across state departments, semi-government agencies, and corporate offices. At NCC Mulund, we provide 1:1 dedicated computer terminal access with official exam mock simulations, covering modern office software, collaborative web tools, and cyber safety.",
    syllabus: [
      "IT Literacy Fundamentals",
      "Windows Navigation & File Operations",
      "MS Word: Advanced Documents & Mail Merge",
      "MS Excel: Data Calculation & Management",
      "MS PowerPoint: Animated Presentations",
      "MS Outlook: Scheduling & Email",
      "Internet Services, Banking & Citizen Portals",
      "Cyber Security & Digital Etiquette"
    ],
    icon: "Award"
  },
  {
    slug: "diploma-in-computer-management",
    title: "Diploma in Computer Management",
    categorySlug: "office-basics",
    duration: "12 Months",
    featured: false,
    highlight: "Comprehensive 1-year career diploma covering Office, Tally ERP, Graphic Design, Web basics & Hardware.",
    description: "A flagship 1-year integrated professional program designed to turn students into well-rounded computer administrators. The syllabus integrates advanced MS Office, corporate Tally ERP 9, CorelDraw and Photoshop creative tools, HTML web authoring, and essential hardware and networking diagnostics. Ideal for career starters looking for versatile office management skills.",
    syllabus: [
      "Computer Fundamentals & Operating Systems",
      "Advanced MS Office (Word, Excel, PowerPoint)",
      "Internet & Professional E-mail Workflow",
      "Tally & Advanced Tally ERP 9 with GST",
      "Hardware Fundamentals & Assembly",
      "Networking Concepts & File Sharing",
      "Graphic Design: CorelDraw & Photoshop",
      "Web Designing Fundamentals (HTML, CSS, Animator)",
      "Final Practical Capstone Project"
    ],
    icon: "Layers"
  },
  {
    slug: "windows",
    title: "Windows",
    categorySlug: "office-basics",
    duration: "Short Course",
    featured: false,
    highlight: "Fast-track module on Windows OS fundamentals, storage management, settings, and utilities.",
    description: "Master the essentials of the Microsoft Windows environment. Learn filesystem organization, system settings customization, security updates, peripheral device management, and everyday operating shortcuts for fast productivity.",
    syllabus: [
      "Windows GUI & Taskbar Customization",
      "File Explorer, Folders & Storage Management",
      "Control Panel & System Settings",
      "Task Manager, Utilities & Shortcut Keys"
    ],
    icon: "Monitor"
  },
  {
    slug: "ms-word",
    title: "Ms Word",
    categorySlug: "office-basics",
    duration: "Short Course",
    featured: false,
    highlight: "Professional document creation, formatting, tables, page layouts, and automated mail merge.",
    description: "Learn to design executive letters, academic reports, and legal documentation. This course focuses on paragraph styling, table formatting, track changes, headers & footers, and large-scale automated mail merge workflows.",
    syllabus: [
      "Document Formatting & Typography",
      "Tables, Headers, Footers & Page Breaks",
      "Graphics, SmartArt & Watermarks",
      "Mail Merge for Mass Communication",
      "Reviewing, Proofing & Exporting to PDF"
    ],
    icon: "FileText"
  },
  {
    slug: "ms-excel",
    title: "Ms Excel",
    categorySlug: "office-basics",
    duration: "Short Course",
    featured: false,
    highlight: "Essential spreadsheet calculations, mathematical formulas, data sorting, and chart visuals.",
    description: "Build a strong foundation in spreadsheet calculations and data handling. Master basic mathematical and statistical formulas, conditional formatting, sort & filter tools, and dynamic visual charts.",
    syllabus: [
      "Spreadsheet Navigation & Cell Referencing",
      "Essential Formulas (SUM, AVERAGE, COUNT, IF)",
      "Data Sorting, Filtering & Formatting",
      "Chart Creation & Print Page Setup"
    ],
    icon: "FileSpreadsheet"
  },
  {
    slug: "ms-power-point",
    title: "Ms Power Point",
    categorySlug: "office-basics",
    duration: "Short Course",
    featured: false,
    highlight: "High-impact presentation decks with transitions, slide masters, audio-visuals, and animations.",
    description: "Create engaging business pitches, educational slide decks, and seminar presentations. Learn slide master layouts, multimedia audio/video integration, motion animations, and presenter tools.",
    syllabus: [
      "Slide Master Layouts & Theme Styling",
      "Typography, Icons & Infographic Design",
      "Custom Animations & Smooth Transitions",
      "Multimedia Integration & Slideshow Presentation"
    ],
    icon: "Presentation"
  },
  {
    slug: "ms-access",
    title: "Ms Access",
    categorySlug: "office-basics",
    duration: "Short Course",
    featured: false,
    highlight: "Relational database management, table creation, query designing, user forms, and report generation.",
    description: "Understand desktop relational database architecture. Learn how to construct normalized tables, configure primary keys, query data across related entities, design interactive forms, and build print-ready executive reports.",
    syllabus: [
      "Database Fundamentals & Table Architecture",
      "Relationships & Referential Integrity",
      "Select, Update & Parameter Queries",
      "Form Creation & Data Entry Interfaces",
      "Formatted Report Generation"
    ],
    icon: "Table"
  },
  {
    slug: "internet-and-e-mail",
    title: "Internet & E-Mail",
    categorySlug: "office-basics",
    duration: "Short Course",
    featured: false,
    highlight: "Effective web research, secure digital browsing, email management, attachments, and cloud storage.",
    description: "Gain confidence in everyday web utilities, modern cloud tools, secure banking protocols, and corporate email systems. Learn search operators, attachment management, digital signatures, and phishing awareness.",
    syllabus: [
      "Effective Search Engine Techniques",
      "Corporate Email Services & Invoicing Attachments",
      "Google Drive & Cloud Storage Sync",
      "Online Banking Security & Two-Factor Authentication"
    ],
    icon: "Globe"
  },
  {
    slug: "certificate-course-in-tally-erp-9",
    title: "Certificate Course in Tally.ERP 9",
    categorySlug: "accounting",
    duration: "2 Months",
    featured: false,
    highlight: "Practical computerized bookkeeping, voucher entries, inventory management, and complete GST compliance.",
    description: "Master India's most widely utilized accounting software through real-world company bookkeeping. This course covers everything from ledger configuration and multi-currency voucher entries to inventory stock tracking, bank reconciliations, and comprehensive GST/TDS returns calculation.",
    syllabus: [
      "Accounting Fundamentals & Company Creation",
      "Voucher Entries & Cost Centres",
      "Bill Wise Details & Voucher Numbering",
      "Budgets & Bank Reconciliation (BRS)",
      "Inventory Stock Groups & Units of Measure",
      "Interest Calculation & Split Company Data",
      "Excise Tax, Service Tax & TCS",
      "Price Leveling & Payroll Processing",
      "GST Setup: Party GSTN, Rate Setup, Tax Liability on Advance, GST in POS, TDS with GST"
    ],
    icon: "Calculator"
  },
  {
    slug: "certificate-course-in-advanced-tally-erp-9",
    title: "Certificate Course in Advanced Tally.ERP 9",
    categorySlug: "accounting",
    duration: "3 Months",
    featured: false,
    highlight: "Advanced financial statements, audit features, multi-location inventory, order processing, and tax finalization.",
    description: "Step up to an expert accountant level. Dive into Tally Audit capabilities, purchase/sales order lifecycles, debit/credit note workflows, multi-tiered security levels, reorder level management, and end-of-year financial finalizations for corporate balance sheets.",
    syllabus: [
      "Advanced Invoicing & Tally Audit Features",
      "Credit & Debit Notes / Delivery & Receipt Notes",
      "Sales & Purchase Order Management",
      "Financial Statements: P&L, Balance Sheet, Ratio Analysis",
      "Inventory Books & Stock Registers",
      "Data Migration, Backup & Security Tiers",
      "Reorder Level & Physical Stock Adjustments",
      "Year-End Finalization & Full GST Module"
    ],
    icon: "Calculator"
  },
  {
    slug: "certificate-course-in-adv-tally-erp-9-with-prime",
    title: "Certificate Course in Adv. Tally.ERP 9 with Prime",
    categorySlug: "accounting",
    duration: "4 Months",
    featured: true,
    highlight: "Industry-leading dual certification covering Tally.ERP 9 and the modern Tally Prime interface with e-Invoicing.",
    description: "Equip yourself with the latest accounting platform trusted by over 2 million businesses. Learn both classic Tally.ERP 9 and modern Tally Prime, covering e-Invoicing, e-Way bills, automated GST returns, advanced multi-company consolidation, and payroll management with real balance sheets.",
    syllabus: [
      "Tally Prime Navigation & GoTo Feature Mastery",
      "Dual Architecture: ERP 9 & Prime Comparison",
      "Advanced GST, E-Way Bill & E-Invoicing Generation",
      "Multi-Godown Inventory & Stock Valuation",
      "Payroll Processing: PF, ESIC & Professional Tax",
      "Bank Reconciliation Automation",
      "Audit Trails, Security Roles & Remote Access",
      "Balance Sheet Finalization on Live Company Datasets"
    ],
    icon: "Calculator"
  },
  {
    slug: "certificate-course-in-advance-excel",
    title: "Certificate Course in Advance Excel",
    categorySlug: "accounting",
    duration: "1 Month",
    featured: true,
    highlight: "High-demand corporate Excel formulas: XLOOKUP, VLOOKUP, INDEX-MATCH, Pivot Tables, and Data Validation.",
    description: "Designed for finance, operations, and business analysts. Master advanced logical, text, and date formulas, nested lookups, deep data validation selectors, dynamic Pivot Tables, What-If analysis, and automated calculation models that speed up daily corporate reporting.",
    syllabus: [
      "Advanced Logical Formulae (Nested IF, IFS, AND, OR)",
      "Text, Date & Mathematical Functions",
      "Mastering VLOOKUP, HLOOKUP & INDEX-MATCH",
      "Data Validation & Dropdown Selector Building",
      "AutoFilters, Advanced Filters & Slicers",
      "Pivot Tables & Pivot Charts with Calculated Fields",
      "Goal Seek, Data Tables & Solver",
      "Named Ranges, Dynamic Arrays & Practical Assignments"
    ],
    icon: "FileSpreadsheet"
  },
  {
    slug: "advance-excel-with-dashboard",
    title: "Advance Excel with Dashboard",
    categorySlug: "accounting",
    duration: "2 Months",
    featured: false,
    highlight: "Transform raw data into interactive, dynamic executive KPI dashboards using advanced Excel visualization tools.",
    description: "Learn how senior analysts convert massive datasets into clean visual business intelligence. Combine advanced formula engineering with form controls, dynamic chart ranges, conditional formatting heatmaps, and interconnected slicers for executive reporting.",
    syllabus: [
      "Advance Excel Formula Foundation",
      "Interactive Form Controls & Slicers",
      "Dynamic Charting & Waterfall/Gauge Visuals",
      "KPI Card Design & Visual Hierarchy",
      "Automating Dashboard Refresh & Data Feeds",
      "Real-World Sales & Finance Dashboard Capstones"
    ],
    icon: "BarChart3"
  },
  {
    slug: "certificate-course-in-adv-excel-with-mis-reports",
    title: "Certificate Course in Adv. Excel with MIS Reports",
    categorySlug: "accounting",
    duration: "3 Months",
    featured: false,
    highlight: "Complete Management Information System (MIS) reporting, formula debugging, data security, and automation.",
    description: "Become a proficient MIS Executive capable of generating weekly, monthly, and annual executive management reports. This course covers deep selector creation, array manipulation, workbook protection, error handling, audit formula tracing, and end-to-end dashboard architectures.",
    syllabus: [
      "Excel Architecture & Advanced UI Optimization",
      "Deep Data Validation & Selector Frameworks",
      "Advanced Worksheet Functions & Dynamic Arrays",
      "Text & Date Manipulation Algorithms",
      "Complex Multilayer Lookups & Error Handling",
      "Pivot Analysis with Calculated Items",
      "Workbook Security, Protection & Shared Collaboration",
      "Comprehensive MIS Reporting & Dashboard Projects"
    ],
    icon: "FileSpreadsheet"
  },
  {
    slug: "certificate-course-in-tableau",
    title: "Certificate course in Tableau",
    categorySlug: "accounting",
    duration: "2 Months",
    featured: false,
    highlight: "Enterprise business intelligence, data preparation, interactive visual analytics, and Tableau storytelling.",
    description: "Unlock actionable insights from large business datasets. Learn data extraction, calculated fields, parameters, interactive filters, dual-axis charts, geospatial mapping, and publication on Tableau Server for business stakeholders.",
    syllabus: [
      "Tableau Desktop Architecture & Data Connections",
      "Data Preparation, Joins, Blending & Unions",
      "Basic & Advanced Visualizations (Heatmaps, Treemaps, Dual-Axis)",
      "Level of Detail (LOD) Calculations & Parameters",
      "Geographic Mapping & Spatial Data",
      "Building Interactive Storyboards & Dashboards",
      "Tableau Server / Online Deployment Best Practices"
    ],
    icon: "BarChart3"
  },
  {
    slug: "certificate-course-in-power-bi",
    title: "Certificate Course in Power BI",
    categorySlug: "accounting",
    duration: "2 Months",
    featured: false,
    highlight: "Microsoft Power BI, Power Query transformation, DAX modeling, SQL connectivity, and live KPI dashboards.",
    description: "Master the world's leading business analytics platform. Connect to SQL databases and Excel feeds, clean and shape dirty data with Power Query, model relationships, write powerful DAX measures, and publish live cloud-enabled executive reports.",
    syllabus: [
      "Introduction to Power BI & Ecosystem",
      "SQL Server Database Fundamentals & Queries",
      "Power Query ETL (Extract, Transform, Load)",
      "Data Modeling & Relationship Management",
      "DAX (Data Analysis Expressions) Measures & Calculated Columns",
      "Visual Dashboards with Drill-Down & Bookmarks",
      "Power BI Service Cloud Deployment & Gateway Scheduling"
    ],
    icon: "BarChart3"
  },
  {
    slug: "certificate-course-in-share-market",
    title: "Certificate Course in Share Market",
    categorySlug: "accounting",
    duration: "3 Months",
    featured: false,
    highlight: "Technical analysis, candlestick patterns, price action, intraday, swing trading, F&O, and risk management.",
    description: "Gain practical, disciplined mastery over financial markets. Understand candlestick chart patterns, moving averages, RSI, MACD indicators, IPO valuation, intraday vs swing trading setups, Options & Futures strategies (Nifty & Bank Nifty), and automated Google Sheet tracking.",
    syllabus: [
      "Module 1: Fundamental vs Technical Analysis",
      "Candlestick Patterns & Support/Resistance Levels",
      "Technical Indicators: RSI, MACD, Moving Averages, Bollinger Bands",
      "Intraday & Swing Trading Rules with Risk-Reward",
      "IPO Strategy & Trading on Mobile/Desktop Platforms",
      "Module 2: Google Sheet Algorithmic Strategy",
      "Futures & Options (F&O) Trading, Call & Put Mechanics",
      "Nifty & Bank Nifty Trading Strategies",
      "Commodity & Currency Markets Overview"
    ],
    icon: "TrendingUp"
  },
  {
    slug: "combo-course-with-ms-cit",
    title: "Combo Course with MS-CIT",
    categorySlug: "accounting",
    duration: "6 Months",
    featured: false,
    highlight: "All-in-one career booster: MS-CIT + Advance Excel + Tally Prime GST + Typing + DTP / AI skills.",
    description: "The ultimate value program for job seekers. Combines the government-recognised MS-CIT certificate with high-paying job skills: corporate Advance Excel, Tally ERP 9 with GST, certified English typing speed, and your choice of Graphic DTP or Artificial Intelligence tools.",
    syllabus: [
      "Government Recognised MS-CIT Curriculum",
      "Advance Excel with Lookup, Pivot & Macros",
      "Advance Tally ERP 9 with GST & Prime",
      "English Typing Speed (30/40 WPM)",
      "Specialized Elective: DTP (Corel/Photoshop) OR AI Tools",
      "Mock Job Interviews & Resume Assistance"
    ],
    icon: "Award"
  },
  {
    slug: "certificate-course-in-typing-english",
    title: "Certificate Course in Typing (English)",
    categorySlug: "accounting",
    duration: "3 Months",
    featured: false,
    highlight: "Speed typing course targeting 30 WPM / 40 WPM with GCC-TBC exam preparation and finger posture.",
    description: "Attain high-accuracy touch typing speed needed for Maharashtra Government clerical jobs, High Court examinations, and MNC data entry roles. Includes daily timed software exercises, ergonomic keyboard posture, and GCC-TBC pattern test drills.",
    syllabus: [
      "Home Row, Top Row & Bottom Row Touch Typing",
      "Speed Building Drills & Accuracy Calibration",
      "GCC-TBC English 30 WPM Exam Pattern",
      "GCC-TBC English 40 WPM Exam Pattern",
      "Speed Letter & Statement Formatting"
    ],
    icon: "Keyboard"
  },
  {
    slug: "certificate-course-in-typing-marathi",
    title: "Certificate Course in Typing (Marathi)",
    categorySlug: "accounting",
    duration: "3 Months",
    featured: false,
    highlight: "State recognized Marathi typing (30/40 WPM) for government recruitment, MPSC, and legal administration.",
    description: "Master Marathi keyboard layouts (ISM / Unicode) with correct typing techniques. Essential for Maharashtra government recruitments, Mantralaya postings, collector office exams, and legal documentation.",
    syllabus: [
      "Marathi Keyboard Layouts & Font Standards",
      "Touch Typing Practice on Marathi Unicode / ISM",
      "Speed Building to 30 WPM & 40 WPM",
      "Official Government Letter & Gazette Typing",
      "GCC-TBC Marathi Exam Preparation"
    ],
    icon: "Keyboard"
  },
  {
    slug: "certificate-course-in-c-c-plus-plus",
    title: "Certificate Course in C, C++",
    categorySlug: "programming",
    duration: "3 Months",
    featured: false,
    highlight: "Core foundational programming: algorithms, memory pointers, data structures, and Object-Oriented OOP in C++.",
    description: "The essential starting point for all aspiring software engineers and engineering students. Learn core algorithmic thinking, pointers, dynamic memory allocation, structures, and file operations in C, followed by Object-Oriented Programming (OOP), inheritance, polymorphism, and templates in C++.",
    syllabus: [
      "C: Syntax, Variables, Data Types & Operators",
      "Control Structures: If-Else, Switch & Loops",
      "Functions, Recursion & Arrays",
      "Puppetting on Strings & String Functions",
      "Structures, Unions & Typedefs",
      "Pointers & Dynamic Memory Allocation",
      "File Handling in C",
      "C++: Classes, Objects & Constructors/Destructors",
      "Function & Operator Overloading",
      "Inheritance, Virtual Functions & Polymorphism"
    ],
    icon: "Code2"
  },
  {
    slug: "certificate-course-in-adv-java",
    title: "Certificate Course in Adv. Java",
    categorySlug: "programming",
    duration: "4 Months",
    featured: false,
    highlight: "Full enterprise Java path: Core Java OOP, Multithreading, JDBC, Servlets, JSP, and JavaBeans.",
    description: "A comprehensive journey from Java basics to enterprise backend web development. Master Core Java fundamentals, Collections framework, Exception handling, Multi-threading, and JDBC, transitioning smoothly into Advance Java with Servlets, JSP, RMI, and MVC architecture.",
    syllabus: [
      "Core Java: OOP Concepts, Data Types & Control Flow",
      "Classes, Inheritance, Packages & Interfaces",
      "Exception Handling & Multithreaded Programming",
      "Java Collections Framework & I/O Streams",
      "AWT, Swing GUI & Event Handling",
      "Advance Java: JDBC Database Connectivity",
      "Servlets & JavaServer Pages (JSP)",
      "JavaBeans, RMI & MVC Architecture"
    ],
    icon: "Coffee"
  },
  {
    slug: "certificate-course-in-php",
    title: "Certificate Course in PHP",
    categorySlug: "programming",
    duration: "2 Months",
    featured: false,
    highlight: "Server-side web development with PHP, MySQL database integration, form handling, and authentication.",
    description: "Learn dynamic server-side web scripting. Set up local development environments with WAMP/XAMPP, write secure PHP backend scripts, handle user requests with GET/POST, manage sessions/cookies, and interact with MySQL relational databases.",
    syllabus: [
      "WAMP/XAMPP Server Setup & phpMyAdmin",
      "PHP Syntax, Variables, Data Types & Operators",
      "Control Structures, Arrays & Functions",
      "Forms Processing, GET & POST Validation",
      "Cookies, Session Management & Authentication",
      "PHP + MySQL Database Connectivity (CRUD Operations)",
      "Real-Time Web Application Project"
    ],
    icon: "Globe"
  },
  {
    slug: "certificate-course-in-python",
    title: "Certificate Course in Python",
    categorySlug: "programming",
    duration: "2 Months",
    featured: false,
    highlight: "Modern Python programming: data structures, OOP classes, lambda functions, modules, and file automation.",
    description: "Python is the most versatile programming language in tech today. This course guides you through clean syntax, list comprehensions, dictionaries, object-oriented principles, lambda expressions, file operations, and foundational libraries used in automation and data science.",
    syllabus: [
      "Python Environment & Basic Syntax",
      "Data Types, String Operations & Slicing",
      "Conditional Logic & Loop Iteration",
      "Functions, Scope & Lambda Functions",
      "Object-Oriented Programming (Classes & Inheritance)",
      "Polymorphism & Instance Methods",
      "Modules, Packages & File Handling",
      "Introduction to Python Automation"
    ],
    icon: "Braces"
  },
  {
    slug: "diploma-in-oracle-and-sql-server",
    title: "Diploma in Oracle & SQL Server",
    categorySlug: "programming",
    duration: "2 Months",
    featured: false,
    highlight: "Enterprise database architecture, complex SQL queries, Joins, PL/SQL stored procedures, and triggers.",
    description: "Master two industry-standard relational database engines. Learn Data Definition Language (DDL), Data Manipulation Language (DML), complex multi-table Joins, Subqueries, Indexes, Views, Transactions, plus advanced PL/SQL programming with Stored Procedures, Functions, and Triggers.",
    syllabus: [
      "Relational Database Management Concepts",
      "Oracle: SQL Commands & Data Querying",
      "PL/SQL Programming: Procedures, Functions & Triggers",
      "Overview of Database Administration (DBA)",
      "SQL Server: Built-in Functions & Set Operators",
      "Complex Joins, Subqueries & Common Table Expressions",
      "Indexes, Views & Transaction Management"
    ],
    icon: "Database"
  },
  {
    slug: "diploma-in-dot-net",
    title: "Diploma in Dot Net",
    categorySlug: "programming",
    duration: "6 Months",
    featured: false,
    highlight: "Microsoft .NET framework development using C#, VB.NET, Windows Forms, and ASP.NET web applications.",
    description: "Build robust enterprise desktop and web applications on the Microsoft .NET platform. Learn C# programming, Windows GUI interfaces, ADO.NET database operations, and modern web application building using ASP.NET.",
    syllabus: [
      ".NET Framework Architecture & CLR",
      "Object-Oriented C# Console & GUI Applications",
      "VB.NET Programming Fundamentals",
      "ADO.NET Database Integration",
      "ASP.NET Web Applications & State Management",
      "Web Services & Deployment"
    ],
    icon: "Layers"
  },
  {
    slug: "diploma-in-adv-software-programming",
    title: "Diploma in Adv. Software Programming",
    categorySlug: "programming",
    duration: "12 Months",
    featured: false,
    highlight: "1-year intensive software developer track: C, C++, Core & Adv Java, SQL Server, C#, and ASP.NET.",
    description: "A comprehensive 1-year developer curriculum tailored for high employability in IT services and software product companies. Covers procedural programming, OOP paradigms, enterprise Java, Microsoft .NET ecosystem, and enterprise SQL databases.",
    syllabus: [
      "Computing Fundamentals & Windows Environment",
      "C & C++ Programming Foundations",
      "Core Java & Advanced Java with JDBC/JSP",
      "SQL Server Relational Database Architecture",
      "C# Programming & Windows Applications",
      "VB.NET & ASP.NET Web Development",
      "Live Multi-Tier Project Development"
    ],
    icon: "Code2"
  },
  {
    slug: "diploma-in-software-engineering",
    title: "Diploma in Software Engineering",
    categorySlug: "programming",
    duration: "24 Months",
    featured: false,
    highlight: "2-year comprehensive software engineering program from front-end design to enterprise full-stack development.",
    description: "Our most in-depth computer science diploma. Across 4 semesters, students master front-end web design, multimedia tools, server-side scripting, enterprise Java, Oracle database administration, Microsoft .NET development, and full-scale software engineering methodologies.",
    syllabus: [
      "Sem I: Fundamentals, Office, Photoshop, HTML, HTML5, CSS, JS, ASP, PHP",
      "Sem II: C, C++, Core Java, Adv. Java, Oracle, SQL Server, C#, VB.Net, ASP.Net",
      "Sem III: Advanced Frameworks, API Development & Cloud Deployments",
      "Sem IV: Industrial Software Architecture & Capstone Internship Project"
    ],
    icon: "Cpu"
  },
  {
    slug: "full-stack-with-mern-stack-web-development",
    title: "Full Stack with MERN Stack Web Development",
    categorySlug: "programming",
    duration: "12 Months",
    featured: true,
    highlight: "Modern full-stack web developer diploma: HTML5, CSS, JavaScript, React, Node.js, Express, and MongoDB.",
    description: "Become a modern full-stack web engineer. Build responsive single-page client applications with React.js, engineer robust RESTful API servers with Node.js and Express, store unstructured data in MongoDB, and deploy scalable cloud web applications.",
    syllabus: [
      "Front End: HTML5, CSS3, Modern JavaScript (ES6+)",
      "Responsive UI with Bootstrap & Tailwind CSS",
      "React.js: Components, Hooks, State & Routing",
      "PHP & MySQL Full Stack Integration",
      "Back End: Node.js Runtime & Express.js REST APIs",
      "MongoDB Database: Schema Design & Mongoose",
      "Authentication (JWT), Deployment & Git Workflow"
    ],
    icon: "Layers"
  },
  {
    slug: "certificate-course-in-ai-ml",
    title: "Certificate Course in AI-ML (Artificial Intelligence)",
    categorySlug: "programming",
    duration: "2 Months",
    featured: true,
    highlight: "Foundational AI, Machine Learning principles, generative AI tools, data science, and modern AI career paths.",
    description: "Get ahead in the era of Artificial Intelligence. Understand how machine learning models work, explore real-world datasets, leverage generative AI tools like ChatGPT for daily and professional workflows, and learn about government initiatives and modern AI career opportunities.",
    syllabus: [
      "Fundamentals of AI & Impact on Society",
      "Branches & Subfields of Artificial Intelligence",
      "Generative AI Tools & Prompt Engineering",
      "Foundations of Machine Learning & Model Training",
      "Data Science Overview & Feature Engineering",
      "Practical Applications of AI in Business & Daily Life",
      "AI-ML Case Studies & Emerging Career Pathways",
      "Government Programs & Initiatives in AI"
    ],
    icon: "Brain"
  },
  {
    slug: "full-stack-development",
    title: "Full Stack Development",
    categorySlug: "programming",
    duration: "Short Course",
    featured: false,
    highlight: "Fast-paced essential full stack overview covering client interfaces, server logic, and database integration.",
    description: "A fast-track curriculum focused on connecting front-end web interfaces to server-side code and database persistence.",
    syllabus: [
      "Front-End Foundations (HTML/CSS/JS)",
      "Server Scripting Essentials",
      "Database CRUD Operations",
      "End-to-End Project Build"
    ],
    icon: "Layers"
  },
  {
    slug: "full-stack-java-development",
    title: "Full Stack-Java Development",
    categorySlug: "programming",
    duration: "Short Course",
    featured: false,
    highlight: "End-to-end Java web development with Spring/Servlets backend and interactive web front-end.",
    description: "Master Java-powered web systems connecting responsive HTML/JS interfaces with secure Java backend logic and relational database stores.",
    syllabus: [
      "Java OOP & Collections",
      "Backend API Construction",
      "Database Connectivity with JDBC",
      "Front-End Integration"
    ],
    icon: "Coffee"
  },
  {
    slug: "certificate-course-in-sap",
    title: "Certificate course in SAP",
    categorySlug: "programming",
    duration: "Short Course",
    featured: false,
    highlight: "Enterprise Resource Planning (ERP) overview and hands-on SAP module walkthroughs.",
    description: "Understand SAP enterprise ecosystem workflows, user interface navigation, master data management, and standard transactional processes.",
    syllabus: [
      "SAP Architecture & ERP Concept",
      "Navigation & User Roles",
      "Key Module Overviews (FICO/MM/SD)",
      "Standard Business Transactions"
    ],
    icon: "Database"
  },
  {
    slug: "scratch-programming",
    title: "Scratch Programming",
    categorySlug: "programming",
    duration: "Short Course",
    featured: false,
    highlight: "Fun block-based coding for school students and beginners to build interactive games and animations.",
    description: "An engaging introduction to computer programming for kids and beginners using visual drag-and-drop code blocks to create games and interactive stories.",
    syllabus: [
      "Visual Block Concepts",
      "Sprites, Backgrounds & Motion",
      "Events, Loops & Conditions",
      "Building 2D Games & Stories"
    ],
    icon: "Code2"
  },
  {
    slug: "c-cpp-oracle-sql-asp-vb-cs-html-wordpress",
    title: "Modular IT Training (C / C++ / SQL / HTML / WP)",
    categorySlug: "programming",
    duration: "Short Course",
    featured: false,
    highlight: "Custom 1-on-1 modular training in specific technologies like C, C++, SQL Server, C#, HTML, or WordPress.",
    description: "Select specific individual programming modules tailored to your university curriculum, hobby project, or immediate job requirement. Benefit from flexible 1-on-1 faculty guidance.",
    syllabus: [
      "Choose from C, C++, SQL Server, ASP.NET, VB.NET, C#, HTML5, or WordPress",
      "Custom 1-on-1 syllabus mapping",
      "Practical hands-on lab sessions"
    ],
    icon: "Code2"
  },
  {
    slug: "diploma-in-desk-top-publishing-dtp",
    title: "Diploma in Desk Top Publishing (DTP)",
    categorySlug: "design",
    duration: "3 Months",
    featured: false,
    highlight: "CorelDraw, Adobe Photoshop, page layouts, print typography, and commercial publishing projects.",
    description: "Launch a career in print and publishing. Learn vector graphics in CorelDraw and raster photo manipulation in Photoshop to design business cards, brochures, banners, magazines, and prepress print files.",
    syllabus: [
      "CorelDraw: Vector Illustration, Logos & Print Collateral",
      "Adobe Photoshop: Photo Editing, Retouching & Color Correction",
      "Typography, Print Layouts & Prepress Guidelines",
      "Color Profiles (CMYK vs RGB) & Commercial Projects"
    ],
    icon: "PenTool"
  },
  {
    slug: "diploma-in-graphics-designing",
    title: "Diploma in Graphics Designing",
    categorySlug: "design",
    duration: "6 Months",
    featured: true,
    highlight: "Master CorelDraw, Photoshop, Illustrator, InDesign, branding systems, and social media creative design.",
    description: "Become a versatile commercial graphic designer. Master the industry quartet: CorelDraw for print, Photoshop for image editing, Illustrator for vector branding, and InDesign for multi-page editorial layouts.",
    syllabus: [
      "CorelDraw: Corporate Stationery & Vector Assets",
      "Adobe Photoshop: Advanced Retouching & Compositions",
      "Adobe Illustrator: Logo Design, Vector Art & Infographics",
      "Adobe InDesign: Booklets, Magazines & Layouts",
      "Brand Identity Systems & Portfolio Project"
    ],
    icon: "Palette"
  },
  {
    slug: "diploma-in-web-designing",
    title: "Diploma in Web Designing",
    categorySlug: "design",
    duration: "6 Months",
    featured: false,
    highlight: "Responsive website design: Photoshop UI mockups, HTML5, CSS3, JavaScript interactivity, and WordPress.",
    description: "Learn to design beautiful, modern, mobile-friendly websites. Master UI mockup creation in Photoshop, semantic HTML5 markup, modern CSS layouts (Flexbox/Grid), JavaScript DOM effects, and dynamic WordPress CMS building.",
    syllabus: [
      "Web Design Principles & UI Mockups in Photoshop",
      "Semantic HTML5 Markup & CSS3 Styling",
      "Responsive Layouts (Flexbox, CSS Grid & Media Queries)",
      "JavaScript Interactivity & DOM Manipulation",
      "WordPress Theme Setup, Customization & Plugins",
      "Live Website Deployment Project"
    ],
    icon: "Globe"
  },
  {
    slug: "diploma-in-interior-designing",
    title: "Diploma in Interior Designing",
    categorySlug: "design",
    duration: "12 Months",
    featured: false,
    highlight: "Complete CAD & 3D visualization: AutoCAD 2D/3D, 3D Max, Revit Architecture, V-Ray, and interior walk-throughs.",
    description: "Turn architectural visions into photorealistic realities. Master technical floor plans in AutoCAD, BIM architectural modeling in Revit, detailed 3D interior staging in 3D Max, and hyper-realistic lighting renders using V-Ray.",
    syllabus: [
      "Photoshop for Architectural Presentation",
      "AutoCAD 2D Drafting, Plans & Sections",
      "AutoCAD 3D Modeling & Isometric Projections",
      "3D Max Interior Modeling, Materials & Lighting",
      "Autodesk Revit BIM Modeling & Wall Layouts",
      "V-Ray Photorealistic Rendering & Camera Walkthroughs",
      "Complete Interior Portfolio Project"
    ],
    icon: "Building2"
  },
  {
    slug: "advance-diploma-in-autocad",
    title: "Advance Diploma in AutoCad",
    categorySlug: "design",
    duration: "3 Months",
    featured: false,
    highlight: "2D drafting, isometric projections, 3D modeling, plotting, and architectural/civil/mechanical drawings.",
    description: "Industry-standard Computer-Aided Design training for engineers, architects, and draughtsmen. Master all 2D drawing tools, dimension styling, layer standards, isometric projections, 3D solids, and multi-scale sheet plotting.",
    syllabus: [
      "AutoCAD Interface & Coordinate Systems",
      "2D Drawing & Modification Commands",
      "Isometric Drawings & Perspective Views",
      "3D Solid & Surface Modeling",
      "Dimensioning, Annotations & Layer Management",
      "Plotting & Layouts for Interior, Civil, Mechanical & Piping"
    ],
    icon: "Ruler"
  },
  {
    slug: "diploma-in-3d-max",
    title: "Diploma in 3D Max",
    categorySlug: "design",
    duration: "3 Months",
    featured: false,
    highlight: "3D architectural modeling, material texturing, photorealistic lighting, cameras, and walk-through animations.",
    description: "Create stunning 3D architectural visualisations and product renders with Autodesk 3ds Max. Learn polygon modeling, UV texturing, physical camera placements, realistic daylighting, and animated camera walk-throughs.",
    syllabus: [
      "Introduction to 3ds Max Interface & Viewports",
      "Polygon & Spline Modeling Techniques",
      "Material Creation, Shaders & UVW Mapping",
      "Lighting: Photometric, Standard & Sun Systems",
      "Camera Walkthrough Animation & Rendering Settings",
      "Complete Architectural Project"
    ],
    icon: "Box"
  },
  {
    slug: "diploma-in-revit",
    title: "Diploma in Revit",
    categorySlug: "design",
    duration: "3 Months",
    featured: false,
    highlight: "BIM architectural design, wall framing, doors/windows schedules, ceiling plans, and interior modeling.",
    description: "Master Building Information Modeling (BIM) using Autodesk Revit. Learn to generate synchronized 2D floor plans, 3D building models, schedule tables, interior wall modifications, and structural elevation views.",
    syllabus: [
      "BIM Concepts & Revit Interface",
      "Basic Drawing & Editing Tools",
      "Drawing & Modifying Walls, Floors & Slabs",
      "Adding Doors, Windows & Custom Families",
      "Ceiling Plans, Interior Components & Fixtures",
      "Exterior Elevations & Architectural Schedules",
      "Comprehensive Revit Capstone Project"
    ],
    icon: "Building2"
  },
  {
    slug: "coreldraw-photoshop-illustrator-indesign-vray-sketchup",
    title: "Individual Software Training (Corel/PS/AI/InDesign/V-Ray)",
    categorySlug: "design",
    duration: "Short Course",
    featured: false,
    highlight: "Focused short courses in CorelDraw, Photoshop, Illustrator, InDesign, V-Ray, or Google SketchUp.",
    description: "Learn specific design and architectural modeling applications with targeted, hands-on faculty mentorship.",
    syllabus: [
      "Dedicated 1-on-1 software training",
      "Targeted tool workflows & shortcuts",
      "Portfolio-ready outputs"
    ],
    icon: "Palette"
  },
  {
    slug: "adv-diploma-in-multimedia-and-animation",
    title: "Adv. Diploma in Multimedia & Animation",
    categorySlug: "animation",
    duration: "12 Months",
    featured: false,
    highlight: "Comprehensive 1-year multimedia: Photoshop, Illustrator, After Effects, Premiere Pro, 3D Max, and Canva.",
    description: "A powerhouse multimedia career program. Develop high-level creative skills across graphic branding, video editing, motion graphics, 2D/3D animation, and social media production for broadcasting and advertising studios.",
    syllabus: [
      "Graphic Design: CorelDraw, Photoshop & Illustrator",
      "Editorial Publishing in Adobe InDesign",
      "Motion Graphics & VFX in Adobe After Effects",
      "Video Post-Production in Adobe Premiere Pro",
      "3D Modeling & Animation in 3ds Max",
      "Canva for Fast Social Content",
      "Showreel & Portfolio Project"
    ],
    icon: "Sparkles"
  },
  {
    slug: "after-effect",
    title: "After Effect",
    categorySlug: "animation",
    duration: "Short Course",
    featured: false,
    highlight: "Motion graphics, keyframe animation, VFX compositing, title sequences, and cinematic transitions.",
    description: "Learn Adobe After Effects from scratch. Master timeline keyframing, typography motion graphics, green screen keying, particle effects, visual masking, and dynamic video bumpers.",
    syllabus: [
      "Interface & Keyframe Animation Principles",
      "Typography Animation & Title Sequences",
      "Masking, Track Mattes & Chroma Keying",
      "Particle Effects & Motion Tracking",
      "Render Queue & Video Codecs"
    ],
    icon: "Sparkles"
  },
  {
    slug: "adobe-premier",
    title: "Adobe Premier",
    categorySlug: "animation",
    duration: "Short Course",
    featured: false,
    highlight: "Non-linear video editing, multi-track audio mixing, color grading with Lumetri, and YouTube exporting.",
    description: "Master industry-standard video editing with Adobe Premiere Pro. Learn timeline trimming, multi-camera syncing, background audio cleaning, Lumetri color grading, and optimal web/social media exporting.",
    syllabus: [
      "Non-Linear Editing Workspace & Trimming",
      "Audio Synchronization & Noise Reduction",
      "Transitions, Titles & Speed Ramping",
      "Lumetri Color Correction & Grading",
      "Export Presets for YouTube, Reels & Broadcast"
    ],
    icon: "Film"
  },
  {
    slug: "certificate-course-in-advance-digital-marketing",
    title: "Certificate Course in Advance Digital Marketing",
    categorySlug: "digital-marketing",
    duration: "3 Months",
    featured: false,
    highlight: "Complete 360° digital growth: SEO, Google Ads, Meta Ads, Content Strategy, Analytics, and AI tools.",
    description: "Launch your career as a high-earning digital marketer. Master on-page and off-page SEO, Google Search Console, Google Ads PPC, Facebook & Instagram Ads, email automation, WordPress blogging, and AI-powered campaign generation with ChatGPT.",
    syllabus: [
      "Digital Marketing Overview & Funnel Strategy",
      "Content Marketing & Blogging on WordPress",
      "Search Engine Optimization (SEO) & Keyword Research",
      "Google Search Console & Google Analytics 4",
      "Social Media Marketing (Facebook, Instagram, LinkedIn)",
      "Email Marketing & Lead Generation Tactics",
      "Bing Webmaster Tools & PPC Advertising",
      "Google Ads (Search, Display, Video & Shopping Ads)",
      "Affiliate & Influencer Marketing Frameworks",
      "Online Reputation Management & WhatsApp Marketing",
      "Google My Business (Local SEO) Setup",
      "AI Tools & ChatGPT for Marketing Copywriting",
      "Landing Page Optimization & Conversion Rate Techniques"
    ],
    icon: "Megaphone"
  },
  {
    slug: "adv-diploma-in-hardware-engineering",
    title: "Adv. Diploma in Hardware Engineering",
    categorySlug: "hardware-networking",
    duration: "3 Months",
    featured: false,
    highlight: "PC architecture, hardware assembly, BIOS setup, OS installation, diagnostics, and component troubleshooting.",
    description: "Gain hands-on skills in computer hardware assembly and maintenance. Learn motherboard architectures, SMPS testing, RAM/SSD upgrades, disk partitioning, dual-boot setups, and virus remediation on physical PC units.",
    syllabus: [
      "Computer Architecture & Hardware Components",
      "Storage Devices (HDD, NVMe SSD) & Partitioning",
      "DOS Commands & BIOS/UEFI Configurations",
      "Step-by-Step Computer Assembling & Teardown",
      "Operating System & Driver Installation",
      "Antivirus & Malware Troubleshooting",
      "Preventive Maintenance & Repair Techniques"
    ],
    icon: "Cpu"
  },
  {
    slug: "adv-diploma-in-network-engineering",
    title: "Adv. Diploma in Network Engineering",
    categorySlug: "hardware-networking",
    duration: "3 Months",
    featured: false,
    highlight: "LAN setup, crimping RJ45, TCP/IP, router/switch configuration, Wi-Fi security, and server sharing.",
    description: "Learn the fundamentals of modern enterprise networking. Practice RJ-45 cable crimping, configure subnetting and static/dynamic IP addresses, set up managed switches and wireless routers, and manage network printer and file sharing.",
    syllabus: [
      "Networking Standards, Topologies & OSI Model",
      "Crimping & Cabling (CAT6, RJ-45, Patch Panels)",
      "LAN, Router & Modem Installation",
      "TCP/IP Protocol Suite, IPv4 Addressing & Subnetting",
      "Switch Configuration & Peer-to-Peer Networking",
      "File, Folder & Network Printer Sharing",
      "Remote Desktop Administration",
      "Wireless Security & Network Troubleshooting"
    ],
    icon: "Network"
  },
  {
    slug: "adv-english-speaking-course",
    title: "Adv. English Speaking Course",
    categorySlug: "personality-english",
    duration: "3 Months",
    featured: false,
    highlight: "Fluent conversational English, grammar clarity, public speaking, group discussions, and interview mastery.",
    description: "Speak English with confidence, clarity, and grammatical precision. This interactive course features daily speaking exercises, voice and accent correction, professional email writing, group discussions, and mock job interview rounds.",
    syllabus: [
      "Fundamentals of Spoken Communication",
      "Preparatory Grammar & Sentence Structure",
      "Real-World Everyday English Conversations",
      "Public Speaking & Stage Fear Removal",
      "Group Discussions & Extempore Sessions",
      "Voice & Accent Correction Drills",
      "Email & Business Correspondence",
      "Resume Writing & Job Interview Q&A"
    ],
    icon: "MessageCircle"
  },
  {
    slug: "adv-personality-development-course",
    title: "Adv. Personality Development Course",
    categorySlug: "personality-english",
    duration: "1 Month",
    featured: false,
    highlight: "Confidence building, executive body language, business etiquette, grooming, and interview preparation.",
    description: "Transform your personal and professional presence. Learn non-verbal body language cues, professional grooming standards, effective conflict management, executive etiquette, and confident presentation delivery.",
    syllabus: [
      "Self-Assessment & Confidence Building",
      "Business Etiquette & Corporate Manners",
      "Body Language, Posture & Dress Code",
      "Overcoming Stage Fright & Public Presentation",
      "Professional Resume Writing & LinkedIn Presence",
      "Mock Interview Sessions & Stress Management"
    ],
    icon: "UserCheck"
  },
  {
    slug: "certificate-course-in-11th-computer-it",
    title: "Certificate Course in 11th Computer IT",
    categorySlug: "school-special",
    duration: "As per syllabus",
    featured: false,
    highlight: "Maharashtra State Board 11th standard Information Technology syllabus coaching and practical lab training.",
    description: "Complete academic coaching for 11th Standard IT students following the Maharashtra State Board syllabus. Includes comprehensive theoretical concepts, step-by-step practical coding, and exam-oriented problem-solving.",
    syllabus: [
      "Basics of Information Technology",
      "Introduction to DBMS",
      "HTML5 & CSS Web Development",
      "Client-Side Scripting with JavaScript",
      "Practical Lab Assignments & Board Exam Preparation"
    ],
    icon: "GraduationCap"
  },
  {
    slug: "certificate-course-in-12th-computer-it",
    title: "Certificate Course in 12th Computer IT",
    categorySlug: "school-special",
    duration: "As per syllabus",
    featured: false,
    highlight: "Maharashtra State Board 12th standard HSC IT coaching with practical exams and score optimization.",
    description: "Target top marks in your 12th HSC Board Information Technology examination. In-depth training on advanced web designing, SEO principles, JavaScript logic, PHP back-end basics, and official Board practical journal completion.",
    syllabus: [
      "Advanced Web Designing (HTML5/CSS3)",
      "Search Engine Optimization (SEO) Principles",
      "Advanced Client-Side Scripting (JS)",
      "Emerging Technologies (IoT, Cloud, 5G)",
      "Server-Side Scripting with PHP",
      "HSC Board Practical Journal Preparation & Test Series"
    ],
    icon: "GraduationCap"
  },
  {
    slug: "certificate-course-in-data-science",
    title: "Certificate Course in Data Science",
    categorySlug: "school-special",
    duration: "As per syllabus",
    featured: false,
    highlight: "Foundational data science, Python data manipulation, statistical analysis, and visual charts.",
    description: "An introductory pathway into data science for ambitious students. Understand data collection, cleaning, statistical modeling, and visual storytelling using Python data libraries.",
    syllabus: [
      "Introduction to Data Science & Analytics",
      "Python Data Structures for Analytics",
      "Data Cleaning & Exploration",
      "Basic Statistical Analysis & Hypotheses",
      "Visualizing Trends & Presenting Insights"
    ],
    icon: "BarChart3"
  },
  {
    slug: "certificate-course-in-computer-science",
    title: "Certificate Course in Computer Science",
    categorySlug: "school-special",
    duration: "As per syllabus",
    featured: false,
    highlight: "Curriculum coaching for Junior College and University Computer Science subjects and practicals.",
    description: "Structured academic tutoring for college and university computer science subjects, covering microprocessors, C++ programming, data structures, and computer organization.",
    syllabus: [
      "Computer Architecture & Microprocessors",
      "Object-Oriented Programming (C++)",
      "Data Structures & Algorithmic Logic",
      "Academic Lab Work & Project Guidance"
    ],
    icon: "GraduationCap"
  }
];
