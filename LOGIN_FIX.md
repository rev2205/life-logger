# Quick Fix for Login/Register Issue

## Problem Identified ✅

The login/register issue was caused by two problems:

1. **Frontend API URL** - Was using relative path `/api` instead of absolute URL
2. **CORS Configuration** - Backend only allowed port 5173, but frontend is on 5174

## Fixes Applied ✅

### 1. Fixed Frontend API Configuration
**File:** `frontend/src/services/api.js`
```javascript
// Changed from:
const API_BASE_URL = '/api';

// To:
const API_BASE_URL = 'http://localhost:8080/api';
```

### 2. Updated CORS Configuration
**File:** `backend/src/main/java/com/lifelogger/config/SecurityConfig.java`
```java
// Added port 5174 to allowed origins:
configuration.setAllowedOrigins(List.of(
    "http://localhost:5173", 
    "http://localhost:5174",  // NEW
    "http://localhost:3000"
));
```

---

## How to Start the Application

### Step 1: Start MongoDB
Make sure MongoDB is running on `localhost:27017`

### Step 2: Start Backend
Open a terminal in the backend directory:
```bash
cd f:\antigravity\life-logger\backend
mvn spring-boot:run
```

Wait until you see:
```
Started LifeLoggerApplication in X.XXX seconds
Tomcat started on port 8080
```

### Step 3: Start Frontend
Open a NEW terminal in the frontend directory:
```bash
cd f:\antigravity\life-logger\frontend
npm run dev
```

The frontend will start on `http://localhost:5174/` (or 5173 if available)

---

## Testing Login/Register

### Register a New User
1. Go to `http://localhost:5174/register`
2. Enter:
   - Username: `testuser`
   - Email: `test@example.com` (optional)
   - Password: `password123`
3. Click "Register"
4. You should be redirected to the dashboard

### Login
1. Go to `http://localhost:5174/login`
2. Enter your credentials
3. Click "Login"
4. You should be redirected to the dashboard

---

## Troubleshooting

### If you still can't login:

1. **Check Browser Console** (F12)
   - Look for CORS errors
   - Look for network errors
   - Check if API calls are going to `http://localhost:8080`

2. **Check Backend Logs**
   - Look for any errors in the terminal running the backend
   - Verify it says "Tomcat started on port 8080"

3. **Check MongoDB**
   - Make sure MongoDB is running
   - Check connection string in `application.properties`

4. **Clear Browser Storage**
   - Open DevTools (F12)
   - Go to Application tab
   - Clear Local Storage
   - Refresh the page

### Common Errors:

**"Network Error"**
- Backend is not running
- Check if backend is on port 8080

**"CORS Error"**
- Backend CORS not configured for your frontend port
- Already fixed in SecurityConfig.java

**"401 Unauthorized"**
- Invalid credentials
- Token expired (clear localStorage)

---

## Verification Checklist

- [ ] MongoDB is running
- [ ] Backend started successfully on port 8080
- [ ] Frontend started on port 5174 (or 5173)
- [ ] Browser console shows no CORS errors
- [ ] Can access `http://localhost:5174/login`
- [ ] Can register a new user
- [ ] Can login with registered user
- [ ] Redirected to dashboard after login

---

## What Was Fixed

✅ **Frontend API URL** - Now points to correct backend server
✅ **CORS Configuration** - Now allows frontend port 5174
✅ **Authentication Flow** - Should work properly now

The login and register functionality should now work perfectly! 🎉
