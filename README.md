# 🐳 Docker CheatSheet

## 📑 Table des Matières
- [Commandes de Base](#commandes-de-base)
- [Gestion des Conteneurs](#gestion-des-conteneurs)
- [Images Docker](#images-docker)
- [Surveillance et Logs](#surveillance-et-logs)
- [Registres et Tags](#registres-et-tags)
- [Bonnes Pratiques](#bonnes-pratiques)

## 🛠 Commandes de Base

| Commande | Description |
|----------|-------------|
| `docker run hello-world` | Test rapide de l'installation Docker |
| `docker ps` | Liste les conteneurs actifs |
| `docker ps -a` | Liste tous les conteneurs (actifs et inactifs) |
| `docker stop <container>` | Arrête un conteneur |
| `docker rm <container>` | Supprime un conteneur |
| `docker images` | Liste toutes les images locales |

## 🔄 Gestion des Conteneurs

| Commande | Description | Utilisation |
|----------|-------------|-------------|
| `docker run -d <image>` | Lance un conteneur en arrière-plan | Démarrage de services |
| `docker run -p 8080:80 <image>` | Mappe le port 8080 (hôte) vers 80 (conteneur) | Applications web |
| `docker exec -it <container> sh` | Ouvre un shell dans le conteneur | Débogage |
| `docker restart <container>` | Redémarre un conteneur | Résolution de problèmes |

## 📦 Images Docker

### Construction et Gestion

| Commande | Description |
|----------|-------------|
| `docker build -t mon-app:v1.0 .` | Construit une image avec un tag |
| `docker rmi <image>` | Supprime une image |
| `docker pull <image>` | Télécharge une image depuis un registre |
| `docker push <image>` | Pousse une image vers un registre |

### Exemple avec Nginx

```dockerfile
# Exemple de Dockerfile pour Nginx
FROM nginx:alpine
WORKDIR /usr/share/nginx/html
COPY site-web/ .
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## 🔍 Surveillance et Logs

| Commande | Utilité | Quand l'utiliser |
|----------|---------|------------------|
| `docker logs <container>` | Affiche les logs du conteneur | Débogage |
| `docker stats` | Monitore l'utilisation des ressources | Surveillance performance |
| `docker inspect <container>` | Détails de configuration | Investigation approfondie |

## 🏷 Registres et Tags

| Commande | Description |
|----------|-------------|
| `docker login` | Connexion à Docker Hub |
| `docker tag source:tag target:tag` | Crée un nouveau tag pour une image |
| `docker push username/app:tag` | Pousse vers Docker Hub |
| `docker pull username/app:tag` | Récupère depuis Docker Hub |

## 🧹 Nettoyage

| Commande | Description | Impact |
|----------|-------------|---------|
| `docker system prune` | Nettoie tout le système | Supprime conteneurs arrêtés, cache, etc. |
| `docker container prune` | Nettoie les conteneurs | Supprime conteneurs arrêtés |
| `docker image prune` | Nettoie les images | Supprime images non utilisées |

## ✨ Bonnes Pratiques

### Optimisation des Images
- Utilisez `.dockerignore` pour exclure les fichiers inutiles
- Privilégiez les images officielles et légères (alpine)
- Combinez les commandes RUN pour réduire les couches

### Sécurité
- Ne stockez jamais de secrets dans les images
- Utilisez des utilisateurs non-root
- Scannez régulièrement les vulnérabilités

### Performance
- Optimisez le cache des couches
- Minimisez la taille des images
- Utilisez le multi-stage building pour les applications compilées

## 🚀 Exemple Complet

```bash
# Construction et déploiement d'une application web
docker build -t mon-app:latest .
docker run -d -p 8080:80 --name mon-site mon-app:latest
docker logs mon-site
curl http://localhost:8080
```
