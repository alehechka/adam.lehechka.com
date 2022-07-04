FROM node:alpine as node-builder

WORKDIR /app
COPY . ./

RUN yarn install --prefer-offline --frozen-lockfile

RUN yarn build

# Cleanup Node Modules
RUN yarn install --production --ignore-scripts --prefer-offline

# Production image, copy all the files and run next
FROM node:alpine
WORKDIR /app

ENV NODE_ENV production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# You only need to copy next.config.js if you are NOT using the default configuration
# COPY --from=builder /app/next.config.js ./
COPY --from=node-builder /app/public ./public
COPY --from=node-builder /app/.next ./.next
COPY --from=node-builder /app/node_modules ./node_modules
COPY --from=node-builder /app/package.json ./package.json

USER nextjs

ENV PORT 80
EXPOSE 80

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry.
ENV NEXT_TELEMETRY_DISABLED 1

CMD ["node_modules/.bin/next", "start"]