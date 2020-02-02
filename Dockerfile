FROM node:10-slim

RUN cd /server
COPY . /app

WORKDIR /app

RUN npm install --production

#EXPOSE 4001

CMD npm run start