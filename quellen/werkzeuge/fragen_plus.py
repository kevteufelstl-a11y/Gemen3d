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


STOP = set('der die das ein eine einen einem einer und oder ist sind was wie wo wer wann warum welche welcher welches man du dich dir mit von zu im in am an auf für bei aus nach vor nicht kein keine sich es sie er wir ihr den dem des als auch so oft nur noch sehr'.split())


def worte(t):
    return {w for w in re.findall(r'[a-zäöüß]{4,}', t.lower()) if w not in STOP}


def ausgleich(base, kl):
    """Neue Fragen: Ist die richtige Antwort deutlich die laengste, wird die kuerzeste falsche Antwort durch eine
    aehnlich lange Antwort aus einer ANDEREN Frage desselben Fachs ersetzt (die zu dieser Frage nicht passt).
    So kann man die richtige Antwort nicht einfach an ihrer Laenge erkennen. Psychologie und Mathe bleiben unberuehrt."""
    for f in base['faecher']:
        if f['name'] in ('Mathe', 'Psychologie', 'Englisch'): continue
        pool = [(q['antwort'], worte(q['frage'] + ' ' + q['antwort']), k['id']) for k in f['kategorien'] for q in k['fragen']]
        for k in f['kategorien']:
            for q in k['fragen']:
                if not q.get('_neu'): continue
                ok = q['optionen'][q['richtig']]
                falsch = [o for i, o in enumerate(q['optionen']) if i != q['richtig']]
                if len(ok) <= max(len(o) for o in falsch) * 1.15 or len(ok.split()) < 3 or len(ok) < 18: continue
                qw = worte(q['frage'] + ' ' + ok)
                r = random.Random(q['id'])
                erstes = ok.split()[0].lower()
                kand = [(a, kid) for a, w, kid in pool if a not in q['optionen'] and 0.75 * len(ok) <= len(a) <= 1.3 * len(ok)
                        and a[:1].isupper() == ok[:1].isupper() and not (w & qw) and a.endswith('.') == ok.endswith('.')]
                if not kand: continue
                # bevorzugt: gleiches erstes Wort (z. B. „ein …“), gleicher Bereich, aehnliche Laenge
                kand.sort(key=lambda t: (t[0].split()[0].lower() != erstes, t[1] != k['id'], abs(len(t[0]) - len(ok)), t[0]))
                beste = [a for a, _ in kand[:4]]
                if kand[0][0].split()[0].lower() != erstes and len(erstes) <= 5 and erstes in ('ein', 'eine', 'der', 'die', 'das', 'sie', 'er', 'es', 'man', 'mit', 'im', 'in', 'zum', 'durch'):
                    continue
                neu = r.choice(beste)
                kurz = min(range(4), key=lambda i: (i == q['richtig'], len(q['optionen'][i])))
                q['optionen'][kurz] = neu
                q['ausgleich'] = True


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
        dis = {}
        for dp in glob.glob(f'{FP}/k{kl}/{fn}.distraktoren'):
            for line in open(dp, encoding='utf-8'):
                if '||' not in line or line.startswith('#'): continue
                a, b = line.split('||', 1)
                ff = [x.strip() for x in b.split(' | ')]
                if len(ff) == 3: dis[a.strip()] = ff
                else: alle_fehler.append(f'{os.path.basename(dp)}: braucht 3 Antworten: {a[:60]}')
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
                treffer = [k2 for k2 in dis if frage.startswith(k2)]
                if treffer:
                    f1, f2, f3 = dis.pop(max(treffer, key=len))
                opts = [ok, f1, f2, f3]
                r = random.Random(int(hashlib.md5(frage.encode()).hexdigest()[:8], 16))
                r.shuffle(opts)
                nr += 1
                ziel['fragen'].append({'id': f'{slug(fn)}-{ziel["id"]}-{nr:03d}', 'frage': frage, 'optionen': opts,
                                       'richtig': opts.index(ok), 'antwort': ok, 'erklaerung': erk, '_neu': True})
                neu += 1
            ziel['anzahl'] = len(ziel['fragen'])
        for k2 in dis: alle_fehler.append(f'k{kl}/{fn}.distraktoren: Frage nicht gefunden: {k2[:60]}')
    ausgleich(base, kl)
    # Reihenfolge: vorhandene Faecher wie bisher, neue Faecher in der ORDER-Reihenfolge dahinter
    alt = [f['name'] for f in json.load(open(f'{FP}/basis/fragen_klasse{kl}.json', encoding='utf-8'))['faecher']]
    base['faecher'] = [faecher[n] for n in alt] + [faecher[n] for n in ORDER[kl] if n in faecher and n not in alt]
    for f in base['faecher']:
        for k in f['kategorien']:
            for q in k['fragen']: q.pop('_neu', None)
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
