# Backend Startup Issue - Complete Fix Guide

## Problem
The backend server is failing to start with the error:
```
Caused by: java.lang.Error: Unresolved compilation problems:
    The import com.lifelogger.security cannot be resolved
    JwtRequestFilter cannot be resolved to a type
```

## Root Cause
The compiled classes in the `target` directory are out of sync with the source code, causing Spring Boot to fail during bean creation.

## Solution

### **Option 1: Quick Fix (Recommended)**

1. **Stop all running Maven processes**
   - Press `Ctrl+C` in any terminal running Maven
   - Close all backend terminals

2. **Delete the target directory**
   ```powershell
   cd f:\antigravity\life-logger\backend
   Remove-Item -Path "target" -Recurse -Force
   ```

3. **Clean and compile**
   ```bash
   mvn clean compile
   ```

4. **Start the backend**
   ```bash
   mvn spring-boot:run
   ```

### **Option 2: Using the Batch Script**

I've created a script that does all the above automatically:

```bash
cd f:\antigravity\life-logger\backend
.\start-backend.bat
```

### **Option 3: Using Your IDE**

If you're using IntelliJ IDEA or Eclipse:

1. **Right-click on the project** → **Maven** → **Reload Project**
2. **Build** → **Rebuild Project**
3. **Run** → **Run 'LifeLoggerApplication'**

---

## Step-by-Step Manual Fix

### **Step 1: Clean Everything**
```bash
cd f:\antigravity\life-logger\backend
mvn clean
```

### **Step 2: Verify Source Files Exist**
Check that these files exist:
- `src/main/java/com/lifelogger/security/JwtRequestFilter.java` ✓
- `src/main/java/com/lifelogger/security/JwtTokenUtil.java` ✓
- `src/main/java/com/lifelogger/security/CustomUserDetailsService.java` ✓
- `src/main/java/com/lifelogger/config/SecurityConfig.java` ✓

### **Step 3: Compile**
```bash
mvn compile -DskipTests
```

Wait for:
```
[INFO] BUILD SUCCESS
```

### **Step 4: Run**
```bash
mvn spring-boot:run
```

Wait for:
```
Started LifeLoggerApplication in X.XXX seconds
Tomcat started on port 8080 (http)
```

---

## What to Look For

### **Success Indicators:**
✅ `Started LifeLoggerApplication in X.XXX seconds`
✅ `Tomcat started on port 8080 (http)`
✅ `Monitor thread successfully connected to server` (MongoDB)
✅ No error messages
✅ Server keeps running (doesn't exit)

### **Failure Indicators:**
❌ `Error creating bean with name 'securityConfig'`
❌ `Unresolved compilation problems`
❌ `BUILD SUCCESS` followed by server stopping
❌ `Application run failed`

---

## Alternative: Use Spring Boot DevTools Restart

If the server keeps failing, try disabling DevTools temporarily:

**Edit `pom.xml`** and comment out:
```xml
<!-- Temporarily disabled
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-devtools</artifactId>
    <scope>runtime</scope>
    <optional>true</optional>
</dependency>
-->
```

Then run:
```bash
mvn clean package
java -jar target/life-logger-backend-1.0.0.jar
```

---

## Troubleshooting

### **Issue: "Port 8080 already in use"**
**Solution:**
```powershell
# Find process using port 8080
netstat -ano | findstr :8080

# Kill the process (replace PID with actual process ID)
taskkill /PID <PID> /F
```

### **Issue: "MongoDB connection failed"**
**Solution:**
1. Start MongoDB:
   ```bash
   mongod
   ```
2. Or check if MongoDB service is running:
   ```powershell
   Get-Service -Name MongoDB
   ```

### **Issue: "Java version mismatch"**
**Solution:**
Check Java version:
```bash
java -version
```
Should be Java 17 or higher. If not, update `JAVA_HOME`.

---

## Expected Startup Log

When successful, you should see:
```
  .   ____          _            __ _ _
 /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
( ( )\___ | '_ | '_| | '_ \/ _` | \ \ \ \
 \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
  '  |____| .__|_| |_|_| |_\__, | / / / /
 =========|_|==============|___/=/_/_/_/
 :: Spring Boot ::                (v3.2.1)

2026-02-06T00:XX:XX  INFO --- Starting LifeLoggerApplication
2026-02-06T00:XX:XX  INFO --- Tomcat initialized with port 8080
2026-02-06T00:XX:XX  INFO --- Started LifeLoggerApplication in X.XXX seconds
```

And the server should **stay running** (not exit).

---

## Quick Commands Reference

```bash
# Navigate to backend
cd f:\antigravity\life-logger\backend

# Clean build
mvn clean

# Compile only
mvn compile

# Run application
mvn spring-boot:run

# Clean + Compile + Run (all in one)
mvn clean spring-boot:run

# Package as JAR
mvn clean package

# Run JAR directly
java -jar target/life-logger-backend-1.0.0.jar
```

---

## After Backend Starts Successfully

1. **Verify backend is running:**
   - Open browser: `http://localhost:8080/api/auth/login`
   - Should see: `{"timestamp":"...","status":405,"error":"Method Not Allowed"...}`
   - This is GOOD! It means the server is running (405 is expected for GET on a POST endpoint)

2. **Test with frontend:**
   - Frontend should be on: `http://localhost:5174/`
   - Try to register a new user
   - Should work now!

---

## Summary

The issue is a **stale compiled class** in the `target` directory. The fix is simple:

1. Delete `target` folder
2. Run `mvn clean compile`
3. Run `mvn spring-boot:run`
4. Wait for "Started LifeLoggerApplication"
5. Server should keep running

**The backend will stay running continuously once it starts successfully!**
