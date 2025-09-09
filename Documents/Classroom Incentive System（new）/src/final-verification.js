#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 项目完整性检查');
console.log('==================');

// 检查关键文件
const criticalFiles = [
  'package.json',
  'App.tsx',
  'pages/_app.tsx',
  'pages/index.tsx',
  'styles/globals.css',
  'postcss.config.js',
  'tailwind.config.js',
  'next.config.js',
  'utils/supabase/info.tsx',
  'supabase/functions/server/index.tsx',
  'components/student-card.tsx',
  'components/sound-manager.tsx',
  'components/ui/button.tsx',
  'components/ui/card.tsx',
  'components/ui/badge.tsx'
];

let allFilesExist = true;

console.log('📁 检查关键文件...');
criticalFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`  ✅ ${file}`);
  } else {
    console.log(`  ❌ ${file} - 缺失`);
    allFilesExist = false;
  }
});

// 检查 package.json 依赖
console.log('\n📦 检查依赖包...');
try {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  
  const requiredDeps = [
    'react',
    'react-dom', 
    'next',
    '@supabase/supabase-js',
    'lucide-react',
    'sonner',
    '@radix-ui/react-alert-dialog',
    '@radix-ui/react-slot'
  ];

  const requiredDevDeps = [
    'autoprefixer',
    'tailwindcss',
    'typescript'
  ];

  let allDepsPresent = true;

  requiredDeps.forEach(dep => {
    if (packageJson.dependencies[dep]) {
      console.log(`  ✅ ${dep}`);
    } else {
      console.log(`  ❌ ${dep} - 缺失`);
      allDepsPresent = false;
    }
  });

  requiredDevDeps.forEach(dep => {
    if (packageJson.devDependencies[dep]) {
      console.log(`  ✅ ${dep} (dev)`);
    } else {
      console.log(`  ❌ ${dep} (dev) - 缺失`);
      allDepsPresent = false;
    }
  });

  // 检查可能的导入问题
  console.log('\n🔗 检查导入语句...');
  
  const checkImportsInFile = (filePath) => {
    if (!fs.existsSync(filePath)) return;
    
    const content = fs.readFileSync(filePath, 'utf8');
    const versionImports = content.match(/from ['"][^'"]*@[\d\.]+['"]/g);
    
    if (versionImports && versionImports.length > 0) {
      console.log(`  ⚠️  ${filePath} 包含版本导入:`);
      versionImports.forEach(imp => console.log(`    ${imp}`));
      return false;
    }
    return true;
  };

  const importCheckFiles = [
    'App.tsx',
    'components/student-card.tsx',
    'components/sound-manager.tsx'
  ];

  let allImportsClean = true;
  importCheckFiles.forEach(file => {
    if (!checkImportsInFile(file)) {
      allImportsClean = false;
    }
  });

  if (allImportsClean) {
    console.log('  ✅ 所有导入语句正确');
  }

  // 最终报告
  console.log('\n📊 检查结果');
  console.log('============');
  
  if (allFilesExist && allDepsPresent && allImportsClean) {
    console.log('🎉 所有检查通过！项目应该可以正常启动。');
    console.log('\n🚀 运行以下命令启动项目:');
    console.log('   npm install');
    console.log('   npm run dev');
  } else {
    console.log('❌ 发现问题，需要修复:');
    if (!allFilesExist) console.log('   - 有关键文件缺失');
    if (!allDepsPresent) console.log('   - 有依赖包缺失');
    if (!allImportsClean) console.log('   - 有导入语句问题');
    
    console.log('\n🔧 建议运行修复脚本:');
    console.log('   ./final-fix.sh    # Linux/Mac');
    console.log('   final-fix.bat     # Windows');
  }

} catch (error) {
  console.log(`❌ 检查过程出错: ${error.message}`);
}