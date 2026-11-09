import React, { useState } from 'react';
import {
  BookOpen,
  Calendar,
  Sparkles,
  ChevronRight,
  ChevronDown,
  Check,
  Compass,
  Lightbulb,
  FileText,
  Copy,
  Layers,
  ArrowRight,
  HelpCircle,
  X,
  Eye
} from 'lucide-react';
import {
  WeeklyLesson,
  GRADE_5_CURRICULUM,
  GenreType,
  getLessonsBySemester
} from '../utils/grade5Curriculum.ts';

interface CurriculumWeekSelectorProps {
  onSelectTopic: (topic: string) => void;
  onApplySampleEssay: (topic: string, essayText: string) => void;
  currentTopic?: string;
}

export const CurriculumWeekSelector: React.FC<CurriculumWeekSelectorProps> = ({
  onSelectTopic,
  onApplySampleEssay,
  currentTopic,
}) => {
  const [selectedSemester, setSelectedSemester] = useState<1 | 2>(1);
  const [selectedWeek, setSelectedWeek] = useState<number>(1);
  const [selectedGenre, setSelectedGenre] = useState<GenreType | 'all'>('all');
  const [isSampleModalOpen, setIsSampleModalOpen] = useState(false);
  const [isOutlineExpanded, setIsOutlineExpanded] = useState(false);
  const [copiedSample, setCopiedSample] = useState(false);

  // Filter lessons by semester and genre
  const semesterLessons = getLessonsBySemester(selectedSemester);
  const filteredLessons = semesterLessons.filter((lesson) => {
    if (selectedGenre === 'all') return true;
    return lesson.genre === selectedGenre;
  });

  // Current active lesson
  const currentLesson: WeeklyLesson =
    GRADE_5_CURRICULUM.find((l) => l.week === selectedWeek) || GRADE_5_CURRICULUM[0];

  const handleSelectLesson = (lesson: WeeklyLesson) => {
    setSelectedWeek(lesson.week);
    setSelectedSemester(lesson.semester);
  };

  const handleApplyTopicToWorkspace = () => {
    onSelectTopic(currentLesson.prompt);
  };

  const handleApplySampleToWorkspace = () => {
    onApplySampleEssay(currentLesson.prompt, currentLesson.sampleEssay.text);
    setIsSampleModalOpen(false);
  };

  const handleCopySample = () => {
    navigator.clipboard.writeText(currentLesson.sampleEssay.text);
    setCopiedSample(true);
    setTimeout(() => setCopiedSample(false), 2000);
  };

  const genreBadgeColors: Record<GenreType, string> = {
    ta_canh: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    ta_nguoi: 'bg-blue-100 text-blue-800 border-blue-200',
    ta_con_vat: 'bg-amber-100 text-amber-800 border-amber-200',
    ta_cay_coi: 'bg-teal-100 text-teal-800 border-teal-200',
    ta_do_vat: 'bg-purple-100 text-purple-800 border-purple-200',
    tong_hop: 'bg-rose-100 text-rose-800 border-rose-200',
  };

  return (
    <div className="bg-white rounded-3xl border border-emerald-100 shadow-xs overflow-hidden">
      {/* Top Banner: Book Selector */}
      <div className="bg-linear-to-r from-emerald-900 via-emerald-800 to-teal-900 p-5 sm:p-6 text-white">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-700/70 text-emerald-200 text-xs font-semibold border border-emerald-500/30">
              <BookOpen className="w-3.5 h-3.5 text-amber-300" />
              <span>Chương Trình Tiếng Việt Lớp 5 • Bộ Giáo Dục & Đào Tạo</span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold flex items-center gap-2">
              <span>Chương Trình 35 Tuần Học Văn Miêu Tả</span>
              <span className="text-xs font-normal text-emerald-200 hidden sm:inline">
                (Đầy đủ Tập 1 & Tập 2)
              </span>
            </h2>
            <p className="text-xs text-emerald-100/80">
              Chọn tuần học theo thời khóa biểu để nhận đề bài, dàn ý Socratic và bài văn mẫu tương ứng.
            </p>
          </div>

          {/* Semester Selector Tabs */}
          <div className="flex items-center bg-emerald-950/60 p-1 rounded-2xl border border-emerald-700/50 self-start md:self-auto shrink-0">
            <button
              type="button"
              onClick={() => {
                setSelectedSemester(1);
                if (selectedWeek > 18) setSelectedWeek(1);
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedSemester === 1
                  ? 'bg-emerald-500 text-white shadow-xs'
                  : 'text-emerald-200 hover:text-white hover:bg-emerald-800/50'
              }`}
            >
              <span>📘 Tập 1 (Tuần 1 - 18)</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setSelectedSemester(2);
                if (selectedWeek <= 18) setSelectedWeek(19);
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedSemester === 2
                  ? 'bg-teal-500 text-white shadow-xs'
                  : 'text-emerald-200 hover:text-white hover:bg-emerald-800/50'
              }`}
            >
              <span>📙 Tập 2 (Tuần 19 - 35)</span>
            </button>
          </div>
        </div>

        {/* Genre Filter Pills */}
        <div className="flex items-center gap-1.5 flex-wrap mt-4 pt-3 border-t border-emerald-700/40 text-xs">
          <span className="text-emerald-300 font-semibold mr-1">Lọc thể loại:</span>
          {[
            { id: 'all', label: 'Tất cả 18 tuần' },
            { id: 'ta_canh', label: '🌿 Tả cảnh' },
            { id: 'ta_nguoi', label: '👤 Tả người' },
            { id: 'ta_con_vat', label: '🐾 Tả con vật' },
            { id: 'ta_cay_coi', label: '🌳 Tả cây cối' },
            { id: 'ta_do_vat', label: '🎒 Tả đồ vật' },
          ].map((g) => (
            <button
              key={g.id}
              type="button"
              onClick={() => setSelectedGenre(g.id as any)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                selectedGenre === g.id
                  ? 'bg-white text-emerald-950 font-bold shadow-2xs'
                  : 'bg-emerald-800/60 text-emerald-200 hover:bg-emerald-700 hover:text-white'
              }`}
            >
              {g.label}
            </button>
          ))}
        </div>
      </div>

      {/* Week Selector Chips Carousel / Scroller */}
      <div className="p-4 bg-slate-50 border-b border-slate-200/80">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-emerald-600" />
            <span>
              Danh sách tuần học {selectedSemester === 1 ? 'Tập 1 (Học kì 1)' : 'Tập 2 (Học kì 2)'}:
            </span>
          </span>
          <span className="text-xs text-slate-400">Nhấn vào từng tuần để xem chi tiết</span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
          {filteredLessons.map((lesson) => {
            const isSelected = lesson.week === currentLesson.week;
            return (
              <button
                key={lesson.week}
                type="button"
                onClick={() => handleSelectLesson(lesson)}
                className={`px-3 py-2 rounded-xl text-xs shrink-0 flex flex-col items-start gap-0.5 border transition-all text-left cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-600 text-white border-emerald-700 shadow-xs ring-2 ring-emerald-300'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/40'
                }`}
              >
                <div className="flex items-center gap-1.5 font-bold">
                  <span>Tuần {lesson.week}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-sm font-semibold ${
                      isSelected
                        ? 'bg-emerald-700 text-emerald-100'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {lesson.genreLabel}
                  </span>
                </div>
                <span
                  className={`text-[11px] truncate max-w-[140px] ${
                    isSelected ? 'text-emerald-100' : 'text-slate-500'
                  }`}
                >
                  {lesson.theme}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Week Lesson Card */}
      <div className="p-6 space-y-5">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                Tuần {currentLesson.week} • Sách Tiếng Việt 5 Tập {currentLesson.semester}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                Chủ điểm: <b>{currentLesson.theme}</b>
              </span>
              <span
                className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                  genreBadgeColors[currentLesson.genre] || 'bg-slate-100 text-slate-700'
                }`}
              >
                {currentLesson.genreLabel}
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-black text-slate-900">
              {currentLesson.lessonTitle}
            </h3>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-2 flex-wrap w-full lg:w-auto">
            <button
              type="button"
              onClick={handleApplyTopicToWorkspace}
              className="flex-1 lg:flex-none px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs cursor-pointer transition-colors"
            >
              <Check className="w-4 h-4" />
              <span>Nạp Đề Bài Này Vào Bài Làm</span>
            </button>
            <button
              type="button"
              onClick={() => setIsSampleModalOpen(true)}
              className="flex-1 lg:flex-none px-4 py-2.5 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
            >
              <Eye className="w-4 h-4 text-teal-600" />
              <span>Đọc Văn Mẫu Tuần {currentLesson.week}</span>
            </button>
          </div>
        </div>

        {/* Prompt Card */}
        <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/90 text-slate-800 space-y-1.5">
          <div className="text-xs font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
            <FileText className="w-4 h-4 text-amber-700" />
            <span>Đề bài chính thức (SGK Tiếng Việt 5):</span>
          </div>
          <p className="text-sm font-semibold text-slate-900 leading-relaxed italic">
            "{currentLesson.prompt}"
          </p>
        </div>

        {/* Socratic Outline & Guidelines */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-emerald-600" />
              <span>Dàn ý gợi mở Socratic (3 phần chuẩn mực):</span>
            </span>
            <button
              type="button"
              onClick={() => setIsOutlineExpanded(!isOutlineExpanded)}
              className="text-xs text-emerald-700 hover:text-emerald-900 font-semibold flex items-center gap-1 cursor-pointer"
            >
              <span>{isOutlineExpanded ? 'Thu gọn dàn ý' : 'Xem chi tiết dàn ý'}</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform ${isOutlineExpanded ? 'rotate-180' : ''}`}
              />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-xs font-bold text-emerald-800 flex items-center gap-1">
                <span>1. Mở bài:</span>
              </span>
              <p className="text-xs text-slate-700 leading-relaxed">
                {currentLesson.outlineGuide.moBai}
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-xs font-bold text-teal-800 flex items-center gap-1">
                <span>2. Thân bài:</span>
              </span>
              <p className="text-xs text-slate-700 leading-relaxed">
                {currentLesson.outlineGuide.thanBai[0]}
                {isOutlineExpanded && currentLesson.outlineGuide.thanBai.length > 1 && (
                  <span className="block mt-1 pt-1 border-t border-slate-200 text-slate-600">
                    {currentLesson.outlineGuide.thanBai.slice(1).join(' • ')}
                  </span>
                )}
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-xs font-bold text-indigo-800 flex items-center gap-1">
                <span>3. Kết bài:</span>
              </span>
              <p className="text-xs text-slate-700 leading-relaxed">
                {currentLesson.outlineGuide.ketBai}
              </p>
            </div>
          </div>
        </div>

        {/* Vocabulary & Socratic Hints */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
          {/* Vocab Hints */}
          <div className="p-3 rounded-2xl bg-emerald-50/50 border border-emerald-100 flex items-start gap-2.5">
            <Lightbulb className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <div className="text-xs space-y-1">
              <span className="font-bold text-emerald-950">Vốn từ & Câu ghép khuyên dùng:</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {currentLesson.vocabularyHints.map((v, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded-md bg-white border border-emerald-200 text-emerald-900 font-medium text-[11px]"
                  >
                    {v}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Socratic Mentoring Questions */}
          <div className="p-3 rounded-2xl bg-teal-50/50 border border-teal-100 flex items-start gap-2.5">
            <HelpCircle className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
            <div className="text-xs space-y-1">
              <span className="font-bold text-teal-950">Góc gợi mở của Bác Cú:</span>
              <p className="text-slate-700 leading-relaxed italic text-[11px]">
                "{currentLesson.socraticQuestions[0]}"
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal: View Full Sample Essay for Current Week */}
      {isSampleModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl border border-emerald-100 overflow-hidden flex flex-col max-h-[90vh]">
            {/* Header */}
            <div className="p-6 bg-linear-to-r from-emerald-800 to-teal-800 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
                  <BookOpen className="w-6 h-6 text-emerald-300" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-700/80 text-emerald-100 border border-emerald-500/40">
                      Văn Mẫu Tuần {currentLesson.week}
                    </span>
                    <span className="text-xs text-emerald-200">• Tập {currentLesson.semester}</span>
                  </div>
                  <h3 className="text-lg font-bold mt-0.5 text-white">
                    {currentLesson.sampleEssay.title}
                  </h3>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsSampleModalOpen(false)}
                aria-label="Đóng cửa sổ"
                className="p-2 rounded-xl text-emerald-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Body */}
            <div className="p-6 space-y-5 overflow-y-auto flex-1">
              {/* Highlights analysis tags */}
              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-emerald-950 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>Điểm sáng nghệ thuật của bài văn mẫu này:</span>
                </div>
                <div className="flex flex-col gap-1.5 text-xs text-emerald-900">
                  {currentLesson.sampleEssay.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-1.5">
                      <span className="text-emerald-600 font-bold">•</span>
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sample Essay Text */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 font-serif text-slate-800 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                {currentLesson.sampleEssay.text}
              </div>
            </div>

            {/* Footer Actions */}
            <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                type="button"
                onClick={handleCopySample}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 font-semibold text-xs cursor-pointer transition-colors"
              >
                {copiedSample ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Đã sao chép văn bản!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-slate-600" />
                    <span>Sao chép bài văn mẫu</span>
                  </>
                )}
              </button>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setIsSampleModalOpen(false)}
                  className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 font-semibold text-xs cursor-pointer"
                >
                  Đóng
                </button>
                <button
                  type="button"
                  onClick={handleApplySampleToWorkspace}
                  className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs cursor-pointer transition-colors"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Dán bài văn mẫu này vào bài làm để Bác Cú chấm thử</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
