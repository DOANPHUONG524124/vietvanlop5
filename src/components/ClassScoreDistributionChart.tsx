import React, { useMemo } from 'react';
import { StudentRecord } from '../types/index.ts';

interface ClassScoreDistributionChartProps {
  students: StudentRecord[];
  currentStudentScore?: number;
}

export const ClassScoreDistributionChart: React.FC<ClassScoreDistributionChartProps> = ({
  students,
  currentStudentScore,
}) => {
  const distribution = useMemo(() => {
    const scoredStudents = students.filter((s) => s.score !== undefined);
    const total = scoredStudents.length || 1;

    const excellent = scoredStudents.filter((s) => (s.score || 0) >= 9.0);
    const good = scoredStudents.filter((s) => (s.score || 0) >= 8.0 && (s.score || 0) < 9.0);
    const fair = scoredStudents.filter((s) => (s.score || 0) >= 7.0 && (s.score || 0) < 8.0);
    const needsSupport = scoredStudents.filter((s) => (s.score || 0) < 7.0);

    return [
      {
        range: 'Xuất sắc (≥ 9.0)',
        count: excellent.length,
        percent: Math.round((excellent.length / total) * 100),
        color: 'from-emerald-500 to-teal-600',
        textColor: 'text-emerald-700',
        badgeColor: 'bg-emerald-100 border-emerald-200',
        isCurrentStudentHere: currentStudentScore !== undefined && currentStudentScore >= 9.0,
      },
      {
        range: 'Giỏi (8.0 - 8.9)',
        count: good.length,
        percent: Math.round((good.length / total) * 100),
        color: 'from-indigo-500 to-blue-600',
        textColor: 'text-indigo-700',
        badgeColor: 'bg-indigo-100 border-indigo-200',
        isCurrentStudentHere:
          currentStudentScore !== undefined && currentStudentScore >= 8.0 && currentStudentScore < 9.0,
      },
      {
        range: 'Khá (7.0 - 7.9)',
        count: fair.length,
        percent: Math.round((fair.length / total) * 100),
        color: 'from-amber-500 to-orange-500',
        textColor: 'text-amber-800',
        badgeColor: 'bg-amber-100 border-amber-200',
        isCurrentStudentHere:
          currentStudentScore !== undefined && currentStudentScore >= 7.0 && currentStudentScore < 8.0,
      },
      {
        range: 'Cần bồi dưỡng (< 7.0)',
        count: needsSupport.length,
        percent: Math.round((needsSupport.length / total) * 100),
        color: 'from-rose-500 to-red-600',
        textColor: 'text-rose-700',
        badgeColor: 'bg-rose-100 border-rose-200',
        isCurrentStudentHere: currentStudentScore !== undefined && currentStudentScore < 7.0,
      },
    ];
  }, [students, currentStudentScore]);

  return (
    <div className="space-y-3.5">
      <div className="flex items-center justify-between text-xs text-slate-500">
        <span className="font-semibold text-slate-700">Phân Phối Năng Lực Toàn Lớp</span>
        <span>{students.filter((s) => s.score !== undefined).length} / {students.length} HS đã có điểm</span>
      </div>

      <div className="space-y-3">
        {distribution.map((item) => (
          <div
            key={item.range}
            className={`p-3 rounded-2xl border transition-all ${
              item.isCurrentStudentHere
                ? 'bg-emerald-50/80 border-emerald-400 shadow-xs ring-2 ring-emerald-300'
                : 'bg-slate-50/60 border-slate-200/80 hover:bg-slate-100/60'
            }`}
          >
            <div className="flex items-center justify-between text-xs mb-1.5">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900">{item.range}</span>
                {item.isCurrentStudentHere && (
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-700 text-white animate-pulse">
                    Vị trí học sinh này
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1.5">
                <span className={`font-black text-xs ${item.textColor}`}>
                  {item.count} HS
                </span>
                <span className="text-[11px] text-slate-400">({item.percent}%)</span>
              </div>
            </div>

            <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
              <div
                className={`h-full bg-linear-to-r ${item.color} rounded-full transition-all duration-700`}
                style={{ width: `${Math.max(item.percent, 4)}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
