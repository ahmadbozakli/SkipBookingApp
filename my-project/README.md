# Skip Booking App 

This is a React-based skip booking application that supports interactive 3D model previews. The app is fully containerized using Docker for both development and production environments.

---

##  Features

-  Real-time 3D skip previews using `<model-viewer>`
-  Dark mode support
-  Fully responsive across all screen sizes
-  Docker-ready for local dev and production
-  Built with Vite for fast performance

---

##  Docker Setup

###  Production Mode

Runs the production-ready build served via Nginx.

```bash
docker-compose up
```

Visit: [http://localhost:3000](http://localhost:3000)

---

###  Development Mode

Runs the app in development mode with hot-reloading.

```bash
docker-compose --profile dev up
```

Visit: [http://localhost:3001](http://localhost:3001)

---

##  Project Structure

```
.
├── public/              # Static files (3D models, favicon, etc.)
├── src/                 # App source code (React + TSX)
├── Dockerfile           # Production build config
├── Dockerfile.dev       # Dev environment with hot reload
├── docker-compose.yml   # Multi-service Docker setup
├── nginx.conf           # Nginx config for production
└── README.md
```

---

##  Tech Stack

- React 19
- TypeScript
- Tailwind CSS
- Vite
- model-viewer (3D)
- Docker + Docker Compose
- Nginx (for prod)

---

##  Packaging & Sharing

###  Include:

- Source code (`src/`, `public/`)
- Docker files:
  - `Dockerfile`, `Dockerfile.dev`
  - `docker-compose.yml`
  - `nginx.conf`
- 3D models in `/src/models/`
- Any build or utility scripts

---
