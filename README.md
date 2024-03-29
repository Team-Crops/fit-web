# fit-web

## Project setup

### Install dependencies

```sh
yarn
```

### If you want to run the development environment

```sh
docker compose up --build
```

or

```sh
yarn run dev
```

### If you want to run the production environment

```sh
docker build -t fit-web .
docker run -p 3000:3000 fit-web
```

or

```sh
yarn run build
yarn run start
```
