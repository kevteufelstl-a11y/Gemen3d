#!/usr/bin/env python3
# Zusaetzliche Englisch-Fragen Klasse 3 aus Wortlisten. Schreibt fragen_plus/k3/Englisch_gen.txt.
import os, random
D = os.path.dirname(os.path.abspath(__file__)) + '/..'
R = random.Random(333)
out = {}


def add(kat, frage, ok, falsch, erk):
    f = [x for x in dict.fromkeys(falsch) if x != ok][:3]
    assert len(f) == 3, frage
    out.setdefault(kat, []).append(f"{frage} | {ok} | {f[0]} | {f[1]} | {f[2]} | {erk}")


VOC = {
 'Körper': [('Kopf', 'head'), ('Hand', 'hand'), ('Fuß', 'foot'), ('Auge', 'eye'), ('Ohr', 'ear'), ('Nase', 'nose'), ('Mund', 'mouth'), ('Bein', 'leg'), ('Arm', 'arm'), ('Haare', 'hair'), ('Zahn', 'tooth'), ('Bauch', 'tummy')],
 'Kleidung': [('Hose', 'trousers'), ('Jacke', 'jacket'), ('Mütze', 'cap'), ('Schuhe', 'shoes'), ('Kleid', 'dress'), ('Socken', 'socks'), ('Rock', 'skirt'), ('Pullover', 'jumper')],
 'Essen': [('Brot', 'bread'), ('Milch', 'milk'), ('Käse', 'cheese'), ('Ei', 'egg'), ('Apfel', 'apple'), ('Banane', 'banana'), ('Wasser', 'water'), ('Saft', 'juice'), ('Kuchen', 'cake'), ('Nudeln', 'noodles'), ('Erdbeere', 'strawberry'), ('Karotte', 'carrot')],
 'Schule': [('Lineal', 'ruler'), ('Bleistift', 'pencil'), ('Radiergummi', 'rubber'), ('Schultasche', 'school bag'), ('Buch', 'book'), ('Tafel', 'board'), ('Lehrerin', 'teacher'), ('Klebstoff', 'glue'), ('Schere', 'scissors'), ('Stuhl', 'chair')],
 'Zuhause': [('Küche', 'kitchen'), ('Badezimmer', 'bathroom'), ('Schlafzimmer', 'bedroom'), ('Garten', 'garden'), ('Tür', 'door'), ('Fenster', 'window'), ('Bett', 'bed'), ('Tisch', 'table')],
 'Wetter': [('Sonne', 'sun'), ('Regen', 'rain'), ('Schnee', 'snow'), ('Wind', 'wind'), ('Wolke', 'cloud'), ('sonnig', 'sunny'), ('regnerisch', 'rainy'), ('kalt', 'cold'), ('heiß', 'hot')],
 'Tiere': [('Pferd', 'horse'), ('Kuh', 'cow'), ('Schaf', 'sheep'), ('Schwein', 'pig'), ('Ente', 'duck'), ('Frosch', 'frog'), ('Biene', 'bee'), ('Schildkröte', 'turtle'), ('Eule', 'owl'), ('Hase', 'rabbit')],
 'Gefühle': [('glücklich', 'happy'), ('traurig', 'sad'), ('wütend', 'angry'), ('müde', 'tired'), ('ängstlich', 'scared'), ('aufgeregt', 'excited'), ('hungrig', 'hungry'), ('durstig', 'thirsty')],
 'Verkehr': [('Auto', 'car'), ('Bus', 'bus'), ('Zug', 'train'), ('Flugzeug', 'plane'), ('Boot', 'boat'), ('Fahrrad', 'bike'), ('Straße', 'street'), ('Ampel', 'traffic lights')],
 'Berufe': [('Arzt', 'doctor'), ('Polizist', 'police officer'), ('Feuerwehrmann', 'firefighter'), ('Koch', 'cook'), ('Bauer', 'farmer'), ('Krankenpfleger', 'nurse'), ('Pilot', 'pilot'), ('Verkäufer', 'shop assistant')],
 'Natur': [('Baum', 'tree'), ('Blume', 'flower'), ('Fluss', 'river'), ('Berg', 'mountain'), ('Meer', 'sea'), ('Wald', 'forest'), ('Stern', 'star'), ('Mond', 'moon'), ('Gras', 'grass'), ('Strand', 'beach')],
 'Spielzeug': [('Puppe', 'doll'), ('Ball', 'ball'), ('Drachen', 'kite'), ('Teddybär', 'teddy bear'), ('Bauklötze', 'blocks'), ('Brettspiel', 'board game'), ('Roller', 'scooter'), ('Puzzle', 'puzzle')],
 'Freizeit': [('schwimmen', 'swim'), ('tanzen', 'dance'), ('singen', 'sing'), ('lesen', 'read'), ('spielen', 'play'), ('rennen', 'run'), ('springen', 'jump'), ('malen', 'paint'), ('kochen', 'cook'), ('Fahrrad fahren', 'ride a bike')],
}
for th, ws in VOC.items():
    alle = [e for _, e in ws]
    for de, en in ws:
        add('wortschatz', f"Wie heißt „{de}“ auf Englisch?", en, R.sample([x for x in alle if x != en], 3), f"{de} = {en}. Thema: {th}.")
for th in ['Körper', 'Essen', 'Tiere', 'Schule']:
    ws = VOC[th]; alle = [d for d, _ in ws]
    for de, en in ws[:6]:
        add('wortschatz', f"Was bedeutet „{en}“ auf Deutsch?", de, R.sample([x for x in alle if x != de], 3), f"{en} = {de}.")

NUM = {11: 'eleven', 12: 'twelve', 13: 'thirteen', 14: 'fourteen', 15: 'fifteen', 16: 'sixteen', 17: 'seventeen', 18: 'eighteen', 19: 'nineteen', 20: 'twenty',
       30: 'thirty', 40: 'forty', 50: 'fifty', 60: 'sixty', 70: 'seventy', 80: 'eighty', 90: 'ninety', 100: 'one hundred'}
for n in [13, 15, 18, 20, 30, 40, 50, 80, 100]:
    add('wortschatz', f"Wie schreibt man die Zahl {n} auf Englisch?", NUM[n], R.sample([v for k, v in NUM.items() if k != n], 3),
        f"{n} = {NUM[n]}. Achtung: thirteen (13) und thirty (30) klingen ähnlich.")
DAYS = [('Montag', 'Monday'), ('Dienstag', 'Tuesday'), ('Mittwoch', 'Wednesday'), ('Donnerstag', 'Thursday'), ('Freitag', 'Friday'), ('Samstag', 'Saturday'), ('Sonntag', 'Sunday')]
for de, en in DAYS:
    add('wortschatz', f"Wie heißt „{de}“ auf Englisch?", en, R.sample([e for _, e in DAYS if e != en], 3), f"{de} = {en}. Wochentage schreibt man im Englischen groß.")
MON = [('Januar', 'January'), ('Februar', 'February'), ('März', 'March'), ('Mai', 'May'), ('Juni', 'June'), ('Juli', 'July'), ('Oktober', 'October'), ('Dezember', 'December')]
for de, en in MON:
    add('wortschatz', f"Wie heißt der Monat „{de}“ auf Englisch?", en, R.sample([e for _, e in MON if e != en], 3), f"{de} = {en}.")

# Grammatik
PLR = [('cat', 'cats'), ('box', 'boxes'), ('bus', 'buses'), ('baby', 'babies'), ('child', 'children'), ('man', 'men'), ('woman', 'women'),
       ('mouse', 'mice'), ('foot', 'feet'), ('tooth', 'teeth'), ('dog', 'dogs'), ('dish', 'dishes'), ('sheep', 'sheep'), ('fish', 'fish')]
for sg, pl in PLR:
    fl = [sg + 's', sg + 'es', sg + 'en', sg + 'ies', sg]
    add('grammatik', f"Wie heißt die Mehrzahl von „{sg}“?", pl, [x for x in fl if x != pl], f"one {sg} – two {pl}.")
AAN = [('apple', 'an'), ('banana', 'a'), ('egg', 'an'), ('orange', 'an'), ('dog', 'a'), ('elephant', 'an'), ('umbrella', 'an'), ('pencil', 'a'), ('owl', 'an'), ('house', 'a')]
for w, a in AAN:
    add('grammatik', f"Was passt? „__ {w}“", a, ['an' if a == 'a' else 'a', 'the a', 'two'],
        "Vor einem Vokal-Laut (a, e, i, o, u) sagt man „an“, sonst „a“.")
BE = [('I', 'am'), ('You', 'are'), ('He', 'is'), ('She', 'is'), ('It', 'is'), ('We', 'are'), ('They', 'are')]
for p, v in BE:
    add('grammatik', f"Was passt? „{p} __ happy.“", v, [x for x in ['am', 'is', 'are', 'be'] if x != v], f"{p} {v} – Formen von „to be“: I am, you are, he/she/it is, we/they are.")
HG = [('I', 'have got'), ('She', 'has got'), ('He', 'has got'), ('We', 'have got'), ('They', 'have got'), ('It', 'has got')]
for p, v in HG:
    add('grammatik', f"Was passt? „{p} __ a pet.“", v, [x for x in ['have got', 'has got', 'is got', 'am got'] if x != v], "he, she, it: has got – alle anderen: have got.")
CAN = [('Can you swim?', 'Yes, I can.'), ('Is it a cat?', 'Yes, it is.'), ('Are you hungry?', 'Yes, I am.'), ('Have you got a sister?', 'Yes, I have.'), ('Do you like pizza?', 'Yes, I do.')]
alle = [a for _, a in CAN]
for q, a in CAN:
    add('grammatik', f"Welche Kurzantwort passt zu „{q}“?", a, [x for x in alle if x != a], "Die Kurzantwort nimmt das Hilfswort aus der Frage auf.")

lines = ['# Englisch Klasse 3 – erzeugt von werkzeuge/englisch3_plus.py']
names = {'wortschatz': 'Wortschatz: Tiere, Farben, Zahlen, Familie & mehr', 'grammatik': 'Einfache Satzbausteine und Grammatik'}
for k, v in out.items():
    lines.append(f"\n## {k} | {names[k]}")
    lines += v
open(D + '/fragen_plus/k3/Englisch_gen.txt', 'w', encoding='utf-8').write('\n'.join(lines) + '\n')
print({k: len(v) for k, v in out.items()}, sum(len(v) for v in out.values()))
