# Abschlusspruefung (26.11.2026): pruefung.js (eingebunden ueber patch_zones.py), Zeitmessung beim Lernen,
# Belohnungen je Klasse, Elternkontrolle in der Kind-Ansicht.
# Zeitmessung: Lernstation merkt sich, wann die Frage erschien; hf() schickt die Zeit (ms) mit an den Server.
rep('Cr(true), window.__qStart = Li().sec, window.__curFi = n.fi;', 'Cr(true), window.__qStart = Li().sec, window.__curFi = n.fi, window.__qT = performance.now();', 'PR-Zeit-Start')
rep('hf(n.id, h), l.forEach', 'hf(n.id, h, false, performance.now() - (window.__qT || performance.now())), l.forEach', 'PR-Zeit-Antwort')
rep('  function hf(i, t, nd) {', '  function hf(i, t, nd, ms) {', 'PR-hf-Kopf')
rep('t ? (e.r = 1, e.s++) : (e.w = 1, e.c++, e.s = 0), Ti.push({ question_id: i, correct: t });',
    't ? (e.r = 1, e.s++) : (e.w = 1, e.c++, e.s = 0), Ti.push(ms > 300 && ms < 12e4 ? { question_id: i, correct: t, ms: Math.round(ms) } : { question_id: i, correct: t });', 'PR-hf-ms')
# Belohnungen: ab Klasse 4 gelten die (besseren) Listen der erreichten Klasse
rep('  function RW_list(kind) {\n', '  function RW_list(kind) {\n    const LV = typeof PR_level === "function" ? PR_level() : 3, LK = LV >= 4 ? PR_rwList(LV, kind, ye.settings || {}) : null;\n    if (LK && LK.length) return LK;\n', 'PR-Belohnung-Klasse')
rep('  function RW_listFields(s) {\n', '  function RW_listFields(s) {\n    return K("div", {}, RW_listFields0(s), PR_rwFieldsK(s));\n  }\n  function RW_listFields0(s) {\n', 'PR-Belohnung-Eltern')
# Elternkontrolle unter der Kind-Ansicht
rep('  async function KO_kidView(main, c) {\n', '  async function KO_kidView(main, c) {\n    await KO_kidView0(main, c);\n    main.__k === c.id && PR_parent(main, c);\n  }\n  async function KO_kidView0(main, c) {\n', 'PR-Elternkontrolle')
