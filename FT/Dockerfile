FROM node:20-alpine

WORKDIR /app

COPY angular/package*.json ./
RUN npm install

COPY angular ./

EXPOSE 4200
CMD ["npx", "ng", "serve", "--host", "0.0.0.0", "--port", "4200"]
#CMD ["npm", "start"]

