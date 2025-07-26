# 🛒 Shopping Assistant Chatbot (Groq + MongoDB + Docker)

A full-stack chatbot project that integrates:

- **Express.js backend** with Groq LLM
- **Vite-powered frontend** for the chat UI
- **MongoDB** for session and product data
- Fully containerized using **Docker + docker-compose**

---

## 🔧 Features

- Chatbot powered by Groq (e.g., LLaMA 3)
- Clarifies user intent before querying
- Structured actions for DB queries
- MongoDB for:

  - User sessions
  - Messages
  - Orders, products, inventory, etc.

- Modular codebase with Docker orchestration

---

## ✨ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/shopping-assistant.git
cd shopping-assistant
```

### 2. Create `.env` File (in root)

```env
GROQ_API_KEY=your-groq-api-key
```

---

## 🐳 Running Locally with Docker

Ensure Docker and docker-compose are installed.

```bash
docker-compose up --build
```

This will start:

- MongoDB on `localhost:27017`
- Backend API on `localhost:5000`
- Frontend (Vite) on `localhost:5173`

---

## 📂 Project Structure

```bash
your-project/
├── backend/            # Express server + Groq integration
│   └── Dockerfile      # Named "Dockerfile"
├── frontend/           # Vite-powered UI
│   └── Dockerfile      # Named "Dockerfile"
├── docker-compose.yml
├── .env
└── README.md
```

> ✅ Dockerfiles **must be named `Dockerfile`** (no extension) and placed in each service directory.

---

## 🕹️ API Endpoints

### Chat

- `POST /chat` — Send user message, receive assistant reply

### Sessions

- `GET /sessions/:userId` — Get all sessions by user
- `POST /sessions` — Create a new session

> All messages are linked to a `sessionId` to maintain context.

---

## 🗃️ Loading Sample Data

If you want to import CSVs into MongoDB:

```bash
docker exec -it chatbot-backend sh
node scripts/load_data.js
```

Make sure your CSV files are in `backend/data/`.

---

## ⚖️ Environment Variables

Add these in your `.env`:

```env
GROQ_API_KEY=your-groq-api-key
GROQ_MODEL=llama-3-1-8b-instant
```

The backend uses `MONGO_URI=mongodb://mongo:27017/chatbot` internally.

---

## 🚀 Deployment Notes

- You can mount local volumes if you want hot reload in development
- For production, update the Dockerfiles to install only `prodDependencies`

---

## 🔄 Quick Rebuild

```bash
docker-compose down -v
docker-compose up --build
```

---

You're all set to run your own intelligent shopping chatbot! 🚀
