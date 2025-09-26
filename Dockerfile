# Stage de base
FROM node:22-slim AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable
FROM base AS build
ENV NODE_ENV=production
COPY . /blm
WORKDIR /blm
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run -r build
RUN pnpm deploy --filter=@blm/shared --prod /packages/shared
RUN pnpm deploy --filter=BLM_BCK --prod /apps/BLM_BCK
RUN pnpm deploy --filter=BLM_BCK_OFFICE --prod /apps/BLM_BCK_OFFICE
RUN pnpm deploy --filter=BLM_FRNTND --prod /apps/BLM_FRNTND
ENV CI=true
RUN pnpm install --frozen-lockfile
EXPOSE 3333 5173 5174
CMD [ "pnpm", "start" ]

