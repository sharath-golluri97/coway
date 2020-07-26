FROM node:10.16-alpine

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
RUN mkdir -p /home/node/app/public
# set working directory
WORKDIR /home/node/app

# install server packages
COPY package*.json ./
COPY server.js ./
COPY build build

RUN npm set progress=false && npm install
# RUN npm run build

# copy server files
COPY src src
COPY .env .

EXPOSE 3000
EXPOSE 8080

CMD [ "node", "server.js"]