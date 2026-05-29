/**
 * Router SPA
 */

import { renderHome }     from './pages/home.js';
import { renderContacts } from './pages/contacts.js';
import { renderlocation } from './pages/location.js';
import { renderepisode }  from './pages/episode.js';

function renderAbout() {
    document.getElementById('content').innerHTML = `
        <section class="about-section">
            <h1>Quiénes Somos</h1>
            <p>
                Este proyecto demuestra cómo construir una SPA utilizando
                JavaScript Vanilla sin frameworks: routing, renderizado dinámico,
                CRUD con localStorage y consumo de la API pública de Rick and Morty.
            </p>
        </section>
    `;
}

/**
 * Rutas disponibles
 */
const routes = {
    '/':         renderHome,
    '/contacts': renderContacts,
    '/about':    renderAbout,
    '/location': renderlocation,
    '/episode':  renderepisode,
};

/**
 * Router principal — navega sin recargar la página
 */
export async function router() {
    const path   = window.location.pathname;
    const render = routes[path];

    if (render) {
        await render();
    } else {
        document.getElementById('content').innerHTML = `
            <section>
                <h2>404 — Página no encontrada</h2>
            </section>
        `;
    }
}