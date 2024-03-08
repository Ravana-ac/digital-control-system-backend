FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

ENV REDIS_SERVER='redis://149.28.148.239:6379'
ENV PORT=5000

CMD ["node", "index.js"]
