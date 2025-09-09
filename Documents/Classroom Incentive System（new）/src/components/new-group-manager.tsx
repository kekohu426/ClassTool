import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Folder, Users } from 'lucide-react';
import { useDrop } from 'react-dnd';



interface NewGroupManagerProps {
  onStudentMove: (studentId: string, targetGroup: string) => void;
  existingGroups: string[];
  onAddStudent?: (name: string, group: string) => void;
}

export function NewGroupManager({ onStudentMove, existingGroups, onAddStudent }: NewGroupManagerProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [newStudentName, setNewStudentName] = useState('');
  const [droppedStudentId, setDroppedStudentId] = useState<string | null>(null);
  const [mode, setMode] = useState<'move' | 'create'>('create'); // 'move' for drag, 'create' for click

  const [{ isOver }, drop] = useDrop({
    accept: 'student',
    drop: (item: { id: string }) => {
      setDroppedStudentId(item.id);
      setMode('move');
      setIsDialogOpen(true);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const handleCreateGroup = () => {
    if (!newGroupName.trim()) return;

    if (mode === 'move' && droppedStudentId) {
      // 拖拽模式：移动学生到新组
      onStudentMove(droppedStudentId, newGroupName.trim());
    } else if (mode === 'create' && newStudentName.trim() && onAddStudent) {
      // 点击模式：创建新组并添加新学生
      onAddStudent(newStudentName.trim(), newGroupName.trim());
    }
    
    handleDialogClose();
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setNewGroupName('');
    setNewStudentName('');
    setDroppedStudentId(null);
    setMode('create');
  };

  const handleClick = () => {
    if (!onAddStudent) return; // 如果没有提供添加学生函数，则不支持点击
    setMode('create');
    setIsDialogOpen(true);
  };

  return (
    <>
      <div
        ref={drop}
        onClick={handleClick}
        className={`
          relative border-2 border-dashed rounded-lg p-2 transition-all duration-200 cursor-pointer
          ${isOver 
            ? 'border-green-400 bg-green-50 scale-105' 
            : 'border-gray-300 bg-gray-50 hover:border-gray-400 hover:bg-gray-100'
          }
        `}
      >
        <div className="flex items-center justify-center gap-1 text-xs text-gray-600">
          <Folder className="w-3 h-3" />
          <span>新组</span>
        </div>
        {isOver && (
          <div className="absolute inset-0 bg-green-100 border-2 border-green-400 rounded-lg flex items-center justify-center">
            <div className="text-green-700 text-xs font-medium">创建新组</div>
          </div>
        )}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={handleDialogClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {mode === 'move' ? '移动学生到新组' : '创建新组'}
            </DialogTitle>
            <DialogDescription>
              {mode === 'move' 
                ? '为拖拽的学生创建一个新的小组' 
                : '创建一个新组并添加第一个学生'
              }
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {mode === 'create' && (
              <div>
                <Label htmlFor="studentName">学生姓名</Label>
                <Input
                  id="studentName"
                  value={newStudentName}
                  onChange={(e) => setNewStudentName(e.target.value)}
                  placeholder="请输入学生姓名"
                  autoFocus
                />
              </div>
            )}
            <div>
              <Label htmlFor="groupName">新组名称</Label>
              <Input
                id="groupName"
                value={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
                placeholder="请输入新组名称"
                autoFocus={mode === 'move'}
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={handleDialogClose}>
                取消
              </Button>
              <Button 
                onClick={handleCreateGroup} 
                disabled={
                  !newGroupName.trim() || 
                  (mode === 'create' && !newStudentName.trim())
                }
              >
                {mode === 'move' ? '移动' : '创建'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}