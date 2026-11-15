# Belohnungssystem (Tag/Woche/Monat). Code in belohnung.js, Server in server/03_rewards.sql
rep('  function Ci_old() {', open(D + '/belohnung.js', encoding='utf8').read() + '  function Ci_old() {', 'RW-Einbau')
# Menü: Knopf "Meine Belohnungen"
rep('K("button", { class: "qbtn", onclick: KO_kid }, "\\u{1F3C5} Meine Erfolge"),', 'K("button", { class: "qbtn go", onclick: () => RW_open() }, "\\u{1F381} Meine Belohnungen", RW_badge()), K("button", { class: "qbtn", onclick: KO_kid }, "\\u{1F3C5} Meine Erfolge"),', 'RW-Knopf')
# Elternbereich
rep('      sec("\\u{1F381} Belohnungen und Aktionen",', '      sec("\\u{1F381} Belohnungen (gezogen von den Kindern)", RW_parent(c)),\n      sec("\\u{1F381} Belohnungen und Aktionen",', 'RW-Eltern')
# alte Zufalls-Belohnung entfällt: der Spieler sucht selbst aus
rep('i.reward = e[Math.floor(Math.random() * e.length)]', 'i.reward = "Belohnung ziehen (Meine Belohnungen)"', 'RW-alt1')
rep('day.reward = day.reward || (Ne.rewards.length ? Ne.rewards : xf)[0]', 'day.reward = day.reward || "Belohnung ziehen (Meine Belohnungen)"', 'RW-alt2')
