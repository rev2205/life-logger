# Life Logger - Quick Start Guide

## 🚀 Quick Setup (5 Minutes)

### Step 1: Verify Prerequisites

Check that you have everything installed:

```bash
# Check Java version (should be 17+)
java -version

# Check Maven version
mvn -version

# Check Node.js version (should be 16+)
node -version

# Check npm version
npm -version
```

If any are missing, install them from:
- Java: https://www.oracle.com/java/technologies/downloads/
- Maven: https://maven.apache.org/download.cgi
- Node.js: https://nodejs.org/

### Step 2: Install and Start MongoDB

**Windows:**
1. Download MongoDB Community Server from https://www.mongodb.com/try/download/community
2. Install with default settings
3. Start MongoDB:
   > **Note:** This command requires **Administrator** privileges. Open your terminal as Administrator.
   
   ```bash
   net start MongoDB
   ```
   
   If you get "Access is denied", try checking if it's already running:
   ```powershell
   Get-Service -Name MongoDB
   ```

**macOS:**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Linux:**
```bash
sudo systemctl start mongod
sudo systemctl enable mongod
```

Verify MongoDB is running:
```bash
# Should connect successfully
mongosh
```

### Step 3: Start the Backend

Open a terminal in the project root:

```bash
cd life-logger/backend

# First time: Build the project
mvn clean install

# Start the backend server
mvn spring-boot:run
```

✅ Backend should start on http://localhost:8080

You should see: `Started LifeLoggerApplication`

### Step 4: Start the Frontend

Open a **NEW** terminal in the project root:

```bash
cd life-logger/frontend

# First time: Install dependencies
npm install

# Start the frontend development server
npm run dev
```

✅ Frontend should start on http://localhost:5173

### Step 5: Access the Application

Open your browser and go to:
```
http://localhost:5173
```

You should see the Life Logger login page!

## 📝 First Time Usage

1. **Register an Account**
   - Click "Register here"
   - Choose a username (min 3 characters)
   - Create a password (min 6 characters)
   - Email is optional
   - Click "Register"

2. **Start Logging Your Life**
   - You'll be redirected to the Dashboard
   - Click "New Entry" to write your first journal
   - Explore other features from the navigation bar

## 🔧 Troubleshooting

### MongoDB Connection Error

**Error:** `MongoSocketOpenException` or `Connection refused`

**Solution:**
```bash
# Windows
net start MongoDB

# macOS/Linux
sudo systemctl start mongod

# Verify it's running
mongosh
```

### Backend Won't Start

**Error:** `Port 8080 already in use`

**Solution:**
```bash
# Windows - Find and kill process on port 8080
netstat -ano | findstr :8080
taskkill /PID <PID_NUMBER> /F

# macOS/Linux
lsof -ti:8080 | xargs kill -9
```

### Frontend Won't Start

**Error:** `EADDRINUSE: address already in use :::5173`

**Solution:**
```bash
# Kill process on port 5173
# Windows
netstat -ano | findstr :5173
taskkill /PID <PID_NUMBER> /F

# macOS/Linux
lsof -ti:5173 | xargs kill -9
```

### CORS Errors in Browser

**Error:** `CORS policy: No 'Access-Control-Allow-Origin' header`

**Solution:**
1. Make sure backend is running on port 8080
2. Make sure frontend is running on port 5173
3. Check `SecurityConfig.java` has correct CORS origins
4. Restart both servers

### JWT Token Errors

**Error:** `401 Unauthorized` or token expired

**Solution:**
1. Clear browser localStorage:
   - Open DevTools (F12)
   - Go to Application > Local Storage
   - Delete all items
2. Refresh page and login again

## 📊 Verify Everything is Working

### Test Backend API

Open a new terminal and test the health endpoint:

```bash
# This should return 401 Unauthorized (which is correct - it means the API is working)
curl http://localhost:8080/api/journals
```

### Test Frontend

1. Open http://localhost:5173
2. You should see the login page
3. Register a new account
4. You should be redirected to the dashboard

## 🎯 Next Steps

Once everything is running:

1. **Write Your First Journal**
   - Click "New Entry" from Dashboard
   - Select your mood
   - Write your thoughts
   - Add tags and context
   - Save!

2. **Explore Features**
   - Quick Memories: Capture short moments
   - Tastes: Track your favorite media
   - Places: Map your experiences
   - Photos: Upload and reflect on images
   - Life Phases: Organize by life periods

3. **Customize**
   - Update JWT secret in `application.properties`
   - Modify mood options if needed
   - Add your own contexts and tags

## 💾 Data Backup

Your data is stored in MongoDB. To backup:

```bash
# Export all data
mongodump --db=lifelogger --out=./backup

# Restore data
mongorestore --db=lifelogger ./backup/lifelogger
```

## 🛑 Stopping the Application

### Stop Frontend
Press `Ctrl + C` in the frontend terminal

### Stop Backend
Press `Ctrl + C` in the backend terminal

### Stop MongoDB (Optional)
```bash
# Windows
net stop MongoDB

# macOS/Linux
sudo systemctl stop mongod
```

## 📱 Daily Usage

For daily use, you only need to:

1. Start MongoDB (if not running)
2. Start Backend: `cd backend && mvn spring-boot:run`
3. Start Frontend: `cd frontend && npm run dev`
4. Open http://localhost:5173

## 🔐 Security Notes

- This is a **single-user, local application**
- Change the JWT secret before any production use
- Keep your MongoDB secure
- Regular backups recommended

## 📞 Need Help?

Check the main README.md for:
- Complete API documentation
- Architecture details
- Feature descriptions
- Development guidelines

---

**Happy Life Logging! 📔✨**
