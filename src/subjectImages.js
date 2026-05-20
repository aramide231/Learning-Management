/**
 * Subject card images from src/general media
 */
import biology from './general media/biology.jpg';
import chemistry from './general media/chemistry.jpg';
import civicEducation from './general media/civic education.jpg';
import englishLanguage from './general media/english language.jpg';
import furtherMath from './general media/furthermath.jpg';
import ict from './general media/ICT.jpg';
import mathematics from './general media/mathematics.png';
import physics from './general media/physics.jpg';
import programmingBasics from './general media/peogramming basics.jpg';
import socialStudies from './general media/social studies.jpg';

export const SUBJECT_IMAGES = {
  physics,
  chemistry,
  mathematics,
  'f-mathematics': furtherMath,
  biology,
  civic: civicEducation,
  social: socialStudies,
  ict,
  english: englishLanguage,
  programming: programmingBasics,
};

/** @param {string} subjectId */
export function getSubjectImage(subjectId) {
  return SUBJECT_IMAGES[subjectId] ?? physics;
}
