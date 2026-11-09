/**
 * Grade 5 Vietnamese Vocabulary & Rhetorical Device Bank
 * Kho từ vựng & Cẩm nang tu từ Văn Lớp 5 cho học sinh Tiểu học
 */

export interface VocabWord {
  text: string;
  category: 'tu_lay' | 'so_sanh' | 'nhan_hoa' | 'mo_bai' | 'ket_bai' | 'cau_ghep';
  categoryLabel: string;
  meaning: string;
  example: string;
}

export interface VocabTopic {
  id: string;
  title: string;
  icon: string;
  description: string;
  suggestedKeywords: string[];
  words: VocabWord[];
}

export const VOCABULARY_TOPICS: VocabTopic[] = [
  {
    id: 'canh_thien_nhien',
    title: 'Miêu Tả Cảnh Đẹp (Sân trường, Dòng sông, Cánh đồng, Bình minh)',
    icon: '🌳',
    description: 'Từ láy gợi hình, âm thanh thiên nhiên, nghệ thuật so sánh và nhân hóa cảnh vật.',
    suggestedKeywords: ['cây phượng', 'sân trường', 'dòng sông', 'bình minh', 'cánh đồng', 'cơn mưa'],
    words: [
      {
        text: 'rực rỡ',
        category: 'tu_lay',
        categoryLabel: 'Từ láy',
        meaning: 'Ánh sáng hoặc màu sắc tươi sáng, đẹp đẽ và nổi bật.',
        example: 'Những chùm hoa phượng rực rỡ như thắp lửa giữa vòm trời xanh.',
      },
      {
        text: 'xào xạc',
        category: 'tu_lay',
        categoryLabel: 'Từ láy',
        meaning: 'Âm thanh của lá cây khô hay cành lá cọ vào nhau do gió thổi.',
        example: 'Gió sớm thổi qua khiến tán lá bàng khẽ xào xạc như lời thì thầm.',
      },
      {
        text: 'mênh mông',
        category: 'tu_lay',
        categoryLabel: 'Từ láy',
        meaning: 'Không gian rộng lớn, trải dài bao la tít tắp.',
        example: 'Cánh đồng lúa chín vàng mênh mông như một tấm thảm lụa khổng lồ.',
      },
      {
        text: 'lung linh',
        category: 'tu_lay',
        categoryLabel: 'Từ láy',
        meaning: 'Ánh sáng phản chiếu chập chờn, lay động óng ánh.',
        example: 'Những hạt sương mai lung linh tựa muôn viên pha lê trên phiến lá.',
      },
      {
        text: 'róc rách',
        category: 'tu_lay',
        categoryLabel: 'Từ láy',
        meaning: 'Tiếng nước chảy luồn qua khe đá nhẹ nhàng, trong trẻo.',
        example: 'Dòng suối trong veo chảy róc rách suốt ngày đêm như bản nhạc vui tươi.',
      },
      {
        text: 'tựa như một chiếc ô khổng lồ màu ngọc bích',
        category: 'so_sanh',
        categoryLabel: 'Hình ảnh so sánh',
        meaning: 'So sánh vòm lá cây to lớn, xòe rộng che mát góc sân.',
        example: 'Cây đa cổ thụ đứng sừng sững, tựa như một chiếc ô khổng lồ màu ngọc bích.',
      },
      {
        text: 'uốn lượn như dải lụa mềm vắt ngang làng quê',
        category: 'so_sanh',
        categoryLabel: 'Hình ảnh so sánh',
        meaning: 'So sánh dòng sông êm đềm với dải lụa mềm mại.',
        example: 'Dòng sông quê hương hiền hòa uốn lượn như dải lụa mềm vắt ngang làng quê.',
      },
      {
        text: 'những giọt nắng tinh nghịch nhảy nhót qua từng kẽ lá',
        category: 'nhan_hoa',
        categoryLabel: 'Nhân hóa',
        meaning: 'Tả ánh nắng như những em bé tinh nghịch vui đùa.',
        example: 'Sáng sớm, những giọt nắng tinh nghịch nhảy nhót qua từng kẽ lá non.',
      },
      {
        text: 'chị mây nhẹ nhàng khoác lên mình chiếc áo hồng phớt',
        category: 'nhan_hoa',
        categoryLabel: 'Nhân hóa',
        meaning: 'Tả đám mây lúc bình minh hoặc hoàng hôn như cô gái mặc áo đẹp.',
        example: 'Phía chân trời xa, chị mây nhẹ nhàng khoác lên mình chiếc áo hồng phớt rực rỡ.',
      },
      {
        text: 'Mỗi lần ngắm nhìn cảnh vật nơi đây, lòng em lại dâng trào niềm tự hào và tình yêu thương tha thiết.',
        category: 'ket_bai',
        categoryLabel: 'Kết bài mở rộng',
        meaning: 'Câu kết bài gợi cảm xúc sâu sắc và sự gắn bó với quê hương.',
        example: 'Em tự nhủ sẽ học thật giỏi để mai sau góp phần xây dựng cảnh đẹp quê mình thêm tươi đẹp.',
      },
    ],
  },
  {
    id: 'mieu_ta_nguoi',
    title: 'Miêu Tả Người (Thầy cô, Cha mẹ, Bác lao công, Bạn thân)',
    icon: '👨‍🏫',
    description: 'Từ ngữ đặc tả ngoại hình, ánh mắt, nụ cười ấm áp và tình cảm kính trọng, yêu thương.',
    suggestedKeywords: ['thầy giáo', 'cô giáo', 'mẹ', 'bố', 'ông bà', 'bác lao công', 'bạn thân'],
    words: [
      {
        text: 'dịu hiền',
        category: 'tu_lay',
        categoryLabel: 'Từ láy',
        meaning: 'Nhẹ nhàng, hiền từ và chan chứa tình yêu thương.',
        example: 'Ánh mắt cô giáo nhìn chúng em lúc nào cũng dịu hiền và bao dung.',
      },
      {
        text: 'ấm áp',
        category: 'tu_lay',
        categoryLabel: 'Từ láy',
        meaning: 'Cảm giác mang lại sự che chở, yên lòng và thân thương.',
        example: 'Bàn tay mẹ chai sần nhưng mỗi khi xoa đầu em lại ấm áp lạ kỳ.',
      },
      {
        text: 'tận tụy',
        category: 'tu_lay',
        categoryLabel: 'Từ láy',
        meaning: 'Hết lòng vì công việc hoặc chăm lo cho người khác.',
        example: 'Thầy luôn tận tụy nắn nót từng nét chữ cho chúng em mỗi giờ học.',
      },
      {
        text: 'thoăn thoắt',
        category: 'tu_lay',
        categoryLabel: 'Từ láy',
        meaning: 'Cử động nhanh nhẹn, khéo léo liên tục.',
        example: 'Đôi bàn tay cô giáo thoăn thoắt chấm từng trang vở sạch đẹp.',
      },
      {
        text: 'rạng rỡ như ánh bình minh',
        category: 'so_sanh',
        categoryLabel: 'Hình ảnh so sánh',
        meaning: 'Nụ cười tươi tắn, lan tỏa niềm vui đến mọi người.',
        example: 'Mỗi khi cả lớp tiến bộ, nụ cười của cô rạng rỡ như ánh bình minh.',
      },
      {
        text: 'đôi mắt sáng ngời như chứa đựng cả bầu trời tri thức',
        category: 'so_sanh',
        categoryLabel: 'Hình ảnh so sánh',
        meaning: 'Ánh mắt thông tuệ, nhiệt huyết truyền cảm hứng học tập.',
        example: 'Thầy đứng trên bục giảng, đôi mắt sáng ngời như chứa đựng cả bầu trời tri thức.',
      },
      {
        text: 'Những nếp nhăn nơi khóe mắt thầy như những dấu tích chở che bao thế hệ học trò',
        category: 'nhan_hoa',
        categoryLabel: 'Hình ảnh sâu sắc',
        meaning: 'Tả dấu vết thời gian đầy ý nghĩa và sự biết ơn.',
        example: 'Những nếp nhăn nơi khóe mắt thầy như những dấu tích chở che bao thế hệ học trò trưởng thành.',
      },
      {
        text: 'Chẳng những thầy giảng bài rất hay mà thầy còn luôn lắng nghe tâm sự của chúng em.',
        category: 'cau_ghep',
        categoryLabel: 'Câu ghép hô ứng',
        meaning: 'Mẫu câu ghép tăng tiến nối hai đặc điểm đáng quý.',
        example: 'Chẳng những cô dạy học tận tâm mà cô còn chăm lo cho chúng em như người mẹ thứ hai.',
      },
    ],
  },
  {
    id: 'mieu_ta_con_vat',
    title: 'Miêu Tả Con Vật (Chú mèo mướp, Cún con, Chú gà trống)',
    icon: '🐱',
    description: 'Từ ngữ miêu tả bộ lông mượt mà, đôi mắt tinh nghịch, dáng đi rón rén và thói quen đáng yêu.',
    suggestedKeywords: ['mèo mướp', 'chú cún', 'gà trống', 'chú chim', 'vật nuôi'],
    words: [
      {
        text: 'mượt mà',
        category: 'tu_lay',
        categoryLabel: 'Từ láy',
        meaning: 'Mềm mại, óng ả và trơn láng khi chạm vào.',
        example: 'Bộ lông chú mèo đen tuyền, mượt mà như nhung.',
      },
      {
        text: 'ngoe nguẩy',
        category: 'tu_lay',
        categoryLabel: 'Từ láy',
        meaning: 'Lắc qua lắc lại liên tục một cách ngộ nghĩnh.',
        example: 'Thấy em đi học về, chú cún mừng rỡ ngoe nguẩy chiếc đuôi xù.',
      },
      {
        text: 'rón rén',
        category: 'tu_lay',
        categoryLabel: 'Từ láy',
        meaning: 'Đi lại cực kỳ khẽ khàng, nhẹ nhàng không gây ra tiếng động.',
        example: 'Chú mèo rón rén từng bước tiến lại gần để rình bắt chú chuột nhắt.',
      },
      {
        text: 'nhanh thoăn thoắt',
        category: 'tu_lay',
        categoryLabel: 'Từ láy',
        meaning: 'Hành động nhanh nhẹn, thoăn thoắt trong chớp mắt.',
        example: 'Bốn chân chú sóc thoăn thoắt chuyền từ cành cây này sang cành cây khác.',
      },
      {
        text: 'đôi mắt sáng long lanh như hai hòn bi ve',
        category: 'so_sanh',
        categoryLabel: 'Hình ảnh so sánh',
        meaning: 'Đôi mắt tròn, trong vắt và lấp lánh trong đêm.',
        example: 'Đôi mắt Miu sáng long lanh như hai hòn bi ve xanh biếc trong bóng đêm.',
      },
      {
        text: 'chú gà trống vươn vai như một dũng sĩ uy nghi cất tiếng gáy vang dội',
        category: 'nhan_hoa',
        categoryLabel: 'Nhân hóa & So sánh',
        meaning: 'Tả dáng vẻ oai vệ và tiếng gáy sớm của chú gà trống.',
        example: 'Mỗi sớm mai, chú gà trống vươn vai như một dũng sĩ uy nghi cất tiếng gáy vang dội đánh thức cả xóm làng.',
      },
    ],
  },
  {
    id: 'do_vat_ky_niem',
    title: 'Miêu Tả Đồ Vật & Kỷ Niệm (Cặp sách, Cây bút máy, Chiếc đồng hồ)',
    icon: '🎒',
    description: 'Từ ngữ đặc tả chi tiết đồ vật thân quen, kỷ vật tuổi học trò và bài học giữ gìn.',
    suggestedKeywords: ['chiếc cặp', 'bút mực', 'đồng hồ', 'bàn học', 'kỷ vật'],
    words: [
      {
        text: 'nhỏ nhắn',
        category: 'tu_lay',
        categoryLabel: 'Từ láy',
        meaning: 'Kích thước bé nhỏ, xinh xắn và vừa vặn.',
        example: 'Cây bút máy nhỏ nhắn nằm gọn trong bàn tay em.',
      },
      {
        text: 'bóng bẩy',
        category: 'tu_lay',
        categoryLabel: 'Từ láy',
        meaning: 'Nhẵn bóng và phản chiếu ánh sáng đẹp mắt.',
        example: 'Nắp bút mạ vàng óng ánh, bóng bẩy như mới mua hôm nào.',
      },
      {
        text: 'bền bỉ',
        category: 'tu_lay',
        categoryLabel: 'Từ láy',
        meaning: 'Chắc chắn, chịu đựng được thời gian dài không suy suyển.',
        example: 'Chiếc đồng hồ nhỏ nhắn vẫn bền bỉ tích tắc đếm từng giây từng phút.',
      },
      {
        text: 'như một người bạn tri kỷ đồng hành trên mỗi trang vở',
        category: 'so_sanh',
        categoryLabel: 'Hình ảnh so sánh',
        meaning: 'Sự gắn bó mật thiết, thân thương của đồ dùng học tập.',
        example: 'Cây bút như một người bạn tri kỷ đồng hành cùng em trên mỗi trang vở thơm mùi giấy mới.',
      },
      {
        text: 'Chiếc cặp ngoan ngoãn nằm trên lưng em, che chở cho từng cuốn sách thân yêu',
        category: 'nhan_hoa',
        categoryLabel: 'Nhân hóa',
        meaning: 'Tả chiếc cặp sách như một người bạn hiền lành, chu đáo.',
        example: 'Suốt năm năm tiểu học, chiếc cặp ngoan ngoãn che chở cho từng trang sách của em.',
      },
    ],
  },
  {
    id: 'tu_noi_cau_ghep',
    title: 'Cặp Từ Hô Ứng & Câu Ghép Lớp 5 (Nâng tầm văn phong)',
    icon: '✨',
    description: 'Bí kíp dùng câu ghép điểm 9-10: Nguyên nhân - Kết quả, Tương phản, Tăng tiến, Điều kiện.',
    suggestedKeywords: ['câu ghép', 'từ nối', 'cặp từ hô ứng', 'kết nối'],
    words: [
      {
        text: 'Chẳng những... mà còn...',
        category: 'cau_ghep',
        categoryLabel: 'Quan hệ Tăng tiến',
        meaning: 'Liên kết hai ý tích cực bổ sung cho nhau thêm phần mạnh mẽ.',
        example: 'Chẳng những bác phượng vĩ che bóng mát cho chúng em mà bác còn làm rực rỡ cả khoảng trời sân trường.',
      },
      {
        text: 'Mặc dù... nhưng...',
        category: 'cau_ghep',
        categoryLabel: 'Quan hệ Tương phản',
        meaning: 'Tạo nét đối lập làm nổi bật nghị lực hoặc vẻ đẹp đặc biệt.',
        example: 'Mặc dù mùa đông thời tiết rét buốt, nhưng cây bàng già vẫn kiên cường đứng vững chờ đón mùa xuân.',
      },
      {
        text: 'Nhờ... nên...',
        category: 'cau_ghep',
        categoryLabel: 'Quan hệ Nguyên nhân - Kết quả',
        meaning: 'Chỉ rõ công ơn hoặc nguyên nhân tốt đẹp dẫn đến kết quả.',
        example: 'Nhờ có sự ân cần chỉ bảo của cô giáo, nên bài văn của em ngày càng trau chuốt và dạt dào cảm xúc hơn.',
      },
      {
        text: 'Càng... lại càng...',
        category: 'cau_ghep',
        categoryLabel: 'Cặp từ hô ứng',
        meaning: 'Diễn tả cảm xúc hoặc diễn biến ngày một sâu sắc hơn.',
        example: 'Mỗi khi ngắm lại bức ảnh kỷ niệm, em lại càng thêm biết ơn và yêu quý mái trường xưa.',
      },
    ],
  },
];
