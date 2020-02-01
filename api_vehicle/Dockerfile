FROM node:10-slim

COPY . /api_vehicle

WORKDIR /api_vehicle

RUN npm install --production

EXPOSE 4001

CMD npm run start