import React from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Users, Star, BookOpen, MessageCircle, Target, TrendingUp } from 'lucide-react';

interface Student {
  id: string;
  name: string;
  group: string;
  points: number;
  homeworkCount: number;
  interactionCount: number;
}

interface ClassroomStatsProps {
  students: Student[];
}

export function ClassroomStats({ students }: ClassroomStatsProps) {
  // 计算统计数据
  const totalStudents = students.length;
  const totalPoints = students.reduce((sum, s) => sum + s.points, 0);
  const totalHomework = students.reduce((sum, s) => sum + s.homeworkCount, 0);
  const totalInteractions = students.reduce((sum, s) => sum + s.interactionCount, 0);
  const avgPoints = totalStudents > 0 ? Math.round(totalPoints / totalStudents) : 0;
  
  // 活跃度分析
  const activeStudents = students.filter(s => s.interactionCount > 0).length;
  const activeRate = totalStudents > 0 ? Math.round((activeStudents / totalStudents) * 100) : 0;
  
  // 作业完成情况
  const homeworkActiveStudents = students.filter(s => s.homeworkCount > 0).length;
  const homeworkRate = totalStudents > 0 ? Math.round((homeworkActiveStudents / totalStudents) * 100) : 0;
  
  // 小组统计
  const groups = students.reduce((acc, student) => {
    if (!acc[student.group]) {
      acc[student.group] = { count: 0, points: 0 };
    }
    acc[student.group].count += 1;
    acc[student.group].points += student.points;
    return acc;
  }, {} as Record<string, { count: number; points: number }>);
  
  const groupCount = Object.keys(groups).length;

  const stats = [
    {
      icon: Users,
      label: '总学生数',
      value: totalStudents,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
      unit: '人'
    },
    {
      icon: Star,
      label: '总积分',
      value: totalPoints,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-50',
      unit: '分'
    },
    {
      icon: Target,
      label: '平均积分',
      value: avgPoints,
      color: 'text-green-500',
      bgColor: 'bg-green-50',
      unit: '分'
    },
    {
      icon: MessageCircle,
      label: '总互动次数',
      value: totalInteractions,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50',
      unit: '次'
    },
    {
      icon: BookOpen,
      label: '总作业次数',
      value: totalHomework,
      color: 'text-orange-500',
      bgColor: 'bg-orange-50',
      unit: '次'
    },
    {
      icon: TrendingUp,
      label: '参与率',
      value: activeRate,
      color: 'text-cyan-500',
      bgColor: 'bg-cyan-50',
      unit: '%'
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
      {stats.map((stat, index) => (
        <Card key={index} className="p-4">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${stat.bgColor}`}>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-bold">{stat.value}</span>
                <span className="text-xs text-muted-foreground">{stat.unit}</span>
              </div>
              <div className="text-xs text-muted-foreground truncate">
                {stat.label}
              </div>
            </div>
          </div>
        </Card>
      ))}
      
      {/* 额外的参与度指标 */}
      <div className="col-span-2 md:col-span-3 lg:col-span-6">
        <Card className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium">课堂参与度概览</h4>
            <Badge variant="outline">{groupCount} 个小组</Badge>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-500">{activeRate}%</div>
              <div className="text-xs text-muted-foreground">互动参与率</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-500">{homeworkRate}%</div>
              <div className="text-xs text-muted-foreground">作业参与率</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-500">
                {totalStudents > 0 ? Math.round(totalInteractions / totalStudents * 10) / 10 : 0}
              </div>
              <div className="text-xs text-muted-foreground">人均互动次数</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-500">
                {totalStudents > 0 ? Math.round(totalHomework / totalStudents * 10) / 10 : 0}
              </div>
              <div className="text-xs text-muted-foreground">人均作业次数</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}