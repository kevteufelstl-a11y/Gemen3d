import { build } from 'esbuild';
import fs from 'fs';
const res = await build({ entryPoints: ['main.js'], bundle: true, minify: true, format: 'iife', write: false, target: 'es2020', legalComments: 'none' });
const js = res.outputFiles[0].text.replace(/<\/script/gi, '<\\/script');
const data = fs.readFileSync('gemen_data.json', 'utf8');
const fd = JSON.parse(fs.readFileSync('fragen_klasse3.json', 'utf8'));
const QS = {};
for (const f of fd.faecher) { QS[f.name] = []; for (const k of f.kategorien) for (const q of k.fragen) QS[f.name].push({ id: q.id, thema: k.name, frage: q.frage, optionen: q.optionen, richtig: q.richtig, erklaerung: q.erklaerung }); }
let html = fs.readFileSync('template.html', 'utf8');
html = html.replace('/*QUESTIONS*/', () => JSON.stringify(QS)).replace('/*DATA*/', () => data).replace('/*BUNDLE*/', () => js);
fs.mkdirSync('dist', { recursive: true });
fs.writeFileSync('dist/index.html', html);
console.log('built', (html.length / 1e6).toFixed(2), 'MB');
