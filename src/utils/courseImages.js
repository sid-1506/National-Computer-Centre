import fallbackImg from '../assets/courses/course-fallback.jpg';

// Eagerly import all course images via Vite glob
const courseImages = import.meta.glob('../assets/courses/*.jpg', {
  eager: true,
  import: 'default',
});

// Mapping of course slugs to image file basenames (without .jpg extension)
const SLUG_IMAGE_MAP = {
  'certificate-course-in-advanced-digital-marketing': 'certificate-course-in-advance-digital-marketing',
  'certificate-course-in-data-analytics': 'certificate-course-in-data-science',
  'certificate-course-in-cyber-security': 'adv-diploma-in-network-engineering',
  'certificate-course-in-ai-machine-learning': 'certificate-course-in-ai-ml',
  'full-stack-mern-web-development': 'full-stack-with-mern-stack-web-development',
  'certificate-course-in-sap': 'certificate-course-in-sap',
  'certificate-course-in-data-science': 'certificate-course-in-data-science',
  'certificate-course-in-computer-science': 'certificate-course-in-computer-science',
  'diploma-in-computer-management': 'diploma-in-computer-management',
  'certificate-course-in-coreldraw': 'coreldraw-photoshop-illustrator-indesign-vray-sketchup',
  'certificate-course-in-adobe-photoshop': 'diploma-in-graphics-designing',
  'certificate-course-in-adobe-illustrator': 'diploma-in-desk-top-publishing-dtp',
  'certificate-course-in-adobe-indesign': 'diploma-in-desk-top-publishing-dtp',
  'diploma-in-graphic-designing': 'diploma-in-graphics-designing',
  'diploma-in-web-designing': 'diploma-in-web-designing',
  'diploma-in-interior-designing': 'diploma-in-interior-designing',
  'advanced-diploma-in-multimedia-animation': 'adv-diploma-in-multimedia-and-animation',
  'certificate-course-in-ms-office': 'ms-word',
  'certificate-course-in-ms-cit': 'certificate-course-in-ms-cit',
  'certificate-course-in-advanced-tally-erp-9': 'certificate-course-in-advanced-tally-erp-9',
  'certificate-course-in-advanced-tally-prime': 'certificate-course-in-adv-tally-erp-9-with-prime',
  'certificate-course-in-advanced-excel': 'certificate-course-in-advance-excel',
  'certificate-course-in-advanced-excel-with-dashboard': 'advance-excel-with-dashboard',
  'certificate-course-in-advanced-excel-with-mis-reports': 'certificate-course-in-adv-excel-with-mis-reports',
  'certificate-course-in-html': 'c-cpp-oracle-sql-asp-vb-cs-html-wordpress',
  'certificate-course-in-wordpress': 'c-cpp-oracle-sql-asp-vb-cs-html-wordpress',
  'certificate-course-in-c-programming': 'certificate-course-in-c-c-plus-plus',
  'certificate-course-in-c-plus-plus': 'certificate-course-in-c-c-plus-plus',
  'certificate-course-in-advanced-java': 'certificate-course-in-adv-java',
  'certificate-course-in-php': 'certificate-course-in-php',
  'certificate-course-in-python': 'certificate-course-in-python',
  'certificate-course-in-sql': 'diploma-in-oracle-and-sql-server',
  'certificate-course-in-tableau': 'certificate-course-in-tableau',
  'certificate-course-in-power-bi': 'certificate-course-in-power-bi',
  'diploma-in-dot-net': 'diploma-in-dot-net',
  'certificate-course-in-sketchup': 'diploma-in-interior-designing',
  'certificate-course-in-adobe-after-effects': 'after-effect',
  'certificate-course-in-adobe-premiere-pro': 'adobe-premier',
  'certificate-course-in-autocad': 'advance-diploma-in-autocad',
  'certificate-course-in-3ds-max': 'diploma-in-3d-max',
  'certificate-course-in-revit': 'diploma-in-revit',
  'certificate-course-in-v-ray': 'diploma-in-3d-max',
  'combo-course-with-ms-cit': 'combo-course-with-ms-cit',
  'certificate-course-in-typing-english': 'certificate-course-in-typing-english',
  'certificate-course-in-typing-marathi': 'certificate-course-in-typing-marathi',
  'certificate-course-in-share-market': 'certificate-course-in-share-market',
  'certificate-course-in-advanced-english-speaking': 'adv-english-speaking-course',
  'certificate-course-in-advanced-personality-development': 'adv-personality-development-course',
  'certificate-course-in-11th-computer-it': 'certificate-course-in-11th-computer-it',
  'certificate-course-in-12th-computer-it': 'certificate-course-in-12th-computer-it',
  'advanced-diploma-in-hardware-engineering': 'adv-diploma-in-hardware-engineering',
  'advanced-diploma-in-network-engineering': 'adv-diploma-in-network-engineering',
};

/**
 * Get course thumbnail URL by slug or image key with fallback
 * @param {string} slugOrImage
 * @returns {string} Image URL
 */
export function getCourseImage(slugOrImage) {
  if (!slugOrImage) return fallbackImg;

  // 1. Direct path check
  const directPath = `../assets/courses/${slugOrImage}.jpg`;
  if (courseImages[directPath]) {
    return courseImages[directPath];
  }

  // 2. Slug map check
  const mappedFile = SLUG_IMAGE_MAP[slugOrImage];
  if (mappedFile) {
    const mappedPath = `../assets/courses/${mappedFile}.jpg`;
    if (courseImages[mappedPath]) {
      return courseImages[mappedPath];
    }
  }

  return fallbackImg;
}

export { fallbackImg };
