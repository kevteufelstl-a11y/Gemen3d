// Die fertige Spieldatei ist index.html im Hauptordner (Testversion 11 + Mehrspieler).
// Neu bauen aus den Quellen: siehe quellen/LIESMICH.txt
import fs from 'fs';
fs.mkdirSync('dist', { recursive: true });
fs.copyFileSync('index.html', 'dist/index.html');
console.log('dist/index.html bereit', (fs.statSync('index.html').size / 1e6).toFixed(2), 'MB');
