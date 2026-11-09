import React, { useState, useEffect } from 'react';
import { StudentProfile } from '../types/index.ts';
import { Sparkles, User, GraduationCap, Check, Smile, Heart, Award } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playRewardChime } from '../utils/audio.ts';

export interface AvatarOption {
  id: string;
  name: string;
  emoji: string;
  bgColor: string;
  borderColor: string;
  description: string;
}

export const AVATAR_OPTIONS: AvatarOption[] = [
  { id: 'owl', name: 'Cú Mèo Tri Thức', emoji: '🦉', bgColor: 'bg-amber-100', borderColor: 'border-amber-400', description: 'Chăm chỉ & Thông thái' },
  { id: 'bear', name: 'Gấu Nâu Ấm Áp', emoji: '🐻', bgColor: 'bg-orange-100', borderColor: 'border-orange-400', description: 'Tốt bụng & Kiên trì' },
  { id: 'rabbit', name: 'Thỏ Trắng Nhanh Trí', emoji: '🐰', bgColor: 'bg-pink-100', borderColor: 'border-pink-400', description: 'Lanh lợi & Sáng tạo' },
  { id: 'cat', name: 'Mèo Miu Tinh Nghịch', emoji: '🐱', bgColor: 'bg-yellow-100', borderColor: 'border-yellow-400', description: 'Đáng yêu & Khéo léo' },
  { id: 'dog', name: 'Cún Vàng Chăm Chỉ', emoji: '🐶', bgColor: 'bg-amber-100', borderColor: 'border-amber-400', description: 'Năng nổ & Trung thực' },
  { id: 'lion', name: 'Sư Tử Dũng Cảm', emoji: '🦁', bgColor: 'bg-orange-100', borderColor: 'border-orange-500', description: 'Tự tin & Quyết đoán' },
  { id: 'fox', name: 'Cáo Con Thông Minh', emoji: '🦊', bgColor: 'bg-rose-100', borderColor: 'border-rose-400', description: 'Nhanh nhẹn & Tinh anh' },
  { id: 'panda', name: 'Gấu Trúc Đáng Yêu', emoji: '🐼', bgColor: 'bg-emerald-100', borderColor: 'border-emerald-400', description: 'Điềm tĩnh & Yêu thiên nhiên' },
  { id: 'penguin', name: 'Cánh Cụt Khéo Léo', emoji: '🐧', bgColor: 'bg-sky-100', borderColor: 'border-sky-400', description: 'Ngăn nắp & Tỉ mỉ' },
  { id: 'dino', name: 'Khủng Long Nhí', emoji: '🦖', bgColor: 'bg-lime-100', borderColor: 'border-lime-400', description: 'Khỏe khoắn & Vui nhộn' },
  { id: 'dolphin', name: 'Cá Heo Vui Vẻ', emoji: '🐬', bgColor: 'bg-cyan-100', borderColor: 'border-cyan-400', description: 'Yêu đời & Giàu cảm xúc' },
  { id: 'tiger', name: 'Hổ Con Cố Gắng', emoji: '🐯', bgColor: 'bg-amber-100', borderColor: 'border-amber-500', description: 'Hăng hái & Tiến bộ' },
];

interface StudentLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentProfile: StudentProfile | null;
  onSaveProfile: (profile: StudentProfile) => void;
  canCloseWithoutSaving?: boolean;
}

export const StudentLoginModal: React.FC<StudentLoginModalProps> = ({
  isOpen,
  onClose,
  currentProfile,
  onSaveProfile,
  canCloseWithoutSaving = false,
}) => {
  const [name, setName] = useState(currentProfile?.name || '');
  const [className, setClassName] = useState(currentProfile?.className || '5A1');
  const [selectedAvatarId, setSelectedAvatarId] = useState(currentProfile?.avatarId || 'owl');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (currentProfile) {
      setName(currentProfile.name);
      setClassName(currentProfile.className);
      setSelectedAvatarId(currentProfile.avatarId);
    }
  }, [currentProfile, isOpen]);

  if (!isOpen) return null;

  const quickClasses = ['5A1', '5A2', '5B', '5C', '5/1', '5/2'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedClass = className.trim();

    if (!trimmedName) {
      setError('Em vui lòng nhập Họ và tên của mình nhé!');
      return;
    }
    if (!trimmedClass) {
      setError('Em hãy nhập lớp học của mình nhé (Ví dụ: 5A1)!');
      return;
    }

    const selectedAvatar =
      AVATAR_OPTIONS.find((a) => a.id === selectedAvatarId) || AVATAR_OPTIONS[0];

    const updatedProfile: StudentProfile = {
      id: currentProfile?.id || `student-${Date.now()}`,
      name: trimmedName,
      className: trimmedClass,
      avatarId: selectedAvatar.id,
      avatarIcon: selectedAvatar.emoji,
      avatarName: selectedAvatar.name,
      totalPoints: currentProfile?.totalPoints ?? 50, // Khởi đầu tặng 50 điểm quà chào mừng!
      submittedCount: currentProfile?.submittedCount ?? 0,
      badge: currentProfile?.badge || 'Bé Chăm Chỉ',
      createdAt: currentProfile?.createdAt || new Date().toISOString(),
    };

    onSaveProfile(updatedProfile);
    playRewardChime();

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
      });
    } catch {}

    onClose();
  };

  const selectedAvatar =
    AVATAR_OPTIONS.find((a) => a.id === selectedAvatarId) || AVATAR_OPTIONS[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border-4 border-amber-300 overflow-hidden transform transition-all max-h-[92vh] flex flex-col">
        {/* Playful Header */}
        <div className="bg-gradient-to-r from-amber-400 via-orange-400 to-emerald-400 p-6 text-white text-center relative shrink-0">
          <div className="w-20 h-20 mx-auto -mb-2 bg-white rounded-full p-2 shadow-lg flex items-center justify-center border-4 border-amber-200 animate-bounce">
            <span className="text-4xl">{selectedAvatar.emoji}</span>
          </div>
          <h2 className="text-2xl font-black tracking-tight text-white drop-shadow-sm mt-3 flex items-center justify-center gap-2">
            <span>Chào Bạn Nhỏ Lớp 5!</span>
            <Sparkles className="w-5 h-5 text-yellow-200" />
          </h2>
          <p className="text-amber-100 text-xs sm:text-sm font-medium mt-1">
            Đăng nhập để Cú Mèo nhận xét văn hay và tích lũy thật nhiều Sao thưởng nhé! ⭐
          </p>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5 flex-1">
          {error && (
            <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2">
              <span className="text-base">⚠️</span>
              <span>{error}</span>
            </div>
          )}

          {/* Student Full Name */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <User className="w-4 h-4 text-emerald-600" />
              <span>Họ và Tên Học Sinh:</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError(null);
              }}
              placeholder="Ví dụ: Nguyễn Minh Khôi, Lê Bảo Ngọc..."
              className="w-full px-4 py-3 rounded-2xl border-2 border-emerald-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none text-slate-800 text-sm font-bold bg-emerald-50/30 transition-all placeholder:text-slate-400"
              autoFocus
            />
          </div>

          {/* Student Class */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-emerald-600" />
              <span>Lớp Học Của Em:</span>
            </label>
            <div className="flex gap-2 items-center">
              <input
                type="text"
                value={className}
                onChange={(e) => {
                  setClassName(e.target.value);
                  setError(null);
                }}
                placeholder="5A1, 5/2, 5B..."
                className="w-1/2 px-4 py-2.5 rounded-2xl border-2 border-emerald-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none text-slate-800 text-sm font-bold bg-emerald-50/30 transition-all"
              />
              <div className="flex-1 flex gap-1.5 flex-wrap">
                {quickClasses.map((qc) => (
                  <button
                    key={qc}
                    type="button"
                    onClick={() => setClassName(qc)}
                    className={`px-2.5 py-1 text-xs rounded-xl font-bold transition-all cursor-pointer ${
                      className === qc
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-600 hover:bg-emerald-100 hover:text-emerald-800'
                    }`}
                  >
                    {qc}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Avatar Selection Grid */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <Smile className="w-4 h-4 text-amber-500" />
                <span>Chọn Bạn Avatar Đồng Hành Của Em:</span>
              </label>
              <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">
                {selectedAvatar.name}
              </span>
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2.5">
              {AVATAR_OPTIONS.map((item) => {
                const isSelected = selectedAvatarId === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedAvatarId(item.id)}
                    title={`${item.name} - ${item.description}`}
                    className={`p-2 rounded-2xl flex flex-col items-center justify-center transition-all cursor-pointer transform hover:scale-105 active:scale-95 ${
                      item.bgColor
                    } border-2 ${
                      isSelected
                        ? `${item.borderColor} ring-4 ring-amber-300 shadow-md scale-105`
                        : 'border-transparent opacity-80 hover:opacity-100'
                    }`}
                  >
                    <span className="text-2xl sm:text-3xl">{item.emoji}</span>
                    <span className="text-[10px] font-black text-slate-700 mt-1 truncate max-w-full text-center">
                      {item.name.split(' ')[0]}
                    </span>
                    {isSelected && (
                      <span className="w-4 h-4 bg-emerald-500 rounded-full text-white flex items-center justify-center text-[9px] -mt-1 font-bold">
                        ✓
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Reward notice */}
          <div className="p-3 bg-amber-50/80 rounded-2xl border border-amber-200 text-xs text-amber-900 flex items-center gap-2.5">
            <span className="text-xl">🎁</span>
            <p>
              Tặng ngay <strong>+50 Sao Chào Mừng</strong> khi đăng nhập! Mỗi bài văn nộp cho Cú Mèo sẽ được nhận thêm điểm sao và nhận xét chi tiết.
            </p>
          </div>

          {/* Submit Button */}
          <div className="pt-2 flex gap-3">
            {canCloseWithoutSaving && (
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-sm transition-colors cursor-pointer"
              >
                Để sau
              </button>
            )}
            <button
              type="submit"
              className="flex-1 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-black text-base shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>🚀 Bắt Đầu Học Cùng Cú Mèo!</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
