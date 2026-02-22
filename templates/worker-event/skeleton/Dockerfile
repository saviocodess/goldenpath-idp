# syntax=docker/dockerfile:1.7
FROM node:22-alpine AS build
WORKDIR /app

COPY package.json yarn.lock* ./
RUN corepack enable && \
  if [ -f yarn.lock ]; then \
    yarn_major="$(yarn --version | cut -d. -f1)" && \
    if [ "${yarn_major}" -ge 2 ]; then yarn install --immutable; else yarn install --frozen-lockfile; fi; \
  else \
    yarn install; \
  fi

COPY . .
RUN yarn build

FROM node:22-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production

COPY --from=build /app /app
USER node

CMD ["node", "dist/worker.js"]
