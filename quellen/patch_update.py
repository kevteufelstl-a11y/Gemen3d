# Update-Knopf: neue Version von Netlify holen, im Speicher ablegen, beim naechsten Start nutzen
rep('        S2.q = Jt;\n        render();\n        panel.style.display = "flex";',
    '        S2.q = Jt;\n        render();\n        try { window.__updRow && window.__updRow(body); } catch (e2) {}\n        panel.style.display = "flex";', 'Update-Zeile im Menue')
import datetime as _dt
BUILD_STAMP = (_dt.datetime.utcnow() + _dt.timedelta(hours=1)).strftime('%Y-%m-%dT%H:%M')
# Neue Version liegt in IndexedDB (groß), ältere Updates evtl. noch in localStorage.
UPD_HEAD = ('<script>window.__BUILD="' + BUILD_STAMP + '";(function(){try{if(window.__upd)return;var b=localStorage.getItem("milo_upd_build");'
            'if(!(b&&b>window.__BUILD))return;var h=localStorage.getItem("milo_upd_html");'
            'if(h){window.__upd=1;document.open();document.write(h);document.close();return;}'
            'if(!window.indexedDB)return;window.__upd=1;document.write(\'<plaintext style="display:none">\');'
            'var fail=function(){try{localStorage.removeItem("milo_upd_build")}catch(e){}location.reload()};'
            'var o=indexedDB.open("milo_upd",1);o.onupgradeneeded=function(){o.result.createObjectStore("f")};o.onerror=fail;'
            'o.onsuccess=function(){try{var g=o.result.transaction("f").objectStore("f").get("html");'
            'g.onsuccess=function(){var t=g.result;if(!t||t.length<500000)return fail();document.open();document.write(t);document.close()};g.onerror=fail}catch(e){fail()}}'
            '}catch(e){}})();</script>\n')
