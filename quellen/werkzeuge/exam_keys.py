#!/usr/bin/env python3
# Erzeugt server/12b_exam_keys.sql: Loesungsschluessel fuer die Abschlusspruefung aus den Fragen der App.
# Fragen-IDs wie in der App: Fach-Index.Bereich-Index.Fragen-Index (MILO_Q in part_head.html + angehaengte Faecher).
# Lerngebiete: Klasse 3 = Mathematik, Deutsch, Englisch, Sachkunde, Psychologie (nicht "Sexualkunde bis Klasse 6",
# die gilt fuer mehrere Klassen). Faecher mit Kennzeichen "k" gehoeren zu dieser Klasse.
# Nach jeder Aenderung an den Fragen neu erzeugen und in Supabase einspielen.
import json, os, hashlib
D = os.path.dirname(os.path.abspath(__file__)) + '/..'
import sys
sys.path.insert(0, D + '/werkzeuge')
import milo_q
Q = milo_q.apply(milo_q.base_q(D), *milo_q.extras(D))
K3 = {'Mathematik', 'Deutsch', 'Englisch', 'Sachkunde', 'Psychologie'}  # plus Faecher mit k = 3
rows = []
for fi, f in enumerate(Q):
    kl = f.get('k') or (3 if f['f'] in K3 else None)
    if not kl: continue
    for bi, b in enumerate(f['b']):
        for qi, q in enumerate(b['q']):
            rows.append((f'{fi}.{bi}.{qi}', kl, fi, f['f'].replace(' · Klasse 5', ''), int(q[2])))
ver = hashlib.sha1(json.dumps(rows).encode()).hexdigest()[:10]
esc = lambda t: t.replace("'", "''")
# kompakt: pro Fach-Bereich eine Ziffernfolge der richtigen Antworten (alle Antworten sind 0-9)
grp = {}
for r in rows:
    fi, bi, qi = r[0].split('.')
    grp.setdefault((int(fi), int(bi), r[1], r[3]), []).append(str(r[4]))
assert all(len(v) for v in grp.values())
vals = ',\n'.join(f"({k[0]},{k[1]},{k[2]},'{esc(k[3])}','{''.join(v)}')" for k, v in sorted(grp.items()))
out = ['-- Erzeugt von quellen/werkzeuge/exam_keys.py (Version ' + ver + '), ' + str(len(rows)) + ' Fragen',
       'begin;', 'delete from public.exam_keys;',
       'insert into public.exam_keys (qid, klasse, subj, subj_name, answer, version)\n'
       "select v.fi || '.' || v.bi || '.' || (g - 1), v.kl, v.fi, v.nm, substr(v.ans, g, 1)::int, '" + ver + "'\n"
       'from (values\n' + vals + '\n) v(fi, bi, kl, nm, ans), generate_series(1, length(v.ans)) g;',
       'commit;']
open(D + '/../server/12b_exam_keys.sql', 'w', encoding='utf8').write('\n'.join(out) + '\n')
from collections import Counter
print(len(rows), 'Fragen, Version', ver)
