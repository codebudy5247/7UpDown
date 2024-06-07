> 7 Up Down

# How to run this app:

### BACKEND
```
# cd backend
# npm install
# create .env file

NODE_ENV=development
PORT=1337
ORIGIN=http://localhost:5173
POSTGRES_HOST=127.0.0.1
POSTGRES_PORT=6500
POSTGRES_USER=postgres
POSTGRES_PASSWORD=password123
POSTGRES_DB=game-db
DATABASE_URL=postgresql://postgres:password123@localhost:6500/game-db?schema=public
PGADMIN_DEFAULT_EMAIL=admin@admin.com
PGADMIN_DEFAULT_PASSWORD=password123
JWT_SECRET=secret


# docker compose up -d {Run postgresQL instance on docker container}
# npx prisma migrate dev
# npm run dev

```

### FRONTEND

```
cd frontend
npm install
npm run dev
```
