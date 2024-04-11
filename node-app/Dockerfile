FROM node:20.12.0-alpine3.19 AS builder

WORKDIR /app
COPY . .
RUN yarn install
RUN yarn build

FROM node:20.12.0-alpine3.19 AS final
WORKDIR /app
COPY --from=builder ./app/dist ./dist
COPY package.json .
COPY yarn.lock .
RUN yarn install --production
CMD [ "yarn", "start" ]
