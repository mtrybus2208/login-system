# Login system

## Run DB and app containers

`npm run docker:dev`

## Run app in production mode

`npm run docker:prod`

## Rebuild images (run the following command after npm pkg update)

`npm run docker:dev-rebuild`

## Run only DB container

`npm run docker:db`

## Removes containers, networks abd volumes

`npm run docker:down`

## DB migrations

create: `typeorm migration:create -n migrationName -d src/migrations`
run : `npm migration:run` or `npm migration:prod:run`
revert : `npm migration:revert` or `npm migration:prod:revert`

## Production url

`https://login-system-nest.herokuapp.com/`
