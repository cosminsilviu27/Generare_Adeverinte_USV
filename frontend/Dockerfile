# frontend/Dockerfile

# Folosim o imagine oficială de Node.js
FROM node:14

# Setăm directorul de lucru
WORKDIR /app

# Copiem fișierele package.json și package-lock.json
COPY package*.json /app/

# Instalăm dependințele
RUN npm install

# Copiem restul codului sursă
COPY . /app/

# Construim aplicația React
RUN npm run build

# Expunem portul pe care rulează serverul de dezvoltare
EXPOSE 3000

# Comanda de rulare a serverului de dezvoltare React
CMD ["npm", "start"]
