@echo off
echo.
echo ======================================
echo  🚀 Theia Jewelz APK Builder
echo ======================================
echo.

echo 📱 Preparing APK build environment...
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js first.
    echo 🔗 Download from: https://nodejs.org/
    pause
    exit /b 1
)

echo ✅ Node.js is installed
echo.

REM Display build options
echo Select APK build method:
echo.
echo 1. 🌐 Open PWABuilder (Recommended)
echo 2. 🛠️  Install Bubblewrap
echo 3. ⚡ Install Capacitor
echo 4. 🎨 Generate Icons Only
echo 5. 📖 View Build Guide
echo.

set /p choice=Enter your choice (1-5): 

if "%choice%"=="1" (
    echo.
    echo 🌐 Opening PWABuilder...
    echo 📝 Instructions:
    echo    1. Enter your PWA URL
    echo    2. Click "Start" to analyze
    echo    3. Select "Android" package
    echo    4. Configure settings and download APK
    echo.
    start https://www.pwabuilder.com/
    pause
    exit /b 0
)

if "%choice%"=="2" (
    echo.
    echo 🛠️  Installing Bubblewrap...
    npm install -g @bubblewrap/cli
    echo.
    echo ✅ Bubblewrap installed!
    echo 📝 Next steps:
    echo    1. Run: bubblewrap init --manifest=YOUR_DOMAIN/manifest.json
    echo    2. Follow the interactive setup
    echo    3. Run: bubblewrap build
    echo.
    pause
    exit /b 0
)

if "%choice%"=="3" (
    echo.
    echo ⚡ Installing Capacitor...
    npm install -g @capacitor/cli @capacitor/core @capacitor/android
    echo.
    echo ✅ Capacitor installed!
    echo 📝 Next steps:
    echo    1. Run: npx cap init "Theia Jewelz" "com.theiajewelz.sales"
    echo    2. Run: npx cap add android
    echo    3. Run: npx cap copy
    echo    4. Run: npx cap open android
    echo.
    pause
    exit /b 0
)

if "%choice%"=="4" (
    echo.
    echo 🎨 Opening Icon Generator...
    start create-icons.html
    echo.
    echo 📝 Instructions:
    echo    1. Click "Generate All Icons"
    echo    2. Click "Download Icon Package"
    echo    3. Save icons to /icons/ folder
    echo.
    pause
    exit /b 0
)

if "%choice%"=="5" (
    echo.
    echo 📖 Opening Build Guide...
    start APK_CONVERSION_GUIDE.md
    pause
    exit /b 0
)

echo ❌ Invalid choice. Please run the script again.
pause