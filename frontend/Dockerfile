FROM node:14-alpine AS build

RUN npm install -g @angular/cli

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .


RUN npm run build --prod

FROM nginx:latest AS ngi

COPY --from=build /app/dist/angular-travel /usr/share/nginx/html
COPY nginx.conf  /etc/nginx/conf.d/default.conf

EXPOSE 80
