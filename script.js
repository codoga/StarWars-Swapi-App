const apiBase = 'https://swapi.dev/api/starships/';
let nextPage = apiBase;

document.getElementById('search-button').addEventListener('click', searchStarships);
document.getElementById('load-more-button').addEventListener('click', loadMoreStarships);
document.getElementById('back-button').addEventListener('click', showList);

function searchStarships() {
    const query = document.getElementById('search-input').value;
    if (query) {
        fetch(`${apiBase}?search=${query}`)
            .then(response => response.json())
            .then(data => displayStarships(data.results));
    }
}

function loadMoreStarships() {
    if (nextPage) {
        fetch(nextPage)
            .then(response => response.json())
            .then(data => {
                nextPage = data.next;
                displayStarships(data.results, true);
            });
    }
}

function displayStarships(starships, append = false) {
    const starshipsList = document.getElementById('starships-list');
    if (!append) {
        starshipsList.innerHTML = '';
    }
    starships.forEach(starship => {
        const starshipDiv = document.createElement('div');
        starshipDiv.className = 'starship';
        starshipDiv.innerHTML = `
            <h3>${starship.name}</h3>
            <p>Model: ${starship.model}</p>
            <p>Max Speed: ${starship.max_atmosphering_speed}</p>
        `;
        starshipDiv.addEventListener('click', () => showDetail(starship));
        starshipsList.appendChild(starshipDiv);
    });
}

function showDetail(starship) {
    document.getElementById('starship-detail').classList.remove('hidden');
    document.getElementById('starships-list').classList.add('hidden');
    document.getElementById('load-more-button').classList.add('hidden');
    document.getElementById('search-button').classList.add('hidden');
    document.getElementById('search-input').classList.add('hidden');

    const detailContent = document.getElementById('detail-content');
    detailContent.innerHTML = `
        <h2>${starship.name}</h2>
        <p>Model: ${starship.model}</p>
        <p>Passengers: ${starship.passengers}</p>
        <p>Max Speed: ${starship.max_atmosphering_speed}</p>
        <p>Manufacturer: ${starship.manufacturer}</p>
        <p>Crew: ${starship.crew}</p>
        <p>Cargo Capacity: ${starship.cargo_capacity}</p>
    `;
}

function showList() {
    document.getElementById('starship-detail').classList.add('hidden');
    document.getElementById('starships-list').classList.remove('hidden');
    document.getElementById('load-more-button').classList.remove('hidden');
    document.getElementById('search-button').classList.remove('hidden');
    document.getElementById('search-input').classList.remove('hidden');
}

loadMoreStarships();
