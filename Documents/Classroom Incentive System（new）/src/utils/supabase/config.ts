// Supabase 配置文件 - 自部署版本
// 请将以下信息替换为您自己的 Supabase 项目信息

// 检查环境变量是否可用（仅在 Node.js 环境中）
const getEnvVar = (name: string, fallback: string) => {
  if (typeof window === 'undefined' && typeof process !== 'undefined') {
    return process.env[name] || fallback;
  }
  return fallback;
};

export const supabaseConfig = {
  // 将下面的 URL 替换为您的 Supabase Project URL
  url: getEnvVar('NEXT_PUBLIC_SUPABASE_URL', 'https://your-project-id.supabase.co'),
  
  // 将下面的 Key 替换为您的 Supabase Anon Key  
  anonKey: getEnvVar('NEXT_PUBLIC_SUPABASE_ANON_KEY', 'your-anon-key-here'),
  
  // 服务端密钥（仅在服务端使用，不要暴露给前端）
  serviceRoleKey: getEnvVar('SUPABASE_SERVICE_ROLE_KEY', 'your-service-role-key-here')
};

// 项目 ID（从 URL 中提取）
export const projectId = supabaseConfig.url.includes('your-project-id') 
  ? 'your-project-id' 
  : supabaseConfig.url.split('//')[1].split('.')[0];

// 导出公开密钥
export const publicAnonKey = supabaseConfig.anonKey;