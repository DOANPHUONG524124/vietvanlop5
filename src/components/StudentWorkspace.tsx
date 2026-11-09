import React, { useState, useRef, useEffect } from 'react';
import { OwlAvatar } from './OwlAvatar.tsx';
import { SocraticFeedback } from './SocraticFeedback.tsx';
import { SocraticOutlineModal } from './SocraticOutlineModal.tsx';
import { CurriculumWeekSelector } from './CurriculumWeekSelector.tsx';
import { EvaluationResult, TextHeuristics, StudentRecord, StudentProfile } from '../types/index.ts';
import { analyzeText } from '../utils/rules.ts';
import { SAMPLE_ESSAYS } from '../utils/sampleEssays.ts';
import { extractTextFromImage } from '../utils/geminiClient.ts';
import {
  Sparkles,
  Send,
  UploadCloud,
  RotateCcw,
  BookOpen,
  Camera,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  UserCheck,
  FileSpreadsheet,
  RefreshCw,
  Loader2,
  XCircle,
  Clock,
  Key,
  Download,
  Lightbulb,
  FileText,
  Trophy,
  Smile,
  Heart
} from 'lucide-react';

export type StepStatus = 'idle' | 'running' | 'done' | 'stopped';

export interface EvaluationStepInfo {
  step: 1 | 2 | 3;
  name: string;
  status: StepStatus;
  message?: string;
  modelUsed?: string;
}

interface StudentWorkspaceProps {
  evaluation: EvaluationResult | null;
  onEvaluate: (essay: string, topic: string, imageBase64?: string) => Promise<void>;
  isLoading: boolean;
  onOpenChat: (initialPrompt?: string) => void;
  onAwardSeeds: (seeds: number) => void;
  students?: StudentRecord[];
  currentStudent?: StudentRecord | null;
  onSelectStudent?: (student: StudentRecord) => void;
  evaluationSteps?: EvaluationStepInfo[];
  fallbackNotice?: { from: string; to: string; reason: string } | null;
  rawApiError?: string | null;
  onOpenApiKeySettings?: () => void;
  onOpenGoogleSheetModal?: () => void;
  studentProfile?: StudentProfile | null;
  onOpenLoginModal?: () => void;
  onOpenVocabModal?: () => void;
}

export const StudentWorkspace: React.FC<StudentWorkspaceProps> = ({
  evaluation,
  onEvaluate,
  isLoading,
  onOpenChat,
  onAwardSeeds,
  students = [],
  currentStudent,
  onSelectStudent,
  evaluationSteps,
  fallbackNotice,
  rawApiError,
  onOpenApiKeySettings,
  onOpenGoogleSheetModal,
  studentProfile,
  onOpenLoginModal,
  onOpenVocabModal,
}) => {
  const [topic, setTopic] = useState('Tả cây phượng vĩ già trên sân trường em vào một ngày đầu hạ');
  const [essay, setEssay] = useState('');
  const [sampleId, setSampleId] = useState<string>('');
  const [isOcrProcessing, setIsOcrProcessing] = useState(false);
  const [ocrError, setOcrError] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isOutlineOpen, setIsOutlineOpen] = useState(false);

  // Sync with currentStudent when changed externally
  useEffect(() => {
    if (currentStudent) {
      if (currentStudent.topic) {
        setTopic(currentStudent.topic);
      }
      if (currentStudent.essay) {
        setEssay(currentStudent.essay);
      }
    }
  }, [currentStudent]);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const textDocInputRef = useRef<HTMLInputElement>(null);

  // Live client-side heuristics
  const heuristics: TextHeuristics = analyzeText(essay);

  // OCR upload handler using direct client Gemini Vision
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setOcrError(null);
    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = reader.result as string;
      setImagePreview(base64);
      setIsOcrProcessing(true);

      try {
        const extracted = await extractTextFromImage(base64);
        if (extracted && extracted.trim()) {
          setEssay(extracted.trim());
        } else {
          setOcrError('Không trích xuất được chữ viết từ ảnh.');
        }
      } catch (err: any) {
        console.error('OCR Error:', err);
        setOcrError(err?.message || 'Không thể trích xuất chữ viết. Vui lòng kiểm tra lại API Key.');
      } finally {
        setIsOcrProcessing(false);
      }
    };
    reader.readAsDataURL(file);
  };

  // Text file upload handler (.txt)
  const handleTextDocUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        setEssay(content);
      }
    };
    reader.readAsText(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!essay.trim() && !imagePreview) return;
    await onEvaluate(essay, topic, imagePreview || undefined);
  };

  // Calculate progress percentage
  const completedStepsCount = evaluationSteps
    ? evaluationSteps.filter((s) => s.status === 'done').length
    : 0;
  const progressPercent = Math.round((completedStepsCount / 3) * 100);
  const hasStoppedStep = evaluationSteps?.some((s) => s.status === 'stopped');

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Playful & Warm Hero Greeting Card for Grade 5 */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-amber-500 rounded-3xl p-6 sm:p-7 text-white shadow-xl relative overflow-hidden border-2 border-emerald-400/40">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-5">
          <div className="space-y-2.5 max-w-2xl text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-xs text-amber-200 text-xs font-black border border-white/20">
              <Sparkles className="w-4 h-4 text-yellow-300" />
              <span>Góc Học Tập Socratic Tiếng Việt Lớp 5</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center justify-center md:justify-start gap-2">
              <span>Chào mừng</span>
              <span className="text-yellow-300 underline decoration-wavy decoration-amber-300">
                {studentProfile ? studentProfile.name : 'Nhà Thám Hiểm Nhí'}
              </span>
              <span>!</span>
            </h1>

            <p className="text-xs sm:text-sm text-emerald-50 leading-relaxed font-medium">
              Bác Cú Thông Thái sẽ cùng em đọc từng câu chữ, khám phá từ láy sinh động, hình ảnh so sánh kỳ diệu
              và gửi tặng em thật nhiều <strong>Sao Thưởng ⭐</strong> nhé!
            </p>

            <div className="flex items-center gap-2 pt-1 justify-center md:justify-start flex-wrap">
              {studentProfile && (
                <div className="px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-400/30 text-xs font-black text-amber-300 flex items-center gap-1.5">
                  <span className="text-base">{studentProfile.avatarIcon}</span>
                  <span>Lớp: {studentProfile.className}</span>
                  <span>•</span>
                  <span>{studentProfile.totalPoints} Sao</span>
                </div>
              )}

              {onOpenVocabModal && (
                <button
                  type="button"
                  onClick={onOpenVocabModal}
                  className="px-3.5 py-1 rounded-full bg-white text-emerald-900 hover:bg-amber-100 font-black text-xs flex items-center gap-1 shadow-sm transition-all cursor-pointer"
                >
                  <span>🎒 Túi Bối Bối Từ Vựng</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => onOpenChat()}
                className="px-3.5 py-1 rounded-full bg-amber-400 text-amber-950 hover:bg-amber-300 font-black text-xs flex items-center gap-1 shadow-sm transition-all cursor-pointer"
              >
                <span>💬 Trò Chuyện Cùng Bác Cú</span>
              </button>
            </div>
          </div>

          <div className="flex flex-col items-center gap-1 shrink-0">
            <OwlAvatar size="xl" mood={isLoading ? 'thinking' : 'happy'} isSpeaking={isLoading} />
            <span className="text-xs font-black text-amber-950 bg-amber-300 px-3 py-1 rounded-full shadow-xs">
              Bác Cú Chờ Đọc Bài Của Em!
            </span>
          </div>
        </div>
      </div>

      {/* Vietnamese Grade 5 Curriculum - 35 Weeks (Bộ GD&ĐT) */}
      <CurriculumWeekSelector
        currentTopic={topic}
        onSelectTopic={(selectedPrompt) => setTopic(selectedPrompt)}
        onApplySampleEssay={(samplePrompt, sampleText) => {
          setTopic(samplePrompt);
          setEssay(sampleText);
          setImagePreview(null);
        }}
      />

      {/* Main Essay Submission Card */}
      <div className="bg-white rounded-3xl p-5 sm:p-7 border-2 border-emerald-200/80 shadow-md space-y-5">
        {/* Topic Input & Outline Builder */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <label htmlFor="topic-input" className="block text-xs font-black uppercase tracking-wider text-emerald-950 flex items-center gap-1.5">
              <span>📝 Đề Bài / Chủ Đề Tập Làm Văn:</span>
            </label>
            <div className="flex items-center gap-2">
              {onOpenVocabModal && (
                <button
                  type="button"
                  onClick={onOpenVocabModal}
                  className="px-3 py-1 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-300 font-bold text-xs flex items-center gap-1 shadow-2xs transition-all cursor-pointer"
                  title="Xem gợi ý từ láy, câu ghép và so sánh cho đề bài này"
                >
                  <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                  <span>Gợi ý từ ngữ theo đề</span>
                </button>
              )}
              <button
                type="button"
                onClick={() => setIsOutlineOpen(true)}
                className="px-3.5 py-1 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-black text-xs flex items-center gap-1 shadow-xs transition-all cursor-pointer"
              >
                <span>🦉 Lập Dàn Ý 3 Phần</span>
              </button>
            </div>
          </div>
          <input
            id="topic-input"
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Ví dụ: Tả một cảnh đẹp ở quê hương em vào một buổi sáng mùa hạ..."
            className="w-full px-4 py-3 rounded-2xl border-2 border-emerald-100 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none text-sm font-bold text-slate-800 bg-emerald-50/20 transition-all"
          />
        </div>

        {/* Upload Action Bar: Handwritten notebook (OCR) or Text File (.txt) */}
        <div className="p-3.5 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-amber-50 border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="p-2.5 rounded-2xl bg-emerald-600 text-white shadow-xs">
              <Camera className="w-5 h-5" />
            </span>
            <div className="text-left">
              <div className="text-xs font-black text-emerald-950 flex items-center gap-1.5">
                <span>Úp Load Bài Làm Của Em (Chữ viết tay hoặc gõ văn bản)</span>
                <span className="text-[10px] bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded-full font-bold">
                  OCR AI
                </span>
              </div>
              <p className="text-[11px] text-slate-600">
                Chụp ảnh trang vở ô ly hoặc tải file bài làm, Bác Cú sẽ đọc chữ tự động!
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              className="hidden"
              onChange={handleFileUpload}
            />
            <input
              type="file"
              ref={textDocInputRef}
              accept=".txt,.doc,.docx"
              className="hidden"
              onChange={handleTextDocUpload}
            />

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isOcrProcessing}
              className="px-3.5 py-2 rounded-xl bg-white hover:bg-emerald-100 text-emerald-900 border-2 border-emerald-300 font-black text-xs flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
            >
              <UploadCloud className="w-4 h-4 text-emerald-600" />
              <span>{isOcrProcessing ? 'Đang đọc chữ viết...' : 'Tải Ảnh Trang Vở'}</span>
            </button>

            <button
              type="button"
              onClick={() => textDocInputRef.current?.click()}
              className="px-3 py-2 rounded-xl bg-white hover:bg-amber-100 text-slate-700 border border-slate-300 font-bold text-xs flex items-center gap-1 transition-colors cursor-pointer"
              title="Tải file văn bản từ máy tính"
            >
              <FileText className="w-4 h-4 text-amber-600" />
              <span>Tải File .txt</span>
            </button>
          </div>
        </div>

        {ocrError && (
          <div className="p-3 bg-rose-50 text-rose-700 border border-rose-200 rounded-2xl text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{ocrError}</span>
          </div>
        )}

        {imagePreview && (
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={imagePreview}
                alt="Ảnh bài văn chữ viết tay"
                className="w-16 h-16 object-cover rounded-xl border border-slate-200 shadow-xs"
              />
              <div className="text-xs">
                <span className="font-bold text-slate-800">Ảnh trang vở đã nạp thành công</span>
                <p className="text-slate-500">Bác Cú sẽ phân tích hình ảnh và chữ viết để chấm bài.</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setImagePreview(null)}
              className="text-xs text-rose-600 hover:text-rose-800 font-bold px-3 py-1.5 rounded-xl hover:bg-rose-50 cursor-pointer"
            >
              Gỡ ảnh
            </button>
          </div>
        )}

        {/* Main Essay Textarea - Designed like student notebook paper */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label htmlFor="essay-input" className="block text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <span>✍️ Bài Văn Của Em:</span>
              <span className="text-[11px] font-normal text-slate-400 lowercase">(gõ hoặc dán nội dung vào đây)</span>
            </label>
            <div className="flex items-center gap-2">
              {onOpenVocabModal && (
                <button
                  type="button"
                  onClick={onOpenVocabModal}
                  className="text-xs font-bold text-teal-700 hover:text-teal-900 flex items-center gap-1 cursor-pointer bg-teal-50 px-2.5 py-1 rounded-lg"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Tra từ láy & từ hay</span>
                </button>
              )}
              <button
                type="button"
                onClick={() => {
                  setEssay('');
                  setImagePreview(null);
                  setSampleId('');
                }}
                className="text-xs text-slate-400 hover:text-slate-600 flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" /> Xóa trắng
              </button>
            </div>
          </div>

          <textarea
            id="essay-input"
            rows={11}
            value={essay}
            onChange={(e) => setEssay(e.target.value)}
            placeholder="Gõ hoặc dán bài văn của em vào đây nhé! Em có thể bấm 'Túi Từ Vựng' ở trên để lấy thêm từ láy, câu ghép sinh động..."
            className="w-full p-4 sm:p-5 rounded-2xl border-2 border-emerald-100 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none text-sm leading-relaxed text-slate-900 bg-amber-50/15 shadow-inner transition-all font-sans"
          />

          {/* Real-time linguistic metrics bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl text-xs text-slate-700 border border-emerald-200">
            <div className="flex items-center gap-3 font-semibold">
              <span className="text-emerald-900">
                <strong>{heuristics.wordCount}</strong> từ
              </span>
              <span>•</span>
              <span className="text-emerald-900">
                <strong>{heuristics.sentenceCount}</strong> câu
              </span>
              <span>•</span>
              <span className="text-emerald-900">
                <strong>{heuristics.paragraphCount}</strong> đoạn
              </span>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-emerald-950 font-bold">Từ láy tìm thấy: </span>
              {heuristics.detectedTuLay.length > 0 ? (
                heuristics.detectedTuLay.slice(0, 4).map((tl, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded-lg bg-emerald-200 text-emerald-950 font-bold"
                  >
                    {tl}
                  </span>
                ))
              ) : (
                <span className="text-slate-400 italic">Chưa có (hãy thêm từ láy nhé)</span>
              )}

              {heuristics.detectedCompoundPairs.length > 0 && (
                <span className="ml-1 px-2 py-0.5 rounded-lg bg-amber-200 text-amber-950 font-bold">
                  Câu ghép: {heuristics.detectedCompoundPairs[0]}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Fallback Notice Notification */}
        {fallbackNotice && (
          <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-300 text-amber-900 text-xs flex items-center justify-between gap-3 shadow-xs animate-in fade-in">
            <div className="flex items-center gap-2">
              <RefreshCw className="w-4 h-4 text-amber-600 shrink-0 animate-spin" />
              <span>
                <b>Cơ chế Fallback kích hoạt:</b> Model <code>{fallbackNotice.from}</code> gặp lỗi ({fallbackNotice.reason}), hệ thống đang tự động chuyển sang <code>{fallbackNotice.to}</code> và thử lại ngay lập tức.
              </span>
            </div>
          </div>
        )}

        {/* 3-Step Evaluation Progress Tracker */}
        {(isLoading || evaluationSteps) && (
          <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50/80 border-2 border-emerald-200 space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <OwlAvatar size="sm" mood="thinking" />
                <span className="text-xs font-black uppercase tracking-wider text-emerald-950">
                  Bác Cú Đang Đọc & Chấm Điểm 3 Bước
                </span>
                {isLoading && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-200 px-2 py-0.5 rounded-full animate-pulse">
                    <Loader2 className="w-3 h-3 animate-spin" /> Đang chấm bài...
                  </span>
                )}
                {hasStoppedStep && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-700 bg-rose-100 px-2.5 py-0.5 rounded-full border border-rose-300">
                    <XCircle className="w-3 h-3 text-rose-600" /> Đã dừng do lỗi
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <div className="w-28 sm:w-36 bg-emerald-200 rounded-full h-2.5 overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ${
                      hasStoppedStep ? 'bg-rose-500' : 'bg-emerald-600'
                    }`}
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <span className="text-xs font-mono font-black text-emerald-900">
                  {completedStepsCount}/3 ({progressPercent}%)
                </span>
              </div>
            </div>

            {/* Step Columns */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
              {(
                evaluationSteps || [
                  { step: 1, name: 'Bước 1: Số liệu sơ bộ (Từ láy, câu ghép)', status: 'idle' },
                  { step: 2, name: 'Bước 2: Đánh giá Socratic 5 Cột Trụ', status: 'idle' },
                  { step: 3, name: 'Bước 3: Báo cáo Phụ huynh & Minigame', status: 'idle' },
                ]
              ).map((s) => {
                const isRunning = s.status === 'running';
                const isDone = s.status === 'done';
                const isStopped = s.status === 'stopped';
                const isIdle = s.status === 'idle';

                return (
                  <div
                    key={s.step}
                    className={`p-3 rounded-xl border transition-all ${
                      isDone
                        ? 'bg-emerald-100/80 border-emerald-300 text-emerald-950 font-semibold'
                        : isRunning
                        ? 'bg-sky-50 border-sky-400 text-sky-950 ring-2 ring-sky-200'
                        : isStopped
                        ? 'bg-rose-50 border-rose-300 text-rose-950'
                        : 'bg-white border-slate-200 text-slate-500'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[11px] font-bold">Bước {s.step}</span>
                      {isDone && (
                        <span className="text-[10px] font-bold text-emerald-800 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Hoàn tất
                        </span>
                      )}
                      {isRunning && (
                        <span className="text-[10px] font-bold text-sky-700 flex items-center gap-1">
                          <Loader2 className="w-3 h-3 animate-spin text-sky-600" /> Đang chạy
                        </span>
                      )}
                      {isStopped && (
                        <span className="text-[10px] font-bold text-rose-700">Đã dừng do lỗi</span>
                      )}
                      {isIdle && <span className="text-[10px] text-slate-400">Chờ</span>}
                    </div>
                    <div className="text-xs font-bold leading-snug">{s.name}</div>
                    {s.message && (
                      <div className="text-[10px] text-slate-600 mt-0.5">{s.message}</div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Verbatim Raw API Error Alert */}
        {rawApiError && (
          <div className="p-4 rounded-2xl bg-rose-50 border-2 border-rose-300 text-rose-950 space-y-2.5 animate-in fade-in">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
                <span className="text-xs font-bold text-rose-800 uppercase tracking-wider">
                  Tất cả các model AI đều thất bại • Quá trình đánh giá bị gián đoạn
                </span>
              </div>
              {onOpenApiKeySettings && (
                <button
                  type="button"
                  onClick={onOpenApiKeySettings}
                  className="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer transition-colors"
                >
                  <Key className="w-3 h-3" />
                  <span>Đổi API Key ngay</span>
                </button>
              )}
            </div>

            <div className="p-3 bg-white rounded-xl border border-rose-200 font-mono text-xs text-rose-900 break-words whitespace-pre-wrap select-all">
              {rawApiError}
            </div>
          </div>
        )}

        {/* Big Cheerful Submit Button */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <div className="text-xs text-slate-600 text-center sm:text-left">
            <span className="font-bold text-emerald-800">🎁 Thưởng ngay +50 Sao </span>
            <span>mỗi lần nộp bài cho Bác Cú chấm!</span>
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={(!essay.trim() && !imagePreview) || isLoading}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-amber-500 hover:from-emerald-700 hover:to-amber-600 disabled:opacity-50 text-white font-black text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-xl shadow-emerald-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            {isLoading ? (
              <>
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Bác Cú Đang Đọc & Chấm Bài Của Em...</span>
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                <span>🦉 Nộp Bài Cho Cú Mèo Nhận Xét (+50 Sao ⭐)</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Socratic Feedback Result when available */}
      {evaluation && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-amber-500" />
              <span>Nhận Xét Từ Bác Cú Thông Thái</span>
            </h2>
            <button
              type="button"
              onClick={() => onOpenChat()}
              className="px-4 py-2 rounded-2xl bg-emerald-600 text-white hover:bg-emerald-700 font-black text-xs flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Trò Chuyện Hỏi Đáp Bác Cú</span>
            </button>
          </div>

          <SocraticFeedback
            evaluation={evaluation}
            onOpenChat={onOpenChat}
            onAwardSeeds={onAwardSeeds}
            essayText={essay}
          />
        </div>
      )}

      {/* Socratic Outline Builder Modal */}
      <SocraticOutlineModal
        isOpen={isOutlineOpen}
        onClose={() => setIsOutlineOpen(false)}
        topic={topic}
        onApplyOutlineToEssay={(outlineText) => {
          setEssay(outlineText);
        }}
      />
    </div>
  );
};
