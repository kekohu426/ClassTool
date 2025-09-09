import React, { useState } from 'react';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Plus, Users } from 'lucide-react';
import { useDrop } from 'react-dnd';

interface NewGroupDropZoneProps {
  onStudentMove: (studentId: string, targetGroup: string) => void;
  existingGroups: string[];
}

export function NewGroupDropZone({ onStudentMove, existingGroups }: NewGroupDropZoneProps) {
  const [isCreating, setIsCreating] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');

  const [{ isOver }, drop] = useDrop({
    accept: 'student',
    drop: (item: { id: string; currentGroup: string }) => {
      if (isCreating && newGroupName.trim()) {
        handleCreateGroup(item.id);
      } else {
        setIsCreating(true);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const handleCreateGroup = (studentId?: string) => {
    if (newGroupName.trim() && !existingGroups.includes(newGroupName.trim())) {
      if (studentId) {
        onStudentMove(studentId, newGroupName.trim());
      }
      setNewGroupName('');
      setIsCreating(false);
    }
  };

  const handleCancel = () => {
    setNewGroupName('');
    setIsCreating(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCreateGroup();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  return (
    <div ref={drop}>
      <Card
        className={`p-4 border-2 border-dashed transition-all duration-200 ${
          isOver 
            ? 'border-blue-500 bg-blue-50 scale-105 shadow-lg' 
            : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
        }`}
      >
      <div className="flex items-center justify-center gap-2 text-gray-500">
        {isCreating ? (
          <div className="flex items-center gap-2 w-full">
            <Users className="w-5 h-5 text-blue-500" />
            <Input
              value={newGroupName}
              onChange={(e) => setNewGroupName(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="新组名称"
              className="flex-1"
              autoFocus
            />
            <Button
              size="sm"
              onClick={() => handleCreateGroup()}
              disabled={!newGroupName.trim() || existingGroups.includes(newGroupName.trim())}
            >
              创建
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={handleCancel}
            >
              取消
            </Button>
          </div>
        ) : (
          <>
            <Plus className="w-5 h-5" />
            <span className="text-sm">
              {isOver ? '拖拽到这里创建新组' : '点击或拖拽学生到这里创建新组'}
            </span>
          </>
        )}
      </div>
      
      {!isCreating && (
        <Button
          variant="ghost"
          size="sm"
          className="w-full mt-2"
          onClick={() => setIsCreating(true)}
        >
          <Plus className="w-4 h-4 mr-1" />
          创建新组
        </Button>
      )}
      </Card>
    </div>
  );
}