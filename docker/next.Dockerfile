FROM node:20-alpine AS base

FROM base AS deps
RUN apk add --no-cache libc6-compat

WORKDIR /home/node/app/next
COPY package.json yarn.lock ./ 

RUN yarn install

FROM base AS builder
WORKDIR /home/node/app/next
COPY --from=deps /home/node/app/next/node_modules ./node_modules
COPY . .

RUN yarn build

FROM base AS runner
WORKDIR /home/node/app/next

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /home/node/app/next/next.config.js ./
COPY --from=builder /home/node/app/next/public ./public
COPY --from=builder /home/node/app/next/package.json ./package.json

COPY --from=builder --chown=nextjs:nodejs /home/node/app/next/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /home/node/app/next/.next/static ./.next/static

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]
