FROM node:18-alpine3.17 as base

COPY package.json ./
COPY package-lock.json ./
ARG NPM_TOKEN
RUN echo //registry.npmjs.org/:_authToken=${NPM_TOKEN} > .npmrc
RUN ["npm", "ci", "--ignore-scripts"]
RUN rm -f .npmrc

COPY . .

RUN ["npm", "run", "build"]


FROM alpine:3.14 as web
COPY --from=base /build /build
COPY ./docker-entrypoint.sh /docker-entrypoint.sh
RUN apk add nginx
COPY nginx.config /etc/nginx/http.d/default.conf
CMD /docker-entrypoint.sh
