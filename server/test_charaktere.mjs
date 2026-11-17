// Server-Tests gegen eine lokale Postgres-Kopie (PGlite) mit derselben Funktion wie live
import { PGlite } from '@electric-sql/pglite';
import { pgcrypto } from '@electric-sql/pglite/contrib/pgcrypto';
import fs from 'fs';
import crypto from 'crypto';

const db = new PGlite({ extensions: { pgcrypto } });
await db.exec(`create schema extensions; create extension pgcrypto schema extensions;
create role anon; create role authenticated; create role service_role;
create table public.profiles (id uuid primary key default gen_random_uuid(), name text not null unique, figure text, pin_hash text, created_at timestamptz not null default now());
create table public.game_saves (profile_id uuid references public.profiles(id) on delete cascade, game text not null, state jsonb not null default '{}', updated_at timestamptz not null default now(), primary key (profile_id, game));
create table public.learning_progress (profile_id uuid references public.profiles(id) on delete cascade, question_id text not null, correct boolean not null, answered_at timestamptz not null default now(), ever_right boolean not null default false, ever_wrong boolean not null default false, primary key (profile_id, question_id));
create table public.highscores (id bigint generated always as identity primary key, profile_id uuid not null references public.profiles(id) on delete cascade, game text not null, score int not null, created_at timestamptz not null default now());
insert into public.profiles (name) values ('Admin');`);
await db.exec(fs.readFileSync('/home/claude/gemen3d/server/01_schema.sql', 'utf8'));
await db.exec(fs.readFileSync('/home/claude/gemen3d/server/02_api.sql', 'utf8'));
await db.exec(fs.readFileSync('/home/claude/gemen3d/server/03_rewards.sql', 'utf8'));
await db.exec(fs.readFileSync('/home/claude/gemen3d/server/04_familien_einladungen.sql', 'utf8'));
// Bestandsdaten VOR dem Charakter-Update anlegen (ein "bisheriger" Spieler)
const KEY = 'MILO-TEST-1234-ABCD';
await db.query(`insert into system_settings (k, v) values ('setup', jsonb_build_object('keyHash', $1::text, 'done', false))`, [crypto.createHash('sha256').update(KEY).digest('hex')]);

const api = async (p) => (await db.query('select public.milo_api($1::jsonb) r', [JSON.stringify(p)])).rows[0].r;
let ok = 0, bad = 0;


const check = (name, cond, extra) => { cond ? ok++ : bad++; console.log((cond ? 'OK   ' : 'FEHLER ') + name + (cond || extra === undefined ? '' : '  ' + JSON.stringify(extra))); };


let r = await api({ action: 'adminSetup', key: KEY, password: 'AdminPasswort1' });
r = await api({ action: 'parentRegister', login: 'Familie Test', password: 'eltern123' });
const par = r.b.token;
r = await api({ action: 'childCreate', token: par, name: 'Kevin', pin: '1111', figure: '🦁' });
r = await api({ action: 'childCreate', token: par, name: 'Milo', pin: '2222', figure: '🐯' });
let k1 = (await api({ action: 'childLogin', name: 'Kevin', pin: '1111' })).b.token;
await api({ action: 'save', token: k1, game: 'milo3d_game', state: { punkte: 42 } });
const before = (await db.query("select count(*)::int n from profiles")).rows[0].n;

console.log('--- Update einspielen (05_charaktere.sql), zweimal (darf nichts doppelt machen)');
await db.exec(fs.readFileSync('/home/claude/gemen3d/server/05_charaktere.sql', 'utf8'));
await db.exec(fs.readFileSync('/home/claude/gemen3d/server/05_charaktere.sql', 'utf8'));
check('Keine Spieler gelöscht', (await db.query("select count(*)::int n from profiles")).rows[0].n === before);
r = await api({ action: 'loadAll', token: k1 });
check('Spielstand des bisherigen Spielers erhalten', r.b.saves.length === 1 && r.b.saves[0].state.punkte === 42, r);
r = await api({ action: 'me', token: k1 });
check('Profilbild (figure) unverändert', r.b.profile && JSON.stringify(r.b).includes('🦁'), r);

console.log('--- 1: bisheriger Spieler behält Standardfigur');
r = await api({ action: 'charList', token: k1 });
check('Ohne eigene Charaktere: Standardfigur aktiv (active = null), Auswahl noch offen', r.s === 200 && r.b.active === null && r.b.chars.length === 0 && r.b.introDone === false, r);

console.log('--- 2/3: Charaktere erstellen und mehrere speichern');
const look = (b) => ({ v: 1, pack: 'fantasy_races', packVersion: 1, body: b, parts: { skin: '1' } });
r = await api({ action: 'charSave', token: k1, name: 'Waldelf', pack: 'fantasy_races', data: look('Elf_Male'), select: true });
check('Charakter 1 gespeichert und ausgewählt', r.s === 200 && r.b.char.id, r); const c1 = r.b.char.id;
r = await api({ action: 'charSave', token: k1, name: 'Orkin', pack: 'fantasy_races', data: look('Orc_Female') });
check('Charakter 2 gespeichert', r.s === 200, r); const c2 = r.b.char.id;
r = await api({ action: 'charSave', token: k1, name: 'Mein Eigener', pack: 'fantasy_races', data: look('Elf_Female') });
const c3 = r.b.char.id;
r = await api({ action: 'charList', token: k1 });
check('Drei Charaktere gespeichert, Charakter 1 aktiv, Auswahl erledigt', r.b.chars.length === 3 && r.b.active === c1 && r.b.introDone === true, r);

console.log('--- 4: wechseln, bearbeiten');
r = await api({ action: 'charSelect', token: k1, id: c2 });
check('Wechsel zu Charakter 2', r.s === 200 && (await api({ action: 'charList', token: k1 })).b.active === c2);
r = await api({ action: 'charSave', token: k1, id: c3, name: 'Umbenannt', pack: 'fantasy_races', data: look('Orc_Male') });
check('Eigener Charakter bearbeitet', r.s === 200 && r.b.char.name === 'Umbenannt' && r.b.char.data.body === 'Orc_Male', r);
r = await api({ action: 'charSelect', token: k1, id: null });
check('Standardfigur wiederhergestellt (active = null)', r.s === 200 && (await api({ action: 'charList', token: k1 })).b.active === null);
await api({ action: 'charSelect', token: k1, id: c2 });

console.log('--- 5/6: nach Abmelden / auf anderem Gerät');
await api({ action: 'logout', token: k1 });
r = await api({ action: 'charList', token: k1 });
check('Alte Sitzung nach Abmelden ungültig', r.s === 401, r);
const k1b = (await api({ action: 'childLogin', name: 'Kevin', pin: '1111' })).b.token;
r = await api({ action: 'charList', token: k1b });
check('Neue Anmeldung (anderes Gerät): gleicher aktiver Charakter und alle 3 Charaktere', r.b.active === c2 && r.b.chars.length === 3, r);

console.log('--- 7: keine fremden Charaktere');
const k2 = (await api({ action: 'childLogin', name: 'Milo', pin: '2222' })).b.token;
r = await api({ action: 'charList', token: k2 });
check('Anderer Spieler sieht keine fremden Charaktere', r.b.chars.length === 0, r);
r = await api({ action: 'charSelect', token: k2, id: c1 });
check('Fremden Charakter auswählen abgelehnt', r.s === 404, r);
r = await api({ action: 'charSave', token: k2, id: c1, name: 'Klau', pack: 'fantasy_races', data: look('Elf_Male') });
check('Fremden Charakter ändern abgelehnt', r.s === 404, r);
r = await api({ action: 'charDelete', token: k2, id: c1 });
check('Fremden Charakter löschen abgelehnt', r.s === 404, r);
r = await api({ action: 'charList', token: k1b });
check('Charaktere von Kevin unverändert', r.b.chars.length === 3 && r.b.chars[0].name === 'Waldelf', r);
r = await api({ action: 'charList', token: 'falsch' });
check('Ohne gültige Sitzung kein Zugriff', r.s === 401, r);
r = await api({ action: 'charList', token: par });
check('Eltern-Sitzung kann keine Charaktere lesen', r.s === 403, r);
r = await api({ action: 'charSelect', token: k1b, id: 'kein-uuid' });
check('Ungültige ID abgelehnt', r.s === 400, r);
let direct = true; try { await db.query("set role anon; select * from characters"); direct = true; } catch (e) { direct = false; } await db.query('reset role').catch(() => {});
check('Direktzugriff auf Tabelle characters gesperrt (anon)', direct === false);

console.log('--- Eingaben / Grenzen');
r = await api({ action: 'charSave', token: k1b, name: '', pack: 'fantasy_races', data: look('Elf_Male') });
check('Leerer Name abgelehnt', r.s === 400, r);
r = await api({ action: 'charSave', token: k1b, name: 'X', pack: 'Böses Pack!', data: look('Elf_Male') });
check('Ungültige Pack-ID abgelehnt', r.s === 400, r);
r = await api({ action: 'charSave', token: k1b, name: 'X', pack: 'fantasy_races', data: { x: 'a'.repeat(5000) } });
check('Zu große Daten abgelehnt', r.s === 400, r);

console.log('--- 11: Pack-Update verändert keine gespeicherten Charaktere (Daten bleiben wie gespeichert)');
r = await api({ action: 'charList', token: k1b });
check('Gespeicherte Daten unverändert inkl. packVersion', r.b.chars.find((c) => c.id === c1).data.packVersion === 1);

console.log('--- Löschen');
r = await api({ action: 'charDelete', token: k1b, id: c2 });
r = await api({ action: 'charList', token: k1b });
check('Aktiven Charakter gelöscht: zurück zur Standardfigur, Rest bleibt', r.b.active === null && r.b.chars.length === 2, r);
r = await api({ action: 'save', token: k1b, game: 'milo3d_game', state: { punkte: 43 } });
check('Normales Speichern funktioniert weiter', r.s === 200, r);
r = await api({ action: 'rewardList', token: k1b });
check('Andere Erweiterungen (Belohnungen) funktionieren weiter', r.s === 200, r);

console.log(`\nErgebnis: ${ok} OK, ${bad} Fehler`);
process.exit(bad ? 1 : 0);
