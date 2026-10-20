import fs from 'fs';
fs.mkdirSync('www', { recursive: true });
fs.copyFileSync('dist/index.html', 'www/index.html');
console.log('www/index.html bereit');
