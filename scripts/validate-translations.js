const fs = require('fs');
const path = require('path');

const en = JSON.parse(fs.readFileSync(path.join(__dirname, '../messages/en.json'), 'utf8'));
const sw = JSON.parse(fs.readFileSync(path.join(__dirname, '../messages/sw.json'), 'utf8'));

function getKeys(obj, prefix = '') {
  let keys = [];
  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      keys = keys.concat(getKeys(value, fullKey));
    } else {
      keys.push(fullKey);
    }
  }
  return keys;
}

const enKeys = getKeys(en);
const swKeys = getKeys(sw);

const missingInSw = enKeys.filter((k) => !swKeys.includes(k));
const extraInSw = swKeys.filter((k) => !enKeys.includes(k));

console.log(`Total English translation keys: ${enKeys.length}`);
console.log(`Total Kiswahili translation keys: ${swKeys.length}`);

if (missingInSw.length > 0) {
  console.error('ERROR: Keys missing in Kiswahili:', missingInSw);
  process.exit(1);
} else if (extraInSw.length > 0) {
  console.error('ERROR: Extra keys in Kiswahili not in English:', extraInSw);
  process.exit(1);
} else {
  console.log('SUCCESS: 100% translation key parity between English and Kiswahili!');
}
