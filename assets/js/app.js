/**
 * Archivo principal SPA
 */

import { loadNavbar } from './components/navbar.js';
import { router }     from './router.js';

/**
 * Navega entre rutas sin recargar la página
 */
export function navigateTo(url) {
    history.pushState(null, null, url);
    router();
}

/**
 * Inicialización principal
 */
window.addEventListener('DOMContentLoaded', async () => {
    await loadNavbar();
    router();

    // Intercepta todos los links SPA (data-link)
    document.body.addEventListener('click', event => {
        if (event.target.matches('[data-link]')) {
            event.preventDefault();
            navigateTo(event.target.href);
        }
    });
});

// Maneja el botón atrás/adelante del navegador
window.addEventListener('popstate', router);