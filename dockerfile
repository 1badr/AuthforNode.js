FROM node:20.5.1-alpine

WORKDIR /app 
COPY package*.json .

RUN npm install --force
EXPOSE 4000
CMD ["node" , "app.js"]
