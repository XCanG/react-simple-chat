React Simple Chat App
====

Серверная часть/бэкэнд находится в `/backend`, клиентская часть/фронтэнд находится в `/frontend`.

Установка
----

Для установки зависимостей потребуется Node.JS

Запустить команду в подпапках бэкэнда и фронтэнда:
```
npm install
```

Запуск
----

Бэкэнд:
```
npm start
```

Фронтэнд либо запустить в виде девелоперского сервера
```
npm start
```
либо сделать билд и запустить как статичный вебсервер, например с помощью `serve` (`npm install -g serve`):
```
npm build
serve -s build
```

React запустит сервер по адресу http://localhost:3000/ , `serve` же по адресу http://localhost:5000/
Бэкэнд расположен на порту 8080.
