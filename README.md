## Backendni ishga tushirish

### 1. Dependencylarni o‘rnatish

```bash
cd backend
npm install
```

### 2. .env faylini sozlash

`.env.example` faylidan nusxa olib `.env` yarating.

Misol:

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/user_management"
JWT_SECRET="secret_key"
JWT_EXPIRES_IN="24h"
PORT=3000
```

### 3. Migratsiyalarni ishga tushirish

```bash
npx prisma generate
npx prisma migrate dev
```

### 4. Seed ma'lumotlarini yaratish

```bash
npm run seed
```

### 5. Serverni ishga tushirish

Development:

```bash
npm run dev
```

---

## Frontendni ishga tushirish

### 1. Dependencylarni o‘rnatish

```bash
cd frontend
npm install
```

### 2. Development serverni ishga tushirish

```bash
npm run dev
```

### 3. Build qilish

```bash
npm run build
```

## Docker orqali ishga tushirish


```bash
docker compose up --build
```
