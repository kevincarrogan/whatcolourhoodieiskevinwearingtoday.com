FROM node:10 AS builder
COPY . /app
WORKDIR /app
RUN mkdir config
RUN npm install
RUN npm run build

FROM node
COPY ./server /app
COPY --from=builder /app/public /app/public
COPY --from=builder /app/config /app/config
WORKDIR /app
RUN npm install
CMD ["node", "index.js"]
