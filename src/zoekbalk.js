
const toonPersonages = (lijst, container) => {
    container.innerHTML = '';
    lijst.forEach(({ name, image, status, species, gender, origin }) => {
        const card = document.createElement('div');
        card.classList.add('card');
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


const filterCharacters = (characters, term) => {
    return characters.filter(character =>
        character.name.toLowerCase().includes(term.toLowerCase())
    );
};

// sorteren van personnages op basis van geslecteerde optie  aan de hand van een nieuwe functie 
const sortCharacters = (characters, sorteerWaarde) => {
    return characters.slice().sort((a, b) => {
        switch (sorteerWaarde) {
            case "naam-az":
                return a.name.localeCompare(b.name); // door d localeCompare worden de woorden alfabetische vergeleken 
            case "naam-za":
                return b.name.localeCompare(a.name);
            case "status-az":
                return a.status.localeCompare(b.status);
            case "species-az":
                return a.species.localeCompare(b.species);
            case "origin-az":
                return a.origin.name.localeCompare(b.origin.name);
            default:
                return 0;
        }
    });
};



export const activeerZoekfunctie = (characters, zoekInput, container, sorteerOptie) => {
    const updateResultaat = () => {
      const zoekterm = zoekInput.value.trim();
      const sorteerWaarde = sorteerOptie.value;
  
      const gefilterd = filterCharacters(characters, zoekterm);
      const gesorteerd = sortCharacters(gefilterd, sorteerWaarde);
  
      toonPersonages(gesorteerd, container);
    };
  
    zoekInput.addEventListener('input', updateResultaat);
    sorteerOptie.addEventListener('change', updateResultaat);
  
   
    toonPersonages(sortCharacters(characters, sorteerOptie.value), container);
  };
  