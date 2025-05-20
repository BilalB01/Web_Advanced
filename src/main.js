
import { activeerZoekfunctie } from './zoekbalk.js';

document.addEventListener('DOMContentLoaded', async () => {
    const container = document.getElementById('character-container');
    const zoekInput = document.getElementById('zoekveld');
    const sorteerOptie = document.getElementById('sorteer-optie');

    try {
        const responses = await Promise.all([
            fetch("https://rickandmortyapi.com/api/character?page=1"),
            fetch("https://rickandmortyapi.com/api/character?page=2"),
            fetch("https://rickandmortyapi.com/api/character?page=3")
        ]);

        const data = await Promise.all(responses.map(res => res.json()));
        const allePersonages = [...data[0].results, ...data[1].results, ...data[2].results];


        activeerZoekfunctie(allePersonages, zoekInput, container, sorteerOptie);
    } catch (error) {
        container.innerHTML = `<p>Er is iets fout gegaan: ${error.message}</p>`;
    }
});

// Favorieten tonen bij klikken op de Favorieten knop
document.getElementById("favorieten").addEventListener("click", async () => {
    const container = document.getElementById("character-container");
    const favorieten = JSON.parse(localStorage.getItem("favorieteIDs")) || [];

    // Leeg het scherm
    container.innerHTML = "";

    // Geen favorieten geselecteerd
    if (favorieten.length === 0) {
        container.innerHTML = "<p>Je hebt nog geen favorieten geselecteerd.</p>";
        return;
    }

    // Voor elk ID: haal bijhorende character info op
    for (let id of favorieten) {
        try {
            const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
            const character = await res.json();

            const card = document.createElement("div");
            card.classList.add("card");
            card.innerHTML = `
        <h3>${character.name}</h3>
        <img src="${character.image}" alt="${character.name}">
        <p><strong>Status:</strong> ${character.status}</p>
        <p><strong>Soort:</strong> ${character.species}</p>
        <p><strong>Geslacht:</strong> ${character.gender}</p>
        <p><strong>Afkomst:</strong> ${character.origin.name}</p>
      `;
            container.appendChild(card);
        } catch (err) {
            console.error("Fout bij ophalen van favoriet personage:", err);
        }
    }
});


// thema wisselen en onthouden
const body = document.body;
const themaKnop = document.getElementById("thema-toggle");

// zet vorig gekozen thema bij opstart
if (localStorage.getItem("thema") === "donker") {
    body.classList.add("donker");
}

themaKnop.addEventListener("click", () => {
    body.classList.toggle("donker");

    // voorkeur wordt bijgehouden 
    if (body.classList.contains("donker")) {
        localStorage.setItem("thema", "donker");
    } else {
        localStorage.setItem("thema", "licht");
    }
});

