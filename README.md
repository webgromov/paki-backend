# Support Desk API

Backend сервиса чата технической поддержки.

REST API + realtime через Centrifugo для двух сценариев:

- клиент открывает обращение, отправляет сообщения и закрывает диалог;
- оператор просматривает обращения, отвечает клиенту и меняет статус диалога.

Фронтенд лежит в соседнем репозитории `../paki-paki-test`.

## Стек

- Node.js LTS;
- NestJS 11;
- Prisma 7;
- PostgreSQL 16;
- Centrifugo v6;
- Swagger (OpenAPI).

## Быстрый запуск локально

Требуется Node.js LTS, pnpm и Docker.

1. Скопируйте переменные окружения:

   ```bash
   cp .env.example .env
   ```

2. Поднимите PostgreSQL и Centrifugo:

   ```bash
   docker compose up -d
   ```

3. Установите зависимости и примените миграции (сгенерирует и Prisma Client):

   ```bash
   pnpm install
   pnpm exec prisma migrate deploy
   ```

4. Запустите API в watch-режиме:

   ```bash
   pnpm start:dev
   ```

API поднимется на [http://localhost:3001](http://localhost:3001), Swagger — на
[http://localhost:3001/docs](http://localhost:3001/docs) (JSON — `/docs-json`).

Centrifugo слушает `ws://localhost:8000/connection/websocket`.

> Чтобы поднять весь стек, запустите этот backend, а затем frontend из
> `../paki-paki-test` (`pnpm dev`, порт 3000). Frontend по умолчанию ходит на
> `http://localhost:3001` и подключается к Centrifugo по токену из
> `POST /realtime/token`.

## Переменные окружения

| Переменная | Назначение | Значение по умолчанию |
| --- | --- | --- |
| `DATABASE_URL` | Подключение Prisma к PostgreSQL | `postgresql://paki:paki@localhost:5432/paki_support?schema=public` |
| `PORT` | Порт HTTP API | `3001` |
| `CORS_ORIGIN` | Разрешённый origin фронтенда | `http://localhost:3000` |
| `CENTRIFUGO_URL` | HTTP API Centrifugo (publish) | `http://localhost:8000` |
| `CENTRIFUGO_WS_URL` | WebSocket-адрес для клиентов | `ws://localhost:8000/connection/websocket` |
| `CENTRIFUGO_API_KEY` | Ключ HTTP API Centrifugo | `dev_centrifugo_api_key` |
| `CENTRIFUGO_TOKEN_SECRET` | HMAC-секрет для connection-токенов | `dev_centrifugo_token_secret` |

`CENTRIFUGO_TOKEN_SECRET` и `CENTRIFUGO_API_KEY` продублированы в
`infra/centrifugo/config.json`. В продакшене вынесите их в секреты и не
коммитьте dev-значения.

## REST API

| Метод | Путь | Описание |
| --- | --- | --- |
| `POST` | `/dialogs` | Создать обращение |
| `GET` | `/dialogs` | Список обращений (последнее сообщение, сортировка по `updatedAt`) |
| `GET` | `/dialogs/:id` | Обращение по id |
| `PATCH` | `/dialogs/:id/status` | Сменить статус (`open` / `resolved`) |
| `GET` | `/dialogs/:dialogId/messages` | Сообщения обращения |
| `POST` | `/dialogs/:dialogId/messages` | Отправить сообщение |
| `POST` | `/realtime/token` | Получить токен и URL для Centrifugo |

## Realtime (Centrifugo)

Backend публикует события в каналы через HTTP API Centrifugo:

- `dialog:{id}` — `message.created` (новое сообщение) и `dialog.updated` (смена статуса);
- `operator:dialogs` — `dialog.created` и `dialog.updated` для списка обращений оператора.

Каналы используют namespace (часть до `:`), поэтому `dialog` и `operator`
объявлены в `infra/centrifugo/config.json`. Без этого publish/subscribe
возвращают ошибку `102 unknown channel`.

## Тесты

```bash
pnpm test
pnpm test:e2e
```
