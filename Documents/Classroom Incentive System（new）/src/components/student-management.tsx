import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { UserPlus, Download, Upload, RotateCcw, FileDown } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './ui/alert-dialog';
import { NewGroupManager } from './new-group-manager';

interface Student {
  id: string;
  name: string;
  group: string;
  points: number;
  homeworkCount: number;
  interactionCount: number;
}

interface StudentManagementProps {
  students: Student[];
  onAddStudent: (name: string, group: string) => void;
  onResetAll: () => void;
  onImportData: (data: Student[]) => void;
  onExportData: () => void;
  onStudentMove?: (studentId: string, targetGroup: string) => void;
}

export function StudentManagement({ 
  students, 
  onAddStudent, 
  onResetAll, 
  onImportData, 
  onExportData,
  onStudentMove
}: StudentManagementProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newStudentName, setNewStudentName] = useState('');
  const [newStudentGroup, setNewStudentGroup] = useState('');

  // 获取现有的组别
  const existingGroups = Array.from(new Set(students.map(s => s.group))).sort();
  
  const handleAddStudent = () => {
    if (newStudentName.trim() && newStudentGroup.trim()) {
      onAddStudent(newStudentName.trim(), newStudentGroup.trim());
      setNewStudentName('');
      setNewStudentGroup('');
      setIsDialogOpen(false);
    }
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target?.result as string);
          if (Array.isArray(data)) {
            onImportData(data);
          }
        } catch (error) {
          console.error('导入数据格式错误:', error);
        }
      };
      reader.readAsText(file);
    }
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(students, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `classroom-data-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    onExportData();
  };

  const handleDownloadTemplate = () => {
    // 创建模版数据
    const templateData = Array.from({ length: 30 }, (_, index) => ({
      id: (index + 1).toString(),
      name: `学生${index + 1}`,
      group: `第${Math.floor(index / 5) + 1}`,
      points: 0,
      homeworkCount: 0,
      interactionCount: 0
    }));

    const dataStr = JSON.stringify(templateData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'student-data-template.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex items-center gap-1">
      {/* 新组创建区域 - 只在有拖拽功能时显示 */}
      {onStudentMove && (
        <NewGroupManager 
          onStudentMove={onStudentMove}
          existingGroups={existingGroups}
          onAddStudent={onAddStudent}
        />
      )}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button size="sm" className="gap-1 text-xs px-2 py-1">
            <UserPlus className="w-3 h-3" />
            添加
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>添加新学生</DialogTitle>
            <DialogDescription>
              请输入学生信息并选择所属小组
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">学生姓名</Label>
              <Input
                id="name"
                value={newStudentName}
                onChange={(e) => setNewStudentName(e.target.value)}
                placeholder="请输入学生姓名"
              />
            </div>
            <div>
              <Label htmlFor="group">所属小组</Label>
              <div className="flex gap-2">
                <Select value={newStudentGroup} onValueChange={setNewStudentGroup}>
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="选择小组或输入新组名" />
                  </SelectTrigger>
                  <SelectContent>
                    {existingGroups.map((group) => (
                      <SelectItem key={group} value={group}>
                        {group}组
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  className="flex-1"
                  value={newStudentGroup}
                  onChange={(e) => setNewStudentGroup(e.target.value)}
                  placeholder="或输入新组名"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                取消
              </Button>
              <Button onClick={handleAddStudent}>
                添加
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Button size="sm" variant="outline" onClick={handleExport} className="gap-1 text-xs px-2 py-1">
        <Download className="w-3 h-3" />
        导出
      </Button>

      <Button size="sm" variant="outline" onClick={handleDownloadTemplate} className="gap-1 text-xs px-2 py-1">
        <FileDown className="w-3 h-3" />
        模版
      </Button>

      <div className="relative">
        <Button size="sm" variant="outline" className="gap-1 text-xs px-2 py-1">
          <Upload className="w-3 h-3" />
          导入
        </Button>
        <input
          type="file"
          accept=".json"
          onChange={handleImport}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />
      </div>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button size="sm" variant="destructive" className="gap-1 text-xs px-2 py-1">
            <RotateCcw className="w-3 h-3" />
            重置
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>确认重置</AlertDialogTitle>
            <AlertDialogDescription>
              这将清除所有学生的积分和作业记录，此操作不可撤销。确定要继续吗？
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>取消</AlertDialogCancel>
            <AlertDialogAction onClick={onResetAll}>
              确认重置
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}