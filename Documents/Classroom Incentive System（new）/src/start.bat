@echo off
chcp 65001 >nul
echo 🎓 课堂荣誉墙 - 快速启动脚本
echo ================================

REM 检查Node.js是否安装
echo 📋 检查系统环境...
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ 未找到 Node.js，请先安装 Node.js 18+
    echo 下载地址: https://nodejs.org/
    pause
    exit /b 1
)

for /f "tokens=1 delims=." %%i in ('node --version') do set NODE_MAJOR=%%i
set NODE_MAJOR=%NODE_MAJOR:~1%
if %NODE_MAJOR% LSS 18 (
    echo ❌ Node.js 版本过低，需要 18+
    echo 请更新 Node.js: https://nodejs.org/
    pause
    exit /b 1
)

echo ✅ Node.js 版本: 
node --version
echo ✅ npm 版本: 
npm --version

REM 清理环境
echo.
echo 🧹 清理环境...
if exist node_modules rmdir /s /q node_modules
if exist package-lock.json del package-lock.json
if exist yarn.lock del yarn.lock
if exist pnpm-lock.yaml del pnpm-lock.yaml
if exist .next rmdir /s /q .next
npm cache clean --force

REM 安装依赖
echo.
echo 📦 安装依赖...
npm install
if errorlevel 1 (
    echo ❌ 依赖安装失败，尝试使用国内镜像...
    npm install --registry https://registry.npmmirror.com
)

REM 启动开发服务器
echo.
echo 🚀 启动开发服务器...
echo 浏览器将自动打开 http://localhost:3000
echo 按 Ctrl+C 停止服务器
echo.

npm run dev

pause