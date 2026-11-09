import pptxgen from 'pptxgenjs';
import { StudentRecord } from '../types/index.ts';

export async function exportClassLessonPptx(
  className: string = 'Lớp 5A',
  students: StudentRecord[] = []
): Promise<void> {
  const pres = new pptxgen();
  pres.title = `Tiết Trả Bài Tập Làm Văn - ${className}`;
  pres.layout = 'LAYOUT_16x9';

  // Palette: Forest Emerald & Amber Warmth
  const BG_COLOR = 'F8FAF5';
  const PRIMARY_COLOR = '047857'; // Emerald
  const ACCENT_COLOR = 'D97706'; // Amber
  const TEXT_DARK = '0F172A';

  // --- SLIDE 1: Title Slide ---
  const slide1 = pres.addSlide();
  slide1.background = { color: '064E3B' }; // Deep emerald
  slide1.addText('HÀNH TRÌNH KHÁM PHÁ RỪNG TRI THỨC', {
    x: 0.8,
    y: 1.5,
    w: '85%',
    h: 0.5,
    fontSize: 16,
    color: 'A7F3D0',
    bold: true,
  });
  slide1.addText(`TIẾT TRẢ BÀI TẬP LÀM VĂN: ${className.toUpperCase()}`, {
    x: 0.8,
    y: 2.2,
    w: '85%',
    h: 1.5,
    fontSize: 32,
    color: 'FFFFFF',
    bold: true,
  });
  slide1.addText(
    '🦉 Phương pháp gợi mở Socratic - Tôn vinh sáng tạo & Rèn luyện kỹ năng ngôn ngữ Lớp 5',
    {
      x: 0.8,
      y: 4.0,
      w: '85%',
      h: 0.8,
      fontSize: 16,
      color: 'FDE68A',
      italic: true,
    }
  );
  slide1.addText(`Trường Tiểu Học Ban Mai • Năm học 2026-2027 • Ngày ${new Date().toLocaleDateString('vi-VN')}`, {
    x: 0.8,
    y: 6.2,
    w: '85%',
    h: 0.5,
    fontSize: 12,
    color: 'D1FAE5',
  });

  // --- SLIDE 2: Class Overview & 5 Pillars Summary ---
  const slide2 = pres.addSlide();
  slide2.background = { color: BG_COLOR };
  slide2.addText('1. BỨC TRANH TOÀN CẢNH NĂNG LỰC CỦA LỚP TA', {
    x: 0.8,
    y: 0.6,
    w: '85%',
    h: 0.6,
    fontSize: 22,
    color: PRIMARY_COLOR,
    bold: true,
  });

  const scoredStudents = students.filter((s) => s.score !== undefined);
  const avg =
    scoredStudents.length > 0
      ? (scoredStudents.reduce((sum, s) => sum + (s.score || 0), 0) / scoredStudents.length).toFixed(1)
      : '8.4';

  slide2.addText(
    `👥 Sĩ số: ${students.length} bạn   |   📝 Đã nộp bài: ${scoredStudents.length} bạn   |   🏆 Điểm trung bình: ${avg}/10`,
    {
      x: 0.8,
      y: 1.3,
      w: '85%',
      h: 0.5,
      fontSize: 14,
      color: TEXT_DARK,
      bold: true,
    }
  );

  // 5 Pillars cards on Slide 2
  const pillars = [
    { title: 'Bố Cục', desc: 'Mở bài - Thân bài - Kết bài cân đối, mạch lạc' },
    { title: 'Vốn Từ', desc: 'Vận dụng từ láy tượng hình, tượng thanh phong phú' },
    { title: 'Ngữ Pháp', desc: 'Câu ghép dùng đúng quan hệ từ (Mặc dù... nhưng)' },
    { title: 'Cảm Xúc', desc: 'Lời văn chân thật, bộc lộ tình yêu thương hồn nhiên' },
    { title: 'Sáng Tạo', desc: 'Hình ảnh so sánh, nhân hóa mới mẻ, không sao chép' },
  ];

  pillars.forEach((p, idx) => {
    const cardX = 0.8 + idx * 1.7;
    slide2.addShape(pres.ShapeType.roundRect, {
      x: cardX,
      y: 2.3,
      w: 1.5,
      h: 3.8,
      fill: { color: 'FFFFFF' },
      line: { color: 'CBD5E1', width: 1 },
    });
    slide2.addText(`Cột Trụ ${idx + 1}`, {
      x: cardX + 0.1,
      y: 2.5,
      w: 1.3,
      h: 0.4,
      fontSize: 10,
      color: ACCENT_COLOR,
      bold: true,
      align: 'center',
    });
    slide2.addText(p.title, {
      x: cardX + 0.1,
      y: 3.0,
      w: 1.3,
      h: 0.5,
      fontSize: 14,
      color: PRIMARY_COLOR,
      bold: true,
      align: 'center',
    });
    slide2.addText(p.desc, {
      x: cardX + 0.1,
      y: 3.6,
      w: 1.3,
      h: 2.2,
      fontSize: 10,
      color: '475569',
      align: 'center',
    });
  });

  // --- SLIDE 3: "Hạt Ngọc Ngôn Từ" - Highlighting student gems ---
  const slide3 = pres.addSlide();
  slide3.background = { color: BG_COLOR };
  slide3.addText('2. HẠT NGỌC NGÔN TỪ - NHỮNG CÂU VĂN HAY NHẤT TUẦN', {
    x: 0.8,
    y: 0.6,
    w: '85%',
    h: 0.6,
    fontSize: 22,
    color: PRIMARY_COLOR,
    bold: true,
  });

  const gems = [
    {
      student: 'Nguyễn Hoàng Minh (5A-01)',
      quote:
        '“Từ các kẽ lá, những nụ hoa phượng e ấp bắt đầu thức giấc. Chỉ vài ngày sau, cả cây phượng bừng nở rực rỡ, tựa như hàng nghìn đốm lửa bập bùng thắp sáng góc trời.”',
      highlight: '✨ Điểm sáng: Nghệ thuật so sánh liên tưởng độc đáo + từ láy “e ấp”, “rực rỡ”, “bập bùng”.',
    },
    {
      student: 'Phạm Thu Trang (5A-04)',
      quote:
        '“Đôi mắt bà đục mờ nhưng ánh nhìn lúc nào cũng ấm áp hiền từ. Bàn tay bà gầy gầy gân guốc thô ráp vì cả một đời lam lũ nuôi bố em khôn lớn.”',
      highlight: '✨ Điểm sáng: Tình cảm kính yêu gia đình sâu lắng, từ ngữ miêu tả xúc động.',
    },
  ];

  gems.forEach((g, idx) => {
    const yPos = 1.6 + idx * 2.5;
    slide3.addShape(pres.ShapeType.roundRect, {
      x: 0.8,
      y: yPos,
      w: 8.4,
      h: 2.2,
      fill: { color: 'F0FDF4' },
      line: { color: '86EFAC', width: 1.5 },
    });
    slide3.addText(`Tác giả nhí: ${g.student}`, {
      x: 1.1,
      y: yPos + 0.2,
      w: 7.8,
      h: 0.4,
      fontSize: 12,
      color: PRIMARY_COLOR,
      bold: true,
    });
    slide3.addText(g.quote, {
      x: 1.1,
      y: yPos + 0.6,
      w: 7.8,
      h: 0.9,
      fontSize: 13,
      color: TEXT_DARK,
      italic: true,
    });
    slide3.addText(g.highlight, {
      x: 1.1,
      y: yPos + 1.5,
      w: 7.8,
      h: 0.4,
      fontSize: 11,
      color: ACCENT_COLOR,
      bold: true,
    });
  });

  // --- SLIDE 4: "Góc Bác Cú Soi Lỗi & Gợi Ý Sửa Bài" ---
  const slide4 = pres.addSlide();
  slide4.background = { color: BG_COLOR };
  slide4.addText('3. GÓC BÁC CÚ SOI LỖI - CÙNG NHAU HOÀN THIỆN', {
    x: 0.8,
    y: 0.6,
    w: '85%',
    h: 0.6,
    fontSize: 22,
    color: '#B91C1C', // Rose/Red warning
    bold: true,
  });

  const mistakes = [
    {
      issue: '⚠️ Lỗi 1: Viết câu dài thiếu dấu phẩy ngăn cách trạng ngữ và chủ ngữ',
      example: '“Vào một buổi sáng mùa hạ bầu trời trong xanh chúng em cùng nhau đến trường.”',
      solution: '💡 Socratic gợi ý: “Đâu là nơi chỉ thời gian? Em hãy đặt dấu phẩy để người đọc kịp lấy hơi nhé!”',
    },
    {
      issue: '⚠️ Lỗi 2: Trùng lặp từ ngữ (rất to, rất đẹp, rất vui...)',
      example: '“Chú mèo rất đẹp lông rất mượt mắt rất sáng.”',
      solution: '💡 Thử thách: “Em có thể thay thế bằng từ láy: mượt mà, long lanh, óng ả được không?”',
    },
  ];

  mistakes.forEach((m, idx) => {
    const yPos = 1.6 + idx * 2.5;
    slide4.addShape(pres.ShapeType.roundRect, {
      x: 0.8,
      y: yPos,
      w: 8.4,
      h: 2.2,
      fill: { color: 'FFF1F2' },
      line: { color: 'FECDD3', width: 1.5 },
    });
    slide4.addText(m.issue, {
      x: 1.1,
      y: yPos + 0.2,
      w: 7.8,
      h: 0.4,
      fontSize: 12,
      color: '#991B1B',
      bold: true,
    });
    slide4.addText(`Ví dụ bài làm: ${m.example}`, {
      x: 1.1,
      y: yPos + 0.6,
      w: 7.8,
      h: 0.7,
      fontSize: 12,
      color: TEXT_DARK,
      italic: true,
    });
    slide4.addText(m.solution, {
      x: 1.1,
      y: yPos + 1.4,
      w: 7.8,
      h: 0.5,
      fontSize: 12,
      color: PRIMARY_COLOR,
      bold: true,
    });
  });

  // --- SLIDE 5: Closing & Mission for next week ---
  const slide5 = pres.addSlide();
  slide5.background = { color: '064E3B' };
  slide5.addText('NHIỆM VỤ THÁM HIỂM CHO BÀI VIẾT TIẾP THEO', {
    x: 0.8,
    y: 1.5,
    w: '85%',
    h: 0.6,
    fontSize: 24,
    color: '#FDE68A',
    bold: true,
    align: 'center',
  });
  slide5.addText(
    '🌱 1. Mỗi bạn tự sửa lại ít nhất 2 câu trong bài làm theo câu hỏi gợi ý của Bác Cú.\n' +
    '🌱 2. Tích lũy thêm 3 từ láy mới vào “Sổ tay Rừng Tri Thức”.\n' +
    '🌱 3. Tự hào kể lại bài viết của mình cho bố mẹ nghe vào bữa cơm tối!',
    {
      x: 1.5,
      y: 2.5,
      w: 7.0,
      h: 2.5,
      fontSize: 16,
      color: '#FFFFFF',
      lineSpacing: 28,
    }
  );
  slide5.addText('🦉 Bác Cú chúc các nhà thám hiểm nhí luôn giữ vững ngọn lửa sáng tạo!', {
    x: 0.8,
    y: 5.5,
    w: '85%',
    h: 0.5,
    fontSize: 14,
    color: '#A7F3D0',
    italic: true,
    align: 'center',
  });

  await pres.writeFile({
    fileName: `Tiet_Tra_Bai_Van5_${className.replace(/\s+/g, '_')}_${new Date().toISOString().slice(0, 10)}.pptx`,
  });
}
