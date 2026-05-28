import { loadHTML } from '../utils/helpers.js';
import { getLocation } from '../services/api.js';
import { locationCard } from '../components/locationCard.js';

/**
 * Renderiza location
 */
export async function renderlocation() {
    const content = document.getElementById('content');
    content.innerHTML = await loadHTML(
        './assets/js/views/location.html'
    );

    const container = document.getElementById('location-container');

    const locations = await getLocation ();
    container.innerHTML = locations
        .map(location=> locationCard(location))
        .join('');
}