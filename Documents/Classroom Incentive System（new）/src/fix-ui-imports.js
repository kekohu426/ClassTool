const fs = require('fs');
const path = require('path');

console.log('🔧 修复UI组件导入错误...');

const uiDir = './components/ui';

// 获取所有.tsx文件
const files = fs.readdirSync(uiDir).filter(file => file.endsWith('.tsx'));

files.forEach(file => {
  const filePath = path.join(uiDir, file);
  console.log(`📝 处理文件: ${file}`);
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  // 修复所有带版本号的导入
  content = content.replace(/@radix-ui\/react-[^@]*@[\d.]+/g, (match) => {
    const packageName = match.split('@')[0] + '@' + match.split('@')[1];
    return packageName;
  });
  
  content = content.replace(/lucide-react@[\d.]+/g, 'lucide-react');
  content = content.replace(/class-variance-authority@[\d.]+/g, 'class-variance-authority');
  content = content.replace(/@radix-ui\/react-slot@[\d.]+/g, '@radix-ui/react-slot');
  
  fs.writeFileSync(filePath, content);
});

console.log('✅ 修复完成！');
console.log('🚀 现在可以重新启动项目: npm run dev');