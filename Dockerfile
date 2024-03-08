FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

ARG A_REDIS_SERVER
ARG A_PORT

ENV REDIS_SERVER=${A_REDIS_SERVER}
ENV PORT=${A_PORT}

CMD ["node", "index.js"]
