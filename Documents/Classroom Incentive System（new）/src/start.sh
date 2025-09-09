#!/bin/bash

echo "🎓 课堂荣誉墙 - 快速启动脚本"
echo "================================"

# 检查Node.js版本
echo "📋 检查系统环境..."
if ! command -v node &> /dev/null; then
    echo "❌ 未找到 Node.js，请先安装 Node.js 18+"
    echo "下载地址: https://nodejs.org/"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js 版本过低 (当前: $(node -v))，需要 18+"
    echo "请更新 Node.js: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js 版本: $(node -v)"
echo "✅ npm 版本: $(npm -v)"

# 清理环境
echo ""
echo "🧹 清理环境..."
rm -rf node_modules package-lock.json yarn.lock pnpm-lock.yaml .next
npm cache clean --force

# 安装依赖
echo ""
echo "📦 安装依赖..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ 依赖安装失败，尝试使用国内镜像..."
    npm install --registry https://registry.npmmirror.com
fi

# 启动开发服务器
echo ""
echo "🚀 启动开发服务器..."
echo "浏览器将自动打开 http://localhost:3000"
echo "按 Ctrl+C 停止服务器"
echo ""

npm run dev