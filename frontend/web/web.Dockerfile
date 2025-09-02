FROM node:22.19.0-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

COPY .next/standalone ./
COPY .next/static ./.next/static
COPY public ./public