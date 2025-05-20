

// Functie om personages op de pagina te tonen
const toonPersonages = (lijst, container) => {
    // ophalen van favorieten-IDs uit localStorage
    const favorieteIDs = JSON.parse(localStorage.getItem('favorieteIDs')) || [];
  
    // Leegmaken van container vóór we nieuwe kaarten tonen
    container.innerHTML = '';
  
    //Loop door elk personage en toon de kaart
    lijst.forEach(({ id, name, image, status, species, gender, origin }) => {
      //Check of dit personage in favorieten zit op basis van ID
      const isFavoriet = favorieteIDs.includes(id.toString());
  
      // Kaart-element aanmaken
      const card = document.createElement('div');
      card.classList.add('card');
  
      // Sterknop toegevoegd op basis van favoriet-status
      card.innerHTML = `
        <h3>${name}</h3>
        <img src="${image}" alt="${name}">
        <p><strong>Status:</strong> ${status}</p>
        <p><strong>Soort:</strong> ${species}</p>
        <p><strong>Geslacht:</strong> ${gender}</p>
        <p><strong>Afkomst:</strong> ${origin.name}</p>
        <button class="fav-knop" data-id="${id}" title="Markeer als favoriet">
          ${isFavoriet ? '★' : '☆'}
        </button>
      `;
      container.appendChild(card);
    });
  
    // EventListeners toevoegen aan alle sterknoppen
    const sterren = document.querySelectorAll('.fav-knop');
    sterren.forEach(knop => {
      knop.addEventListener('click', () => {
        const id = knop.dataset.id;
  
        // Huidige favorieten ophalen
        let favorieten = JSON.parse(localStorage.getItem('favorieteIDs')) || [];
  
        // Toevoegen of verwijderen uit lijst
        if (favorieten.includes(id)) {
          favorieten = favorieten.filter(favId => favId !== id); // Verwijder
        } else {
          favorieten.push(id); // voeg toe 
        }
  
        // Opslaan in localStorage
        localStorage.setItem('favorieteIDs', JSON.stringify(favorieten));
  
        // Herteken kaarten zodat de ster  geüpdatet wordt
        toonPersonages(lijst, container);
      });
    });
  };
  
  
  const sortCharacters = (characters, sorteerWaarde) => {
    return characters.slice().sort((a, b) => {
      switch (sorteerWaarde) {
        case "naam-az":
          return a.name.localeCompare(b.name);
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
  
  
  export const activeerZoekfunctie = (characters, zoekInput, container, sorteerSelect) => {
    const statusFilter = document.getElementById('status-filter');
    const geslachtFilter = document.getElementById('geslacht-filter');
  

    const updateResultaat = () => {
      const zoekterm = zoekInput.value.trim().toLowerCase();
      const sorteerWaarde = sorteerSelect.value;
      const statusWaarde = statusFilter.value;
      const genderWaarde = geslachtFilter.value;
  
      let resultaat = characters.filter(character =>
        character.name.toLowerCase().includes(zoekterm)
      );
  
      
      if (statusWaarde !== "alle") {
        resultaat = resultaat.filter(char => char.status === statusWaarde);
      }
  
      
      if (genderWaarde !== "alle") {
        resultaat = resultaat.filter(char => char.gender === genderWaarde);
      }
  
      resultaat = sortCharacters(resultaat, sorteerWaarde);
  
     
      toonPersonages(resultaat, container);
    };
  
    
    zoekInput.addEventListener('input', updateResultaat);
    sorteerSelect.addEventListener('change', updateResultaat);
    statusFilter.addEventListener('change', updateResultaat);
    geslachtFilter.addEventListener('change', updateResultaat);
  
    
    updateResultaat();
  };
  
  
