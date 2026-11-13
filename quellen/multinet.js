// Mehrspieler-Netz (reine Logik, ohne Grafik): Raum, Spielerliste, Host-Wahl, Nachrichten.
// Der Transport (Supabase Realtime) wird von außen übergeben, damit sich alles ohne Internet testen lässt.

const rid = () => Math.random().toString(36).slice(2, 10);
export const makeCode = () => { const A = 'ABCDEFGHJKLMNPQRSTUVWXYZ'; let s = ''; for (let i = 0; i < 4; i++) s += A[(Math.random() * A.length) | 0]; return s; };

export class Net {
  constructor(makeTransport, handlers = {}) {
    this.make = makeTransport; this.h = handlers; this.id = rid();
    this.players = new Map(); this.order = []; this.room = ''; this.name = ''; this.joinedAt = 0; this.connected = false; this.tr = null;
  }
  get inRoom() { return !!this.tr; }
  hostId() { return this.order[0] || this.id; }
  isHost() { return this.hostId() === this.id; }
  slotOf(id) { const i = this.order.indexOf(id); return i < 0 ? 0 : i; }
  others() { return this.order.filter(i => i !== this.id).map(i => this.players.get(i)).filter(Boolean); }

  join(room, name) {
    this.leave();
    this.room = room; this.name = name; this.joinedAt = Date.now();
    this.players.clear(); this.order = [this.id];
    this.players.set(this.id, { id: this.id, name, t: this.joinedAt, self: true });
    this.tr = this.make('gemen-' + room, this.id);
    this.tr.onBroadcast((ev, p) => this._msg(ev, p));
    this.tr.onPresence((list) => this._presence(list));
    this.tr.subscribe((status) => {
      if (status === 'SUBSCRIBED') { this.connected = true; this.tr.track({ id: this.id, name, t: this.joinedAt }); }
      else if (status === 'CLOSED' || status === 'CHANNEL_ERROR' || status === 'TIMED_OUT') this.connected = false;
      this.h.onStatus && this.h.onStatus(status);
    });
    this.h.onPlayers && this.h.onPlayers();
  }
  leave() {
    if (this.tr) { try { this.tr.leave(); } catch (e) { } }
    const had = this.others().map(p => p.id);
    this.tr = null; this.connected = false; this.room = ''; this.players.clear(); this.order = [];
    had.forEach(id => this.h.onLeave && this.h.onLeave(id));
    this.h.onPlayers && this.h.onPlayers();
  }
  _presence(list) {
    const seen = new Map();
    for (const m of list) if (m && m.id) seen.set(m.id, m);
    seen.set(this.id, { id: this.id, name: this.name, t: this.joinedAt });
    const ids = [...seen.values()].sort((a, b) => (a.t - b.t) || (a.id < b.id ? -1 : 1)).map(m => m.id);
    for (const id of [...this.players.keys()]) if (!seen.has(id)) { this.players.delete(id); this.h.onLeave && this.h.onLeave(id); }
    for (const [id, m] of seen) {
      const old = this.players.get(id);
      if (!old) { const p = { id, name: m.name || 'Spieler', t: m.t, self: id === this.id }; this.players.set(id, p); if (id !== this.id) this.h.onJoin && this.h.onJoin(p); }
      else { old.name = m.name || old.name; old.t = m.t; }
    }
    this.order = ids;
    this.h.onPlayers && this.h.onPlayers();
  }
  _msg(ev, p) {
    if (!p) return;
    if (ev === 'pos') { const q = this.players.get(p.id); if (!q || q.self) return; q.x = p.x; q.z = p.z; q.yaw = p.yaw; q.sp = p.sp; q.safe = !!p.sf; q.seen = Date.now(); this.h.onPos && this.h.onPos(q); }
    else if (ev === 'mon') { if (p.h === this.hostId() && !this.isHost()) this.h.onMon && this.h.onMon(p.a); }
    else if (ev === 'hit') { if (p.to === this.id) this.h.onHit && this.h.onHit(p.dmg, p.from); }
    else if (ev === 'dmg') { if (this.isHost()) this.h.onDmg && this.h.onDmg(p); }
    else if (ev === 'cstart') { this.h.onCompStart && this.h.onCompStart(p); }
    else if (ev === 'cjoin') { this.h.onCompJoin && this.h.onCompJoin(p); }
    else if (ev === 'cdone') { this.h.onCompDone && this.h.onCompDone(p); }
  }
  send(ev, payload) { if (this.tr && this.connected) { try { this.tr.send(ev, payload); return true; } catch (e) { } } return false; }
  sendPos(s) { return this.send('pos', { id: this.id, x: +s.x.toFixed(2), z: +s.z.toFixed(2), yaw: +s.yaw.toFixed(2), sp: +s.sp.toFixed(1), sf: s.safe ? 1 : 0 }); }
  sendMon(a) { return this.send('mon', { h: this.id, a }); }
  sendDmg(t, k, d) { return this.send('dmg', { t, k, d, from: this.id }); }
  sendHit(to, dmg) { return this.send('hit', { to, dmg, from: this.id }); }
  sendCompStart(o) { return this.send('cstart', { ...o, from: this.id, fromName: this.name }); }
  sendCompJoin(cid) { return this.send('cjoin', { cid, id: this.id, name: this.name }); }
  sendCompDone(res) { return this.send('cdone', { ...res, id: this.id, name: this.name }); }
}

// ---------- Transport über Supabase Realtime (Broadcast + Presence) ----------
export function supabaseTransport(RealtimeClient, url, key) {
  return (topic, myId) => {
    const client = new RealtimeClient(url.replace(/^http/, 'ws') + '/realtime/v1', { params: { apikey: key, eventsPerSecond: 30 } });
    const ch = client.channel(topic, { config: { broadcast: { self: false, ack: false }, presence: { key: myId } } });
    let bc = () => { }, pr = () => { };
    ch.on('broadcast', { event: '*' }, (m) => bc(m.event, m.payload));
    ch.on('presence', { event: 'sync' }, () => { const st = ch.presenceState(); const list = []; for (const k in st) for (const m of st[k]) list.push(m); pr(list); });
    return {
      onBroadcast: (f) => { bc = f; }, onPresence: (f) => { pr = f; },
      subscribe: (cb) => ch.subscribe(cb), track: (o) => ch.track(o),
      send: (ev, payload) => ch.send({ type: 'broadcast', event: ev, payload }),
      leave: () => { try { ch.untrack(); } catch (e) { } try { client.removeChannel(ch); client.disconnect(); } catch (e) { } },
    };
  };
}
