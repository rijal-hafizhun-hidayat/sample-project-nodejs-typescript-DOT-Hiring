### sample app nodejs + typescript

## About

this is sample app `jsonplaceholder` using nodejs + typescript cloning for hiring position back-end developer, please checkout the original [jsonplaceholder](https://jsonplaceholder.typicode.com/)

## Set up

- Create file `.env` and fill the configuration
- Run `npm install` to install nodejs dependencies
- Run `npx prisma db push` to migrate schema prisma database
- Run `npx prisma generate` to create type prisma

## Configuration env

```ini
# This line is ignored since it's a comment
PORT=3000
DATABASE_URL="postgresql://postgres:password@localhost:5432/typscript-app"
```

## Run

- Run `npm run serve` to run the application at `http://localhost:3000`

## Migrate fake data

- Run route `/api/users-api` to migrate fake data users
