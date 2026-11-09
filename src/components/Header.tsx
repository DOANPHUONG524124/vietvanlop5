import React from 'react';
import { OwlAvatar } from './OwlAvatar.tsx';
import { NestLevelInfo, getNestTier } from '../utils/rules.ts';
import { StudentProfile } from '../types/index.ts';
import { MusicPlayerControl } from './MusicPlayerControl.tsx';
import {
  Sparkles,
  Trees,
  BookOpen,
  GraduationCap,
  HeartHandshake,
  VolumeX,
  Key,
  Database,
  User,
  Backpack,
  Trophy
} from 'lucide-react';

export type ActiveTab = 'student' | 'nest' | 'teacher' | 'parent';

interface HeaderProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  seeds: number;
  isSpeaking: boolean;
  onStopSpeech: () => void;
  studentCount?: number;
  classNameStr?: string;
  onOpenApiKeySettings: () => void;
  hasApiKey: boolean;
  onOpenGoogleSheetModal?: () => void;
  studentProfile?: StudentProfile | null;
  onOpenLoginModal?: () => void;
  onOpenVocabModal?: () => void;
  onOpenExportModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onSelectTab,
  seeds,
  isSpeaking,
  onStopSpeech,
  studentCount,
  classNameStr,
  onOpenApiKeySettings,
  hasApiKey,
  onOpenGoogleSheetModal,
  studentProfile,
  onOpenLoginModal,
  onOpenVocabModal,
  onOpenExportModal,
}) => {
  const nestInfo: NestLevelInfo = getNestTier(seeds);

  const tabs: { id: ActiveTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    {
      id: 'student',
      label: 'Góc Luyện Viết & Nộp Bài',
      icon: <BookOpen className="w-4 h-4" />,
      badge: 'Cú Mèo Nhận Xét',
    },
    {
      id: 'nest',
      label: 'Tổ Chim Học Tập',
      icon: <Trees className="w-4 h-4" />,
      badge: `Cấp ${nestInfo.level}`,
    },
    {
      id: 'teacher',
      label: 'Bảng Điểm Thầy Cô',
      icon: <GraduationCap className="w-4 h-4" />,
      badge: studentCount ? `${studentCount} HS` : undefined,
    },
    {
      id: 'parent',
      label: 'Góc Phụ Huynh',
      icon: <HeartHandshake className="w-4 h-4" />,
      badge: 'Thư Đồng Hành',
    },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b-2 border-emerald-200/80 shadow-sm">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-2">
          {/* Logo & Branding - Cheerful cartoon style */}
          <div
            className="flex items-center gap-3 cursor-pointer group shrink-0"
            onClick={() => onSelectTab('student')}
            role="button"
            tabIndex={0}
            aria-label="Về trang chủ Luyện Viết Tiếng Việt 5"
          >
            <OwlAvatar size="md" mood="happy" isSpeaking={isSpeaking} />
            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-lg sm:text-xl font-black tracking-tight text-emerald-950 group-hover:text-emerald-700 transition-colors">
                  Bác Cú Thông Thái
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-black bg-gradient-to-r from-amber-400 to-orange-400 text-white shadow-xs">
                  <Sparkles className="w-3 h-3" /> Lớp 5
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-emerald-700 font-semibold hidden md:block">
                Hành Trình Luyện Viết Văn Socratic Tiểu Học
              </p>
            </div>
          </div>

          {/* Quick Toolbar: Music Player, Vocabulary Bank, Student Login & Score, Settings */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 flex-wrap justify-end">
            {/* Background Music Player Control */}
            <MusicPlayerControl />

            {/* Quick Vocabulary Bank Button */}
            {onOpenVocabModal && (
              <button
                type="button"
                onClick={onOpenVocabModal}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-teal-50 to-emerald-50 border border-teal-300 hover:border-teal-400 text-teal-950 text-xs font-black shadow-xs hover:scale-105 active:scale-95 transition-all cursor-pointer"
                title="Mở Túi Bối Bối Từ Vựng Lớp 5 (Từ láy, So sánh, Nhân hóa)"
              >
                <span className="text-base">🎒</span>
                <span className="hidden sm:inline">Túi Từ Vựng</span>
              </button>
            )}

            {/* Export Database Button */}
            {onOpenExportModal && (
              <button
                type="button"
                onClick={onOpenExportModal}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-300 hover:border-amber-400 text-amber-950 text-xs font-black shadow-xs hover:scale-105 active:scale-95 transition-all cursor-pointer"
                title="Xem thống kê bài nộp & xuất cơ sở dữ liệu (Excel / JSON)"
              >
                <Database className="w-3.5 h-3.5 text-amber-600" />
                <span className="hidden sm:inline">Xuất Database</span>
              </button>
            )}

            {/* Speech playing indicator */}
            {isSpeaking && (
              <button
                onClick={onStopSpeech}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300 animate-pulse hover:bg-amber-200 cursor-pointer"
                title="Dừng Cú Mèo đọc"
              >
                <VolumeX className="w-3.5 h-3.5 text-amber-700" />
                <span className="hidden sm:inline">Đang đọc</span>
                <span>(Dừng)</span>
              </button>
            )}

            {/* Student Profile & Avatar Pill */}
            {studentProfile ? (
              <button
                type="button"
                onClick={onOpenLoginModal}
                className="flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-amber-100 via-orange-100 to-yellow-100 border-2 border-amber-300 hover:border-amber-400 shadow-xs hover:shadow-sm transition-all cursor-pointer group"
                title="Bấm để đổi Avatar hoặc chỉnh sửa tên lớp"
              >
                <span className="text-xl group-hover:scale-125 transition-transform">
                  {studentProfile.avatarIcon || '🦉'}
                </span>
                <div className="text-left">
                  <div className="text-[10px] font-bold text-amber-800 leading-tight">
                    {studentProfile.className}
                  </div>
                  <div className="text-xs font-black text-slate-900 leading-tight max-w-[85px] truncate">
                    {studentProfile.name}
                  </div>
                </div>
                <div className="pl-1 border-l border-amber-300 flex items-center gap-0.5 text-amber-900 font-black text-xs">
                  <span>{studentProfile.totalPoints}</span>
                  <span className="text-amber-500">⭐</span>
                </div>
              </button>
            ) : (
              <button
                type="button"
                onClick={onOpenLoginModal}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <User className="w-3.5 h-3.5" />
                <span>Đăng Nhập Nhí</span>
              </button>
            )}

            {/* API Key Modal Button */}
            <button
              onClick={onOpenApiKeySettings}
              className={`p-2 rounded-full border transition-all cursor-pointer ${
                hasApiKey
                  ? 'bg-slate-100 border-slate-200 hover:bg-emerald-50 hover:border-emerald-300 text-slate-700'
                  : 'bg-rose-100 border-rose-300 text-rose-700 animate-pulse'
              }`}
              title={hasApiKey ? 'Cài đặt Gemini AI Model & Key' : 'Nhập API Key để kích hoạt AI'}
              aria-label="Cài đặt API Key"
            >
              <Key className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs - Playful, vibrant colors */}
        <nav
          className="flex space-x-1 sm:space-x-3 overflow-x-auto py-2 border-t border-emerald-100 scrollbar-none"
          aria-label="Tabs điều hướng"
        >
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onSelectTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs sm:text-sm font-black whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-600/30 scale-[1.02]'
                    : 'text-slate-600 hover:text-emerald-800 hover:bg-emerald-50/80 font-bold'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                {tab.icon}
                <span>{tab.label}</span>
                {tab.badge && (
                  <span
                    className={`ml-1 text-[10px] px-2 py-0.5 rounded-full font-black ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
