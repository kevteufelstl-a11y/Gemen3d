# Qualitaetsstufen entfernt: das Spiel laeuft immer auf "Niedrig" (hoehere Stufen zeigten auf Handy/Tablet nur schwarze Balken und Quadrate)
rep('        { k: "q", l: "Qualit\\xE4t", o: ["Niedrig", "Mittel", "Hoch"] },\n', '', 'Qualitaet-Zeile')
rep('''    te("btn-q").addEventListener("click", () => {
      Jt = (Jt + 2) % 3, _e();
    }), window.__api.setQuality = (k) => {
      Jt = k, _e();
    }, te("btn-full")''', '''    window.__api.setQuality = (k) => {
      Jt = 0, _e();
    }, te("btn-full")''', 'Qualitaet-Knopf')
