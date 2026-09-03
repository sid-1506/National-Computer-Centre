// Eagerly glob-import all course images via Vite glob
const courseImages = import.meta.glob('../assets/courses/*.{jpg,jpeg,png,webp}', {
  eager: true,
  import: 'default',
});

/**
 * Normalise string for resilient key matching (lowercase, strip extension, strip spaces/dashes/underscores)
 * @param {string} str
 * @returns {string}
 */
export function normalizeKey(str) {
  if (!str) return '';
  return String(str)
    .toLowerCase()
    .replace(/\.[a-z0-9]+$/i, '') // strip file extension if present
    .replace(/[\s\-_]/g, '');     // strip spaces, dashes, underscores
}

// Build lookup maps from the eagerly imported course images
const imageByExactFilename = {};
const imageByNormalizedKey = {};

for (const [rawPath, imageModule] of Object.entries(courseImages)) {
  const filename = rawPath.split('/').pop();
  if (filename) {
    imageByExactFilename[filename] = imageModule;
    const norm = normalizeKey(filename);
    if (norm && !imageByNormalizedKey[norm]) {
      imageByNormalizedKey[norm] = imageModule;
    }
  }
}

/**
 * Explicit slug -> image filename mapping.
 * Each filename matches an actual file in src/assets/courses/.
 */
export const SLUG_TO_IMAGE_FILENAME = {
  // Digital & Marketing
  'certificate-course-in-advanced-digital-marketing': 'Digital mkt.jpeg',

  // Data & Analytics & AI
  'certificate-course-in-data-analytics': 'data-analytics.jpg',
  'certificate-course-in-data-science': 'Data Science.webp',
  'certificate-course-in-ai-machine-learning': 'ai-machine-learning.jpg',

  // Cyber Security & IT
  'certificate-course-in-cyber-security': 'cyber-security.jpg',

  // SAP
  'certificate-course-in-sap': 'SAP.jpg',

  // Management & DTP & Design
  'diploma-in-computer-management': 'Diploma in computer management.webp',
  'certificate-course-in-coreldraw': 'coreldraw.jpg',
  'certificate-course-in-adobe-photoshop': 'Photoshop.jpg',
  'certificate-course-in-adobe-illustrator': 'illustrator.jpg',
  'certificate-course-in-adobe-indesign': 'Indesign.webp',
  'diploma-in-graphic-designing': 'Graphic designing.webp',

  // Office & Fundamentals
  'certificate-course-in-ms-office': 'MS-Office.jpg',
  'certificate-course-in-ms-cit': 'ms-cit_2026_1.webp',
  'combo-course-with-ms-cit': 'ms-cit_2026_1.webp',

  // Accounting & Financials
  'certificate-course-in-advanced-tally-erp-9': 'tally erp 9.jpg',
  'certificate-course-in-advanced-tally-prime': 'Tally prime.jpg',
  'certificate-course-in-advanced-excel': 'advanced-excel.jpg',
  'certificate-course-in-advanced-excel-with-dashboard': 'advanced-excel-dashboard.jpg',
  'certificate-course-in-advanced-excel-with-mis-reports': 'advanced-excel-mis-reports.jpg',

  // Programming & Web
  'full-stack-mern-web-development': 'full-stack-mern.jpg',
  'certificate-course-in-html': 'HTML.jpg',
  'certificate-course-in-wordpress': 'wordpress.jpg',
  'certificate-course-in-c-programming': 'C programming.jpg',
  'certificate-course-in-c-plus-plus': 'c-plus-plus.jpg',
  'certificate-course-in-advanced-java': 'advanced-java.jpg',
  'certificate-course-in-php': 'PHP.jpg',
  'certificate-course-in-python': 'python.jpg',
  'diploma-in-dot-net': 'dot-net.jpg',
  'certificate-course-in-computer-science': 'computer-science.jpg',
  'diploma-in-web-designing': 'web-designing.jpg',
  'diploma-in-interior-designing': 'interior-designing.jpg',
  'advanced-diploma-in-multimedia-animation': 'multimedia-animation.jpg',

  // Databases & Analytics & BI
  'certificate-course-in-sql': 'SQL.jpg',
  'certificate-course-in-tableau': 'Tablue.jpg',
  'certificate-course-in-power-bi': 'Power BI.jpg',

  // CAD, 3D & Animation & Video
  'certificate-course-in-sketchup': 'Sketchup.jpg',
  'certificate-course-in-adobe-after-effects': 'Adobe after effect.jpg',
  'certificate-course-in-adobe-premiere-pro': 'adobe-premiere-pro.jpg',
  'certificate-course-in-autocad': 'Autocad.jpg',
  'certificate-course-in-3ds-max': '3D max.jpg',
  'certificate-course-in-revit': 'Revit.jpg',
  'certificate-course-in-v-ray': 'V-ray.jpg',

  // Typing
  'certificate-course-in-typing-english': 'English Typing.png',
  'certificate-course-in-typing-marathi': 'Marathi TYping.png',

  // Financial, Personal Development & IT
  'certificate-course-in-share-market': 'share-market.jpg',
  'certificate-course-in-advanced-english-speaking': 'English Speaking.jpg',
  'certificate-course-in-advanced-personality-development': 'personality-development.jpg',
  'certificate-course-in-11th-computer-it': '11th-computer-it.jpg',
  'certificate-course-in-12th-computer-it': '12th-computer-it.jpg',
  'advanced-diploma-in-hardware-engineering': 'Hardware.jpg',
  'advanced-diploma-in-network-engineering': 'network-engineering.jpg',
};

/**
 * Get course thumbnail image URL by slug, title, or filename.
 * Returns the resolved image URL if found, or null if no matching image exists.
 *
 * @param {string} slugOrName
 * @returns {string|null} Image URL or null
 */
export function getCourseImage(slugOrName) {
  if (!slugOrName) return null;

  // 1. Explicit slug / key mapping check
  const mappedFilename = SLUG_TO_IMAGE_FILENAME[slugOrName];
  if (mappedFilename && imageByExactFilename[mappedFilename]) {
    return imageByExactFilename[mappedFilename];
  }

  // 2. Direct exact filename check (e.g. 'Excel.webp', 'Autocad.jpg')
  if (imageByExactFilename[slugOrName]) {
    return imageByExactFilename[slugOrName];
  }

  // 3. Direct path check (e.g. '../assets/courses/Excel.webp')
  if (courseImages[slugOrName]) {
    return courseImages[slugOrName];
  }

  // 4. Normalized key check
  const normKey = normalizeKey(slugOrName);
  if (normKey && imageByNormalizedKey[normKey]) {
    return imageByNormalizedKey[normKey];
  }

  return null;
}
