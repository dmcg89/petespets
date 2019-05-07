FROM node:latest

RUN mkdir -p /usr/src/petes-pets
WORKDIR /usr/src/petes-pets

COPY package*.json /usr/src/petes-pets/
RUN npm install
COPY . /usr/src/petes-pets

EXPOSE 3000

# Launch the wait tool, then your application.
# Source: https://dev.to/hugodias/wait-for-mongodb-to-start-on-docker-3h8b
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait
CMD /wait && npm start
