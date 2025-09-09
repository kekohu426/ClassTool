import React, { useState } from 'react';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Users, Edit, Check, X } from 'lucide-react';
import { useDrop } from 'react-dnd';

interface Student {
  id: string;
  name: string;
  group: string;
  points: number;
  homeworkCount: number;
  interactionCount: number;
}

interface EditableGroupHeaderProps {
  groupName: string;
  groupStudents: Student[];
  groupColor: string;
  onGroupNameChange: (oldName: string, newName: string) => void;
  onStudentMove: (studentId: string, targetGroup: string) => void;
}

export function EditableGroupHeader({ 
  groupName, 
  groupStudents, 
  groupColor,
  onGroupNameChange,
  onStudentMove
}: EditableGroupHeaderProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(groupName);

  const totalPoints = groupStudents.reduce((sum, student) => sum + student.points, 0);
  const avgPoints = Math.round(totalPoints / groupStudents.length);

  const [{ isOver }, drop] = useDrop({
    accept: 'student',
    drop: (item: { id: string; currentGroup: string }) => {
      if (item.currentGroup !== groupName) {
        onStudentMove(item.id, groupName);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const handleSave = () => {
    if (editName.trim() && editName.trim() !== groupName) {
      onGroupNameChange(groupName, editName.trim());
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditName(groupName);
    setIsEditing(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  return (
    <div ref={drop}>
      <div
        className={`p-2 rounded-lg bg-gradient-to-r ${groupColor} text-white shadow-lg transition-all duration-200 ${
          isOver ? 'ring-4 ring-white/50 scale-[1.02] shadow-2xl' : ''
        }`}
      >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 flex-1">
          <div className="p-1 bg-white/20 rounded">
            <Users className="w-4 h-4" />
          </div>
          <div className="flex-1">
            {isEditing ? (
              <div className="flex items-center gap-2">
                <Input
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  onKeyDown={handleKeyPress}
                  className="text-sm bg-white/20 border-white/30 text-white placeholder-white/70 h-7"
                  placeholder="组名"
                  autoFocus
                />
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-6 w-6 p-0 text-white hover:bg-white/20"
                  onClick={handleSave}
                >
                  <Check className="w-3 h-3" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-6 w-6 p-0 text-white hover:bg-white/20"
                  onClick={handleCancel}
                >
                  <X className="w-3 h-3" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold">{groupName}组</h3>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-6 w-6 p-0 text-white/80 hover:bg-white/20 hover:text-white"
                  onClick={() => setIsEditing(true)}
                >
                  <Edit className="w-3 h-3" />
                </Button>
              </div>
            )}
            <p className="text-white/90 text-xs">
              {groupStudents.length}人 · 总{totalPoints}分 · 均{avgPoints}分
              {isOver && <span className="ml-2">📥 拖放到这里</span>}
            </p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-lg font-bold">{totalPoints}</div>
          <div className="text-xs text-white/80">积分</div>
        </div>
      </div>
      </div>
    </div>
  );
}