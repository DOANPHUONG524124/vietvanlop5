import React, { useMemo } from 'react';
import { PillarScores } from '../types/index.ts';

interface RadarChart5PillarsProps {
  scores: PillarScores;
  classAvgScores?: PillarScores;
  studentName?: string;
  size?: number;
}

export const RadarChart5Pillars: React.FC<RadarChart5PillarsProps> = ({
  scores,
  classAvgScores,
  studentName,
  size = 320,
}) => {
  const center = size / 2;
  const radius = size * 0.38;

  const axes = useMemo(
    () => [
      { key: 'bo_cuc', label: 'Bố Cục', score: scores.bo_cuc },
      { key: 'von_tu', label: 'Vốn Từ', score: scores.von_tu },
      { key: 'ngu_phap', label: 'Ngữ Pháp', score: scores.ngu_phap },
      { key: 'cam_xuc', label: 'Cảm Xúc', score: scores.cam_xuc },
      { key: 'sang_tao', label: 'Sáng Tạo', score: scores.sang_tao },
    ],
    [scores]
  );

  const numAxes = axes.length;
  const angleStep = (Math.PI * 2) / numAxes;
  // Rotate so first axis points straight up (-PI/2)
  const angleOffset = -Math.PI / 2;

  // Grid levels (2, 4, 6, 8, 10)
  const levels = [2, 4, 6, 8, 10];

  // Helper to get (x, y) coordinates for an angle and value
  const getCoordinates = (index: number, value: number) => {
    const angle = index * angleStep + angleOffset;
    const r = (value / 10) * radius;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
    };
  };

  // Student polygon points string
  const studentPoints = axes
    .map((axis, i) => {
      const coord = getCoordinates(i, axis.score);
      return `${coord.x.toFixed(1)},${coord.y.toFixed(1)}`;
    })
    .join(' ');

  // Class average polygon points string if available
  const classAvgPoints = classAvgScores
    ? [
        classAvgScores.bo_cuc,
        classAvgScores.von_tu,
        classAvgScores.ngu_phap,
        classAvgScores.cam_xuc,
        classAvgScores.sang_tao,
      ]
        .map((score, i) => {
          const coord = getCoordinates(i, score);
          return `${coord.x.toFixed(1)},${coord.y.toFixed(1)}`;
        })
        .join(' ')
    : null;

  return (
    <div className="flex flex-col items-center select-none">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="overflow-visible"
        aria-label="Biểu đồ mạng nhện 5 Cột Trụ Tiếng Việt"
      >
        <defs>
          {/* Gradient for Student polygon */}
          <linearGradient id="studentRadarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0.4" />
          </linearGradient>
          {/* Glow filter for dots */}
          <filter id="radarGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#059669" floodOpacity="0.3" />
          </filter>
        </defs>

        {/* Concentric pentagon grid lines */}
        {levels.map((level) => {
          const gridPoints = Array.from({ length: numAxes })
            .map((_, i) => {
              const coord = getCoordinates(i, level);
              return `${coord.x.toFixed(1)},${coord.y.toFixed(1)}`;
            })
            .join(' ');

          return (
            <g key={level}>
              <polygon
                points={gridPoints}
                fill={level % 4 === 0 ? '#f8fafc' : 'none'}
                stroke="#e2e8f0"
                strokeWidth={level === 10 ? 1.5 : 0.8}
                strokeDasharray={level < 10 ? '2,2' : undefined}
              />
              {/* Level label on top axis */}
              <text
                x={center}
                y={center - (level / 10) * radius - 2}
                textAnchor="middle"
                fontSize="9"
                fill="#94a3b8"
                fontWeight="500"
              >
                {level}
              </text>
            </g>
          );
        })}

        {/* Radial Axis Lines */}
        {axes.map((_, i) => {
          const outerCoord = getCoordinates(i, 10);
          return (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={outerCoord.x}
              y2={outerCoord.y}
              stroke="#cbd5e1"
              strokeWidth="1"
            />
          );
        })}

        {/* Class Average Polygon (if provided) */}
        {classAvgPoints && (
          <polygon
            points={classAvgPoints}
            fill="#f59e0b"
            fillOpacity="0.12"
            stroke="#d97706"
            strokeWidth="1.5"
            strokeDasharray="4,3"
          />
        )}

        {/* Student Score Polygon */}
        <polygon
          points={studentPoints}
          fill="url(#studentRadarGrad)"
          stroke="#059669"
          strokeWidth="2.5"
          className="transition-all duration-700 ease-out"
        />

        {/* Data points & tooltips */}
        {axes.map((axis, i) => {
          const coord = getCoordinates(i, axis.score);
          return (
            <g key={axis.key} className="group cursor-pointer">
              <circle
                cx={coord.x}
                cy={coord.y}
                r="5"
                fill="#ffffff"
                stroke="#047857"
                strokeWidth="2.5"
                filter="url(#radarGlow)"
                className="transition-transform duration-300 hover:scale-125"
              />
              <circle
                cx={coord.x}
                cy={coord.y}
                r="8"
                fill="transparent"
                className="hover:fill-emerald-400/20"
              />
            </g>
          );
        })}

        {/* Axis Labels & Values */}
        {axes.map((axis, i) => {
          const angle = i * angleStep + angleOffset;
          // Offset label slightly outside radius
          const labelDist = radius + 24;
          const lx = center + labelDist * Math.cos(angle);
          const ly = center + labelDist * Math.sin(angle);

          // Horizontal alignment based on cos
          let anchor: 'start' | 'middle' | 'end' = 'middle';
          if (Math.cos(angle) > 0.3) anchor = 'start';
          if (Math.cos(angle) < -0.3) anchor = 'end';

          return (
            <g key={`lbl-${axis.key}`}>
              <text
                x={lx}
                y={ly - 4}
                textAnchor={anchor}
                fontSize="11"
                fontWeight="700"
                fill="#1e293b"
                className="select-none"
              >
                {axis.label}
              </text>
              <text
                x={lx}
                y={ly + 9}
                textAnchor={anchor}
                fontSize="11"
                fontWeight="900"
                fill={axis.score >= 8.5 ? '#047857' : axis.score >= 7.0 ? '#d97706' : '#dc2626'}
                className="select-none"
              >
                {axis.score.toFixed(1)}/10
              </text>
            </g>
          );
        })}
      </svg>

      {/* Legend */}
      <div className="flex items-center gap-4 text-[11px] font-semibold text-slate-600 mt-2">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-emerald-500 border border-emerald-700" />
          <span>{studentName ? `Học sinh: ${studentName}` : 'Điểm học sinh'}</span>
        </div>
        {classAvgScores && (
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-1 border-t-2 border-dashed border-amber-600" />
            <span>Trung bình lớp 5A ({classAvgScores.tong_ket.toFixed(1)})</span>
          </div>
        )}
      </div>
    </div>
  );
};
