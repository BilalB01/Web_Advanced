

const toonPersonages = (lijst, container) => {
    // haal huidige favoriete locaties uit localStorage (of begin met lege lijst)
    const favorieteLocaties = JSON.parse(localStorage.getItem('favorieteLocaties')) || [];
  
    // de container wordt lee ggemaakt 
    container.innerHTML = '';
  
    lijst.forEach(({ name, image, status, species, gender, origin }) => {
      // kijk of deze locatie in de favorieten zit
      const isFavoriet = favorieteLocaties.includes(origin.name);
  
      // maak de kaart
      const card = document.createElement('div');
      card.classList.add('card');
  
      // hier voeg ik een ster logo  bij de kaart via control + command + spatie 
      card.innerHTML = `
        <h3>${name}</h3>
        <img src="${image}" alt="${name}">
        <p><strong>Status:</strong> ${status}</p>
        <p><strong>Soort:</strong> ${species}</p>
        <p><strong>Geslacht:</strong> ${gender}</p>
        <p>
          <strong>Afkomst:</strong> ${origin.name}
          <button class="fav-knop" data-locatie="${origin.name}" title="Markeer als favoriet">
            ${isFavoriet ? '★' : '☆'}
          </button>
        </p>
      `;
  
      // voeg de kaart toe aan de pagina
      container.appendChild(card);
    });
  
    // click-events toegevoegd aan alle ster knoppen
    const sterren = document.querySelectorAll('.fav-knop');
    sterren.forEach(knop => {
      knop.addEventListener('click', () => {
        const locatie = knop.dataset.locatie;
        let favorieten = JSON.parse(localStorage.getItem('favorieteLocaties')) || [];
  
        // voeg toe of verwijder uit favorieten
        if (favorieten.includes(locatie)) {
          favorieten = favorieten.filter(l => l !== locatie);
        } else {
          favorieten.push(locatie);
        }
  
        // sla nieuwe favorietenlijst op
        localStorage.setItem('favorieteLocaties', JSON.stringify(favorieten));
  
        // herteken de kaarten om de ster bij te werken
        toonPersonages(lijst, container);
      });
    });
  };
  


const filterCharacters = (characters, term) => {
    return characters.filter(character =>
        character.name.toLowerCase().includes(term.toLowerCase())
    );
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
  
    //  functie die alles combineert
    const updateResultaat = () => {
      const zoekterm = zoekInput.value.trim().toLowerCase();
      const sorteerWaarde = sorteerSelect.value;
      const statusWaarde = statusFilter.value;
      const genderWaarde = geslachtFilter.value;
  
      // Filteren op naam
      let resultaat = characters.filter(character =>
        character.name.toLowerCase().includes(zoekterm)
      );
  
      // Filteren op status
      if (statusWaarde !== "alle") {
        resultaat = resultaat.filter(char => char.status === statusWaarde);
      }
  
      // Filter op geslacht
      if (genderWaarde !== "alle") {
        resultaat = resultaat.filter(char => char.gender === genderWaarde);
      }
  
      // Sorteer
      resultaat = sortCharacters(resultaat, sorteerWaarde);
  
      // resultaat wordt getoont
      toonPersonages(resultaat, container);
    };
  
    // Eventlisteners
    zoekInput.addEventListener('input', updateResultaat);
    sorteerSelect.addEventListener('change', updateResultaat);
    statusFilter.addEventListener('change', updateResultaat);
    geslachtFilter.addEventListener('change', updateResultaat);
  
    //Start
    updateResultaat();
  };
  
