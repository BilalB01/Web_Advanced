
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("character-container");

  // omdat ik 60 personnages wil in mijn homepage moet ik 3 pagina's roepen per pagina kon ik maar 20 personnages tonen 
  Promise.all([
    fetch("https://rickandmortyapi.com/api/character?page=1").then(res => res.json()),
    fetch("https://rickandmortyapi.com/api/character?page=2").then(res => res.json()),
    fetch("https://rickandmortyapi.com/api/character?page=3").then(res => res.json())
  ])
    .then(([data1, data2, data3]) => {
      // hier combineer ik de drie arrays tot 1 array om de 60 personages te hebben
      const characters = [...data1.results, ...data2.results, ...data3.results];

      characters.forEach(char => {
        const card = document.createElement("div");
        card.classList.add("card");
        // hier ga ik de 6 items toevoegen 
        card.innerHTML = ` 
          <h3>${char.name}</h3>
          <img src="${char.image}" alt="${char.name}">
          <p><strong>Status:</strong> ${char.status}</p>
          <p><strong>Soort:</strong> ${char.species}</p>
          <p><strong>Geslacht:</strong> ${char.gender}</p>
          <p><strong>Afkomst:</strong> ${char.origin.name}</p>
        `;
        container.appendChild(card);
      });
    })
    // hier is het als er een fout is dan zal er een foutmelding tonen 
    .catch(error => {
      container.innerHTML = `<p>Er ging iets mis: ${error.message}</p>`;
      console.error(error);
    });
});
  
  