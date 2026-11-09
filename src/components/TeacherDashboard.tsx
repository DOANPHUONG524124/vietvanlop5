import React, { useState, useMemo } from 'react';
import { TeacherDashboardData, EvaluationResult, StudentRecord, GoogleSheetConfig, PillarScores } from '../types/index.ts';
import { ClassRosterManager } from './ClassRosterManager.tsx';
import { RadarChart5Pillars } from './RadarChart5Pillars.tsx';
import { ClassScoreDistributionChart } from './ClassScoreDistributionChart.tsx';
import { exportStudentEvaluationToDocx } from '../utils/docxExport.ts';
import { exportClassLessonPptx } from '../utils/pptxExport.ts';
import {
  GraduationCap,
  ShieldCheck,
  AlertTriangle,
  Code2,
  Copy,
  Check,
  TrendingUp,
  BookOpen,
  Award,
  Layers,
  FileSpreadsheet,
  CheckCircle2,
  AlertCircle,
  FileText,
  Presentation,
  Download
} from 'lucide-react';

interface TeacherDashboardProps {
  evaluation: EvaluationResult | null;
  onSelectSampleStudent?: (id: string) => void;
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
  onOpenExportModal?: () => void;
}

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({
  evaluation,
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
  onOpenExportModal,
}) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'metrics' | 'class' | 'json'>('class');
  const [isExportingDocx, setIsExportingDocx] = useState(false);
  const [isExportingPptx, setIsExportingPptx] = useState(false);

  // Compute class average 5 pillars for radar comparison
  const classAvgScores: PillarScores | undefined = useMemo(() => {
    const scored = students.filter((s) => s.score !== undefined);
    if (scored.length === 0) return undefined;
    const avg = (key: keyof PillarScores) => {
      const vals = scored.map((s) => (s.scores ? s.scores[key] : (s.score ?? 8.0)));
      return vals.reduce((a, b) => a + b, 0) / vals.length;
    };
    return {
      bo_cuc: avg('bo_cuc'),
      von_tu: avg('von_tu'),
      ngu_phap: avg('ngu_phap'),
      cam_xuc: avg('cam_xuc'),
      sang_tao: avg('sang_tao'),
      tong_ket: avg('tong_ket'),
    };
  }, [students]);

  const handleExportDocx = async () => {
    setIsExportingDocx(true);
    try {
      const studentToExport = students[0] || {
        id: 'HS-01',
        stt: 1,
        name: 'Nguyễn Hoàng Minh',
        status: 'submitted',
        score: 8.8,
        topic: 'Tả cây phượng vĩ già trên sân trường em',
      };
      await exportStudentEvaluationToDocx(studentToExport, evaluation, config.className);
    } catch (e) {
      console.error(e);
    } finally {
      setIsExportingDocx(false);
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

  const defaultTeacherData: TeacherDashboardData = evaluation?.teacher_dashboard || {
    diem_so: {
      bo_cuc: 8.5,
      von_tu: 9.0,
      ngu_phap: 8.0,
      cam_xuc: 9.0,
      sang_tao: 8.5,
      tong_ket: 8.6,
    },
    lo_hong_kien_thuc: [
      'Cần lưu ý dấu phẩy ngăn cách giữa trạng ngữ và chủ ngữ trong câu dài',
      'Đoạn thân bài có thể chuyển ý mượt mà hơn bằng từ nối liên kết',
    ],
    chi_so_tang_truong: {
      tu_vung: 'Tích lũy vốn từ láy phong phú (long lanh, rực rỡ, mơn mởn)',
      cau_ghep: 'Vận dụng tốt cặp quan hệ từ tương phản (Mặc dù... nhưng)',
      bien_phap_tu_tu: 'Khéo léo kết hợp so sánh (như đốm lửa) và nhân hóa (bác phượng già)',
    },
    canh_bao_dao_van: false,
    chi_tiet_dao_van:
      'Bài viết có nhiều nét biểu cảm tự nhiên, góc nhìn hồn nhiên của học sinh lớp 5, không sao chép văn mẫu mạng.',
  };

  const dataToDisplay = evaluation?.teacher_dashboard || defaultTeacherData;

  const handleCopyJson = () => {
    const jsonStr = JSON.stringify(dataToDisplay, null, 2);
    navigator.clipboard.writeText(jsonStr);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getScoreColor = (score: number) => {
    if (score >= 8.5) return 'text-emerald-700 bg-emerald-50 border-emerald-200';
    if (score >= 7.0) return 'text-amber-700 bg-amber-50 border-amber-200';
    return 'text-rose-700 bg-rose-50 border-rose-200';
  };

  const pillarsList = [
    {
      key: 'bo_cuc',
      name: '1. Bố Cục Bài Viết',
      desc: 'Cân đối Mở bài - Thân bài - Kết bài; mạch lạc liên kết',
      score: dataToDisplay.diem_so.bo_cuc,
    },
    {
      key: 'von_tu',
      name: '2. Vốn Từ Tiếng Việt',
      desc: 'Từ láy gợi hình, gợi thanh, độ phong phú từ ngữ',
      score: dataToDisplay.diem_so.von_tu,
    },
    {
      key: 'ngu_phap',
      name: '3. Ngữ Pháp & Dấu Câu',
      desc: 'Câu ghép (cặp quan hệ từ), dấu chấm, phẩy, hai chấm',
      score: dataToDisplay.diem_so.ngu_phap,
    },
    {
      key: 'cam_xuc',
      name: '4. Cảm Xúc Biểu Cảm',
      desc: 'Tình cảm chân thực, sự gắn bó sâu sắc với đối tượng tả',
      score: dataToDisplay.diem_so.cam_xuc,
    },
    {
      key: 'sang_tao',
      name: '5. Sáng Tạo & Tu Từ',
      desc: 'So sánh độc đáo, nhân hóa giàu tưởng tượng, không rập khuôn',
      score: dataToDisplay.diem_so.sang_tao,
    },
  ];

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Teacher Top Header */}
      <div className="bg-linear-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold border border-indigo-400/30">
            <GraduationCap className="w-3.5 h-3.5 text-indigo-400" />
            <span>Teacher Analytics & Socratic Assessment Dashboard</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Bảng Đánh Giá Năng Lực Học Sinh Lớp 5
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            Hệ thống tự động trích xuất các chỉ số chuẩn hóa theo chương trình GDPT môn Tiếng Việt,
            phát hiện lỗ hổng ngữ pháp, kiểm soát nguy cơ sao chép văn mẫu và xuất dữ liệu JSON tích
            hợp sổ điểm điện tử.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={handleExportPptx}
            disabled={isExportingPptx}
            className="px-3 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-400/30 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-50"
            title="Xuất bộ slide thuyết trình (.pptx) cho tiết trả bài trên lớp"
          >
            <Presentation className="w-3.5 h-3.5 text-amber-300" />
            <span>{isExportingPptx ? 'Đang tạo Slide...' : 'Slide Trả Bài (.pptx)'}</span>
          </button>
          <button
            onClick={handleExportDocx}
            disabled={isExportingDocx}
            className="px-3 py-2 rounded-xl bg-blue-500/20 hover:bg-blue-500/30 text-blue-200 border border-blue-400/30 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-50"
            title="Xuất phiếu đánh giá chuẩn in ấn dạng Word (.docx)"
          >
            <FileText className="w-3.5 h-3.5 text-blue-300" />
            <span>{isExportingDocx ? 'Đang tạo Word...' : 'Phiếu Báo Cáo (.docx)'}</span>
          </button>

          {onOpenExportModal && (
            <button
              onClick={onOpenExportModal}
              className="px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
              title="Xuất dữ liệu toàn bộ bài nộp học sinh dưới dạng Excel (CSV) hoặc JSON Database"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Xuất Database (Excel/JSON)</span>
            </button>
          )}

          <span className="w-px h-6 bg-white/20 mx-1 hidden sm:block" />

          <button
            onClick={() => setActiveTab('class')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'class'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-white/10 text-slate-300 hover:bg-white/20'
            }`}
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-300" />
            <span>Danh Sách Lớp ({students.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('metrics')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'metrics'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-white/10 text-slate-300 hover:bg-white/20'
            }`}
          >
            Chỉ Số 5 Cột Trụ
          </button>
          <button
            onClick={() => setActiveTab('json')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'json'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-white/10 text-slate-300 hover:bg-white/20'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>JSON Hệ Thống</span>
          </button>
        </div>
      </div>

      {/* Tab Content Rendering */}
      {activeTab === 'class' ? (
        <ClassRosterManager
          students={students}
          config={config}
          onUpdateConfig={onUpdateConfig}
          onSyncRoster={onSyncRoster}
          isSyncing={isSyncing}
          syncError={syncError}
          onSelectStudentForEvaluation={onSelectStudentForEvaluation}
          onOpenSocraticChatForStudent={onOpenSocraticChatForStudent}
          onSelectStudentForParentReport={onSelectStudentForParentReport}
          onResetToDefault={onResetToDefault}
          onUpdateStudent={onUpdateStudent}
          onOpenGoogleSheetModal={onOpenGoogleSheetModal}
        />
      ) : activeTab === 'metrics' ? (
        <div className="space-y-6">
          {/* Plagiarism Risk Banner */}
          <div
            className={`p-5 sm:p-6 rounded-3xl border shadow-xs transition-all ${
              dataToDisplay.canh_bao_dao_van
                ? 'bg-amber-50 border-amber-300 text-amber-950'
                : 'bg-emerald-50/70 border-emerald-300 text-emerald-950'
            }`}
          >
            <div className="flex items-start sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <span
                  className={`p-2.5 rounded-2xl shrink-0 mt-0.5 sm:mt-0 ${
                    dataToDisplay.canh_bao_dao_van
                      ? 'bg-amber-500 text-white shadow-xs'
                      : 'bg-emerald-600 text-white shadow-xs'
                  }`}
                >
                  {dataToDisplay.canh_bao_dao_van ? (
                    <AlertTriangle className="w-6 h-6" />
                  ) : (
                    <ShieldCheck className="w-6 h-6" />
                  )}
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider">
                      Trạng Thái Kiểm Định Đạo Văn / Văn Mẫu
                    </span>
                    <span
                      className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                        dataToDisplay.canh_bao_dao_van
                          ? 'bg-amber-200 text-amber-900'
                          : 'bg-emerald-200 text-emerald-900'
                      }`}
                    >
                      {dataToDisplay.canh_bao_dao_van ? 'CẢNH BÁO VĂN MẪU' : 'AN TOÀN & SÁNG TẠO'}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold mt-0.5">
                    {dataToDisplay.canh_bao_dao_van
                      ? 'Phát hiện đoạn văn trùng khớp với các mẫu bài viết phổ biến trên mạng'
                      : 'Bài viết mang dấu ấn tư duy độc lập, giàu trải nghiệm cá nhân'}
                  </h3>
                  <p className="text-xs mt-1 opacity-90 leading-relaxed">
                    {dataToDisplay.chi_tiet_dao_van ||
                      (dataToDisplay.canh_bao_dao_van
                        ? 'Giáo viên nên dùng câu hỏi gợi mở để em tự thay thế bằng suy nghĩ riêng.'
                        : 'Không tìm thấy dấu vết sao chép từ kho dữ liệu văn mẫu học sinh lớp 5.')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 5 Pillars Summary Scorecard */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Award className="w-5 h-5 text-indigo-600" />
                  <span>Đánh Giá Toàn Diện 5 Cột Trụ Tiếng Việt Lớp 5</span>
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Thang điểm chuẩn mực 10 điểm cho từng năng lực ngôn từ
                </p>
              </div>

              <div className="flex items-center gap-3 bg-indigo-50 border border-indigo-200 px-4 py-2 rounded-2xl">
                <span className="text-xs font-semibold text-indigo-900">Điểm Tổng Kết:</span>
                <span className="text-2xl font-black text-indigo-700">
                  {dataToDisplay.diem_so.tong_ket}
                  <span className="text-sm font-normal text-indigo-500">/10</span>
                </span>
              </div>
            </div>

            {/* Visual Analytics: Radar 5 Pillars & Class Distribution */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-5 sm:p-6 rounded-3xl bg-slate-50/80 border border-slate-200/90 items-center">
              <div className="flex flex-col items-center">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Biểu Đồ Radar Mạng Nhện 5 Cột Trụ
                </span>
                <RadarChart5Pillars
                  scores={dataToDisplay.diem_so}
                  classAvgScores={classAvgScores}
                  size={270}
                />
              </div>
              <div className="border-t lg:border-t-0 lg:border-l border-slate-200 pt-4 lg:pt-0 lg:pl-6">
                <ClassScoreDistributionChart
                  students={students}
                  currentStudentScore={dataToDisplay.diem_so.tong_ket}
                />
              </div>
            </div>

            {/* Pillar Bars */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {pillarsList.map((p) => {
                const percent = (p.score / 10) * 100;
                return (
                  <div
                    key={p.key}
                    className="p-4 rounded-2xl border border-slate-200/80 bg-slate-50/50 space-y-2.5"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-bold text-sm text-slate-900">{p.name}</h4>
                        <p className="text-[11px] text-slate-500 leading-snug">{p.desc}</p>
                      </div>
                      <span
                        className={`text-sm font-black px-2.5 py-1 rounded-xl border ${getScoreColor(
                          p.score
                        )}`}
                      >
                        {p.score}/10
                      </span>
                    </div>

                    <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-linear-to-r from-indigo-500 to-emerald-500 rounded-full transition-all duration-700"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Knowledge Gaps & Growth Indices */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Lỗ hổng kiến thức */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-rose-100 text-rose-700">
                  <AlertCircle className="w-4 h-4" />
                </span>
                <div>
                  <h3 className="font-bold text-base text-slate-900">
                    Lỗ Hổng Kiến Thức Cần Khắc Phục
                  </h3>
                  <p className="text-xs text-slate-500">
                    Trường dữ liệu <code>lo_hong_kien_thuc</code>
                  </p>
                </div>
              </div>

              {dataToDisplay.lo_hong_kien_thuc.length > 0 ? (
                <div className="space-y-2.5">
                  {dataToDisplay.lo_hong_kien_thuc.map((gap, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-2xl bg-rose-50/60 border border-rose-200 text-xs sm:text-sm text-rose-950 flex items-start gap-2.5"
                    >
                      <span className="w-5 h-5 rounded-full bg-rose-200 text-rose-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <p className="leading-relaxed font-medium">{gap}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-800 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Không phát hiện lỗ hổng ngữ pháp hoặc dấu câu đáng kể.</span>
                </div>
              )}
            </div>

            {/* Chỉ số tăng trưởng */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-indigo-100 text-indigo-700">
                  <TrendingUp className="w-4 h-4" />
                </span>
                <div>
                  <h3 className="font-bold text-base text-slate-900">
                    Chỉ Số Tăng Trưởng Năng Lực
                  </h3>
                  <p className="text-xs text-slate-500">
                    Trường dữ liệu <code>chi_so_tang_truong</code>
                  </p>
                </div>
              </div>

              <div className="space-y-3 text-xs sm:text-sm">
                <div className="p-3.5 rounded-2xl bg-indigo-50/50 border border-indigo-200/80">
                  <div className="text-[11px] font-bold text-indigo-900 uppercase">
                    1. Vốn Từ Vựng (Từ láy, từ gợi cảm):
                  </div>
                  <p className="text-slate-800 font-medium mt-1 leading-relaxed">
                    {dataToDisplay.chi_so_tang_truong.tu_vung}
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-emerald-50/50 border border-emerald-200/80">
                  <div className="text-[11px] font-bold text-emerald-900 uppercase">
                    2. Kỹ Năng Câu Ghép (Quan hệ từ):
                  </div>
                  <p className="text-slate-800 font-medium mt-1 leading-relaxed">
                    {dataToDisplay.chi_so_tang_truong.cau_ghep}
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-amber-50/50 border border-amber-200/80">
                  <div className="text-[11px] font-bold text-amber-900 uppercase">
                    3. Biện Pháp Nghệ Thuật (So sánh, nhân hóa):
                  </div>
                  <p className="text-slate-800 font-medium mt-1 leading-relaxed">
                    {dataToDisplay.chi_so_tang_truong.bien_phap_tu_tu}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* JSON System Output View */
        <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-mono text-emerald-400">
                JSON API Payload - Teacher Dashboard Format
              </span>
              <p className="text-xs text-slate-400 mt-0.5">
                Được trả về chính xác gồm 4 trường: diem_so, lo_hong_kien_thuc, chi_so_tang_truong,
                canh_bao_dao_van.
              </p>
            </div>
            <button
              onClick={handleCopyJson}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-200 border border-slate-700 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Đã sao chép!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Sao chép JSON</span>
                </>
              )}
            </button>
          </div>

          <pre className="p-4 bg-black/40 rounded-2xl text-xs font-mono text-emerald-300 overflow-x-auto leading-relaxed border border-slate-800/80">
            {JSON.stringify(dataToDisplay, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};
