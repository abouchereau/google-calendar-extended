FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm config set strict-ssl false && npm config set registry http://registry.npmjs.org/  && npm install

COPY src ./src
COPY data ./data
COPY .github ./.github

EXPOSE 3615

CMD ["npm", "run", "back"]