FROM node:alpine

WORKDIR /app
COPY package.json .

RUN apk add --no-cache git
RUN npm install -g pnpm

RUN pnpm install

COPY . .

CMD ["pnpm", "start"]