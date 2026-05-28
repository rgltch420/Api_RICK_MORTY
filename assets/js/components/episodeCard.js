export function episodeCard(episode) {
    return `
    <div id="episode-container" class="card">
        <div id="episode-header" class="card-header">
            <h2 id="episode-name">${episode.name}</h2>
            <span id="episode-code">${episode.episode}</span>
        </div>

        <div id="episode-body" class="card-body">
            <p id="episode-air-date">
                <strong>Fecha de emisión:</strong>${episode.air_date}
            </p>

            <p id="episode-characters">
            <strong>Cantidad de personajes:</strong>
            <span id="character-count">${episode.characters.length}</span>
            </p>
        </div>
    </div>
  `;
}