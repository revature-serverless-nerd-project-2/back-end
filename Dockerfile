FROM node:16

WORKDIR /

COPY . .

RUN npm install

EXPOSE 8080

ENTRYPOINT ["node", "index.js"]