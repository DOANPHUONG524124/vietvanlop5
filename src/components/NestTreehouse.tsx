import React, { useState } from 'react';
import { OwlAvatar } from './OwlAvatar.tsx';
import { NEST_TIERS, NestLevelInfo, getNestTier } from '../utils/rules.ts';
import {
  Sparkles,
  Trophy,
  Trees,
  Award,
  ChevronRight,
  ShieldCheck,
  Feather,
  Flame,
  CheckCircle2,
  Droplets
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface NestTreehouseProps {
  seeds: number;
  onAwardSeeds: (seeds: number) => void;
}

export const NestTreehouse: React.FC<NestTreehouseProps> = ({ seeds, onAwardSeeds }) => {
  const currentTier: NestLevelInfo = getNestTier(seeds);
  const nextTierIndex = NEST_TIERS.findIndex((t) => t.level === currentTier.level) + 1;
  const nextTier = nextTierIndex < NEST_TIERS.length ? NEST_TIERS[nextTierIndex] : null;

  const [waterCount, setWaterCount] = useState(3);
  const [plantGrowth, setPlantGrowth] = useState({
    tuLay: 80,
    cauGhep: 65,
    nhanHoa: 90,
    soSanh: 75,
  });

  const progressPercent = nextTier
    ? Math.min(
        100,
        Math.round(
          ((seeds - currentTier.minSeeds) / (nextTier.minSeeds - currentTier.minSeeds)) * 100
        )
      )
    : 100;

  const handleWaterTree = (treeKey: keyof typeof plantGrowth) => {
    if (waterCount <= 0) return;
    setWaterCount((c) => c - 1);
    setPlantGrowth((prev) => ({
      ...prev,
      [treeKey]: Math.min(100, prev[treeKey] + 10),
    }));
    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.8 },
      });
    } catch (e) {}
  };

  const badges = [
    {
      id: 'mam-non',
      title: 'Mầm Non Tri Thức',
      desc: 'Bước chân đầu tiên vào Rừng Tri Thức cùng Bác Cú',
      icon: '🌱',
      unlocked: seeds >= 5,
    },
    {
      id: 'tu-lay',
      title: 'Thợ Săn Từ Láy',
      desc: 'Tích lũy vốn từ láy phong phú: long lanh, róc rách, thoang thoảng...',
      icon: '🌿',
      unlocked: seeds >= 35,
    },
    {
      id: 'cau-ghep',
      title: 'Bậc Thầy Câu Ghép',
      desc: 'Sử dụng thuần thục cặp quan hệ từ: Mặc dù... nhưng, Không những... mà còn',
      icon: '🪵',
      unlocked: seeds >= 85,
    },
    {
      id: 'nhan-hoa',
      title: 'Nhà Thơ Nhân Hóa',
      desc: 'Thổi hồn cho sự vật, biến cây phượng, chú mèo thành những người bạn thân',
      icon: '🎨',
      unlocked: seeds >= 155,
    },
    {
      id: 'chan-thuc',
      title: 'Cây Bút Chân Thực',
      desc: 'Nói không với văn mẫu rập khuôn mạng, viết bằng cảm xúc tự nhiên',
      icon: '🛡️',
      unlocked: true,
    },
    {
      id: 'tro-thu',
      title: 'Hiệp Sĩ Rừng Xanh',
      desc: 'Đạt đỉnh cao học tập, nâng cấp Lâu Đài Tri Thức Rừng Già',
      icon: '🏰',
      unlocked: seeds >= 251,
    },
  ];

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Hero Banner: Nest Progression */}
      <div className="bg-linear-to-br from-amber-600 via-amber-700 to-emerald-900 rounded-3xl p-6 sm:p-9 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-4 max-w-xl text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-xs text-amber-100 text-xs font-semibold">
              <Trees className="w-3.5 h-3.5 text-amber-300" />
              <span>Hệ Thống Gamification Nâng Cấp Tổ Chim</span>
            </div>
            <div>
              <div className="text-4xl mb-2">{currentTier.icon}</div>
              <h1 className="text-2xl sm:text-3xl font-black text-white">
                Cấp {currentTier.level}: {currentTier.name}
              </h1>
              <p className="text-amber-100/90 text-sm mt-1 leading-relaxed">
                {currentTier.description}
              </p>
            </div>

            {/* Seed Count & Progress Bar */}
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20">
              <div className="flex justify-between items-center text-xs font-bold mb-2">
                <span className="flex items-center gap-1.5 text-amber-200">
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Tổng tích lũy: {seeds} Hạt Giống</span>
                </span>
                {nextTier ? (
                  <span className="text-white/80">
                    Cần thêm {Math.max(0, nextTier.minSeeds - seeds)} hạt để lên{' '}
                    <strong>{nextTier.name}</strong>
                  </span>
                ) : (
                  <span className="text-amber-300 font-bold">Đã đạt cấp cao nhất! 🏆</span>
                )}
              </div>
              <div className="w-full h-3 bg-black/30 rounded-full overflow-hidden p-0.5">
                <div
                  className="h-full bg-linear-to-r from-amber-400 to-emerald-400 rounded-full transition-all duration-700"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-3">
            <OwlAvatar size="xl" mood="happy" />
            <button
              onClick={() => {
                onAwardSeeds(15);
                try {
                  confetti({ particleCount: 50 });
                } catch (e) {}
              }}
              className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-amber-950 font-bold text-xs shadow-md transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Thưởng Thêm Hạt Giống (+15)</span>
            </button>
          </div>
        </div>
      </div>

      {/* 5 Levels Roadmap Grid */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-100 shadow-sm space-y-6">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-500" />
            <span>Lộ Trình Tiến Hóa 5 Cấp Tổ Chim Học Tập</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Mỗi bài viết hoàn thành và câu đố vượt qua sẽ cung cấp dinh dưỡng giúp tổ chim lớn mạnh!
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
          {NEST_TIERS.map((tier) => {
            const isReached = seeds >= tier.minSeeds;
            const isCurrent = currentTier.level === tier.level;

            return (
              <div
                key={tier.level}
                className={`p-4 rounded-2xl border transition-all flex flex-col justify-between ${
                  isCurrent
                    ? 'bg-emerald-50/80 border-emerald-500 ring-2 ring-emerald-500/30 shadow-md'
                    : isReached
                    ? 'bg-slate-50 border-emerald-200'
                    : 'bg-slate-50/40 border-slate-200 opacity-60'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">{tier.icon}</span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isCurrent
                          ? 'bg-emerald-600 text-white'
                          : isReached
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      Cấp {tier.level}
                    </span>
                  </div>
                  <h3 className="font-bold text-sm text-slate-900 leading-snug">{tier.name}</h3>
                  <p className="text-[11px] text-slate-500 mt-1 line-clamp-3 leading-relaxed">
                    {tier.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-[11px]">
                  <span className="font-semibold text-emerald-800">
                    {tier.minSeeds}+ hạt
                  </span>
                  {isReached && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Vườn Tri Thức: Magical trees growing with seeds */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-100 shadow-sm space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Trees className="w-5 h-5 text-emerald-600" />
              <span>Vườn Cây Tri Thức Ngôn Ngữ</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Chăm sóc 4 cây kỹ năng Tiếng Việt lớp 5 bằng những giọt nước thần kì!
            </p>
          </div>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-cyan-50 text-cyan-800 border border-cyan-200 flex items-center gap-1">
            <Droplets className="w-3.5 h-3.5 text-cyan-600" />
            <span>Còn {waterCount} gáo nước</span>
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              key: 'tuLay' as const,
              name: 'Cây Từ Láy Rực Rỡ',
              desc: 'Nuôi dưỡng từ láy gợi hình, gợi thanh',
              growth: plantGrowth.tuLay,
              icon: '🌿',
            },
            {
              key: 'cauGhep' as const,
              name: 'Cây Câu Ghép Vững Chãi',
              desc: 'Quan hệ từ nối vế câu mạch lạc',
              growth: plantGrowth.cauGhep,
              icon: '🪵',
            },
            {
              key: 'nhanHoa' as const,
              name: 'Cây Nhân Hóa Diệu Kỳ',
              desc: 'Thổi cảm xúc con người vào cảnh vật',
              growth: plantGrowth.nhanHoa,
              icon: '✨',
            },
            {
              key: 'soSanh' as const,
              name: 'Cây So Sánh Độc Đáo',
              desc: 'Hình tượng mới mẻ, vượt văn mẫu',
              growth: plantGrowth.soSanh,
              icon: '🪶',
            },
          ].map((tree) => (
            <div
              key={tree.key}
              className="p-4 rounded-2xl bg-emerald-50/40 border border-emerald-200/80 flex flex-col justify-between"
            >
              <div>
                <div className="text-2xl mb-1">{tree.icon}</div>
                <h4 className="text-sm font-bold text-slate-900">{tree.name}</h4>
                <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">{tree.desc}</p>
                <div className="mt-3">
                  <div className="flex justify-between text-[10px] font-bold text-slate-600 mb-1">
                    <span>Độ tươi tốt</span>
                    <span>{tree.growth}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 rounded-full"
                      style={{ width: `${tree.growth}%` }}
                    />
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleWaterTree(tree.key)}
                disabled={waterCount <= 0 || tree.growth >= 100}
                className="mt-4 w-full py-1.5 rounded-xl bg-white hover:bg-cyan-50 disabled:opacity-50 text-cyan-800 border border-cyan-200 text-xs font-semibold flex items-center justify-center gap-1 shadow-2xs"
              >
                <Droplets className="w-3.5 h-3.5 text-cyan-600" />
                <span>{tree.growth >= 100 ? 'Đã nở hoa rực rỡ' : 'Tưới nước (+10%)'}</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Badges Collection */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-100 shadow-sm space-y-6">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-500" />
            <span>Bộ Sưu Tập Huy Hiệu Nhà Thám Hiểm</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Mỗi huy hiệu ghi dấu một cột mốc trưởng thành trong tư duy hành văn của em.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {badges.map((b) => (
            <div
              key={b.id}
              className={`p-4 rounded-2xl border flex items-start gap-3.5 ${
                b.unlocked
                  ? 'bg-amber-50/40 border-amber-200 shadow-xs'
                  : 'bg-slate-50 border-slate-200 opacity-50'
              }`}
            >
              <span className="text-3xl p-2 rounded-xl bg-white shadow-2xs shrink-0">
                {b.icon}
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-slate-900">{b.title}</h4>
                  {b.unlocked ? (
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded-sm">
                      Đã đạt
                    </span>
                  ) : (
                    <span className="text-[10px] bg-slate-200 text-slate-600 font-bold px-1.5 py-0.5 rounded-sm">
                      Khóa
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
