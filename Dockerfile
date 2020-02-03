FROM node:10-slim

COPY . /app

WORKDIR /app

RUN npm install

#EXPOSE 4001

CMD npm run start