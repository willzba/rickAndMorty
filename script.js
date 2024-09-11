const url = 'https://rickandmortyapi.com/api/character';
let allCharacters = [];

fetch(url)
    .then(response => response.json())
    .then(data => {
        allCharacters = data.results;
        if (allCharacters.length > 0) {
            displayCharacters(allCharacters);
        } else {
            displayNoResultsMessage();
        }
    })
    .catch(error => console.error('Error:', error));

function displayCharacters(characters) {
    const container = document.getElementById('data-container');
    container.innerHTML = ''; // Limpiar el contenedor antes de mostrar los personajes

    if (characters.length === 0) {
        displayNoResultsMessage();
        return;
    }

    characters.forEach(character => {
        const characterCard = document.createElement('div');
        characterCard.classList.add('character-card');

        const img = document.createElement('img');
        img.src = character.image;
        img.alt = character.name;

        const name = document.createElement('h2');
        name.textContent = character.name;

        const link = document.createElement('a');
        link.href = '#';
        link.textContent = 'Ver detalles';
        link.addEventListener('click', (e) => {
            e.preventDefault();
            showModal(character);
        });

        characterCard.appendChild(img);
        characterCard.appendChild(name);
        characterCard.appendChild(link);
        container.appendChild(characterCard);
    });
}

function displayNoResultsMessage() {
    const container = document.getElementById('data-container');
    container.innerHTML = '<p>No se encontraron personajes.</p>';
}

function showModal(character) {
    const modal = document.getElementById('myModal');
    document.getElementById('modalImage').src = character.image;
    document.getElementById('modalName').textContent = character.name;
    document.getElementById('modalLocation').textContent = `Localización: ${character.location.name}`;
    document.getElementById('modalOrigin').textContent = `Origen: ${character.origin.name}`;

    modal.style.display = 'block';

    const closeBtn = document.getElementsByClassName('close')[0];
    closeBtn.onclick = function() {
        modal.style.display = 'none';
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }
}

// Filtrar personajes según la búsqueda
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();

    // Si el campo de búsqueda está vacío, recargar la página
    if (searchTerm === "") {
        location.reload();
        return;
    }

    const filteredCharacters = allCharacters.filter(character =>
        character.name.toLowerCase().includes(searchTerm)
    );

    displaySuggestions(filteredCharacters);
});


// Mostrar sugerencias
function displaySuggestions(characters) {
    suggestions.innerHTML = '';
    if (characters.length > 0) {
        suggestions.style.display = "block";
        characters.forEach(character => {
            const suggestionItem = document.createElement('li');
            
            // Crear el elemento de imagen
            const img = document.createElement('img');
            img.src = character.image;
            img.alt = character.name;

            // Crear el texto de la sugerencia
            const text = document.createElement('span');
            text.textContent = character.name;

            suggestionItem.appendChild(img);
            suggestionItem.appendChild(text);
            suggestionItem.addEventListener('click', () => {
                searchInput.value = character.name;
                suggestions.style.display = 'none';
                displayCharacters([character]);
            });
            suggestions.appendChild(suggestionItem);
        });
    } else {
        suggestions.innerHTML = '<li>No se encontraron personajes</li>';
    }
}

