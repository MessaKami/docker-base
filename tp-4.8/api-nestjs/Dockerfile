FROM node:hydrogen-slim

WORKDIR /api-nestjs

COPY package*.json ./

RUN npm i

COPY . .

EXPOSE 3001

CMD ["/bin/bash", "-c", "npm run start"]