
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


document.getElementById("favorieten").addEventListener("click", async () => {
    const container = document.getElementById("character-container");
    const favorieten = JSON.parse(localStorage.getItem("favorieteIDs")) || [];


    container.innerHTML = "";


    if (favorieten.length === 0) {
        container.innerHTML = "<p>Je hebt nog geen favorieten geselecteerd.</p>";
        return;
    }


    for (let id of favorieten) {
        try {
            const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
            const character = await res.json();

            const card = document.createElement("div");
            card.classList.add("card");
            const badgeClass = `status-badge status-${character.status === "unknown" ? "unknown" : character.status}`;

            card.innerHTML = `
            <img src="${character.image}" alt="${character.name}">
                <h3>${character.name}</h3>
                <div class="${badgeClass}">${character.status}</div>
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



const body = document.body;
const themaKnop = document.getElementById("thema-toggle");


if (localStorage.getItem("thema") === "donker") {
    body.classList.add("donker");
}

themaKnop.addEventListener("click", () => {
    body.classList.toggle("donker");


    if (body.classList.contains("donker")) {
        localStorage.setItem("thema", "donker");
    } else {
        localStorage.setItem("thema", "licht");
    }
});



const scrollBtn = document.getElementById('scrollTopBtn');

window.addEventListener('scroll', () => {
    if (window.scrollY > 600) {
        scrollBtn.style.display = 'block';
    } else {
        scrollBtn.style.display = 'none';
    }
});

scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});



const suggestieForm = document.getElementById("suggestieForm");
const suggestieInput = document.getElementById("suggestieInput");
const formFeedback = document.getElementById("formFeedback");

suggestieForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const naam = suggestieInput.value.trim();

    if (naam.length < 2) {
        formFeedback.textContent = "De naam moet minstens 2 tekens bevatten.";
        return;
    }

    let suggesties = JSON.parse(localStorage.getItem("suggesties")) || [];
    suggesties.push(naam);
    localStorage.setItem("suggesties", JSON.stringify(suggesties));

    formFeedback.textContent = `Bedankt! We voegen "${naam}" binnenkort toe 😉`;
    suggestieForm.reset();
});
