# WhyLayer Backend Setup Guide

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v16+) - [Download](https://nodejs.org/)
- **MongoDB** - [Install locally](https://docs.mongodb.com/manual/installation/) or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (Free)

### Installation

#### 1. Install Dependencies

```bash
cd server
npm install
```

#### 2. Setup MongoDB

**Option A: Local MongoDB**
```bash
# Install MongoDB Community Edition
# Then start the MongoDB service
mongod  # On Linux/Mac
# or start MongoDB from Services (Windows)
```

**Option B: MongoDB Atlas (Cloud)**
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a cluster
4. Get your connection string: `mongodb+srv://user:password@cluster.mongodb.net/whylayer`
5. Update `server/.env` with your connection string

#### 3. Configure Environment Variables

Edit `server/.env`:
```
MONGO_URI=mongodb://localhost:27017/whylayer
PORT=3001
GEMINI_API_KEY=your_api_key_here
NODE_ENV=development
```

#### 4. Start Backend Server

```bash
npm start
# or for development with auto-reload:
npm run dev
```

You should see:
```
✅ Connected to MongoDB
🚀 WhyLayer Backend running on http://localhost:3001
```

### 5. Update Frontend API URL (Optional)

If backend is on a different URL, update in `index.html` console:
```javascript
localStorage.setItem('api_base_url', 'http://your-backend-url:3001/api');
```

---

## 📡 API Endpoints

### Logs
- `GET /api/logs` - Get all logs
- `GET /api/logs/:service` - Get logs for specific service
- `POST /api/logs` - Create new log entry

### Health
- `GET /api/health` - Get system health summary

### Analysis
- `GET /api/analysis` - Get latest analysis
- `POST /api/analysis` - Create new analysis
- `GET /api/analysis/:id` - Get specific analysis

### Health Check
- `GET /api/health-check` - Backend status

---

## 🔧 Data Seeding (Optional)

To seed initial data, add this to `server/server.js`:

```javascript
// After MongoDB connection
if (process.env.NODE_ENV === 'development') {
  const seedData = require('./seed');
  seedData();
}
```

---

## 🐛 Troubleshooting

### Connection Refused (ECONNREFUSED:27017)
MongoDB is not running
```bash
mongod  # Start MongoDB
```

### CORS Error
Update frontend API calls to use `/api` routes from same origin

### Module Not Found
```bash
cd server && npm install
```

---

## 📦 Project Structure

```
server/
├── server.js          # Express app entry
├── package.json       # Dependencies
├── .env              # Environment variables
├── models/           # MongoDB schemas
│   ├── Log.js        # Log model
│   └── Analysis.js   # Analysis model
└── routes/           # API endpoints
    ├── logs.js       # Log routes
    └── analysis.js   # Analysis routes
```

---

## ✅ Next Steps

1. Frontend is already configured to use backend
2. Navigate to Dashboard and logs should load from MongoDB
3. Use the Console tab to test API endpoints
4. Add more seeds for realistic data

Happy monitoring! 🚀
