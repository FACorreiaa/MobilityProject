FROM node:10-slim

COPY . /app

WORKDIR /app/server

RUN npm install --production

#EXPOSE 4001

CMD npm run start