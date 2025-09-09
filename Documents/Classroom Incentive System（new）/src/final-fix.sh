#!/bin/bash

echo "🔧 最终修复 - 完整依赖安装 (包含CSS工具)"
echo "====================================="

echo "📦 检查当前目录..."
if [ ! -f "package.json" ]; then
    echo "❌ 错误：请在项目根目录运行此脚本"
    exit 1
fi

echo "🧹 清理现有安装..."
rm -rf node_modules package-lock.json .next 2>/dev/null

echo "💾 清理 npm 缓存..."
npm cache clean --force

echo "📥 重新安装所有依赖..."
echo "这可能需要几分钟时间..."

# 尝试使用淘宝镜像以防网络问题
npm config set registry https://registry.npmmirror.com

if npm install; then
    echo ""
    echo "✅ 安装成功！"
    echo ""
    echo "🚀 启动开发服务器..."
    npm run dev
else
    echo ""
    echo "❌ npm 安装失败，尝试重置镜像..."
    npm config set registry https://registry.npmjs.org
    
    echo "🔄 重新尝试安装..."
    if npm install; then
        echo "✅ 安装成功！"
        echo "🚀 启动开发服务器..."
        npm run dev
    else
        echo "❌ 安装仍然失败"
        echo ""
        echo "🆘 手动解决步骤："
        echo "1. 检查网络连接"
        echo "2. 检查 Node.js 版本: node --version (需要 >=18.0.0)"
        echo "3. 尝试使用 yarn: npm install -g yarn && yarn install"
        echo "4. 查看完整指南: cat FINAL_FIX_GUIDE.md"
    fi
fi