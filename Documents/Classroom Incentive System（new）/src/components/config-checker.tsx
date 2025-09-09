import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { CheckCircle, XCircle, AlertCircle, ExternalLink } from 'lucide-react';
import { projectId, publicAnonKey, SUPABASE_URL } from '../utils/supabase/client-config';

interface ConfigCheckerProps {
  onClose: () => void;
}

export function ConfigChecker({ onClose }: ConfigCheckerProps) {
  const [checking, setChecking] = useState(false);
  const [results, setResults] = useState<{
    url: boolean;
    key: boolean;
    connection: boolean;
  } | null>(null);

  const checkConfiguration = async () => {
    setChecking(true);
    
    const newResults = {
      url: false,
      key: false,
      connection: false
    };

    // 检查 URL 格式
    const urlPattern = /^https:\/\/[a-z0-9]+\.supabase\.co$/;
    newResults.url = urlPattern.test(SUPABASE_URL) && !SUPABASE_URL.includes('your-project-id');

    // 检查 Key 格式
    newResults.key = publicAnonKey.startsWith('eyJ') && !publicAnonKey.includes('your-anon-key');

    // 检查连接
    if (newResults.url && newResults.key) {
      try {
        const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-2e166dbc/health`, {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          }
        });
        newResults.connection = response.ok;
      } catch (error) {
        newResults.connection = false;
      }
    }

    setResults(newResults);
    setChecking(false);
  };

  const allValid = results && Object.values(results).every(Boolean);

  return (
    <Card className="p-6 max-w-md mx-auto">
      <div className="space-y-4">
        <div className="text-center">
          <h3 className="font-semibold">配置检查器</h3>
          <p className="text-sm text-gray-600">验证 Supabase 配置是否正确</p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm">项目 URL</span>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="font-mono text-xs">
                {projectId}
              </Badge>
              {results && (
                results.url ? 
                  <CheckCircle className="w-4 h-4 text-green-500" /> :
                  <XCircle className="w-4 h-4 text-red-500" />
              )}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm">API 密钥</span>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="font-mono text-xs">
                {publicAnonKey.substring(0, 8)}...
              </Badge>
              {results && (
                results.key ? 
                  <CheckCircle className="w-4 h-4 text-green-500" /> :
                  <XCircle className="w-4 h-4 text-red-500" />
              )}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm">服务连接</span>
            {results && (
              results.connection ? 
                <CheckCircle className="w-4 h-4 text-green-500" /> :
                <XCircle className="w-4 h-4 text-red-500" />
            )}
          </div>
        </div>

        {results && !allValid && (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              配置有误，请检查 <code>utils/supabase/client-config.ts</code> 文件。
              <br />
              <a 
                href="https://supabase.com/dashboard" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-blue-600 hover:underline mt-1"
              >
                打开 Supabase Dashboard <ExternalLink className="w-3 h-3" />
              </a>
            </AlertDescription>
          </Alert>
        )}

        {allValid && (
          <Alert className="border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              配置正确！系统可以正常使用。
            </AlertDescription>
          </Alert>
        )}

        <div className="flex gap-2">
          <Button 
            onClick={checkConfiguration}
            disabled={checking}
            className="flex-1"
          >
            {checking ? '检查中...' : '重新检查'}
          </Button>
          <Button variant="outline" onClick={onClose}>
            关闭
          </Button>
        </div>
      </div>
    </Card>
  );
}