import React, { useState } from 'react';
import {
  FileSpreadsheet,
  Download,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  X,
  Loader2,
  Sparkles,
  Users,
  Copy,
  Check,
  BookOpen
} from 'lucide-react';
import { StudentRecord, GoogleSheetConfig } from '../types/index.ts';
import {
  DEFAULT_SHEET_CONFIG,
  DEFAULT_STUDENTS,
  fetchClassRosterDirect,
  extractGoogleSheetId
} from '../utils/googleSheetService.ts';

interface GoogleSheetImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: GoogleSheetConfig;
  onImportSuccess: (students: StudentRecord[], updatedConfig: GoogleSheetConfig) => void;
}

export const GoogleSheetImportModal: React.FC<GoogleSheetImportModalProps> = ({
  isOpen,
  onClose,
  config,
  onImportSuccess,
}) => {
  const [sheetUrl, setSheetUrl] = useState(config.sheetUrl || DEFAULT_SHEET_CONFIG.sheetUrl);
  const [sheetName, setSheetName] = useState(config.sheetName || '');
  const [className, setClassName] = useState(config.className || 'Lớp 5A');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewResult, setPreviewResult] = useState<{
    students: StudentRecord[];
    className: string;
    total: number;
    rawColumns?: string[];
  } | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!isOpen) return null;

  const handleFetch = async (urlToFetch = sheetUrl, nameToFetch = sheetName) => {
    setError(null);
    setPreviewResult(null);
    setIsLoading(true);

    try {
      const result = await fetchClassRosterDirect(urlToFetch, nameToFetch || undefined);
      if (result.success && result.students.length > 0) {
        setPreviewResult({
          students: result.students,
          className: result.className || className,
          total: result.students.length,
          rawColumns: result.rawColumns,
        });
      } else {
        throw new Error(result.error || 'Không tìm thấy dữ liệu học sinh hợp lệ trong trang tính.');
      }
    } catch (err: any) {
      console.error('Fetch error:', err);
      setError(
        err?.message ||
          'Không thể tải danh sách. Thầy/Cô vui lòng đảm bảo file Google Sheet đã được mở quyền [Bất kỳ ai có đường liên kết đều có thể xem] (Viewer).'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleApplyImport = () => {
    if (!previewResult) return;
    const sheetId = extractGoogleSheetId(sheetUrl) || config.sheetId;
    const updatedConfig: GoogleSheetConfig = {
      ...config,
      sheetUrl,
      sheetId,
      sheetName: sheetName || undefined,
      className: className.trim() || previewResult.className,
      lastSyncedAt: new Date().toISOString(),
    };

    onImportSuccess(previewResult.students, updatedConfig);
    onClose();
  };

  const handleUseSampleSheet = () => {
    setSheetUrl(DEFAULT_SHEET_CONFIG.sheetUrl);
    setSheetName(DEFAULT_SHEET_CONFIG.sheetName || '');
    setClassName(DEFAULT_SHEET_CONFIG.className);
    handleFetch(DEFAULT_SHEET_CONFIG.sheetUrl, DEFAULT_SHEET_CONFIG.sheetName);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-emerald-100 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 bg-linear-to-r from-emerald-800 to-teal-800 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
              <FileSpreadsheet className="w-6 h-6 text-emerald-300" />
            </div>
            <div>
              <h2 className="text-xl font-bold flex items-center gap-2">
                Tải Danh Sách Lớp Từ Google Sheet
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-700/80 text-emerald-100 border border-emerald-500/40">
                  Lớp 5
                </span>
              </h2>
              <p className="text-xs text-emerald-100/90 mt-0.5">
                Nhập danh sách học sinh và phân công bài văn chỉ với 1 click
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Đóng cửa sổ"
            className="p-2 rounded-xl text-emerald-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          {/* Quick Help Guide */}
          <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 text-xs text-emerald-950 space-y-2.5">
            <div className="font-bold flex items-center gap-1.5 text-emerald-900">
              <HelpCircle className="w-4 h-4 text-emerald-600" />
              <span>Hướng dẫn 3 bước kết nối Google Sheet:</span>
            </div>
            <ol className="list-decimal list-inside space-y-1 text-slate-700 ml-1">
              <li>
                Mở file Google Sheet của Thầy/Cô trên máy tính hoặc điện thoại.
              </li>
              <li>
                Bấm nút <strong className="text-emerald-800">[Chia sẻ] (Share)</strong> ở góc trên bên phải &rarr; chọn quyền{' '}
                <strong className="text-emerald-800">[Bất kỳ ai có đường liên kết đều có thể xem] (Viewer)</strong>.
              </li>
              <li>
                Sao chép liên kết của bảng tính và dán vào ô bên dưới, sau đó bấm <strong>[Tải danh sách học sinh]</strong>.
              </li>
            </ol>
            <div className="pt-1 flex flex-wrap items-center gap-2">
              <a
                href={DEFAULT_SHEET_CONFIG.sheetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-emerald-700 hover:text-emerald-900 font-semibold underline"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Xem file mẫu Google Sheet chuẩn của Bộ GD&ĐT</span>
              </a>
              <span className="text-slate-300">•</span>
              <button
                type="button"
                onClick={handleUseSampleSheet}
                className="inline-flex items-center gap-1 text-teal-700 hover:text-teal-900 font-bold bg-white px-2.5 py-1 rounded-lg border border-teal-200 shadow-2xs hover:bg-teal-50 cursor-pointer transition-all"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Thử ngay với mẫu 32 học sinh Lớp 5A</span>
              </button>
            </div>
          </div>

          {/* Form Inputs */}
          <div className="space-y-4">
            <div>
              <label htmlFor="gsheet-url" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Đường Dẫn Google Sheet (URL hoặc Sheet ID) <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <input
                  id="gsheet-url"
                  type="text"
                  value={sheetUrl}
                  onChange={(e) => setSheetUrl(e.target.value)}
                  placeholder="https://docs.google.com/spreadsheets/d/.../edit"
                  className="w-full pl-3.5 pr-24 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm font-mono text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
                />
                <button
                  type="button"
                  onClick={() => handleFetch()}
                  disabled={isLoading || !sheetUrl.trim()}
                  className="absolute right-1.5 top-1.5 bottom-1.5 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Đang tải...</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-3.5 h-3.5" />
                      <span>Tải về</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="gsheet-name" className="block text-xs font-bold text-slate-700 mb-1">
                  Tên trang tính (Sheet Name - tùy chọn):
                </label>
                <input
                  id="gsheet-name"
                  type="text"
                  value={sheetName}
                  onChange={(e) => setSheetName(e.target.value)}
                  placeholder="Ví dụ: Sheet1 hoặc DanhSachLop5A"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                />
                <span className="text-[11px] text-slate-500">Để trống nếu lấy trang tính đầu tiên.</span>
              </div>

              <div>
                <label htmlFor="gsheet-classname" className="block text-xs font-bold text-slate-700 mb-1">
                  Tên Lớp Học hiển thị:
                </label>
                <input
                  id="gsheet-classname"
                  type="text"
                  value={className}
                  onChange={(e) => setClassName(e.target.value)}
                  placeholder="Ví dụ: Lớp 5A - Năm học 2026-2027"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                />
                <span className="text-[11px] text-slate-500">Tên lớp sẽ xuất hiện trên bảng điểm và bài thi.</span>
              </div>
            </div>
          </div>

          {/* Error Notice */}
          {error && (
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 text-xs space-y-1.5 animate-in fade-in">
              <div className="font-bold flex items-center gap-1.5 text-rose-700">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>Không thể kết nối đến Google Sheet:</span>
              </div>
              <p className="whitespace-pre-line text-rose-800">{error}</p>
            </div>
          )}

          {/* Preview of Loaded Students */}
          {previewResult && (
            <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-300 space-y-3 animate-in fade-in">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span className="font-bold text-sm text-emerald-950">
                    Đã tải thành công {previewResult.total} học sinh!
                  </span>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-200/80 text-emerald-900">
                  {previewResult.className}
                </span>
              </div>

              {previewResult.rawColumns && (
                <div className="text-[11px] text-emerald-800">
                  <span className="font-bold">Cột nhận diện: </span>
                  <span className="font-mono">{previewResult.rawColumns.slice(0, 7).join(' • ')}</span>
                </div>
              )}

              {/* Mini Table of First 5 Students */}
              <div className="bg-white rounded-xl border border-emerald-200/80 overflow-hidden text-xs">
                <div className="grid grid-cols-12 bg-emerald-100/60 font-bold px-3 py-1.5 text-emerald-900">
                  <div className="col-span-1">STT</div>
                  <div className="col-span-2">Mã HS</div>
                  <div className="col-span-4">Họ và tên</div>
                  <div className="col-span-2">Giới tính</div>
                  <div className="col-span-3">Trạng thái</div>
                </div>
                <div className="divide-y divide-slate-100 max-h-36 overflow-y-auto">
                  {previewResult.students.slice(0, 6).map((s) => (
                    <div key={s.id} className="grid grid-cols-12 px-3 py-1.5 text-slate-700 hover:bg-slate-50">
                      <div className="col-span-1 font-semibold">{s.stt}</div>
                      <div className="col-span-2 text-slate-500 font-mono text-[11px]">{s.code || '-'}</div>
                      <div className="col-span-4 font-medium text-slate-900">{s.name}</div>
                      <div className="col-span-2">{s.gender || 'Nam'}</div>
                      <div className="col-span-3">
                        <span
                          className={`inline-block px-1.5 py-0.5 rounded-sm text-[10px] font-semibold ${
                            s.status === 'submitted'
                              ? 'bg-emerald-100 text-emerald-800'
                              : s.status === 'needs_support'
                              ? 'bg-amber-100 text-amber-800'
                              : s.status === 'drafting'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {s.status === 'submitted'
                            ? 'Đã nộp bài'
                            : s.status === 'needs_support'
                            ? 'Cần bồi dưỡng'
                            : s.status === 'drafting'
                            ? 'Đang viết'
                            : 'Chưa nộp'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {previewResult.total > 6 && (
                <p className="text-[11px] text-slate-500 text-center italic">
                  ... và {previewResult.total - 6} học sinh khác
                </p>
              )}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <Users className="w-4 h-4 text-emerald-600" />
            <span>
              {previewResult
                ? `Sẵn sàng nạp ${previewResult.total} học sinh vào hệ thống`
                : 'Dữ liệu được lưu trữ an toàn trong trình duyệt của bạn'}
            </span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 font-semibold text-xs cursor-pointer transition-colors"
            >
              Hủy bỏ
            </button>
            <button
              type="button"
              onClick={previewResult ? handleApplyImport : () => handleFetch()}
              disabled={isLoading || (!previewResult && !sheetUrl.trim())}
              className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm cursor-pointer transition-colors"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Đang tải danh sách...</span>
                </>
              ) : previewResult ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Áp Dụng Danh Sách ({previewResult.total} HS)</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Kiểm tra & Tải Danh Sách</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
