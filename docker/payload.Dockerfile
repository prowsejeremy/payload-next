FROM node:20-alpine as base

FROM base as builder

WORKDIR /home/node/app/payload
COPY package.json yarn.lock ./

COPY . .
RUN yarn install
RUN yarn build

FROM base as runtime

ENV NODE_ENV=production
ENV PAYLOAD_CONFIG_PATH=dist/payload.config.js

WORKDIR /home/node/app/payload
COPY package*.json  ./
COPY yarn.lock ./

RUN yarn install --production
COPY --from=builder /home/node/app/payload/dist ./dist
COPY --from=builder /home/node/app/payload/build ./build

EXPOSE 5000

# If migrations are needed
RUN yarn migrate

CMD ["node", "dist/server.js"]
