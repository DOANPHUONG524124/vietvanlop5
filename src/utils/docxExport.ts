import {
  Document,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  WidthType,
  AlignmentType,
  HeadingLevel,
  BorderStyle,
  Packer,
  ShadingType,
} from 'docx';
import { StudentRecord, EvaluationResult, PillarScores } from '../types/index.ts';

export async function exportStudentEvaluationToDocx(
  student: StudentRecord,
  evaluation: EvaluationResult | null,
  className: string = 'Lớp 5A'
): Promise<void> {
  const teacherData = evaluation?.teacher_dashboard;
  const parentData = evaluation?.parent_report;
  const studentFeedback = evaluation?.phan_hoi_hoc_sinh;

  const scores: PillarScores = teacherData?.diem_so || student.scores || {
    bo_cuc: 8.5,
    von_tu: 8.5,
    ngu_phap: 8.0,
    cam_xuc: 9.0,
    sang_tao: 8.5,
    tong_ket: student.score || 8.5,
  };

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          // Header / School Banner
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: 'TRƯỜNG TIỂU HỌC BAN MAI - HÀNH TRÌNH RỪNG TRI THỨC',
                bold: true,
                size: 20,
                color: '047857',
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: 'Chương trình Bồi dưỡng Năng lực Tiếng Việt & Tư duy Socratic Lớp 5',
                italics: true,
                size: 18,
                color: '64748B',
              }),
            ],
          }),
          new Paragraph({ text: '' }),

          // Document Title
          new Paragraph({
            alignment: AlignmentType.CENTER,
            heading: HeadingLevel.HEADING_1,
            children: [
              new TextRun({
                text: 'PHIẾU ĐÁNH GIÁ NĂNG LỰC TẬP LÀM VĂN',
                bold: true,
                size: 28,
                color: '0F172A',
              }),
            ],
          }),
          new Paragraph({ text: '' }),

          // Student Info Box Table
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    shading: { type: ShadingType.CLEAR, fill: 'F1F5F9' },
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({ text: 'Họ và tên học sinh: ', bold: true }),
                          new TextRun({ text: student.name, bold: true, color: '047857' }),
                        ],
                      }),
                      new Paragraph({
                        children: [
                          new TextRun({ text: 'Mã học sinh: ', bold: true }),
                          new TextRun({ text: student.code || '5A-01' }),
                          new TextRun({ text: '   |   Lớp: ', bold: true }),
                          new TextRun({ text: className }),
                          new TextRun({ text: '   |   Ngày đánh giá: ', bold: true }),
                          new TextRun({ text: new Date().toLocaleDateString('vi-VN') }),
                        ],
                      }),
                      new Paragraph({
                        children: [
                          new TextRun({ text: 'Đề bài / Thể loại: ', bold: true }),
                          new TextRun({ text: student.topic || 'Miêu tả tự nhiên & con người (Lớp 5)' }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
          new Paragraph({ text: '' }),

          // Section 1: 5 Pillars Scorecard Table
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            children: [
              new TextRun({
                text: 'I. KẾT QUẢ ĐÁNH GIÁ 5 CỘT TRỤ NĂNG LỰC NGÔN NGỮ',
                bold: true,
                size: 22,
                color: '1E293B',
              }),
            ],
          }),

          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    shading: { type: ShadingType.CLEAR, fill: 'E2E8F0' },
                    children: [new Paragraph({ children: [new TextRun({ text: 'Tiêu chí đánh giá', bold: true })] })],
                  }),
                  new TableCell({
                    shading: { type: ShadingType.CLEAR, fill: 'E2E8F0' },
                    children: [new Paragraph({ children: [new TextRun({ text: 'Mô tả chuẩn GDPT', bold: true })] })],
                  }),
                  new TableCell({
                    shading: { type: ShadingType.CLEAR, fill: 'E2E8F0' },
                    children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Điểm số (Thang 10)', bold: true })] })],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph('1. Bố cục bài viết')] }),
                  new TableCell({ children: [new Paragraph('Cân đối 3 phần Mở - Thân - Kết; liên kết đoạn mạch lạc')] }),
                  new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `${scores.bo_cuc}/10`, bold: true })] })] }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph('2. Vốn từ Tiếng Việt')] }),
                  new TableCell({ children: [new Paragraph('Sử dụng từ láy gợi hình, gợi cảm, từ ngữ phong phú')] }),
                  new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `${scores.von_tu}/10`, bold: true })] })] }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph('3. Ngữ pháp & Dấu câu')] }),
                  new TableCell({ children: [new Paragraph('Vận dụng câu ghép (quan hệ từ), dùng đúng dấu câu')] }),
                  new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `${scores.ngu_phap}/10`, bold: true })] })] }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph('4. Cảm xúc biểu cảm')] }),
                  new TableCell({ children: [new Paragraph('Tình cảm chân thực, bộc lộ suy nghĩ hồn nhiên')] }),
                  new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `${scores.cam_xuc}/10`, bold: true })] })] }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph('5. Sáng tạo & Tu từ')] }),
                  new TableCell({ children: [new Paragraph('Biện pháp so sánh, nhân hóa giàu hình ảnh, không rập khuôn')] }),
                  new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `${scores.sang_tao}/10`, bold: true })] })] }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    shading: { type: ShadingType.CLEAR, fill: 'DCFCE7' },
                    children: [new Paragraph({ children: [new TextRun({ text: 'ĐIỂM TỔNG KẾT', bold: true, color: '166534' })] })],
                  }),
                  new TableCell({
                    shading: { type: ShadingType.CLEAR, fill: 'DCFCE7' },
                    children: [new Paragraph({ children: [new TextRun({ text: 'Đánh giá chung năng lực ngôn ngữ Lớp 5', bold: true, color: '166534' })] })],
                  }),
                  new TableCell({
                    shading: { type: ShadingType.CLEAR, fill: 'DCFCE7' },
                    children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `${scores.tong_ket}/10`, bold: true, size: 24, color: '166534' })] })],
                  }),
                ],
              }),
            ],
          }),
          new Paragraph({ text: '' }),

          // Section 2: Điểm sáng & Gợi mở Socratic
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            children: [
              new TextRun({
                text: 'II. NHẬN XÉT SƯ PHẠM CỦA BÁC CÚ THÔNG THÁI',
                bold: true,
                size: 22,
                color: '1E293B',
              }),
            ],
          }),

          // Điểm sáng
          new Paragraph({
            children: [
              new TextRun({ text: '🌟 Điểm sáng nổi bật của em: ', bold: true, color: '047857' }),
              new TextRun({
                text:
                  studentFeedback?.diem_sang?.chi_tiet?.join(' ') ||
                  'Bài viết giàu cảm xúc, có nhiều từ láy và cách dùng từ gợi cảm tinh tế.',
              }),
            ],
          }),
          new Paragraph({ text: '' }),

          // Góc gợi mở
          new Paragraph({
            children: [
              new TextRun({ text: '💡 Góc gợi mở Socratic (Em tự hoàn thiện): ', bold: true, color: 'D97706' }),
              new TextRun({
                text:
                  studentFeedback?.goc_goi_mo?.phan_tich_loi ||
                  'Cần chú ý thêm dấu phẩy ngắt vế câu và thử vận dụng thêm câu ghép có quan hệ từ (Mặc dù... nhưng...).',
              }),
            ],
          }),
          new Paragraph({ text: '' }),

          // Section 3: Thư gửi Phụ Huynh & Hoạt động tại nhà
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            children: [
              new TextRun({
                text: 'III. THƯ ĐỒNG HÀNH GỬI PHỤ HUYNH',
                bold: true,
                size: 22,
                color: '1E293B',
              }),
            ],
          }),

          new Paragraph({
            children: [
              new TextRun({
                text:
                  parentData?.thu_gui_phu_huynh ||
                  `Kính gửi Quý Phụ Huynh của em ${student.name}, hôm nay con đã thể hiện bài viết rất tốt, có nhiều nét diễn đạt hồn nhiên và sáng tạo. Kính mong bố mẹ tiếp tục khích lệ tinh thần tự học của con.`,
                italics: true,
              }),
            ],
          }),
          new Paragraph({ text: '' }),

          new Paragraph({
            children: [new TextRun({ text: '🏡 Gợi ý hoạt động đồng hành tại nhà cùng con:', bold: true })],
          }),
          ...(parentData?.hoat_dong_dong_hanh_tai_nha || [
            'Cùng con đọc một mẩu chuyện ngắn mỗi tối và cùng đố nhau tìm các từ láy tả âm thanh hoặc màu sắc.',
            'Trò chơi nối câu ghép khi nấu ăn hoặc đi dạo: Bố mẹ nói vế "Mặc dù...", con sẽ hoàn thành vế "nhưng...".',
            'Khuyến khích con viết nhật ký 3 dòng mỗi ngày ghi lại một khoảnh khắc ấm áp cùng gia đình.',
          ]).map(
            (act) =>
              new Paragraph({
                bullet: { level: 0 },
                children: [new TextRun({ text: act })],
              })
          ),
          new Paragraph({ text: '' }),
          new Paragraph({ text: '' }),

          // Signature Block
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Ý KIẾN PHỤ HUYNH', bold: true })] }),
                      new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '(Ký và ghi rõ họ tên)', italics: true })] }),
                      new Paragraph({ text: '' }),
                      new Paragraph({ text: '' }),
                      new Paragraph({ text: '' }),
                    ],
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'GIÁO VIÊN / BÁC CÚ THÔNG THÁI', bold: true, color: '047857' })] }),
                      new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '(Xác nhận kết quả đánh giá)', italics: true })] }),
                      new Paragraph({ text: '' }),
                      new Paragraph({ text: '' }),
                      new Paragraph({ text: '' }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `Phieu_Danh_Gia_Van5_${student.name.replace(/\s+/g, '_')}_${new Date().toISOString().slice(0, 10)}.docx`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
