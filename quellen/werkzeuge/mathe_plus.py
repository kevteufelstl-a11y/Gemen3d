#!/usr/bin/env python3
# Erzeugt zusaetzliche Mathe-Fragen (Klasse 3 und 5) als Textdateien fuer fragen_plus.py.
# Immer gleicher Zufalls-Startwert: dieselben Fragen bei jedem Lauf.
import json, os, random, math
from fractions import Fraction

D = os.path.dirname(os.path.abspath(__file__)) + '/..'
FP = D + '/fragen_plus'
R = random.Random(20261126)


def fmt(n):
    n = int(n)
    s = f"{abs(n):,}".replace(",", ".")
    return ("−" if n < 0 else "") + s


def rnd(n, p):
    q = 10 ** p
    return int(math.floor(n / q + 0.5)) * q


def dez(x, st=2):
    s = f"{x:.{st}f}".rstrip('0').rstrip('.')
    return s.replace('.', ',')


def euro(c):
    return f"{c // 100},{c % 100:02d} €"


class Pool:
    def __init__(self, base_questions):
        self.seen = set(q.lower() for q in base_questions)
        self.kats = {}

    def add(self, kat, frage, ok, falsch, erk):
        f = []
        for x in falsch:
            x = str(x)
            if x != str(ok) and x not in f:
                f.append(x)
        if len(f) < 3 or frage.lower() in self.seen or '|' in frage + erk:
            return False
        self.seen.add(frage.lower())
        self.kats.setdefault(kat, []).append(f"{frage} | {ok} | {f[0]} | {f[1]} | {f[2]} | {erk}")
        return True


def near(ans, steps=(1, 10, -1, -10, 2, 100, -100)):
    return [ans + s for s in steps if ans + s >= 0]


def basis(kl):
    d = json.load(open(f'{FP}/basis/fragen_klasse{kl}.json', encoding='utf-8'))
    m = next(f for f in d['faecher'] if f['name'] == 'Mathe')
    return {k['id']: k['name'] for k in m['kategorien']}, [q['frage'] for k in m['kategorien'] for q in k['fragen']]


def fill(P, kat, n, gen):
    c, tries = 0, 0
    while c < n and tries < n * 60:
        tries += 1
        r = gen()
        if r and P.add(kat, *r):
            c += 1
    return c


# ------------------------------- Klasse 3 -------------------------------
def k3():
    names, qs = basis(3)
    P = Pool(qs)

    def zr():
        t = R.randint(0, 6)
        if t == 0:
            h, z, e = R.randint(1, 9), R.randint(0, 9), R.randint(0, 9)
            n = h * 100 + z * 10 + e
            return (f"Wie viele Hunderter hat die Zahl {n}?", str(h), [str(z), str(e), str(h + 1), str(n // 10)],
                    f"{n} = {h} Hunderter, {z} Zehner, {e} Einer. Die Hunderterziffer ist {h}.")
        if t == 1:
            n = R.randint(101, 989)
            return (f"Welche Zahl liegt genau in der Mitte zwischen {n - 10} und {n + 10}?", str(n), [str(n - 5), str(n + 5), str(n + 10), str(n - 1)],
                    f"Von {n - 10} sind es 10 Schritte bis {n} und von dort 10 Schritte bis {n + 10}.")
        if t == 2:
            a = R.randint(2, 9) * 100 + R.randint(0, 99)
            b = a + R.choice([1, 10, 100, -1, -10])
            if b == a or b < 0: return None
            z = '>' if a > b else '<'
            return (f"Welches Zeichen passt? {a} __ {b}", z, ['>' if z == '<' else '<', '=', '+'],
                    f"{a} ist {'größer' if a > b else 'kleiner'} als {b}. Die Spitze zeigt immer zur kleineren Zahl.")
        if t == 3:
            s = R.choice([2, 5, 10, 20, 50, 100])
            st = R.randint(0, 20) * s
            seq = [st + i * s for i in range(5)]
            if seq[-1] > 1000: return None
            return (f"Wie geht es weiter? {seq[0]}, {seq[1]}, {seq[2]}, {seq[3]}, …", str(seq[4]), [str(seq[4] + s), str(seq[3]), str(seq[4] - 1 if seq[4] > 0 else seq[4] + 1)],
                    f"Die Zahlen werden immer um {s} größer: {seq[3]} + {s} = {seq[4]}.")
        if t == 4:
            n = R.randint(1, 9) * 100 + R.randint(1, 9) * 10 + R.randint(1, 9)
            r = rnd(n, 1)
            return (f"Runde {n} auf Zehner.", str(r), [str(r + 10), str(r - 10), str(rnd(n, 2)), str(n)],
                    f"Die Einerziffer entscheidet: 0–4 abrunden, 5–9 aufrunden. {n} ≈ {r}.")
        if t == 5:
            d = R.sample(range(1, 10), 3)
            big = int(''.join(map(str, sorted(d, reverse=True))))
            return (f"Welches ist die größte Zahl aus den Ziffern {d[0]}, {d[1]} und {d[2]} (jede Ziffer einmal)?", str(big),
                    [str(int(''.join(map(str, sorted(d))))), str(int(''.join(map(str, d)))), str(int(str(big)[1] + str(big)[0] + str(big)[2]))],
                    "Die größte Ziffer kommt nach vorne zu den Hundertern, die kleinste nach hinten zu den Einern.")
        n = R.randint(2, 98) * 10
        return (f"Wie viele Zehner sind {n} zusammen?", str(n // 10), [str(n), str(n // 100 or 1), str(n // 10 + 1)],
                f"{n} : 10 = {n // 10}. Also {n // 10} Zehner.")

    def pm():
        t = R.randint(0, 5)
        if t == 0:
            a, b = R.randint(120, 600), R.randint(110, 390)
            return (f"Rechne: {a} + {b} = ?", str(a + b), [str(x) for x in near(a + b, (10, -10, 100, 1))],
                    f"Erst die Hunderter, dann die Zehner, dann die Einer addieren: {a} + {b} = {a + b}.")
        if t == 1:
            a, b = R.randint(400, 990), R.randint(110, 390)
            return (f"Rechne: {a} − {b} = ?", str(a - b), [str(x) for x in near(a - b, (10, -10, 100, -1))],
                    f"{a} − {b} = {a - b}. Probe: {a - b} + {b} = {a}.")
        if t == 2:
            a = R.randint(11, 89) * 10
            return (f"Wie viel fehlt von {a} bis 1000?", str(1000 - a), [str(1000 - a + 10), str(1000 - a - 10), str(1000 - a + 100)],
                    f"{a} + {1000 - a} = 1000.")
        if t == 3:
            a, b = R.randint(15, 85), R.randint(15, 85)
            c = a + b
            return (f"Welche Zahl fehlt? {a} + __ = {c}", str(b), [str(b + 1), str(b - 1), str(c), str(b + 10)],
                    f"Rechne {c} − {a} = {b}.")
        if t == 4:
            a = R.randint(2, 9) * 100 + R.randint(1, 9) * 10 + R.randint(1, 9)
            b = R.randint(1, 9) * 10 + R.randint(1, 9)
            return (f"Ergebnis überschlagen: {a} + {b} ist ungefähr …", str(rnd(a + b, 2)), [str(rnd(a + b, 2) + 100), str(rnd(a + b, 2) - 100), str(a)],
                    f"Runde auf Hunderter: {a} + {b} = {a + b}, gerundet etwa {rnd(a + b, 2)}.")
        a, b, c = R.randint(10, 60), R.randint(10, 60), R.randint(5, 30)
        if a + b - c < 0: return None
        return (f"Rechne: {a} + {b} − {c} = ?", str(a + b - c), [str(a + b + c), str(a + b - c + 10), str(a + b - c - 1)],
                f"Von links nach rechts: {a} + {b} = {a + b}, dann {a + b} − {c} = {a + b - c}.")

    def mg():
        t = R.randint(0, 5)
        a, b = R.randint(2, 10), R.randint(2, 10)
        if t == 0:
            return (f"Wie viel ist {a} · {b}?", str(a * b), [str(a * b + a), str(a * b - b), str(a + b)],
                    f"{a} · {b} = {a * b}. Das sind {a} Päckchen mit je {b}.")
        if t == 1:
            return (f"Rechne: {a * b} : {a} = ?", str(b), [str(b + 1), str(b - 1), str(a)],
                    f"Umkehraufgabe: {b} · {a} = {a * b}. Also {a * b} : {a} = {b}.")
        if t == 2:
            r = R.randint(1, a - 1) if a > 2 else 1
            n = a * b + r
            return (f"Rechne mit Rest: {n} : {a} = ?", f"{b} Rest {r}", [f"{b} Rest {r + 1}", f"{b + 1} Rest {r}", f"{b - 1} Rest {r}"],
                    f"{a} · {b} = {a * b}. Bis {n} fehlen noch {r}. Der Rest muss kleiner als {a} sein.")
        if t == 3:
            return (f"{a} Kinder bekommen je {b} Bonbons. Wie viele Bonbons sind das?", str(a * b), [str(a + b), str(a * b + 1), str(a * b - a)],
                    f"{a} mal {b}: {a} · {b} = {a * b}.")
        if t == 4:
            return (f"{a * b} Stifte werden in Becher mit je {b} Stiften verteilt. Wie viele Becher braucht man?", str(a), [str(b), str(a + 1), str(a * b - b)],
                    f"{a * b} : {b} = {a}.")
        k = R.randint(2, 9)
        return (f"Rechne: {k} · {a}0 = ?", str(k * a * 10), [str(k * a), str(k * a * 100), str(k * a * 10 + 10)],
                f"Erst {k} · {a} = {k * a}, dann mal 10: {k * a * 10}.")

    def geo():
        t = R.randint(0, 3)
        if t == 0:
            a, b = R.randint(2, 15), R.randint(2, 15)
            if a == b: return None
            return (f"Ein Rechteck ist {a} cm lang und {b} cm breit. Wie lang ist der Umfang?", f"{2 * (a + b)} cm", [f"{a + b} cm", f"{a * b} cm", f"{2 * (a + b) + 2} cm"],
                    f"Umfang = alle Seiten zusammen: {a} + {b} + {a} + {b} = {2 * (a + b)} cm.")
        if t == 1:
            a = R.randint(2, 25)
            return (f"Ein Quadrat hat die Seitenlänge {a} cm. Wie lang ist der Umfang?", f"{4 * a} cm", [f"{2 * a} cm", f"{a * a} cm", f"{4 * a + 4} cm"],
                    f"Vier gleich lange Seiten: 4 · {a} cm = {4 * a} cm.")
        if t == 2:
            a, b = R.randint(2, 9), R.randint(2, 9)
            return (f"Ein Rechteck aus Kästchen ist {a} Kästchen lang und {b} Kästchen breit. Wie viele Kästchen sind es?", str(a * b), [str(a + b), str(2 * (a + b)), str(a * b + a)],
                    f"{b} Reihen mit je {a} Kästchen: {a} · {b} = {a * b}.")
        u = R.randint(3, 12) * 4
        return (f"Ein Quadrat hat einen Umfang von {u} cm. Wie lang ist eine Seite?", f"{u // 4} cm", [f"{u // 2} cm", f"{u // 4 + 1} cm", f"{u} cm"],
                f"Vier gleiche Seiten: {u} : 4 = {u // 4} cm.")

    def sach():
        t = R.randint(0, 7)
        if t == 0:
            p1, p2 = R.randint(1, 9) * 50, R.randint(1, 9) * 50 + R.choice([0, 25])
            s = p1 + p2
            return (f"Ein Heft kostet {euro(p1)} und ein Stift {euro(p2)}. Wie viel kostet beides zusammen?", euro(s), [euro(s + 100), euro(s - 50), euro(s + 10)],
                    f"{euro(p1)} + {euro(p2)} = {euro(s)}.")
        if t == 1:
            p = R.randint(1, 18) * 25
            if p >= 500: return None
            return (f"Du bezahlst {euro(p)} mit einem 5-Euro-Schein. Wie viel Rückgeld bekommst du?", euro(500 - p), [euro(500 - p + 50), euro(500 - p - 25 if 500 - p > 25 else 500 - p + 100), euro(p)],
                    f"5,00 € − {euro(p)} = {euro(500 - p)}.")
        if t == 2:
            h, m = R.randint(7, 17), R.choice([0, 15, 30, 45])
            d = R.choice([15, 30, 45, 60, 90])
            e = h * 60 + m + d
            return (f"Der Film beginnt um {h}:{m:02d} Uhr und dauert {d} Minuten. Wann ist er zu Ende?", f"{e // 60}:{e % 60:02d} Uhr",
                    [f"{(e + 15) // 60}:{(e + 15) % 60:02d} Uhr", f"{(e - 15) // 60}:{(e - 15) % 60:02d} Uhr", f"{h + 1}:{m:02d} Uhr" if d != 60 else f"{h + 2}:{m:02d} Uhr"],
                    f"{h}:{m:02d} Uhr plus {d} Minuten ergibt {e // 60}:{e % 60:02d} Uhr.")
        if t == 3:
            m = R.randint(2, 9)
            return (f"Wie viele Zentimeter sind {m} m?", f"{m * 100} cm", [f"{m * 10} cm", f"{m * 1000} cm", f"{m * 100 + 10} cm"],
                    f"1 m = 100 cm, also {m} m = {m * 100} cm.")
        if t == 4:
            k = R.randint(2, 9)
            return (f"Wie viele Meter sind {k} km?", f"{k * 1000} m", [f"{k * 100} m", f"{k * 10} m", f"{k * 10000} m"],
                    f"1 km = 1000 m, also {k} km = {k * 1000} m.")
        if t == 5:
            g = R.randint(1, 9) * 100
            k = R.randint(2, 5)
            return (f"Ein Apfelsack wiegt {g} g. Wie viel wiegen {k} solche Säcke?", f"{g * k} g", [f"{g + k} g", f"{g * k + 100} g", f"{g * (k + 1)} g"],
                    f"{k} · {g} g = {g * k} g{' = ' + str(g * k // 1000) + ' kg' if g * k % 1000 == 0 else ''}.")
        if t == 6:
            tg = R.randint(2, 6)
            return (f"Wie viele Tage sind {tg} Wochen?", str(tg * 7), [str(tg * 5), str(tg * 7 + 1), str(tg * 10)],
                    f"Eine Woche hat 7 Tage: {tg} · 7 = {tg * 7}.")
        a, b = R.randint(12, 40), R.randint(5, 20)
        return (f"In der Klasse sind {a} Kinder. {b} davon sind Mädchen. Wie viele Jungen sind es?", str(a - b), [str(a + b), str(a - b + 1), str(b)],
                f"{a} − {b} = {a - b}.")

    def knobel():
        t = R.randint(0, 4)
        if t == 0:
            a = R.randint(2, 20)
            return (f"Ich denke mir eine Zahl. Wenn ich {a} dazuzähle, erhalte ich {a * 3}. Welche Zahl ist es?", str(a * 2), [str(a * 3), str(a), str(a * 4)],
                    f"Rückwärts rechnen: {a * 3} − {a} = {a * 2}.")
        if t == 1:
            a = R.randint(2, 9)
            return (f"Ich denke mir eine Zahl und nehme sie mal 2. Das Ergebnis ist {a * 2 * 5}. Welche Zahl ist es?", str(a * 5), [str(a * 20), str(a * 5 + 2), str(a * 10 - 2)],
                    f"Rückwärts: {a * 10} : 2 = {a * 5}.")
        if t == 2:
            k = R.randint(3, 9)
            return (f"Auf einem Hof sind {k} Hühner. Wie viele Beine haben sie zusammen?", str(2 * k), [str(4 * k), str(k), str(2 * k + 2)],
                    f"Jedes Huhn hat 2 Beine: {k} · 2 = {2 * k}.")
        if t == 3:
            k = R.randint(2, 8)
            return (f"Im Stall stehen {k} Pferde. Wie viele Beine sind das?", str(4 * k), [str(2 * k), str(4 * k + 4), str(k + 4)],
                    f"Jedes Pferd hat 4 Beine: {k} · 4 = {4 * k}.")
        a = R.randint(3, 9)
        return (f"Tom ist {a} Jahre alt. Seine Schwester ist doppelt so alt. Wie alt sind beide zusammen?", str(a * 3), [str(a * 2), str(a * 4), str(a + 2)],
                f"Schwester: {a} · 2 = {a * 2}. Zusammen: {a} + {a * 2} = {a * 3}.")

    for kat, n, g in [('zahlenraum', 42, zr), ('plus-minus', 40, pm), ('mal-geteilt', 42, mg), ('geometrie', 22, geo), ('sachaufgaben', 40, sach), ('knobeln', 30, knobel)]:
        fill(P, kat, n, g)
    names['knobeln'] = 'Knobeln und Rückwärtsrechnen'
    return P, names


# ------------------------------- Klasse 5 -------------------------------
def k5():
    names, qs = basis(5)
    P = Pool(qs)

    def gz():
        t = R.randint(0, 4)
        if t == 0:
            n = R.randint(1, 99) * 10 ** R.randint(5, 7) + R.randint(0, 9) * 10 ** 4
            st = R.choice([(10 ** 5, 'Hunderttausender', 'Hunderttausendern'), (10 ** 6, 'Millionen', 'Millionen')])
            r = int(math.floor(n / st[0] + 0.5)) * st[0]
            return (f"Runde {fmt(n)} auf {st[1]}.", fmt(r), [fmt(r + st[0]), fmt(r - st[0]) if r > st[0] else fmt(r * 10), fmt(n // st[0] * st[0] + st[0] // 10)],
                    f"Entscheidend ist die Stelle rechts neben den {st[2]}: 0–4 abrunden, 5–9 aufrunden. Ergebnis: {fmt(r)}.")
        if t == 1:
            a = R.randint(2, 9) * 10 ** 6 + R.randint(1, 9) * 10 ** 3
            return (f"Wie viele Nullen hat die Zahl {fmt(a)} am Ende?", str(len(str(a)) - len(str(a).rstrip('0'))), ['6', '7', '2', '4'],
                    f"Zähle die Nullen von rechts in {fmt(a)}.")
        if t == 2:
            k = R.randint(2, 9)
            e = R.choice([(10 ** 6, 'Million'), (10 ** 9, 'Milliarde')])
            return (f"Wie viele Tausender sind {k} {e[1]}{'en' if e[1] == 'Million' else 'n'}?", fmt(k * e[0] // 1000), [fmt(k * e[0] // 100), fmt(k * e[0] // 10000), fmt(k * 1000)],
                    f"{k} {e[1]}{'en' if e[1] == 'Million' else 'n'} = {fmt(k * e[0])}. Durch 1.000 geteilt: {fmt(k * e[0] // 1000)}.")
        if t == 3:
            a = R.randint(1, 9) * 10 ** 6
            b = R.randint(1, 9) * 10 ** 5
            return (f"Rechne: {fmt(a)} + {fmt(b)} = ?", fmt(a + b), [fmt(a + b * 10), fmt(a + b // 10), fmt(a * 10 + b)],
                    f"Stellengerecht addieren: {fmt(a)} + {fmt(b)} = {fmt(a + b)}.")
        v = R.randint(1, 3999)
        vals = [(1000, "M"), (900, "CM"), (500, "D"), (400, "CD"), (100, "C"), (90, "XC"), (50, "L"), (40, "XL"), (10, "X"), (9, "IX"), (5, "V"), (4, "IV"), (1, "I")]
        def rom(n):
            s = ''
            for a, r in vals:
                while n >= a: s += r; n -= a
            return s
        return (f"Welche Zahl ist die römische Zahl {rom(v)}?", str(v), [str(v + 10), str(v + 1 if v % 10 != 9 else v - 1), str(v + 100)],
                f"Werte addieren; steht ein kleineres Zeichen vor einem größeren, wird es abgezogen. {rom(v)} = {v}.")

    def rech():
        t = R.randint(0, 5)
        if t == 0:
            a, b, c = R.randint(2, 12), R.randint(2, 12), R.randint(2, 12)
            return (f"Rechne: {a} + {b} · {c} = ?", str(a + b * c), [str((a + b) * c), str(a + b + c), str(a * b + c)],
                    f"Punkt vor Strich: erst {b} · {c} = {b * c}, dann {a} + {b * c} = {a + b * c}.")
        if t == 1:
            a, b, c = R.randint(2, 12), R.randint(2, 12), R.randint(2, 9)
            return (f"Rechne: ({a} + {b}) · {c} = ?", str((a + b) * c), [str(a + b * c), str(a * c + b), str((a + b) * c + c)],
                    f"Klammer zuerst: {a} + {b} = {a + b}, dann · {c} = {(a + b) * c}.")
        if t == 2:
            a, b = R.randint(12, 99), R.randint(12, 99)
            return (f"Rechne schriftlich: {a} · {b} = ?", fmt(a * b), [fmt(a * b + 10), fmt(a * b - a), fmt(a * b + b)],
                    f"{a} · {b} = {a} · {b // 10 * 10} + {a} · {b % 10} = {a * (b // 10 * 10)} + {a * (b % 10)} = {fmt(a * b)}.")
        if t == 3:
            b = R.randint(3, 12); q = R.randint(21, 199)
            return (f"Rechne: {fmt(b * q)} : {b} = ?", str(q), [str(q + 1), str(q - 1), str(q + 10)],
                    f"Probe: {q} · {b} = {fmt(b * q)}.")
        if t == 4:
            a = R.randint(2, 9); b = R.randint(11, 49)
            return (f"Rechne geschickt: {a * 25 if a % 4 == 0 else 25} · {b} · 4 = ?", fmt((a * 25 if a % 4 == 0 else 25) * b * 4), [fmt(b * 100 + 25), fmt(b * 10), fmt(b * 1000)],
                    f"Vertauschungsgesetz: erst {a * 25 if a % 4 == 0 else 25} · 4 = {(a * 25 if a % 4 == 0 else 25) * 4}, dann · {b}.")
        a = R.randint(2, 15)
        e = R.randint(2, 3)
        return (f"Was ist {a}{'²' if e == 2 else '³'}?", str(a ** e), [str(a * e), str(a ** e + a), str(a * 10)],
                f"{a}{'²' if e == 2 else '³'} bedeutet {' · '.join([str(a)] * e)} = {a ** e}.")

    def teil():
        t = R.randint(0, 4)
        if t == 0:
            a, b = R.randint(4, 30), R.randint(4, 30)
            g = math.gcd(a, b) * R.randint(1, 3)
            a, b = a * g // math.gcd(a, b), b * g // math.gcd(a, b)
            gg = math.gcd(a, b)
            return (f"Was ist der größte gemeinsame Teiler (ggT) von {a} und {b}?", str(gg), [str(gg * 2), str(max(1, gg // 2) if gg > 2 else gg + 1), str(min(a, b)) if min(a, b) != gg else str(gg + 3)],
                    f"{gg} teilt {a} und {b}. Eine größere Zahl, die beide teilt, gibt es nicht.")
        if t == 1:
            a, b = R.randint(2, 15), R.randint(2, 15)
            if a == b: return None
            k = a * b // math.gcd(a, b)
            return (f"Was ist das kleinste gemeinsame Vielfache (kgV) von {a} und {b}?", str(k), [str(a * b) if a * b != k else str(k * 2), str(k + a), str(max(a, b))],
                    f"Vielfache von {max(a, b)} prüfen, bis eines auch durch {min(a, b)} teilbar ist: {k}.")
        if t == 2:
            n = R.randint(100, 9999)
            d = R.choice([3, 9])
            qs = sum(map(int, str(n)))
            ok = n % d == 0
            return (f"Ist {fmt(n)} durch {d} teilbar?", 'ja' if ok else 'nein', ['nein' if ok else 'ja', 'nur durch 2', 'das kann man nicht prüfen'],
                    f"Quersumme: {' + '.join(str(n))} = {qs}. {qs} ist {'' if qs % d == 0 else 'nicht '}durch {d} teilbar, also auch {fmt(n)} {'' if ok else 'nicht'}.".replace('  ', ' '))
        if t == 3:
            pr = [p for p in range(2, 100) if all(p % q for q in range(2, int(p ** .5) + 1))]
            p = R.choice(pr[4:])
            nichts = [x for x in range(p - 8, p + 9) if x > 3 and x not in pr]
            f = R.sample(nichts, 3)
            return (f"Welche dieser Zahlen ist eine Primzahl?", str(p), [str(x) for x in f],
                    f"{p} hat nur zwei Teiler: 1 und {p}. Die anderen Zahlen haben weitere Teiler.")
        n = R.choice([12, 18, 20, 24, 28, 30, 36, 40, 42, 45, 48, 50, 54, 56, 60, 63, 72, 75, 80, 84, 90, 96, 100])
        t_ = [d for d in range(1, n + 1) if n % d == 0]
        return (f"Wie viele Teiler hat {n}?", str(len(t_)), [str(len(t_) + 1), str(len(t_) - 1), str(len(t_) + 2)],
                f"Teiler von {n}: {', '.join(map(str, t_))}. Das sind {len(t_)}.")

    def gr():
        t = R.randint(0, 5)
        if t == 0:
            kg = R.randint(1, 9); g = R.randint(1, 9) * 50
            return (f"Wie viel Gramm sind {kg} kg {g} g?", f"{fmt(kg * 1000 + g)} g", [f"{fmt(kg * 100 + g)} g", f"{fmt(kg * 1000 + g * 10)} g", f"{kg}{g} g"],
                    f"1 kg = 1.000 g. {kg} kg = {fmt(kg * 1000)} g, plus {g} g = {fmt(kg * 1000 + g)} g.")
        if t == 1:
            m = R.randint(2, 9) * 10 + R.randint(1, 9)
            return (f"Wie viele Zentimeter sind {dez(m / 100)} m?", f"{m} cm", [f"{m * 10} cm", f"{m / 10:.0f} cm", f"{m + 100} cm"],
                    f"1 m = 100 cm, also {dez(m / 100)} m = {m} cm.")
        if t == 2:
            h1, m1 = R.randint(7, 14), R.choice([5, 10, 20, 35, 40, 50])
            d = R.randint(70, 200)
            e = h1 * 60 + m1 + d
            return (f"Eine Bahnfahrt startet um {h1}:{m1:02d} Uhr und dauert {d} Minuten. Wann kommt der Zug an?", f"{e // 60}:{e % 60:02d} Uhr",
                    [f"{(e + 10) // 60}:{(e + 10) % 60:02d} Uhr", f"{(e - 60) // 60}:{(e - 60) % 60:02d} Uhr", f"{(e + 40) // 60}:{(e + 40) % 60:02d} Uhr"],
                    f"{d} Minuten = {d // 60} h {d % 60} min. {h1}:{m1:02d} Uhr + {d // 60} h {d % 60} min = {e // 60}:{e % 60:02d} Uhr.")
        if t == 3:
            mst = R.choice([(100, '1 : 100'), (1000, '1 : 1.000'), (25000, '1 : 25.000'), (50000, '1 : 50.000'), (100000, '1 : 100.000')])
            cm = R.randint(2, 9)
            real = cm * mst[0]
            if real >= 100000: ans = f"{dez(real / 100000)} km"
            else: ans = f"{dez(real / 100)} m"
            return (f"Maßstab {mst[1]}: Auf der Karte sind es {cm} cm. Wie weit ist es in Wirklichkeit?", ans,
                    [f"{dez(real / 1000)} m", f"{cm * 10} m", f"{dez(real / 10)} m"] if 'km' in ans else [f"{dez(real / 10)} m", f"{dez(real / 1000)} m", f"{cm} m"],
                    f"{cm} cm · {fmt(mst[0])} = {fmt(real)} cm = {ans}.")
        if t == 4:
            p = R.randint(2, 9) * 100 + R.choice([0, 50, 99])
            n = R.randint(3, 8)
            s = p * n
            return (f"Ein Heft kostet {euro(p)}. Wie viel kosten {n} Hefte?", euro(s), [euro(s + p), euro(s - 100), euro(p + n * 100)],
                    f"{n} · {euro(p)} = {euro(s)}.")
        s = R.randint(2, 12)
        return (f"Wie viele Sekunden sind {s} Minuten?", str(s * 60), [str(s * 100), str(s * 60 + 60), str(s * 24)],
                f"1 min = 60 s, also {s} · 60 = {s * 60} s.")

    def geom():
        t = R.randint(0, 4)
        if t == 0:
            a, b = R.randint(3, 25), R.randint(3, 25)
            return (f"Ein Rechteck ist {a} m lang und {b} m breit. Wie groß ist der Flächeninhalt?", f"{a * b} m²", [f"{2 * (a + b)} m²", f"{a + b} m²", f"{a * b + a} m²"],
                    f"Flächeninhalt = Länge · Breite = {a} · {b} = {a * b} m².")
        if t == 1:
            a = R.randint(2, 12)
            return (f"Ein Würfel hat die Kantenlänge {a} cm. Wie groß ist sein Volumen?", f"{a ** 3} cm³", [f"{a * a} cm³", f"{6 * a * a} cm³", f"{12 * a} cm³"],
                    f"Volumen = a · a · a = {a} · {a} · {a} = {a ** 3} cm³.")
        if t == 2:
            a, b, c = R.randint(2, 10), R.randint(2, 10), R.randint(2, 10)
            return (f"Ein Quader ist {a} cm lang, {b} cm breit und {c} cm hoch. Wie groß ist sein Volumen?", f"{a * b * c} cm³", [f"{a * b + c} cm³", f"{2 * (a * b + a * c + b * c)} cm³", f"{a + b + c} cm³"],
                    f"Volumen = Länge · Breite · Höhe = {a} · {b} · {c} = {a * b * c} cm³.")
        if t == 3:
            w = R.randint(10, 170)
            art = 'spitzer' if w < 90 else ('rechter' if w == 90 else 'stumpfer')
            return (f"Was für ein Winkel ist {w}°?", f"ein {art} Winkel", [x for x in ['ein spitzer Winkel', 'ein rechter Winkel', 'ein stumpfer Winkel', 'ein gestreckter Winkel'] if x != f"ein {art} Winkel"],
                    "Spitz: unter 90°. Recht: genau 90°. Stumpf: zwischen 90° und 180°. Gestreckt: 180°.")
        a = R.randint(2, 20)
        return (f"Ein Quadrat hat einen Flächeninhalt von {a * a} cm². Wie lang ist eine Seite?", f"{a} cm", [f"{a * a // 4 if a * a // 4 != a else a + 2} cm", f"{a * 2} cm", f"{a + 1} cm"],
                f"{a} · {a} = {a * a}. Die Seite ist also {a} cm lang.")

    def bru():
        t = R.randint(0, 5)
        if t == 0:
            n = R.choice([2, 3, 4, 5, 6, 8, 10]); z = R.randint(1, n - 1)
            g = n * R.randint(2, 12)
            return (f"Wie viel sind {z}/{n} von {g}?", str(g // n * z), [str(g // n), str(g // z if g % z == 0 else g // n * z + 1), str(g - g // n * z) if g - g // n * z != g // n * z else str(g // n * z + n)],
                    f"Erst durch den Nenner teilen: {g} : {n} = {g // n}. Dann mal den Zähler: {g // n} · {z} = {g // n * z}.")
        if t == 1:
            n = R.randint(3, 12); a, b = R.sample(range(1, n), 2)
            if a + b > n: return None
            return (f"Rechne: {a}/{n} + {b}/{n} = ?", f"{a + b}/{n}", [f"{a + b}/{2 * n}", f"{a * b}/{n}", f"{a + b + 1}/{n}"],
                    "Gleiche Nenner: Zähler addieren, der Nenner bleibt gleich.")
        if t == 2:
            fr = Fraction(R.randint(1, 5), R.choice([2, 3, 4, 5, 6]))
            if fr >= 1 or fr.denominator == 1: return None
            k = R.randint(2, 5)
            return (f"Welcher Bruch ist gleich groß wie {fr.numerator}/{fr.denominator}?", f"{fr.numerator * k}/{fr.denominator * k}",
                    [f"{fr.numerator + k}/{fr.denominator + k}", f"{fr.numerator * k}/{fr.denominator}", f"{fr.numerator}/{fr.denominator * k}"],
                    f"Erweitern: Zähler und Nenner mit {k} multiplizieren.")
        if t == 3:
            n = R.choice([2, 4, 5, 10, 20, 25])
            z = R.randint(1, n - 1)
            p = Fraction(z, n) * 100
            if p.denominator != 1: return None
            return (f"Wie viel Prozent sind {z}/{n}?", f"{int(p)} %", [f"{z * 10} %" if z * 10 != p else f"{int(p) + 5} %", f"{n} %", f"{int(p) + 10} %"],
                    f"{z}/{n} = {int(p)}/100 = {int(p)} %.")
        if t == 4:
            a = Fraction(R.randint(1, 7), 8); b = Fraction(R.randint(1, 5), 6)
            if a == b: return None
            gr = a if a > b else b
            return (f"Welcher Bruch ist größer: {a.numerator}/{a.denominator} oder {b.numerator}/{b.denominator}?", f"{gr.numerator}/{gr.denominator}",
                    [f"{(b if gr == a else a).numerator}/{(b if gr == a else a).denominator}", "beide sind gleich", "das kann man nicht vergleichen"],
                    f"Gleichnamig machen (Nenner 24): {a.numerator * 3}/24 und {b.numerator * 4}/24.")
        z = R.randint(2, 30); n = z * R.choice([2, 3, 4, 5])
        g = math.gcd(z, n); kz, kn = z // g, n // g
        return (f"Kürze so weit wie möglich: {z}/{n}", f"{kz}/{kn}", [f"{z // 2 if z % 2 == 0 else z}/{n // 2 if n % 2 == 0 else n}" if (z // 2, n // 2) != (kz, kn) else f"{kz + 1}/{kn}", f"{kn}/{kz}", f"{kz}/{kn + 1}"],
                f"Zähler und Nenner durch {g} teilen: {kz}/{kn}.")

    def daten():
        t = R.randint(0, 3)
        if t == 0:
            xs = [R.randint(1, 20) for _ in range(R.choice([3, 4, 5]))]
            s = sum(xs)
            if s % len(xs): xs[-1] += len(xs) - s % len(xs)
            s = sum(xs); m = s // len(xs)
            return (f"Berechne den Mittelwert (Durchschnitt) von {', '.join(map(str, xs))}.", str(m), [str(s), str(m + 1), str(max(xs))],
                    f"Alle addieren: {s}. Durch die Anzahl ({len(xs)}) teilen: {m}.")
        if t == 1:
            xs = sorted(R.sample(range(1, 50), 5))
            return (f"Wie groß ist die Spannweite von {', '.join(map(str, R.sample(xs, 5)))}?", str(xs[-1] - xs[0]), [str(xs[-1]), str(xs[2]), str(xs[-1] + xs[0])],
                    f"Spannweite = größter Wert − kleinster Wert = {xs[-1]} − {xs[0]} = {xs[-1] - xs[0]}.")
        if t == 2:
            xs = R.sample(range(1, 40), 5)
            s = sorted(xs)
            return (f"Welcher Wert ist der Zentralwert (Median) von {', '.join(map(str, xs))}?", str(s[2]), [str(xs[2]) if xs[2] != s[2] else str(s[1]), str(s[0]), str(s[4])],
                    f"Der Größe nach ordnen: {', '.join(map(str, s))}. Der mittlere Wert ist {s[2]}.")
        n = R.randint(3, 9) * 5 + 2
        return (f"Bei einer Strichliste stehen 5er-Bündel. Wie viele Bündel und Einzelstriche zeigen {n}?", f"{n // 5} Bündel und {n % 5} Striche",
                [f"{n // 5 + 1} Bündel und {n % 5} Striche", f"{n % 5} Bündel und {n // 5} Striche", f"{n // 10} Bündel und {n % 10} Striche"],
                f"{n} = {n // 5} · 5 + {n % 5}.")

    for kat, n, g in [('grosse-zahlen', 40, gz), ('rechnen', 50, rech), ('teilbarkeit', 45, teil), ('groessen', 45, gr), ('geometrie', 40, geom), ('brueche', 45, bru), ('daten', 30, daten)]:
        fill(P, kat, n, g)
    names['daten'] = 'Daten, Mittelwert und Diagramme'
    return P, names


def schreibe(kl, P, names):
    out = ['# Zusaetzliche Mathe-Fragen, erzeugt von quellen/werkzeuge/mathe_plus.py']
    for kat, lines in P.kats.items():
        out.append(f'\n## {kat} | {names[kat]}')
        out += lines
    open(f'{FP}/k{kl}/Mathe.txt', 'w', encoding='utf-8').write('\n'.join(out) + '\n')
    print(f'Klasse {kl} Mathe:', {k: len(v) for k, v in P.kats.items()}, sum(len(v) for v in P.kats.values()))


if __name__ == '__main__':
    schreibe(3, *k3())
    schreibe(5, *k5())
