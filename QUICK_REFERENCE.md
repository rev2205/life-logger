# Life Logger - Quick Reference Card

## 🚀 Start Application (3 Commands)

```bash
# Terminal 1: Start MongoDB
net start MongoDB

# Terminal 2: Start Backend
cd life-logger/backend && mvn spring-boot:run

# Terminal 3: Start Frontend
cd life-logger/frontend && npm run dev
```

**Access:** http://localhost:5173

---

## 📱 Main Features

| Feature | Status | Description |
|---------|--------|-------------|
| 📔 Journals | ✅ READY | Daily entries with mood, tags, search |
| 💭 Memories | ✅ READY | Quick moment captures |
| ⭐ Tastes | 🔧 Backend Ready | Track songs, movies, books |
| 📍 Places | 🔧 Backend Ready | Map your experiences |
| 📷 Photos | 🔧 Backend Ready | Photography archive |
| 🌟 Phases | 🔧 Backend Ready | Life period contexts |

---

## 🔑 Default Ports

- **Frontend:** http://localhost:5173
- **Backend:** http://localhost:8080
- **MongoDB:** mongodb://localhost:27017

---

## 📂 Key Files

```
life-logger/
├── README.md                  # Full documentation
├── QUICKSTART.md             # Setup guide
├── IMPLEMENTATION_SUMMARY.md # What's built
├── backend/
│   ├── pom.xml               # Dependencies
│   └── src/main/resources/
│       └── application.properties  # Config
└── frontend/
    ├── package.json          # Dependencies
    └── vite.config.js        # Proxy config
```

---

## 🛠️ Common Commands

### Backend
```bash
# Build
mvn clean install

# Run
mvn spring-boot:run

# Test
mvn test

# Package
mvn clean package
```

### Frontend
```bash
# Install
npm install

# Dev server
npm run dev

# Build
npm run build

# Preview build
npm run preview
```

### MongoDB
```bash
# Start
net start MongoDB

# Stop
net stop MongoDB

# Connect
mongosh

# Backup
mongodump --db=lifelogger --out=./backup

# Restore
mongorestore --db=lifelogger ./backup/lifelogger
```

---

## 🔐 First Time Setup

1. **Install Prerequisites**
   - Java 17+
   - Maven 3.6+
   - Node.js 16+
   - MongoDB 4.4+

2. **Start MongoDB**
   ```bash
   net start MongoDB
   ```

3. **Build & Run Backend**
   ```bash
   cd backend
   mvn clean install
   mvn spring-boot:run
   ```

4. **Install & Run Frontend**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

5. **Register Account**
   - Go to http://localhost:5173
   - Click "Register here"
   - Create your account

---

## 🎯 API Endpoints (Quick Reference)

### Authentication
- `POST /api/auth/register` - Register
- `POST /api/auth/login` - Login

### Journals
- `GET /api/journals` - List all
- `POST /api/journals` - Create
- `PUT /api/journals/{id}` - Update
- `DELETE /api/journals/{id}` - Delete
- `GET /api/journals/search?q=text` - Search

### Memories
- `GET /api/memories` - List all
- `POST /api/memories` - Create
- `DELETE /api/memories/{id}` - Delete

*See backend/README.md for complete API documentation*

---

## 🐛 Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| Port 8080 in use | Kill process: `netstat -ano \| findstr :8080` |
| Port 5173 in use | Kill process: `netstat -ano \| findstr :5173` |
| MongoDB not running | `net start MongoDB` |
| CORS errors | Check both servers are on correct ports |
| 401 Unauthorized | Clear localStorage and login again |
| Build fails | Delete node_modules, run `npm install` |

---

## 📊 Tech Stack

**Backend:**
- Spring Boot 3.2.1
- MongoDB
- JWT Authentication
- Maven

**Frontend:**
- React 18
- Vite
- React Router
- Axios

---

## 💾 Data Backup

```bash
# Quick backup
mongodump --db=lifelogger --out=./backup-$(date +%Y%m%d)

# Quick restore
mongorestore --db=lifelogger ./backup-YYYYMMDD/lifelogger
```

---

## 🎨 Mood Options

- VERY_HAPPY 😄
- HAPPY 🙂
- NEUTRAL 😐
- SAD 😔
- VERY_SAD 😢
- STRESSED 😰
- CALM 😌

---

## 📝 Usage Tips

1. **Write Daily** - Consistency builds your memory vault
2. **Use Tags** - Makes searching easier later
3. **Add Context** - Helps organize by life area
4. **Create Phases** - Group memories by life periods
5. **Backup Regularly** - Export MongoDB data weekly

---

## 🔗 Quick Links

- Main Docs: `README.md`
- Setup Guide: `QUICKSTART.md`
- Implementation: `IMPLEMENTATION_SUMMARY.md`
- Backend API: `backend/README.md`

---

## 📞 Need Help?

1. Check QUICKSTART.md for setup issues
2. Check README.md for feature documentation
3. Check backend logs for API errors
4. Check browser console for frontend errors

---

**Happy Life Logging! 📔✨**

*Keep this card handy for quick reference*
