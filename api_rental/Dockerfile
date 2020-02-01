FROM node:10-slim

COPY . /api_rental

WORKDIR /api_rental

RUN npm install --production

EXPOSE 4001

CMD npm run start