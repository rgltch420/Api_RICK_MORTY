/**
 * Character Card Component
 */

export function characterCard(character) {
  const isLocal = character.isLocal || false;

  return `
    <article class="card" data-id="${character.id}">
      <img
        src="${character.image}"
        alt="${character.name}"
        onerror="this.src='https://rickandmortyapi.com/api/character/avatar/19.jpeg'"
      >
      <div class="card-body">
        <h3>${character.name}</h3>
        <p><strong>Status:</strong> ${character.status}</p>
        <p><strong>Species:</strong> ${character.species}</p>
        ${isLocal ? '<span class="badge-local">⭐ Custom</span>' : ''}
      </div>
      <div class="card-actions">
        ${isLocal ? `<button class="btn-edit" data-id="${character.id}" data-local="true">Editar</button>` : ''}
        ${isLocal ? `<button class="btn-delete" data-id="${character.id}" data-local="true">Eliminar</button>` :  ''}
      </div>
    </article>
  `;
}
