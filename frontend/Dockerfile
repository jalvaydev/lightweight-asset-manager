# syntax=docker/dockerfile:1

# should i just grab the build from my system, or from the below?
# build
FROM node:alpine as build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# production
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]