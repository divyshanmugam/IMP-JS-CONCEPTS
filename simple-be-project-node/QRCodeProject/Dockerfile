FROM node:24.18.0

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY server.js ./

EXPOSE 3000

CMD ["node", "server.js"]
