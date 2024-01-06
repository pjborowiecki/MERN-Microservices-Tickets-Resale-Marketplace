FROM node:alpine

WORKDIR /app
COPY package.json .

RUN apk add --no-cache git
RUN npm install -g pnpm
RUN pnpm install --omit=dev

COPY . .

CMD ["pnpm", "start"]