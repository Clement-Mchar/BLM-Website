
FROM node:22.16.0-alpine3.22 AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS build
WORKDIR /usr/src/app

COPY . .

RUN pnpm install --frozen-lockfile

RUN pnpm run -r build

RUN pnpm deploy --filter=apps/BLM_BCK --prod /prod/blm_bck

FROM base AS prod-deps
WORKDIR /app
COPY --from=build /prod/blm_bck/package.json ./
RUN pnpm install --prod --frozen-lockfile 

FROM base AS final
WORKDIR /app
ENV NODE_ENV=production

COPY --from=build /usr/src/app/apps/BLM_BCK/build /app
COPY --from=build /usr/src/app/apps/BLM_BCK/node_modules ./node_modules
COPY --from=build /usr/src/app/apps/BLM_BCK/package.json ./package.json
EXPOSE 3333
CMD [ "pnpm", "start" ]
