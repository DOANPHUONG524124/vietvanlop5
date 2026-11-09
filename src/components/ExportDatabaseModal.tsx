import React, { useState } from 'react';
import { EssaySubmission } from '../types/index.ts';
import {
  Download,
  FileSpreadsheet,
  Database,
  Copy,
  Check,
  Search,
  X,
  Sparkles,
  Trophy,
  Users,
  FileText,
  Calendar
} from 'lucide-react';

interface ExportDatabaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  submissions: EssaySubmission[];
  classNameDefault?: string;
}

export const ExportDatabaseModal: React.FC<ExportDatabaseModalProps> = ({
  isOpen,
  onClose,
  submissions,
  classNameDefault = 'Lớp 5A1',
}) => {
  const [copied, setCopied] = useState(false);
  const [search, setSearch] = useState('');
  const [filterClass, setFilterClass] = useState<string>('all');

  if (!isOpen) return null;

  // Unique classes for filtering
  const classesList = Array.from(new Set(submissions.map((s) => s.className).filter(Boolean)));

  const filtered = submissions.filter((s) => {
    const matchSearch =
      s.studentName.toLowerCase().includes(search.toLowerCase()) ||
      s.topic.toLowerCase().includes(search.toLowerCase());
    const matchClass = filterClass === 'all' || s.className === filterClass;
    return matchSearch && matchClass;
  });

  // Export CSV with UTF-8 BOM for Excel compatibility
  const handleExportCSV = () => {
    const headers = [
      'STT',
      'Họ và Tên',
      'Lớp',
      'Thời gian nộp',
      'Chủ đề / Đề bài',
      'Số từ',
      'Điểm Cú Mèo chấm',
      'Sao thưởng nhận được',
      'Nhận xét Cú Mèo',
      'Nội dung bài làm',
    ];

    const rows = filtered.map((sub, idx) => [
      idx + 1,
      `"${sub.studentName.replace(/"/g, '""')}"`,
      `"${sub.className.replace(/"/g, '""')}"`,
      `"${sub.submittedAt}"`,
      `"${sub.topic.replace(/"/g, '""')}"`,
      sub.wordCount,
      sub.score ?? '',
      sub.pointsEarned,
      `"${(sub.owlFeedbackSummary || '').replace(/"/g, '""')}"`,
      `"${sub.essay.replace(/"/g, '""').replace(/\n/g, ' ')}"`,
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Danh_Sach_Bai_Nop_${classNameDefault.replace(/\s+/g, '_')}_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Export JSON Database
  const handleExportJSON = () => {
    const exportData = {
      exportDate: new Date().toISOString(),
      appVersion: '2.0.0',
      totalRecords: filtered.length,
      className: classNameDefault,
      database: filtered,
    };

    const jsonStr = JSON.stringify(exportData, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Database_Bai_Nop_Lop5_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleCopyJSON = () => {
    const jsonStr = JSON.stringify(filtered, null, 2);
    navigator.clipboard.writeText(jsonStr);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const totalPointsAwarded = filtered.reduce((sum, s) => sum + (s.pointsEarned || 0), 0);
  const avgScore =
    filtered.length > 0
      ? (
          filtered.reduce((sum, s) => sum + (s.score || 0), 0) /
          filtered.filter((s) => s.score).length || 1
        ).toFixed(1)
      : '0';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-5xl w-full shadow-2xl border-4 border-amber-300 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-amber-500 p-5 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/20 rounded-2xl text-2xl shadow-inner">
              📊
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black text-white">
                  Thống Kê & Xuất Cơ Sở Dữ Liệu Bài Nộp
                </h2>
                <span className="text-[10px] bg-white text-emerald-900 font-black px-2 py-0.5 rounded-full uppercase">
                  Database Export
                </span>
              </div>
              <p className="text-emerald-100 text-xs mt-0.5">
                Theo dõi bài làm học sinh lớp 5, điểm số Cú Mèo đánh giá và xuất file dữ liệu.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            title="Đóng bảng xuất"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Stats Cards */}
        <div className="p-4 bg-amber-50/50 border-b border-amber-100 grid grid-cols-2 sm:grid-cols-4 gap-3 shrink-0">
          <div className="p-3 bg-white rounded-2xl border border-amber-200 shadow-xs flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-100 text-emerald-700">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase text-slate-500">Bài Đã Nộp</div>
              <div className="text-xl font-black text-emerald-950">{filtered.length}</div>
            </div>
          </div>

          <div className="p-3 bg-white rounded-2xl border border-amber-200 shadow-xs flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-100 text-amber-700">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase text-slate-500">Điểm Trung Bình</div>
              <div className="text-xl font-black text-amber-950">{avgScore} / 10</div>
            </div>
          </div>

          <div className="p-3 bg-white rounded-2xl border border-amber-200 shadow-xs flex items-center gap-3">
            <div className="p-2 rounded-xl bg-orange-100 text-orange-700">
              <Sparkles className="w-5 h-5 text-amber-500" />
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase text-slate-500">Sao Thưởng Đã Tặng</div>
              <div className="text-xl font-black text-orange-950">{totalPointsAwarded} ⭐</div>
            </div>
          </div>

          <div className="p-3 bg-white rounded-2xl border border-amber-200 shadow-xs flex items-center gap-3">
            <div className="p-2 rounded-xl bg-purple-100 text-purple-700">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase text-slate-500">Số Lớp Tham Gia</div>
              <div className="text-xl font-black text-purple-950">
                {classesList.length > 0 ? classesList.length : 1} Lớp
              </div>
            </div>
          </div>
        </div>

        {/* Search, Filter & Export Action Buttons */}
        <div className="p-3 bg-white border-b border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2 w-full sm:w-auto flex-1">
            <div className="relative flex-1 max-w-xs">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Tìm tên học sinh hoặc đề bài..."
                className="w-full pl-9 pr-3 py-1.5 text-xs font-medium rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {classesList.length > 1 && (
              <select
                value={filterClass}
                onChange={(e) => setFilterClass(e.target.value)}
                className="px-2.5 py-1.5 text-xs font-bold rounded-xl border border-slate-200 bg-white"
              >
                <option value="all">Tất cả các lớp</option>
                {classesList.map((c) => (
                  <option key={c} value={c}>
                    Lớp {c}
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Export Action Buttons */}
          <div className="flex items-center gap-2 flex-wrap justify-end w-full sm:w-auto">
            <button
              onClick={handleExportCSV}
              className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
              title="Xuất file Excel / CSV có font tiếng Việt chuẩn UTF-8"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Xuất Bảng Excel (CSV)</span>
            </button>

            <button
              onClick={handleExportJSON}
              className="px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
              title="Xuất file JSON Database backup"
            >
              <Database className="w-4 h-4" />
              <span>Xuất JSON Database</span>
            </button>

            <button
              onClick={handleCopyJSON}
              className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1 transition-colors cursor-pointer"
              title="Sao chép dữ liệu JSON vào Clipboard"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Đã chép!' : 'Chép JSON'}</span>
            </button>
          </div>
        </div>

        {/* Submissions Table */}
        <div className="p-4 overflow-y-auto flex-1 bg-slate-50/50">
          {filtered.length === 0 ? (
            <div className="p-12 text-center text-slate-400 space-y-2">
              <span className="text-4xl">📝</span>
              <p className="text-sm font-semibold">Chưa có bài văn nào được nộp.</p>
              <p className="text-xs">Khi các em học sinh nộp bài và nhận điểm từ Cú Mèo, dữ liệu sẽ hiển thị đầy đủ tại đây!</p>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-xs">
              <table className="w-full text-left text-xs">
                <thead className="bg-emerald-50/80 text-emerald-950 font-black border-b border-emerald-100">
                  <tr>
                    <th className="px-3 py-3 w-12 text-center">STT</th>
                    <th className="px-3 py-3">Học Sinh</th>
                    <th className="px-3 py-3">Lớp</th>
                    <th className="px-3 py-3">Đề Bài</th>
                    <th className="px-3 py-3 text-center">Điểm Cú Mèo</th>
                    <th className="px-3 py-3 text-center">Sao Thưởng</th>
                    <th className="px-3 py-3">Thời Gian</th>
                    <th className="px-3 py-3">Nhận Xét Cú Mèo</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {filtered.map((item, idx) => (
                    <tr key={item.id} className="hover:bg-emerald-50/40 transition-colors">
                      <td className="px-3 py-3 text-center font-bold text-slate-400">{idx + 1}</td>
                      <td className="px-3 py-3 font-black text-slate-900 flex items-center gap-1.5">
                        <span className="text-lg">{item.avatarIcon || '🦉'}</span>
                        <span>{item.studentName}</span>
                      </td>
                      <td className="px-3 py-3 font-bold text-emerald-800">
                        <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 font-semibold">
                          {item.className}
                        </span>
                      </td>
                      <td className="px-3 py-3 max-w-[200px] truncate" title={item.topic}>
                        {item.topic}
                      </td>
                      <td className="px-3 py-3 text-center">
                        <span
                          className={`font-black px-2 py-0.5 rounded-full text-xs ${
                            (item.score ?? 0) >= 8.5
                              ? 'bg-emerald-100 text-emerald-800'
                              : (item.score ?? 0) >= 7.0
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-rose-100 text-rose-800'
                          }`}
                        >
                          {item.score !== undefined ? `${item.score}` : 'Chờ chấm'}
                        </span>
                      </td>
                      <td className="px-3 py-3 text-center font-black text-amber-600">
                        +{item.pointsEarned} ⭐
                      </td>
                      <td className="px-3 py-3 text-slate-400 whitespace-nowrap">{item.submittedAt}</td>
                      <td className="px-3 py-3 max-w-[220px] truncate text-slate-500 italic" title={item.owlFeedbackSummary}>
                        {item.owlFeedbackSummary || 'Đã hoàn thành đánh giá Socratic'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-emerald-50/80 border-t border-emerald-100 flex items-center justify-between text-xs text-emerald-900 font-semibold">
          <span>✨ Dữ liệu được lưu trữ tự động trên trình duyệt và sẵn sàng đồng bộ!</span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold cursor-pointer"
          >
            Đóng Lại
          </button>
        </div>
      </div>
    </div>
  );
};
