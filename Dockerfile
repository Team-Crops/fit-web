FROM node:21-alpine
WORKDIR /app

RUN apk add --no-cache libc6-compat

COPY .yarn/releases ./.yarn/releases
COPY package.json yarn.lock .yarnrc.yml ./

COPY next.config.js tsconfig.json ./
COPY ./public ./public
COPY ./src ./src

RUN yarn install --immutable
RUN yarn run build

EXPOSE 80
EXPOSE 443
EXPOSE 3000

CMD ["yarn", "start"]
