FROM node:10-slim

COPY . /api_user

WORKDIR /api_user

RUN npm install --production

EXPOSE 4001

CMD npm run start