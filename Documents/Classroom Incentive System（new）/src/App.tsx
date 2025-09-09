import React, { useState, useEffect, useCallback } from 'react';
import { StudentCard } from './components/student-card';
import { Leaderboard } from './components/leaderboard';
import { StudentManagement } from './components/student-management';
import { ClassroomStats } from './components/classroom-stats';
import { useSoundManager } from './components/sound-manager';
import { DragDropProvider } from './components/drag-drop-provider';
import { EditableGroupHeader } from './components/editable-group-header';

import { Button } from './components/ui/button';
import { Badge } from './components/ui/badge';
import { Card } from './components/ui/card';
import { Toaster } from './components/ui/sonner';
import { toast } from 'sonner';
import { Trophy, Star, Sparkles, Users } from 'lucide-react';
import { projectId, publicAnonKey } from './utils/supabase/info';

interface Student {
  id: string;
  name: string;
  group: string;
  points: number;
  homeworkCount: number;
  interactionCount: number;
}

const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-2e166dbc`;

export default function App() {
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [groupOrder, setGroupOrder] = useState<string[]>([]);
  const soundManager = useSoundManager();

  // 从服务器加载数据
  const loadStudents = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE}/students`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`
        }
      });
      const data = await response.json();
      const studentsData = data.students || [];
      setStudents(studentsData);
      
      // 更新组顺序
      const groups = [...new Set(studentsData.map((s: Student) => s.group))];
      const existingOrder = data.groupOrder || [];
      const newGroups = groups.filter(g => !existingOrder.includes(g));
      setGroupOrder([...existingOrder, ...newGroups]);
    } catch (error) {
      console.error('加载学生数据失败:', error);
      toast.error('加载数据失败');
    } finally {
      setLoading(false);
    }
  }, []);

  // 保存数据到服务器
  const saveStudents = useCallback(async (studentsData: Student[], groupOrderData?: string[]) => {
    try {
      await fetch(`${API_BASE}/students`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`
        },
        body: JSON.stringify({ 
          students: studentsData, 
          groupOrder: groupOrderData || groupOrder 
        })
      });
    } catch (error) {
      console.error('保存学生数据失败:', error);
      toast.error('保存数据失败');
    }
  }, [groupOrder]);

  useEffect(() => {
    loadStudents();
  }, [loadStudents]);

  // 添加学生
  const handleAddStudent = async (name: string, group: string) => {
    const newStudent: Student = {
      id: Date.now().toString(),
      name,
      group,
      points: 0,
      homeworkCount: 0,
      interactionCount: 0
    };
    
    const newStudents = [...students, newStudent];
    setStudents(newStudents);
    
    // 如果是新组，添加到组顺序中
    const newGroupOrder = [...groupOrder];
    if (!newGroupOrder.includes(group)) {
      newGroupOrder.push(group);
      setGroupOrder(newGroupOrder);
    }
    
    await saveStudents(newStudents, newGroupOrder);
    toast.success(`已添加学生 ${name}`);
  };

  // 加分
  const handleAddPoints = async (studentId: string, points: number) => {
    try {
      const response = await fetch(`${API_BASE}/students/${studentId}/points`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`
        },
        body: JSON.stringify({ points })
      });

      const data = await response.json();
      
      if (data.success) {
        setStudents(prev => prev.map(s => 
          s.id === studentId ? data.student : s
        ));

        // 播放音效
        if (soundManager) {
          switch (points) {
            case 1:
              soundManager.playPoints1();
              break;
            case 3:
              soundManager.playPoints3();
              break;
            case 5:
              soundManager.playPoints5();
              break;
            case 10:
              soundManager.playPoints10();
              break;
          }
        }

        // 检查是否升级
        const student = students.find(s => s.id === studentId);
        if (student) {
          const oldLevel = getPointsLevel(data.oldPoints);
          const newLevel = getPointsLevel(data.newPoints);
          
          if (oldLevel !== newLevel) {
            soundManager?.playLevelUp();
            toast.success(`🎉 ${student.name} 升级到 ${newLevel}！`, {
              duration: 3000,
            });
          } else {
            toast.success(`${student.name} +${points} 分！`, {
              duration: 2000,
            });
          }
        }
      }
    } catch (error) {
      console.error('更新积分失败:', error);
      toast.error('更新积分失败');
    }
  };

  // 提交作业
  const handleAddHomework = async (studentId: string) => {
    try {
      const response = await fetch(`${API_BASE}/students/${studentId}/homework`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`
        }
      });

      const data = await response.json();
      
      if (data.success) {
        setStudents(prev => prev.map(s => 
          s.id === studentId ? data.student : s
        ));

        soundManager?.playHomework();
        
        const student = students.find(s => s.id === studentId);
        toast.success(`📚 ${student?.name} 提交了作业！`);
      }
    } catch (error) {
      console.error('更新作业失败:', error);
      toast.error('更新作业失败');
    }
  };

  // 重置所有数据
  const handleResetAll = async () => {
    try {
      await fetch(`${API_BASE}/reset`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`
        }
      });
      
      setStudents([]);
      setSelectedStudent(null);
      setGroupOrder([]);
      toast.success('所有数据已重置');
    } catch (error) {
      console.error('重置数据失败:', error);
      toast.error('重置数据失败');
    }
  };

  // 导入数据
  const handleImportData = async (data: Student[]) => {
    setStudents(data);
    
    // 更新组顺序
    const groups = [...new Set(data.map(s => s.group))];
    setGroupOrder(groups);
    
    await saveStudents(data, groups);
    toast.success(`已导入 ${data.length} 名学生数据`);
  };

  // 导出数据
  const handleExportData = () => {
    toast.success('数据导出成功');
  };

  // 学生移动到新组
  const handleStudentMove = async (studentId: string, targetGroup: string) => {
    try {
      const response = await fetch(`${API_BASE}/students/${studentId}/group`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`
        },
        body: JSON.stringify({ group: targetGroup })
      });

      const data = await response.json();
      
      if (data.success) {
        const updatedStudents = students.map(s => 
          s.id === studentId ? data.student : s
        );
        setStudents(updatedStudents);
        
        // 如果是新组，添加到组顺序中
        const newGroupOrder = [...groupOrder];
        if (!newGroupOrder.includes(targetGroup)) {
          newGroupOrder.push(targetGroup);
          setGroupOrder(newGroupOrder);
          await saveStudents(updatedStudents, newGroupOrder);
        }
        
        // 清除选中状态，避免拖拽后卡片仍然显示为选中
        setSelectedStudent(null);
        
        const student = students.find(s => s.id === studentId);
        toast.success(`📦 ${student?.name} 已移动到 ${targetGroup}组`);
      }
    } catch (error) {
      console.error('移动学生失败:', error);
      toast.error('移动学生失败');
    }
  };

  // 组名更改
  const handleGroupNameChange = async (oldName: string, newName: string) => {
    try {
      const response = await fetch(`${API_BASE}/groups/${encodeURIComponent(oldName)}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`
        },
        body: JSON.stringify({ newName })
      });

      const data = await response.json();
      
      if (data.success) {
        const updatedStudents = students.map(s => 
          s.group === oldName ? { ...s, group: newName } : s
        );
        setStudents(updatedStudents);
        
        // 更新组顺序，保持位置不变
        const newGroupOrder = groupOrder.map(g => g === oldName ? newName : g);
        setGroupOrder(newGroupOrder);
        
        // 保存更新后的数据
        await saveStudents(updatedStudents, newGroupOrder);
        
        toast.success(`📝 ${oldName}组 已重命名为 ${newName}组`);
      }
    } catch (error) {
      console.error('更改组名失败:', error);
      toast.error('更改组名失败');
    }
  };

  const getPointsLevel = (points: number): string => {
    if (points >= 100) return '传奇';
    if (points >= 61) return '优秀';
    if (points >= 31) return '良好';
    if (points >= 11) return '合格';
    return '新手';
  };

  // 按组分组显示学生
  const GroupedStudentView = ({ students, selectedStudent, onSelectStudent, onAddPoints, onAddHomework, onStudentMove, onGroupNameChange }: {
    students: Student[];
    selectedStudent: string | null;
    onSelectStudent: (id: string) => void;
    onAddPoints: (id: string, points: number) => void;
    onAddHomework: (id: string) => void;
    onStudentMove: (studentId: string, targetGroup: string) => void;
    onGroupNameChange: (oldName: string, newName: string) => void;
  }) => {
    // 按组分组
    const groupedStudents = students.reduce((acc, student) => {
      if (!acc[student.group]) {
        acc[student.group] = [];
      }
      acc[student.group].push(student);
      return acc;
    }, {} as Record<string, Student[]>);

    // 按预设的组顺序排序，新组排在最后
    const existingGroups = Object.keys(groupedStudents);
    const orderedGroups = [...groupOrder.filter(g => existingGroups.includes(g))];
    const newGroups = existingGroups.filter(g => !groupOrder.includes(g));
    const finalGroupOrder = [...orderedGroups, ...newGroups];
    
    const sortedGroups = finalGroupOrder.map(groupName => [groupName, groupedStudents[groupName]] as [string, Student[]]);

    // 组颜色配置
    const groupColors = [
      'from-blue-500 to-blue-600',
      'from-green-500 to-green-600', 
      'from-purple-500 to-purple-600',
      'from-orange-500 to-orange-600',
      'from-pink-500 to-pink-600',
      'from-cyan-500 to-cyan-600',
      'from-yellow-500 to-yellow-600',
      'from-red-500 to-red-600'
    ];



    return (
      <div className="space-y-3">

        {sortedGroups.map(([groupName, groupStudents], groupIndex) => {
          const groupColor = groupColors[groupIndex % groupColors.length];
          const totalPoints = groupStudents.reduce((sum, student) => sum + student.points, 0);
          const avgPoints = Math.round(totalPoints / groupStudents.length);
          
          return (
            <div key={groupName} className="space-y-1.5">
              {/* 组标题 */}
              <EditableGroupHeader
                groupName={groupName}
                groupStudents={groupStudents}
                groupColor={groupColor}
                onGroupNameChange={onGroupNameChange}
                onStudentMove={onStudentMove}
              />
              
              {/* 组内学生 */}
              <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 2xl:grid-cols-12 gap-1.5">
                {groupStudents.map((student) => (
                  <StudentCard
                    key={student.id}
                    student={student}
                    onAddPoints={onAddPoints}
                    onAddHomework={onAddHomework}
                    selectedStudent={selectedStudent}
                    onSelectStudent={onSelectStudent}
                    compact={true}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  // 快速加分工具栏
  const QuickActionToolbar = () => {
    if (!selectedStudent) return null;
    
    const student = students.find(s => s.id === selectedStudent);
    if (!student) return null;

    return (
      <Card className="fixed bottom-2 left-1/2 transform -translate-x-1/2 p-2 bg-white shadow-lg border-2 border-blue-200 z-50">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-yellow-500" />
            <span className="font-medium text-sm">{student.name}</span>
            <Badge variant="outline" className="text-xs">{student.group}组</Badge>
          </div>
          
          <div className="flex gap-1">
            {[1, 3, 5, 10].map((points) => (
              <Button
                key={points}
                size="sm"
                variant="outline"
                className="min-w-[50px] text-xs px-2 py-1"
                onClick={() => handleAddPoints(selectedStudent, points)}
              >
                +{points}
              </Button>
            ))}
            <Button
              size="sm"
              variant="outline"
              className="text-xs px-2 py-1"
              onClick={() => handleAddHomework(selectedStudent)}
            >
              📚 作业
            </Button>
          </div>
          
          <Button
            size="sm"
            variant="ghost"
            className="text-xs px-2 py-1"
            onClick={() => setSelectedStudent(null)}
          >
            ✕
          </Button>
        </div>
      </Card>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p>加载��...</p>
        </div>
      </div>
    );
  }

  return (
    <DragDropProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto p-2">
        {/* 紧凑头部 */}
        <div className="mb-2">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">课堂荣誉墙</h1>
                <div className="flex items-center gap-4 text-xs text-gray-600">
                  <span className="flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-yellow-500" />
                    {students.filter(s => s.points > 0).length} 人获得积分
                  </span>
                  <span>总学生 {students.length} 人</span>
                  <span className="text-blue-600">💡 拖拽学生卡片可分组</span>
                </div>
              </div>
            </div>
            
            <StudentManagement
              students={students}
              onAddStudent={handleAddStudent}
              onResetAll={handleResetAll}
              onImportData={handleImportData}
              onExportData={handleExportData}
              onStudentMove={handleStudentMove}
            />
          </div>
        </div>

        {/* 主要内容区域 */}
        <div className="flex gap-3">
          {/* 学生卡片网格 */}
          <div className="flex-1">
            {students.length === 0 ? (
              <Card className="p-8 text-center">
                <div className="text-gray-400 mb-4">
                  <Users className="w-12 h-12 mx-auto mb-2" />
                  <h3 className="text-lg font-medium mb-1">还没有学生</h3>
                  <p className="text-sm">点击"添加学生"开始建立您的课堂荣誉墙</p>
                </div>
              </Card>
            ) : (
              <GroupedStudentView 
                students={students}
                selectedStudent={selectedStudent}
                onSelectStudent={setSelectedStudent}
                onAddPoints={handleAddPoints}
                onAddHomework={handleAddHomework}
                onStudentMove={handleStudentMove}
                onGroupNameChange={handleGroupNameChange}
              />
            )}
          </div>

          {/* 排行榜 */}
          {students.length > 0 && (
            <div className="w-64">
              <Leaderboard students={students} />
            </div>
          )}
        </div>

        {/* 快速操作工具栏 */}
        <QuickActionToolbar />

        <Toaster richColors position="top-right" />
        </div>
      </div>
    </DragDropProvider>
  );
}