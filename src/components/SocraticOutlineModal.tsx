import React, { useState } from 'react';
import { OwlAvatar } from './OwlAvatar.tsx';
import { Sparkles, BookOpen, Check, ArrowRight, Wand2, Lightbulb } from 'lucide-react';

interface SocraticOutlineModalProps {
  isOpen: boolean;
  onClose: () => void;
  topic: string;
  onApplyOutlineToEssay: (outlineText: string) => void;
}

export const SocraticOutlineModal: React.FC<SocraticOutlineModalProps> = ({
  isOpen,
  onClose,
  topic,
  onApplyOutlineToEssay,
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form answers
  const [moBai, setMoBai] = useState('');
  const [thanBaiBaoQuat, setThanBaiBaoQuat] = useState('');
  const [thanBaiChiTiet, setThanBaiChiTiet] = useState('');
  const [ketBai, setKetBai] = useState('');

  if (!isOpen) return null;

  // Smart suggestions helper based on topic
  const handleAutoSuggest = () => {
    if (topic.toLowerCase().includes('cây') || topic.toLowerCase().includes('phượng')) {
      setMoBai('Giữa sân trường em sừng sững cây phượng vĩ già, người bạn lớn gắn bó suốt những năm tiểu học.');
      setThanBaiBaoQuat('Từ xa, cây như chiếc ô khổng lồ màu xanh biếc. Thân cây to một vòng tay em ôm, lớp vỏ nâu xù xì in dấu thời gian.');
      setThanBaiChiTiet('Mùa hè hoa phượng nở đỏ rực như đốm lửa thắp sáng góc trời. Giờ ra chơi chúng em tụ tập dưới bóng mát đọc sách, nhặt hoa ép vào trang vở.');
      setKetBai('Cây phượng vĩ là kỷ niệm thân thương của tuổi học trò, mai này lớn khôn em sẽ mãi không quên.');
    } else if (topic.toLowerCase().includes('mèo') || topic.toLowerCase().includes('con')) {
      setMoBai('Nhà em có nuôi một chú mèo mướp ngộ nghĩnh tên là Miu Miu, được bố em mang về nuôi từ năm ngoái.');
      setThanBaiBaoQuat('Miu có bộ lông màu vàng sọc đen mượt mà như tấm nhung. Đầu tròn như cuộn len nhỏ, đôi mắt màu xanh biếc long lanh như hai hòn bi ve.');
      setThanBaiChiTiet('Bốn chân chú có đệm thịt êm ái nên bước đi nhẹ nhàng không tiếng động. Ban ngày chú thích nằm sưởi nắng ở hiên, ban đêm chú là dũng sĩ bắt chuột cừ khôi.');
      setKetBai('Em rất yêu chú mèo Miu. Mỗi ngày đi học về, em đều vuốt ve bộ lông ấm áp và cho Miu ăn.');
    } else {
      setMoBai(`Trong cuộc sống muôn màu, đối tượng mà em yêu mến và muốn miêu tả nhất chính là ${topic}.`);
      setThanBaiBaoQuat('Nhìn từ xa, nét nổi bật nhất là dáng vẻ thân thương, màu sắc hài hòa và gần gũi với cuộc sống hàng ngày của em.');
      setThanBaiChiTiet('Khi quan sát kỹ, từng đường nét, âm thanh rộn rã và cử chỉ sinh động đều để lại trong em ấn tượng khó phai.');
      setKetBai('Hình ảnh ấy đã khắc sâu vào tâm trí em, nhắc nhở em luôn biết trân trọng những điều tốt đẹp xung quanh.');
    }
  };

  const handleGenerateAndApply = () => {
    const formattedOutline = `### DÀN Ý BÀI VĂN: ${topic.toUpperCase()}

I. MỞ BÀI:
${moBai || '- Giới thiệu đối tượng miêu tả và ấn tượng ban đầu.'}

II. THÂN BÀI:
1. Tả bao quát:
${thanBaiBaoQuat || '- Dáng vẻ nhìn từ xa, màu sắc, hình khối chung.'}

2. Tả chi tiết & Kỷ niệm:
${thanBaiChiTiet || '- Những nét đặc sắc cận cảnh, âm thanh, hoạt động và kỷ niệm sâu sắc.'}

III. KẾT BÀI:
${ketBai || '- Tình cảm, ước mong hoặc lời hứa gắn bó của em.'}

---
(Em hãy dựa vào từng ý trên để phát triển thành các đoạn văn hoàn chỉnh có dùng từ láy và biện pháp so sánh nhé!)`;

    onApplyOutlineToEssay(formattedOutline);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-emerald-200 space-y-6 animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-start justify-between border-b border-emerald-100 pb-4">
          <div className="flex items-center gap-3">
            <OwlAvatar size="md" mood="mentoring" />
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                <Sparkles className="w-3 h-3 text-amber-500" />
                <span>Phương Pháp Socratic Khơi Gợi Ý Tưởng</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mt-0.5">
                Cùng Bác Cú Lập Dàn Ý 3 Phần
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center font-bold text-sm cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Current Topic Indicator */}
        <div className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-emerald-700 shrink-0" />
            <span className="font-semibold text-emerald-950">
              Đề bài: <b>{topic}</b>
            </span>
          </div>
          <button
            type="button"
            onClick={handleAutoSuggest}
            className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1 shrink-0 cursor-pointer shadow-xs transition-colors"
          >
            <Wand2 className="w-3 h-3 text-amber-300" />
            <span>Gợi ý mẫu của Bác Cú</span>
          </button>
        </div>

        {/* 4 Step Form Fields */}
        <div className="space-y-4 text-xs sm:text-sm">
          {/* Step 1: Mở bài */}
          <div className="space-y-1.5">
            <label className="font-bold text-slate-800 flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-emerald-700 text-white text-[11px] font-bold flex items-center justify-center">
                1
              </span>
              <span>I. Mở bài (Em định giới thiệu ai / sự vật gì? Ấn tượng ban đầu?):</span>
            </label>
            <textarea
              rows={2}
              value={moBai}
              onChange={(e) => setMoBai(e.target.value)}
              placeholder="Ví dụ: Giữa sân trường em sừng sững một cây phượng vĩ già, người bạn lớn chứng kiến biết bao kỷ niệm..."
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-emerald-500 focus:bg-white focus:outline-hidden"
            />
          </div>

          {/* Step 2: Thân bài - Bao quát */}
          <div className="space-y-1.5">
            <label className="font-bold text-slate-800 flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-indigo-600 text-white text-[11px] font-bold flex items-center justify-center">
                2
              </span>
              <span>II.1. Thân bài - Tả bao quát (Nhìn từ xa trông thế nào? Hình khối, màu sắc?):</span>
            </label>
            <textarea
              rows={2}
              value={thanBaiBaoQuat}
              onChange={(e) => setThanBaiBaoQuat(e.target.value)}
              placeholder="Ví dụ: Nhìn từ xa, cây như chiếc ô xanh khổng lồ. Thân cây to một vòng tay em ôm, vỏ cây xù xì..."
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-emerald-500 focus:bg-white focus:outline-hidden"
            />
          </div>

          {/* Step 3: Thân bài - Chi tiết & Kỷ niệm */}
          <div className="space-y-1.5">
            <label className="font-bold text-slate-800 flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-amber-600 text-white text-[11px] font-bold flex items-center justify-center">
                3
              </span>
              <span>II.2. Thân bài - Tả chi tiết & Kỷ niệm (Âm thanh, màu hoa, hoạt động gắn bó?):</span>
            </label>
            <textarea
              rows={2}
              value={thanBaiChiTiet}
              onChange={(e) => setThanBaiChiTiet(e.target.value)}
              placeholder="Ví dụ: Mùa hè hoa nở đỏ rực như đốm lửa. Giờ ra chơi tụi em tụ tập nhảy dây, đọc sách dưới bóng râm..."
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-emerald-500 focus:bg-white focus:outline-hidden"
            />
          </div>

          {/* Step 4: Kết bài */}
          <div className="space-y-1.5">
            <label className="font-bold text-slate-800 flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-teal-600 text-white text-[11px] font-bold flex items-center justify-center">
                4
              </span>
              <span>III. Kết bài (Tình cảm, lời hứa hoặc ước mong của em?):</span>
            </label>
            <textarea
              rows={2}
              value={ketBai}
              onChange={(e) => setKetBai(e.target.value)}
              placeholder="Ví dụ: Em rất yêu quý cây phượng. Dù mai này lên cấp hai, hình ảnh cây phượng vẫn in sâu trong tâm trí..."
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-emerald-500 focus:bg-white focus:outline-hidden"
            />
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
          >
            Đóng
          </button>

          <button
            type="button"
            onClick={handleGenerateAndApply}
            className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center gap-2 shadow-xs cursor-pointer transition-all active:scale-95"
          >
            <Check className="w-4 h-4" />
            <span>Áp Dụng Dàn Ý Vào Bài Viết Của Em</span>
          </button>
        </div>
      </div>
    </div>
  );
};
