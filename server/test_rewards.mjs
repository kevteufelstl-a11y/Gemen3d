// Tests für das Belohnungssystem (Tag, Woche, Monat, Eltern, Trennung der Kinder)
import { PGlite } from '@electric-sql/pglite';
import { pgcrypto } from '@electric-sql/pglite/contrib/pgcrypto';
import fs from 'fs';
const db = new PGlite({ extensions: { pgcrypto } });
await db.exec(`create schema extensions; create extension pgcrypto schema extensions;
create role anon; create role authenticated; create role service_role;
create table public.profiles (id uuid primary key default gen_random_uuid(), name text not null unique, figure text, pin_hash text, created_at timestamptz not null default now());
create table public.game_saves (profile_id uuid references public.profiles(id) on delete cascade, game text not null, state jsonb not null default '{}', updated_at timestamptz not null default now(), primary key (profile_id, game));
create table public.learning_progress (profile_id uuid references public.profiles(id) on delete cascade, question_id text not null, correct boolean not null, answered_at timestamptz not null default now());
create table public.highscores (id bigint generated always as identity primary key, profile_id uuid not null references public.profiles(id) on delete cascade, game text not null, score int not null, created_at timestamptz not null default now());
insert into public.profiles (name) values ('Admin');`);
for (const f of ['01_schema', '02_api', '03_rewards']) await db.exec(fs.readFileSync(`/home/claude/gemen3d/server/${f}.sql`, 'utf8'));
const api = async (p) => (await db.query('select public.milo_api($1::jsonb) r', [JSON.stringify(p)])).rows[0].r;
let ok = 0, bad = 0;
const check = (n, c, x) => { c ? ok++ : bad++; console.log((c ? 'OK   ' : 'FEHLER ') + n + (c || x === undefined ? '' : '  ' + JSON.stringify(x))); };
const berlin = (off = 0) => { const d = new Date(Date.now() + off * 864e5); return new Intl.DateTimeFormat('sv-SE', { timeZone: 'Europe/Berlin' }).format(d); };
const goal = (sec = 1000) => ({ sec, goal: 1, ex: { n: 5, r: 4 } });
const saveDays = async (tok, days) => (await api({ action: 'save', token: tok, game: 'milo3d_days', state: { days } }));

import crypto from 'crypto';
const KEY = 'MILO-TEST-1234-ABCD';
await db.query(`insert into system_settings (k, v) values ('setup', jsonb_build_object('keyHash', $1::text, 'done', false))`, [crypto.createHash('sha256').update(KEY).digest('hex')]);
await api({ action: 'adminSetup', key: KEY, password: 'AdminPasswort1' });
let r = await api({ action: 'parentRegister', login: 'Familie T', password: 'eltern123' });
const par = r.b.token, famId = r.b.family.id; const kid = {};
for (const [n, pin] of [['Max', '1111'], ['Leon', '2222']]) { r = await api({ action: 'childCreate', token: par, name: n, pin }); kid[n] = r.b.child.id; }
await db.query(`update profiles set created_at = now() - interval '70 days' where role='child'`);
const tok = {}; for (const [n, pin] of [['Max', '1111'], ['Leon', '2222']]) { r = await api({ action: 'childLogin', name: n, pin }); tok[n] = r.b.token; }

console.log('--- Test 1: Tagesziel -> Tagesbelohnung');
r = await api({ action: 'rewardList', token: tok.Max });
const today = r.b.rewards.today;
check('Heute noch nicht erreicht', r.b.rewards.tag[0].reached === false, r.b.rewards.tag[0]);
r = await api({ action: 'rewardPick', token: tok.Max, kind: 'tag', period: today, choice: '15 Minuten länger aufbleiben' });
check('Auswahl ohne erreichtes Ziel abgelehnt', r.s === 409, r);
await saveDays(tok.Max, { [today]: goal() });
r = await api({ action: 'rewardList', token: tok.Max });
check('Tagesziel erreicht: Tagesbelohnung freigeschaltet', r.b.rewards.tag[0].reached === true, r.b.rewards.tag[0]);
r = await api({ action: 'rewardPick', token: tok.Max, kind: 'tag', period: today, choice: '15 Minuten länger aufbleiben' });
check('Spieler wählt Belohnung (Status offen)', r.s === 200 && r.b.rewards.tag[0].pick.status === 'offen', r);
r = await api({ action: 'rewardPick', token: tok.Max, kind: 'tag', period: today, choice: 'Süßigkeit' });
check('Doppelte Auswahl (mehrfach klicken) abgelehnt', r.s === 409, r);
check('Es gibt genau eine Zeile', (await db.query(`select count(*)::int c from rewards where profile_id=$1`, [kid.Max])).rows[0].c === 1);
r = await api({ action: 'saveBogus', token: tok.Max });
await saveDays(tok.Max, { [today]: { sec: 1000, ex: { n: 5 } } });
r = await api({ action: 'rewardList', token: tok.Max });
check('Ohne goal-Markierung kein Tagesziel', r.b.rewards.tag[0].reached === false);
await saveDays(tok.Max, { [today]: goal() });

console.log('--- Test 2: Wochenziel');
const dow = (new Date(berlin() + 'T12:00:00').getDay() + 6) % 7; // 0=Mo
const days = { [today]: goal() };
let n = 1;
for (let i = 1; n < 5 && i < 7; i++) { const off = -i; const dd = (dow + off); if (dd >= 0) { days[berlin(off)] = goal(); n++; } }
r = await saveDays(tok.Max, days);
r = await api({ action: 'rewardList', token: tok.Max });
const wk = r.b.rewards.woche[0];
console.log('   (Woche: ' + wk.days + ' von ' + wk.need + ' Tagen, Wochentag-Index heute ' + dow + ')');
if (dow >= 4) {
  check('Wochenziel (5 Tage) erreicht: Wochenbelohnung freigeschaltet', wk.reached === true, wk);
  r = await api({ action: 'rewardPick', token: tok.Max, kind: 'woche', period: wk.period, choice: 'Einen Film aussuchen' });
  check('Wochenbelohnung wählbar', r.s === 200, r);
} else {
  check('Wochenziel noch nicht erreicht (zu früh in der Woche): gesperrt', wk.reached === false, wk);
}
// Wochenziel künstlich in der Vorwoche erreichbar machen
const lw = {}; for (let i = 7; i < 14; i++) lw[berlin(-i)] = goal();
r = await saveDays(tok.Leon, lw);
r = await api({ action: 'rewardList', token: tok.Leon });
const lwk = r.b.rewards.woche.find((x) => x.reached);
check('Wochenziel der Vorwoche (Leon) erreicht und weiter abrufbar', !!lwk, r.b.rewards.woche);
r = await api({ action: 'rewardPick', token: tok.Leon, kind: 'woche', period: lwk.period, choice: 'Zwei Essen wünschen' });
check('Wochenbelohnung wählen', r.s === 200, r);

console.log('--- Test 3+4: Monat');
const ym = berlin().slice(0, 7);
const mdays = {}; const t0 = new Date(berlin() + 'T12:00:00');
const first = new Date(t0.getFullYear(), t0.getMonth(), 1, 12);
// Max: alle Tage ab 1. des laufenden Monats bis heute, einer fehlt
const maxDays = {}; const skip = berlin(-1).slice(0, 7) === ym ? berlin(-1) : null;
for (let d = new Date(first); d <= t0; d.setDate(d.getDate() + 1)) { const k = new Intl.DateTimeFormat('sv-SE').format(d); if (k !== skip) maxDays[k] = goal(); }
await saveDays(tok.Max, maxDays);
r = await api({ action: 'rewardList', token: tok.Max });
const mm = r.b.rewards.monat[0];
if (skip) {
  check('Verpasster Lerntag: Monatsbelohnung gesperrt/verloren', mm.lost === true && mm.reached === false && mm.missed.includes(skip), mm);
} else console.log('   (heute ist der 1. – Fall "verpasst" im laufenden Monat nicht prüfbar)');
// Leon: Vormonat komplett erfüllt
const prev = new Date(first); prev.setMonth(prev.getMonth() - 1);
const pEnd = new Date(first); pEnd.setDate(0);
const ld = {}; for (let d = new Date(prev); d <= pEnd; d.setDate(d.getDate() + 1)) ld[new Intl.DateTimeFormat('sv-SE').format(d)] = goal();
await saveDays(tok.Leon, ld);
r = await api({ action: 'rewardList', token: tok.Leon });
const pm = r.b.rewards.monat.find((x) => x.period === new Intl.DateTimeFormat('sv-SE').format(prev).slice(0, 7));
check('Alle Tage des Monats geschafft: Monatsbelohnung freigeschaltet', pm && pm.reached === true && pm.lost === false, pm);
r = await api({ action: 'rewardPick', token: tok.Leon, kind: 'monat', period: pm.period, choice: 'Ausflug aussuchen' });
check('Monatsbelohnung wählbar', r.s === 200, r);
// Max: verpasster Monat darf nicht gewählt werden
if (skip) { r = await api({ action: 'rewardPick', token: tok.Max, kind: 'monat', period: mm.period, choice: 'Kino' }); check('Verlorene Monatsbelohnung nicht wählbar (kein Nachholen)', r.s === 409, r); }

console.log('--- Test 5: Eltern');
r = await api({ action: 'rewardParentList', token: par, childId: kid.Max });
const mine = r.b.all.find((x) => x.kind === 'tag');
check('Eltern sehen die Auswahl', r.s === 200 && mine.status === 'offen', r);
r = await api({ action: 'rewardSetParent', token: par, id: mine.id, status: 'bestaetigt' });
check('Eltern bestätigen', r.s === 200);
r = await api({ action: 'rewardList', token: tok.Max });
check('Status beim Kind: bestätigt', r.b.rewards.tag[0].pick.status === 'bestaetigt', r.b.rewards.tag[0]);
r = await api({ action: 'rewardSetParent', token: par, id: mine.id, status: 'eingeloest' });
r = await api({ action: 'rewardList', token: tok.Max });
check('Als eingelöst markiert', r.b.rewards.tag[0].pick.status === 'eingeloest' && r.b.rewards.tag[0].pick.redeemedAt);
r = await api({ action: 'rewardSetParent', token: par, id: mine.id, status: 'abgelehnt' });
r = await api({ action: 'rewardPick', token: tok.Max, kind: 'tag', period: today, choice: 'Spaziergang' });
check('Nach Ablehnung darf das Kind neu wählen', r.s === 200 && r.b.rewards.tag[0].pick.status === 'offen' && r.b.rewards.tag[0].pick.choice === 'Spaziergang', r);
r = await api({ action: 'rewardSetParent', token: tok.Max, id: mine.id, status: 'bestaetigt' });
check('Kind kann sich nicht selbst bestätigen (Eltern-Aktion)', r.s === 403, r);
r = await api({ action: 'rewardParentSet', token: tok.Max, id: mine.id, status: 'bestaetigt', parentPassword: 'falsch' });
check('Am Kindergerät: falsches Elternpasswort abgelehnt', r.s === 401, r);
r = await api({ action: 'rewardParentSet', token: tok.Max, id: mine.id, status: 'bestaetigt', parentPassword: 'eltern123' });
check('Am Kindergerät: mit Elternpasswort bestätigt', r.s === 200 && r.b.rewards.tag[0].pick.status === 'bestaetigt', r);
r = await api({ action: 'parentRegister', login: 'Fremde Familie', password: 'andere123' });
const par2 = r.b.token;
r = await api({ action: 'rewardParentList', token: par2, childId: kid.Max });
check('Fremde Eltern sehen die Belohnungen nicht', r.s === 404, r);
r = await api({ action: 'rewardSetParent', token: par2, id: mine.id, status: 'eingeloest' });
check('Fremde Eltern können nichts ändern', r.s === 404, r);

console.log('--- Test 6: erneut anmelden');
r = await api({ action: 'childLogin', name: 'Max', pin: '1111' });
r = await api({ action: 'rewardList', token: r.b.token });
check('Nach erneuter Anmeldung ist alles noch da', r.b.rewards.tag[0].pick && r.b.rewards.tag[0].pick.choice === 'Spaziergang');

console.log('--- Test 7: Kinder getrennt');
r = await api({ action: 'rewardList', token: tok.Leon });
check('Leon sieht Max\' Tagesauswahl nicht', !r.b.rewards.tag.some((x) => x.pick && x.pick.choice === 'Spaziergang'));
check('Leon hat seine eigenen Auswahlen', r.b.rewards.woche.some((x) => x.pick) && r.b.rewards.monat.some((x) => x.pick));
r = await api({ action: 'rewardList', token: 'ungueltig' });
check('Ohne Anmeldung kein Zugriff', r.s === 401);
console.log(`\n${ok} bestanden, ${bad} fehlgeschlagen`); process.exit(bad ? 1 : 0);
