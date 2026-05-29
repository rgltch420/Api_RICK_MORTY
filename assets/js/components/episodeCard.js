/**
 * Episode Card Component
 */

export function episodesCard(episode) {

    return `
    <div class="card">
        
        <div  class="card-header">
             <h2 id="episode-name">${episode.name}</h2>
            <span id="episode-code">${episode.episode}</span>
        </div>

        <div  class="card-body">

            <p class="episode-date">
            <strong>Fecha de emisión:</strong>
            ${episode.air_date}
            </p>

            <p class="episode-characters">
            <strong>Cantidad de personajes:</strong>
            <span id="character-count">${episode.characters.length}</span>
            </p>
        </div>
    </div>
    `;
}
