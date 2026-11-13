// Zusammen spielen: Raum, Mitspieler sehen, gemeinsame Monster, Wettbewerb an den Stationen.
// Läuft über Supabase Realtime (nur Broadcast, es werden keine Daten gespeichert).
import * as THREE from 'three';
import { RealtimeClient } from '@supabase/realtime-js';
import { Net, makeCode, supabaseTransport } from './multinet.js';
import { buildPlayer } from './player.js';
import { buildTrail } from './trail.js';

const SB_URL = 'https://kdhkricbouhnznnduget.supabase.co';
// Öffentlicher Schlüssel (anon): darf nur das, was Supabase für Clients freigibt. Es wird nichts gespeichert.
const SB_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtkaGtyaWNib3VobnpubmR1Z2V0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTM4NzQ5MjEsImV4cCI6MjEwOTQ1MDkyMX0.uCCgIaTGO8is4FagVPgvJcIEoZdpqo4OryS9ktXisbE';

// Farbe je Platz im Raum (Platz 1 = das normale Aussehen)
export const SLOTS = [
  { name: 'Gold', tint: [1, 1, 1], amt: 0, jacket: [0.22, 0.3, 0.2], arrow: 0x66ff66, css: '#ffd24a' },
  { name: 'Blau', tint: [0.3, 0.65, 1.0], amt: 0.85, jacket: [0.15, 0.3, 0.7], arrow: 0x55aaff, css: '#55aaff' },
  { name: 'Rot', tint: [1.0, 0.3, 0.35], amt: 0.85, jacket: [0.65, 0.18, 0.2], arrow: 0xff5566, css: '#ff6677' },
  { name: 'Lila', tint: [0.8, 0.4, 1.0], amt: 0.85, jacket: [0.45, 0.2, 0.6], arrow: 0xcc66ff, css: '#cc77ff' },
];

// Fasst alle Tunnel zusammen: Monster dürfen in keinen Tunnel, egal wem er gehört
export function makeTrailAll(local) {
  const extra = [];
  const all = () => [local, ...extra];
  return {
    extra,
    get pts() { let n = 0; for (const t of all()) n += t.pts.length; return { length: n }; },
    near: (x, z, r) => all().some(t => t.near(x, z, r)),
    safeAt: (x, z) => all().some(t => t.safeAt(x, z)),
    distTo: (x, z) => Math.min(...all().map(t => t.distTo(x, z))),
  };
}

const CSS = `
#mp,#mp-inv{position:fixed;z-index:35;color:var(--ink);font-family:inherit;user-select:text;-webkit-user-select:text}
#mp{inset:0;display:none;align-items:center;justify-content:center;background:rgba(3,8,6,.8);touch-action:auto}
#mp.show{display:flex}
#mp .box{width:min(420px,calc(100vw - 24px));max-height:calc(100vh - 24px);overflow:auto;padding:16px;background:rgba(6,14,12,.97);border:1px solid var(--line);border-radius:14px}
#mp h3{margin:0 0 8px;color:var(--g)} #mp p{margin:6px 0;font-size:14px;line-height:1.45} #mp small{color:var(--mut)}
#mp input{height:44px;border-radius:10px;border:1px solid var(--line);background:rgba(255,255,255,.08);color:#fff;font:600 18px inherit;padding:0 10px;width:100%;touch-action:auto;user-select:text;-webkit-user-select:text;text-transform:uppercase}
#mp input.nm{text-transform:none}
#mp .row{display:flex;gap:8px;margin:10px 0;align-items:center}
#mp .b{flex:1;min-height:46px;border-radius:10px;border:1px solid var(--line);background:rgba(255,255,255,.07);color:var(--ink);font:700 15px inherit;cursor:pointer}
#mp .b.go{background:rgba(89,255,90,.22);border-color:var(--g)} #mp .b:active{background:rgba(89,255,90,.3)}
#mp .code{font:800 40px/1 inherit;letter-spacing:.3em;text-align:center;color:#fff;margin:10px 0}
#mp .pl{display:flex;align-items:center;gap:8px;margin:5px 0;font-size:15px} #mp .dot{width:14px;height:14px;border-radius:50%}
#mp-inv{left:50%;transform:translateX(-50%);top:max(70px,calc(env(safe-area-inset-top) + 64px));width:min(420px,calc(100vw - 24px));padding:12px;display:none;background:rgba(6,14,12,.96);border:1px solid var(--g);border-radius:12px;touch-action:auto}
#mp-inv.show{display:block} #mp-inv .row{display:flex;gap:8px;margin-top:8px}
#mp-inv button{flex:1;min-height:42px;border-radius:10px;border:1px solid var(--line);background:rgba(255,255,255,.07);color:var(--ink);font:700 14px inherit;cursor:pointer}
#mp-inv button.go{background:rgba(89,255,90,.25);border-color:var(--g)}
#toast{position:fixed;left:50%;transform:translateX(-50%);bottom:calc(120px + env(safe-area-inset-bottom));z-index:40;padding:10px 14px;border-radius:10px;background:rgba(6,14,12,.95);border:1px solid var(--line);color:var(--ink);font:600 14px inherit;display:none;pointer-events:none}
`;

function nameSprite(text, css) {
  const c = document.createElement('canvas'); c.width = 256; c.height = 64; const x = c.getContext('2d');
  x.font = '700 34px "Segoe UI",Arial,sans-serif'; x.textAlign = 'center'; x.textBaseline = 'middle';
  x.lineWidth = 6; x.strokeStyle = 'rgba(0,0,0,.85)'; x.strokeText(text, 128, 34); x.fillStyle = css; x.fillText(text, 128, 34);
  const tex = new THREE.CanvasTexture(c);
  const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, depthTest: false, depthWrite: false }));
  sp.renderOrder = 30; sp.userData.tex = tex; return sp;
}

export function createMultiplayer(ctx) {
  const { world, scene, trail, trailAll, player, creatures, game, lern, onHit, $ } = ctx;
  const style = document.createElement('style'); style.textContent = CSS; document.head.appendChild(style);
  const toastEl = document.createElement('div'); toastEl.id = 'toast'; document.body.appendChild(toastEl);
  let toastT = 0;
  const toast = (m) => { toastEl.textContent = m; toastEl.style.display = 'block'; clearTimeout(toastT); toastT = setTimeout(() => { toastEl.style.display = 'none'; }, 3200); };

  const rigs = new Map(); // id -> { p, trail, label, slot, x, z, yaw, tx, tz, tyaw, sp, safe, has }
  const myName = () => { try { return localStorage.getItem('milo_mp_name') || ''; } catch (e) { return ''; } };

  function makeRig(id, name, slot) {
    const S = SLOTS[slot % SLOTS.length];
    const p = buildPlayer(world, scene, { remote: true, jacket: S.jacket, arrowColor: S.arrow });
    const tr = rigs.get(id)?.trail || buildTrail(world, scene, { simple: true });
    tr.setTint(S.tint, S.amt);
    const label = nameSprite(name, S.css); scene.add(label);
    return { p, trail: tr, label, slot, name, x: 0, z: 0, yaw: 0, tx: 0, tz: 0, tyaw: 0, sp: 0, safe: false, has: false };
  }
  function dropRig(id, keepTrail) {
    const r = rigs.get(id); if (!r) return;
    r.p.dispose(); scene.remove(r.label); r.label.userData.tex.dispose(); r.label.material.dispose();
    if (!keepTrail) { world.root.remove(r.trail.root); const i = trailAll.extra.indexOf(r.trail); if (i >= 0) trailAll.extra.splice(i, 1); }
    rigs.delete(id);
  }
  function applySlots() {
    // eigener Tunnel
    const mine = SLOTS[net.slotOf(net.id) % SLOTS.length]; trail.setTint(mine.tint, mine.amt);
    for (const o of net.others()) {
      const slot = net.slotOf(o.id); const r = rigs.get(o.id);
      if (!r) { const nr = makeRig(o.id, o.name, slot); rigs.set(o.id, nr); trailAll.extra.push(nr.trail); continue; }
      if (r.slot !== slot || r.name !== o.name) { const old = r; const nr = (() => { dropRig(o.id, true); return makeRig(o.id, o.name, slot); })(); nr.x = old.x; nr.z = old.z; nr.yaw = old.yaw; nr.tx = old.tx; nr.tz = old.tz; nr.tyaw = old.tyaw; nr.has = old.has; nr.safe = old.safe; rigs.set(o.id, nr); }
    }
    refreshUI();
  }

  const net = new Net(ctx.transport || window.__MP_TRANSPORT || supabaseTransport(RealtimeClient, SB_URL, SB_KEY), {
    onPlayers: () => { applySlots(); },
    onLeave: (id) => { dropRig(id, false); },
    onPos: (q) => { const r = rigs.get(q.id); if (!r) return; r.tx = q.x; r.tz = q.z; r.tyaw = q.yaw; r.sp = q.sp; r.safe = q.safe; if (!r.has) { r.x = q.x; r.z = q.z; r.yaw = q.yaw; r.has = true; } },
    onMon: (a) => creatures.applySnapshot(a),
    onHit: (dmg) => onHit(dmg),
    onStatus: (s) => { statusEl && (statusEl.textContent = s === 'SUBSCRIBED' ? 'Verbunden' : s === 'CHANNEL_ERROR' || s === 'TIMED_OUT' ? 'Keine Verbindung (Internet?)' : s === 'CLOSED' ? 'Getrennt' : 'Verbinde …'); },
    onCompStart: (p) => showInvite(p),
    onCompJoin: (p) => lern.compUpdate({ kind: 'join', cid: p.cid, id: p.id, name: p.name }),
    onCompDone: (p) => lern.compUpdate({ kind: 'done', ...p }),
  });
  creatures.onRemoteHit = (id, dmg) => net.sendHit(id, dmg);

  // ---------- Oberfläche ----------
  const panel = document.createElement('div'); panel.id = 'mp'; panel.innerHTML = '<div class="box"></div>'; document.body.appendChild(panel);
  const box = panel.querySelector('.box');
  const inv = document.createElement('div'); inv.id = 'mp-inv'; document.body.appendChild(inv);
  let statusEl = null, invT = 0;
  const btn = $('btn-mp');
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  function refreshUI() {
    if (btn) btn.textContent = net.inRoom ? '👥 ' + (net.order.length || 1) : '👥';
    if (btn) btn.classList.toggle('on', net.inRoom);
    if (panel.classList.contains('show')) renderPanel();
  }
  function renderPanel() {
    if (!net.inRoom) {
      box.innerHTML = '<h3>👥 Zusammen spielen</h3><p>Ihr lauft zusammen durch Gemen und macht an den Stationen dieselben Aufgaben. Dafür braucht jeder Internet.</p>' +
        '<p><small>Dein Name (nur ein Spitzname, bitte keinen echten Namen):</small></p><input class="nm" id="mp-name" maxlength="12" placeholder="Spitzname" value="' + esc(myName()) + '">' +
        '<div class="row"><button class="b go" id="mp-new">Raum erstellen</button></div>' +
        '<p><small>… oder Code von einem Freund eingeben:</small></p><div class="row"><input id="mp-code" maxlength="4" placeholder="CODE"><button class="b" id="mp-join">Beitreten</button></div>' +
        '<p id="mp-msg" style="color:#ff8a7a"></p><div class="row"><button class="b" id="mp-close">Schließen</button></div>';
      const nm = box.querySelector('#mp-name'), msg = box.querySelector('#mp-msg');
      const go = (code) => { const n = nm.value.trim(); if (!n) { msg.textContent = 'Bitte einen Spitznamen eingeben.'; return; } try { localStorage.setItem('milo_mp_name', n); } catch (e) { } net.join(code, n); renderPanel(); };
      box.querySelector('#mp-new').onclick = () => go(makeCode());
      box.querySelector('#mp-join').onclick = () => { const c = box.querySelector('#mp-code').value.trim().toUpperCase(); if (!/^[A-Z]{4}$/.test(c)) { msg.textContent = 'Der Code hat 4 Buchstaben.'; return; } go(c); };
      box.querySelector('#mp-close').onclick = closePanel;
    } else {
      let pl = ''; for (const id of net.order) { const p = net.players.get(id); if (!p) continue; const S = SLOTS[net.slotOf(id) % SLOTS.length]; pl += '<div class="pl"><span class="dot" style="background:' + S.css + '"></span>' + esc(p.name) + (id === net.id ? ' (du)' : '') + (id === net.hostId() ? ' <small>· Gastgeber</small>' : '') + '</div>'; }
      box.innerHTML = '<h3>👥 Raum</h3><p><small>Diesen Code den Freunden geben:</small></p><div class="code">' + esc(net.room) + '</div><p id="mp-status"><small>Verbinde …</small></p>' + pl +
        '<p><small>Mehr als 4 Spieler gehen nicht. Geht zusammen zu einer Station und tippt dort auf „Wettbewerb".</small></p><div class="row"><button class="b" id="mp-leave">Raum verlassen</button><button class="b go" id="mp-close">Weiter spielen</button></div>';
      statusEl = box.querySelector('#mp-status small');
      statusEl.textContent = net.connected ? 'Verbunden' : 'Verbinde …';
      box.querySelector('#mp-leave').onclick = () => { net.leave(); creatures.puppet = false; creatures.remotes = []; refreshUI(); renderPanel(); };
      box.querySelector('#mp-close').onclick = closePanel;
    }
  }
  function openPanel() { panel.classList.add('show'); game.mp = true; renderPanel(); }
  function closePanel() { panel.classList.remove('show'); game.mp = false; }
  if (btn) btn.addEventListener('click', openPanel);

  function showInvite(p) {
    if (lern.busy()) return;
    const S = world.stations.find(s => s.id === p.station); if (!S) return;
    inv.innerHTML = '<b>🏆 ' + esc(p.fromName || 'Ein Freund') + ' startet einen Wettbewerb</b><br><small>' + esc(S.name) + ' · alle bekommen dieselben Fragen</small><div class="row"><button class="go" id="inv-yes">Mitmachen</button><button id="inv-no">Nein</button></div>';
    inv.classList.add('show'); clearTimeout(invT); invT = setTimeout(() => inv.classList.remove('show'), 40000);
    inv.querySelector('#inv-no').onclick = () => inv.classList.remove('show');
    inv.querySelector('#inv-yes').onclick = () => {
      inv.classList.remove('show'); if (lern.busy()) return;
      net.sendCompJoin(p.cid);
      lern.startRound(S, { comp: { cid: p.cid, seed: p.seed, n: p.n, lvl: p.lvl }, me: { id: net.id, name: net.name }, from: { id: p.from, name: p.fromName } });
    };
  }

  function startCompetition(station) {
    if (!net.inRoom) { toast('Erst einen Raum erstellen: oben auf 👥 tippen.'); return; }
    if (!net.connected) { toast('Noch keine Verbindung. Kurz warten oder Internet prüfen.'); return; }
    if (net.others().length === 0) { toast('Du brauchst mindestens einen Mitspieler im Raum.'); return; }
    if (Math.hypot(player.x - station.x, player.z - station.z) > 45) { toast('Lauft erst zusammen zur Station „' + station.name + '".'); return; }
    const cid = 1 + ((Math.random() * 2e9) | 0), lvl = lern.level();
    net.sendCompStart({ cid, seed: cid, station: station.id, n: 6, lvl });
    lern.startRound(station, { comp: { cid, seed: cid, n: 6, lvl }, me: { id: net.id, name: net.name } });
  }

  // ---------- jedes Bild ----------
  let tPos = 0, tMon = 0;
  function update(dt, t, camDist) {
    if (!net.inRoom) return;
    // Mitspieler weich bewegen
    const remotes = [];
    for (const [id, r] of rigs) {
      if (!r.has) continue;
      const k = Math.min(1, dt * 9);
      r.x += (r.tx - r.x) * k; r.z += (r.tz - r.z) * k;
      let dy = r.tyaw - r.yaw; dy = Math.atan2(Math.sin(dy), Math.cos(dy)); r.yaw += dy * Math.min(1, dt * 10);
      r.p.pose(r.x, r.z, r.yaw, r.sp, dt, camDist);
      r.trail.track(r.x, r.z); r.trail.update(t, dt, 0, 0, camDist);
      const sc = Math.min(Math.max(1, camDist / 28), 10);
      r.label.position.set(r.x, 3.4 + sc * 0.6, r.z); r.label.scale.set(4.2 * sc, 1.05 * sc, 1);
      remotes.push({ id, x: r.x, z: r.z, safe: r.safe });
    }
    creatures.remotes = remotes;
    creatures.puppet = !net.isHost();
    // eigene Daten senden
    tPos -= dt; if (tPos <= 0) { tPos = 1 / 6; net.sendPos({ x: player.x, z: player.z, yaw: player.yaw, sp: player.speed, safe: game.safe }); }
    if (net.isHost()) { tMon -= dt; if (tMon <= 0) { tMon = 1 / 6; net.sendMon(creatures.snapshot()); } }
  }

  return { net, update, openPanel, startCompetition, toast };
}
