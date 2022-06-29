# DCI Chat App
- HTML
- CSS
- JavaScript
---
*The app is published at:* [app](https://salimov333.github.io/dci-chat-app/)

Baut eueren eigenen Chat!

## Aussehen
Wie soll der Chat aussehen?
- Besprecht in der Gruppe, wie der Chat-Raum aussehen soll
- Es muss einen Bereich geben, wo alle Nachrichten zu sehen sind
- Es muss einen Bereich geben, wo der Nutzer seine Nachricht schreiben kann
- Der Nutzer soll am Anfang seinen Namen eingeben
- Setzt euer Konzept mit HTML und CSS um.

## Funktion
Es gibt eine API, die alle unsere Nachrichten speichert.

Die API hat folgende Endpoints:
### GET
`https://dci-chat-api.herokuapp.com/messages` alle Nachrichten
### POST
`https://dci-chat-api.herokuapp.com/new` fügt eine Nachricht hinzu

**Nachricht-Format:** `{from: 'name', message: 'message'}`

- nutze fetch um eine Liste der Nachrichten zu laden und im Chat-Fenster anzuzeigen.
- nutze fetch um eine neue Nachricht an die API zu schicken
- Achte auf die Fehlermeldungen von der API

## Bonus

## DELETE
`https://dci-chat-api.herokuapp.com/id` Nachricht löschen

## Avatar Feature
- Man kann für den Chat nur noch GitHub Benutzernamen benutzen
- Neben jeder Nachricht soll der Avatar des jeweiligen Autors angezeigt werden
**Anleitung:**
- Nutze die GitHub API um infos über alle User im Chat zu bekommen https://api.github.com/users/${username} z.B. https://api.github.com/users/galymax
- In der Antwort der API gibt es eine URL zum Avatar unter avatar_url
- Bis infos zu allen Nutzern aus der API geladen wurden, soll der Chat eine Lade-Animation anzeigen
- Nutze Promise.all um zu kontrollieren, wann die Lade-Animation verschwindet
- Es reicht, dass die Lade-Animation auf die fetch-Anfragen an die GitGub-API wartet, es muss nicht das Laden der Avatar-Bilder geprüft werden (sie sind nicht groß)
- Über die API-Antwort kann man im Chat auch den Namen des Nutzers anzeigen, statt des GitHub-Namens, er ist unter name