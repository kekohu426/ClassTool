// 课堂荣誉墙系统 - Supabase 配置
// 配置已设置完成，代码可以直接运行

export const SUPABASE_URL = 'https://doqhdrckqluuieeonlfl.supabase.co';
export const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRvcWhkcmNrcWx1dWllZW9ubGZsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcyOTc4MjcsImV4cCI6MjA3Mjg3MzgyN30.7hQQjOLEKyJuqulecCuxEFs3x2fY3YrQXwm2LMaTVUA';

export const projectId = SUPABASE_URL.split('//')[1].split('.')[0];
export const publicAnonKey = SUPABASE_ANON_KEY;

export const supabaseConfig = {
  url: SUPABASE_URL,
  anonKey: SUPABASE_ANON_KEY
};