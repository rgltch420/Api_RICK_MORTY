# Rick and Morty SPA

Single Page Application (SPA) desarrollada con JavaScript Vanilla que consume la API pública de Rick and Morty para visualizar personajes, episodios y ubicaciones del universo de la serie.

---

# Características

- Búsqueda y visualización de personajes
- Consulta de episodios
- Exploración de ubicaciones
- Creacion, Eliminacion y Edicion de personajes
- Navegación SPA sin recargar la página
- Consumo de API REST

---

# Tecnologías utilizadas

- HTML
- CSS
- JavaScript (Vanilla JS)
- Vite
- Rick and Morty API

---

# Estructura del proyecto

```bash
API_RICK_MORTY/
│
├── assets/
│   ├── css/
│   │   └── styles.css
│   │
│   └── js/
│       ├── components/
│       │   ├── characterCard.js
│       │   ├── episodesCard.js
│       │   ├── locationCard.js
│       │   └── navbar.js
│       │
│       ├── pages/
│       │   ├── about.js
│       │   ├── contacts.js
│       │   ├── episodes.js
│       │   ├── home.js
│       │   └── location.js
│       │
│       ├── services/
│       │   ├── api.js
│       │   ├── characterStore.js
│       │   └── httpClient.js
│       │
│       ├── utils/
│       │   └── helpers.js
│       │
│       ├── views/
│       │   ├── about.html
│       │   ├── contacts.html
│       │   ├── episodes.html
│       │   ├── home.html
│       │   └── location.html
│       │
│       ├── app.js
│       └── router.js
│
├── .env
├── index.html
├── package.json
└── README.md
```

---

# Instalación y ejecución

## Clonar el repositorio

```bash
git clone https://github.com/rgltch420/Api_RICK_MORTY.git
```

---

## Entrar al proyecto

```bash
cd Api_RICK_MORTY
```

---

## Instalar dependencias

```bash
npm install
```

---

## Crear archivo `.env`

Debes crear un archivo llamado `.env` en la raíz del proyecto con la siguiente configuración:

```env
VITE_API_URL=https://rickandmortyapi.com/api
VITE_CONTENT_TYPE=application/json
VITE_TIME_OUT=5000
```

---

## Ejecutar el proyecto

```bash
npm run dev
```

---

# API utilizada

Este proyecto consume la API pública de Rick and Morty:

https://rickandmortyapi.com/

---

# Arquitectura del proyecto

La aplicación fue desarrollada siguiendo una arquitectura modular para mantener el código organizado, reutilizable y escalable.

## Components

Contiene componentes reutilizables de la interfaz:

- Character Cards
- Episode Cards
- Location Cards
- Navbar

---

## Pages

Cada archivo maneja la lógica principal de una vista específica de la aplicación.

---

## Views

Contiene las plantillas HTML utilizadas por cada página de la SPA.

---

## Services

Gestiona:

- Peticiones HTTP
- Conexión con la API
- Manejo centralizado de datos

---

## Router

El archivo `router.js` controla la navegación dinámica entre vistas sin recargar la página.

---


# Objetivos del proyecto

Este proyecto fue desarrollado con el objetivo de practicar:

- Consumo de APIs REST
- Arquitectura SPA
- Manipulación del DOM

---

![Diagrama_de_flujo](/Diagrama%20de%20flujo%20de%20api%20ricky%20y%20morty.png)