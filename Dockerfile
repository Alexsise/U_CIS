FROM node:18-alpine3.15

WORKDIR /u_cis

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "run", "start"]