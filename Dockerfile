FROM node:16-alpine

EXPOSE 5000
EXPOSE 4433

RUN apk add --no-cache python3 g++ make
WORKDIR /app
COPY . /app
RUN npm install

CMD ["npm", "start"]