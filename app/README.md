# Addict app

## Run locally

```shell
yarn
yarn dev
```

## Build

```shell
yarn
yarn build
```

## Docker

### Locally

```
docker build -t . addict
docker run 80:8080 addict -e GITHUB_TOKEN=...
```

### Dockerhub

```
docker run 80:8080 makingsenseinfo/addict:latest -e GITHUB_TOKEN=...
```
