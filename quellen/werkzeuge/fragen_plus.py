#!/usr/bin/env python3
# Fragen-Erweiterung (26.11.2026): haengt die Fragen aus quellen/fragen_plus/k3/*.txt und k5/*.txt
# HINTEN an die Grunddateien (quellen/fragen_plus/basis/) an und schreibt fragen_klasse3.json / fragen_klasse5.json neu.
# Bestehende Fragen bleiben unveraendert an ihrem Platz (gleiche Reihenfolge = gleiche Fragen-IDs in der App).
#
# Format einer Textdatei (Dateiname = Fach, z. B. "Musik.txt"):
#   ## kategorie-id | Name des Bereichs        <- gleiche id wie ein vorhandener Bereich = Fragen werden dort angehaengt
#   Frage | richtige Antwort | falsch 1 | falsch 2 | falsch 3 | Erklaerung
# Leere Zeilen und Zeilen mit "#" (ein Rautezeichen) am Anfang werden ignoriert.
import json, os, re, sys, hashlib, random

D = os.path.dirname(os.path.abspath(__file__)) + '/..'
FP = D + '/fragen_plus'
ORDER = {3: ['Mathe', 'Deutsch', 'Englisch', 'Sachkunde', 'Psychologie', 'Informatik', 'Musik', 'Kunst'],
         5: ['Mathe', 'Deutsch', 'Englisch', 'Gesellschaftslehre', 'Naturwissenschaften', 'Informatik', 'Musik', 'Kunst', 'Psychologie']}


def slug(t):
    t = t.lower().replace('ä', 'ae').replace('ö', 'oe').replace('ü', 'ue').replace('ß', 'ss')
    return re.sub(r'[^a-z0-9]+', '-', t).strip('-')


def lies(path):
    kats, cur, fehler = [], None, []
    for n, line in enumerate(open(path, encoding='utf-8'), 1):
        line = line.strip()
        if not line or (line.startswith('#') and not line.startswith('##')):
            continue
        if line.startswith('##'):
            kid, _, name = line[2:].partition('|')
            cur = {'id': kid.strip(), 'name': name.strip(), 'fragen': []}
            kats.append(cur)
            continue
        p = [x.strip() for x in line.split(' | ')]
        if len(p) != 6 or not all(p) or cur is None:
            fehler.append(f'{os.path.basename(path)}:{n}: {line[:80]}')
            continue
        if len(set(p[1:5])) < 4:
            fehler.append(f'{os.path.basename(path)}:{n}: doppelte Antwort: {line[:80]}')
            continue
        cur['fragen'].append(p)
    return kats, fehler


def baue(kl):
    base = json.load(open(f'{FP}/basis/fragen_klasse{kl}.json', encoding='utf-8'))
    faecher = {f['name']: f for f in base['faecher']}
    alle_fehler, neu = [], 0
    gesehen = {q['frage'].lower() for f in base['faecher'] for k in f['kategorien'] for q in k['fragen']}
    for fn in ORDER[kl]:
        import glob
        paths = sorted(glob.glob(f'{FP}/k{kl}/{fn}.txt') + glob.glob(f'{FP}/k{kl}/{fn}_*.txt'))
        if not paths:
            continue
        kats, fehler = [], []
        for path in paths:
            k_, f_ = lies(path)
            kats += k_; fehler += f_
        alle_fehler += fehler
        fach = faecher.get(fn)
        if fach is None:
            fach = faecher[fn] = {'name': fn, 'kategorien': []}
            base['faecher'].append(fach)
        for k in kats:
            ziel = next((x for x in fach['kategorien'] if x['id'] == k['id']), None)
            if ziel is None:
                ziel = {'id': k['id'], 'name': k['name'], 'anzahl': 0, 'fragen': []}
                fach['kategorien'].append(ziel)
            nr = len(ziel['fragen'])
            for frage, ok, f1, f2, f3, erk in k['fragen']:
                if frage.lower() in gesehen:
                    alle_fehler.append(f'k{kl}/{fn}: doppelte Frage: {frage[:70]}')
                    continue
                gesehen.add(frage.lower())
                opts = [ok, f1, f2, f3]
                r = random.Random(int(hashlib.md5(frage.encode()).hexdigest()[:8], 16))
                r.shuffle(opts)
                nr += 1
                ziel['fragen'].append({'id': f'{slug(fn)}-{ziel["id"]}-{nr:03d}', 'frage': frage, 'optionen': opts,
                                       'richtig': opts.index(ok), 'antwort': ok, 'erklaerung': erk})
                neu += 1
            ziel['anzahl'] = len(ziel['fragen'])
    # Reihenfolge: vorhandene Faecher wie bisher, neue Faecher in der ORDER-Reihenfolge dahinter
    alt = [f['name'] for f in json.load(open(f'{FP}/basis/fragen_klasse{kl}.json', encoding='utf-8'))['faecher']]
    base['faecher'] = [faecher[n] for n in alt] + [faecher[n] for n in ORDER[kl] if n in faecher and n not in alt]
    base['anzahl'] = sum(len(k['fragen']) for f in base['faecher'] for k in f['kategorien'])
    base['erweitert'] = '2026-11-26'
    json.dump(base, open(f'{D}/../fragen_klasse{kl}.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    return base, neu, alle_fehler


if __name__ == '__main__':
    for kl in (3, 5):
        b, neu, fe = baue(kl)
        print(f'Klasse {kl}: {b["anzahl"]} Fragen ({neu} neu)')
        for f in b['faecher']:
            print(f'   {f["name"]:22s} {sum(len(k["fragen"]) for k in f["kategorien"]):5d}')
        for x in fe[:40]:
            print('   FEHLER', x)
        if len(fe) > 40:
            print('   ... und', len(fe) - 40, 'weitere Fehler')
