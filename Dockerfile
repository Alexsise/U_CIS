FROM node:18-alpine3.14

WORKDIR /u_cis

COPY package*.json ./

RUN npm install -f

COPY . .

CMD ["npm", "run", "full_start"]