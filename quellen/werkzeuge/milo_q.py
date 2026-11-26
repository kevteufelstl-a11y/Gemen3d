# Gemeinsame Logik (App-Bau und Pruefungsschluessel): welche Fragen kommen zusaetzlich zu MILO_Q (part_head.html) in die App?
# Reihenfolge ist wichtig, weil die Fragen-IDs Fach.Bereich.Frage nach Position vergeben werden:
#   1. Klasse-3-Grundfaecher (Mathematik, Deutsch, Englisch, Sachkunde): neue Fragen HINTEN an die Bereiche bzw. neue Bereiche hinten
#   2. Psychologie (Klasse 3), 3. alle Klasse-5-Faecher, 4. neue Klasse-3-Faecher (Informatik, Musik, Kunst)
import json
BASE_NAMES = {'Mathe': 'Mathematik', 'Deutsch': 'Deutsch', 'Englisch': 'Englisch', 'Sachkunde': 'Sachkunde'}


def _conv(fach, name, k=None):
    out = {'f': name, 'b': [{'n': kat['name'], 'q': [[q['frage'], q['optionen'], q['richtig'], q['erklaerung']] for q in kat['fragen']]} for kat in fach['kategorien']]}
    if k: out['k'] = k
    return out


def base_q(D):
    s = open(D + '/part_head.html', encoding='utf8').read()
    s = s[s.index('window.MILO_Q=') + 14:]
    return json.JSONDecoder().raw_decode(s)[0]


def extras(D):
    Q = base_q(D)
    k3 = json.load(open(D + '/../fragen_klasse3.json', encoding='utf8'))
    k5 = json.load(open(D + '/../fragen_klasse5.json', encoding='utf8'))
    adds = []
    for f in k3['faecher']:
        bn = BASE_NAMES.get(f['name'])
        if not bn: continue
        bf = next(x for x in Q if x['f'] == bn)
        add = {'f': bn, 'b': []}
        for kat in f['kategorien']:
            bb = next((b for b in bf['b'] if b['n'] == kat['name']), None)
            qs = [[q['frage'], q['optionen'], q['richtig'], q['erklaerung']] for q in kat['fragen']]
            if bb is not None:
                assert all(a[0] == b[0] for a, b in zip(bb['q'], qs)), 'Reihenfolge der Klasse-3-Fragen passt nicht zu MILO_Q: ' + kat['name']
                qs = qs[len(bb['q']):]
            if qs: add['b'].append({'n': kat['name'], 'q': qs})
        if add['b']: adds.append(add)
    extra = []
    for f in k3['faecher']:
        if f['name'] == 'Psychologie': extra.append(_conv(f, 'Psychologie'))
    for f in k5['faecher']:
        extra.append(_conv(f, f['name'] + ' · Klasse 5', 5))
    for f in k3['faecher']:
        if f['name'] not in BASE_NAMES and f['name'] != 'Psychologie': extra.append(_conv(f, f['name'], 3))
    return adds, extra


def apply(Q, adds, extra):
    """Wie das Skript in der App: Q wird veraendert."""
    for a in adds:
        f = next((x for x in Q if x['f'] == a['f']), None)
        if not f: continue
        for b in a['b']:
            t = next((x for x in f['b'] if x['n'] == b['n']), None)
            if t: t['q'] += b['q']
            else: f['b'].append({'n': b['n'], 'q': list(b['q'])})
    for e in extra:
        if not any(x['f'] == e['f'] for x in Q): Q.append(e)
    return Q


JS = ('(function(){var Q=window.MILO_Q||(window.MILO_Q=[]),A=%s,E=%s;'
      'A.forEach(function(a){var f=Q.filter(function(x){return x.f===a.f})[0];if(!f||f.__plus)return;f.__plus=1;'
      'a.b.forEach(function(b){var t=f.b.filter(function(x){return x.n===b.n})[0];if(t)t.q=t.q.concat(b.q);else f.b.push(b)})});'
      'E.forEach(function(f){Q.some(function(x){return x.f===f.f})||Q.push(f)});})();')


def script(D):
    a, e = extras(D)
    d = lambda v: json.dumps(v, ensure_ascii=False, separators=(',', ':'))
    return '\n' + JS % (d(a), d(e))
