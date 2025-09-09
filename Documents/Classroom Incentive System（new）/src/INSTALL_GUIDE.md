# 🛠️ 课堂荣誉墙 - 安装指南

## 📋 前置要求
- Node.js 18+ 
- npm 8+

## 🚀 安装步骤

### 1. 彻底清理项目目录
```bash
# 删除所有可能的锁定文件和缓存
rm -rf node_modules
rm -f package-lock.json
rm -f yarn.lock
rm -f pnpm-lock.yaml
rm -rf .next

# 清理 npm 缓存
npm cache clean --force
```

### 2. 安装依赖
```bash
npm install
```

### 3. 启动开发服务器
```bash
npm run dev
```

### 4. 访问应用
打开浏览器访问: http://localhost:3000

## 🔧 故障排除

### 问题：包名错误
如果遇到 "Invalid package name" 错误：
1. 确保完全删除了 `node_modules` 目录
2. 删除 `package-lock.json` 文件
3. 运行 `npm cache clean --force`
4. 重新运行 `npm install`

### 问题：端口被占用
```bash
# 使用其他端口
npm run dev -- -p 3001
```

### 问题：TypeScript 错误
```bash
# 重新生成 TypeScript 定义
npm run build
```

## 📁 项目结构
```
├── App.tsx              # 主应用组件
├── components/          # 组件目录
│   ├── student-card.tsx         # 学生卡片
│   ├── leaderboard.tsx          # 排行榜
│   ├── student-management.tsx   # 学生管理
│   └── sound-manager.tsx        # 音效管理
├── pages/               # Next.js 页面
├── styles/              # 样式文件
└── supabase/           # 后端函数
```

## ✅ 验证安装
启动成功后，你应该看到：
- 课堂荣誉墙标题
- 添加学生按钮
- 空的学生网格（如果是首次使用）
- 右侧排行榜区域

## 🎯 下一步
1. 点击"添加学生"按钮添加第一个学生
2. 点击学生卡片进行积分操作
3. 体验音效反馈和实时排行榜功能

---
🎉 **安装完成！开始享受你的课堂荣誉墙吧！**