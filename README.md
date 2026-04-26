# 💸 SPENDWISE

> A full-stack expense tracking application with real-time group expense management, JWT authentication, and Google OAuth.

---

## 🚀 Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | Node.js, Express.js |
| Database | PostgreSQL |
| ORM | Prisma |
| Auth | JWT, Google OAuth 2.0 (Passport.js) |
| Runtime | Node.js |

---

## ✨ Features

- 🔐 **JWT & Google OAuth Authentication** — Secure login with token-based sessions and Google sign-in
- 💰 **Expense Tracking** — Record, categorize, and manage personal expenses
- 🗂️ **Filter & Sort** — Filter transactions by category, type, and date
- 👥 **Group Management** — Create groups and track shared expenses
- 📊 **Real-time Balances** — View up-to-date balance summaries across all categories
- 🛡️ **Middleware Protection** — Route-level auth guards and request validation

---

## 📁 Project Structure

```
SPENDWISE/
├── CONFIG/
│   ├── passport.js          # Google OAuth strategy
│   └── validation.js        # Request validation schemas
├── CONTROLLERS/
│   ├── expenseController.js
│   ├── groupcontroller.js
│   └── usercontroller.js
├── ROUTES/
│   ├── expenseRoutes.js
│   ├── googleAuth.js
│   ├── groupRoutes.js
│   └── userRoutes.js
├── middlewares/
│   ├── auth.js              # JWT verification
│   └── checking.js
├── services/
│   └── tokenRelated.js      # Token generation & refresh
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── app.js
└── .env                     # (gitignored)
```

---

## ⚙️ Setup & Installation

```bash
# Clone the repo
git clone https://github.com/Krishna-Vitthal/SPENDWISE.git
cd SPENDWISE

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
# Fill in your values

# Run database migrations
npx prisma migrate dev

# Start the server
node app.js
```

---

## 🔑 Environment Variables

Create a `.env` file in the root with the following:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/spendwise
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
SESSION_SECRET=your_session_secret
PORT=3000
```

---

## 📡 API Overview

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/users/register` | Register a new user |
| POST | `/api/users/login` | Login with JWT |
| GET | `/auth/google` | Google OAuth login |
| GET | `/api/expenses` | Get all expenses |
| POST | `/api/expenses` | Add a new expense |
| GET | `/api/groups` | Get all groups |
| POST | `/api/groups` | Create a group |

---

## 🔮 Roadmap

Here's what's planned next for SPENDWISE:

### ⚡ Real-time Notifications with Socket.IO
When a group member updates or adds an expense, every member of the group will be notified **instantly** — no refresh needed. Built with Socket.IO for persistent WebSocket connections.

### 🧠 Caching with Redis
Frequently accessed data like user balances, group summaries, and expense feeds will be cached with **Redis** to reduce DB load and speed up responses significantly.

### 📨 Message Queues (BullMQ / Kafka)
For heavy operations like sending notifications, processing bulk expense imports, or generating reports — a message queue (BullMQ or Kafka) will handle async job processing to keep the API non-blocking and resilient.

### 🔁 Process Management with PM2
The app will be managed with **PM2** in production for zero-downtime restarts, clustering across CPU cores, and built-in log management.

---

## 👨‍💻 Author

**Vitthal Krishna**
- GitHub: [@Krishna-Vitthal](https://github.com/Krishna-Vitthal)
- B.Tech CSE (Systems Engineering) — KIIT University

---

> ⭐ Star this repo if you find it useful!
