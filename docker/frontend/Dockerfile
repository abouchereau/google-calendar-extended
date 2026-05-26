FROM node:20

WORKDIR /app

RUN npm config set strict-ssl false

COPY package*.json ./
RUN npm install http-server

COPY public ./public

EXPOSE 8000

CMD ["npx", "http-server", "public", "-p", "8000"]