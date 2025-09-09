@echo off
echo 🔧 最终修复 - 完整依赖安装 (包含CSS工具)
echo =====================================

echo 📦 检查当前目录...
if not exist "package.json" (
    echo ❌ 错误：请在项目根目录运行此脚本
    pause
    exit /b 1
)

echo 🧹 清理现有安装...
if exist "node_modules" rmdir /s /q node_modules
if exist "package-lock.json" del package-lock.json
if exist ".next" rmdir /s /q .next

echo 💾 清理 npm 缓存...
npm cache clean --force

echo 📥 重新安装所有依赖...
echo 这可能需要几分钟时间...

rem 尝试使用淘宝镜像以防网络问题
npm config set registry https://registry.npmmirror.com

npm install
if %errorlevel% == 0 (
    echo.
    echo ✅ 安装成功！
    echo.
    echo 🚀 启动开发服务器...
    npm run dev
) else (
    echo.
    echo ❌ npm 安装失败，尝试重置镜像...
    npm config set registry https://registry.npmjs.org
    
    echo 🔄 重新尝试安装...
    npm install
    if %errorlevel% == 0 (
        echo ✅ 安装成功！
        echo 🚀 启动开发服务器...
        npm run dev
    ) else (
        echo ❌ 安装仍然失败
        echo.
        echo 🆘 手动解决步骤：
        echo 1. 检查网络连接
        echo 2. 检查 Node.js 版本: node --version (需要 >=18.0.0)
        echo 3. 尝试使用 yarn: npm install -g yarn && yarn install
        echo 4. 查看完整指南: type FINAL_FIX_GUIDE.md
        pause
    )
)