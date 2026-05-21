/**
 * Legacy helper — assignments now live in public/school.json under "assignments".
 * Edit that file directly to change questions, titles, or sections.
 *
 * This script only re-formats school.json (pretty-print). Run:
 *   node scripts/generate-school-json.cjs
 */
const fs = require('fs');
const path = require('path');

const schoolPath = path.join(__dirname, '..', 'public', 'school.json');
const school = JSON.parse(fs.readFileSync(schoolPath, 'utf8'));
fs.writeFileSync(schoolPath, JSON.stringify(school, null, 2), 'utf8');
console.log(`Formatted ${schoolPath} (${(school.assignments || []).length} assignments).`);
