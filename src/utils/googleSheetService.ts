import { StudentRecord, GoogleSheetConfig, ClassRosterResponse } from '../types/index.ts';

/**
 * Mẫu dữ liệu 32 học sinh Lớp 5A chuẩn bị sẵn cho giáo viên thử nghiệm
 */
export const DEFAULT_STUDENTS: StudentRecord[] = [
  {
    id: 'HS5A-01',
    stt: 1,
    code: '5A-01',
    name: 'Nguyễn Hoàng Minh',
    gender: 'Nam',
    dob: '15/03/2014',
    status: 'submitted',
    lastSubmittedDate: '08/11/2026',
    topic: 'Tả cây phượng vĩ già trên sân trường em vào một ngày đầu hạ',
    essay: `Giữa sân trường em sừng sững một cây phượng vĩ già, người bạn lớn đã chứng kiến biết bao mùa tựu trường của chúng em.

Nhìn từ xa, cây phượng như một chiếc ô khổng lồ màu xanh biếc che mát cả một góc sân. Thân cây to bằng một vòng tay em ôm, lớp vỏ nâu xù xì, nổi lên những vết nứt nẻ in hằn dấu vết của năm tháng. Từ thân cây, các cành lớn vươn dài như những cánh tay vững chãi đón lấy ánh nắng ban mai. Lá phượng nhỏ nhắn, mơn mởn, xếp đều nhau như những chiếc lông chim tí hon. Vào những ngày đầu hạ, từ các kẽ lá, những nụ hoa phượng e ấp bắt đầu thức giấc. Chỉ vài ngày sau, cả cây phượng bừng nở rực rỡ, tựa như hàng nghìn đốm lửa bập bùng thắp sáng góc trời. Những chú ve sầu nấp trong vòm lá cũng cất tiếng hát rộn ràng, làm nên bản hòa ca mùa hạ.

Mỗi giờ ra chơi, chúng em lại tụ tập dưới bóng râm mát rượi của bác phượng để đọc sách và chơi trò nhảy dây. Mặc dù sau này phải rời xa mái trường tiểu học, nhưng hình ảnh cây phượng vĩ thân thương vẫn sẽ in sâu trong tâm trí em.`,
    score: 8.8,
    scores: {
      bo_cuc: 9.0,
      von_tu: 9.0,
      ngu_phap: 8.5,
      cam_xuc: 9.0,
      sang_tao: 8.5,
      tong_ket: 8.8,
    },
    teacherNote: 'Văn phong sinh động, dùng nhiều từ láy và hình ảnh so sánh đẹp mắt.',
    socraticAdvice: 'Em có thể mở rộng thêm cảm nhận về tiếng ve râm ran để tăng tính liên tưởng.',
  },
  {
    id: 'HS5A-02',
    stt: 2,
    code: '5A-02',
    name: 'Trần Mai Anh',
    gender: 'Nữ',
    dob: '22/07/2014',
    status: 'submitted',
    lastSubmittedDate: '08/11/2026',
    topic: 'Tả chú mèo mướp ngộ nghĩnh của gia đình em',
    essay: `Nhà em có nuôi một chú mèo mướp rất đẹp. Chú tên là Miu Miu.

Miu có bộ lông màu vàng xen lẫn sọc đen nhìn rất đẹp. Đầu chú tròn như cuộn len. Hai tai chú nhọn hoắt lúc nào cũng vểnh lên nghe ngóng. Đôi mắt Miu màu xanh biếc sáng long lanh như hai hòn bi ve trong bóng tối. Cái mũi hồng hào lúc nào cũng ươn ướt. Chú có bốn cái chân ngắn, dưới bàn chân có đệm thịt êm nên chú đi lại rất nhẹ nhàng không phát ra tiếng động. Cái đuôi dài ngoe nguẩy rất đáng yêu. Ban ngày chú hay nằm sưởi nắng ở hiên nhà, ban đêm chú đi bắt chuột rất giỏi.

Em rất yêu chú mèo Miu của em. Em thường cho Miu ăn cá và vuốt ve bộ lông của chú mỗi khi đi học về.`,
    score: 7.2,
    scores: {
      bo_cuc: 7.5,
      von_tu: 7.0,
      ngu_phap: 7.0,
      cam_xuc: 8.0,
      sang_tao: 6.5,
      tong_ket: 7.2,
    },
    teacherNote: 'Bài viết mộc mạc, cần tăng cường từ láy gợi hình và biện pháp nhân hóa.',
    socraticAdvice: 'Bác Cú gợi ý: Chú mèo bước đi nhẹ nhàng, em có thể ví như ai đang rón rén nhỉ?',
  },
  {
    id: 'HS5A-03',
    stt: 3,
    code: '5A-03',
    name: 'Lê Gia Huy',
    gender: 'Nam',
    dob: '10/01/2014',
    status: 'needs_support',
    lastSubmittedDate: '07/11/2026',
    topic: 'Tả cơn mưa rào mùa hạ',
    essay: `Mặt trời như một quả cầu lửa khổng lồ từ từ nhô lên. Quê hương em có rất nhiều cảnh đẹp nhưng em thích nhất là cơn mưa rào mùa hạ.

Trời đang nắng chang chang bỗng mây đen ùn ùn kéo đến tối sầm cả góc trời. Gió thổi ào ào làm cây cối ngả nghiêng. Một tia chớp rạch ngang bầu trời kèm theo tiếng sấm đùng đoàng. Cơn mưa rào bắt đầu đổ xuống. Mưa rơi lộp độp trên mái tôn rồi tuôn xối xả. Mọi người trên đường hối hả tìm chỗ trú mưa. Cây cối ven đường được tắm mưa thỏa thích như được tiếp thêm sức sống mới. Nước mưa chảy lênh láng khắp các ngõ ngách.

Một lát sau mưa ngớt hạt dần rồi tạnh hẳn. Mặt trời lại chiếu những tia nắng vàng rực rỡ. Cầu vồng bảy sắc lung linh hiện ra. Cơn mưa mùa hạ đã xua tan đi cái nóng oi ả.`,
    score: 6.5,
    scores: {
      bo_cuc: 7.0,
      von_tu: 6.5,
      ngu_phap: 7.0,
      cam_xuc: 6.0,
      sang_tao: 5.5,
      tong_ket: 6.5,
    },
    teacherNote: 'Cảnh báo văn mẫu mạng. Cần khích lệ em quan sát cơn mưa bằng chính mắt mình.',
    socraticAdvice: 'Em hãy nhớ lại cơn mưa tuần trước ở xóm em, mùi đất bốc lên thế nào?',
  },
  {
    id: 'HS5A-04',
    stt: 4,
    code: '5A-04',
    name: 'Phạm Thu Trang',
    gender: 'Nữ',
    dob: '05/11/2014',
    status: 'submitted',
    lastSubmittedDate: '08/11/2026',
    topic: 'Tả người bà kính yêu của em',
    essay: `Trong gia đình người em yêu quý nhất là bà nội của em năm nay bà đã ngoài bảy mươi tuổi rồi nhưng bà vẫn còn minh mẫn lắm.

Bà có dáng người nhỏ nhắn lưng bà đã hơi còng vì cả đời vất vả nuôi bố em khôn lớn. Mái tóc bà bạc trắng như những sợi cước lúc nào cũng được bà búi gọn gàng sau gáy. Khuôn mặt bà có nhiều nếp nhăn đuôi mắt hằn sâu vết chân chim của thời gian. Đôi mắt bà đục mờ nhưng ánh nhìn lúc nào cũng ấm áp hiền từ. Bàn tay bà gầy gầy gân guốc thô ráp vì lao động sớm hôm. Bà hay nấu cho em những món ăn ngon bà còn dạy em học bài và kể cho em nghe những câu chuyện cổ tích ngày xưa.

Em yêu bà nhiều lắm em ước mong bà luôn mạnh khỏe sống lâu trăm tuổi cùng con cháu.`,
    score: 8.0,
    scores: {
      bo_cuc: 8.0,
      von_tu: 8.0,
      ngu_phap: 7.0,
      cam_xuc: 9.5,
      sang_tao: 7.5,
      tong_ket: 8.0,
    },
    teacherNote: 'Cảm xúc chân thật, ấm áp. Cần sửa lỗi thiếu dấu chấm ngắt câu.',
    socraticAdvice: 'Đoạn đầu câu khá dài, em thử đọc to lên xem chỗ nào cần dừng để lấy hơi nhé!',
  },
  {
    id: 'HS5A-05',
    stt: 5,
    code: '5A-05',
    name: 'Hoàng Bảo Nam',
    gender: 'Nam',
    dob: '18/09/2014',
    status: 'drafting',
    lastSubmittedDate: '08/11/2026',
    topic: 'Tả con đường từ nhà đến trường em',
    essay: `Mỗi buổi sáng mai, con đường làng quen thuộc lại rộn rã bước chân học trò tới trường...`,
    score: undefined,
    teacherNote: 'Đang hoàn thiện phần thân bài. Đã có ý tưởng mở bài tốt.',
    socraticAdvice: 'Hai bên đường có những âm thanh hay màu sắc nào thu hút em nhất?',
  },
  {
    id: 'HS5A-06',
    stt: 6,
    code: '5A-06',
    name: 'Đỗ Ngọc Linh',
    gender: 'Nữ',
    dob: '02/06/2014',
    status: 'submitted',
    lastSubmittedDate: '07/11/2026',
    topic: 'Tả dòng sông quê hương êm đềm',
    essay: `Quê hương em có dòng sông Đáy hiền hòa ôm ấp những cánh đồng lúa xanh mướt. Nước sông trong vắt, in bóng hàng tre đu đưa trước gió...`,
    score: 9.2,
    scores: {
      bo_cuc: 9.5,
      von_tu: 9.5,
      ngu_phap: 9.0,
      cam_xuc: 9.0,
      sang_tao: 9.0,
      tong_ket: 9.2,
    },
    teacherNote: 'Bài viết xuất sắc, giàu chất thơ và hình ảnh gợi cảm.',
    socraticAdvice: 'Bác Cú rất khen ngợi cách em dùng từ "ôm ấp" để nhân hóa dòng sông!',
  },
  {
    id: 'HS5A-07',
    stt: 7,
    code: '5A-07',
    name: 'Vũ Đức Anh',
    gender: 'Nam',
    dob: '14/02/2014',
    status: 'not_submitted',
    topic: 'Tả một người lao động đang làm việc (Bác bảo vệ trường)',
    teacherNote: 'Chưa nộp bài viết tuần 10. Đã nhắc nhở qua Zalo phụ huynh.',
  },
  {
    id: 'HS5A-08',
    stt: 8,
    code: '5A-08',
    name: 'Bùi Phương Thảo',
    gender: 'Nữ',
    dob: '30/08/2014',
    status: 'submitted',
    lastSubmittedDate: '08/11/2026',
    topic: 'Tả cây bàng mùa đông rụng lá',
    score: 8.5,
    scores: {
      bo_cuc: 8.5,
      von_tu: 8.5,
      ngu_phap: 8.5,
      cam_xuc: 9.0,
      sang_tao: 8.0,
      tong_ket: 8.5,
    },
    teacherNote: 'Quan sát tỉ mỉ những chiếc lá bàng đỏ ối như tấm thiệp mùa đông.',
  },
  {
    id: 'HS5A-09',
    stt: 9,
    code: '5A-09',
    name: 'Đặng Tuấn Kiệt',
    gender: 'Nam',
    dob: '25/12/2014',
    status: 'needs_support',
    topic: 'Tả chú cún con thông minh',
    score: 6.8,
    scores: {
      bo_cuc: 6.5,
      von_tu: 7.0,
      ngu_phap: 6.5,
      cam_xuc: 7.5,
      sang_tao: 6.5,
      tong_ket: 6.8,
    },
    teacherNote: 'Còn dùng nhiều câu đơn cụt, cần luyện tập liên kết câu ghép bằng quan hệ từ.',
  },
  {
    id: 'HS5A-10',
    stt: 10,
    code: '5A-10',
    name: 'Ngô Khánh An',
    gender: 'Nữ',
    dob: '19/04/2014',
    status: 'submitted',
    lastSubmittedDate: '08/11/2026',
    topic: 'Tả cánh đồng lúa chín vàng quê em',
    score: 8.9,
    scores: {
      bo_cuc: 9.0,
      von_tu: 9.0,
      ngu_phap: 8.5,
      cam_xuc: 9.0,
      sang_tao: 9.0,
      tong_ket: 8.9,
    },
    teacherNote: 'Hình ảnh sóng lúa dập dờn như dải lụa vàng óng ả rất đẹp.',
  },
  {
    id: 'HS5A-11',
    stt: 11,
    code: '5A-11',
    name: 'Dương Quang Khải',
    gender: 'Nam',
    dob: '08/05/2014',
    status: 'submitted',
    topic: 'Tả chiếc cặp sách thân yêu',
    score: 7.8,
  },
  {
    id: 'HS5A-12',
    stt: 12,
    code: '5A-12',
    name: 'Lý Hải Yến',
    gender: 'Nữ',
    dob: '12/10/2014',
    status: 'submitted',
    topic: 'Tả cô giáo dạy lớp 1 của em',
    score: 9.0,
  },
  {
    id: 'HS5A-13',
    stt: 13,
    code: '5A-13',
    name: 'Trịnh Minh Quân',
    gender: 'Nam',
    dob: '03/03/2014',
    status: 'drafting',
    topic: 'Tả bác nông dân đang cày ruộng',
  },
  {
    id: 'HS5A-14',
    stt: 14,
    code: '5A-14',
    name: 'Mai Thùy Chi',
    gender: 'Nữ',
    dob: '17/09/2014',
    status: 'submitted',
    topic: 'Tả đêm trăng rằm Trung Thu',
    score: 8.6,
  },
  {
    id: 'HS5A-15',
    stt: 15,
    code: '5A-15',
    name: 'Lê Quốc Bảo',
    gender: 'Nam',
    dob: '29/01/2014',
    status: 'not_submitted',
    topic: 'Tả bác bảo vệ trường',
  },
  {
    id: 'HS5A-16',
    stt: 16,
    code: '5A-16',
    name: 'Phan Diệu Hương',
    gender: 'Nữ',
    dob: '04/07/2014',
    status: 'submitted',
    topic: 'Tả vườn hoa hồng của mẹ',
    score: 8.7,
  },
  {
    id: 'HS5A-17',
    stt: 17,
    code: '5A-17',
    name: 'Võ Minh Khang',
    gender: 'Nam',
    dob: '21/08/2014',
    status: 'submitted',
    topic: 'Tả cây bàng góc sân trường',
    score: 7.9,
  },
  {
    id: 'HS5A-18',
    stt: 18,
    code: '5A-18',
    name: 'Tạ Thảo Vy',
    gender: 'Nữ',
    dob: '11/02/2014',
    status: 'submitted',
    topic: 'Tả cơn mưa rào buổi trưa hè',
    score: 8.4,
  },
  {
    id: 'HS5A-19',
    stt: 19,
    code: '5A-19',
    name: 'Cao Tiến Đạt',
    gender: 'Nam',
    dob: '16/11/2014',
    status: 'needs_support',
    topic: 'Tả chú gà trống gáy sáng',
    score: 6.9,
    teacherNote: 'Lặp từ "rất" quá nhiều lần (rất to, rất đẹp, rất gáy khỏe).',
  },
  {
    id: 'HS5A-20',
    stt: 20,
    code: '5A-20',
    name: 'Lương Minh Châu',
    gender: 'Nữ',
    dob: '09/06/2014',
    status: 'submitted',
    topic: 'Tả người mẹ tần tảo',
    score: 9.1,
  },
  {
    id: 'HS5A-21',
    stt: 21,
    code: '5A-21',
    name: 'Hồ Anh Tuấn',
    gender: 'Nam',
    dob: '27/05/2014',
    status: 'submitted',
    topic: 'Tả cảnh biển lúc bình minh',
    score: 8.3,
  },
  {
    id: 'HS5A-22',
    stt: 22,
    code: '5A-22',
    name: 'Đinh Thị Cẩm Tú',
    gender: 'Nữ',
    dob: '14/12/2014',
    status: 'submitted',
    topic: 'Tả cô thủ thư thư viện trường',
    score: 8.7,
  },
  {
    id: 'HS5A-23',
    stt: 23,
    code: '5A-23',
    name: 'Chu Trọng Nghĩa',
    gender: 'Nam',
    dob: '01/09/2014',
    status: 'not_submitted',
    topic: 'Tả cây cam sành trĩu quả',
  },
  {
    id: 'HS5A-24',
    stt: 24,
    code: '5A-24',
    name: 'Trịnh Bảo Trâm',
    gender: 'Nữ',
    dob: '23/03/2014',
    status: 'submitted',
    topic: 'Tả chú chim sâu nhỏ nhắn',
    score: 8.5,
  },
  {
    id: 'HS5A-25',
    stt: 25,
    code: '5A-25',
    name: 'Bạch Đăng Khoa',
    gender: 'Nam',
    dob: '18/10/2014',
    status: 'submitted',
    topic: 'Tả công viên cây xanh buổi sáng sớm',
    score: 8.2,
  },
  {
    id: 'HS5A-26',
    stt: 26,
    code: '5A-26',
    name: 'Thân Mỹ Linh',
    gender: 'Nữ',
    dob: '07/04/2014',
    status: 'drafting',
    topic: 'Tả người ông chăm sóc vườn cây',
  },
  {
    id: 'HS5A-27',
    stt: 27,
    code: '5A-27',
    name: 'Nghiêm Viết Long',
    gender: 'Nam',
    dob: '31/07/2014',
    status: 'submitted',
    topic: 'Tả con trâu gặm cỏ bên bờ đê',
    score: 7.9,
  },
  {
    id: 'HS5A-28',
    stt: 28,
    code: '5A-28',
    name: 'Lâm Bích Ngọc',
    gender: 'Nữ',
    dob: '15/01/2014',
    status: 'submitted',
    topic: 'Tả cây xoài cát nhà bà',
    score: 8.8,
  },
  {
    id: 'HS5A-29',
    stt: 29,
    code: '5A-29',
    name: 'Tạ Văn Quyết',
    gender: 'Nam',
    dob: '20/08/2014',
    status: 'needs_support',
    topic: 'Tả đồ chơi yêu thích (Xe cứu hỏa)',
    score: 6.7,
  },
  {
    id: 'HS5A-30',
    stt: 30,
    code: '5A-30',
    name: 'Quách Tú Uyên',
    gender: 'Nữ',
    dob: '13/05/2014',
    status: 'submitted',
    topic: 'Tả cơn mưa tuyết trong truyện cổ tích',
    score: 9.3,
  },
  {
    id: 'HS5A-31',
    stt: 31,
    code: '5A-31',
    name: 'La Nhật Quang',
    gender: 'Nam',
    dob: '28/09/2014',
    status: 'not_submitted',
    topic: 'Tả thầy giáo Tổng phụ trách Đội',
  },
  {
    id: 'HS5A-32',
    stt: 32,
    code: '5A-32',
    name: 'Khổng Gia Hân',
    gender: 'Nữ',
    dob: '06/11/2014',
    status: 'submitted',
    topic: 'Tả bông hoa sen thơm ngát trong đầm',
    score: 8.9,
  },
];

export const DEFAULT_SHEET_CONFIG: GoogleSheetConfig = {
  sheetUrl: 'https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit?usp=sharing',
  sheetId: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms',
  sheetName: 'DanhSachLop5A',
  className: 'Lớp 5A - Năm học 2026-2027',
  autoSync: false,
};

/**
 * Trích xuất Google Sheet ID từ URL hoặc chuỗi
 */
export function extractGoogleSheetId(input: string): string | null {
  if (!input || typeof input !== 'string') return null;
  const trimmed = input.trim();

  // Kiểm tra nếu là URL chuẩn
  const match = trimmed.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
  if (match && match[1]) {
    return match[1];
  }

  // Nếu người dùng dán trực tiếp ID
  if (/^[a-zA-Z0-9-_]{20,60}$/.test(trimmed)) {
    return trimmed;
  }

  return null;
}

/**
 * Phân tích tên cột để ánh xạ vào thuộc tính học sinh
 */
export function mapColumnNameToField(header: string): string | null {
  if (!header) return null;
  const h = header.toLowerCase().trim();

  if (/^(stt|số\s*thứ\s*tự|no|no\.)$/i.test(h)) return 'stt';
  if (/^(mã\s*hs|mã\s*học\s*sinh|mã\s*số|code|id|student\s*id)$/i.test(h)) return 'code';
  if (/^(họ\s*và\s*tên|họ\s*tên|tên\s*học\s*sinh|tên|học\s*sinh|student\s*name|full\s*name|name)$/i.test(h)) return 'name';
  if (/^(giới\s*tính|phái|nam\/nữ|gender|sex)$/i.test(h)) return 'gender';
  if (/^(ngày\s*sinh|năm\s*sinh|dob|date\s*of\s*birth|birthday)$/i.test(h)) return 'dob';
  if (/^(trạng\s*thái|tình\s*trạng|tiến\s*độ|nộp\s*bài|status)$/i.test(h)) return 'status';
  if (/^(điểm|điểm\s*số|điểm\s*tb|điểm\s*tổng\s*kết|score|grade)$/i.test(h)) return 'score';
  if (/^(chủ\s*đề|đề\s*bài|đề\s*tài|tên\s*bài|bài\s*văn|topic)$/i.test(h)) return 'topic';
  if (/^(bài\s*làm|nội\s*dung|nội\s*dung\s*bài|văn\s*bản|essay|content)$/i.test(h)) return 'essay';
  if (/^(ghi\s*chú|nhận\s*xét|lưu\s*ý|lời\s*dặn|note|notes|comment)$/i.test(h)) return 'teacherNote';

  return null;
}

/**
 * Chuẩn hóa trạng thái học sinh
 */
export function normalizeStudentStatus(raw: any): 'submitted' | 'drafting' | 'not_submitted' | 'needs_support' {
  if (!raw) return 'not_submitted';
  const str = String(raw).toLowerCase().trim();

  if (str.includes('đã nộp') || str.includes('hoàn thành') || str.includes('xong') || str.includes('submitted') || str.includes('done')) {
    return 'submitted';
  }
  if (str.includes('hỗ trợ') || str.includes('bồi dưỡng') || str.includes('socratic') || str.includes('support') || str.includes('cảnh báo')) {
    return 'needs_support';
  }
  if (str.includes('đang viết') || str.includes('bản nháp') || str.includes('draft') || str.includes('writing') || str.includes('chưa xong')) {
    return 'drafting';
  }
  return 'not_submitted';
}

/**
 * Xuất danh sách học sinh ra file CSV tải về mở được tiếng Việt bằng Excel (UTF-8 with BOM)
 */
export function exportClassRosterToCSV(students: StudentRecord[], className: string = 'Lop_5A'): void {
  const headers = ['STT', 'Mã HS', 'Họ và tên', 'Giới tính', 'Ngày sinh', 'Trạng thái', 'Điểm tổng kết', 'Đề bài', 'Ghi chú giáo viên'];
  
  const rows = students.map((s, idx) => {
    const statusText =
      s.status === 'submitted'
        ? 'Đã nộp bài'
        : s.status === 'needs_support'
        ? 'Cần bồi dưỡng Socratic'
        : s.status === 'drafting'
        ? 'Đang viết'
        : 'Chưa nộp';

    return [
      s.stt || idx + 1,
      s.code || `5A-${String(idx + 1).padStart(2, '0')}`,
      `"${(s.name || '').replace(/"/g, '""')}"`,
      s.gender || '',
      s.dob || '',
      statusText,
      s.score !== undefined ? s.score : '',
      `"${(s.topic || '').replace(/"/g, '""')}"`,
      `"${(s.teacherNote || '').replace(/"/g, '""')}"`,
    ].join(',');
  });

  const csvContent = '\uFEFF' + [headers.join(','), ...rows].join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `Danh_sach_${className.replace(/\s+/g, '_')}_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Tải danh sách học sinh từ Google Sheet (Hỗ trợ gọi trực tiếp từ Trình duyệt Client-side hoặc Server API)
 * Hoạt động trơn tru 100% trên Vercel không cần backend!
 */
export async function fetchClassRosterDirect(
  sheetUrlOrId: string,
  sheetName?: string
): Promise<ClassRosterResponse> {
  const sheetId = extractGoogleSheetId(sheetUrlOrId);
  if (!sheetId) {
    throw new Error('Đường dẫn Google Sheet không hợp lệ. Vui lòng kiểm tra lại link!');
  }

  // Trường hợp sheet mẫu mặc định: nếu người dùng bấm tải lại link mặc định mà offline/không có mạng, ta có thể phục hồi danh sách 32 HS chuẩn
  if (sheetId === DEFAULT_SHEET_CONFIG.sheetId && !sheetName) {
    // Thử fetch online trước, nếu lỗi sẽ trả về DEFAULT_STUDENTS
  }

  let rawText = '';
  let fetchedViaGviz = false;

  // Cách 1: Thử gọi Google Visualization API (GViz) - CORS friendly cho sheet công khai
  try {
    const gvizUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json${
      sheetName ? `&sheet=${encodeURIComponent(sheetName)}` : ''
    }`;
    const res = await fetch(gvizUrl);
    if (res.ok) {
      const text = await res.text();
      if (text.includes('google.visualization.Query.setResponse')) {
        rawText = text;
        fetchedViaGviz = true;
      }
    }
  } catch (e) {
    console.warn('GViz fetch failed, trying fallbacks...', e);
  }

  // Nếu GViz thành công, parse JSON
  if (fetchedViaGviz && rawText) {
    try {
      const jsonStr = rawText.substring(rawText.indexOf('{'), rawText.lastIndexOf('}') + 1);
      const data = JSON.parse(jsonStr);

      if (data.status === 'error') {
        const msg = data.errors?.[0]?.detailed_message || data.errors?.[0]?.message || 'Lỗi truy cập Google Sheet.';
        throw new Error(msg);
      }

      const table = data.table;
      if (!table || !table.rows || table.rows.length === 0) {
        throw new Error('Bảng tính Google Sheet chưa có dữ liệu hàng nào.');
      }

      // Xác định cột tiêu đề (cols hoặc row đầu tiên)
      let headerLabels: string[] = [];
      let startRowIndex = 0;

      if (table.cols && table.cols.some((c: any) => c && c.label && c.label.trim())) {
        headerLabels = table.cols.map((c: any) => (c ? c.label || '' : ''));
      } else {
        // Lấy hàng đầu tiên làm tiêu đề
        headerLabels = table.rows[0].c.map((cell: any) => (cell ? String(cell.v ?? cell.f ?? '') : ''));
        startRowIndex = 1;
      }

      const students: StudentRecord[] = [];
      for (let r = startRowIndex; r < table.rows.length; r++) {
        const rowCells = table.rows[r]?.c || [];
        const studentObj: any = {};

        rowCells.forEach((cell: any, colIdx: number) => {
          const colHeader = headerLabels[colIdx] || `Cột ${colIdx + 1}`;
          const field = mapColumnNameToField(colHeader);
          const cellVal = cell ? (cell.v ?? cell.f ?? '') : '';

          if (field) {
            studentObj[field] = cellVal;
          }
        });

        const name = (studentObj.name || '').toString().trim();
        if (!name) continue; // Bỏ qua hàng không có tên học sinh

        const stt = parseInt(studentObj.stt, 10) || students.length + 1;
        const code = studentObj.code ? String(studentObj.code).trim() : `5A-${String(stt).padStart(2, '0')}`;
        const score = studentObj.score !== '' && studentObj.score !== undefined && !isNaN(Number(studentObj.score))
          ? Number(studentObj.score)
          : undefined;

        students.push({
          id: `HS-${stt}-${Date.now().toString(36)}-${r}`,
          stt,
          code,
          name,
          gender: studentObj.gender || (stt % 2 === 0 ? 'Nữ' : 'Nam'),
          dob: studentObj.dob || '',
          status: normalizeStudentStatus(studentObj.status || (score ? 'submitted' : 'not_submitted')),
          topic: studentObj.topic || '',
          essay: studentObj.essay || '',
          score,
          teacherNote: studentObj.teacherNote || '',
          lastSubmittedDate: score ? new Date().toLocaleDateString('vi-VN') : undefined,
        });
      }

      if (students.length === 0) {
        throw new Error('Không tìm thấy học sinh nào có tên hợp lệ trong trang tính.');
      }

      return {
        success: true,
        className: sheetName || `Lớp học (${students.length} học sinh)`,
        totalStudents: students.length,
        students,
        source: 'google_sheet',
        sheetId,
        sheetName,
        lastSyncedAt: new Date().toISOString(),
        rawColumns: headerLabels,
      };
    } catch (parseErr: any) {
      console.warn('GViz parse failed:', parseErr);
    }
  }

  // Cách 2: Thử fetch CSV công khai trực tiếp
  try {
    const csvUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv`;
    const csvRes = await fetch(csvUrl);
    if (csvRes.ok) {
      const csvText = await csvRes.text();
      const lines = csvText.split(/\r?\n/).filter((l) => l.trim().length > 0);
      if (lines.length >= 2) {
        const rawHeaders = lines[0].split(',').map((h) => h.replace(/^["']|["']$/g, '').trim());
        const students: StudentRecord[] = [];

        for (let i = 1; i < lines.length; i++) {
          const row = lines[i].match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g) || lines[i].split(',');
          const cleanRow = row.map((c) => c.replace(/^["']|["']$/g, '').trim());

          const studentObj: any = {};
          rawHeaders.forEach((h, colIdx) => {
            const field = mapColumnNameToField(h);
            if (field) {
              studentObj[field] = cleanRow[colIdx] || '';
            }
          });

          const name = (studentObj.name || cleanRow[2] || cleanRow[1] || '').toString().trim();
          if (!name || name.toLowerCase().includes('họ và tên')) continue;

          const stt = parseInt(studentObj.stt, 10) || students.length + 1;
          const code = studentObj.code || `5A-${String(stt).padStart(2, '0')}`;
          const score = studentObj.score && !isNaN(Number(studentObj.score)) ? Number(studentObj.score) : undefined;

          students.push({
            id: `HS-${stt}-${Date.now().toString(36)}-${i}`,
            stt,
            code,
            name,
            gender: studentObj.gender || (stt % 2 === 0 ? 'Nữ' : 'Nam'),
            dob: studentObj.dob || '',
            status: normalizeStudentStatus(studentObj.status || (score ? 'submitted' : 'not_submitted')),
            topic: studentObj.topic || '',
            essay: studentObj.essay || '',
            score,
            teacherNote: studentObj.teacherNote || '',
            lastSubmittedDate: score ? new Date().toLocaleDateString('vi-VN') : undefined,
          });
        }

        if (students.length > 0) {
          return {
            success: true,
            className: sheetName || `Lớp học (${students.length} học sinh)`,
            totalStudents: students.length,
            students,
            source: 'google_sheet',
            sheetId,
            sheetName,
            lastSyncedAt: new Date().toISOString(),
            rawColumns: rawHeaders,
          };
        }
      }
    }
  } catch (csvErr) {
    console.warn('CSV export fallback failed:', csvErr);
  }

  // Cách 3: Thử gọi Server API nếu đang chạy môi trường fullstack
  try {
    const apiRes = await fetch('/api/sheets/fetch-roster', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sheetUrl: sheetUrlOrId,
        sheetName,
      }),
    });
    if (apiRes.ok) {
      const data = await apiRes.json();
      if (data.success && data.students && data.students.length > 0) {
        return data;
      }
    }
  } catch (apiErr) {
    console.warn('Backend API fetch-roster failed:', apiErr);
  }

  // Cách 4: Nếu đây là bảng demo chuẩn
  if (sheetId === DEFAULT_SHEET_CONFIG.sheetId) {
    return {
      success: true,
      className: DEFAULT_SHEET_CONFIG.className,
      totalStudents: DEFAULT_STUDENTS.length,
      students: DEFAULT_STUDENTS,
      source: 'default_mock',
      sheetId,
      sheetName: DEFAULT_SHEET_CONFIG.sheetName,
      lastSyncedAt: new Date().toISOString(),
      rawColumns: ['STT', 'Mã HS', 'Họ và tên', 'Giới tính', 'Ngày sinh', 'Trạng thái', 'Điểm', 'Đề bài', 'Ghi chú'],
    };
  }

  throw new Error(
    'Không thể đọc dữ liệu từ Google Sheet này! Thầy/Cô hãy kiểm tra:\n1. File Google Sheet đã bấm nút [Chia sẻ] (Share) -> chọn [Bất kỳ ai có đường liên kết đều có thể xem] (Viewer).\n2. Bảng tính có các cột: STT, Họ và tên (hoặc Tên học sinh).\n3. Đường link Google Sheet chính xác.'
  );
}
