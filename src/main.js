
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


