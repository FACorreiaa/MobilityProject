FROM node:10-slim

COPY . /api_dash

WORKDIR /api_dash

RUN npm install --production

EXPOSE 4001

CMD npm run start