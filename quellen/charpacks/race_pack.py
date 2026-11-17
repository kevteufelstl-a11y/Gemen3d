# Baut das Charakter-Pack "fantasy_races" (eine Datei, wird beim Bau automatisch eingebunden)
import json, base64, io
from PIL import Image
T = '/home/claude/races/Characters - Fantasy Races Kit[Standard]/Textures/'
def jpg(path, size, q=80):
    im = Image.open(path).convert('RGB').resize((size, size), Image.LANCZOS); b = io.BytesIO(); im.save(b, 'JPEG', quality=q)
    return base64.b64encode(b.getvalue()).decode()
def tpath(n): 
    import os
    return T + n if os.path.exists(T + n) else T + 'Variations/' + n
models = {n: json.load(open(f'/home/claude/racebake/{n}.json')) for n in ['Elf_Male', 'Elf_Female', 'Orc_Male', 'Orc_Female']}
tex = {}
for n in models:
    for i in (1, 2, 3): tex[f'{n}_skin{i}'] = jpg(tpath(f'T_{n}_BaseColor_{i}.png'), 512, 78)
for i in (1, 2, 3): tex[f'hair{i}'] = jpg(tpath(f'T_FantasyHair_BaseColor_{i}.png'), 256, 80)
for e in ('Green', 'Brown', 'Orc'): tex['eye_' + e] = jpg(T + f'T_Eye_{e}.png', 128, 85)
C = lambda *rgb: '#%02x%02x%02x' % rgb
pack = {
  'id': 'fantasy_races', 'name': 'Fantasy-Völker', 'version': 1,
  'desc': 'Elfen und Orks mit eigener Hautfarbe, Frisur, Augen und Kleidung.',
  'source': 'Quaternius – Characters: Fantasy Races (CC0)',
  'previewChar': 'waldelf',
  # Gestaltungselemente: nur was es im Pack als Datei gibt bzw. aus dem Körper erzeugt wird
  'elements': {
    'skin':       {'label': 'Hautfarbe', 'icon': '🎨', 'options': [{'id': '1', 'label': 'Farbe 1', 'tex': '{base}_skin1'}, {'id': '2', 'label': 'Farbe 2', 'tex': '{base}_skin2'}, {'id': '3', 'label': 'Farbe 3', 'tex': '{base}_skin3'}]},
    'hair':       {'label': 'Frisur', 'icon': '💇', 'part': 'hair', 'options': [{'id': 'an', 'label': 'Mit Haaren'}, {'id': 'aus', 'label': 'Ohne Haare'}]},
    'hairColor':  {'label': 'Haarfarbe', 'icon': '🖌', 'needs': {'hair': 'an'}, 'options': [{'id': '1', 'label': 'Blond', 'tex': 'hair1'}, {'id': '2', 'label': 'Braun', 'tex': 'hair2'}, {'id': '3', 'label': 'Dunkel', 'tex': 'hair3'}]},
    'horns':      {'label': 'Hörner', 'icon': '🦌', 'part': 'horns', 'options': [{'id': 'aus', 'label': 'Keine'}, {'id': 'an', 'label': 'Hörner'}]},
    'eyes':       {'label': 'Augen', 'icon': '👁', 'options': [{'id': 'gruen', 'label': 'Grün', 'tex': 'eye_Green'}, {'id': 'braun', 'label': 'Braun', 'tex': 'eye_Brown'}, {'id': 'ork', 'label': 'Ork-Augen', 'tex': 'eye_Orc'}]},
    'shirt':      {'label': 'Oberteil', 'icon': '👕', 'part': 'shirt', 'options': [{'id': 'tshirt', 'label': 'T-Shirt'}, {'id': 'lang', 'label': 'Langarm'}, {'id': 'aus', 'label': 'Kein Oberteil'}]},
    'shirtColor': {'label': 'Farbe Oberteil', 'icon': '🎽', 'needs': {'shirt': ['tshirt', 'lang']}, 'options': [{'id': 'gruen', 'label': 'Grün', 'color': C(70, 125, 60)}, {'id': 'blau', 'label': 'Blau', 'color': C(55, 95, 170)}, {'id': 'rot', 'label': 'Rot', 'color': C(170, 50, 50)}, {'id': 'braun', 'label': 'Braun', 'color': C(120, 82, 50)}, {'id': 'weiss', 'label': 'Weiß', 'color': C(220, 215, 205)}, {'id': 'schwarz', 'label': 'Schwarz', 'color': C(40, 40, 45)}, {'id': 'lila', 'label': 'Lila', 'color': C(110, 60, 150)}, {'id': 'gelb', 'label': 'Gelb', 'color': C(215, 175, 50)}]},
    'pants':      {'label': 'Hose', 'icon': '👖', 'part': 'pants', 'options': [{'id': 'lang', 'label': 'Lange Hose'}, {'id': 'kurz', 'label': 'Kurze Hose'}]},
    'pantsColor': {'label': 'Farbe Hose', 'icon': '🧵', 'options': [{'id': 'braun', 'label': 'Braun', 'color': C(95, 65, 40)}, {'id': 'blau', 'label': 'Jeans', 'color': C(50, 70, 115)}, {'id': 'schwarz', 'label': 'Schwarz', 'color': C(35, 35, 40)}, {'id': 'gruen', 'label': 'Grün', 'color': C(60, 85, 50)}, {'id': 'grau', 'label': 'Grau', 'color': C(110, 110, 115)}]}
  },
  # Körper (Grundfiguren) – welche Elemente es für welchen Körper gibt, ergibt sich aus den vorhandenen Teilen
  'bodies': [
    {'id': 'Elf_Male', 'label': 'Elf', 'icon': '🧝‍♂️'}, {'id': 'Elf_Female', 'label': 'Elfe', 'icon': '🧝‍♀️'},
    {'id': 'Orc_Male', 'label': 'Ork', 'icon': '👹'}, {'id': 'Orc_Female', 'label': 'Orkin', 'icon': '👺'}
  ],
  # Fertige Figuren
  'characters': [
    {'id': 'waldelf', 'name': 'Waldelf', 'body': 'Elf_Male', 'parts': {'skin': '1', 'hair': 'an', 'hairColor': '1', 'horns': 'aus', 'eyes': 'gruen', 'shirt': 'tshirt', 'shirtColor': 'gruen', 'pants': 'lang', 'pantsColor': 'braun'}},
    {'id': 'mondelfe', 'name': 'Mondelfe', 'body': 'Elf_Female', 'parts': {'skin': '2', 'hair': 'an', 'hairColor': '3', 'horns': 'aus', 'eyes': 'gruen', 'shirt': 'lang', 'shirtColor': 'lila', 'pants': 'lang', 'pantsColor': 'schwarz'}},
    {'id': 'hornelf', 'name': 'Horn-Elf', 'body': 'Elf_Male', 'parts': {'skin': '3', 'hair': 'an', 'hairColor': '2', 'horns': 'an', 'eyes': 'braun', 'shirt': 'lang', 'shirtColor': 'rot', 'pants': 'lang', 'pantsColor': 'schwarz'}},
    {'id': 'sonnenelfe', 'name': 'Sonnenelfe', 'body': 'Elf_Female', 'parts': {'skin': '1', 'hair': 'an', 'hairColor': '1', 'horns': 'aus', 'eyes': 'braun', 'shirt': 'tshirt', 'shirtColor': 'gelb', 'pants': 'kurz', 'pantsColor': 'blau'}},
    {'id': 'orkkrieger', 'name': 'Ork-Krieger', 'body': 'Orc_Male', 'parts': {'skin': '1', 'hair': 'an', 'hairColor': '3', 'eyes': 'ork', 'shirt': 'aus', 'pants': 'lang', 'pantsColor': 'braun'}},
    {'id': 'orkschmied', 'name': 'Ork-Schmied', 'body': 'Orc_Male', 'parts': {'skin': '2', 'hair': 'an', 'hairColor': '2', 'eyes': 'braun', 'shirt': 'tshirt', 'shirtColor': 'braun', 'pants': 'lang', 'pantsColor': 'grau'}},
    {'id': 'orkin', 'name': 'Orkin', 'body': 'Orc_Female', 'parts': {'skin': '1', 'hair': 'an', 'hairColor': '3', 'eyes': 'ork', 'shirt': 'tshirt', 'shirtColor': 'rot', 'pants': 'lang', 'pantsColor': 'schwarz'}},
    {'id': 'orkjaegerin', 'name': 'Ork-Jägerin', 'body': 'Orc_Female', 'parts': {'skin': '3', 'hair': 'an', 'hairColor': '2', 'eyes': 'gruen', 'shirt': 'lang', 'shirtColor': 'gruen', 'pants': 'kurz', 'pantsColor': 'braun'}}
  ],
  'models': models, 'tex': tex
}
json.dump(pack, open('/home/claude/gemen3d/quellen/charpacks/fantasy_races.json', 'w'), separators=(',', ':'), ensure_ascii=False)
import os; print(os.path.getsize('/home/claude/gemen3d/quellen/charpacks/fantasy_races.json') // 1024, 'KB')
