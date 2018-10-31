FROM node:8.9-alpine
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install npm-run-all && npm install --silent
COPY . .
EXPOSE 3000
CMD npm start