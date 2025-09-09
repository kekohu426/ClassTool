#!/bin/bash

# 课堂积分系统自动部署脚本
# 使用方法: ./scripts/deploy.sh

set -e

echo "🚀 开始部署课堂积分系统..."

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 检查必要工具
check_tools() {
    echo "📋 检查必要工具..."
    
    if ! command -v node &> /dev/null; then
        echo -e "${RED}❌ Node.js 未安装，请先安装 Node.js 18+${NC}"
        exit 1
    fi
    
    if ! command -v npm &> /dev/null; then
        echo -e "${RED}❌ npm 未安装${NC}"
        exit 1
    fi
    
    echo -e "${GREEN}✅ 工具检查完成${NC}"
}

# 检查环境变量
check_env() {
    echo "🔧 检查项目配置..."
    
    if [[ -f utils/supabase/client-config.ts ]]; then
        if grep -q "your-project-id" utils/supabase/client-config.ts; then
            echo -e "${YELLOW}⚠️  请先配置 Supabase 项目信息${NC}"
            echo "请编辑 utils/supabase/client-config.ts 文件"
            echo "将 'your-project-id' 和 'your-anon-key-here' 替换为实际值"
            read -p "已配置完成？按 Enter 继续，或 Ctrl+C 退出..."
        else
            echo -e "${GREEN}✅ 项目配置检查完成${NC}"
        fi
    else
        echo -e "${RED}❌ 找不到配置文件${NC}"
        exit 1
    fi
}

# 安装依赖
install_deps() {
    echo "📦 安装依赖包..."
    npm install
    echo -e "${GREEN}✅ 依赖安装完成${NC}"
}

# 构建项目
build_project() {
    echo "🔨 构建项目..."
    npm run build
    echo -e "${GREEN}✅ 项目构建完成${NC}"
}

# 部署选择
deploy_choice() {
    echo "🌐 选择部署方式:"
    echo "1) Vercel (推荐)"
    echo "2) Netlify"
    echo "3) 自托管 (Docker)"
    echo "4) 仅构建，不部署"
    
    read -p "请选择 (1-4): " choice
    
    case $choice in
        1)
            deploy_vercel
            ;;
        2)
            deploy_netlify
            ;;
        3)
            deploy_docker
            ;;
        4)
            echo -e "${GREEN}✅ 构建完成，可以手动部署${NC}"
            ;;
        *)
            echo -e "${RED}❌ 无效选择${NC}"
            exit 1
            ;;
    esac
}

# Vercel 部署
deploy_vercel() {
    echo "🚀 部署到 Vercel..."
    
    if ! command -v vercel &> /dev/null; then
        echo "📦 安装 Vercel CLI..."
        npm install -g vercel
    fi
    
    echo "请确保已在 Vercel 中设置环境变量:"
    echo "- NEXT_PUBLIC_SUPABASE_URL"
    echo "- NEXT_PUBLIC_SUPABASE_ANON_KEY"
    echo "- SUPABASE_SERVICE_ROLE_KEY"
    
    read -p "已设置环境变量? (y/N): " confirm
    if [[ $confirm == [yY] || $confirm == [yY][eE][sS] ]]; then
        vercel --prod
        echo -e "${GREEN}✅ Vercel 部署完成${NC}"
    else
        echo -e "${YELLOW}⚠️  请先设置环境变量后再部署${NC}"
    fi
}

# Netlify 部署
deploy_netlify() {
    echo "🚀 部署到 Netlify..."
    echo "请手动将项目连接到 Netlify 并设置以下配置:"
    echo "构建命令: npm run build"
    echo "发布目录: .next"
    echo "环境变量:"
    echo "- NEXT_PUBLIC_SUPABASE_URL"
    echo "- NEXT_PUBLIC_SUPABASE_ANON_KEY"
    echo "- SUPABASE_SERVICE_ROLE_KEY"
}

# Docker 部署
deploy_docker() {
    echo "🐳 构建 Docker 镜像..."
    
    if ! command -v docker &> /dev/null; then
        echo -e "${RED}❌ Docker 未安装${NC}"
        exit 1
    fi
    
    docker build -t classroom-system .
    
    echo -e "${GREEN}✅ Docker 镜像构建完成${NC}"
    echo "运行命令:"
    echo "docker run -p 3000:3000 \\"
    echo "  -e NEXT_PUBLIC_SUPABASE_URL=your_url \\"
    echo "  -e NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key \\"
    echo "  -e SUPABASE_SERVICE_ROLE_KEY=your_service_key \\"
    echo "  classroom-system"
}

# 主函数
main() {
    echo -e "${GREEN}"
    echo "╔═══════════════════════════════════╗"
    echo "║     课堂积分系统部署工具          ║"
    echo "║     Classroom Honor System        ║"
    echo "╚═══════════════════════════════════╝"
    echo -e "${NC}"
    
    check_tools
    check_env
    install_deps
    build_project
    deploy_choice
    
    echo -e "${GREEN}"
    echo "🎉 部署流程完成！"
    echo "如果选择了自动部署，请检查部署状态"
    echo "如果是手动部署，请按照提示完成后续步骤"
    echo -e "${NC}"
}

# 错误处理
trap 'echo -e "${RED}❌ 部署过程中出现错误${NC}"; exit 1' ERR

# 运行主函数
main "$@"