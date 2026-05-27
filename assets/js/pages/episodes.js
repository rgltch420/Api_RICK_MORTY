import { loadHTML } from '../utils/helpers.js';

/**
 * Renderiza Episodios
 */
export async function renderepisodes() {
    const content = document.getElementById('content');
    content.innerHTML = await loadHTML(
        './assets/js/views/episodes.html'
    );
    const container = document.getElementById('episodes-container');

}
