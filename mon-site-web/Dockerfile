# Utilise l'image officielle Nginx comme image de base
FROM nginx:alpine

# Définit le répertoire de travail dans l'image
WORKDIR /usr/share/nginx/html

# Copie le contenu du site web dans l'image
COPY ./site-web/ .

# Expose le port 80
EXPOSE 80

# Utilise la commande par défaut de l'image Nginx pour démarrer le serveur
CMD ["nginx", "-g", "daemon off;"]