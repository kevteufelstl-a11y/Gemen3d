// Lokaler Testserver: dieselbe SQL-Logik wie live (01–05), in PGlite. POST {action,...}
import { PGlite } from '@electric-sql/pglite';
import { pgcrypto } from '@electric-sql/pglite/contrib/pgcrypto';
import fs from 'fs'; import http from 'http'; import crypto from 'crypto';
const S = '/home/claude/gemen3d/server/';
const db = new PGlite({ extensions: { pgcrypto } });
await db.exec(`create schema extensions; create extension pgcrypto schema extensions;
create role anon; create role authenticated; create role service_role;
create table public.profiles (id uuid primary key default gen_random_uuid(), name text not null unique, figure text, pin_hash text, created_at timestamptz not null default now());
create table public.game_saves (profile_id uuid references public.profiles(id) on delete cascade, game text not null, state jsonb not null default '{}', updated_at timestamptz not null default now(), primary key (profile_id, game));
create table public.learning_progress (profile_id uuid references public.profiles(id) on delete cascade, question_id text not null, correct boolean not null, answered_at timestamptz not null default now(), ever_right boolean not null default false, ever_wrong boolean not null default false, primary key (profile_id, question_id));
create table public.highscores (id bigint generated always as identity primary key, profile_id uuid not null references public.profiles(id) on delete cascade, game text not null, score int not null, created_at timestamptz not null default now());
insert into public.profiles (name) values ('Admin');`);
for (const f of ['01_schema.sql', '02_api.sql', '03_rewards.sql', '04_familien_einladungen.sql']) await db.exec(fs.readFileSync(S + f, 'utf8'));
const KEY = 'MILO-TEST-1234-ABCD';
await db.query(`insert into system_settings (k, v) values ('setup', jsonb_build_object('keyHash', $1::text, 'done', false))`, [crypto.createHash('sha256').update(KEY).digest('hex')]);
const api = async (p) => (await db.query('select public.milo_api($1::jsonb) r', [JSON.stringify(p)])).rows[0].r;
await api({ action: 'adminSetup', key: KEY, password: 'AdminPasswort1' });
const par = (await api({ action: 'parentRegister', login: 'Familie Klein', displayName: 'Klein', password: 'eltern123' })).b.token;
await api({ action: 'childCreate', token: par, name: 'Kevin', pin: '1111', figure: '🦁' });
await api({ action: 'childCreate', token: par, name: 'Milo', pin: '2222', figure: '🐯' });
const k = (await api({ action: 'childLogin', name: 'Kevin', pin: '1111' })).b.token;
await api({ action: 'save', token: k, game: 'milo3d_game', state: { punkte: 42 } });
// erst jetzt das Charakter-Update (wie auf dem echten Server: Bestandsspieler gibt es schon)
if (process.argv[2] !== 'alt') await db.exec(fs.readFileSync(S + '05_charaktere.sql', 'utf8'));
http.createServer((req, res) => {
  let b = ''; req.on('data', (c) => b += c); req.on('end', async () => {
    try {
      if (req.url === '/sql') { const r = await db.query(JSON.parse(b).q); res.writeHead(200); return res.end(JSON.stringify(r.rows)); }
      const r = await api(JSON.parse(b || '{}')); res.writeHead(r.s || 200, { 'content-type': 'application/json' }); res.end(JSON.stringify(r.b));
    } catch (e) { res.writeHead(500); res.end(JSON.stringify({ error: String(e) })); }
  });
}).listen(+process.env.PORT || 8790, () => console.log('bereit'));
