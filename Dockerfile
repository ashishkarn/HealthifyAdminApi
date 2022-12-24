FROM node:18.12.1
ENV DEBIAN_FRONTEND noninteractive
WORKDIR /usr/src/app
COPY . .
RUN npm install
RUN npm run compile
CMD npm run start