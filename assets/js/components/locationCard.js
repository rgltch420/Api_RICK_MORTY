export function locationCard(location) {
    return `

    <div id="location-container" class="card">
        <div id="location-header" class="card-header">
            <h2 id="location-name">${location.name}</h2>
            <span id="location-type">${location.type}</span>
        </div>

        <div id="location-body" class="card-body">
            <p id="location-dimension">
                <strong>Dimensión:</strong>${location.dimension}
            </p>

            <p id="location-characters">
            <strong>Cantidad de residentes:</strong>
            <span id="character-count">${location.residents.length}</span>
            </p>
        </div>
    </div>
  `;
}
