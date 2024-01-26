FROM node:alpine
WORKDIR /app
COPY package.json .
COPY pnpm-lock.yaml .
COPY . .
RUN npm install -g pnpm
RUN pnpm install
CMD ["pnpm", "run", "dev"]

