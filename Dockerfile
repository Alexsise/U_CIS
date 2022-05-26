FROM node:12.13-alpine

WORKDIR /u_cis

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "run", "full_start"]