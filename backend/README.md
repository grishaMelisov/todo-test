## Project setup

```bash
$ yarn install
```

Ставим postgress
Создаем бд

```bash
$ createdb todo-db
```

в .env подключаем нашу бд

DATABASE*URL="postgresql://[имя*пользователя]:[ваш_пароль]@localhost:5432/todo-db?schema=public"
PS: если запускаете на локальной машине, то по дефолту порт должен быть "5432" и пароль по идее
если ничего не менял в pg_hba.conf, то localhost должен быть настроен как trust поэтому пароль любой,
но если нет - то вводите свой пароль

Пушим модель в

```bash
$ npx prisma migrate dev --name init
```

## Compile and run the project

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```
