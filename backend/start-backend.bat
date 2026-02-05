@echo off
echo Cleaning and restarting Life Logger Backend...
echo.

echo Step 1: Cleaning old build files...
call mvn clean
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Clean failed!
    pause
    exit /b 1
)

echo.
echo Step 2: Compiling project...
call mvn compile
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Compilation failed!
    pause
    exit /b 1
)

echo.
echo Step 3: Starting Spring Boot application...
call mvn spring-boot:run
