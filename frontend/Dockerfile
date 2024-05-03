FROM --platform=linux/amd64 node:20
# FROM  node:20

WORKDIR /app
COPY . .

RUN npm install

CMD ["npm", "run", "production"]