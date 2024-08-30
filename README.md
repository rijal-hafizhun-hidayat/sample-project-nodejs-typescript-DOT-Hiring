### sample app nodejs + typescript

## About

this is sample app cloning from `jsonplaceholder` using nodejs + typescript to hiring position back-end developer, please checkout the original [jsonplaceholder](https://jsonplaceholder.typicode.com/)

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
note:
<em>
you must run migration data users first because data posts has relation many to one users
</em>

- Run route `/api/migration-users` to migrate fake data users
- Run route `/api/migration-posts` to migrate fake data posts

## resource

#### ORM

- /api/comments
- /api/posts
- /api/albums
- /api/todos
- /api/photos

#### AXIOS 

- /api/comments-api
- /api/posts-api
- /api/albums-api
- /api/todos-api
- /api/photos-api
