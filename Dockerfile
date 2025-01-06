FROM node:latest

WORKDIR /usr/app

COPY . .

RUN npm install -g @angular/cli

RUN npm install

# EXPOSE 4200

CMD ["ng", "serve", "--host", "0.0.0.0"]

# FROM nginx:alpine

# COPY --from=node /app/dist/medium /usr/share/nginx/html

# docker build -t lukapendelj/kviz-app .
# docker run -p 3000:3000 lukapendelj/kviz-app