import fallbackImg from '../assets/courses/course-fallback.jpg';

// Eagerly import all course images via Vite glob
const courseImages = import.meta.glob('../assets/courses/*.jpg', {
  eager: true,
  import: 'default',
});

/**
 * Get course thumbnail URL by slug with fallback
 * @param {string} slug
 * @returns {string} Image URL
 */
export function getCourseImage(slug) {
  const targetPath = `../assets/courses/${slug}.jpg`;
  return courseImages[targetPath] || fallbackImg;
}

export { fallbackImg };
