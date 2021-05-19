# syntax=docker/dockerfile:1

FROM node

WORKDIR /app

COPY ["package.json", "package-lock.json", "./"]
RUN npm install
RUN npm install -g serve
COPY . .
RUN npm run build
CMD ["serve", "-s", "build"]