# 🚀 API Express avec Docker

## 📋 Table des Matières
- [Description](#description)
- [Endpoints](#endpoints)
- [Prérequis](#prérequis)
- [Installation](#installation)
- [Docker](#docker)
- [Développement](#développement)

## 📝 Description
API REST simple construite avec Express.js et conteneurisée avec Docker. Cette API fournit des endpoints basiques pour démontrer l'utilisation de Docker avec Node.js.

## 🛣️ Endpoints

| Méthode | Endpoint | Description | Exemple de Réponse |
|---------|----------|-------------|-------------------|
| GET | `/` | Page d'accueil | `{ "message": "Bienvenue sur notre API!" }` |
| GET | `/date` | Obtenir la date actuelle | `{ "date": "15/01/2024, 12:00:00" }` |
| POST | `/echo` | Renvoie le corps de la requête | `{ "echo": <request_body> }` |

## ⚙️ Prérequis
- Docker
- Node.js (pour le développement local)
- npm (pour le développement local)

## 🚀 Installation

### Avec Docker

```bash
# Construire l'image
docker build -t mon-api .

# Lancer le conteneur
docker run -p 3000:3000 mon-api
```

### Sans Docker (Développement local)

```bash
# Installer les dépendances
npm install

# Lancer l'application
npm start
```

## 🐳 Docker

### Structure des fichiers
```
api/
├── .dockerignore
├── Dockerfile
├── api.js
├── package.json
└── README.md
```

### Commandes Docker utiles

| Commande | Description |
|----------|-------------|
| `docker build -t mon-api .` | Construit l'image Docker |
| `docker run -p 3000:3000 mon-api` | Lance le conteneur |
| `docker ps` | Liste les conteneurs en cours |
| `docker stop <container_id>` | Arrête le conteneur |
| `docker logs <container_id>` | Affiche les logs |

## 💻 Développement

### Structure de l'API
- Express.js comme framework web
- CORS activé pour les requêtes cross-origin
- Port 3000 exposé par défaut

### Variables d'environnement
| Variable | Description | Valeur par défaut |
|----------|-------------|-------------------|
| PORT | Port d'écoute de l'API | 3000 |

## 🔍 Tests

Pour tester l'API, vous pouvez utiliser cURL :

```bash
# Test de la route principale
curl http://localhost:3000/

# Test de la route date
curl http://localhost:3000/date

# Test de la route echo
curl -X POST -H "Content-Type: application/json" \
     -d '{"message":"test"}' \
     http://localhost:3000/echo
``` 