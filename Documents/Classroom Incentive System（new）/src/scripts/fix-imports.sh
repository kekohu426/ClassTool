#!/bin/bash

# 修复 Supabase Edge Functions 导入问题的脚本

echo "🔧 修复 Supabase Edge Functions 导入格式..."

# 确保 kv_store.tsx 使用正确的 npm 导入格式
if [ -f "supabase/functions/server/kv_store.tsx" ]; then
    sed -i 's|import { createClient } from "@supabase/supabase-js"|import { createClient } from "npm:@supabase/supabase-js@2.49.8"|g' supabase/functions/server/kv_store.tsx
    echo "✅ 已修复 kv_store.tsx 导入格式"
else
    echo "❌ 找不到 kv_store.tsx 文件"
fi

# 检查 index.tsx 是否使用了正确格式
if [ -f "supabase/functions/server/index.tsx" ]; then
    if grep -q "npm:hono" supabase/functions/server/index.tsx; then
        echo "✅ index.tsx 导入格式正确"
    else
        echo "⚠️  index.tsx 可能需要检查导入格式"
    fi
else
    echo "❌ 找不到 index.tsx 文件"
fi

echo "🚀 导入格式修复完成！现在可以尝试重新部署。"