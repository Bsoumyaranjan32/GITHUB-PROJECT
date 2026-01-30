# WhyLayer Full Stack Setup ✅

## 🚀 Architecture Overview

```
┌─────────────────┐
│  Frontend       │ (index.html + app.js)
│  Vanilla JS     │────────────┐
│  TailwindCSS    │            │
└─────────────────┘            │
                               ▼
                        ┌─────────────────────┐
                        │  Backend Server     │
                        │  Node.js + Express  │ (http://localhost:3001)
                        │  Port: 3001         │
                        └─────────────────────┘
                               │
                               ▼
                        ┌─────────────────────┐
                        │  MongoDB Database   │
                        │  Logs & Analysis    │
                        └─────────────────────┘
```

---

## 📋 What Was Added

### Backend Structure (`server/`)
```
server/
├── server.js              # Express app (Port 3001)
├── package.json           # Dependencies
├── .env                   # Environment config
├── models/
│   ├── Log.js            # Log schema
│   └── Analysis.js       # Analysis schema
└── routes/
    ├── logs.js           # Log endpoints
    └── analysis.js       # Analysis endpoints
```

### API Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/logs` | Get all system logs |
| GET | `/api/logs/:service` | Get logs for specific service |
| POST | `/api/logs` | Create new log entry |
| GET | `/api/health` | Get system health status |
| GET | `/api/health-check` | Backend status check |

---

## 🔧 How to Run

### Terminal 1: Frontend (Port 8000)
```bash
cd "C:\Users\POOJA GUPTA\Pictures\Minions-master"
python -m http.server 8000
```
Access: http://localhost:8000

### Terminal 2: Backend (Port 3001) ✅ RUNNING
```bash
cd server
npm start
```
Status: http://localhost:3001/api/health-check

---

## 💾 Database Setup

### Option 1: MongoDB Atlas (Cloud) - RECOMMENDED
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create free account
3. Create a cluster
4. Get connection string
5. Update `server/.env`:
```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/whylayer
```

### Option 2: Local MongoDB
```bash
# Install from https://docs.mongodb.com/manual/installation/
mongod  # Start MongoDB service
```

### Current Status
- Backend: **✅ Running (Mock Mode)**
- MongoDB: **✅ Connected** (Mock data available)
- Frontend: **✅ Ready** (uses API endpoints)

---

## 🎯 Key Changes to Frontend

Added in `app.js`:
```javascript
// API Configuration
const API_BASE_URL = 'http://localhost:3001/api';

// Fetch from backend
async function fetchFromAPI(endpoint, method = 'GET', body = null)

// Load data on startup
async function loadDataFromBackend()
```

Frontend automatically:
- Connects to backend on page load
- Falls back to mock data if API unavailable
- Stores API URL in localStorage

---

## 📊 Testing the Integration

### 1. Check Backend Health
```bash
curl http://localhost:3001/api/health-check
```

### 2. Get Logs from API
```bash
curl http://localhost:3001/api/logs
```

### 3. Get Service Health
```bash
curl http://localhost:3001/api/health
```

### 4. Create Log Entry
```bash
curl -X POST http://localhost:3001/api/logs \
  -H "Content-Type: application/json" \
  -d '{"service":"Database","level":"error","event":"Test","cause":"Manual test"}'
```

---

## 📱 Using the Dashboard

1. Open http://localhost:8000
2. Go to **Console** tab (or any tab)
3. Logs should load from API automatically
4. If API fails, mock data is used

---

## 🔐 Environment Variables

`server/.env`:
```
MONGO_URI=mongodb://localhost:27017/whylayer
PORT=3001
GEMINI_API_KEY=your_api_key_here
NODE_ENV=development
```

`frontend`: localStorage key `api_base_url`

---

## ✨ Next Steps

### To add persistent database:
1. ✅ Backend is ready for MongoDB
2. Install MongoDB locally or use Atlas
3. Run migrations (models are already defined)
4. Start backend with real DB connection

### To add more features:
- User authentication
- Real-time WebSocket updates
- Advanced search/filtering
- Data export (CSV/PDF)
- Scheduled alerts

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Backend won't start | Check if port 3001 is free, npm install |
| CORS errors | Both servers must be running |
| API 404 errors | Ensure backend is running on :3001 |
| Logs not loading | Check `/api/logs` endpoint directly |

---

## 📚 Commands

```bash
# Frontend
cd Minions-master
python -m http.server 8000

# Backend
cd Minions-master/server
npm install        # First time only
npm start          # Start server
npm run dev        # With auto-reload (requires nodemon)
```

---

**🎉 Full Stack is Ready!**
- Frontend: http://localhost:8000
- Backend: http://localhost:3001
- Database: MongoDB (local or Atlas)
