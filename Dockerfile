FROM node:16.16-alpine

WORKDIR /u_cis

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "run", "start"]