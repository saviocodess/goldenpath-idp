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

EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 CMD wget -qO- http://127.0.0.1:3000/health >/dev/null || exit 1
CMD ["node", "dist/server.js"]
