# Rick and Morty Explorer

Een interactieve single-page webapplicatie waarmee je personages uit het Rick and Morty-universum kunt verkennen. De applicatie haalt data op via de publieke [Rick and Morty API] ( https://rickandmortyapi.com/ ), waarvoor geen API-sleutel nodig is. Je kunt personages zoeken, filteren, sorteren en markeren als favorieten. Alle interactie werkt zonder backend en gebruikt enkel **localStorage** voor het bewaren van voorkeuren.


## I. Projectbeschrijving en functionaliteiten

- Haalt 60 personages op via 3 pagina’s van de Rick and Morty API
- Toont elk personage als een visuele kaart met naam, afbeelding, status, soort, geslacht en afkomst
- Gebruikt `async/await` voor dataophaling met foutafhandeling (`main.js` lijnen 7–18)
- Dynamische DOM-manipulatie voor het tonen van kaarten (`zoekbalk.js` lijnen 5–28)
- Gekleurde status-badges op basis van de status (`Alive`, `Dead`, `unknown`)
- Mogelijkheid om een personage als favoriet te markeren met een klikbare ster (`zoekbalk.js` lijnen 12–26)
- Favorietenlijst zichtbaar via een knop rechtsboven in de header (`index.html` + `main.js` lijnen 83–104)
- Favorieten worden bewaard in **localStorage** en blijven zichtbaar na herladen
- Zoekbalk met live filter die kaarten onmiddellijk aanpast (`zoekbalk.js` lijnen 47–72)
- Filters op status en geslacht (`zoekbalk.js` lijnen 53–63)
- Sorteren op naam, status, soort of afkomst (`zoekbalk.js` lijnen 32–45)
- Gebouwd met **Vite** en gestructureerd in mappen zoals `src/` en `public/`

## II. Gebruikte API:

- [Rick and Morty API]( https://rickandmortyapi.com/ )


## III. Technische vereisten + lijnnummers

### DOM-manipulatie

**A. Elementen selecteren**  
Selectie via `getElementById` of `querySelector`, o.a. voor zoekveld, filters, knoppen:  
📄 `main.js` lijnen 4–6  
📄 `zoekbalk.js` lijnen 3, 47

**B. Elementen manipuleren**  
Kaarten en lijsten worden gegenereerd met `innerHTML`, `appendChild`:  
📄 `zoekbalk.js` lijnen 20–28, 91  
📄 `main.js` lijnen 98–102

**C. Events koppelen**  
`addEventListener` gebruikt voor:
- `DOMContentLoaded` → lijn 2
- Zoekbalk → `zoekbalk.js` lijn 70
- Thema-toggle → `main.js` lijn 119
- Suggestieformulier → `main.js` lijn 153

---

### Modern JavaScript

**A. Gebruik van `const` en `let`**  
📄 Doorheen alle bestanden consistent gebruikt (bijv. `main.js` lijnen 4, 7, 15)

**B. Template literals**  
Gebruikt voor dynamische HTML opbouw:  
📄 `zoekbalk.js` lijnen 20–28, 91

**C. Iteratie over arrays**  
📄 `zoekbalk.js` lijn 10: `.forEach()` over alle personages

**D. Array methodes**  
Gebruik van `.filter()`, `.includes()`, `.sort()`:  
📄 `zoekbalk.js` lijnen 47–57

**E. Arrow functions**  
📄 `zoekbalk.js` lijn 53, 61  
📄 `main.js` lijn 83

**F. Ternary operator**  
Voor ster:  
📄 `zoekbalk.js` lijn 26: `isFavoriet ? '★' : '☆'`  
Voor badgeClass: lijn 22

**G. Callback functions**  
In `forEach`, `addEventListener`, en zoekfunctie:  
📄 `zoekbalk.js` lijnen 61, 70

**H. Promises**  
Gebruik van `.then()` in oudere versie, maar vervangen door:  
**I. Async & Await**  
📄 `main.js` lijnen 7–18 voor meerdere `fetch()`-aanroepen

---

### Data & API

**A. Fetch om data op te halen**  
📄 `main.js` lijnen 7–18 (3 API-pagina’s worden tegelijk opgehaald)

**B. JSON manipuleren en gebruiken**  
📄 `main.js` lijnen 16–18  
📄 `main.js` lijnen 95–98 (favorieten ophalen)

---

### Opslag & validatie

**A. Formulier validatie**  
📄 `main.js` lijnen 139–145: minimale lengtecontrole op suggesties

**B. Gebruik van LocalStorage**  
📄 `zoekbalk.js` lijnen 4, 33, 46  
📄 `main.js` lijn 148 (suggesties opslaan)

---

### Styling & layout

**A. HTML layout (Flexbox/Grid)**  
📄 `style.css` regel 186 → `#character-container` gebruikt CSS Grid  
📄 `style.css` regel 123 → `.header-controls` gebruikt Flexbox

**B. CSS-styling**  
📄 `style.css` bevat kleurenschema’s, donkermodus (`:root`, `.donker`), hover-effecten, badges

**C. Gebruiksvriendelijke UI**  
- Klikbare sterknoppen (favorieten)  
- Zoekbalk + filters met live feedback  
- Scroll-to-top knop (`#scrollTopBtn`) met animatie




## IV. Tooling & structuur

**A. Vite gebruikt**  
Project opgezet met `npm create vite`, en werkt via `npm run dev`

**B. Correcte folderstructuur**  
Project zit in:  
project_portfolio/
├── index.html              # Startpunt van de app
├── package.json            # Projectconfiguratie
├── package-lock.json       # Exacte versies van dependencies
├── .gitignore              # Git-exclusies
│
├── public/                 # (optioneel, leeg of gebruikt voor statische assets)
│
├── image/                  # Bevat afbeeldingen gebruikt in de UI
│   ├── Rick-and-Morty.png
│   ├── rickandmorty.gif
│   └── rickandmortylogotop.png
│
├── node_modules/           # NPM-modules (na `npm install`)
│
└── src/                    # Alle hoofdcode van het project
    ├── main.js             # Initieert de app en regelt interacties
    ├── zoekbalk.js         # Filter-, sorteer- en zoekfunctionaliteit
    ├── style.css           # Alle stijlen van de applicatie


IV. Installatiehandleiding
Clone eerst de repository via het volgende commando: git clone https://github.com/jouw-gebruikersnaam/rickmorty-explorer.git. Navigeer daarna naar de map met cd rickmorty-explorer. Installeer de nodige dependencies door npm install uit te voeren. Start vervolgens de ontwikkelserver via npm run dev. Zodra de server actief is, kun je de applicatie openen in je browser op http://localhost:5173.

V. Screenshots van de applicatie


