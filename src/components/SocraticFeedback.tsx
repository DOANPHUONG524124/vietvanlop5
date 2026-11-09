import React, { useState } from 'react';
import { StudentFeedback, EvaluationResult } from '../types/index.ts';
import { OwlAvatar } from './OwlAvatar.tsx';
import {
  Sparkles,
  Trophy,
  Lightbulb,
  Gamepad2,
  Gift,
  CheckCircle2,
  XCircle,
  MessageCircle,
  Volume2,
  ArrowRight,
  Flame,
  Award
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { speakVietnamese } from '../utils/audio.ts';

interface SocraticFeedbackProps {
  evaluation: EvaluationResult;
  onOpenChat: (initialPrompt?: string) => void;
  onAwardSeeds: (seeds: number) => void;
  essayText: string;
}

export const SocraticFeedback: React.FC<SocraticFeedbackProps> = ({
  evaluation,
  onOpenChat,
  onAwardSeeds,
  essayText,
}) => {
  const { phan_hoi_hoc_sinh } = evaluation;
  const [selectedGameAnswer, setSelectedGameAnswer] = useState<string | null>(null);
  const [isGameAnswered, setIsGameAnswered] = useState(false);
  const [hasClaimedBonusSeeds, setHasClaimedBonusSeeds] = useState(false);
  const [readingSection, setReadingSection] = useState<string | null>(null);

  const handleSelectGameOption = (opt: string) => {
    if (isGameAnswered) return;
    setSelectedGameAnswer(opt);
    setIsGameAnswered(true);

    const isCorrect =
      opt.trim().toLowerCase() === phan_hoi_hoc_sinh.minigame_nhanh.dap_an_dung.trim().toLowerCase() ||
      opt.includes(phan_hoi_hoc_sinh.minigame_nhanh.dap_an_dung) ||
      phan_hoi_hoc_sinh.minigame_nhanh.dap_an_dung.includes(opt);

    if (isCorrect && !hasClaimedBonusSeeds) {
      setHasClaimedBonusSeeds(true);
      onAwardSeeds(5); // bonus 5 seeds for winning minigame
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.7 },
        });
      } catch (e) {
        // confetti fallback
      }
    }
  };

  const handleReadAloud = (text: string, sectionKey: string) => {
    setReadingSection(sectionKey);
    speakVietnamese(text, () => setReadingSection(null));
  };

  const isAnswerCorrect =
    selectedGameAnswer &&
    (selectedGameAnswer.trim().toLowerCase() ===
      phan_hoi_hoc_sinh.minigame_nhanh.dap_an_dung.trim().toLowerCase() ||
      selectedGameAnswer.includes(phan_hoi_hoc_sinh.minigame_nhanh.dap_an_dung) ||
      phan_hoi_hoc_sinh.minigame_nhanh.dap_an_dung.includes(selectedGameAnswer));

  return (
    <div className="space-y-6">
      {/* 1. Lời chào đồng hành */}
      <section
        aria-labelledby="section-greeting"
        className="relative overflow-hidden rounded-3xl bg-linear-to-br from-emerald-800 via-emerald-700 to-teal-800 text-white p-6 sm:p-8 shadow-xl"
      >
        <div className="absolute -right-8 -bottom-8 opacity-20 pointer-events-none">
          <OwlAvatar size="xl" mood="happy" />
        </div>
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <OwlAvatar size="lg" mood="mentoring" className="shrink-0" />
          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-600/80 text-emerald-100 border border-emerald-400/40">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" /> 1. Lời Chào Đồng Hành
              </span>
              <button
                onClick={() =>
                  handleReadAloud(phan_hoi_hoc_sinh.loi_chao_dong_hanh, 'greeting')
                }
                className="flex items-center gap-1.5 text-xs text-emerald-100 bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-full transition-colors"
                title="Bác Cú đọc lời chào"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Nghe Bác Cú</span>
              </button>
            </div>
            <h2 id="section-greeting" className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              {phan_hoi_hoc_sinh.loi_chao_dong_hanh}
            </h2>
            <p className="text-xs text-emerald-100/90 leading-relaxed">
              Bác Cú đã thấu suốt từng dòng cảm xúc và bản đồ chữ viết em gửi về Rừng Tri Thức!
            </p>
          </div>
        </div>
      </section>

      {/* 2. Điểm sáng (Khen ngợi) */}
      <section
        aria-labelledby="section-strengths"
        className="rounded-3xl bg-amber-50/70 border border-amber-200/90 p-6 sm:p-7 shadow-sm"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-amber-500 text-white shadow-xs">
              <Trophy className="w-5 h-5" />
            </span>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800">
                2. Khen ngợi theo 5 Cột trụ
              </span>
              <h3 id="section-strengths" className="text-lg font-bold text-slate-900">
                {phan_hoi_hoc_sinh.diem_sang.tieu_de || 'Những Điểm Sáng Rực Rỡ'}
              </h3>
            </div>
          </div>
          <button
            onClick={() =>
              handleReadAloud(
                phan_hoi_hoc_sinh.diem_sang.chi_tiet.join('. '),
                'strengths'
              )
            }
            className="text-xs text-amber-800 bg-amber-100 hover:bg-amber-200 px-3 py-1.5 rounded-full flex items-center gap-1 transition-colors"
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Nghe điểm sáng</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {phan_hoi_hoc_sinh.diem_sang.chi_tiet.map((item, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 bg-white p-4 rounded-2xl border border-amber-200/80 shadow-xs"
            >
              <span className="p-1.5 rounded-full bg-amber-100 text-amber-700 mt-0.5 shrink-0">
                <Sparkles className="w-4 h-4" />
              </span>
              <p className="text-sm text-slate-800 leading-relaxed font-medium">{item}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Góc gợi mở (Socratic Method) */}
      <section
        aria-labelledby="section-socratic"
        className="rounded-3xl bg-emerald-50/60 border border-emerald-200 p-6 sm:p-7 shadow-sm"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-emerald-600 text-white shadow-xs">
              <Lightbulb className="w-5 h-5" />
            </span>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">
                3. Phương pháp Socratic Gợi Mở (Không viết hộ)
              </span>
              <h3 id="section-socratic" className="text-lg font-bold text-slate-900">
                {phan_hoi_hoc_sinh.goc_goi_mo.tieu_de || 'Góc Gợi Mở & Thử Thách Cho Em'}
              </h3>
            </div>
          </div>
          <button
            onClick={() =>
              handleReadAloud(
                `${phan_hoi_hoc_sinh.goc_goi_mo.phan_tich_loi}. ${phan_hoi_hoc_sinh.goc_goi_mo.cau_hoi_socratic.join('. ')}`,
                'socratic'
              )
            }
            className="text-xs text-emerald-800 bg-emerald-100 hover:bg-emerald-200 px-3 py-1.5 rounded-full flex items-center gap-1 transition-colors"
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Nghe gợi mở</span>
          </button>
        </div>

        {/* Phân tích lỗi nhẹ nhàng */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-emerald-200/80 mb-4">
          <p className="text-sm font-semibold text-emerald-950 mb-1">
            🌱 Quan sát của Bác Cú:
          </p>
          <p className="text-sm text-slate-700 leading-relaxed">
            {phan_hoi_hoc_sinh.goc_goi_mo.phan_tich_loi}
          </p>
        </div>

        {/* Socratic Questions */}
        <div className="space-y-3 mb-5">
          <p className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5 text-amber-500" />
            Câu hỏi gợi ý để em tự khám phá & trau chuốt:
          </p>
          {phan_hoi_hoc_sinh.goc_goi_mo.cau_hoi_socratic.map((q, idx) => (
            <div
              key={idx}
              className="bg-linear-to-r from-emerald-100/70 to-teal-50 p-4 rounded-2xl border border-emerald-200 flex items-start gap-3"
            >
              <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <div className="flex-1">
                <p className="text-sm font-semibold text-slate-900 leading-relaxed">{q}</p>
              </div>
            </div>
          ))}
        </div>

        {phan_hoi_hoc_sinh.goc_goi_mo.vi_du_goi_y && (
          <div className="p-3.5 bg-amber-50/70 rounded-2xl border border-amber-200/70 text-xs text-amber-900 mb-4 flex items-start gap-2">
            <span className="text-base">💡</span>
            <div>
              <span className="font-semibold">Bác Cú mách nhỏ ý tưởng: </span>
              <span>{phan_hoi_hoc_sinh.goc_goi_mo.vi_du_goi_y}</span>
            </div>
          </div>
        )}

        {/* Socratic Chat Action */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 bg-white rounded-2xl border border-emerald-200">
          <div className="text-xs text-slate-600 text-center sm:text-left">
            <span className="font-semibold text-emerald-800">Em đã nghĩ ra cách sửa chưa? </span>
            <span>Hãy trò chuyện ngay với Bác Cú để thử nghiệm những câu văn mới nhé!</span>
          </div>
          <button
            onClick={() =>
              onOpenChat(
                phan_hoi_hoc_sinh.goc_goi_mo.cau_hoi_socratic[0]
                  ? `Bác Cú ơi, về câu hỏi: "${phan_hoi_hoc_sinh.goc_goi_mo.cau_hoi_socratic[0]}", em đang nghĩ là...`
                  : undefined
              )
            }
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-xs hover:shadow-md transition-all cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Thảo Luận Cùng Bác Cú</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* 4. Minigame nhanh (Củng cố) */}
      <section
        aria-labelledby="section-minigame"
        className="rounded-3xl bg-indigo-50/70 border border-indigo-200 p-6 sm:p-7 shadow-sm"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-indigo-600 text-white shadow-xs">
              <Gamepad2 className="w-5 h-5" />
            </span>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-800">
                4. Minigame Củng Cố Kiến Thức
              </span>
              <h3 id="section-minigame" className="text-lg font-bold text-slate-900">
                {phan_hoi_hoc_sinh.minigame_nhanh.loai_game || 'Thử Thách Trí Tuệ Rừng Xanh'}
              </h3>
            </div>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-100 text-indigo-800 border border-indigo-200">
            +5 Hạt Giống
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-indigo-100 shadow-xs space-y-4">
          <p className="text-base font-bold text-slate-900 leading-snug">
            {phan_hoi_hoc_sinh.minigame_nhanh.cau_hoi}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {phan_hoi_hoc_sinh.minigame_nhanh.cac_lua_chon.map((opt, idx) => {
              const isSelected = selectedGameAnswer === opt;
              let btnStyle =
                'bg-slate-50 hover:bg-indigo-50/80 border-slate-200 text-slate-800';
              if (isGameAnswered) {
                const optIsCorrect =
                  opt.trim().toLowerCase() ===
                    phan_hoi_hoc_sinh.minigame_nhanh.dap_an_dung.trim().toLowerCase() ||
                  opt.includes(phan_hoi_hoc_sinh.minigame_nhanh.dap_an_dung) ||
                  phan_hoi_hoc_sinh.minigame_nhanh.dap_an_dung.includes(opt);
                if (optIsCorrect) {
                  btnStyle = 'bg-emerald-100 border-emerald-500 text-emerald-950 font-bold';
                } else if (isSelected) {
                  btnStyle = 'bg-rose-100 border-rose-400 text-rose-950';
                } else {
                  btnStyle = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectGameOption(opt)}
                  disabled={isGameAnswered}
                  className={`p-3.5 rounded-xl border text-left text-sm font-medium transition-all flex items-center justify-between ${btnStyle}`}
                >
                  <span>{opt}</span>
                  {isGameAnswered && (
                    <span>
                      {opt.trim().toLowerCase() ===
                        phan_hoi_hoc_sinh.minigame_nhanh.dap_an_dung.trim().toLowerCase() ||
                      opt.includes(phan_hoi_hoc_sinh.minigame_nhanh.dap_an_dung) ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      ) : isSelected ? (
                        <XCircle className="w-5 h-5 text-rose-600" />
                      ) : null}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {isGameAnswered && (
            <div
              className={`p-4 rounded-xl border text-xs sm:text-sm animate-in fade-in ${
                isAnswerCorrect
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                  : 'bg-amber-50 border-amber-300 text-amber-950'
              }`}
            >
              <p className="font-bold flex items-center gap-1.5 mb-1">
                {isAnswerCorrect ? (
                  <>
                    <Sparkles className="w-4 h-4 text-emerald-600" />
                    <span>Chính xác tuyệt vời! Em nhận thêm 5 Hạt Giống Thông Thái!</span>
                  </>
                ) : (
                  <>
                    <span>💡 Gần đúng rồi! Đáp án chuẩn là: </span>
                    <span className="underline">
                      {phan_hoi_hoc_sinh.minigame_nhanh.dap_an_dung}
                    </span>
                  </>
                )}
              </p>
              <p className="text-xs leading-relaxed opacity-90">
                {phan_hoi_hoc_sinh.minigame_nhanh.giai_thich_vui}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* 5. Lời chúc & Hạt giống */}
      <section
        aria-labelledby="section-reward"
        className="rounded-3xl bg-linear-to-br from-amber-500 via-amber-400 to-yellow-500 text-slate-900 p-6 sm:p-7 shadow-lg"
      >
        <div className="flex flex-col sm:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-4">
            <span className="p-3.5 rounded-2xl bg-white/30 backdrop-blur-xs text-amber-950 shadow-inner">
              <Gift className="w-8 h-8" />
            </span>
            <div>
              <span className="text-[11px] font-black uppercase tracking-wider text-amber-950/80">
                5. Lời Chúc & Hạt Giống Thông Thái
              </span>
              <h3 id="section-reward" className="text-xl font-black text-amber-950">
                +{phan_hoi_hoc_sinh.loi_chuc_va_hat_giong.so_hat_giong_tang} Hạt Giống Cho Tổ Chim!
              </h3>
              <p className="text-xs text-amber-950/90 font-medium max-w-lg mt-1">
                {phan_hoi_hoc_sinh.loi_chuc_va_hat_giong.loi_chuc}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white/90 px-4 py-2.5 rounded-2xl shadow-xs border border-white">
            <Award className="w-5 h-5 text-amber-600" />
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-500">Huy hiệu mới</div>
              <div className="text-xs font-bold text-emerald-900">
                {phan_hoi_hoc_sinh.loi_chuc_va_hat_giong.huy_hieu_khen_tang}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
