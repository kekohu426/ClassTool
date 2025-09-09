import React from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Trophy, Medal, Award, Users } from 'lucide-react';

interface Student {
  id: string;
  name: string;
  group: string;
  points: number;
  homeworkCount: number;
  interactionCount: number;
}

interface Group {
  name: string;
  totalPoints: number;
  memberCount: number;
  avgPoints: number;
}

interface LeaderboardProps {
  students: Student[];
}

export function Leaderboard({ students }: LeaderboardProps) {
  // 统计数据
  const totalPoints = students.reduce((sum, s) => sum + s.points, 0);
  const totalHomework = students.reduce((sum, s) => sum + s.homeworkCount, 0);
  const totalInteractions = students.reduce((sum, s) => sum + s.interactionCount, 0);
  const activeStudents = students.filter(s => s.interactionCount > 0).length;
  const activeRate = students.length > 0 ? Math.round((activeStudents / students.length) * 100) : 0;

  // 个人排行榜
  const sortedStudents = [...students]
    .sort((a, b) => b.points - a.points)
    .slice(0, 8);

  // 小组排行榜
  const groups = students.reduce((acc, student) => {
    if (!acc[student.group]) {
      acc[student.group] = {
        name: student.group,
        totalPoints: 0,
        memberCount: 0,
        avgPoints: 0
      };
    }
    acc[student.group].totalPoints += student.points;
    acc[student.group].memberCount += 1;
    return acc;
  }, {} as Record<string, Group>);

  const sortedGroups = Object.values(groups)
    .map(group => ({
      ...group,
      avgPoints: Math.round(group.totalPoints / group.memberCount)
    }))
    .sort((a, b) => b.totalPoints - a.totalPoints)
    .slice(0, 6);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-4 h-4 text-yellow-500" />;
      case 2:
        return <Medal className="w-4 h-4 text-gray-400" />;
      case 3:
        return <Award className="w-4 h-4 text-orange-500" />;
      default:
        return <span className="w-4 h-4 flex items-center justify-center text-xs font-bold text-muted-foreground">#{rank}</span>;
    }
  };

  const getRankBg = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-100 to-yellow-50 border-yellow-200';
      case 2:
        return 'bg-gradient-to-r from-gray-100 to-gray-50 border-gray-200';
      case 3:
        return 'bg-gradient-to-r from-orange-100 to-orange-50 border-orange-200';
      default:
        return 'bg-white border-gray-100';
    }
  };

  return (
    <div className="space-y-3">
      {/* 统计概览 */}
      <Card className="p-3">
        <h3 className="font-medium mb-2 text-sm">课堂概览</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="text-center p-2 bg-blue-50 rounded">
            <div className="font-bold text-blue-600">{totalPoints}</div>
            <div className="text-blue-500">总积分</div>
          </div>
          <div className="text-center p-2 bg-green-50 rounded">
            <div className="font-bold text-green-600">{activeRate}%</div>
            <div className="text-green-500">参与率</div>
          </div>
          <div className="text-center p-2 bg-purple-50 rounded">
            <div className="font-bold text-purple-600">{totalInteractions}</div>
            <div className="text-purple-500">总发言</div>
          </div>
          <div className="text-center p-2 bg-orange-50 rounded">
            <div className="font-bold text-orange-600">{totalHomework}</div>
            <div className="text-orange-500">总作业</div>
          </div>
        </div>
      </Card>

      {/* 个人排行榜 */}
      <Card className="p-3">
        <div className="flex items-center gap-2 mb-2">
          <Trophy className="w-4 h-4 text-yellow-500" />
          <h3 className="font-medium text-sm">个人榜</h3>
        </div>
        
        <div className="space-y-1">
          {sortedStudents.map((student, index) => (
            <div
              key={student.id}
              className={`flex items-center gap-2 p-1.5 rounded border ${getRankBg(index + 1)}`}
            >
              {getRankIcon(index + 1)}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1">
                  <span className="font-medium truncate text-xs">{student.name}</span>
                  <Badge variant="outline" className="text-xs px-1 py-0">
                    {student.group}
                  </Badge>
                </div>
                <div className="text-xs text-muted-foreground">
                  {student.interactionCount}发言 · {student.homeworkCount}作业
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-sm">{student.points}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* 小组排行榜 */}
      <Card className="p-3">
        <div className="flex items-center gap-2 mb-2">
          <Users className="w-4 h-4 text-blue-500" />
          <h3 className="font-medium text-sm">小组榜</h3>
        </div>
        
        <div className="space-y-1">
          {sortedGroups.map((group, index) => (
            <div
              key={group.name}
              className={`flex items-center gap-2 p-1.5 rounded border ${getRankBg(index + 1)}`}
            >
              {getRankIcon(index + 1)}
              <div className="flex-1">
                <div className="flex items-center gap-1">
                  <span className="font-medium text-xs">{group.name}组</span>
                  <Badge variant="secondary" className="text-xs px-1 py-0">
                    {group.memberCount}人
                  </Badge>
                </div>
                <div className="text-xs text-muted-foreground">
                  平均 {group.avgPoints} 分
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-sm">{group.totalPoints}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}