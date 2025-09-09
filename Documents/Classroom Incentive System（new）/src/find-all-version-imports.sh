#!/bin/bash

echo "🔍 查找所有带版本号的导入语句..."
echo "=================================="

# 搜索所有.tsx和.ts文件中的版本号导入
echo "📂 搜索 components/ 目录..."
find components/ -name "*.tsx" -o -name "*.ts" | xargs grep -n "@[0-9]" 2>/dev/null | head -20

echo ""
echo "📂 搜索 pages/ 目录..."
find pages/ -name "*.tsx" -o -name "*.ts" | xargs grep -n "@[0-9]" 2>/dev/null | head -20

echo ""
echo "📂 搜索 utils/ 目录..."
find utils/ -name "*.tsx" -o -name "*.ts" | xargs grep -n "@[0-9]" 2>/dev/null | head -20

echo ""
echo "📂 检查 App.tsx..."
grep -n "@[0-9]" App.tsx 2>/dev/null || echo "App.tsx 中没有版本号导入"

echo ""
echo "📂 检查 supabase/functions/ 目录..."
find supabase/functions/ -name "*.tsx" -o -name "*.ts" | xargs grep -n "@[0-9]" 2>/dev/null | head -20

echo ""
echo "🔧 如果找到问题导入，将显示文件名和行号"
echo "📝 需要手动编辑这些文件，移除版本号"