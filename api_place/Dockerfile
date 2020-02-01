FROM node:10-slim

COPY . /api_place

WORKDIR /api_place

RUN npm install --production

EXPOSE 4001

CMD npm run start