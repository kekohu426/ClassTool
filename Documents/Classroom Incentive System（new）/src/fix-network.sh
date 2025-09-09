#!/bin/bash

echo "🔧 网络超时问题 - 自动修复脚本"
echo "================================"

# 停止任何正在运行的进程
echo "🛑 停止现有进程..."
pkill -f "next dev" 2>/dev/null || true

# 完全清理环境
echo "🧹 清理安装环境..."
rm -rf node_modules
rm -f package-lock.json
rm -f yarn.lock
rm -rf .next
npm cache clean --force

# 网络配置优化
echo "⚙️ 优化网络配置..."
npm config set fetch-timeout 600000
npm config set fetch-retry-mintimeout 20000
npm config set fetch-retry-maxtimeout 120000

# 清除可能的代理设置
npm config delete proxy 2>/dev/null || true
npm config delete https-proxy 2>/dev/null || true

echo "📡 尝试不同的安装源..."

# 方案1: 官方源
echo "🌐 尝试官方源..."
npm config set registry https://registry.npmjs.org/
if npm install --verbose; then
    echo "✅ 官方源安装成功！"
    npm run dev
    exit 0
fi

# 方案2: 华为云镜像
echo "🌐 尝试华为云镜像..."
npm config set registry https://repo.huaweicloud.com/repository/npm/
if npm install --verbose; then
    echo "✅ 华为云镜像安装成功！"
    npm run dev
    exit 0
fi

# 方案3: 腾讯云镜像
echo "🌐 尝试腾讯云镜像..."
npm config set registry http://mirrors.cloud.tencent.com/npm/
if npm install --verbose; then
    echo "✅ 腾讯云镜像安装成功！"
    npm run dev
    exit 0
fi

# 方案4: 分步安装关键依赖
echo "🔧 尝试分步安装..."
npm config set registry https://registry.npmjs.org/

echo "📦 安装核心依赖..."
npm install react@18 react-dom@18 next@14 --save

echo "📦 安装UI依赖..."
npm install @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-select --save

echo "📦 安装其他依赖..."
npm install lucide-react tailwindcss @types/react @types/node typescript --save-dev

if [ -d "node_modules/react" ] && [ -d "node_modules/next" ]; then
    echo "✅ 分步安装成功！"
    npm run dev
    exit 0
fi

# 如果所有方案都失败
echo "❌ 所有安装方案都失败了"
echo ""
echo "🆘 建议解决方案："
echo "1. 检查网络连接是否稳定"
echo "2. 尝试使用手机热点网络"
echo "3. 暂时关闭防火墙和VPN"
echo "4. 联系技术支持获取离线安装包"
echo ""
echo "📞 您也可以尝试手动执行以下命令："
echo "   npm config set registry https://registry.npmjs.org/"
echo "   npm install"
echo "   npm run dev"

exit 1