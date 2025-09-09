# 🚀 部署指南

## 部署选项

### 选项 1: Vercel + Supabase (推荐)

#### 1. 前端部署到 Vercel

```bash
# 1. 安装 Vercel CLI
npm install -g vercel

# 2. 登录 Vercel
vercel login

# 3. 部署项目
vercel --prod

# 4. 设置环境变量
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel env add SUPABASE_SERVICE_ROLE_KEY
```

#### 2. 部署 Supabase Edge Functions

```bash
# 1. 安装 Supabase CLI
npm install -g supabase

# 2. 登录 Supabase
supabase login

# 3. 链接到您的项目
supabase link --project-ref YOUR_PROJECT_ID

# 4. 部署 Edge Functions
supabase functions deploy
```

### 选项 2: Netlify + Supabase

#### 1. 构建配置 (netlify.toml)
```toml
[build]
  command = "npm run build"
  publish = ".next"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

#### 2. 部署步骤
1. 连接 GitHub 仓库到 Netlify
2. 设置构建命令: `npm run build`
3. 设置发布目录: `.next`
4. 添加环境变量

### 选项 3: 自托管 (Docker)

#### Dockerfile
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

#### 部署命令
```bash
# 构建镜像
docker build -t classroom-system .

# 运行容器
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_SUPABASE_URL=your_url \
  -e NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key \
  classroom-system
```

## 📋 部署检查清单

- [ ] Supabase 项目已创建
- [ ] 数据库表已创建 (运行 database-setup.sql)
- [ ] Edge Functions 已部署
- [ ] 环境变量已设置
- [ ] 前端应用已部署
- [ ] DNS 配置完成 (如使用自定义域名)
- [ ] SSL 证书已配置
- [ ] 功能测试通过

## 🔧 故障排除

### 常见问题

**问题 1: 连接数据库失败**
- 检查 Supabase URL 和密钥是否正确
- 确认数据库表已创建
- 检查网络连接

**问题 2: Edge Functions 调用失败**
- 确认 Functions 已正确部署
- 检查 CORS 设置
- 查看 Supabase 日志
- 确认导入语句使用 `npm:` 前缀格式

**问题 3: 包导入错误**
- 在 Edge Functions 中，确保使用 `npm:package@version` 格式
- 例如：`import { createClient } from "npm:@supabase/supabase-js@2.49.8"`

**问题 4: 前端构建失败**
- 检查 Node.js 版本 (需要 18+)
- 确认所有依赖已安装
- 查看构建日志错误

### 调试命令

```bash
# 查看 Supabase 状态
supabase status

# 查看 Functions 日志
supabase functions logs

# 本地开发
npm run dev

# 构建测试
npm run build
```

## 📞 获取帮助

如果遇到部署问题：

1. 检查 [Supabase 文档](https://supabase.com/docs)
2. 查看 [Next.js 部署指南](https://nextjs.org/docs/deployment)
3. 参考 [Vercel 部署文档](https://vercel.com/docs)

---

🎉 **部署成功后，您就可以使用自己的课堂荣誉墙系统了！**