
FROM node:18-alpine

WORKDIR /usr/src/

COPY package*.json ./

RUN npm install

COPY . ./usr/src

EXPOSE 4002

RUN npx prisma generate

CMD [ "npm", "run", "dev:docker" ]
