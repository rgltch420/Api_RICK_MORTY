import { loadHTML } from '../utils/helpers.js';
import { getCharacters } from '../services/api.js';
import { characterCard } from '../components/characterCard.js';
import { mergeCharacters, deleteCharacter, deleteCustomCharacter, saveEdit, saveCustomCharacter} from '../services/characterStore.js';


/**
 * Renderiza Home
 */
export async function renderHome() {
    const content = document.getElementById('content');
    content.innerHTML = await loadHTML('./assets/js/views/home.html')
    const container = document.getElementById('characters-container');
    const btn = document.createElement('button');
    btn.id = 'btn-create';
    btn.textContent = 'Crea tu propio personaje';
    btn.className = 'btn-create-character';
    container.insertAdjacentElement('beforebegin', btn);

    btn.addEventListener('click', () => openCreateModal(async () => {
        await renderCharacters();
    }));

    await renderCharacters();
    
}


async function renderCharacters() {
    const container =  document.getElementById('characters-container');
    const apiCharacters = await getCharacters();
    const allCharacters = mergeCharacters(apiCharacters);

    container.innerHTML = allCharacters
        .map(character => characterCard(character))
        .join('');
    attachEvents(container, apiCharacters);
}

function attachEvents(container, apiCharacters){
    container.querySelectorAll('.btn-delete').forEach(btn => {
        btn.addEventListener('click', ()=>{
            const id = btn.dataset.id;
            const isLocal = btn.dataset.local === 'true';
            if(!confirm('Seguro que deseas eliminar este personaje?'))  return;   
            if (isLocal){
                deleteCustomCharacter(id);
            }else{
                deleteCharacter(Number(id));
            }
            container.querySelector(`[data-id="${id}"]`).remove();
            showToast('Personaje eliminado ✔️');
        });
    });

    container.querySelectorAll('.btn-edit').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      const isLocal = btn.dataset.local === 'true';
      const card = container.querySelector(`[data-id="${id}"]`);
      
      openEditModal(id, card, isLocal, async () => {
        await renderCharacters(); 
      });
    });
  });
}

function openEditModal(id, card, isLocal, onSave) {
    if (document.querySelector('.modal-overlay')) return; 
    const currentName    = card.querySelector('h3').textContent.trim();
    const currentStatus  = card.querySelector('.card-body p:nth-child(2)').textContent.replace('Status:', '').trim();
    const currentSpecies = card.querySelector('.card-body p:nth-child(3)').textContent.replace('Species:', '').trim();
    const currentImage   = card.querySelector('img').src;

    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
      <div class="modal">
        <h2>Editar Personaje</h2>
        <label>Nombre <input id="edit-name" value="${currentName}" /></label>
        <label>Estado <input id="edit-status" value="${currentStatus}" /></label>
        <label>Especie <input id="edit-species" value="${currentSpecies}" /></label>
        <label>URL de imagen <input id="edit-image" value="${currentImage}" /></label>
        <div class="modal-actions">
          <button id="modal-save">Guardar</button>
          <button id="modal-cancel">Cancelar</button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
    document.getElementById('modal-cancel').addEventListener('click', () => modal.remove());
    document.getElementById('modal-save').addEventListener('click', () => {
        const name = document.getElementById('edit-name').value.trim();
        const status = document.getElementById('edit-status').value.trim();
        const species = document.getElementById('edit-species').value.trim();
        const image = document.getElementById('edit-image').value.trim();

        if (!name || !status || !species) {
            showToast('Completa todos los campos', 'error');
            return;
        }

        saveEdit(id, { name, status, species, image });  // ← guarda imagen también
        modal.remove();
        showToast('Personaje editado');
        onSave();
    });
}
function openCreateModal(onSave) {
    if (document.querySelector('.modal-overlay')) return;
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal">
            <h2>Crear Personaje</h2>
            <label>Nombre <input id="create-name" placeholder="Ej: Rick Sánchez" /></label>
            <label>Especie <input id="create-species" placeholder="Ej: Human" /></label>
            <label>Género
                <select id="create-gender">
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Genderless">Genderless</option>
                    <option value="unknown">Unknown</option>
                </select>
            </label>
            <label>Estado
                <select id="create-status">
                    <option value="Alive">Alive</option>
                    <option value="Dead">Dead</option>
                    <option value="unknown">Unknown</option>
                </select>
            </label>
            <label>URL de imagen <input id="create-image" placeholder="https://..." /></label>
            <div id="create-preview-container" style="display:none; margin-top:8px;">
                <img id="create-preview" style="width:100px; border-radius:8px;" />
            </div>
            <div class="modal-actions">
                <button id="modal-create-save">Crear</button>
                <button id="modal-create-cancel">Cancelar</button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    document.getElementById('create-image').addEventListener('input', (e) => {
        const url = e.target.value.trim();
        const preview = document.getElementById('create-preview');
        const container = document.getElementById('create-preview-container');
        if (url) {
            preview.src = url;
            preview.onerror = () => { container.style.display = 'none'; };
            preview.onload = () => { container.style.display = 'block'; };
        } else {
            container.style.display = 'none';
        }
    });

    document.getElementById('modal-create-cancel').addEventListener('click', () => modal.remove());

    document.getElementById('modal-create-save').addEventListener('click', () => {
        const name    = document.getElementById('create-name').value.trim();
        const species = document.getElementById('create-species').value.trim();
        const gender  = document.getElementById('create-gender').value;
        const status  = document.getElementById('create-status').value;
        const image   = document.getElementById('create-image').value.trim();

        if (!name || !species || !image) {
            showToast('Nombre, especie e imagen son obligatorios', 'error');
            return;
        }

        saveCustomCharacter({ name, species, gender, status, image });
        modal.remove();
        showToast('Personaje creado');
        onSave();
    });
}
function showToast(message, type = 'success'){
    const toast = document.createElement('div');
    toast.className =  `toast toast-${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}