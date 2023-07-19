FROM node:18

RUN npm install -g http-server

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .

RUN npm run build

EXPOSE 8090
WORKDIR /usr/src/app/dist

CMD ["http-server", "--cors", "-p8090" ]