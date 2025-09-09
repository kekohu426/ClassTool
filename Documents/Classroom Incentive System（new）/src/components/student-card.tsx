import React from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Plus, BookOpen, MessageCircle } from 'lucide-react';
import { useDrag } from 'react-dnd';

interface Student {
  id: string;
  name: string;
  group: string;
  points: number;
  homeworkCount: number;
  interactionCount: number;
}

interface StudentCardProps {
  student: Student;
  onAddPoints: (studentId: string, points: number) => void;
  onAddHomework: (studentId: string) => void;
  selectedStudent: string | null;
  onSelectStudent: (studentId: string) => void;
  compact?: boolean;
}

const getPointsColor = (points: number): string => {
  if (points >= 100) return 'from-yellow-400 to-orange-500'; // 金色
  if (points >= 61) return 'from-purple-400 to-pink-500'; // 紫色
  if (points >= 31) return 'from-green-400 to-emerald-500'; // 绿色
  if (points >= 11) return 'from-blue-400 to-cyan-500'; // 蓝色
  return 'from-gray-300 to-gray-400'; // 灰色
};

const getHomeworkColor = (count: number): string => {
  if (count >= 6) return 'bg-blue-500'; // 蓝色
  if (count >= 3) return 'bg-green-500'; // 绿色
  if (count >= 1) return 'bg-orange-500'; // 橙色
  return 'bg-red-500'; // 红色
};

const getPointsLevel = (points: number): string => {
  if (points >= 100) return '传奇';
  if (points >= 61) return '优秀';
  if (points >= 31) return '良好';
  if (points >= 11) return '合格';
  return '新手';
};

export function StudentCard({ student, onAddPoints, onAddHomework, selectedStudent, onSelectStudent, compact = false }: StudentCardProps) {
  const isSelected = selectedStudent === student.id;
  const pointsGradient = getPointsColor(student.points);
  const homeworkColor = getHomeworkColor(student.homeworkCount);
  const level = getPointsLevel(student.points);

  const [{ isDragging }, drag] = useDrag({
    type: 'student',
    item: { id: student.id, currentGroup: student.group },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  if (compact) {
    return (
      <div 
        ref={drag}
        className={isDragging ? 'opacity-50 rotate-3 scale-95' : ''}
      >
        <Card 
          className={`p-2 transition-all duration-300 cursor-move hover:shadow-lg ${
            isSelected && !isDragging ? 'ring-2 ring-blue-500 shadow-xl' : ''
          } ${isDragging ? 'cursor-grabbing' : 'cursor-pointer'}`}
          onClick={(e) => {
            if (!isDragging) {
              onSelectStudent(student.id);
            }
          }}
        >
        <div className={`w-full h-1 rounded-full bg-gradient-to-r ${pointsGradient} mb-1.5`} />
        
        <div className="mb-1.5">
          <h4 className="font-medium text-xs truncate mb-0.5">{student.name}</h4>
          <div className="flex items-center justify-between">
            <span className="font-bold text-sm">{student.points}</span>
            <Badge variant="secondary" className="text-xs px-1 py-0 h-4">{level}</Badge>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-0.5 text-blue-600">
            <BookOpen className="w-2.5 h-2.5" />
            <span>{student.homeworkCount}</span>
          </div>
          <div className="flex items-center gap-0.5 text-green-600">
            <MessageCircle className="w-2.5 h-2.5" />
            <span>{student.interactionCount}</span>
          </div>
          <div className="text-gray-400 text-xs">
            {isDragging ? '↗️' : '⋮⋮'}
          </div>
        </div>

        {isSelected && !isDragging && (
          <div className="mt-1.5 space-y-1">
            <div className="grid grid-cols-4 gap-0.5">
              {[1, 3, 5, 10].map((points) => (
                <Button
                  key={points}
                  size="sm"
                  variant="outline"
                  className="h-5 text-xs px-0.5"
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddPoints(student.id, points);
                  }}
                >
                  +{points}
                </Button>
              ))}
            </div>
            
            <Button
              size="sm"
              variant="outline"
              className="w-full h-5 text-xs"
              onClick={(e) => {
                e.stopPropagation();
                onAddHomework(student.id);
              }}
            >
              <BookOpen className="w-2.5 h-2.5 mr-1" />
              作业
            </Button>
            
            <div className="text-center text-xs text-gray-500 pt-1">
              💡 拖拽可移动到其他组
            </div>
          </div>
        )}
        </Card>
      </div>
    );
  }

  return (
    <div 
      ref={drag}
      className={isDragging ? 'opacity-50 rotate-3 scale-95' : ''}
    >
      <Card 
        className={`p-4 transition-all duration-300 cursor-move hover:shadow-lg ${
          isSelected && !isDragging ? 'ring-2 ring-blue-500 shadow-xl' : ''
        } ${isDragging ? 'cursor-grabbing' : 'cursor-pointer'}`}
        onClick={(e) => {
          if (!isDragging) {
            onSelectStudent(student.id);
          }
        }}
      >
      <div className={`w-full h-2 rounded-full bg-gradient-to-r ${pointsGradient} mb-3`} />
      
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-medium truncate">{student.name}</h3>
        <Badge variant="outline" className="text-xs">
          {student.group}组
        </Badge>
      </div>

      <div className="space-y-2 mb-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">积分</span>
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg">{student.points}</span>
            <Badge variant="secondary" className="text-xs">{level}</Badge>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">作业提交</span>
          <div className="flex items-center gap-2">
            <span className="text-sm">{student.homeworkCount}次</span>
            <div className={`w-3 h-3 rounded-full ${homeworkColor}`} />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">课堂发言</span>
          <div className="flex items-center gap-1">
            <MessageCircle className="w-4 h-4 text-blue-500" />
            <span className="text-sm">{student.interactionCount}次</span>
          </div>
        </div>
      </div>

      {isSelected && !isDragging && (
        <div className="space-y-2">
          <div className="grid grid-cols-4 gap-1">
            {[1, 3, 5, 10].map((points) => (
              <Button
                key={points}
                size="sm"
                variant="outline"
                className="h-8 text-xs"
                onClick={(e) => {
                  e.stopPropagation();
                  onAddPoints(student.id, points);
                }}
              >
                +{points}
              </Button>
            ))}
          </div>
          
          <Button
            size="sm"
            variant="outline"
            className="w-full h-8 text-xs"
            onClick={(e) => {
              e.stopPropagation();
              onAddHomework(student.id);
            }}
          >
            <BookOpen className="w-3 h-3 mr-1" />
            提交作业
          </Button>
          
          <div className="text-center text-xs text-gray-500 pt-1">
            💡 拖拽可移动到其他组
          </div>
        </div>
      )}
      </Card>
    </div>
  );
}