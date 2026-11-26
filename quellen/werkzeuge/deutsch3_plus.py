#!/usr/bin/env python3
# Zusaetzliche Deutsch-Fragen Klasse 3 aus Wortlisten (Artikel, Mehrzahl, Wortarten, Zeitformen, Rechtschreibung,
# Silben, Gegenteile, Wortfamilien). Schreibt fragen_plus/k3/Deutsch_gen.txt.
import os, random
D = os.path.dirname(os.path.abspath(__file__)) + '/..'
R = random.Random(326)
out = {}


def add(kat, frage, ok, falsch, erk):
    f = [x for x in dict.fromkeys(falsch) if x != ok][:3]
    assert len(f) == 3, frage
    out.setdefault(kat, []).append(f"{frage} | {ok} | {f[0]} | {f[1]} | {f[2]} | {erk}")


# --- Artikel ---
ART = {'der': 'Apfel Baum Tisch Stuhl Hund Vogel Mond Regen Schnee Löffel Teller Ball Zahn Finger Fuß Kopf Bauch Schrank Garten Wald Berg Fluss Zug Bus Brief Käse Schuh Pullover Hase Igel Fisch Bleistift Computer Kuchen Sommer Winter Monat Morgen'.split(),
       'die': 'Blume Sonne Katze Maus Tür Lampe Gabel Tasse Brille Hose Jacke Schule Straße Wolke Stadt Uhr Nase Hand Banane Birne Zitrone Kerze Brücke Insel Schnecke Spinne Ente Kuh Woche Nacht Milch Butter Pizza Mütze Tasche Treppe Wiese'.split(),
       'das': 'Haus Auto Buch Bett Fenster Kind Pferd Schaf Schwein Brot Ei Glas Messer Fahrrad Boot Flugzeug Heft Bild Lied Spiel Zimmer Dach Tor Licht Wasser Feuer Herz Ohr Bein Auge Gras Blatt Schiff Kissen Handy Eis Nest Zelt'.split()}
alle = [(a, w) for a, ws in ART.items() for w in ws]
R.shuffle(alle)
for a, w in alle[:45]:
    add('wortarten', f"Welcher Begleiter passt zu „{w}“?", a, [x for x in ('der', 'die', 'das') if x != a] + ['ein'],
        f"Es heißt: {a} {w}. Den Begleiter (Artikel) muss man bei jedem Nomen mitlernen.")

# --- Mehrzahl ---
PL = [('der Baum', 'die Bäume'), ('das Haus', 'die Häuser'), ('die Maus', 'die Mäuse'), ('der Apfel', 'die Äpfel'), ('das Kind', 'die Kinder'),
      ('die Blume', 'die Blumen'), ('der Hund', 'die Hunde'), ('das Buch', 'die Bücher'), ('der Vogel', 'die Vögel'), ('die Hand', 'die Hände'),
      ('der Fuß', 'die Füße'), ('das Glas', 'die Gläser'), ('die Stadt', 'die Städte'), ('der Zahn', 'die Zähne'), ('das Auto', 'die Autos'),
      ('der Tisch', 'die Tische'), ('die Nuss', 'die Nüsse'), ('der Ball', 'die Bälle'), ('das Ei', 'die Eier'), ('die Kuh', 'die Kühe'),
      ('der Bruder', 'die Brüder'), ('die Mutter', 'die Mütter'), ('das Rad', 'die Räder'), ('der Wald', 'die Wälder'), ('das Dach', 'die Dächer'),
      ('die Bank', 'die Bänke'), ('der Stuhl', 'die Stühle'), ('das Huhn', 'die Hühner'), ('der Koffer', 'die Koffer'), ('die Gans', 'die Gänse'),
      ('das Pferd', 'die Pferde'), ('der Turm', 'die Türme'), ('die Wand', 'die Wände'), ('der Zug', 'die Züge'), ('das Schloss', 'die Schlösser')]


def falsche_plural(sg, pl):
    w = sg.split()[1]
    return [f"die {w}s", f"die {w}en", f"die {w}e" if not w.endswith('e') else f"die {w}n", f"die {w}er"]


for sg, pl in PL:
    add('wortarten', f"Wie heißt die Mehrzahl von „{sg}“?", pl, falsche_plural(sg, pl),
        f"Einzahl: {sg}. Mehrzahl: {pl}. Viele Wörter bekommen in der Mehrzahl einen Umlaut (ä, ö, ü).")

# --- Wortart bestimmen ---
WA = {'Nomen': 'Katze Freund Schule Spiel Regen Fahrrad Lehrerin Zimmer Garten Geschenk'.split(),
      'Verb': 'laufen schreiben lachen springen essen malen schwimmen lesen singen denken'.split(),
      'Adjektiv': 'schnell groß klein laut leise bunt müde lustig kalt freundlich'.split()}
erk = {'Nomen': 'Nomen sind Namen für Menschen, Tiere, Pflanzen und Dinge. Man schreibt sie groß.',
       'Verb': 'Verben sagen, was jemand tut. Man kann sie beugen: ich laufe, du läufst …',
       'Adjektiv': 'Adjektive sagen, wie etwas ist. Man kann sie steigern: groß, größer, am größten.'}
for wa, ws in WA.items():
    for w in ws:
        add('wortarten', f"Welche Wortart ist „{w}“?", wa, [x for x in WA if x != wa] + ['Artikel'], erk[wa])

# --- Steigerung ---
ST = [('groß', 'größer', 'am größten'), ('klein', 'kleiner', 'am kleinsten'), ('alt', 'älter', 'am ältesten'), ('jung', 'jünger', 'am jüngsten'),
      ('gut', 'besser', 'am besten'), ('viel', 'mehr', 'am meisten'), ('warm', 'wärmer', 'am wärmsten'), ('lang', 'länger', 'am längsten'),
      ('hoch', 'höher', 'am höchsten'), ('schnell', 'schneller', 'am schnellsten'), ('kurz', 'kürzer', 'am kürzesten'), ('gern', 'lieber', 'am liebsten')]
for a, k, s in ST:
    add('wortarten', f"Wie heißt die erste Steigerungsstufe von „{a}“?", k, [a + 'er' if a + 'er' != k else a + 'ner', s, 'mehr ' + a, a],
        f"{a} – {k} – {s}.")

# --- Gegenteile ---
GT = [('hell', 'dunkel'), ('laut', 'leise'), ('nass', 'trocken'), ('voll', 'leer'), ('dick', 'dünn'), ('weich', 'hart'), ('früh', 'spät'),
      ('alt', 'neu'), ('schwer', 'leicht'), ('sauber', 'schmutzig'), ('mutig', 'ängstlich'), ('fleißig', 'faul'), ('süß', 'sauer'), ('oben', 'unten'),
      ('innen', 'außen'), ('warm', 'kalt'), ('reich', 'arm'), ('stark', 'schwach'), ('offen', 'geschlossen'), ('richtig', 'falsch')]
for a, b in GT:
    andere = [x[1] for x in GT if x[1] != b]
    add('wortschatz', f"Was ist das Gegenteil von „{a}“?", b, R.sample(andere, 3), f"{a} ↔ {b}.")

# --- Zeitformen ---
ZF = [('ich laufe', 'ich lief', 'ich bin gelaufen'), ('ich gehe', 'ich ging', 'ich bin gegangen'), ('ich singe', 'ich sang', 'ich habe gesungen'),
      ('ich esse', 'ich aß', 'ich habe gegessen'), ('ich trinke', 'ich trank', 'ich habe getrunken'), ('ich schreibe', 'ich schrieb', 'ich habe geschrieben'),
      ('ich lese', 'ich las', 'ich habe gelesen'), ('ich sehe', 'ich sah', 'ich habe gesehen'), ('ich komme', 'ich kam', 'ich bin gekommen'),
      ('ich fahre', 'ich fuhr', 'ich bin gefahren'), ('ich springe', 'ich sprang', 'ich bin gesprungen'), ('ich schwimme', 'ich schwamm', 'ich bin geschwommen'),
      ('ich finde', 'ich fand', 'ich habe gefunden'), ('ich nehme', 'ich nahm', 'ich habe genommen'), ('ich gebe', 'ich gab', 'ich habe gegeben'),
      ('ich spiele', 'ich spielte', 'ich habe gespielt'), ('ich male', 'ich malte', 'ich habe gemalt'), ('ich lache', 'ich lachte', 'ich habe gelacht'),
      ('ich baue', 'ich baute', 'ich habe gebaut'), ('ich schlafe', 'ich schlief', 'ich habe geschlafen'), ('ich rufe', 'ich rief', 'ich habe gerufen'),
      ('ich fliege', 'ich flog', 'ich bin geflogen'), ('ich helfe', 'ich half', 'ich habe geholfen'), ('ich denke', 'ich dachte', 'ich habe gedacht'),
      ('ich bringe', 'ich brachte', 'ich habe gebracht'), ('ich weiß', 'ich wusste', 'ich habe gewusst'), ('ich bin', 'ich war', 'ich bin gewesen'),
      ('ich habe', 'ich hatte', 'ich habe gehabt'), ('ich sitze', 'ich saß', 'ich habe gesessen'), ('ich stehe', 'ich stand', 'ich habe gestanden')]
for pr, pt, pf in ZF:
    st = pr.split()[1]
    falsch = 'ich ' + (st[:-1] if st.endswith('e') else st) + 'te'
    if falsch == pt: falsch = pf.replace('ich habe', 'ich hatte').replace('ich bin', 'ich war')
    add('zeitformen', f"Wie heißt „{pr}“ in der 1. Vergangenheit (Präteritum)?", pt, [pr, pf, falsch, 'ich werde ' + (st[:-1] if st.endswith('e') else st) + 'en'],
        f"Gegenwart: {pr}. Präteritum: {pt}. Perfekt: {pf}.")
for pr, pt, pf in ZF[:20]:
    add('zeitformen', f"Wie heißt „{pr}“ im Perfekt?", pf, [pt, pr, pf.replace('habe', 'bin') if 'habe' in pf else pf.replace('bin', 'habe')],
        f"Das Perfekt bildet man mit „haben“ oder „sein“: {pf}. Bewegungen wie gehen und fahren brauchen meistens „sein“.")
FUT = ['spielen', 'lernen', 'malen', 'tanzen', 'kochen', 'reisen', 'schwimmen', 'lesen']
for v in FUT:
    add('zeitformen', f"Welcher Satz mit „{v}“ steht in der Zukunft (Futur)?", f"Ich werde morgen {v}.", [f"Ich {v[:-2]}e heute.", f"Ich habe gestern ge{v[:-2]}t." if v not in ('lesen', 'schwimmen') else f"Ich habe gestern {'gelesen' if v == 'lesen' else 'geschwommen'}.", f"Ich {v[:-2]}te früher."],
        "Die Zukunft bildet man mit „werden“ und der Grundform des Verbs.")

# --- Rechtschreibung ---
RS = [('Fahrrad', ['Farrad', 'Fahrad', 'Fahrrat']), ('Schmetterling', ['Schmeterling', 'Schmetterlink', 'Schmetaling']),
      ('Zucker', ['Zuker', 'Zukker', 'Zucka']), ('Katze', ['Kaze', 'Katse', 'Kazze']), ('Brücke', ['Brüke', 'Brükke', 'Brucke']),
      ('Wiese', ['Wise', 'Wiesse', 'Wieße']), ('Schiff', ['Schif', 'Shiff', 'Schiv']), ('Kuss', ['Kus', 'Kuß', 'Kusss']),
      ('Spiegel', ['Spigel', 'Schpiegel', 'Spiegl']), ('Straße', ['Strasse', 'Strase', 'Schtraße']), ('Vogel', ['Fogel', 'Voggel', 'Vogl']),
      ('Fenster', ['Fennster', 'Venster', 'Fensta']), ('Hexe', ['Hekse', 'Hechse', 'Hecse']), ('Fuchs', ['Fuks', 'Fux', 'Fucks']),
      ('Mädchen', ['Medchen', 'Mätchen', 'Mädschen']), ('Bäcker', ['Becker', 'Bäker', 'Bäckker']), ('Sonne', ['Sone', 'Sohne', 'Sonnne']),
      ('Hund', ['Hunt', 'Hundt', 'Hunnd']), ('Pferd', ['Pfert', 'Ferd', 'Pferdt']), ('Geburtstag', ['Geburtstak', 'Geburztag', 'Geburtsdag']),
      ('Zahn', ['Zan', 'Zaan', 'Tsahn']), ('Uhr', ['Ur', 'Uhrr', 'Uhhr']), ('Ofen', ['Ohfen', 'Offen', 'Oven']), ('Klavier', ['Klawier', 'Klafier', 'Klavir']),
      ('Fußball', ['Fusball', 'Fußbal', 'Fussbal']), ('Tiger', ['Tieger', 'Tigger', 'Tigga']), ('Familie', ['Famillie', 'Familje', 'Fammilie']),
      ('Schokolade', ['Schockolade', 'Schokolate', 'Schokkolade']), ('Kartoffel', ['Kartofel', 'Kartoffl', 'Kardoffel']), ('Bett', ['Bet', 'Bed', 'Bätt'])]
HINT = {'Fahrrad': 'hat zwei Räder und Pedale', 'Schmetterling': 'bunter Falter', 'Zucker': 'macht Tee süß', 'Katze': 'miaut', 'Brücke': 'führt über einen Fluss',
        'Wiese': 'grüne Fläche mit Gras', 'Schiff': 'fährt auf dem Meer', 'Kuss': 'gibt man mit den Lippen', 'Spiegel': 'darin siehst du dich', 'Straße': 'darauf fahren Autos',
        'Vogel': 'hat Federn und fliegt', 'Fenster': 'Glas in der Wand', 'Hexe': 'fliegt im Märchen auf dem Besen', 'Fuchs': 'rotes Waldtier', 'Mädchen': 'kein Junge',
        'Bäcker': 'backt Brötchen', 'Sonne': 'scheint am Himmel', 'Hund': 'bellt', 'Pferd': 'wiehert', 'Geburtstag': 'Tag mit Kuchen und Kerzen', 'Zahn': 'putzt man morgens und abends',
        'Uhr': 'zeigt die Zeit', 'Ofen': 'darin backt man Pizza', 'Klavier': 'Instrument mit Tasten', 'Fußball': 'Sport mit Toren', 'Tiger': 'gestreifte Raubkatze',
        'Familie': 'Eltern und Kinder', 'Schokolade': 'süß und braun', 'Kartoffel': 'Knolle für Pommes', 'Bett': 'darin schläfst du'}
for ok, f in RS:
    add('rechtschreibung', f"Welche Schreibweise ist richtig? ({HINT[ok]})", ok, f,
        f"Richtig ist: {ok}. Tipp: Wort deutlich in Silben sprechen oder verlängern (z. B. Hund – Hunde).")

# --- Silben ---
SB = [('Ba-na-ne', 3), ('Elefant', 3), ('Schule', 2), ('Kro-ko-dil', 3), ('Tisch', 1), ('Schmet-ter-ling', 3), ('Fe-der-mäpp-chen', 4),
      ('Sonne', 2), ('Hund', 1), ('Gi-tar-re', 3), ('Ka-rus-sell', 3), ('Te-le-fon', 3), ('Ap-fel-saft', 3), ('Ra-dier-gum-mi', 4), ('Baum', 1)]
for w, n in SB:
    wort = w.replace('-', '')
    add('rechtschreibung', f"Wie viele Silben hat das Wort „{wort.capitalize() if wort[0].islower() else wort}“?", str(n), [str(n + 1), str(n + 2), str(n - 1 if n > 1 else n + 3)],
        f"Klatsche beim Sprechen mit: jede Silbe ein Klatscher. {n} Silbe{'n' if n > 1 else ''}.")

# --- Wortfamilien ---
WF = [('fahren', 'Fahrer', ['Farbe', 'Fahne', 'Feder']), ('spielen', 'Spielplatz', ['Spiegel', 'Spinne', 'Speise']), ('backen', 'Bäckerei', ['Bach', 'Backe', 'Becken']),
      ('schreiben', 'Schreibtisch', ['Schraube', 'Schrei', 'Scheibe']), ('lesen', 'Lesebuch', ['Leim', 'Leder', 'Leiter']), ('malen', 'Malkasten', ['Mahlzeit', 'Mantel', 'Mehl']),
      ('wohnen', 'Wohnung', ['Wohl', 'Wolle', 'Wonne']), ('schwimmen', 'Schwimmbad', ['Schwamm', 'Schwan', 'Schwanz']), ('lachen', 'lächeln', ['Lack', 'lackieren', 'Lager'])]
for st, ok, f in WF:
    if ok in f: f = [x for x in f if x != ok] + ['Wolke']
    add('wortschatz', f"Welches Wort gehört zur Wortfamilie von „{st}“?", ok, f, f"„{ok}“ hat denselben Wortstamm wie „{st}“.")

names = {'wortarten': 'Wortarten und Wortschatz', 'zeitformen': 'Gestern, heute, morgen (Zeitformen)', 'rechtschreibung': 'Rechtschreibung', 'wortschatz': 'Gegenteile und Wortfamilien'}
lines = ['# Deutsch Klasse 3 – erzeugt von werkzeuge/deutsch3_plus.py']
for k, v in out.items():
    lines.append(f"\n## {k} | {names[k]}")
    lines += v
open(D + '/fragen_plus/k3/Deutsch_gen.txt', 'w', encoding='utf-8').write('\n'.join(lines) + '\n')
print({k: len(v) for k, v in out.items()}, sum(len(v) for v in out.values()))
