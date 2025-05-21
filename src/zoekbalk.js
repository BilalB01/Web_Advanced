


const toonPersonages = (lijst, container) => {

    const favorieteIDs = JSON.parse(localStorage.getItem('favorieteIDs')) || [];


    container.innerHTML = '';


    lijst.forEach(({ id, name, image, status, species, gender, origin }) => {

        const isFavoriet = favorieteIDs.includes(id.toString());

        const card = document.createElement('div');
        card.classList.add('card');


        const badgeClass = `status-badge status-${status === "unknown" ? "unknown" : status}`;

        card.innerHTML = `
            <img src="${image}" alt="${name}">
            <h3>${name}</h3>
            <div class="${badgeClass}">${status}</div>
            <p><strong>Soort:</strong> ${species}</p>
            <p><strong>Geslacht:</strong> ${gender}</p>
            <p><strong>Afkomst:</strong> ${origin.name}</p>
            <button class="fav-knop" data-id="${id}" title="Markeer als favoriet">
                 ${isFavoriet ? '★' : '☆'}
            </button>
             `;


        container.appendChild(card);
    });


    const sterren = document.querySelectorAll('.fav-knop');
    sterren.forEach(knop => {
        knop.addEventListener('click', () => {
            const id = knop.dataset.id;


            let favorieten = JSON.parse(localStorage.getItem('favorieteIDs')) || [];


            if (favorieten.includes(id)) {
                favorieten = favorieten.filter(favId => favId !== id);
            } else {
                favorieten.push(id);
            }


            localStorage.setItem('favorieteIDs', JSON.stringify(favorieten));


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


