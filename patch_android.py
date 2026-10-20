# Passt das von Capacitor erzeugte Android-Projekt an: Querformat, Vollbild, Hardware-Beschleunigung.
import re, sys, os
root = sys.argv[1] if len(sys.argv) > 1 else 'android'
man = os.path.join(root, 'app/src/main/AndroidManifest.xml')
s = open(man, encoding='utf-8').read()
if 'screenOrientation' not in s:
    s = s.replace('<activity', '<activity\n            android:screenOrientation="sensorLandscape"\n            android:hardwareAccelerated="true"', 1)
open(man, 'w', encoding='utf-8').write(s)
sty = os.path.join(root, 'app/src/main/res/values/styles.xml')
t = open(sty, encoding='utf-8').read()
if 'windowFullscreen' not in t:
    t = t.replace('<style name="AppTheme.NoActionBarLaunch"', '<style name="AppTheme.NoActionBarLaunch"', 1)
    t = re.sub(r'(<style name="AppTheme.NoActionBar"[^>]*>)', r'\1\n        <item name="android:windowFullscreen">true</item>\n        <item name="android:windowLayoutInDisplayCutoutMode">shortEdges</item>', t, count=1)
open(sty, 'w', encoding='utf-8').write(t)
print('Android-Projekt angepasst (Querformat, Vollbild)')
