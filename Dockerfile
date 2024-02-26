FROM node:21-alpine
WORKDIR /app

RUN apk add --no-cache libc6-compat

COPY .yarn/releases ./.yarn/releases
COPY package.json yarn.lock .yarnrc.yml ./

COPY next.config.js tsconfig.json ./
COPY ./public ./public
COPY ./src ./src

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

RUN chown -R nextjs:nodejs /app
USER nextjs

RUN yarn install --immutable
RUN yarn run build

EXPOSE 3000

CMD ["yarn", "start"]
