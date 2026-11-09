import React, { useState } from 'react';
import { ParentReportData, EvaluationResult, StudentRecord, PillarScores } from '../types/index.ts';
import { OwlAvatar } from './OwlAvatar.tsx';
import { RadarChart5Pillars } from './RadarChart5Pillars.tsx';
import { exportStudentEvaluationToDocx } from '../utils/docxExport.ts';
import {
  HeartHandshake,
  Volume2,
  VolumeX,
  Sparkles,
  BookMarked,
  Printer,
  Copy,
  Check,
  Smile,
  Home,
  UserCheck,
  FileText,
  Download
} from 'lucide-react';
import { speakVietnamese, stopSpeaking } from '../utils/audio.ts';

interface ParentReportProps {
  evaluation: EvaluationResult | null;
  student?: StudentRecord | null;
}

export const ParentReport: React.FC<ParentReportProps> = ({ evaluation, student }) => {
  const [isReading, setIsReading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isExportingDocx, setIsExportingDocx] = useState(false);

  const defaultParentData: ParentReportData = evaluation?.parent_report || {
    tieu_de_thu: student
      ? `Thư Gửi Gia Đình Em ${student.name} (Lớp 5A)`
      : 'Thư Gửi Gia Đình Nhà Thám Hiểm Nhí',
    thu_gui_phu_huynh: student
      ? `Kính gửi Quý Phụ Huynh của em ${student.name}, Bác Cú Thông Thái rất vui mừng được đồng hành cùng con trong chặng đường khám phá vẻ đẹp của Tiếng Việt lớp 5. Hôm nay, con đã thể hiện một bài viết rất giàu tình cảm, biết quan sát tinh tế và sử dụng nhiều từ ngữ gợi tả sống động.`
      : 'Kính gửi Quý Phụ Huynh, Bác Cú Thông Thái rất vui mừng được đồng hành cùng con trong chặng đường khám phá vẻ đẹp của Tiếng Việt lớp 5. Hôm nay, con đã thể hiện một bài viết rất giàu tình cảm, biết quan sát tinh tế và sử dụng nhiều từ ngữ gợi tả sống động. Con luôn chủ động suy nghĩ và hào hứng thử thách bản thân với các cách diễn đạt mới.',
    diem_tien_bo_noi_bat: [
      'Khả năng quan sát tinh tế và đưa cảm xúc chân thực vào từng câu văn.',
      'Bước đầu vận dụng sáng tạo các biện pháp so sánh và nhân hóa để bài văn thêm sinh động.',
      'Có ý thức trau chuốt câu chữ, không phụ thuộc vào các bài văn mẫu rập khuôn.',
    ],
    hoat_dong_dong_hanh_tai_nha: [
      'Cùng con đọc một mẩu chuyện ngắn mỗi tối và cùng đố nhau tìm các từ láy tả âm thanh hoặc màu sắc.',
      'Trò chơi nối câu ghép khi nấu ăn hoặc đi dạo: Bố mẹ nói vế "Mặc dù...", con sẽ hoàn thành vế "nhưng...".',
      'Khuyến khích con viết nhật ký 3 dòng mỗi ngày ghi lại một khoảnh khắc ấm áp cùng gia đình.',
    ],
  };

  const parentData = evaluation?.parent_report || defaultParentData;

  const pillarScores: PillarScores = evaluation?.teacher_dashboard?.diem_so || student?.scores || {
    bo_cuc: 8.5,
    von_tu: 8.5,
    ngu_phap: 8.0,
    cam_xuc: 9.0,
    sang_tao: 8.5,
    tong_ket: student?.score || 8.5,
  };

  const handleToggleRead = () => {
    if (isReading) {
      stopSpeaking();
      setIsReading(false);
    } else {
      setIsReading(true);
      const fullSpeech = `${parentData.tieu_de_thu}. ${parentData.thu_gui_phu_huynh}. Những điểm tiến bộ nổi bật: ${parentData.diem_tien_bo_noi_bat.join('. ')}. Gợi ý hoạt động đồng hành tại nhà: ${parentData.hoat_dong_dong_hanh_tai_nha.join('. ')}`;
      speakVietnamese(fullSpeech, () => setIsReading(false));
    }
  };

  const handleCopy = () => {
    const text = `${parentData.tieu_de_thu}\n\n${parentData.thu_gui_phu_huynh}\n\nĐiểm tiến bộ nổi bật:\n${parentData.diem_tien_bo_noi_bat.map((d) => `- ${d}`).join('\n')}\n\nHoạt động đồng hành tại nhà:\n${parentData.hoat_dong_dong_hanh_tai_nha.map((h) => `- ${h}`).join('\n')}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExportDocx = async () => {
    setIsExportingDocx(true);
    try {
      const targetStudent = student || {
        id: 'HS-01',
        stt: 1,
        name: 'Nguyễn Hoàng Minh',
        status: 'submitted',
        score: pillarScores.tong_ket,
        topic: 'Tập làm văn Tiếng Việt Lớp 5',
      };
      await exportStudentEvaluationToDocx(targetStudent, evaluation);
    } catch (e) {
      console.error(e);
    } finally {
      setIsExportingDocx(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Top Banner */}
      <div className="bg-linear-to-r from-teal-800 via-emerald-800 to-teal-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-teal-100 text-xs font-semibold">
            <HeartHandshake className="w-3.5 h-3.5 text-amber-300" />
            <span>Cầu Nối Yêu Thương Giữa Nhà Trường & Gia Đình</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Báo Cáo Tiến Bộ & Thư Gửi Phụ Huynh
          </h1>
          <p className="text-xs sm:text-sm text-teal-100/90 leading-relaxed max-w-xl">
            Tóm lược sự trưởng thành trong tư duy ngôn ngữ của con cùng những gợi ý hoạt động gần
            gũi tại nhà.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={handleExportDocx}
            disabled={isExportingDocx}
            className="px-4 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white shadow-xs transition-all cursor-pointer disabled:opacity-50"
            title="Tải phiếu đánh giá hoàn chỉnh gửi gia đình dạng file Word (.docx)"
          >
            <Download className="w-4 h-4" />
            <span>{isExportingDocx ? 'Đang tạo Word...' : 'Tải Phiếu Word (.docx)'}</span>
          </button>
          <button
            onClick={handleToggleRead}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2 shadow-xs transition-all cursor-pointer ${
              isReading
                ? 'bg-amber-400 text-amber-950 animate-pulse'
                : 'bg-white/20 hover:bg-white/30 text-white'
            }`}
          >
            {isReading ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            <span>{isReading ? 'Dừng Đọc Thư' : 'Nghe Bác Cú Đọc Thư'}</span>
          </button>
        </div>
      </div>

      {/* Heartfelt Letter on Warm Paper */}
      <div className="relative bg-[#FFFDF7] rounded-3xl p-6 sm:p-10 border-2 border-amber-200/80 shadow-md space-y-8">
        {/* Decorative corner stamp */}
        <div className="absolute top-6 right-6 hidden sm:flex flex-col items-center opacity-80 pointer-events-none">
          <OwlAvatar size="sm" mood="happy" />
          <span className="text-[9px] uppercase font-bold text-amber-800 tracking-wider mt-1">
            Dấu Ấn Bác Cú
          </span>
        </div>

        {/* Letter Heading */}
        <div className="border-b border-amber-200/80 pb-5">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-800 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>Thư Bác Cú Thông Thái Gửi Gia Đình</span>
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
            {parentData.tieu_de_thu}
          </h2>
        </div>

        {/* Letter Body */}
        <div className="text-slate-800 text-sm sm:text-base leading-relaxed space-y-4 font-normal">
          <p className="italic text-slate-600">Kính gửi ba mẹ và gia đình thân yêu,</p>
          <p className="whitespace-pre-line">{parentData.thu_gui_phu_huynh}</p>
        </div>

        {/* 5 Pillars Visual Radar in Parent Report */}
        <div className="bg-white/90 p-5 rounded-2xl border border-amber-200/90 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xs">
          <div className="space-y-2 max-w-sm">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Đánh Giá Toàn Diện 5 Cột Trụ Của Con:</span>
            </span>
            <p className="text-xs text-slate-600 leading-relaxed">
              Biểu đồ trực quan hóa mức độ tự tin và năng lực ngôn ngữ của con: <b>Bố cục</b>, <b>Vốn từ</b>, <b>Ngữ pháp</b>, <b>Cảm xúc</b> và <b>Sáng tạo</b>.
            </p>
            <div className="pt-2 flex items-center gap-2">
              <span className="text-xs font-bold text-slate-700">Điểm tổng kết:</span>
              <span className="text-xl font-black text-emerald-700 bg-emerald-100 px-3 py-0.5 rounded-xl border border-emerald-300">
                {pillarScores.tong_ket}/10
              </span>
            </div>
          </div>
          <div className="shrink-0 flex justify-center">
            <RadarChart5Pillars
              scores={pillarScores}
              studentName={student?.name || 'Con yêu'}
              size={240}
            />
          </div>
        </div>

        {/* Điểm tiến bộ nổi bật */}
        <div className="bg-emerald-50/70 p-5 rounded-2xl border border-emerald-200/80 space-y-3">
          <h3 className="font-bold text-sm text-emerald-950 flex items-center gap-2">
            <Smile className="w-4 h-4 text-emerald-600" />
            <span>Những Điểm Tiến Bộ Đáng Khen Của Con Hôm Nay:</span>
          </h3>
          <ul className="space-y-2">
            {parentData.diem_tien_bo_noi_bat.map((point, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-800">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
                <span className="leading-relaxed">{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Gợi ý hoạt động đồng hành tại nhà */}
        <div className="bg-amber-50/80 p-5 rounded-2xl border border-amber-200/80 space-y-3">
          <h3 className="font-bold text-sm text-amber-950 flex items-center gap-2">
            <Home className="w-4 h-4 text-amber-700" />
            <span>Gợi Ý Hoạt Động Đồng Hành Đọc Sách & Ngôn Ngữ Tại Nhà:</span>
          </h3>
          <ul className="space-y-2.5">
            {parentData.hoat_dong_dong_hanh_tai_nha.map((act, idx) => (
              <li
                key={idx}
                className="flex items-start gap-3 bg-white/80 p-3 rounded-xl border border-amber-200/60 text-xs sm:text-sm text-slate-800"
              >
                <span className="p-1 rounded-lg bg-amber-100 text-amber-800 shrink-0 mt-0.5">
                  <BookMarked className="w-3.5 h-3.5" />
                </span>
                <span className="leading-relaxed font-medium">{act}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Sign-off */}
        <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-amber-200/80 text-xs text-slate-500">
          <div>
            <p className="font-bold text-slate-800">Bác Cú Thông Thái</p>
            <p>Người dẫn đường trong Hành trình thám hiểm Rừng Tri Thức</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-3.5 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold flex items-center gap-1.5 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">Đã sao chép!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Sao chép thư</span>
                </>
              )}
            </button>
            <button
              onClick={() => window.print()}
              className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>In thư lưu niệm</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
