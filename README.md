## Установка и запуск проекта

### 1. Клонирование репозитория

Откройте терминал и выполните команду:
```
git clone https://github.com/vorogurcov/Anekdoty.git
cd <имя_репозитория>
```

### 2. Установка зависимостей backend
```
cd backend
npm install
```

### 3. Создание БД с анекдотами(если уже не создана) 
Создать бд, данные подключения к которой потом заполняются в .env

### 4. Создание .env файла
Требуется сделать .env файл следующей структуры:
```env
PORT = 3000
DB_PORT = 5432
DB_HOST = 'localhost'
DB_USERNAME = 'postgres'
DB_PASSWORD = 'password'
DB_DATABASE = 'dbnane'
DB_TYPE = 'postgres'
JWT_SECRET_KEY = 'MY_SECRET_KEY'
JWT_REFRESH_SECRET_KEY = 'MY_REFRESH_KEY'
```
### 5. Запуск backend части
```
npm start
```
### 6. Скачивание анекдотов(если уже не скачены)
Запрос на host:port/anekdotScrapper/scrap
Заполняет бд
### 7. Тестовые запросы на Postman
https://www.postman.com/spaceflight-geologist-43185237/anekdotwebsite/overview
