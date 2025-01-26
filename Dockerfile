FROM node:22.4.1-slim

WORKDIR /app

COPY package.json pnpm-lock.yaml* ./

RUN corepack enable && corepack prepare && \
    pnpm i

COPY . .

RUN pnpm build

EXPOSE 3000

CMD ["pnpm", "start"]
