FROM node:8.11.2

WORKDIR /app
COPY . /app

EXPOSE 3005

ENV NODE_ENV production
ENTRYPOINT ["node", "server.js"]
