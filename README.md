# Code Busters Chat

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
