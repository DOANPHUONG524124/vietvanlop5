/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header, ActiveTab } from './components/Header.tsx';
import { StudentWorkspace, EvaluationStepInfo } from './components/StudentWorkspace.tsx';
import { NestTreehouse } from './components/NestTreehouse.tsx';
import { TeacherDashboard } from './components/TeacherDashboard.tsx';
import { ParentReport } from './components/ParentReport.tsx';
import { SocraticChatModal } from './components/SocraticChatModal.tsx';
import { ApiKeyModal } from './components/ApiKeyModal.tsx';
import { GoogleSheetImportModal } from './components/GoogleSheetImportModal.tsx';
import { StudentLoginModal } from './components/StudentLoginModal.tsx';
import { VocabularyModal } from './components/VocabularyModal.tsx';
import { ExportDatabaseModal } from './components/ExportDatabaseModal.tsx';
import {
  EvaluationResult,
  StudentRecord,
  GoogleSheetConfig,
  StudentProfile,
  EssaySubmission
} from './types/index.ts';
import { DEFAULT_STUDENTS, DEFAULT_SHEET_CONFIG, fetchClassRosterDirect } from './utils/googleSheetService.ts';
import { stopSpeaking, playRewardChime } from './utils/audio.ts';
import { getStoredApiKey, evaluateEssayWithClientFallback } from './utils/geminiClient.ts';
import confetti from 'canvas-confetti';
import { MessageCircle, AlertCircle } from 'lucide-react';
import { OwlAvatar } from './components/OwlAvatar.tsx';

// Initial default submissions to showcase database export immediately
const INITIAL_SUBMISSIONS: EssaySubmission[] = [
  {
    id: 'sub-01',
    studentId: 'HS5A-01',
    studentName: 'Nguyễn Hoàng Minh',
    className: '5A1',
    avatarIcon: '🦉',
    topic: 'Tả cây phượng vĩ già trên sân trường em vào một ngày đầu hạ',
    essay: `Giữa sân trường em sừng sững một cây phượng vĩ già, người bạn lớn đã chứng kiến biết bao mùa tựu trường của chúng em...`,
    wordCount: 165,
    submittedAt: '08/11/2026, 08:30:15',
    score: 8.8,
    pointsEarned: 60,
    owlFeedbackSummary: 'Văn phong sinh động, dùng nhiều từ láy và hình ảnh so sánh đẹp mắt.',
  },
  {
    id: 'sub-02',
    studentId: 'HS5A-02',
    studentName: 'Trần Mai Anh',
    className: '5A1',
    avatarIcon: '🐱',
    topic: 'Tả chú mèo mướp ngộ nghĩnh của gia đình em',
    essay: `Nhà em có nuôi một chú mèo mướp rất đẹp. Chú tên là Miu Miu...`,
    wordCount: 142,
    submittedAt: '08/11/2026, 09:15:20',
    score: 7.5,
    pointsEarned: 55,
    owlFeedbackSummary: 'Bài viết mộc mạc, miêu tả chi tiết đôi mắt và bước đi rón rén.',
  },
  {
    id: 'sub-03',
    studentId: 'HS5A-03',
    studentName: 'Lê Bảo Ngọc',
    className: '5A1',
    avatarIcon: '🐰',
    topic: 'Tả người mẹ thân yêu đang nấu bữa cơm chiều',
    essay: `Mỗi buổi chiều đi học về, hình ảnh đầu tiên em nhìn thấy là bóng dáng mẹ đang tất bật trong gian bếp ấm cúng...`,
    wordCount: 178,
    submittedAt: '08/11/2026, 10:45:00',
    score: 9.0,
    pointsEarned: 65,
    owlFeedbackSummary: 'Dạt dào tình cảm, sử dụng xuất sắc biện pháp so sánh và câu ghép tăng tiến.',
  },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('student');
  const [seeds, setSeeds] = useState<number>(() => {
    const saved = localStorage.getItem('owl_wisdom_seeds');
    return saved ? parseInt(saved, 10) : 50; // Khởi đầu 50 hạt giống cho bé
  });

  // Student Profile Login State
  const [studentProfile, setStudentProfile] = useState<StudentProfile | null>(() => {
    try {
      const saved = localStorage.getItem('owl_logged_in_student');
      if (saved) return JSON.parse(saved);
    } catch {}
    // Default starter profile
    return {
      id: 'student-demo',
      name: 'Nguyễn Minh Khôi',
      className: '5A1',
      avatarId: 'owl',
      avatarIcon: '🦉',
      avatarName: 'Cú Mèo Tri Thức',
      totalPoints: 50,
      submittedCount: 0,
      badge: 'Nhà Thám Hiểm Nhí',
      createdAt: new Date().toISOString(),
    };
  });

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isVocabModalOpen, setIsVocabModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  // Submissions Database
  const [submissions, setSubmissions] = useState<EssaySubmission[]>(() => {
    try {
      const saved = localStorage.getItem('owl_essay_submissions');
      return saved ? JSON.parse(saved) : INITIAL_SUBMISSIONS;
    } catch {
      return INITIAL_SUBMISSIONS;
    }
  });

  const [evaluation, setEvaluation] = useState<EvaluationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [evalError, setEvalError] = useState<string | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Gemini API Key & Modal State (AI_INSTRUCTIONS.md)
  const [apiKey, setApiKey] = useState<string>(() => getStoredApiKey());
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState<boolean>(() => !getStoredApiKey());

  // 3-Step Evaluation State & Fallback Tracker (AI_INSTRUCTIONS.md)
  const [evaluationSteps, setEvaluationSteps] = useState<EvaluationStepInfo[] | undefined>(undefined);
  const [fallbackNotice, setFallbackNotice] = useState<{ from: string; to: string; reason: string } | null>(null);
  const [rawApiError, setRawApiError] = useState<string | null>(null);

  // Google Sheet Class Roster state
  const [students, setStudents] = useState<StudentRecord[]>(() => {
    try {
      const saved = localStorage.getItem('owl_class_students');
      return saved ? JSON.parse(saved) : DEFAULT_STUDENTS;
    } catch {
      return DEFAULT_STUDENTS;
    }
  });

  const [sheetConfig, setSheetConfig] = useState<GoogleSheetConfig>(() => {
    try {
      const saved = localStorage.getItem('owl_sheet_config');
      return saved ? JSON.parse(saved) : DEFAULT_SHEET_CONFIG;
    } catch {
      return DEFAULT_SHEET_CONFIG;
    }
  });

  const [currentStudent, setCurrentStudent] = useState<StudentRecord | null>(() => {
    return DEFAULT_STUDENTS[0] || null;
  });

  const [isSyncing, setIsSyncing] = useState(false);
  const [syncError, setSyncError] = useState<string | null>(null);
  const [isGoogleSheetModalOpen, setIsGoogleSheetModalOpen] = useState(false);

  // Socratic Chat Modal state
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInitialPrompt, setChatInitialPrompt] = useState<string | undefined>(undefined);
  const [currentEssayText, setCurrentEssayText] = useState('');
  const [currentTopic, setCurrentTopic] = useState('Tả cây phượng vĩ già trên sân trường em vào một ngày đầu hạ');

  // Persist seeds
  useEffect(() => {
    localStorage.setItem('owl_wisdom_seeds', seeds.toString());
  }, [seeds]);

  // Persist studentProfile
  useEffect(() => {
    if (studentProfile) {
      try {
        localStorage.setItem('owl_logged_in_student', JSON.stringify(studentProfile));
      } catch (e) {
        console.error('Error saving profile:', e);
      }
    }
  }, [studentProfile]);

  // Persist submissions
  useEffect(() => {
    try {
      localStorage.setItem('owl_essay_submissions', JSON.stringify(submissions));
    } catch (e) {
      console.error('Error saving submissions:', e);
    }
  }, [submissions]);

  // Persist students
  useEffect(() => {
    try {
      localStorage.setItem('owl_class_students', JSON.stringify(students));
    } catch (e) {
      console.error('Error saving students to localStorage:', e);
    }
  }, [students]);

  // Persist sheetConfig
  useEffect(() => {
    try {
      localStorage.setItem('owl_sheet_config', JSON.stringify(sheetConfig));
    } catch (e) {
      console.error('Error saving sheetConfig to localStorage:', e);
    }
  }, [sheetConfig]);

  const handleAwardSeeds = (amount: number) => {
    setSeeds((prev) => prev + amount);
    if (studentProfile) {
      setStudentProfile((prev) =>
        prev ? { ...prev, totalPoints: prev.totalPoints + amount } : prev
      );
    }
  };

  const handleStopSpeech = () => {
    stopSpeaking();
    setIsSpeaking(false);
  };

  const handleOpenChat = (prompt?: string) => {
    setChatInitialPrompt(prompt);
    setIsChatOpen(true);
  };

  const handleInsertWordFromVocab = (wordText: string) => {
    setCurrentEssayText((prev) => (prev ? `${prev} ${wordText}` : wordText));
  };

  // Sync class roster from Google Sheet
  const handleSyncRoster = async () => {
    setIsSyncing(true);
    setSyncError(null);
    try {
      const data = await fetchClassRosterDirect(sheetConfig.sheetUrl, sheetConfig.sheetName);

      if (data.students && Array.isArray(data.students) && data.students.length > 0) {
        setStudents(data.students);
        setSheetConfig((prev) => ({
          ...prev,
          lastSyncedAt: data.lastSyncedAt || new Date().toISOString(),
          className: data.className || prev.className,
        }));
        if (!currentStudent || !data.students.some((s: StudentRecord) => s.id === currentStudent.id)) {
          setCurrentStudent(data.students[0]);
        }
      } else {
        throw new Error('Bảng tính không chứa dữ liệu học sinh hợp lệ.');
      }
    } catch (err: any) {
      console.error('Sync roster error:', err);
      setSyncError(err.message || 'Lỗi kết nối khi đồng bộ từ Google Sheet.');
    } finally {
      setIsSyncing(false);
    }
  };

  const handleGoogleSheetImportSuccess = (newStudents: StudentRecord[], updatedConfig: GoogleSheetConfig) => {
    setStudents(newStudents);
    setSheetConfig(updatedConfig);
    if (newStudents.length > 0) {
      setCurrentStudent(newStudents[0]);
      if (newStudents[0].topic) setCurrentTopic(newStudents[0].topic);
      if (newStudents[0].essay) setCurrentEssayText(newStudents[0].essay);
    }
    setSyncError(null);
  };

  const handleResetToDefault = () => {
    setStudents(DEFAULT_STUDENTS);
    setSheetConfig(DEFAULT_SHEET_CONFIG);
    setCurrentStudent(DEFAULT_STUDENTS[0]);
    localStorage.removeItem('owl_class_students');
    localStorage.removeItem('owl_sheet_config');
    setSyncError(null);
  };

  const handleUpdateStudent = (updatedStudent: StudentRecord) => {
    setStudents((prev) => prev.map((s) => (s.id === updatedStudent.id ? updatedStudent : s)));
    if (currentStudent?.id === updatedStudent.id) {
      setCurrentStudent(updatedStudent);
    }
  };

  const handleSelectStudentForEvaluation = (student: StudentRecord) => {
    setCurrentStudent(student);
    if (student.topic) setCurrentTopic(student.topic);
    if (student.essay) setCurrentEssayText(student.essay);
    setActiveTab('student');
  };

  const handleOpenSocraticChatForStudent = (student: StudentRecord) => {
    setCurrentStudent(student);
    handleOpenChat(
      `Bác Cú ơi, em là ${student.name}. Bài văn của em về chủ đề "${student.topic || 'Tập làm văn'}" đang cần Bác Cú gợi mở giúp em hoàn thiện hay hơn!`
    );
  };

  const handleSelectStudentForParentReport = (student: StudentRecord) => {
    setCurrentStudent(student);
    setActiveTab('parent');
  };

  /**
   * Đánh giá bài văn với cơ chế Fallback qua Gemini Client trực tiếp
   * Tặng điểm thưởng ngay lập tức và ghi vào cơ sở dữ liệu bài nộp!
   */
  const handleEvaluate = async (essay: string, topic: string, imageBase64?: string) => {
    // 1. Kiểm tra API Key
    const currentKey = getStoredApiKey();
    if (!currentKey) {
      setIsApiKeyModalOpen(true);
      return;
    }

    setIsLoading(true);
    setEvalError(null);
    setRawApiError(null);
    setFallbackNotice(null);
    setCurrentEssayText(essay);
    setCurrentTopic(topic);

    // Khởi tạo trạng thái 3 bước
    setEvaluationSteps([
      { step: 1, name: 'Bước 1: Phân tích số liệu sơ bộ (Từ láy, câu ghép, văn mẫu)', status: 'running' },
      { step: 2, name: 'Bước 2: Đánh giá Socratic 5 Cột Trụ (Gemini AI)', status: 'idle' },
      { step: 3, name: 'Bước 3: Tổng hợp Thư phụ huynh & Minigame củng cố', status: 'idle' },
    ]);

    try {
      const result = await evaluateEssayWithClientFallback(essay, topic, imageBase64, {
        onStepChange: (step, status, message) => {
          setEvaluationSteps((prev) =>
            (prev || []).map((s) => (s.step === step ? { ...s, status, message } : s))
          );
        },
        onModelFallback: (fromModel, toModel, reason) => {
          setFallbackNotice({ from: fromModel, to: toModel, reason });
        },
      });

      setEvaluation(result.data);

      // TẶNG ĐIỂM THƯỞNG: +50 Điểm nộp bài + Điểm Cú Mèo thưởng
      const bonusFromOwl = result.data.phan_hoi_hoc_sinh?.loi_chuc_va_hat_giong?.so_hat_giong_tang || 10;
      const totalPointsEarned = 50 + bonusFromOwl;
      handleAwardSeeds(totalPointsEarned);

      // Cập nhật Profile học sinh
      const activeName = studentProfile?.name || currentStudent?.name || 'Học Sinh Lớp 5';
      const activeClass = studentProfile?.className || currentStudent?.code || '5A1';
      const activeAvatar = studentProfile?.avatarIcon || '🦉';

      if (studentProfile) {
        setStudentProfile((prev) =>
          prev
            ? {
                ...prev,
                submittedCount: prev.submittedCount + 1,
                totalPoints: prev.totalPoints + totalPointsEarned,
              }
            : prev
        );
      }

      // GHI BÀN GHI MỚI VÀO DATABASE BÀI NỘP
      const overallScore = result.data.teacher_dashboard?.diem_so?.tong_ket || 8.5;
      const newSubmission: EssaySubmission = {
        id: `sub-${Date.now()}`,
        studentId: studentProfile?.id || currentStudent?.id || `hs-${Date.now()}`,
        studentName: activeName,
        className: activeClass,
        avatarIcon: activeAvatar,
        topic,
        essay,
        wordCount: essay.trim().split(/\s+/).filter(Boolean).length,
        submittedAt: new Date().toLocaleString('vi-VN'),
        score: overallScore,
        pointsEarned: totalPointsEarned,
        owlFeedbackSummary:
          result.data.phan_hoi_hoc_sinh?.diem_sang?.tieu_de || 'Bài văn giàu cảm xúc và hình ảnh đẹp',
        teacherNote: result.data.teacher_dashboard?.lo_hong_kien_thuc?.[0],
        scores: result.data.teacher_dashboard?.diem_so,
      };

      setSubmissions((prev) => [newSubmission, ...prev]);

      // Update current student record if exists in class roster
      if (currentStudent) {
        const updated: StudentRecord = {
          ...currentStudent,
          status: 'submitted',
          score: overallScore,
          scores: result.data.teacher_dashboard?.diem_so,
          topic,
          essay,
          teacherNote: result.data.teacher_dashboard?.lo_hong_kien_thuc?.[0] || 'Đã hoàn thành đánh giá Socratic',
          socraticAdvice: result.data.phan_hoi_hoc_sinh?.goc_goi_mo?.cau_hoi_socratic?.[0] || '',
          lastSubmittedDate: new Date().toLocaleDateString('vi-VN'),
        };
        handleUpdateStudent(updated);

        // Auto writeback to Google Sheet if Webhook URL is configured
        if (sheetConfig.webhookUrl) {
          fetch('/api/sheets/writeback', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              webhookUrl: sheetConfig.webhookUrl,
              student: updated,
              className: sheetConfig.className,
            }),
          }).catch(console.error);
        }
      }

      // Celebration: Sound & Confetti
      playRewardChime();
      try {
        confetti({
          particleCount: 90,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch (e) {}
    } catch (err: any) {
      console.error('Đánh giá bài văn thất bại:', err);
      const rawMsg = err?.message || String(err) || 'Lỗi không xác định khi gọi Gemini API.';

      // Chuyển tất cả các bước chưa xong thành "Đã dừng do lỗi" (AI_INSTRUCTIONS.md)
      setEvaluationSteps((prev) =>
        (prev || []).map((s) =>
          s.status === 'running' || s.status === 'idle'
            ? { ...s, status: 'stopped', message: 'Đã dừng do lỗi' }
            : s
        )
      );

      setRawApiError(rawMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7FBF6] text-slate-900 flex flex-col font-sans selection:bg-amber-200 selection:text-amber-950">
      {/* Top Header Navigation */}
      <Header
        activeTab={activeTab}
        onSelectTab={(tab) => {
          handleStopSpeech();
          setActiveTab(tab);
        }}
        seeds={seeds}
        isSpeaking={isSpeaking}
        onStopSpeech={handleStopSpeech}
        studentCount={students.length}
        classNameStr={sheetConfig.className}
        hasApiKey={Boolean(apiKey)}
        onOpenApiKeySettings={() => setIsApiKeyModalOpen(true)}
        onOpenGoogleSheetModal={() => setIsGoogleSheetModalOpen(true)}
        studentProfile={studentProfile}
        onOpenLoginModal={() => setIsLoginModalOpen(true)}
        onOpenVocabModal={() => setIsVocabModalOpen(true)}
        onOpenExportModal={() => setIsExportModalOpen(true)}
      />

      {/* Main View Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {evalError && (
          <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-sm flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
              <span>{evalError}</span>
            </div>
            <button
              onClick={() => setEvalError(null)}
              className="text-xs font-bold text-rose-700 hover:text-rose-900 px-2 py-1 cursor-pointer"
            >
              Đóng
            </button>
          </div>
        )}

        {activeTab === 'student' && (
          <StudentWorkspace
            evaluation={evaluation}
            onEvaluate={handleEvaluate}
            isLoading={isLoading}
            onOpenChat={handleOpenChat}
            onAwardSeeds={handleAwardSeeds}
            students={students}
            currentStudent={currentStudent}
            onSelectStudent={setCurrentStudent}
            evaluationSteps={evaluationSteps}
            fallbackNotice={fallbackNotice}
            rawApiError={rawApiError}
            onOpenApiKeySettings={() => setIsApiKeyModalOpen(true)}
            onOpenGoogleSheetModal={() => setIsGoogleSheetModalOpen(true)}
            studentProfile={studentProfile}
            onOpenLoginModal={() => setIsLoginModalOpen(true)}
            onOpenVocabModal={() => setIsVocabModalOpen(true)}
          />
        )}

        {activeTab === 'nest' && (
          <NestTreehouse seeds={seeds} onAwardSeeds={handleAwardSeeds} />
        )}

        {activeTab === 'teacher' && (
          <TeacherDashboard
            evaluation={evaluation}
            students={students}
            config={sheetConfig}
            onUpdateConfig={setSheetConfig}
            onSyncRoster={handleSyncRoster}
            isSyncing={isSyncing}
            syncError={syncError}
            onSelectStudentForEvaluation={handleSelectStudentForEvaluation}
            onOpenSocraticChatForStudent={handleOpenSocraticChatForStudent}
            onSelectStudentForParentReport={handleSelectStudentForParentReport}
            onResetToDefault={handleResetToDefault}
            onUpdateStudent={handleUpdateStudent}
            onOpenGoogleSheetModal={() => setIsGoogleSheetModalOpen(true)}
            onOpenExportModal={() => setIsExportModalOpen(true)}
          />
        )}

        {activeTab === 'parent' && (
          <ParentReport evaluation={evaluation} student={currentStudent} />
        )}
      </main>

      {/* Persistent Floating Socratic Chat Trigger */}
      <div className="fixed bottom-6 right-6 z-30">
        <button
          onClick={() => handleOpenChat()}
          aria-label="Mở hộp thoại trò chuyện cùng Bác Cú Thông Thái"
          className="group flex items-center gap-3 px-5 py-3 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-black text-sm shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all border-2 border-amber-300 cursor-pointer"
        >
          <OwlAvatar size="sm" mood="mentoring" />
          <span className="hidden sm:inline">Hỏi Bác Cú Socratic</span>
          <span className="p-1 rounded-full bg-white/20 group-hover:bg-white/30">
            <MessageCircle className="w-4 h-4 text-amber-300" />
          </span>
        </button>
      </div>

      {/* Socratic Chat Modal with Vietnamese Voice */}
      <SocraticChatModal
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        essayContext={currentEssayText}
        topic={currentTopic}
        initialPrompt={chatInitialPrompt}
        onOpenApiKeyModal={() => setIsApiKeyModalOpen(true)}
      />

      {/* Student Login & Profile Modal */}
      <StudentLoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        currentProfile={studentProfile}
        onSaveProfile={(newProf) => {
          setStudentProfile(newProf);
        }}
        canCloseWithoutSaving={Boolean(studentProfile)}
      />

      {/* Grade 5 Vocabulary & Rhetorical Device Bank Modal */}
      <VocabularyModal
        isOpen={isVocabModalOpen}
        onClose={() => setIsVocabModalOpen(false)}
        currentTopic={currentTopic}
        onInsertWord={handleInsertWordFromVocab}
      />

      {/* Database Export & Statistics Modal */}
      <ExportDatabaseModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        submissions={submissions}
        classNameDefault={studentProfile?.className || sheetConfig.className || 'Lớp 5A1'}
      />

      {/* Google Sheet Import Modal */}
      <GoogleSheetImportModal
        isOpen={isGoogleSheetModalOpen}
        onClose={() => setIsGoogleSheetModalOpen(false)}
        config={sheetConfig}
        onImportSuccess={handleGoogleSheetImportSuccess}
      />

      {/* Gemini API Key & Model Settings Modal (AI_INSTRUCTIONS.md) */}
      <ApiKeyModal
        isOpen={isApiKeyModalOpen}
        onClose={() => setIsApiKeyModalOpen(false)}
        onSaved={(newKey) => {
          setApiKey(newKey);
        }}
        isRequired={!apiKey}
      />

      {/* Educational Footer */}
      <footer className="border-t-2 border-emerald-100 bg-white/80 py-6 mt-12 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 font-bold text-emerald-950">
            <span>🦉 Bác Cú Thông Thái</span>
            <span>•</span>
            <span className="text-emerald-700 font-semibold">Rừng Tri Thức Tiếng Việt Lớp 5</span>
          </div>
          <p className="text-slate-600">
            Ứng dụng luyện viết văn Socratic tương tác • Tự tin sáng tạo ngôn từ theo chương trình GDPT Tiểu học
          </p>
        </div>
      </footer>
    </div>
  );
}
