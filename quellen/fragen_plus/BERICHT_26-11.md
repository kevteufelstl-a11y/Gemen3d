# Fragen-Erweiterung Klasse 3 und Klasse 5 – Bericht (26.11.2026)

## Ergebnis

| Fach | Klasse 3 vorher | Klasse 3 jetzt | Klasse 5 vorher | Klasse 5 jetzt |
|---|---:|---:|---:|---:|
| Mathe | 202 | 418 | 269 | 564 |
| Deutsch | 227 | 508 | 137 | 277 |
| Englisch | 175 | 375 | 101 | 207 |
| Sachkunde | 221 | 444 | – | – |
| Gesellschaftslehre | – | – | 120 | 241 |
| Naturwissenschaften | – | – | 101 | 203 |
| Informatik | 0 | 100 | 24 | 102 |
| Musik | 0 | 100 | 26 | 101 |
| Kunst | 0 | 100 | 21 | 101 |
| Psychologie | 89 | 180 | 89 | 207 |
| **Summe** | **914** | **2.225** | **888** | **2.003** |

Neu hinzugefügt: 1.311 Fragen (Klasse 3) + 1.115 Fragen (Klasse 5) = **2.426 Fragen**.
Das Fach „Sexualkunde bis Klasse 6“ (1.418 Fragen) blieb unverändert.

## Mindestanforderungen

- Jedes Fach mindestens verdoppelt: erfüllt (Klasse 3 und 5).
- Informatik, Musik, Kunst, Psychologie je mindestens 100 pro Klasse: erfüllt.
- Psychologie in beiden Klassen eigenes Fach mit unterschiedlichen neuen Fragen (Klasse 3 einfach, Klasse 5 mit Hintergrundwissen und Rechtslage).
- Themen A–F (Familie/Patchwork inkl. Umgangsrecht, Gefühle, schwierige Menschen/Manipulation ohne „Diagnose“, Schwärmen/Beziehungen, Pubertät/Grenzen/Schutzalter, soziale Medien) sind enthalten. Klasse 3 nur altersgerecht: Privatsphäre, Zustimmung, gute/schlechte Geheimnisse, Hilfe holen.
- Bestehende Fragen, Fragen-IDs, Konten, Lernfortschritt und Belohnungen: unverändert. Geprüft: alle 1.802 alten Prüfungsschlüssel sind identisch geblieben.

## Technik

- Neue Fragen stehen als Textdateien in `quellen/fragen_plus/k3` und `k5` (eine Datei je Fach). Die Grundlage liegt in `quellen/fragen_plus/basis`.
- `werkzeuge/fragen_plus.py` hängt sie hinten an und schreibt `fragen_klasse3.json` und `fragen_klasse5.json`. Doppelte Fragen werden automatisch übersprungen.
- Mathe und Teile von Deutsch und Englisch werden aus Wortlisten erzeugt: `mathe_plus.py`, `deutsch3_plus.py`, `englisch3_plus.py`.
- Antwortlängen sind ausgeglichen: Bei Wissensfragen ersetzt das Werkzeug eine sehr kurze falsche Antwort durch eine ähnlich lange. Für Psychologie gibt es eigene, ähnlich lange falsche Antworten in `Psychologie.distraktoren`. So erkennt man die richtige Antwort nicht mehr einfach daran, dass sie die längste ist.
- Klasse 3 hat 4 neue Stationen: 511 Gefühle & Familie, 512 Computer-Ecke, 513 Musikschule, 514 Malatelier. Klasse 5 hat 9 Stationen (501–509). Der Admin kann alle Stationen verschieben.
- Prüfungsschlüssel: Auf dem Server sind jetzt 4.228 Schlüssel. Sie wurden ohne Löschen per Upsert eingespielt. Die Sicherung liegt in der Tabelle `exam_keys_backup_20261126`.

## Wichtige Folge

Der Lernfortschritt in % sinkt, weil es jetzt mehr Fragen gibt. Die richtig gelösten Fragen bleiben alle erhalten.
Beispiel Milo, Klasse 3: vorher 18,8 %, jetzt 7,7 % (172 richtige Fragen). Für die Zulassung zur Abschlussprüfung braucht man 70 %, also jetzt mehr gelöste Fragen.

## Offene Punkte

- Mehrere Fragen pro Thema ähneln sich im Aufbau (z. B. Vokabeln, Mehrzahl, Rechenaufgaben). Das ist beim Üben so gewollt.
- Die Rechtslage (Stand Nov. 2026) ist bewusst vereinfacht: Schutzalter 14, Strafbarkeit ab 14, Umgang nach § 1684 BGB, Kindeswille ohne festes Alter, Anhörung meist ab 3 Jahren. Bei Gesetzesänderungen die Psychologie-Dateien anpassen.
