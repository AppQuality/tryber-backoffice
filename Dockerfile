FROM node:14

ARG NPM_TOKEN  
RUN echo //registry.npmjs.org/:_authToken=${NPM_TOKEN} > .npmrc
COPY package*.json ./

RUN npm install
RUN rm -f .npmrc
RUN apt update
RUN apt install -y nginx
COPY nginx.config /etc/nginx/sites-available/default

COPY . .

RUN npm run build

CMD nginx -g 'daemon off;'
