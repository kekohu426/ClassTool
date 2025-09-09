#!/bin/bash

echo "🔧 批量修复所有组件中的导入错误..."
echo "===================================="

# 修复所有 @radix-ui 包的导入
echo "📦 修复 @radix-ui 包导入..."

# 使用更精确的 sed 命令
find components/ -name "*.tsx" -exec sed -i.bak 's/@radix-ui\/react-accordion@[0-9.]*/@radix-ui\/react-accordion/g' {} \;
find components/ -name "*.tsx" -exec sed -i.bak 's/@radix-ui\/react-alert-dialog@[0-9.]*/@radix-ui\/react-alert-dialog/g' {} \;
find components/ -name "*.tsx" -exec sed -i.bak 's/@radix-ui\/react-avatar@[0-9.]*/@radix-ui\/react-avatar/g' {} \;
find components/ -name "*.tsx" -exec sed -i.bak 's/@radix-ui\/react-checkbox@[0-9.]*/@radix-ui\/react-checkbox/g' {} \;
find components/ -name "*.tsx" -exec sed -i.bak 's/@radix-ui\/react-collapsible@[0-9.]*/@radix-ui\/react-collapsible/g' {} \;
find components/ -name "*.tsx" -exec sed -i.bak 's/@radix-ui\/react-context-menu@[0-9.]*/@radix-ui\/react-context-menu/g' {} \;
find components/ -name "*.tsx" -exec sed -i.bak 's/@radix-ui\/react-dialog@[0-9.]*/@radix-ui\/react-dialog/g' {} \;
find components/ -name "*.tsx" -exec sed -i.bak 's/@radix-ui\/react-dropdown-menu@[0-9.]*/@radix-ui\/react-dropdown-menu/g' {} \;
find components/ -name "*.tsx" -exec sed -i.bak 's/@radix-ui\/react-hover-card@[0-9.]*/@radix-ui\/react-hover-card/g' {} \;
find components/ -name "*.tsx" -exec sed -i.bak 's/@radix-ui\/react-label@[0-9.]*/@radix-ui\/react-label/g' {} \;
find components/ -name "*.tsx" -exec sed -i.bak 's/@radix-ui\/react-menubar@[0-9.]*/@radix-ui\/react-menubar/g' {} \;
find components/ -name "*.tsx" -exec sed -i.bak 's/@radix-ui\/react-navigation-menu@[0-9.]*/@radix-ui\/react-navigation-menu/g' {} \;
find components/ -name "*.tsx" -exec sed -i.bak 's/@radix-ui\/react-popover@[0-9.]*/@radix-ui\/react-popover/g' {} \;
find components/ -name "*.tsx" -exec sed -i.bak 's/@radix-ui\/react-progress@[0-9.]*/@radix-ui\/react-progress/g' {} \;
find components/ -name "*.tsx" -exec sed -i.bak 's/@radix-ui\/react-radio-group@[0-9.]*/@radix-ui\/react-radio-group/g' {} \;
find components/ -name "*.tsx" -exec sed -i.bak 's/@radix-ui\/react-scroll-area@[0-9.]*/@radix-ui\/react-scroll-area/g' {} \;
find components/ -name "*.tsx" -exec sed -i.bak 's/@radix-ui\/react-select@[0-9.]*/@radix-ui\/react-select/g' {} \;
find components/ -name "*.tsx" -exec sed -i.bak 's/@radix-ui\/react-separator@[0-9.]*/@radix-ui\/react-separator/g' {} \;
find components/ -name "*.tsx" -exec sed -i.bak 's/@radix-ui\/react-slider@[0-9.]*/@radix-ui\/react-slider/g' {} \;
find components/ -name "*.tsx" -exec sed -i.bak 's/@radix-ui\/react-slot@[0-9.]*/@radix-ui\/react-slot/g' {} \;
find components/ -name "*.tsx" -exec sed -i.bak 's/@radix-ui\/react-switch@[0-9.]*/@radix-ui\/react-switch/g' {} \;
find components/ -name "*.tsx" -exec sed -i.bak 's/@radix-ui\/react-tabs@[0-9.]*/@radix-ui\/react-tabs/g' {} \;
find components/ -name "*.tsx" -exec sed -i.bak 's/@radix-ui\/react-toggle@[0-9.]*/@radix-ui\/react-toggle/g' {} \;
find components/ -name "*.tsx" -exec sed -i.bak 's/@radix-ui\/react-toggle-group@[0-9.]*/@radix-ui\/react-toggle-group/g' {} \;
find components/ -name "*.tsx" -exec sed -i.bak 's/@radix-ui\/react-tooltip@[0-9.]*/@radix-ui\/react-tooltip/g' {} \;

# 修复 lucide-react
echo "🎨 修复 lucide-react 导入..."
find components/ -name "*.tsx" -exec sed -i.bak 's/lucide-react@[0-9.]*"/lucide-react"/g' {} \;

# 修复其他库
echo "📚 修复其他库导入..."
find components/ -name "*.tsx" -exec sed -i.bak 's/class-variance-authority@[0-9.]*"/class-variance-authority"/g' {} \;

# 清理备份文件
echo "🧹 清理备份文件..."
find components/ -name "*.bak" -delete

echo ""
echo "✅ 批量修复完成！"
echo ""
echo "🔍 验证修复结果："
echo "检查是否还有版本号导入..."
if grep -r "@[0-9]" components/ 2>/dev/null; then
    echo "❌ 仍有版本号导入需要手动修复"
else
    echo "✅ 所有版本号导入已修复"
fi

echo ""
echo "🚀 现在可以重新启动项目："
echo "npm run dev"