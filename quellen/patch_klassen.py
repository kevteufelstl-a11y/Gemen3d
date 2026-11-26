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
