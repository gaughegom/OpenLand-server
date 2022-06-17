FROM node:16-alpine
RUN apk add --no-cache python3 g++ make
WORKDIR /app
COPY . /app
RUN npm install
CMD ["npm", "start"]