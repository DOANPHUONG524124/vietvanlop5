import React, { useState, useMemo } from 'react';
import { StudentRecord, GoogleSheetConfig, StudentStatus } from '../types/index.ts';
import {
  FileSpreadsheet,
  RefreshCw,
  Settings,
  Download,
  Search,
  ExternalLink,
  CheckCircle2,
  Clock,
  AlertCircle,
  Sparkles,
  BookOpen,
  MessageCircle,
  HeartHandshake,
  UserCheck,
  Filter,
  Plus,
  ArrowUpDown,
  Check,
  ChevronRight,
  HelpCircle,
  Edit3,
  Presentation,
  Code2,
  Copy
} from 'lucide-react';
import { exportClassRosterToCSV } from '../utils/googleSheetService.ts';
import { exportClassLessonPptx } from '../utils/pptxExport.ts';

interface ClassRosterManagerProps {
  students: StudentRecord[];
  config: GoogleSheetConfig;
  onUpdateConfig: (newConfig: GoogleSheetConfig) => void;
  onSyncRoster: () => Promise<void>;
  isSyncing: boolean;
  syncError: string | null;
  onSelectStudentForEvaluation: (student: StudentRecord) => void;
  onOpenSocraticChatForStudent: (student: StudentRecord) => void;
  onSelectStudentForParentReport: (student: StudentRecord) => void;
  onResetToDefault: () => void;
  onUpdateStudent: (updatedStudent: StudentRecord) => void;
  onOpenGoogleSheetModal?: () => void;
}

export const ClassRosterManager: React.FC<ClassRosterManagerProps> = ({
  students,
  config,
  onUpdateConfig,
  onSyncRoster,
  isSyncing,
  syncError,
  onSelectStudentForEvaluation,
  onOpenSocraticChatForStudent,
  onSelectStudentForParentReport,
  onResetToDefault,
  onUpdateStudent,
  onOpenGoogleSheetModal,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | StudentStatus>('all');
  const [sortBy, setSortBy] = useState<'stt' | 'name' | 'score_desc' | 'score_asc'>('stt');
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<StudentRecord | null>(null);
  const [isExportingPptx, setIsExportingPptx] = useState(false);
  const [isScriptModalOpen, setIsScriptModalOpen] = useState(false);
  const [scriptCopied, setScriptCopied] = useState(false);

  // Form state inside config modal
  const [tempSheetUrl, setTempSheetUrl] = useState(config.sheetUrl);
  const [tempSheetName, setTempSheetName] = useState(config.sheetName || '');
  const [tempClassName, setTempClassName] = useState(config.className || 'Lớp 5A');
  const [tempWebhookUrl, setTempWebhookUrl] = useState(config.webhookUrl || '');
  const [testResult, setTestResult] = useState<{
    success?: boolean;
    message?: string;
    columns?: string[];
    rows?: number;
    loading?: boolean;
    error?: string;
  } | null>(null);

  // Filtered & Sorted student list
  const filteredStudents = useMemo(() => {
    return students
      .filter((s) => {
        const matchesSearch =
          s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (s.code && s.code.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (s.topic && s.topic.toLowerCase().includes(searchTerm.toLowerCase()));

        const matchesStatus = statusFilter === 'all' ? true : s.status === statusFilter;
        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => {
        if (sortBy === 'stt') return a.stt - b.stt;
        if (sortBy === 'name') return a.name.localeCompare(b.name, 'vi');
        if (sortBy === 'score_desc') return (b.score ?? -1) - (a.score ?? -1);
        if (sortBy === 'score_asc') return (a.score ?? 99) - (b.score ?? 99);
        return 0;
      });
  }, [students, searchTerm, statusFilter, sortBy]);

  // Class Statistics
  const stats = useMemo(() => {
    const total = students.length;
    const submitted = students.filter((s) => s.status === 'submitted').length;
    const needsSupport = students.filter((s) => s.status === 'needs_support').length;
    const drafting = students.filter((s) => s.status === 'drafting').length;
    const notSubmitted = students.filter((s) => s.status === 'not_submitted').length;

    const scoredStudents = students.filter((s) => s.score !== undefined);
    const avgScore =
      scoredStudents.length > 0
        ? (scoredStudents.reduce((sum, s) => sum + (s.score || 0), 0) / scoredStudents.length).toFixed(1)
        : '0.0';

    return {
      total,
      submitted,
      needsSupport,
      drafting,
      notSubmitted,
      avgScore,
      submissionRate: total > 0 ? Math.round((submitted / total) * 100) : 0,
    };
  }, [students]);

  // Test Google Sheet connection
  const handleTestConnection = async () => {
    setTestResult({ loading: true });
    try {
      const res = await fetch('/api/sheets/test-connection', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sheetUrl: tempSheetUrl,
          sheetName: tempSheetName,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setTestResult({
          success: true,
          message: data.message || 'Kết nối thành công tới Google Sheet!',
          columns: data.columnsFound || [],
          rows: data.previewRowCount || 0,
        });
      } else {
        setTestResult({
          success: false,
          error: data.error || 'Không thể kết nối tới Google Sheet này.',
        });
      }
    } catch (err: any) {
      setTestResult({
        success: false,
        error: 'Lỗi kiểm tra: ' + (err.message || 'Không thể liên lạc với máy chủ.'),
      });
    }
  };

  const handleSaveConfig = () => {
    onUpdateConfig({
      ...config,
      sheetUrl: tempSheetUrl,
      sheetName: tempSheetName || undefined,
      className: tempClassName || 'Lớp 5A',
      webhookUrl: tempWebhookUrl || undefined,
    });
    setIsConfigModalOpen(false);
    onSyncRoster();
  };

  const handleOpenEditStudent = (student: StudentRecord) => {
    setEditingStudent({ ...student });
    setIsEditModalOpen(true);
  };

  const handleSaveStudentEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingStudent) {
      onUpdateStudent(editingStudent);
      setIsEditModalOpen(false);

      if (config.webhookUrl) {
        try {
          await fetch('/api/sheets/writeback', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              webhookUrl: config.webhookUrl,
              student: editingStudent,
              className: config.className,
            }),
          });
        } catch (err) {
          console.error('Error writing back to Google Sheet:', err);
        }
      }

      setEditingStudent(null);
    }
  };

  const handleExportPptx = async () => {
    setIsExportingPptx(true);
    try {
      await exportClassLessonPptx(config.className, students);
    } catch (e) {
      console.error(e);
    } finally {
      setIsExportingPptx(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner: Connection Status & Quick Actions */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-4">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-200/60 shadow-xs">
              <FileSpreadsheet className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-lg font-bold text-slate-900">{config.className}</h2>
                {config.sheetUrl.includes('1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms') ? (
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
                    Bảng mẫu thử nghiệm 5A
                  </span>
                ) : (
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                    Đã liên kết Google Sheet
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-2 flex-wrap">
                <span>
                  Đồng bộ lần cuối: {config.lastSyncedAt ? new Date(config.lastSyncedAt).toLocaleTimeString('vi-VN') : 'Vừa xong'}
                </span>
                <span>•</span>
                <a
                  href={config.sheetUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:text-indigo-800 font-medium inline-flex items-center gap-1 hover:underline"
                >
                  <span>Mở Google Sheet trực tuyến</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 flex-wrap w-full lg:w-auto">
            {onOpenGoogleSheetModal && (
              <button
                onClick={onOpenGoogleSheetModal}
                className="flex-1 lg:flex-none flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold text-xs shadow-xs transition-all cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Tải Từ Google Sheet</span>
              </button>
            )}

            <button
              onClick={() => onSyncRoster()}
              disabled={isSyncing}
              className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 active:scale-95 text-white font-bold text-xs shadow-xs transition-all disabled:opacity-50 cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>{isSyncing ? 'Đang đồng bộ...' : 'Đồng bộ lại'}</span>
            </button>

            <button
              onClick={() => {
                setTempSheetUrl(config.sheetUrl);
                setTempSheetName(config.sheetName || '');
                setTempClassName(config.className);
                setTestResult(null);
                setIsConfigModalOpen(true);
              }}
              className="flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs border border-slate-200 transition-colors cursor-pointer"
            >
              <Settings className="w-3.5 h-3.5 text-slate-600" />
              <span>Cấu hình Sheet</span>
            </button>

            <button
              onClick={handleExportPptx}
              disabled={isExportingPptx}
              className="flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 font-semibold text-xs border border-amber-200 transition-colors cursor-pointer disabled:opacity-50"
              title="Xuất slide PowerPoint (.pptx) trình chiếu tiết trả bài"
            >
              <Presentation className="w-3.5 h-3.5 text-amber-600" />
              <span>{isExportingPptx ? 'Đang tạo Slide...' : 'Slide Trả Bài (.pptx)'}</span>
            </button>

            <button
              onClick={() => setIsScriptModalOpen(true)}
              className="flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-900 font-semibold text-xs border border-teal-200 transition-colors cursor-pointer"
              title="Xem hướng dẫn và mã Apps Script để tự động ghi điểm về Google Sheet"
            >
              <Code2 className="w-3.5 h-3.5 text-teal-600" />
              <span>Mã Script Ghi Điểm</span>
            </button>

            <button
              onClick={() => exportClassRosterToCSV(students, config.className)}
              className="flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold text-xs border border-indigo-200 transition-colors cursor-pointer"
              title="Xuất danh sách ra file CSV mở được bằng Excel"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Xuất Excel/CSV</span>
            </button>
          </div>
        </div>

        {/* Sync error alert if any */}
        {syncError && (
          <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{syncError}</span>
            </div>
            <button
              onClick={onResetToDefault}
              className="px-2 py-1 rounded bg-rose-200 hover:bg-rose-300 text-rose-900 font-bold text-[11px]"
            >
              Dùng lại dữ liệu mẫu
            </button>
          </div>
        )}
      </div>

      {/* 4 Class Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Card 1: Sĩ số */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            Sĩ Số Học Sinh
          </span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-slate-900">{stats.total}</span>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              {stats.submissionRate}% nộp bài
            </span>
          </div>
          <p className="text-[11px] text-slate-500">Toàn bộ danh sách lớp</p>
        </div>

        {/* Card 2: Đã nộp bài */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            Đã Nộp Bài Làm
          </span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-emerald-600">{stats.submitted}</span>
            <span className="text-xs text-slate-500">/ {stats.total} HS</span>
          </div>
          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mt-1">
            <div
              className="bg-emerald-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${stats.submissionRate}%` }}
            />
          </div>
        </div>

        {/* Card 3: Điểm trung bình */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            Điểm Trung Bình Lớp
          </span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-indigo-600">
              {stats.avgScore}
              <span className="text-xs font-normal text-slate-400">/10</span>
            </span>
            <span className="text-xs font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full">
              5 Cột Trụ
            </span>
          </div>
          <p className="text-[11px] text-slate-500">Dựa trên các bài đã nộp</p>
        </div>

        {/* Card 4: Cần bồi dưỡng */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            Cần Bồi Dưỡng Socratic
          </span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-amber-600">{stats.needsSupport}</span>
            <span className="text-xs font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
              Cần gợi mở
            </span>
          </div>
          <p className="text-[11px] text-slate-500">Lỗi dấu câu / câu ghép / văn mẫu</p>
        </div>
      </div>

      {/* Filter, Search & Sort Bar */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm theo tên học sinh, mã HS hoặc đề tài bài văn..."
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-emerald-500 focus:bg-white transition-all"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            )}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 shrink-0">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-500" />
            <select
              value={sortBy}
              onChange={(e: any) => setSortBy(e.target.value)}
              className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-medium text-slate-700 focus:outline-hidden focus:border-emerald-500"
            >
              <option value="stt">Theo STT (1 → 32)</option>
              <option value="name">Theo Tên (A → Z)</option>
              <option value="score_desc">Điểm cao nhất</option>
              <option value="score_asc">Điểm thấp nhất</option>
            </select>
          </div>
        </div>

        {/* Status Filter Badges */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-3 py-1.5 rounded-full font-bold transition-all shrink-0 cursor-pointer ${
              statusFilter === 'all'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Tất cả ({stats.total})
          </button>
          <button
            onClick={() => setStatusFilter('submitted')}
            className={`px-3 py-1.5 rounded-full font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
              statusFilter === 'submitted'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Đã nộp bài ({stats.submitted})</span>
          </button>
          <button
            onClick={() => setStatusFilter('needs_support')}
            className={`px-3 py-1.5 rounded-full font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
              statusFilter === 'needs_support'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-amber-50 text-amber-900 hover:bg-amber-100 border border-amber-200'
            }`}
          >
            <AlertCircle className="w-3.5 h-3.5" />
            <span>Cần bồi dưỡng Socratic ({stats.needsSupport})</span>
          </button>
          <button
            onClick={() => setStatusFilter('drafting')}
            className={`px-3 py-1.5 rounded-full font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
              statusFilter === 'drafting'
                ? 'bg-sky-600 text-white shadow-xs'
                : 'bg-sky-50 text-sky-800 hover:bg-sky-100 border border-sky-200'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Đang viết ({stats.drafting})</span>
          </button>
          <button
            onClick={() => setStatusFilter('not_submitted')}
            className={`px-3 py-1.5 rounded-full font-bold transition-all shrink-0 cursor-pointer ${
              statusFilter === 'not_submitted'
                ? 'bg-slate-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Chưa nộp ({stats.notSubmitted})
          </button>
        </div>
      </div>

      {/* Student List Table & Cards */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-bold text-[11px] uppercase tracking-wider">
                <th className="py-3.5 px-4 w-12 text-center">STT</th>
                <th className="py-3.5 px-4 min-w-[180px]">Học Sinh</th>
                <th className="py-3.5 px-4 min-w-[200px]">Đề Tài Bài Văn</th>
                <th className="py-3.5 px-4 min-w-[130px] text-center">Trạng Thái</th>
                <th className="py-3.5 px-4 min-w-[100px] text-center">Điểm TB</th>
                <th className="py-3.5 px-4 min-w-[200px]">Ghi Chú Giáo Viên / Bác Cú</th>
                <th className="py-3.5 px-4 min-w-[180px] text-right">Thao Tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => {
                  const isSubmitted = student.status === 'submitted';
                  const isNeedsSupport = student.status === 'needs_support';
                  const isDrafting = student.status === 'drafting';

                  return (
                    <tr
                      key={student.id}
                      className="hover:bg-slate-50/80 transition-colors group"
                    >
                      {/* STT */}
                      <td className="py-4 px-4 text-center font-mono font-bold text-slate-400">
                        {student.stt}
                      </td>

                      {/* Họ tên & Mã HS */}
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2.5">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                              student.gender === 'Nữ'
                                ? 'bg-pink-100 text-pink-700'
                                : 'bg-blue-100 text-blue-700'
                            }`}
                          >
                            {student.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-bold text-slate-900 group-hover:text-emerald-800 transition-colors">
                              {student.name}
                            </div>
                            <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
                              <span>{student.code || `5A-${student.stt}`}</span>
                              <span>•</span>
                              <span>{student.gender || 'Nam'}</span>
                              {student.dob && <span>• {student.dob}</span>}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Đề tài bài văn */}
                      <td className="py-4 px-4">
                        <div className="text-xs font-medium text-slate-800 line-clamp-2 max-w-xs">
                          {student.topic || 'Chưa phân công đề tài'}
                        </div>
                        {student.essay && (
                          <div className="text-[10px] text-slate-400 mt-0.5 line-clamp-1 italic">
                            "{student.essay.slice(0, 50)}..."
                          </div>
                        )}
                      </td>

                      {/* Trạng thái */}
                      <td className="py-4 px-4 text-center">
                        {isSubmitted && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            Đã nộp bài
                          </span>
                        )}
                        {isNeedsSupport && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-100 text-amber-900 border border-amber-300 animate-pulse">
                            <AlertCircle className="w-3 h-3 text-amber-700" />
                            Cần bồi dưỡng
                          </span>
                        )}
                        {isDrafting && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-sky-100 text-sky-800 border border-sky-200">
                            <Clock className="w-3 h-3 text-sky-600" />
                            Đang viết
                          </span>
                        )}
                        {!isSubmitted && !isNeedsSupport && !isDrafting && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-100 text-slate-600">
                            Chưa nộp
                          </span>
                        )}
                      </td>

                      {/* Điểm số */}
                      <td className="py-4 px-4 text-center">
                        {student.score !== undefined ? (
                          <span
                            className={`inline-block font-black text-sm px-2.5 py-1 rounded-xl border ${
                              student.score >= 8.5
                                ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                                : student.score >= 7.0
                                ? 'bg-amber-50 text-amber-900 border-amber-200'
                                : 'bg-rose-50 text-rose-800 border-rose-200'
                            }`}
                          >
                            {student.score}
                          </span>
                        ) : (
                          <span className="text-slate-300 text-xs italic">--</span>
                        )}
                      </td>

                      {/* Ghi chú */}
                      <td className="py-4 px-4">
                        <div className="text-xs text-slate-600 line-clamp-2 max-w-xs">
                          {student.teacherNote || student.socraticAdvice || (
                            <span className="text-slate-400 italic">Chưa có ghi chú</span>
                          )}
                        </div>
                      </td>

                      {/* Nút thao tác */}
                      <td className="py-4 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* Chấm bài */}
                          <button
                            onClick={() => onSelectStudentForEvaluation(student)}
                            className="p-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 transition-colors cursor-pointer"
                            title="Đưa bài của học sinh này vào không gian luyện viết Socratic"
                          >
                            <BookOpen className="w-3.5 h-3.5" />
                          </button>

                          {/* Socratic chat */}
                          <button
                            onClick={() => onOpenSocraticChatForStudent(student)}
                            className="p-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 transition-colors cursor-pointer"
                            title="Hỏi Bác Cú Socratic cho học sinh này"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                          </button>

                          {/* Thư phụ huynh */}
                          <button
                            onClick={() => onSelectStudentForParentReport(student)}
                            className="p-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 transition-colors cursor-pointer"
                            title="Xem hoặc tạo thư gửi phụ huynh"
                          >
                            <HeartHandshake className="w-3.5 h-3.5" />
                          </button>

                          {/* Sửa nhanh */}
                          <button
                            onClick={() => handleOpenEditStudent(student)}
                            className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                            title="Chỉnh sửa điểm hoặc ghi chú"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400 text-sm">
                    Không tìm thấy học sinh nào phù hợp với bộ lọc.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal 1: Cấu hình kết nối Google Sheet */}
      {isConfigModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-7 shadow-2xl border border-slate-200 space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-emerald-100 text-emerald-800">
                  <FileSpreadsheet className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">
                    Kết Nối Database Google Sheet Lớp Học
                  </h3>
                  <p className="text-xs text-slate-500">
                    Đồng bộ danh sách học sinh trực tiếp từ bảng tính Google Drive
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsConfigModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center font-bold text-sm"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs sm:text-sm">
              {/* Tên lớp */}
              <div className="space-y-1">
                <label className="font-bold text-slate-700 block">Tên Lớp / Khối:</label>
                <input
                  type="text"
                  value={tempClassName}
                  onChange={(e) => setTempClassName(e.target.value)}
                  placeholder="Ví dụ: Lớp 5A - Năm học 2026-2027"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-emerald-500 focus:bg-white focus:outline-hidden"
                />
              </div>

              {/* Đường link Google Sheet */}
              <div className="space-y-1">
                <label className="font-bold text-slate-700 block">
                  Đường link Google Sheet (URL):
                </label>
                <input
                  type="text"
                  value={tempSheetUrl}
                  onChange={(e) => setTempSheetUrl(e.target.value)}
                  placeholder="https://docs.google.com/spreadsheets/d/.../edit"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-emerald-500 focus:bg-white focus:outline-hidden font-mono text-xs"
                />
                <p className="text-[11px] text-slate-500">
                  Hỗ trợ link Chia sẻ (Share) hoặc link trình duyệt của bảng tính Google Sheet.
                </p>
              </div>

              {/* Tên trang tính (Sheet Tab Name) */}
              <div className="space-y-1">
                <label className="font-bold text-slate-700 block">
                  Tên Tab Trang Tính (Sheet Name - Không bắt buộc):
                </label>
                <input
                  type="text"
                  value={tempSheetName}
                  onChange={(e) => setTempSheetName(e.target.value)}
                  placeholder="Để trống nếu muốn lấy tab đầu tiên (hoặc điền: Sheet1, Lop_5A...)"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-emerald-500 focus:bg-white focus:outline-hidden"
                />
              </div>

              {/* Webhook URL cho ghi điểm 2 chiều */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-slate-700 block">
                    Google Apps Script Webhook URL (Ghi điểm 2 chiều - Tùy chọn):
                  </label>
                  <button
                    type="button"
                    onClick={() => setIsScriptModalOpen(true)}
                    className="text-[11px] text-teal-700 hover:text-teal-900 font-bold underline"
                  >
                    Xem mã mẫu
                  </button>
                </div>
                <input
                  type="text"
                  value={tempWebhookUrl}
                  onChange={(e) => setTempWebhookUrl(e.target.value)}
                  placeholder="https://script.google.com/macros/s/.../exec"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-emerald-500 focus:bg-white focus:outline-hidden font-mono text-xs"
                />
                <p className="text-[11px] text-slate-500">
                  Dán URL Web App để khi chấm bài xong, điểm và lời dặn sẽ tự động ghi thẳng vào Google Sheet của thầy/cô.
                </p>
              </div>

              {/* Test connection button */}
              <div className="flex items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={handleTestConnection}
                  disabled={testResult?.loading}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center gap-1.5 transition-colors disabled:opacity-50"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${testResult?.loading ? 'animate-spin' : ''}`} />
                  <span>{testResult?.loading ? 'Đang kiểm tra...' : 'Kiểm tra kết nối'}</span>
                </button>
              </div>

              {/* Test result display */}
              {testResult && (
                <div
                  className={`p-3 rounded-2xl border text-xs ${
                    testResult.success
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                      : 'bg-rose-50 border-rose-200 text-rose-900'
                  }`}
                >
                  {testResult.success ? (
                    <div className="space-y-1">
                      <div className="font-bold flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>{testResult.message}</span>
                      </div>
                      <p className="text-[11px] opacity-80">
                        Cột nhận diện: {testResult.columns?.join(', ') || 'Tự động phát hiện'}
                      </p>
                    </div>
                  ) : (
                    <div className="flex items-start gap-1.5">
                      <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                      <span>{testResult.error}</span>
                    </div>
                  )}
                </div>
              )}

              {/* 3 Step Guidance Box */}
              <div className="p-3.5 rounded-2xl bg-indigo-50/60 border border-indigo-100 text-indigo-950 space-y-2">
                <h4 className="font-bold text-xs flex items-center gap-1.5 text-indigo-900">
                  <HelpCircle className="w-4 h-4 text-indigo-600" />
                  <span>3 Bước chia sẻ Google Sheet nhanh:</span>
                </h4>
                <ol className="list-decimal list-inside space-y-1 text-[11px] leading-relaxed text-indigo-900/90">
                  <li>
                    Tạo bảng tính với các cột: <b>STT</b>, <b>Họ và tên</b>, <b>Giới tính</b>, <b>Trạng thái</b>, <b>Điểm số</b>, <b>Đề tài</b>.
                  </li>
                  <li>
                    Bấm nút <b>Chia sẻ</b> (góc trên bên phải) → Chọn quyền truy cập: <b>Bất kỳ ai có đường liên kết đều có thể xem</b> (Viewer).
                  </li>
                  <li>Dán đường link vào ô trên và bấm <b>Lưu & Đồng Bộ Ngay</b>.</li>
                </ol>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => {
                  onResetToDefault();
                  setIsConfigModalOpen(false);
                }}
                className="text-xs text-slate-500 hover:text-slate-800 font-semibold"
              >
                Đặt lại bảng mẫu Lớp 5A
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsConfigModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Hủy
                </button>
                <button
                  type="button"
                  onClick={handleSaveConfig}
                  className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-xs"
                >
                  Lưu & Đồng Bộ Ngay
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal 2: Chỉnh sửa nhanh thông tin học sinh */}
      {isEditModalOpen && editingStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-base">
                Cập Nhật Học Sinh: {editingStudent.name}
              </h3>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center font-bold text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveStudentEdit} className="space-y-3.5 text-xs sm:text-sm">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Trạng thái:</label>
                <select
                  value={editingStudent.status}
                  onChange={(e) =>
                    setEditingStudent({ ...editingStudent, status: e.target.value as StudentStatus })
                  }
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                >
                  <option value="submitted">Đã nộp bài</option>
                  <option value="needs_support">Cần bồi dưỡng Socratic</option>
                  <option value="drafting">Đang viết</option>
                  <option value="not_submitted">Chưa nộp bài</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Điểm tổng kết (thang 10):</label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="10"
                  value={editingStudent.score ?? ''}
                  onChange={(e) =>
                    setEditingStudent({
                      ...editingStudent,
                      score: e.target.value ? parseFloat(e.target.value) : undefined,
                    })
                  }
                  placeholder="Ví dụ: 8.5"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Đề tài bài viết:</label>
                <input
                  type="text"
                  value={editingStudent.topic || ''}
                  onChange={(e) =>
                    setEditingStudent({ ...editingStudent, topic: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Ghi chú của giáo viên:</label>
                <textarea
                  rows={3}
                  value={editingStudent.teacherNote || ''}
                  onChange={(e) =>
                    setEditingStudent({ ...editingStudent, teacherNote: e.target.value })
                  }
                  placeholder="Nhận xét về lỗi ngữ pháp, từ láy hoặc ưu điểm..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs"
                >
                  Lưu thay đổi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal 3: Hướng Dẫn & Mã Google Apps Script Ghi Điểm Tự Động */}
      {isScriptModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-7 shadow-2xl border border-teal-200 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-teal-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-teal-100 text-teal-800">
                  <Code2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">
                    Mã Google Apps Script Ghi Điểm 2 Chiều
                  </h3>
                  <p className="text-xs text-slate-500">
                    Tự động cập nhật điểm số và nhận xét thẳng vào file Google Sheet của giáo viên
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsScriptModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center font-bold text-sm"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs sm:text-sm">
              <p className="text-slate-700 leading-relaxed">
                Để ứng dụng có thể <b>tự động ghi điểm và lời dặn</b> vào đúng hàng của từng học sinh trên Google Sheet khi chấm bài, thầy/cô thực hiện 3 bước sau:
              </p>

              <ol className="list-decimal list-inside space-y-1.5 text-xs text-slate-600 bg-slate-50 p-3.5 rounded-2xl border border-slate-200 leading-relaxed">
                <li>Mở file Google Sheet danh sách lớp học của bạn trên Google Drive.</li>
                <li>Vào menu <b>Tiện ích mở rộng</b> (Extensions) → chọn <b>Apps Script</b>.</li>
                <li>Xóa toàn bộ mã cũ và dán đoạn mã bên dưới vào.</li>
                <li>Bấm nút <b>Triển khai</b> (Deploy) → <b>Tùy chọn triển khai mới</b> (New deployment) → Loại: <b>Ứng dụng web</b> (Web app).</li>
                <li>Mục *Ai có quyền truy cập* (Who has access): chọn <b>Bất kỳ ai</b> (Anyone) → Bấm <b>Triển khai</b>.</li>
                <li>Sao chép <b>URL ứng dụng web</b> nhận được và dán vào ô <i>Google Apps Script Webhook URL</i> trong cài đặt của app.</li>
              </ol>

              {/* Code block */}
              <div className="relative">
                <div className="flex items-center justify-between px-3 py-1.5 bg-slate-800 text-slate-300 rounded-t-xl text-[11px] font-mono">
                  <span>Code.gs (Google Apps Script)</span>
                  <button
                    onClick={() => {
                      const code = `function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var values = sheet.getDataRange().getValues();
    
    // Tìm hàng của học sinh theo tên hoặc STT
    for (var i = 1; i < values.length; i++) {
      var rowName = values[i][1]; // Cột B: Họ và tên
      var rowStt = values[i][0];  // Cột A: STT
      
      if (rowName == data.name || rowStt == data.stt) {
        // Cập nhật Cột F (Trạng thái), Cột G (Điểm), Cột I (Ghi chú)
        sheet.getRange(i + 1, 6).setValue("Đã nộp bài");
        if (data.score !== undefined) {
          sheet.getRange(i + 1, 7).setValue(data.score);
        }
        if (data.teacherNote) {
          sheet.getRange(i + 1, 9).setValue(data.teacherNote);
        }
        break;
      }
    }
    return ContentService.createTextOutput(JSON.stringify({status: "ok"})).setMimeType(ContentService.MimeType.JSON);
  } catch(err) {
    return ContentService.createTextOutput(JSON.stringify({error: err.toString()})).setMimeType(ContentService.MimeType.JSON);
  }
}`;
                      navigator.clipboard.writeText(code);
                      setScriptCopied(true);
                      setTimeout(() => setScriptCopied(false), 2000);
                    }}
                    className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-bold"
                  >
                    {scriptCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Đã sao chép!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Sao chép mã</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-3.5 bg-slate-900 text-emerald-300 rounded-b-xl text-xs font-mono overflow-x-auto leading-relaxed border border-slate-800">
{`function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var values = sheet.getDataRange().getValues();
    
    // Tìm hàng của học sinh theo tên hoặc STT
    for (var i = 1; i < values.length; i++) {
      var rowName = values[i][1]; // Cột B: Họ và tên
      var rowStt = values[i][0];  // Cột A: STT
      
      if (rowName == data.name || rowStt == data.stt) {
        // Cập nhật Cột F (Trạng thái), Cột G (Điểm), Cột I (Ghi chú)
        sheet.getRange(i + 1, 6).setValue("Đã nộp bài");
        if (data.score !== undefined) {
          sheet.getRange(i + 1, 7).setValue(data.score);
        }
        if (data.teacherNote) {
          sheet.getRange(i + 1, 9).setValue(data.teacherNote);
        }
        break;
      }
    }
    return ContentService.createTextOutput(JSON.stringify({status: "ok"})).setMimeType(ContentService.MimeType.JSON);
  } catch(err) {
    return ContentService.createTextOutput(JSON.stringify({error: err.toString()})).setMimeType(ContentService.MimeType.JSON);
  }
}`}
                </pre>
              </div>
            </div>

            <div className="flex items-center justify-end pt-2 border-t border-teal-100">
              <button
                type="button"
                onClick={() => setIsScriptModalOpen(false)}
                className="px-5 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs"
              >
                Đã hiểu & Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
