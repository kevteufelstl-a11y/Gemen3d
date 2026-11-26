# Klassen-Zonen (26.11.2026): Mauern, Tore, Bruecke (klassen.js, eingebunden ueber patch_zones.py),
# Spieler kann per Skript bewegt werden (Bruecke), neue Faecher fuer Klasse 5 und Psychologie (Klasse 3),
# Admin: Stationen je Klasse/Fach, Klassen-Freischaltung je Spieler.
import json

# ---- Spieler: Skript-Steuerung und Hoehe (fuer die Bruecke) ----
rep('    }, x.update = (R, w, T, U) => {\n      let M = 0, S = 0, q = 0;\n',
    '    }, x.update = (R, w, T, U) => {\n      let M = 0, S = 0, q = 0;\n      x.script && x.script(R) && (w = null, x.path = null);\n', 'KL-Spieler-Skript')
rep('n.position.set(x.x, 0, x.z), s.rotation.y = x.yaw;', 'n.position.set(x.x, x.y || 0, x.z), s.rotation.y = x.yaw;', 'KL-Spieler-Hoehe')

# ---- Neue Faecher: werden HINTEN an MILO_Q angehaengt, damit alle bisherigen Fragen-IDs gleich bleiben ----
def _conv(fach, name, k=None):
    out = {'f': name, 'b': [{'n': kat['name'], 'q': [[q['frage'], q['optionen'], q['richtig'], q['erklaerung']] for q in kat['fragen']]} for kat in fach['kategorien']]}
    if k: out['k'] = k
    return out
_k3 = json.load(open(D + '/../fragen_klasse3.json', encoding='utf8'))
_k5 = json.load(open(D + '/../fragen_klasse5.json', encoding='utf8'))
_extra = []
for f in _k3['faecher']:
    if f['name'] == 'Psychologie':
        _extra.append(_conv(f, 'Psychologie'))
for f in _k5['faecher']:
    _extra.append(_conv(f, f['name'] + ' · Klasse 5', 5))
KLASSEN_SCRIPT = ('\n(function(){var Q=window.MILO_Q||(window.MILO_Q=[]),E=' + json.dumps(_extra, ensure_ascii=False, separators=(',', ':')) +
                  ';E.forEach(function(f){Q.some(function(x){return x.f===f.f})||Q.push(f)});})();')

# ---- Admin: neue Station bekommt die Klasse des Ortes und zeigt nur die passenden Faecher ----
rep('subs = new Set([0]), need = KO_in("0", "number"), col = K("input", { type: "color", value: "#ffd34d" })',
    'KLk = window.__klasseAt ? window.__klasseAt(p.x, p.z) || 3 : 3, KLi = fl.map((f, i) => i).filter((i) => (fl[i].k || 3) === KLk), KLn = !KLi.length && (KLi = fl.map((f, i) => i), true), subs = new Set([KLi[0]]), need = KO_in("0", "number"), col = K("input", { type: "color", value: "#ffd34d" })', 'KL-Station-Klasse')
rep('K("p", { class: "ko-small" }, "Aufgaben aus diesen Fächern"), K("div", { class: "ko-chk" }, fl.map((f, i) => {\n      let c = K("input", { type: "checkbox" });',
    'K("p", { class: "ko-small" }, "\\u{1F3EB} Dieser Ort liegt in Klasse " + KLk + (KLn ? " – für diese Klasse gibt es noch keine eigenen Fragen, darum stehen hier alle Fächer." : ".")), K("p", { class: "ko-small" }, "Aufgaben aus diesen Fächern"), K("div", { class: "ko-chk" }, KLi.map((i) => {\n      let f = fl[i], c = K("input", { type: "checkbox" });', 'KL-Station-Faecher')
rep('subj: [...subs].sort(), exam: ex.checked,', 'subj: [...subs].sort((u, v) => u - v), klasse: KLk, exam: ex.checked,', 'KL-Station-speichern')
rep('K("h3", {}, (c.off ? "⛔ " : "\\u{1F4CD} ") + (c.name || s.name))',
    'K("h3", {}, (c.off ? "⛔ " : "\\u{1F4CD} ") + (c.name || s.name) + " \\xB7 Klasse " + (window.__klasseAt ? window.__klasseAt(s.x, s.z) || 3 : 3))', 'KL-Station-Liste')

# Keine Freischaltung von Hand (26.11.): Neue Klassen gibt es nur ueber die Abschlusspruefung am Tor.
# Bis die Pruefungen fertig sind, kommt kein Kind in Klasse 4, 5 oder 6. Nur der Admin darf ueberall hin.

# ---- Klasse 5 (27.11.): Fach-Stationen stehen schon in Neumuehle (Klasse-5-Gebiet). Sichtbar, aber erst nach der
# Abschlusspruefung 4 erreichbar. Der Admin kann sie wie jede eigene Station verschieben, umbenennen oder loeschen.
# Sie werden nur einmal in die Spielinhalte eingefuegt (Merker k5init), danach gilt, was der Admin speichert.
_K5_POS = [[-780.7, -518.0], [-840.7, -512.0], [-798.7, -458.0], [-804.7, -578.0], [-744.7, -566.0], [-726.7, -488.0], [-858.7, -452.0], [-870.7, -566.0], [-900.7, -506.0]]
_K5_ST = [('\U0001F4D0 Mathe', 'Rechnen, Brüche und Geometrie (Klasse 5)', '#4dd0ff'),
          ('\U0001F4D6 Deutsch', 'Grammatik, Rechtschreibung und Texte (Klasse 5)', '#ffd34d'),
          ('\U0001F1EC\U0001F1E7 Englisch', 'Wörter, Grammatik und Alltag (Klasse 5)', '#ff6b6b'),
          ('\U0001F30D Gesellschaftslehre', 'Erdkunde, Geschichte und Politik (Klasse 5)', '#c79a5b'),
          ('\U0001F52C Naturwissenschaften', 'Biologie und Physik (Klasse 5)', '#6dff8a'),
          ('\U0001F4BB Informatik', 'Computer, Internet und Programmieren (Klasse 5)', '#7aa8ff'),
          ('\U0001F3B5 Musik', 'Noten, Instrumente und Musikrichtungen (Klasse 5)', '#ff8ae0'),
          ('\U0001F3A8 Kunst', 'Farben, Künstler und Gestalten (Klasse 5)', '#ffa040'),
          ('\U0001F9E0 Psychologie', 'Gefühle, Familie, Freunde und Internet (Klasse 5)', '#c08bff')]
_ph = open(D + '/part_head.html', encoding='utf8').read()
_ph = _ph[_ph.index('window.MILO_Q=') + 14:]
_nbase = len(json.JSONDecoder().raw_decode(_ph)[0])
_k5names = [f['name'] for f in _k5['faecher']]
_k5first = _nbase + 1  # danach kommt Psychologie Klasse 3, dann die Klasse-5-Faecher
_k5def = []
for _i, (_nm, _ds, _col) in enumerate(_K5_ST):
    _fach = _nm.split(' ', 1)[1]
    _fi = _k5first + _k5names.index(_fach)
    _x, _z = _K5_POS[_i]
    _k5def.append({'id': 501 + _i, 'name': _nm, 'short': _fach[:12], 'desc': _ds, 'x': _x, 'z': _z, 'wx': _x, 'wz': _z,
                   'subj': [_fi], 'exam': False, 'need': 0, 'color': _col, 'klasse': 5})
_K5J = json.dumps(_k5def, ensure_ascii=False, separators=(',', ':'))
rep('Ne = { st: {}, extra: [], qs: [], rewards: [], monthGoal: 20, grades: null, school: "" }',
    'Ne = { st: {}, extra: ' + _K5J + ', k5init: true, qs: [], rewards: [], monthGoal: 20, grades: null, school: "" }', 'K5-Stationen-Start')
rep('    Ne = Object.assign({ st: {}, extra: [], qs: [], rewards: [], monthGoal: 20, grades: null, school: "" }, i || {}), ',
    '    Ne = Object.assign({ st: {}, extra: [], qs: [], rewards: [], monthGoal: 20, grades: null, school: "" }, i || {}), Ne.k5init || (Ne.extra = (Ne.extra || []).concat(' + _K5J + '.filter((d) => !(Ne.extra || []).some((x) => x.id === d.id))), Ne.k5init = true), ', 'K5-Stationen-Config')
