//  deze is een functie die Toont een lijst personages in de DOM
const toonPersonages = (lijst, container) => {
    container.innerHTML = '';
    lijst.forEach(({ name, image, status, species, gender, origin }) => { // Moderne loops -> loopt over alle personnages en haalt de nodige gegevens eruit
      const card = document.createElement('div');
      card.classList.add('card');// hier wordt er voor elk personages een html-blok gemaakt
      card.innerHTML = `
        <h3>${name}</h3>
        <img src="${image}" alt="${name}">
        <p><strong>Status:</strong> ${status}</p>
        <p><strong>Soort:</strong> ${species}</p>
        <p><strong>Geslacht:</strong> ${gender}</p>
        <p><strong>Afkomst:</strong> ${origin.name}</p>
      `;
      container.appendChild(card);
    });
  };
  
  // filteren van  personages op basis van de zoekterm
  const filterCharacters = (characters, term) => {
    return characters.filter(character =>
      character.name.toLowerCase().includes(term.toLowerCase())
    );
  };
  
  // maakt een functie beschikbaar in main.js 
  export const activeerZoekfunctie = (characters, zoekInput, container) => {
    zoekInput.addEventListener('input', () => { 
      const zoekterm = zoekInput.value.trim(); // na elke letter er wordt getypt wordt de lijst gefilterd 
      const gefilterd = filterCharacters(characters, zoekterm);
      toonPersonages(gefilterd, container);
    });
  
    // toon alle  perssongages bij eerste keer laden 
    toonPersonages(characters, container);
  };
  