# Glashaus auf dem Fernseher – Arbeitsstand

Notizen aus der Cloud-Sitzung vom 28.10.2026. Dieser Branch (`glashaus-notizen`) ist nur Ablage und
wird nie als PR an Gathin23/cleanyourtv geschickt.

## Ziel

Der Startbildschirm des Fernsehers soll aussehen wie das ioBroker-vis-2-Design
[glashaus-vis2](https://github.com/djlex83/glashaus-vis2): Milchglas-Kacheln, Uhr und Datum,
die wichtigsten Werte vom Haus. Den Schriftzug „zuhause“ nicht übernehmen, die Hausskizze muss nicht sein.

| Farbe | Hell | Dunkel |
|---|---|---|
| Grund | `#ebe9e5` | `#111110` |
| Schrift | `#151514` | `#f1efea` |
| Sonne / PV | `#bf7a14` | `#e3a547` |
| Batterie / ok | `#3a8452` | `#6cbf86` |
| Haus | `#2d6bb0` | `#78aee8` |
| Wärme | `#bf4f28` | `#e98a62` |
| Kühl | `#3681bf` | `#79b8e8` |

Schriften: Geist (Text, Uhr) und Instrument Serif kursiv (Datum, Überschriften).

## Branches im Fork

| Branch | PR | Inhalt | Offen |
|---|---|---|---|
| `theme-glashaus` | #1 (Entwurf) | `themes/glashaus/`: `config.json`, `wallpaper.jpg`, `CREDITS.md`, Zeile in `themes/README.md` | Hintergrundbild ohne „zuhause“ neu machen; `screenshot.jpg` vom echten TV (1280×720, < 300 KB, Fokus auf dem Dock) |
| `launcher-mono-logos` | #2 (Entwurf) | neue Option `mono_logos` (aus): jede App als weißes Logo ohne Kachel; `config.xml`, `Config.java`, `AppAdapter.java`, `themes/README.md` | bauen (`cd launcher && ./gradlew --no-daemon testReleaseUnitTest lintRelease assembleRelease`, APK < 589.824 B), am TV testen, `docs/switches/mono_logos.jpg` + Zeile in `docs/switches.md` |
| `glashaus-notizen` | – | diese Notizen, Entwürfe, Werkzeuge | – |

Grenzen des Launchers: Schrift ist immer weiß und nicht wählbar, ein Theme zeigt keine Live-Daten
(kein Netz im Launcher). Fire TV lässt keinen fremden Launcher als Startseite zu.

## Später: ioBroker-Add-on

Eigene App `addons/iobroker` nach dem Vorbild von `addons/smart-home`: liest Werte über die
REST-API von ioBroker und zeigt sie als Modul-Karte bzw. Standby-Seite (PV, Batterie, Haus,
Warmwasser, Außen, Garage, Müll, Waschmaschine). Dafür die Datenpunkte (`0_userdata.0.…`) festlegen.

## Entwürfe

Quelltexte der Design-Entwürfe (Claude-Design-Canvas) in `entwuerfe/`, online:

- Hell: https://claude.ai/artifact/BFwcquXGqssZ4nh8NFk8Gx
- Nacht: https://claude.ai/artifact/6naz1dVN2gE5ssbgJkEwk9
- Standby: https://claude.ai/artifact/NREqTUo5f6AKcdtN5EDf2H
- Optionen (Fokus Glas/Rahmen/Halo, Milchglas-Leiste, Icon-Karten, weiße Logos):
  https://claude.ai/artifact/3j9shSFd2bVJnoY9ybBJzB

Die Werte in den Kacheln sind Beispielwerte, keine Daten aus ioBroker.

## Werkzeuge

`werkzeuge/render_wallpaper.js` rendert die Standby-Seite von glashaus-vis2 (dunkel, ohne Uhr und
Kacheln) mit Playwright als 1920×1080-Bild – so entstand `themes/glashaus/wallpaper.jpg`:

```bash
node glashaus/werkzeuge/render_wallpaper.js out.png 0 700
```

Ordner von glashaus-vis2 mit `GLASHAUS_DIR=/pfad/zu/glashaus-vis2` angeben.
