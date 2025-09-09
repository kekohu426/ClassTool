-- 课堂积分系统数据库初始化脚本
-- 在 Supabase Dashboard > SQL Editor 中运行此脚本

-- 创建 kv_store 表用于存储应用数据
CREATE TABLE IF NOT EXISTS kv_store_2e166dbc (
  key TEXT NOT NULL PRIMARY KEY,
  value JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建更新时间戳的触发器函数
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 为 kv_store 表创建更新触发器
CREATE TRIGGER update_kv_store_updated_at 
    BEFORE UPDATE ON kv_store_2e166dbc 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 创建索引以提高查询性能
CREATE INDEX IF NOT EXISTS idx_kv_store_key ON kv_store_2e166dbc(key);
CREATE INDEX IF NOT EXISTS idx_kv_store_created_at ON kv_store_2e166dbc(created_at);

-- 插入初始配置数据
INSERT INTO kv_store_2e166dbc (key, value) VALUES 
('app_config', '{"version": "1.0.0", "initialized": true, "created_at": "2024-01-01T00:00:00.000Z"}')
ON CONFLICT (key) DO NOTHING;