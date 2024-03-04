# CoinTrack
---
Простое фул-стек приложение для контроля доходов и расходов.
Использовал:
- pnpm монорепозиторий
- Next.js
- Nest.js
- MySQL
- bcrypt
- TypeORM
- jwt-аутентификация
фронтэнд элементарный, было интересно разобраться в бекенд фреймворке каком-либо
## Требования:
- MySQL 8
- pnpm
- node.js 18.17+
## Установка и запуск:
- выполнить `ddl.sql` в `/backend/ddl.sql` в терминале вашей MySQL
- запустить `pnpm i -r` в корне проекта
- создать файлы `.env` в каталогах `/backend` и `/frontend` по подобию находящихся там `.env.example`
- для запуска фронта: 
  - `cd ./frontend/ && pnpm run dev`
- для запуска бекенда:
  - `cd ./backend/ && pnpm run start:dev` или `cd ./backend/ && pnpm run start:debug` для режима отладки
