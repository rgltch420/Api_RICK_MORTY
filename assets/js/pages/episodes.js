import { loadHTML } from '../utils/helpers.js';
import { getepisodes } from '../services/api.js';
import { episodesCard } from '../components/episodesCard.js';
/**
 * Renderiza Episodios
 */
export async function renderepisodes() {
    const content = document.getElementById('content');
    content.innerHTML = await loadHTML(
        './assets/js/views/episodes.html'
    );
    const container = document.getElementById('episodes-container');
      const episodes = await getepisodes();
    container.innerHTML = episodes
        .map(episode => episodesCard(episode))
        .join('');
}
