#!/bin/bash

echo "🔧 修复导入错误 - 批量修复脚本"
echo "================================"

# 定义需要修复的文件目录
UI_DIR="./components/ui"

echo "📁 扫描 $UI_DIR 目录..."

# 修复 @radix-ui 包的导入
echo "🔧 修复 @radix-ui 包导入..."
find "$UI_DIR" -name "*.tsx" -exec sed -i.bak 's/@radix-ui\/react-[^@]*@[0-9.]*/@radix-ui\/react-\1/g' {} \;

# 更具体的修复
find "$UI_DIR" -name "*.tsx" -exec sed -i.bak 's/@radix-ui\/react-alert-dialog@[0-9.]*/@radix-ui\/react-alert-dialog/g' {} \;
find "$UI_DIR" -name "*.tsx" -exec sed -i.bak 's/@radix-ui\/react-dialog@[0-9.]*/@radix-ui\/react-dialog/g' {} \;
find "$UI_DIR" -name "*.tsx" -exec sed -i.bak 's/@radix-ui\/react-dropdown-menu@[0-9.]*/@radix-ui\/react-dropdown-menu/g' {} \;
find "$UI_DIR" -name "*.tsx" -exec sed -i.bak 's/@radix-ui\/react-select@[0-9.]*/@radix-ui\/react-select/g' {} \;
find "$UI_DIR" -name "*.tsx" -exec sed -i.bak 's/@radix-ui\/react-accordion@[0-9.]*/@radix-ui\/react-accordion/g' {} \;
find "$UI_DIR" -name "*.tsx" -exec sed -i.bak 's/@radix-ui\/react-avatar@[0-9.]*/@radix-ui\/react-avatar/g' {} \;
find "$UI_DIR" -name "*.tsx" -exec sed -i.bak 's/@radix-ui\/react-checkbox@[0-9.]*/@radix-ui\/react-checkbox/g' {} \;
find "$UI_DIR" -name "*.tsx" -exec sed -i.bak 's/@radix-ui\/react-collapsible@[0-9.]*/@radix-ui\/react-collapsible/g' {} \;
find "$UI_DIR" -name "*.tsx" -exec sed -i.bak 's/@radix-ui\/react-context-menu@[0-9.]*/@radix-ui\/react-context-menu/g' {} \;
find "$UI_DIR" -name "*.tsx" -exec sed -i.bak 's/@radix-ui\/react-hover-card@[0-9.]*/@radix-ui\/react-hover-card/g' {} \;
find "$UI_DIR" -name "*.tsx" -exec sed -i.bak 's/@radix-ui\/react-label@[0-9.]*/@radix-ui\/react-label/g' {} \;
find "$UI_DIR" -name "*.tsx" -exec sed -i.bak 's/@radix-ui\/react-menubar@[0-9.]*/@radix-ui\/react-menubar/g' {} \;
find "$UI_DIR" -name "*.tsx" -exec sed -i.bak 's/@radix-ui\/react-navigation-menu@[0-9.]*/@radix-ui\/react-navigation-menu/g' {} \;
find "$UI_DIR" -name "*.tsx" -exec sed -i.bak 's/@radix-ui\/react-popover@[0-9.]*/@radix-ui\/react-popover/g' {} \;
find "$UI_DIR" -name "*.tsx" -exec sed -i.bak 's/@radix-ui\/react-progress@[0-9.]*/@radix-ui\/react-progress/g' {} \;
find "$UI_DIR" -name "*.tsx" -exec sed -i.bak 's/@radix-ui\/react-radio-group@[0-9.]*/@radix-ui\/react-radio-group/g' {} \;
find "$UI_DIR" -name "*.tsx" -exec sed -i.bak 's/@radix-ui\/react-scroll-area@[0-9.]*/@radix-ui\/react-scroll-area/g' {} \;
find "$UI_DIR" -name "*.tsx" -exec sed -i.bak 's/@radix-ui\/react-separator@[0-9.]*/@radix-ui\/react-separator/g' {} \;
find "$UI_DIR" -name "*.tsx" -exec sed -i.bak 's/@radix-ui\/react-slider@[0-9.]*/@radix-ui\/react-slider/g' {} \;
find "$UI_DIR" -name "*.tsx" -exec sed -i.bak 's/@radix-ui\/react-switch@[0-9.]*/@radix-ui\/react-switch/g' {} \;
find "$UI_DIR" -name "*.tsx" -exec sed -i.bak 's/@radix-ui\/react-tabs@[0-9.]*/@radix-ui\/react-tabs/g' {} \;
find "$UI_DIR" -name "*.tsx" -exec sed -i.bak 's/@radix-ui\/react-toggle@[0-9.]*/@radix-ui\/react-toggle/g' {} \;
find "$UI_DIR" -name "*.tsx" -exec sed -i.bak 's/@radix-ui\/react-toggle-group@[0-9.]*/@radix-ui\/react-toggle-group/g' {} \;
find "$UI_DIR" -name "*.tsx" -exec sed -i.bak 's/@radix-ui\/react-tooltip@[0-9.]*/@radix-ui\/react-tooltip/g' {} \;

# 修复 lucide-react 导入
echo "🔧 修复 lucide-react 导入..."
find "$UI_DIR" -name "*.tsx" -exec sed -i.bak 's/lucide-react@[0-9.]*"/lucide-react"/g' {} \;

# 清理备份文件
echo "🧹 清理备份文件..."
find "$UI_DIR" -name "*.bak" -delete

echo "✅ 导入修复完成！"
echo ""
echo "📋 修复的内容："
echo "- @radix-ui 包的版本号导入"
echo "- lucide-react 的版本号导入"
echo ""
echo "🚀 现在可以重新启动项目："
echo "npm run dev"