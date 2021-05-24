# syntax=docker/dockerfile:1

# build the node image
FROM node:alpine as build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# grab build from node image, run using nginx
FROM nginx
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=build /app/build .
COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf
CMD nginx -g 'daemon off;'