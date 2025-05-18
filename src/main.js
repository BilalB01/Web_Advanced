
import { activeerZoekfunctie } from './zoekbalk.js';  // hier zorg ik dat de zoekfunctie uit de zoekbalk.js geimorteerd wordt

document.addEventListener('DOMContentLoaded', async () => {
  const container = document.getElementById('character-container'); // hier zorg ik dat Dom-elementen geselecteerd worden om er later ee te werken
  const zoekInput = document.getElementById('zoekveld');

  try {
    const responses = await Promise.all([
      fetch("https://rickandmortyapi.com/api/character?page=1"),
      fetch("https://rickandmortyapi.com/api/character?page=2"),
      fetch("https://rickandmortyapi.com/api/character?page=3")
    ]);

    const data = await Promise.all(responses.map(res => res.json()));
    const allePersonages = [...data[0].results, ...data[1].results, ...data[2].results];

    // Start   de zoekfunctionaliteit met de opgehaalde date en inputveld 
    activeerZoekfunctie(allePersonages, zoekInput, container);
  } catch (error) { // als er iets fout is dan wordt dit getoond 
    container.innerHTML = `<p>Er is iets fout gegaan: ${error.message}</p>`;
  }
});

  
  