# Google Maps Business Info Scraper

Hey! Schön, dass du dich für den Google Maps Business Info Scraper interessierst. Dieses Tool ist dafür gemacht, um wichtige Informationen über Geschäfte aus Google Maps zu extrahieren. Du kannst damit Namen, Adressen, Webseiten, Telefonnummern, Bewertungen und die Anzahl der Bewertungen sammeln. Das ist super praktisch für Recherche, Analyse oder Datensammlung.

## Features

- Holt wichtige Geschäftsinformationen aus Google Maps Einträgen.
- Speichert Infos wie Name, Adresse, Webseite, Telefonnummer, Bewertung und Anzahl der Bewertungen in einer CSV-Datei.
- Ermöglicht dir die Kombination von Suchbegriffen und CSV-Dateien für eine einfache Nutzung.

## Voraussetzungen

Bevor du loslegst, stell sicher, dass du Folgendes auf deinem System eingerichtet hast:

1. **Node.js LTS**: Installiere die LTS-Version von Node.js von [https://nodejs.org/en](https://nodejs.org/en). Node.js ist eine JavaScript-Laufzeitumgebung, die es dir ermöglicht, JavaScript-Code außerhalb eines Browserumfelds auszuführen.

## Installation

1. Klone oder lade das Repository auf deinen lokalen Rechner herunter.
2. Navigiere im Command-Line Interface (CLI) zum Verzeichnis des Scrapers.
3. Führe die `install.bat` Datei aus dem Repository aus. Das installiert alle notwendigen Abhängigkeiten, die der Scraper benötigt.

## Benutzung

Um mit dem Sammeln von Geschäftsinformationen von Google Maps zu beginnen, folge diesen Schritten:

1. Stelle sicher, dass du die Installationsschritte oben abgeschlossen hast.
2. Öffne ein Command-Line Interface (CLI) und navigiere zum Verzeichnis des Scrapers.
3. **Wichtig:** Bevor du den Scraper startest, musst du deine Keywords in eine Datei namens `keywords.txt` schreiben. Diese Datei sollte im Hauptverzeichnis des Scrapers liegen. Jedes Keyword muss auf einer neuen Zeile stehen.
4. Führe die `start.bat` Datei aus, um den Scraper zu starten.

Nachdem der Scraper gestartet wurde, liest er die Keywords aus der `keywords.txt` Datei und beginnt mit der Suche nach diesen Begriffen auf Google Maps. 
Die Ergebnisse der Suche werden dann automatisch extrahiert und in eine CSV-Datei geschrieben. 
Diese CSV-Datei findest du im Verzeichnis des Scrapers. 
Der Dateiname wird generiert, indem ein zufälliger String an den Suchbegriff angehängt wird, um sicherzustellen, dass jede Datei eindeutig ist.

Die CSV-Datei kannst du dann mit jedem Tabellenkalkulationsprogramm wie Microsoft Excel oder Google Sheets öffnen, um die gesammelten Daten zu analysieren und zu verwenden.

Viel Spaß beim Scrapen!
