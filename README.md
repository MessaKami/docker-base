# 🐳 Docker CheatSheet

## 📑 Table des Matières
- [Commandes de Base](#commandes-de-base)
- [Gestion des Conteneurs](#gestion-des-conteneurs)
- [Images Docker](#images-docker)
- [Volumes Docker](#volumes-docker)
- [Bind Mounts](#bind-mounts)
- [Tmpfs Mounts](#tmpfs-mounts)
- [Sécurité du Stockage](#sécurité-du-stockage)
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

## 📦 Volumes Docker

### Commandes de Base pour les Volumes

| Commande | Description | Utilisation |
|----------|-------------|-------------|
| `docker volume create mon_volume` | Crée un nouveau volume | Stockage persistant |
| `docker volume ls` | Liste tous les volumes | Vue d'ensemble |
| `docker volume inspect mon_volume` | Détails d'un volume | Débogage |
| `docker volume rm mon_volume` | Supprime un volume | Nettoyage |
| `docker volume prune` | Supprime les volumes non utilisés | Maintenance |

### Montage des Volumes

| Commande | Description | Exemple |
|----------|-------------|---------|
| `docker run -v mon_volume:/data mon_image` | Monte un volume nommé | Application web |
| `docker run -v $(pwd):/app mon_image` | Monte un dossier local | Développement |
| `docker run --env-file .env -v pgdata:/var/lib/postgresql/data postgres` | Monte un volume pour PostgreSQL | Base de données |

### Exemples Pratiques

```bash
# PostgreSQL avec volume persistant
docker volume create pgdata
docker run -d \
  --env-file pg_credentials.env \
  -v pgdata:/var/lib/postgresql/data \
  postgres

# Vérifier la taille d'un volume
docker volume inspect mon_volume
du -sh $(docker volume inspect -f '{{.Mountpoint}}' mon_volume)
```

### Bonnes Pratiques pour les Volumes

| Aspect | Recommandation |
|--------|----------------|
| Nommage | Utilisez des noms explicites pour les volumes |
| Sécurité | Chiffrez les données sensibles |
| Maintenance | Nettoyez régulièrement les volumes orphelins |
| Backup | Sauvegardez régulièrement les volumes critiques |

## 🔗 Bind Mounts

### Comparaison avec les Volumes

| Type | Avantages | Inconvénients |
|------|-----------|---------------|
| Bind Mounts | Développement rapide, accès direct | Moins portable, chemins absolus requis |
| Volumes | Gérés par Docker, plus sécurisés | Moins flexible pour le développement |

### Syntaxes de Montage

| Méthode | Commande | Usage |
|---------|----------|-------|
| `-v` | `docker run -v /host/path:/container/path` | Syntaxe courte |
| `--mount` | `docker run --mount type=bind,source=/host,target=/container` | Syntaxe explicite |

### Exemples de Développement

```bash
# Montage du code source pour le développement
docker run -d -v $(pwd):/app mon_image_web

# Montage en lecture seule
docker run -v /host/config:/etc/app:ro mon_image

# Montage avec --mount (plus explicite)
docker run --mount type=bind,source="$(pwd)",target=/app mon_image
```

### Cas d'Utilisation

| Scénario | Commande | Avantage |
|----------|----------|----------|
| Développement Web | `-v $(pwd):/app` | Rechargement à chaud |
| Configuration | `-v /host/config:/etc/app:ro` | Fichiers en lecture seule |
| Logs | `-v /host/logs:/var/log` | Accès direct aux logs |

### Bonnes Pratiques

| Aspect | Recommandation | Raison |
|--------|----------------|---------|
| Sécurité | Utilisez `:ro` pour la lecture seule | Prévient les modifications accidentelles |
| Chemins | Préférez les chemins absolus | Évite les ambiguïtés |
| Production | Privilégiez les volumes | Meilleure portabilité |
| Permissions | Vérifiez les droits utilisateur | Évite les problèmes d'accès |

## 💾 Tmpfs Mounts

### Caractéristiques

| Aspect | Description | Avantage |
|--------|-------------|----------|
| Performance | Stockage en RAM | Accès ultra-rapide |
| Sécurité | Données effacées à l'arrêt | Protection des données sensibles |
| Durabilité | Réduit l'usure du disque | Prolonge la vie des SSD |

### Syntaxe de Base

| Option | Commande | Description |
|--------|----------|-------------|
| Simple | `--tmpfs /chemin` | Montage basique en RAM |
| Avancée | `--tmpfs /chemin:rw,size=100m` | Avec options spécifiques |
| Mount | `--mount type=tmpfs,target=/chemin` | Syntaxe explicite |

### Exemples d'Utilisation

```bash
# Montage simple pour fichiers temporaires
docker run --tmpfs /app/temp mon_image

# Montage avec taille et permissions
docker run --tmpfs /app/cache:rw,size=100m,mode=1777 mon_image

# Montage pour sessions web
docker run --mount type=tmpfs,target=/app/sessions,tmpfs-size=50m mon_image
```

### Cas d'Usage

| Scénario | Configuration | Bénéfice |
|----------|--------------|-----------|
| Sessions Web | `--tmpfs /app/sessions:size=50m` | Sécurité des données |
| Cache | `--tmpfs /app/cache:size=100m` | Performance accrue |
| Fichiers Temp | `--tmpfs /tmp:exec` | Isolation système |

### Bonnes Pratiques

| Aspect | Recommandation | Raison |
|--------|----------------|---------|
| Mémoire | Limitez la taille | Évite la saturation RAM |
| Sécurité | Mode approprié | Contrôle des accès |
| Performance | Monitoring régulier | Optimisation usage |
| Isolation | Chemins dédiés | Évite les conflits |

## 🔒 Sécurité du Stockage

### Isolation des Données

| Commande | Objectif | Bénéfice |
|----------|----------|----------|
| `docker volume create data_app1` | Volume dédié par application | Isolation complète |
| `chmod 700 /data/secure` | Permissions restrictives | Contrôle d'accès |
| `docker run --mount type=volume,src=data_app1,dst=/data` | Montage isolé | Séparation des données |

### Chiffrement et Sécurité

```bash
# Création d'un volume sécurisé avec plugin SSHFS
docker volume create -d vieux/sshfs \
  -o sshcmd=user@host:/path secure_volume

# Montage avec permissions restreintes
docker run -v /secure/config:/app/config:ro,Z app_image

# Tmpfs sécurisé avec taille limitée
docker run --tmpfs /app/temp:rw,size=100m,noexec,nosuid app_image
```

### Bonnes Pratiques de Sécurité

| Aspect | Recommandation | Exemple |
|--------|----------------|---------|
| Volumes | Un volume par service | `volume create app_data` |
| Bind Mounts | Chemins spécifiques uniquement | `-v /app/config:/config:ro` |
| Tmpfs | Limiter taille et droits | `--tmpfs /tmp:size=50m,noexec` |
| Permissions | Principe du moindre privilège | `chmod 600 /app/secrets` |

### Contrôles de Sécurité

| Type | Commande/Action | But |
|------|----------------|-----|
| Audit | `docker volume inspect` | Vérifier la configuration |
| Isolation | Volumes nommés | Éviter les conflits |
| Chiffrement | dm-crypt/LUKS | Protection des données |
| Monitoring | Logs système | Détection d'anomalies |

### Exemples de Configuration Sécurisée

```bash
# Volume chiffré pour base de données
docker run -d \
  --name db_secure \
  --mount type=volume,source=db_encrypted,target=/var/lib/mysql \
  -e MYSQL_ROOT_PASSWORD_FILE=/run/secrets/db_root_pw \
  mysql:8.0

# Configuration en lecture seule
docker run -d \
  --name app_secure \
  --mount type=bind,source=/etc/app/config,target=/config,readonly \
  --tmpfs /app/temp:rw,size=50m,noexec \
  mon_app:latest
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

## 📝 TP Corrigé : Gestion des Volumes et Bind Mounts

### Partie 1 : Volumes Docker

```bash
# 1. Création et configuration PostgreSQL avec volume
docker volume create pgdata                              # Crée un volume persistant
docker run -d --name my-database \
  --env POSTGRES_USER=admin \
  --env POSTGRES_PASSWORD=adminpassword \
  -v pgdata:/var/lib/postgresql/data \
  postgres                                              # Lance PostgreSQL avec volume

# Vérification
docker volume inspect pgdata                            # Inspecte le volume
docker ps                                              # Vérifie le conteneur
```

| Commande | Explication |
|----------|-------------|
| `volume create` | Crée un espace de stockage persistant |
| `-v pgdata:/var/lib/postgresql/data` | Monte le volume dans le conteneur |
| `--env` | Configure les variables d'environnement |

### Partie 2 : Bind Mounts

```bash
# 1. Configuration Nginx avec bind mount
mkdir ~/my-datas                                        # Crée le dossier sur l'hôte
docker run -d --name my-nginx \
  -v ~/my-datas:/app/data \
  nginx                                                # Monte le dossier dans Nginx

# Test et vérification
echo "Ceci est un fichier test" > ~/my-datas/test.md   # Crée un fichier test
docker exec my-nginx ls /app/data                      # Vérifie dans le conteneur
```

| Option | But | Exemple |
|--------|-----|---------|
| `-v` | Monte un dossier local | `-v ~/my-datas:/app/data` |
| `--name` | Nomme le conteneur | `--name my-nginx` |
| `exec` | Exécute une commande | `docker exec my-nginx ls` |

### Nettoyage

```bash
# Arrêt et suppression
docker stop my-database my-nginx                        # Arrête les conteneurs
docker rm my-database my-nginx                         # Supprime les conteneurs
docker volume rm pgdata                                # Supprime le volume
```

### Points Clés
- Les volumes persistent après la suppression des conteneurs
- Les bind mounts permettent le développement en temps réel
- Toujours utiliser des variables d'environnement pour les secrets
- Vérifier les montages avec `docker inspect` ou `exec`
