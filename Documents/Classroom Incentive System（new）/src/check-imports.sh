#!/bin/bash

echo "🔍 检查导入错误..."
echo "==================="

echo "📁 扫描 components/ui 目录中的版本号导入..."

# 查找所有包含版本号的导入
grep -r "@[0-9]" components/ui/ || echo "没有找到版本号导入"

echo ""
echo "🔧 如果找到了错误的导入，请运行："
echo "node fix-ui-imports.js"