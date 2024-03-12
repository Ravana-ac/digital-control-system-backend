FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY ./src .

EXPOSE 5000

ARG A_REDIS_SERVER
ARG A_PORT
ARG A_MONGODB_CONN_STRING
ARG A_JWT_SECRET

ENV REDIS_SERVER=${A_REDIS_SERVER}
ENV PORT=${A_PORT}
ENV MONGODB_CONN_STRING=${A_MONGODB_CONN_STRING}
ENV JWT_SECRET=${A_JWT_SECRET}

CMD ["node", "server.js"]
