# Utilisation de l'image Node.js officielle
FROM node:hydrogen-slim

# Création et définition du répertoire de travail
WORKDIR /api

# Copie des fichiers de dépendances
COPY package*.json ./

# Installation des dépendances
RUN npm i

# Copie du reste des fichiers de l'application
COPY . .

# Exposition du port
EXPOSE 3000

# Commande pour démarrer l'application
CMD ["/bin/bash", "-c", "npm run start"]
