# ✅ 下载安装检查清单

## 📋 下载后必做的事情

### 1. 验证下载完整性
检查是否包含以下关键文件：
- [ ] `package.json` - 项目依赖配置
- [ ] `App.tsx` - 主应用文件
- [ ] `start.sh` / `start.bat` - 快速启动脚本
- [ ] `components/` 目录 - 组件文件
- [ ] `pages/` 目录 - Next.js 页面
- [ ] `styles/globals.css` - 样式文件

### 2. 环境检查
在安装前，请确认：
- [ ] Node.js 版本 ≥ 18.0
- [ ] npm 版本 ≥ 8.0
- [ ] 网络连接正常（用于下载依赖）

```bash
# 检查版本
node --version
npm --version
```

### 3. 清理下载文件
如果是从压缩包解压：
- [ ] 删除压缩包文件（可选）
- [ ] 检查文件夹权限（Mac/Linux）

### 4. 选择安装方式

#### 方式一：一键启动（推荐）
**Windows:**
```cmd
双击运行 start.bat
```

**Mac/Linux:**
```bash
chmod +x start.sh
./start.sh
```

#### 方式二：手动安装
```bash
# 清理环境
rm -rf node_modules package-lock.json
npm cache clean --force

# 安装依赖
npm install

# 启动服务
npm run dev
```

## 🚨 常见下载问题

### 问题1: 文件缺失
**症状**: 缺少关键文件
**解决**: 重新下载完整项目包

### 问题2: 权限问题（Mac/Linux）
**症状**: 无法执行脚本
**解决**: 
```bash
chmod +x start.sh
chmod 755 components/
```

### 问题3: 路径包含中文
**症状**: 安装失败
**解决**: 将项目移至英文路径

### 问题4: 网络问题
**症状**: 依赖下载失败
**解决**: 使用国内镜像
```bash
npm install --registry https://registry.npmmirror.com
```

## ✅ 安装成功标志

看到以下信息表示安装成功：
```
✓ Ready in 2.1s
✓ Local:        http://localhost:3000
✓ Network:      http://192.168.x.x:3000
```

## 🎯 首次使用步骤

1. **访问应用**: 浏览器打开 http://localhost:3000
2. **添加学生**: 点击"添加学生"按钮
3. **测试功能**: 尝试加分操作
4. **检查音效**: 确认音效播放正常
5. **查看排行榜**: 验证数据更新

## 📞 遇到问题？

### 自助解决
1. 查看 [本地安装运行指南.md](./本地安装运行指南.md)
2. 检查浏览器控制台错误信息
3. 重启终端和浏览器

### 故障排除命令
```bash
# 完全重置
rm -rf node_modules .next package-lock.json
npm cache clean --force
npm install

# 检查端口占用
netstat -an | grep 3000  # Mac/Linux
netstat -an | findstr 3000  # Windows

# 使用其他端口
npm run dev -- -p 3001
```

---

## 🎉 准备就绪！

按照上述清单完成后，您就可以开始使用课堂荣誉墙了！

**记住**: 第一次启动会下载依赖包，需要几分钟时间，请耐心等待。

**祝您使用愉快！** 🚀