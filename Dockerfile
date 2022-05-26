FROM node:12.13-alpine

WORKDIR /U

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "run", "full_start"]