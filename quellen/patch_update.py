# Update-Knopf: neue Version von Netlify holen, im Speicher ablegen, beim naechsten Start nutzen
rep('        S2.q = Jt;\n        render();\n        panel.style.display = "flex";',
    '        S2.q = Jt;\n        render();\n        try { window.__updRow && window.__updRow(body); } catch (e2) {}\n        panel.style.display = "flex";', 'Update-Zeile im Menue')
import datetime as _dt
BUILD_STAMP = (_dt.datetime.utcnow() + _dt.timedelta(hours=1)).strftime('%Y-%m-%dT%H:%M')
UPD_HEAD = ('<script>window.__BUILD="' + BUILD_STAMP + '";(function(){try{if(window.__upd)return;var h=localStorage.getItem("milo_upd_html"),b=localStorage.getItem("milo_upd_build");'
            'if(h&&b&&b>window.__BUILD){window.__upd=1;document.open();document.write(h);document.close();}}catch(e){}})();</script>\n')
