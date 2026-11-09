export type GenreType = 'ta_canh' | 'ta_nguoi' | 'ta_do_vat' | 'ta_con_vat' | 'ta_cay_coi' | 'tong_hop';

export interface WeeklyLesson {
  week: number;
  semester: 1 | 2; // 1: Tập 1 (Tuần 1-18), 2: Tập 2 (Tuần 19-35)
  theme: string;
  genre: GenreType;
  genreLabel: string;
  lessonTitle: string;
  prompt: string;
  outlineGuide: {
    moBai: string;
    thanBai: string[];
    ketBai: string;
  };
  sampleEssay: {
    id: string;
    title: string;
    highlights: string[];
    text: string;
  };
  vocabularyHints: string[];
  socraticQuestions: string[];
}

export const GRADE_5_CURRICULUM: WeeklyLesson[] = [
  // ==========================================
  // TẬP 1: TUẦN 1 - TUẦN 18 (HỌC KÌ 1)
  // ==========================================
  {
    week: 1,
    semester: 1,
    theme: 'Việt Nam - Tổ quốc em',
    genre: 'ta_canh',
    genreLabel: 'Tả cảnh',
    lessonTitle: 'Cấu tạo bài văn tả cảnh',
    prompt: 'Tả cảnh một buổi sáng sớm mùa thu trong vườn cây ăn quả hoặc trên cánh đồng quê em.',
    outlineGuide: {
      moBai: 'Giới thiệu bao quát cảnh buổi sáng sớm (Thời gian, địa điểm, ấn tượng đầu tiên).',
      thanBai: [
        'Bầu trời ban mai: Không khí se lạnh, màn sương sớm bảng lảng giăng mắc.',
        'Mặt trời từ từ nhô lên: Ánh nắng vàng dịu len lỏi qua từng kẽ lá, đánh thức vạn vật.',
        'Cây cối và âm thanh: Những giọt sương đọng long lanh trên phiến lá mướt xanh; tiếng chim hót ríu rít rộn ràng trong vòm cây.',
        'Hoạt động của con người: Mọi người thức giấc chuẩn bị cho một ngày làm việc mới.'
      ],
      ketBai: 'Bày tỏ tình cảm, niềm vui và sự gắn bó thân thương với cảnh sắc quê hương buổi sớm.'
    },
    sampleEssay: {
      id: 'tuan-1-buoi-sang-vuon-cay',
      title: 'Buổi sáng sớm tinh khôi trong khu vườn của ông',
      highlights: ['Từ láy: bảng lảng, long lanh, ríu rít, thoang thoảng', 'Câu ghép: Trời vừa hửng sáng, sương mai đã bắt đầu tan dần', 'Nghệ thuật nhân hóa: Chị gió sớm lướt nhẹ lay động những nụ hoa'],
      text: `Mỗi sớm mai thức dậy, nơi em yêu thích nhất chính là khu vườn nhỏ tràn ngập màu xanh của ông ngoại.

Khi vạn vật còn đang chìm trong giấc ngủ, một làn sương sớm bảng lảng vẫn còn giăng mắc trên những vòm lá biếc. Không khí ban mai mát lành, se se lạnh khiến tâm hồn em cảm thấy thư thái lạ thường. Đằng đông, vầng đông từ từ ửng hồng rồi một quả cầu lửa đỏ rực nhô lên, tỏa muôn vàn tia nắng ấm áp xua tan đi màn sương dày đặc. Những giọt sương đêm đọng trên phiến lá chuối non lấp lánh như hàng vạn viên pha lê trong suốt. Trong vòm lá xanh mướt, những chú chim chích bông đã cất tiếng hót líu lo rộn ràng, làm nên khúc ca chào ngày mới. Gió sớm khẽ lướt qua mang theo hương thơm thoang thoảng của hoa bưởi, hoa cau phảng phất khắp không gian.

Đứng giữa khu vườn vào buổi sớm tinh khôi, em cảm thấy yêu tha thiết từng góc vườn nhỏ bé và thêm biết ơn công lao chăm sóc sớm hôm của ông.`
    },
    vocabularyHints: ['bảng lảng', 'long lanh', 'mơn mởn', 'líu lo', 'thoang thoảng', 'chẳng những... mà còn...'],
    socraticQuestions: [
      'Em quan sát thấy mặt trời nhô lên thay đổi màu sắc và không gian xung quanh như thế nào?',
      'Em có thể dùng từ ngữ nhân hóa nào để miêu tả những giọt sương và chú chim sớm không?'
    ]
  },
  {
    week: 2,
    semester: 1,
    theme: 'Việt Nam - Tổ quốc em',
    genre: 'ta_canh',
    genreLabel: 'Tả cảnh',
    lessonTitle: 'Luyện tập tả cảnh (Quan sát và chọn lọc chi tiết)',
    prompt: 'Tả quang cảnh buổi sáng trên cánh đồng lúa chín vàng ươm quê hương em.',
    outlineGuide: {
      moBai: 'Giới thiệu cánh đồng lúa chín vào một buổi sáng đẹp trời.',
      thanBai: [
        'Toàn cảnh: Cánh đồng rộng mênh mông như tấm thảm lụa vàng óng ả trải dài tít tắp.',
        'Chi tiết bông lúa: Bông lúa trĩu hạt uốn cong như chiếc lưỡi câu, hạt mẩy tròn căng.',
        'Hương vị & làn gió: Làn gió sớm thổi qua làm những đợt sóng lúa nhấp nhô rập rờn; hương lúa mới thơm ngào ngạt.',
        'Con người: Bác nông dân ra đồng thăm lúa, nụ cười rạng rỡ mừng một mùa màng bội thu.'
      ],
      ketBai: 'Cảm nghĩ về cánh đồng lúa và lòng biết ơn những giọt mồ hôi nhọc nhằn của người nông dân.'
    },
    sampleEssay: {
      id: 'tuan-2-canh-dong-lua-chin',
      title: 'Biển lúa vàng rực rỡ buổi bình minh',
      highlights: ['So sánh: Cánh đồng như một tấm thảm lụa vàng khổng lồ', 'Từ láy gợi tả: óng ả, nhấp nhô, rập rờn, ngào ngạt', 'Câu ghép chỉ nguyên nhân - kết quả: Nhờ bàn tay chăm sóc cần cù của bà con nên vụ mùa năm nay bội thu rực rỡ'],
      text: `Quê hương em có rất nhiều cảnh đẹp, nhưng nơi gắn liền với tuổi thơ êm đềm của em chính là cánh đồng lúa chín vàng trải dài tít tắp.

Sáng sớm, khi mặt trời vừa ló rạng sau rặng tre làng, cả cánh đồng bừng sáng như được dát một lớp vàng óng ả. Nhìn từ xa, biển lúa mênh mông nhấp nhô theo từng làn gió thoảng, gợn lên từng đợt sóng vàng rập rờn đuổi nhau chạy mãi ra xa. Từng bông lúa trĩu nặng hạt tròn mẩy, uốn cong như những chiếc lưỡi câu duyên dáng. Trên đầu ngọn cỏ, những hạt sương sớm còn vương lại lấp lánh như muôn hạt ngọc trời. Thoang thoảng trong không gian là mùi hương lúa mới ngạt ngào, thơm mùi sữa mẹ hòa cùng vị ngai ngái của đất phù sa màu mỡ. Đằng xa, các bác nông dân đã nón lá nhấp nhô trên bờ ruộng, gương mặt ai nấy đều rạng rỡ niềm vui được mùa.

Ngắm nhìn cánh đồng lúa quê hương, lòng em dâng lên niềm tự hào sâu sắc và thêm trân quý từng hạt gạo dẻo thơm kết tinh từ bao mồ hôi nước mắt của người nông dân.`
    },
    vocabularyHints: ['mênh mông', 'óng ả', 'rập rờn', 'trĩu nặng', 'ngạt ngào', 'bởi vì... cho nên...'],
    socraticQuestions: [
      'Khi gió thổi qua, những đợt sóng lúa tạo ra âm thanh và chuyển động ra sao trong trí tưởng tượng của em?',
      'Em hãy đặt một câu ghép thể hiện niềm vui được mùa của bác nông dân nhé!'
    ]
  },
  {
    week: 3,
    semester: 1,
    theme: 'Việt Nam - Tổ quốc em',
    genre: 'ta_canh',
    genreLabel: 'Tả cảnh',
    lessonTitle: 'Luyện tập tả cảnh (Lập dàn ý & quan sát diễn biến cơn mưa)',
    prompt: 'Tả một cơn mưa rào mùa hạ (từ lúc mây đen kéo đến, trong cơn mưa cho đến khi trời quang mây tạnh).',
    outlineGuide: {
      moBai: 'Dấu hiệu trước cơn mưa: Trời đang oi ả bỗng nổi gió lớn, mây đen ùn ùn kéo đến.',
      thanBai: [
        'Lúc mưa bắt đầu đổ xuống: Gió thổi giật mạnh, giọt mưa đầu mùa rơi lộp độp rồi tuôn xối xả.',
        'Trong cơn mưa: Sấm sét đùng đoàng, nước mưa trắng xóa cả đất trời, cây cối ngả nghiêng tắm gội.',
        'Mưa ngớt dần rồi tạnh hẳn: Bầu trời lại trong xanh, cầu vồng bảy sắc hiện lên lung linh, chim chóc bay ra ríu rít.'
      ],
      ketBai: 'Cảm giác sảng khoái mát mẻ sau cơn mưa và tình cảm với thiên nhiên.'
    },
    sampleEssay: {
      id: 'tuan-3-con-mua-rao-ha',
      title: 'Cơn mưa rào mùa hạ tưới mát quê em',
      highlights: ['Từ tượng thanh: lộp độp, ào ào, đùng đoàng, xối xả', 'Nghệ thuật nhân hóa: Chú gà con núp vội dưới cánh mẹ, hàng cây hả hê đón dòng nước mát', 'Câu ghép đối lập: Mặc dù bầu trời tối sầm mây đen vần vũ, muôn loài lại vui sướng reo hò'],
      text: `Những buổi trưa hè oi ả ngột ngạt thường khép lại bằng một cơn mưa rào mát rượi, xua tan đi cái nóng như thiêu như đốt.

Trời đang nắng gắt bỗng tối sầm lại. Những đám mây đen kịt ùn ùn kéo tới từ chân trời, nặng trĩu hơi nước như muốn sà sát xuống mặt đất. Một làn gió mạnh nổi lên ào ào, cuốn tung đám lá khô bay xào xạc. Những hạt mưa đầu tiên rơi lộp độp trên mái tôn rồi nhanh chóng chuyển thành dòng thác tuôn xối xả. Mưa rơi nghiêng ngả theo chiều gió, tạo thành một màn sương trắng xóa nhạt nhòa bao trùm khắp xóm làng. Dưới sân, bong bóng nước nổi lên phập phồng rồi vỡ tan. Cây cối ven đường như được tiếp thêm sinh lực, hả hê xòe rộng cành lá xanh mướt để tắm mát sau chuỗi ngày khát khô.

Chỉ chừng nửa giờ sau, tiếng mưa nhỏ dần rồi tạnh hẳn. Vầng thái dương rực rỡ trở lại chiếu những tia nắng vàng lấp lánh xuống vũng nước trong veo. Một chiếc cầu vồng lung linh bảy sắc vắt ngang nền trời xanh ngắt, để lại bầu không khí trong lành, sảng khoái vô cùng.`
    },
    vocabularyHints: ['ùn ùn', 'lộp độp', 'xối xả', 'nghiêng ngả', 'lung linh', 'tuy... nhưng...'],
    socraticQuestions: [
      'Âm thanh giọt mưa rơi trên các bề mặt khác nhau (mái tôn, tán lá, sân gạch) gợi cho em điều gì?',
      'Em có quan sát thấy nét mặt mọi người và muôn vật thay đổi thế nào sau khi mưa tạnh?'
    ]
  },
  {
    week: 4,
    semester: 1,
    theme: 'Cánh chim hòa bình',
    genre: 'ta_canh',
    genreLabel: 'Tả cảnh',
    lessonTitle: 'Luyện tập tả cảnh sông nước',
    prompt: 'Tả một dòng sông quê hương (hoặc con kênh, hồ nước) êm đềm gắn bó với tuổi thơ em.',
    outlineGuide: {
      moBai: 'Giới thiệu con sông quê hương gắn bó thân thương với cuộc sống em.',
      thanBai: [
        'Hình dáng dòng sông: Dòng sông uốn lượn như một dải lụa mềm vắt qua làng xóm.',
        'Màu nước biến đổi trong ngày: Sáng sớm xanh trong, trưa nắng lấp lánh ánh bạc, hoàng hôn đỏ rực màu phù sa.',
        'Cảnh vật hai bên bờ: Rặng tre xanh rì rào soi bóng, bãi ngô xanh mơn mởn.',
        'Hoạt động gắn với dòng sông: Những con đò xuôi ngược êm đềm, tiếng trẻ con nô đùa tắm mát mỗi chiều.'
      ],
      ketBai: 'Tình cảm sâu nặng với con sông và ước mong dòng sông luôn trong xanh.'
    },
    sampleEssay: {
      id: 'tuan-4-dong-song-que-em',
      title: 'Dòng sông Đáy hiền hòa ôm ấp tuổi thơ',
      highlights: ['So sánh gợi hình: Dòng sông như dải lụa đào mềm mại vắt ngang bờ xóm', 'Từ láy: êm đềm, lấp lánh, rì rào, rộn rã', 'Câu ghép hô ứng: Chiều nào cũng vậy, khi hoàng hôn buông xuống là lũ trẻ chúng em lại rủ nhau ra sông tắm mát'],
      text: `Quê hương em có biết bao nhiêu cảnh đẹp, nhưng nơi cất giữ nhiều kỷ niệm tuổi thơ êm đềm nhất chính là dòng sông Đáy hiền hòa.

Dòng sông uốn lượn quanh co như một dải lụa đào mềm mại ôm lấy xóm làng trù phú. Nước sông thay đổi sắc màu kỳ diệu theo từng thời khắc trong ngày: sớm mai nước xanh biếc phản chiếu mây trời lồng lộng; trưa về, mặt sông lấp lánh như dát hàng triệu mảnh bạc vụn; còn khi hoàng hôn buông xuống, dòng nước nhuộm màu đỏ ối của ráng chiều phù sa. Hai bên bờ sông, những rặng tre xanh rì rào nghiêng mình soi bóng xuống mặt gương phẳng lặng. Dưới làn nước trong veo, từng đàn cá nhỏ tung tăng bơi lội, thỉnh thoảng lại vội vàng lặn sâu khi có chiếc thuyền chài khẽ khàng lướt qua.

Mỗi buổi chiều hè, dòng sông lại vang lên tiếng cười giòn tan rộn rã của lũ trẻ chúng em nô đùa tắm mát. Dòng sông như bầu sữa mẹ ngọt ngào bồi đắp cho ruộng đồng tươi tốt và nuôi dưỡng tâm hồn em lớn khôn từng ngày.`
    },
    vocabularyHints: ['hiền hòa', 'lấp lánh', 'quanh co', 'rì rào', 'phẳng lặng', 'không những... mà còn...'],
    socraticQuestions: [
      'Dòng sông vào các thời điểm sáng, trưa, chiều đổi màu nước như thế nào?',
      'Em có kỷ niệm đáng nhớ nào bên dòng sông này cùng bạn bè hoặc người thân?'
    ]
  },
  {
    week: 5,
    semester: 1,
    theme: 'Cánh chim hòa bình',
    genre: 'ta_canh',
    genreLabel: 'Tả cảnh',
    lessonTitle: 'Viết đoạn văn tả cảnh trường học',
    prompt: 'Tả quang cảnh trường em trong giờ ra chơi rộn rã tiếng cười.',
    outlineGuide: {
      moBai: 'Tiếng trống báo hiệu giờ ra chơi vang lên, sân trường bắt đầu náo nức.',
      thanBai: [
        'Cảnh học sinh ùa ra sân: Từ các lớp học, học sinh như bầy chim vỡ tổ ùa ra ngập tràn sân trường.',
        'Các nhóm trò chơi: Nhóm nhảy dây nhịp nhàng, nhóm đá cầu thoăn thoắt, nhóm ngồi ghế đá đọc sách dưới gốc bàng.',
        'Cây cối và không gian: Cây bàng, cây phượng tỏa bóng râm mát, tiếng chim líu lo cùng tiếng reo hò giòn giã.'
      ],
      ketBai: 'Tiếng trống vào lớp vang lên, sân trường trở lại yên tĩnh; cảm xúc gắn bó với trường lớp.'
    },
    sampleEssay: {
      id: 'tuan-5-san-truong-gio-ra-choi',
      title: 'Sân trường rộn rã tiếng cười giờ ra chơi',
      highlights: ['So sánh: Học sinh ùa ra sân như đàn bầy chim non ríu rít', 'Từ tượng hình: nhịp nhàng, thoăn thoắt, giòn giã, náo nhiệt', 'Câu ghép chỉ quan hệ thời gian: Tùng! Tùng! Tùng! Ba hồi trống vừa dứt thì các bạn nhỏ đã ùa ra sân trường'],
      text: `"Tùng! Tùng! Tùng!" - Hồi trống báo hiệu giờ ra chơi vừa dứt, các cửa lớp đồng loạt mở toang. Từ các dãy hành lang, học sinh chúng em như bầy chim non tung cánh ùa ra sân trường rộn rã.

Chỉ trong chớp mắt, khoảng sân trường vốn yên ắng bỗng biến thành một ngày hội náo nhiệt. Dưới bóng râm mát rượi của bác phượng già, một nhóm bạn nữ đang say sưa chơi nhảy dây. Từng nhịp chân thoăn thoắt, bím tóc đung đưa theo từng nhịp đếm: "Một, hai, ba...". Ở góc sân bên kia, các bạn nam đang trổ tài đá cầu; quả cầu lông bay vút lên không trung tựa như một chú chim nhỏ đang chao liệng. Dưới gốc bàng lá xanh xòe rộng, vài nhóm bạn túm tụm quanh chiếc ghế đá, say mê đọc những cuốn truyện tranh bổ ích và khúc khích cười vui. Tiếng cười nói, tiếng vỗ tay hòa cùng tiếng lá xào xạc tạo nên một bản hòa âm tươi vui, ngập tràn sức sống của tuổi học trò.

Giờ ra chơi ngắn ngủi trôi qua thật nhanh. Khi tiếng trống trường lại vang lên điểm giờ học, chúng em ai nấy đều phấn khởi, tươi tắn bước vào những tiết học mới.`
    },
    vocabularyHints: ['náo nhiệt', 'thoăn thoắt', 'khúc khích', 'đung đưa', 'giòn giã', 'hễ... là...'],
    socraticQuestions: [
      'Góc sân nào khiến em cảm thấy hứng thú nhất trong giờ ra chơi?',
      'Em hãy chọn ra những từ ngữ thể hiện sự nhanh nhẹn, khéo léo của các bạn khi chơi trò chơi nhé!'
    ]
  },
  {
    week: 6,
    semester: 1,
    theme: 'Cánh chim hòa bình',
    genre: 'ta_canh',
    genreLabel: 'Tả cảnh',
    lessonTitle: 'Luyện tập tả cảnh hoàng hôn hoặc đêm trăng',
    prompt: 'Tả một đêm trăng rằm đẹp huyền ảo nơi làng quê hoặc khu phố em ở.',
    outlineGuide: {
      moBai: 'Mở bài: Đêm rằm tháng Tám hoặc một đêm trăng thanh gió mát mùa thu.',
      thanBai: [
        'Trăng bắt đầu lên: Vầng trăng tròn vành vạnh như chiếc đĩa bạc từ từ nhô lên khỏi rặng tre.',
        'Ánh trăng chan hòa: Ánh vàng dát lên mái ngói, mặt hồ lấp lánh như dát bạc; làn gió thu hiu hiu thổi.',
        'Cảnh sinh hoạt: Người lớn ngồi quây quần uống trà trò chuyện ngoài sân, trẻ con ríu rít rước đèn hoặc chơi trốn tìm.'
      ],
      ketBai: 'Cảm xúc thư thái, bình yên và thêm yêu vẻ đẹp thanh tao của quê hương.'
    },
    sampleEssay: {
      id: 'tuan-6-dem-trang-thanh-binh',
      title: 'Đêm trăng vàng thanh bình nơi làng quê',
      highlights: ['So sánh: Vầng trăng tròn vành vạnh tựa chiếc mâm bạc tinh xảo khổng lồ', 'Từ láy: vành vạnh, huyền ảo, lấp lánh, hiu hiu', 'Biện pháp nhân hóa: Chị Hằng Nga mỉm cười dịu dàng soi sáng khắp lối đi'],
      text: `Trong muôn vàn cảnh đẹp của thiên nhiên, em yêu thích nhất là được ngắm vầng trăng tròn vành vạnh trong những đêm rằm mùa thu thanh bình.

Màn đêm buông xuống, không gian lắng dần trong sự tĩnh mịch. Từ phía sau rặng tre đầu làng, vầng trăng tròn trĩnh như chiếc đĩa bạc khổng lồ từ từ nhô lên cao. Ánh trăng vằng vặc chan hòa khắp muôn nơi, dát một màu vàng óng ả lên từng mái ngói đỏ tươi và trải dài trên con đường làng quanh co. Mặt ao làng gợn sóng lăn tăn, phản chiếu ánh trăng lấp lánh như hàng vạn đốm bạc nhảy múa. Gió thu hiu hiu thổi đem lại bầu không khí trong lành, mát dịu. Ngoài sân, các ông bà cao tuổi thong thả thưởng trà ngắm trăng, trong khi lũ trẻ con chúng em ríu rít chia kẹo và chơi trò rồng rắn lên mây dưới ánh trăng huyền ảo.

Đêm trăng quê hương đẹp như một bức tranh thủy mặc hữu tình. Cảnh tượng ấy mang lại cho em cảm giác bình yên đến lạ kì và khắc sâu trong lòng tình yêu quê hương da diết.`
    },
    vocabularyHints: ['vành vạnh', 'vằng vặc', 'huyền ảo', 'lăn tăn', 'tĩnh mịch', 'mặc dù... nhưng...'],
    socraticQuestions: [
      'Ánh trăng đã làm biến đổi màu sắc của những cảnh vật quen thuộc như mái nhà, mặt nước, con đường ra sao?',
      'Em cảm nhận được tâm trạng của con người và cảnh vật dưới trăng như thế nào?'
    ]
  },
  {
    week: 7,
    semester: 1,
    theme: 'Con người với thiên nhiên',
    genre: 'ta_canh',
    genreLabel: 'Tả cảnh',
    lessonTitle: 'Lập dàn ý bài văn tả cảnh thiên nhiên',
    prompt: 'Tả một khu rừng nguyên sinh (hoặc danh lam thắng cảnh như Vịnh Hạ Long, Tam Đảo, Đà Lạt) mà em có dịp quan sát hoặc tìm hiểu.',
    outlineGuide: {
      moBai: 'Giới thiệu danh lam thắng cảnh / khu rừng thiên nhiên hùng vĩ mà em ấn tượng sâu sắc.',
      thanBai: [
        'Cảnh bao quát: Rừng cây bạt ngàn một màu xanh ngút ngàn, trập trùng như sóng lượn.',
        'Cây cối & thảm thực vật: Những cây đại thụ cao vút chạm mây trời, thân cây phủ đầy rêu phong và dây leo chằng chịt.',
        'Âm thanh & động vật: Tiếng suối róc rách trong vắt, tiếng chim rừng véo von gọi bầy, đàn bướm rập rờn bay lượn.'
      ],
      ketBai: 'Ý nghĩa của thiên nhiên và ý thức bảo vệ môi trường sinh thái xanh tươi.'
    },
    sampleEssay: {
      id: 'tuan-7-rung-nguyen-sinh-hung-vi',
      title: 'Bản hòa ca xanh giữa đại ngàn rừng Cúc Phương',
      highlights: ['Từ láy giàu hình ảnh: bạt ngàn, trập trùng, róc rách, véo von', 'So sánh liên tưởng: Rừng cây như một lá phổi xanh khổng lồ của Mẹ Thiên Nhiên', 'Câu ghép tăng tiến: Rừng càng lên cao thì không khí lại càng trong lành và mát rượi'],
      text: `Mùa hè năm ngoái, em được bố mẹ cho đi thăm Vườn quốc gia Cúc Phương. Vẻ đẹp hoang sơ và kỳ vĩ của khu rừng nguyên sinh cổ xưa này đã để lại trong em nhiều ấn tượng khó phai.

Đặt chân vào rừng, một màu xanh bạt ngàn ngút tầm mắt hiện ra trước mắt em. Không khí mát lạnh bao trùm khắp không gian, khiến bao mệt nhọc của chuyến đi dài tan biến. Những cây chò chỉ ngàn năm tuổi thân to mấy người ôm không xuể, sừng sững vươn ngọn thẳng tắp lên nền trời xanh thẳm như những cột chống trời uy nghiêm. Dưới tán lá rậm rạp, thảm thực vật phong phú với vô vàn loài nấm rực rỡ và những nhánh lan rừng e ấp khoe sắc. Đâu đó, tiếng dòng suối nhỏ róc rách luồn qua khe đá, hòa cùng tiếng chim rừng hót véo von thành bản giao hưởng bất tận của đại ngàn.

Khu rừng nguyên sinh như một viên ngọc quý mà thiên nhiên ban tặng cho đất nước ta. Chuyến đi đã giúp em thêm yêu thiên nhiên và nhắc nhở em phải luôn có ý thức bảo vệ màu xanh của Trái Đất.`
    },
    vocabularyHints: ['bạt ngàn', 'sừng sững', 'róc rách', 'véo von', 'ngút ngàn', 'không những... mà còn...'],
    socraticQuestions: [
      'Điều gì làm cho khu rừng trở nên huyền bí và sống động trong mắt em?',
      'Em có suy nghĩ gì về trách nhiệm bảo tồn rừng xanh của mỗi học sinh chúng ta?'
    ]
  },
  {
    week: 8,
    semester: 1,
    theme: 'Con người với thiên nhiên',
    genre: 'ta_canh',
    genreLabel: 'Tả cảnh',
    lessonTitle: 'Luyện tập tả cảnh (Dựng đoạn mở bài và kết bài)',
    prompt: 'Tả một vườn hoa rực rỡ vào mùa xuân khoe sắc đón chào năm mới.',
    outlineGuide: {
      moBai: 'Mở bài gián tiếp: Giới thiệu mùa xuân đến đánh thức muôn hoa đua nở trong công viên hoặc vườn nhà.',
      thanBai: [
        'Không gian chung: Làn mưa xuân lất phất ấm áp, muôn hoa cùng bừng tỉnh giấc nồng.',
        'Các loài hoa tiêu biểu: Hoa hồng nhung kiêu sa cánh đọng sương, hoa mai vàng rực rỡ như nắng, cúc đại đóa vàng óng.',
        'Ong bướm và con người: Đàn ong bướm rập rờn hút mật, mọi người tươi cười ngắm hoa chụp ảnh lưu niệm.'
      ],
      ketBai: 'Kết bài mở rộng: Cảm nhận về sức sống của mùa xuân và niềm hạnh phúc bên gia đình ngày Tết.'
    },
    sampleEssay: {
      id: 'tuan-8-vuon-hoa-xuan',
      title: 'Vườn hoa xuân bừng nở muôn sắc thắm',
      highlights: ['Từ gợi tả: lất phất, rực rỡ, kiêu sa, rập rờn', 'So sánh phong phú: Cánh hoa mịn màng như nhung, màu vàng rực như những tia nắng ấm', 'Biện pháp nhân hóa: Nàng xuân khẽ lay nhẹ từng nụ hoa đang e ấp'],
      text: `Khi những hạt mưa xuân lất phất bắt đầu buông nhẹ trên cành cây kẽ lá, cũng là lúc vườn hoa công viên bừng tỉnh sau giấc ngủ đông dài để khoe sắc đón Tết.

Bước vào vườn hoa, em ngỡ như mình vừa lạc vào chốn thiên đường ngập tràn sắc hương rực rỡ. Nổi bật nhất là những khóm hồng nhung kiêu sa, cánh hoa đỏ thắm xếp từng lớp dày dặn mịn màng tựa vải nhung đắt giá, trên mép cánh còn e ấp đọng những hạt sương mai trong suốt. Cạnh đó, những cành mai vàng rực rỡ như gom hết tia nắng ấm của đất trời để bung nở những cánh hoa tươi tắn. Những bông cúc đại đóa cánh cong vút như bàn tay nhỏ nhắn của em bé đang xòe ra đón lấy sinh khí mùa xuân. Từng đàn bướm đủ màu sắc chập chờn bay lượn, những chú ong chăm chỉ vo ve lượn quanh các nhụy hoa ngọt ngào.

Ngắm nhìn vườn hoa mùa xuân rạng rỡ, lòng em tràn đầy niềm vui phơi phới và hy vọng về một năm mới an lành, hạnh phúc bên gia đình thân yêu.`
    },
    vocabularyHints: ['lất phất', 'kiêu sa', 'rực rỡ', 'chập chờn', 'ngọt ngào', 'chẳng những... mà còn...'],
    socraticQuestions: [
      'Em hãy dùng biện pháp nhân hóa để miêu tả vẻ đẹp e ấp của nụ hoa khi vừa chớm nở nhé!',
      'Mùi hương thoang thoảng của vườn hoa xuân đem lại cho em cảm giác ra sao?'
    ]
  },
  {
    week: 9,
    semester: 1,
    theme: 'Con người với thiên nhiên',
    genre: 'ta_canh',
    genreLabel: 'Tả cảnh',
    lessonTitle: 'Kiểm tra viết: Bài văn tả cảnh thiên nhiên',
    prompt: 'Tả con đường quen thuộc từ nhà đến trường vào một buổi sáng mùa thu se se lạnh.',
    outlineGuide: {
      moBai: 'Giới thiệu con đường đi học thân thương gắn bó mỗi ngày đến trường.',
      thanBai: [
        'Cảnh sớm mai trên đường: Mặt đường sạch sẽ, hơi lạnh mơn man da thịt, sương thu phủ nhẹ trên ngọn cỏ.',
        'Hai bên đường: Hàng cây xà cừ cổ thụ trút những chiếc lá vàng xào xạc; các ngôi nhà ven đường đã sáng đèn.',
        'Dòng người qua lại: Xe cộ bắt đầu đông đúc, các bạn học sinh khăn quàng đỏ thắm tung tăng ríu rít đến trường.'
      ],
      ketBai: 'Tình cảm thân thiết, gắn bó với con đường và niềm tự hào về mỗi ngày đi học là một ngày vui.'
    },
    sampleEssay: {
      id: 'tuan-9-con-duong-di-hoc',
      title: 'Con đường đến trường buổi sáng mùa thu se lạnh',
      highlights: ['Từ láy: se se, xào xạc, tung tăng, ríu rít', 'So sánh: Lá vàng rơi nhẹ như những cánh bướm chao liệng trong gió thu', 'Câu ghép thời gian: Khi tiếng chuông đồng hồ điểm sáu giờ rưỡi, con đường nhỏ đã tấp nập tiếng cười nói'],
      text: `Mỗi ngày cắp sách tới trường, em đều đi qua con đường quen thuộc rợp bóng cây xanh của khu phố. Con đường ấy đã trở thành người bạn thân thiết chứng kiến từng bước chân khôn lớn của em.

Sáng mùa thu se se lạnh, con đường như khoác lên mình tấm áo sương mỏng manh, huyền ảo. Hàng cây cổ thụ hai bên đường đứng trầm ngâm, thỉnh thoảng một cơn gió heo may lướt qua làm những chiếc lá vàng chao lượn rồi rụng xuống xào xạc như những cánh bướm xinh đẹp. Không khí buổi sớm trong lành, thơm mùi bánh mì nóng hổi từ góc phố quen. Khi mặt trời nhô lên, ánh nắng dịu dàng sưởi ấm khắp mặt đường trải nhựa phẳng lì. Từng tốp học sinh với nụ cười rạng rỡ, chiếc khăn quàng đỏ thắm bay phấp phới trên vai, cùng nhau ríu rít trò chuyện rộn ràng bước tới trường.

Con đường đi học thân quen ấy đã in sâu trong ký ức tuổi thơ em. Dù sau này có đi đến đâu, hình ảnh con đường mùa thu êm đềm này vẫn mãi ở lại trong trái tim em.`
    },
    vocabularyHints: ['se se', 'xào xạc', 'phấp phới', 'ríu rít', 'trầm ngâm', 'vừa... đã...'],
    socraticQuestions: [
      'Gió thu và sương sớm trên con đường khiến bước chân em đến trường có cảm giác như thế nào?',
      'Em có thể miêu tả rõ hơn màu sắc và chuyển động của những chiếc lá vàng mùa thu rơi rụng không?'
    ]
  },
  {
    week: 10,
    semester: 1,
    theme: 'Ôn tập giữa học kì 1',
    genre: 'ta_canh',
    genreLabel: 'Tả cảnh',
    lessonTitle: 'Ôn tập miêu tả cảnh thiên nhiên và đoạn văn cảm nghĩ',
    prompt: 'Tả cảnh hoàng hôn buông xuống trên quê hương em (hoặc bãi biển, dòng sông chiều tà).',
    outlineGuide: {
      moBai: 'Giới thiệu thời khắc hoàng hôn buông xuống sau một ngày dài năng động.',
      thanBai: [
        'Bầu trời chiều tà: Mặt trời như hòn than đỏ rực từ từ khuất dần sau rặng núi hoặc đường chân trời.',
        'Màu sắc biến ảo: Ánh ráng chiều đỏ tía, tím biếc lan tỏa khắp nền trời rộng lớn.',
        'Cảnh vật và con người: Đàn chim vội vã bay về tổ, khói lam chiều bảng lảng tỏa ra từ mái bếp ấm cúng, người đi làm về nhà sum họp.'
      ],
      ketBai: 'Cảm giác bình yên, sâu lắng của thời khắc sum vầy gia đình sau một ngày lao động.'
    },
    sampleEssay: {
      id: 'tuan-10-hoang-hon-que-em',
      title: 'Chiều hoàng hôn rực rỡ buông lơi trên dòng sông quê',
      highlights: ['So sánh độc đáo: Mặt trời như quả cầu lửa khổng lồ chìm dần xuống lòng sông', 'Từ láy gợi cảm: bảng lảng, êm ả, vội vã, ấm cúng', 'Biện pháp nhân hóa: Màn đêm buông tấm rèm nhung đen mềm mại ru vạn vật ngủ ngon'],
      text: `Khi ánh nắng chói chang của một ngày hè dần tắt, hoàng hôn bắt đầu buông xuống nhuộm cả bầu trời quê em trong một gam màu huyền ảo và lắng đọng.

Phía tây, mặt trời như một hòn than đỏ ối khổng lồ từ từ chìm xuống phía sau rặng núi xa xa. Nền trời chuyển dần từ màu vàng cam rực rỡ sang màu hồng tía rồi tím biếc. Mặt sông chiều phẳng lặng phản chiếu ráng mây đỏ rực, tựa như một dải gấm hoa lộng lẫy trôi êm ả giữa hai bờ tre. Từng đàn chim vội vã sải cánh bay về tổ ấm, tiếng kêu khắc khoải xé tan bầu không khí tĩnh mịch. Từ những mái nhà tranh đơn sơ ven đê, làn khói lam chiều bảng lảng bay lên hòa quyện cùng mùi rơm rạ nồng nàn. Các bác nông dân vác cuốc trở về làng với nụ cười mãn nguyện, tiếng trâu bò gọi nhau về chuồng rộn rã đầu ngõ.

Hoàng hôn quê em giản dị mà ấm áp vô cùng. Khung cảnh ấy xua tan đi mọi âu lo mệt mỏi, đưa tâm hồn con người trở về với sự bình yên của gia đình.`
    },
    vocabularyHints: ['bảng lảng', 'đỏ ối', 'tĩnh mịch', 'mãn nguyện', 'êm ả', 'tuy... nhưng...'],
    socraticQuestions: [
      'Em thấy mặt trời và bầu trời đổi màu sắc như thế nào trong từng phút của buổi hoàng hôn?',
      'Hình ảnh khói lam chiều và tiếng chim về tổ gợi cho em cảm giác ấm áp gì về mái ấm gia đình?'
    ]
  },
  {
    week: 11,
    semester: 1,
    theme: 'Giữ lấy màu xanh',
    genre: 'ta_nguoi',
    genreLabel: 'Tả người',
    lessonTitle: 'Cấu tạo bài văn tả người (Quan sát ngoại hình)',
    prompt: 'Tả người bà kính yêu của em với mái tóc bạc phơ và nụ cười hiền hậu.',
    outlineGuide: {
      moBai: 'Giới thiệu về người bà thân thương - người em kính yêu và gần gũi nhất trong gia đình.',
      thanBai: [
        'Tuổi tác và vóc dáng: Bà ngoài bảy mươi tuổi, dáng người nhỏ nhắn, lưng đã hơi còng vì cả đời vất vả.',
        'Gương mặt và mái tóc: Mái tóc bà bạc trắng như cước luôn búi gọn gàng; khuôn mặt in hằn nếp nhăn thời gian.',
        'Đôi mắt và nụ cười: Đôi mắt đã đục mờ nhưng ánh nhìn vô cùng ấm áp, nụ cười đôn hậu rạng rỡ khi nhìn con cháu.',
        'Bàn tay: Bàn tay gầy guộc thô ráp vì lao động sớm hôm nhưng luôn chăm chút cho em từng bữa ăn giấc ngủ.'
      ],
      ketBai: 'Tình cảm yêu kính sâu sắc, mong ước bà luôn mạnh khỏe sống lâu trăm tuổi cùng con cháu.'
    },
    sampleEssay: {
      id: 'tuan-11-nguoi-ba-kinh-yeu',
      title: 'Người bà đôn hậu - bến đỗ bình yên của tuổi thơ em',
      highlights: ['So sánh: Mái tóc bà bạc trắng tựa những sợi cước tinh khôi', 'Từ láy gợi cảm: nhỏ nhắn, gầy guộc, ấm áp, đôn hậu', 'Câu ghép: Tuy lưng bà đã còng vì năm tháng, nhưng bà vẫn luôn nhanh nhẹn chăm lo cho con cháu từng li từng tí'],
      text: `Trong gia đình, người em yêu quý và kính trọng nhất là bà nội kính yêu. Năm nay bà đã ngoài bảy mươi tuổi, người đã dành cả cuộc đời tần tảo chăm sóc bố em và nay lại yêu thương em hết mực.

Bà có dáng người nhỏ nhắn, lưng bà đã hơi còng vì năm tháng gánh gồng vất vả nuôi dạy con cái nên người. Mái tóc bà bạc trắng như những sợi cước óng ánh, lúc nào cũng được bà búi gọn gàng sau gáy bằng chiếc cặp tóc con con. Khuôn mặt bà phúc hậu, hằn sâu những vết chân chim của thời gian nơi khóe mắt. Đôi mắt bà đã đục mờ vì tuổi tác, nhưng ánh nhìn dành cho con cháu lúc nào cũng ấm áp, hiền từ như vầng trăng rằm. Đôi bàn tay gầy gầy, gân guốc thô ráp vì bao năm lao động ruộng đồng sớm hôm; thế nhưng đôi bàn tay ấy lại khéo léo biết bao khi nấu cho em những bát chè sen ngọt lịm và đan cho em chiếc khăn len ấm áp mùa đông.

Mỗi tối trước khi đi ngủ, được nằm trong vòng tay ấm áp của bà và nghe bà kể những câu chuyện cổ tích ngàn xưa là niềm hạnh phúc lớn nhất của em. Em thầm mong bà luôn mạnh khỏe, sống lâu trăm tuổi để mãi mãi là chỗ dựa tinh thần yêu dấu của em.`
    },
    vocabularyHints: ['nhỏ nhắn', 'gân guốc', 'ấm áp', 'đôn hậu', 'phúc hậu', 'mặc dù... nhưng...'],
    socraticQuestions: [
      'Đôi bàn tay gầy gầy gân guốc của bà gợi cho em nhớ đến những hy sinh vất vả gì của bà?',
      'Em nhớ nhất câu chuyện hoặc lời dạy bảo ấm áp nào của bà dành cho em?'
    ]
  },
  {
    week: 12,
    semester: 1,
    theme: 'Giữ lấy màu xanh',
    genre: 'ta_nguoi',
    genreLabel: 'Tả người',
    lessonTitle: 'Luyện tập tả người (Tả ngoại hình & nét mặt, tính cách)',
    prompt: 'Tả một người bạn thân cùng lớp đang chăm chỉ học tập (vóc dáng, ánh mắt, nụ cười và đức tính tốt).',
    outlineGuide: {
      moBai: 'Giới thiệu người bạn thân thiết cùng bàn đã đồng hành cùng em trong học tập.',
      thanBai: [
        'Vóc dáng & trang phục: Bạn có vóc người cân đối, nhanh nhẹn, trang phục đi học luôn sạch sẽ gọn gàng.',
        'Khuôn mặt & ánh mắt: Khuôn mặt tròn trĩnh thông minh, đôi mắt sáng long lanh ẩn sau cặp kính cận trí thức.',
        'Hành động trong giờ học: Chăm chú lắng nghe cô giáo giảng bài, tay ghi chép cẩn thận từng ý chính, tích cực giơ tay phát biểu.',
        'Tính cách tốt bụng: Luôn nhiệt tình giảng giải bài khó cho bạn bè xung quanh.'
      ],
      ketBai: 'Cảm nghĩ về tình bạn đẹp đẽ và mong ước cùng nhau tiến bộ trong học tập.'
    },
    sampleEssay: {
      id: 'tuan-12-nguoi-ban-than',
      title: 'Minh Trang - người bạn thân chăm ngoan, học giỏi của em',
      highlights: ['Từ láy: nhanh nhẹn, tròn trĩnh, chăm chú, thoăn thoắt', 'Câu ghép có quan hệ từ: Không những Trang học giỏi toàn diện, mà bạn ấy còn luôn sẵn lòng giúp đỡ mọi người', 'Chi tiết biểu cảm: Đôi mắt bạn sáng lên niềm vui rạng rỡ mỗi khi giải được một bài toán khó'],
      text: `Ở lớp 5A, người bạn thân thiết nhất của em là Minh Trang – lớp phó học tập gương mẫu được thầy yêu bạn mến.

Trang có vóc dáng dong dỏng cao, nước da trắng hồng và dáng đi lúc nào cũng thoăn thoắt, nhanh nhẹn. Mái tóc đen mượt được bạn buộc đuôi ngựa gọn gàng, đung đưa theo từng bước chân. Khuôn mặt Trang thanh tú, nổi bật là đôi mắt đen láy, sáng long lanh ẩn sau cặp kính cận tròn xoe toát lên vẻ thông minh, hiếu học. Trong giờ học, Trang luôn ngồi ngay ngắn, đôi mắt chăm chú dõi theo từng nét phấn của cô giáo trên bảng đen. Bàn tay nhỏ nhắn của bạn nắn nót ghi chép bài vở sạch đẹp, chữ viết ngay ngắn thẳng hàng như in. Mỗi khi gặp bài toán hóc búa, Trang khẽ cắn nhẹ đầu bút suy nghĩ; rồi khi tìm ra lời giải, ánh mắt bạn bừng sáng lên niềm vui rạng ngời.

Không chỉ học giỏi, Trang còn rất tốt bụng và hòa đồng. Bạn luôn kiên nhẫn giảng lại từng bài tập khó cho những bạn học chậm trong lớp. Được học cùng và làm bạn với Minh Trang là niềm may mắn lớn của em, em sẽ luôn trân trọng tình bạn thân thiết này.`
    },
    vocabularyHints: ['dong dỏng', 'thoăn thoắt', 'thanh tú', 'chăm chú', 'ngay ngắn', 'không những... mà còn...'],
    socraticQuestions: [
      'Điểm gì ở người bạn ấy khiến em khâm phục và muốn noi theo nhất?',
      'Em hãy miêu tả khoảnh khắc người bạn ấy tập trung suy nghĩ và niềm vui khi giải xong bài nhé!'
    ]
  },
  {
    week: 13,
    semester: 1,
    theme: 'Giữ lấy màu xanh',
    genre: 'ta_nguoi',
    genreLabel: 'Tả người',
    lessonTitle: 'Luyện tập tả người (Tả hoạt động & cử chỉ)',
    prompt: 'Tả hình ảnh người mẹ thân yêu đang tất bật nấu bữa cơm chiều ấm cúng cho cả gia đình.',
    outlineGuide: {
      moBai: 'Khung cảnh buổi chiều sau giờ làm việc: Mẹ trở về nhà và bắt tay vào chuẩn bị bữa tối.',
      thanBai: [
        'Trang phục & nét mặt: Mẹ mặc bộ quần áo giản dị, buộc tạp dề gọn gàng; gương mặt lấm tấm mồ hôi nhưng ánh mắt tràn ngập niềm vui.',
        'Hành động chuẩn bị: Bàn tay thoăn thoắt nhặt rau, gọt củ quả, ướp gia vị đều tay.',
        'Lúc nấu nướng: Tiếng xào nấu xèo xèo vui tai, ngọn lửa hồng bập bùng, mùi thơm ngào ngạt của canh cá, thịt kho lan tỏa căn bếp nhỏ.'
      ],
      ketBai: 'Tình cảm yêu thương, lòng biết ơn vô bờ bến với mẹ và mong ước được đỡ đần mẹ mỗi ngày.'
    },
    sampleEssay: {
      id: 'tuan-13-me-nau-com-chieu',
      title: 'Bàn tay yêu thương của mẹ bên bếp lửa chiều',
      highlights: ['Từ tượng thanh & tượng hình: tất bật, lấm tấm, thoăn thoắt, xèo xèo, bập bùng', 'So sánh: Bàn tay mẹ thoăn thoắt như đang múa một điệu múa điêu luyện', 'Câu ghép: Dù cả ngày làm việc mệt mỏi, mẹ vẫn luôn nở nụ cười ấm áp khi vào bếp nấu ăn cho gia đình'],
      text: `Mỗi buổi chiều khi hoàng hôn buông xuống, gian bếp nhỏ nhà em lại rộn ràng âm thanh nấu nướng quen thuộc và ấm áp từ đôi bàn tay của mẹ.

Sau một ngày làm việc bận rộn ở cơ quan, mẹ vội vã trở về nhà và bắt tay ngay vào việc chuẩn bị bữa cơm chiều cho cả tổ ấm. Mẹ khoác lên mình chiếc tạp dề màu hoa cúc quen thuộc, mái tóc búi cao để lộ vầng trán thanh tú lấm tấm những giọt mồ hôi. Đôi bàn tay mẹ thoăn thoắt, điêu luyện như một người nghệ sĩ: lúc thì nhặt từng cọng rau muống xanh non, lúc lại thoăn thoắt thái thịt từng lát mỏng đều tăm tắp. Dưới bàn tay khéo léo của mẹ, ngọn lửa bếp ga bập bùng reo vui, chảo xào phát ra tiếng "xèo xèo" rộn rã. Mùi thơm ngào ngạt của nồi canh cua nấu mồng tơi cùng đĩa sườn xào chua ngọt bốc khói nghi ngút, đánh thức cơn thèm ăn của cả gia đình.

Mẹ vừa nấu nướng vừa âu yếm hỏi han tình hình học tập của em hôm nay. Nhìn nụ cười rạng rỡ của mẹ bên mâm cơm nóng hổi, lòng em ngập tràn tình yêu thương và lòng biết ơn vô hạn đối với người mẹ kính yêu.`
    },
    vocabularyHints: ['tất bật', 'thoăn thoắt', 'bập bùng', 'ngào ngạt', 'ấm cúng', 'dù... nhưng...'],
    socraticQuestions: [
      'Âm thanh và mùi thơm trong gian bếp của mẹ đã tạo nên không khí gia đình ấm cúng thế nào?',
      'Em có phụ giúp mẹ việc gì khi mẹ nấu cơm không, và mẹ đã nói gì với em?'
    ]
  },
  {
    week: 14,
    semester: 1,
    theme: 'Giữ lấy màu xanh',
    genre: 'ta_nguoi',
    genreLabel: 'Tả người',
    lessonTitle: 'Luyện tập tả người (Kết hợp ngoại hình và hoạt động)',
    prompt: 'Tả bác nông dân đang cần cù cày ruộng hoặc thu hoạch lúa trên cánh đồng bao la.',
    outlineGuide: {
      moBai: 'Giới thiệu hình ảnh bác nông dân quen thuộc đang say sưa lao động trên cánh đồng quê.',
      thanBai: [
        'Ngoại hình: Thân hình vạm vỡ, làn da rám nắng bánh mật khỏe khoắn, đôi mắt tinh anh dưới vành nón lá bạc màu.',
        'Trang phục: Bộ quần áo nâu sồng giản dị, xắn cao đến đầu gối lấm lem bùn đất.',
        'Hoạt động: Đôi bàn tay gân guốc thoăn thoắt lia từng đường liềm cắt lúa hoặc điều khiển đường cày thẳng tắp; giọt mồ hôi lăn dài trên má.',
        'Thần thái: Nụ cười hiền hậu, ánh mắt rạng ngời niềm tin vào một mùa màng ấm no.'
      ],
      ketBai: 'Lòng khâm phục, biết ơn những giọt mồ hôi công sức làm ra hạt gạo ngọc ngà của đất trời.'
    },
    sampleEssay: {
      id: 'tuan-14-bac-nong-dan',
      title: 'Bác nông dân cần cù dệt nên mùa vàng no ấm',
      highlights: ['Từ láy: vạm vỡ, thoăn thoắt, lấm lem, cần mẫn', 'Nghệ thuật so sánh: Từng giọt mồ hôi rơi xuống như những hạt ngọc quý nuôi dưỡng mầm xanh', 'Câu ghép quan hệ điều kiện - kết quả: Hễ trời vừa hửng sáng là bác nông dân đã có mặt ngoài đồng ruộng'],
      text: `Mỗi lần có dịp về thăm quê ngoại, hình ảnh khiến em xúc động và khâm phục nhất chính là bóng dáng bác nông dân đang miệt mài lao động trên cánh đồng lúa bao la.

Bác Ba có thân hình vạm vỡ, rắn rỏi như cây lim rừng. Làn da bác ngăm đen màu bánh mật - màu da đặc trưng của những con người dãi dầu mưa nắng. Dưới vành nón lá nhấp nhô đã sờn rách theo năm tháng là khuôn mặt vuông vức đôn hậu cùng đôi mắt sáng ngời, luôn đượm vẻ chất phác, kiên trì. Bác mặc bộ quần áo nâu sồng giản dị, gấu quần xắn cao quá gối lấm lem bùn đất phù sa. Đôi bàn tay thô ráp, gân guốc của bác thoăn thoắt lia từng nhát liềm sắc ngọt. Bác đưa tay gặt lúa thoăn thoắt, lúa đổ rạp thành từng ôm tròn trịa. Những giọt mồ hôi thánh thót rơi trên gò má sạm đen nhưng nụ cười tươi rói vẫn luôn nở trên môi bác khi nhìn thấy những bông lúa trĩu hạt.

Nhìn bác nông dân cần mẫn làm việc, em càng thấu hiểu sâu sắc câu ca dao "Ai ơi bưng bát cơm đầy - Dẻo thơm một hạt đắng cay muôn phần". Em vô cùng biết ơn những người nông dân đã một nắng hai sương làm ra hạt gạo trắng trong nuôi sống xã hội.`
    },
    vocabularyHints: ['vạm vỡ', 'rắn rỏi', 'thoăn thoắt', 'cần mẫn', 'đôn hậu', 'hễ... là...'],
    socraticQuestions: [
      'Chi tiết nào về giọt mồ hôi hay nụ cười của bác nông dân làm em cảm phục nhất?',
      'Em hiểu thêm điều gì về giá trị của hạt cơm sau khi quan sát người nông dân làm việc?'
    ]
  },
  {
    week: 15,
    semester: 1,
    theme: 'Vì hạnh phúc con người',
    genre: 'ta_nguoi',
    genreLabel: 'Tả người',
    lessonTitle: 'Dựng đoạn mở bài và kết bài trong bài văn tả người',
    prompt: 'Tả thầy giáo (hoặc cô giáo) kính yêu đã tận tình dạy dỗ và để lại cho em nhiều ấn tượng sâu sắc.',
    outlineGuide: {
      moBai: 'Mở bài gián tiếp: Nhớ lại một kỷ niệm xúc động cùng thầy/cô giáo người đã dìu dắt em nên người.',
      thanBai: [
        'Vóc dáng & phong thái: Thầy/cô có vóc dáng thanh mảnh, phong thái đĩnh đạc, tà áo dài (hoặc bộ sơ mi) trang nhã.',
        'Khuôn mặt & ánh mắt: Khuôn mặt hiền từ, ánh mắt trìu mến dõi theo từng học sinh; nụ cười bao dung ấm áp.',
        'Lúc giảng bài: Giọng nói truyền cảm, ấm áp như rót vào tai; đôi bàn tay nắn nót viết từng nét chữ nết người trên bảng đen; tận tình xuống tận bàn hướng dẫn học sinh.',
        'Kỷ niệm đáng nhớ: Một lần được thầy/cô động viên vượt qua bài kiểm tra khó.'
      ],
      ketBai: 'Kết bài mở rộng: Lòng biết ơn sâu nặng với người "lái đò thầm lặng" và lời hứa chăm ngoan, học giỏi.'
    },
    sampleEssay: {
      id: 'tuan-15-co-giao-kinh-yeu',
      title: 'Cô giáo em - người lái đò thầm lặng đưa em qua bến bờ tri thức',
      highlights: ['Từ láy giàu cảm xúc: dịu dàng, ấm áp, truyền cảm, nắn nót, bao dung', 'So sánh liên tưởng: Giọng cô ấm áp như tiếng ru của mẹ', 'Câu ghép: Dù thời gian có trôi đi, những lời dạy bảo ân cần của cô vẫn mãi khắc ghi trong tâm trí em'],
      text: `"Người thầy như ngọn nến sáng soi đường cho học trò bước tới tương lai" - Mỗi khi nghe câu nói ấy, em lại bồi hồi nhớ đến cô Mai, người cô chủ nhiệm kính yêu đã dạy dỗ em suốt những năm tháng tiểu học.

Cô Mai có dáng người thanh mảnh, bước đi nhẹ nhàng, khoan thai. Mỗi khi đến lớp, cô thường mặc chiếc áo dài truyền thống thướt tha mang màu xanh ngọc bích trang nhã. Khuôn mặt cô trái xoan phúc hậu, nổi bật là đôi mắt đen lay láy luôn nhìn chúng em với ánh nhìn trìu mến và bao dung. Khi giảng bài, giọng nói cô trầm ấm, truyền cảm lạ thường, như rót từng lời hay ý đẹp vào tâm hồn non nớt của chúng em. Bàn tay thon thả của cô cầm viên phấn trắng nắn nót từng con chữ ngay ngắn trên bảng. Khi có bạn chưa hiểu bài, cô liền bước xuống tận bàn, cúi người ân cần chỉ bảo từng li từng tí với nụ cười khích lệ dịu hiền.

Nhờ có sự dạy bảo tận tụy của cô, em đã ngày một tự tin và tiến bộ vượt bậc. Hình bóng cô Mai bên bục giảng mãi là hình ảnh thân thương nhất trong trái tim em, em tự hứa sẽ học tập thật chăm chỉ để xứng đáng với công ơn trời biển của cô.`
    },
    vocabularyHints: ['thanh mảnh', 'khoan thai', 'truyền cảm', 'nắn nót', 'trìu mến', 'dẫu... vẫn...'],
    socraticQuestions: [
      'Giọng giảng bài của cô giáo và ánh mắt cô khi học sinh hiểu bài có điều gì làm em xúc động?',
      'Em muốn gửi gắm lời hứa hay tình cảm gì nhất đến người thầy, người cô của mình?'
    ]
  },
  {
    week: 16,
    semester: 1,
    theme: 'Vì hạnh phúc con người',
    genre: 'ta_nguoi',
    genreLabel: 'Tả người',
    lessonTitle: 'Luyện tập viết bài văn tả người hoàn chỉnh',
    prompt: 'Tả một em bé đang tuổi tập nói, tập đi ngây thơ, kháu khỉnh và đáng yêu.',
    outlineGuide: {
      moBai: 'Giới thiệu em bé (em gái, em trai hoặc bé hàng xóm) đang ở lứa tuổi lên hai tập nói, tập đi.',
      thanBai: [
        'Ngoại hình: Thân hình mũm mĩm, tròn trĩnh như một củ khoai tây nhỏ xíu; nước da trắng hồng thơm mùi sữa.',
        'Khuôn mặt: Má bánh đúc phúng phính ửng hồng; đôi mắt to tròn đen láy chớp chớp ngơ ngác; miệng chúm chím vài chiếc răng sữa trắng xinh.',
        'Tập đi: Chân bước lẫm chẫm, hai tay xòe ra giữ thăng bằng như chim non vỗ cánh, thỉnh thoảng lại ngã ngồi xuống sàn rồi tự bò dậy cười toe toét.',
        'Tập nói: Giọng bi bô ngọng nghịu gọi "ba", "mẹ", bắt chước người lớn vô cùng ngộ nghĩnh.'
      ],
      ketBai: 'Tình cảm yêu mến, cưng chiều em bé và niềm vui mà bé mang lại cho cả gia đình.'
    },
    sampleEssay: {
      id: 'tuan-16-em-be-tap-di',
      title: 'Bé Bông ngây thơ - thiên thần nhỏ của cả gia đình',
      highlights: ['Từ láy tượng hình tượng thanh: mũm mĩm, phúng phính, lẫm chẫm, bi bô, ngộ nghĩnh', 'So sánh: Hai má bé phúng phính ửng hồng như hai trái táo chín ngọt', 'Câu ghép biểu thị sự liên tiếp: Hễ nghe tiếng em gọi là bé lại toe toét cười rồi lẫm chẫm chạy ùa tới'],
      text: `Trong nhà em, thành viên nhỏ tuổi nhất và cũng là "cây hài" đem lại nhiều tiếng cười nhất chính là bé Bông – cô em gái tròn mười sáu tháng tuổi của em.

Bé Bông trộm vía rất bụ bẫm và dễ thương. Thân hình bé mũm mĩm, tròn lẳn tựa như một chú búp bê bông di động. Nước da em trắng hồng hào, lúc nào cũng thoang thoảng mùi sữa bột thơm ngát. Khuôn mặt tròn xoe với đôi má phúng phính bầu bĩnh như hai trái đào chín, ai nhìn cũng chỉ muốn thơm nhẹ lên má bé. Đôi mắt to tròn đen láy, chớp chớp hàng mi cong vút trông vô cùng lanh lợi. Đáng yêu nhất là lúc bé tập đi: đôi chân ngắn cũn cỡn bước từng bước lẫm chẫm, hai tay xòe ngang để giữ thăng bằng tựa như chú chim non đang chập chững tập bay. Có lúc mất đà, bé ngã ngồi phịch xuống sàn nhà êm ái, nhưng không hề khóc nhè mà lại nhe bốn chiếc răng sữa tí hon cười toe toét.

Bé Bông đang tuổi bi bô tập nói, miệng luôn chu ra gọi "anh... anh...", "ba... ba..." ngọng nghịu đáng yêu vô cùng. Có bé Bông, ngôi nhà em lúc nào cũng rộn rã niềm vui, em luôn yêu thương và che chở cho cô em gái nhỏ bé này.`
    },
    vocabularyHints: ['mũm mĩm', 'phúng phính', 'lẫm chẫm', 'bầu bĩnh', 'bi bô', 'hễ... là...'],
    socraticQuestions: [
      'Dáng vẻ lẫm chẫm tập đi và điệu cười của em bé được em liên tưởng với hình ảnh gì ngộ nghĩnh?',
      'Em cảm nhận được không khí gia đình trở nên vui tươi ấm áp thế nào khi có em bé?'
    ]
  },
  {
    week: 17,
    semester: 1,
    theme: 'Vì hạnh phúc con người',
    genre: 'ta_nguoi',
    genreLabel: 'Tả người',
    lessonTitle: 'Ôn tập về tả người',
    prompt: 'Tả bác lao công (hoặc cô chú công nhân vệ sinh) đang cần mẫn quét rác trên đường phố lúc đêm khuya.',
    outlineGuide: {
      moBai: 'Giới thiệu hình ảnh bác lao công - người thầm lặng giữ gìn vẻ đẹp văn minh cho phố phường.',
      thanBai: [
        'Thời gian & không gian: Đêm khuya thanh vắng, ngọn đèn đường vàng vọt chiếu rọi bóng người đơn độc.',
        'Trang phục & dụng cụ: Bộ quần áo bảo hộ phản quang màu cam nổi bật, đôi găng tay cao su dày dặn, chiếc chổi tre xào xạc cùng chiếc xe gom rác.',
        'Hành động: Bàn tay thoăn thoắt gom từng đống lá rụng, quét sạch rác rưởi ven lề đường; lưng hơi còng xuống nhịp nhàng theo từng nhát chổi.',
        'Tâm tư: Dù gió lạnh buốt giá nhưng ánh mắt vẫn đượm niềm tự hào và trách nhiệm với công việc.'
      ],
      ketBai: 'Cảm phục sự hy sinh thầm lặng của bác lao công và ý thức giữ gìn vệ sinh môi trường chung.'
    },
    sampleEssay: {
      id: 'tuan-17-bac-lao-cong',
      title: 'Tiếng chổi tre thầm lặng làm sạch đẹp phố phường',
      highlights: ['Từ láy: xào xạc, thầm lặng, thoăn thoắt, nhịp nhàng, cần mẫn', 'Từ tượng thanh: Tiếng chổi tre "xoẹt... xoẹt..." xua đi sự vắng lặng của màn đêm', 'Câu ghép nhượng bộ: Mặc dù đêm đông giá rét căm căm, bác lao công vẫn cần mẫn làm việc không ngơi tay'],
      text: `Mỗi sớm mai thức dậy bước ra đường, nhìn những con phố sạch bóng rác rưởi, em lại bồi hồi nhớ đến bóng dáng người lao công cần mẫn giữa màn đêm thanh vắng.

Khi phố phường đã chìm sâu vào giấc ngủ tĩnh mịch, chỉ còn ánh đèn đường vàng vọt hắt bóng xuống mặt đường, cũng là lúc bác lao công bắt đầu công việc nhọc nhằn của mình. Bác khoác trên mình bộ quần áo bảo hộ màu cam có dải phản quang phát sáng, đầu đội chiếc nón lá cũ kỹ. Đôi bàn tay đeo găng cao su thoăn thoắt đưa chiếc chổi tre dài quét đều đặn sang hai bên. Âm thanh "xoẹt... xoẹt... xào xạc" vang lên nhịp nhàng phá tan cái lạnh buốt của màn đêm. Bác cúi gập lưng gom từng đống lá rụng và túi rác gom vào chiếc xe đẩy cồng kềnh. Mặc dù sương đêm buông xuống ướt đẫm vai áo, khuôn mặt bác vẫn toát lên vẻ tận tụy và nụ cười hiền từ khi nhìn đoạn đường mình vừa quét sạch tinh tươm.

Công việc của bác lao công thật bình dị mà cao quý biết bao. Nhờ có những giọt mồ hôi thầm lặng của bác mà thành phố của chúng ta luôn sạch đẹp, xanh tươi mỗi sớm mai thức giấc.`
    },
    vocabularyHints: ['xào xạc', 'thầm lặng', 'tĩnh mịch', 'cần mẫn', 'thoăn thoắt', 'mặc dù... nhưng...'],
    socraticQuestions: [
      'Âm thanh tiếng chổi tre quét trong đêm khuya mang lại cho em những suy ngẫm gì?',
      'Chúng ta cần có hành động thiết thực nào để giúp đỡ các bác lao công vơi bớt nhọc nhằn?'
    ]
  },
  {
    week: 18,
    semester: 1,
    theme: 'Ôn tập cuối học kì 1',
    genre: 'tong_hop',
    genreLabel: 'Ôn tập tổng hợp',
    lessonTitle: 'Kiểm tra định kì cuối học kì 1 (Đánh giá năng lực làm văn miêu tả)',
    prompt: 'Em hãy tả lại một người thân thiết nhất trong gia đình hoặc một cảnh đẹp quê hương đã để lại cho em nhiều tình cảm thiêng liêng nhất.',
    outlineGuide: {
      moBai: 'Dẫn dắt trực tiếp hoặc gián tiếp giới thiệu đối tượng miêu tả (Người thân hoặc cảnh quê hương).',
      thanBai: [
        'Miêu tả bao quát từ xa đến gần, từ ngoại hình đến tính cách hoặc từ không gian đến chi tiết.',
        'Chọn lọc 2-3 chi tiết nghệ thuật tiêu biểu (ánh mắt nụ cười người thân, sự chuyển biến của đất trời quê hương).',
        'Lồng ghép kỷ niệm sâu sắc gắn liền với đối tượng để làm nổi bật cảm xúc chân thật.'
      ],
      ketBai: 'Khẳng định tình cảm bền chặt, lòng biết ơn và ý thức tự hoàn thiện bản thân.'
    },
    sampleEssay: {
      id: 'tuan-18-kiem-tra-cuoi-ki-1',
      title: 'Mẹ yêu - ngọn lửa sưởi ấm gia đình em',
      highlights: ['Sử dụng phong phú từ láy gợi cảm và câu ghép nhiều vế', 'Hình ảnh so sánh độc đáo và giàu cảm xúc', 'Kết bài mở rộng sâu sắc và giàu tính giáo dục nhân văn'],
      text: `Có một người luôn dõi theo từng bước đi của em từ thuở lọt lòng, người dành trọn tình yêu thương bao la như biển thái bình cho em, đó chính là mẹ kính yêu.

Mẹ em năm nay bốn mươi tuổi, lứa tuổi đằm thắm và chín chắn của người phụ nữ gia đình. Mẹ có dáng người mảnh mai, khuôn mặt trái xoan hiền hậu luôn toát lên vẻ dịu dàng, nhân từ. Mái tóc đen dài mượt mà phảng phất hương hoa bưởi thoang thoảng mỗi khi mẹ gội đầu xong. Đôi mắt mẹ sâu thẳm, đen láy như hạt nhãn lồng, đôi mắt ấy biết cười khi em đạt điểm tốt nhưng cũng đượm buồn lo lắng khi em ốm đau sốt li bì. Bàn tay mẹ không còn mềm mại mà đã chai sần, gân guốc vì bao năm tháng vất vả chắt chiu nuôi nấng em khôn lớn. Mỗi tối, dưới ánh đèn bàn ấm áp, mẹ lại kiên nhẫn ngồi cạnh hướng dẫn em giải từng bài toán khó, giọng nói mẹ truyền cảm như dòng suối mát lành gieo vào lòng em niềm tin và ước mơ.

Mẹ là điểm tựa vững chắc nhất, là ngọn hải đăng soi sáng con đường em đi. Em thầm hứa sẽ luôn chăm ngoan, học giỏi để nụ cười mãi rạng rỡ trên môi mẹ kính yêu.`
    },
    vocabularyHints: ['đằm thắm', 'sâu thẳm', 'chai sần', 'thoang thoảng', 'dịu dàng', 'không chỉ... mà còn...'],
    socraticQuestions: [
      'Chi tiết nào về người mẹ hoặc cảnh sắc quê hương khiến bài văn của em mang đậm dấu ấn cá nhân nhất?',
      'Em đã kết hợp các biện pháp tu từ nào (so sánh, nhân hóa, điệp từ) để nâng tầm bài viết?'
    ]
  },

  // ==========================================
  // TẬP 2: TUẦN 19 - TUẦN 35 (HỌC KÌ 2)
  // ==========================================
  {
    week: 19,
    semester: 2,
    theme: 'Người công dân',
    genre: 'ta_nguoi',
    genreLabel: 'Tả người',
    lessonTitle: 'Luyện tập viết đoạn văn cảm nghĩ & Thuyết minh',
    prompt: 'Tả chú bộ đội hải quân đang ngày đêm kiên cường đứng gác nơi đảo xa canh giữ bình yên cho Tổ quốc.',
    outlineGuide: {
      moBai: 'Giới thiệu về hình ảnh người lính hải quân can trường nơi đầu sóng ngọn gió.',
      thanBai: [
        'Vóc dáng & quân phục: Dáng người rắn rỏi, vai rộng hiên ngang; bộ quân phục trắng viền xanh cùng chiếc mũ có dải yếm bay trong gió biển.',
        'Gương mặt: Làn da sạm đen vì nắng gió biển mặn mòi, ánh mắt kiên định, quả cảm dõi nhìn ra xa xăm bờ cõi.',
        'Tư thế đứng gác: Tay ôm chắc cây súng thép trước ngực, chân đứng vững chãi trên mỏm đá ngọn sóng bạc đầu.',
        'Tâm tư tình cảm: Nhớ về đất liền yêu thương nhưng lòng son sắt quyết tâm bảo vệ từng tấc đảo quê hương.'
      ],
      ketBai: 'Bày tỏ lòng biết ơn sâu sắc và niềm tự hào đối với các chú bộ đội nơi biên cương hải đảo.'
    },
    sampleEssay: {
      id: 'tuan-19-chu-bo-doi-hai-quan',
      title: 'Người chiến sĩ hải quân kiên trung nơi đầu sóng',
      highlights: ['Từ láy: rắn rỏi, vững chãi, kiên trung, dạt dào', 'Hình ảnh nhân hóa & so sánh: Chú đứng sừng sững như bức tường thành thép giữa muôn trùng sóng gió', 'Câu ghép: Dù sóng gió bão bùng có gầm thét, ánh mắt người lính đảo vẫn sáng ngời niềm tin bất khuất'],
      text: `Nơi hải đảo xa xôi của Tổ quốc, giữa muôn trùng sóng gió gầm vang, hình ảnh chú bộ đội hải quân đứng gác luôn khắc sâu trong lòng em niềm tự hào và khâm phục khôn xiết.

Chú hải quân có thân hình cao lớn, rắn rỏi và săn chắc như được tôi luyện từ nắng gió đại dương. Làn da chú rám nắng màu đồng hun dạn dày sương gió, nổi bật trên nền bộ quân phục trắng sọc xanh viền biển tinh tươm. Chiếc mũ hải quân với hai dải yếm xanh phấp phới bay theo từng ngọn gió lộng. Đôi mắt chú sáng ngời, tinh anh và kiên định, luôn dõi nhìn ra biển khơi bao la để kịp thời phát hiện mọi biến chuyển nơi chân trời. Chú đứng gác trên mỏm đá chông chênh, hai bàn tay rắn chắc ôm chặt khẩu súng thép trước ngực. Sóng biển dâng trào tung bọt trắng xóa gầm gào dội vào vách đá, nhưng bóng chú vẫn đứng hiên ngang, vững chãi như một cột mốc chủ quyền bất diệt.

Trong nụ cười tươi tắn của chú luôn đượm tình yêu đất liền tha thiết. Chúng em được cắp sách tới trường trong yên bình hôm nay chính là nhờ sự hy sinh thầm lặng của các chú, em tự nhủ phải học thật giỏi để mai này góp sức dựng xây đất nước.`
    },
    vocabularyHints: ['rắn rỏi', 'săn chắc', 'phấp phới', 'vững chãi', 'hiên ngang', 'mặc dù... nhưng...'],
    socraticQuestions: [
      'Tư thế hiên ngang của chú bộ đội giữa sóng gió gợi cho em liên tưởng đến điều gì?',
      'Em muốn gửi gắm lời chúc hay tình cảm gì tới các chiến sĩ đang làm nhiệm vụ nơi đảo xa?'
    ]
  },
  {
    week: 20,
    semester: 2,
    theme: 'Người công dân',
    genre: 'ta_do_vat',
    genreLabel: 'Tả đồ vật',
    lessonTitle: 'Luyện tập tả đồ vật (Đồ dùng học tập)',
    prompt: 'Tả chiếc cặp sách thân thiết đã đồng hành cùng em suốt năm học lớp 5.',
    outlineGuide: {
      moBai: 'Giới thiệu chiếc cặp sách (Ai tặng, nhân dịp gì, thời gian gắn bó).',
      thanBai: [
        'Hình dáng & kích thước: Cặp hình chữ nhật, vừa vặn đựng sách vở; chất liệu vải dù chống thấm nước.',
        'Màu sắc & họa tiết: Màu xanh dương tươi sáng, nắp cặp in hình chú mèo máy Doraemon đáng yêu.',
        'Các bộ phận: Quai đeo êm ái, khóa cặp bấm "tách" giòn tan, ngăn lớn đựng sách giáo khoa, ngăn nhỏ đựng hộp bút và thước kẻ.',
        'Công dụng & sự gắn bó: Giữ gìn sách vở phẳng phiu, cùng em trải qua từng buổi học nắng mưa.'
      ],
      ketBai: 'Tình cảm yêu quý, coi chiếc cặp như người bạn thân và giữ gìn cẩn thận.'
    },
    sampleEssay: {
      id: 'tuan-20-chiec-cap-sach',
      title: 'Chiếc cặp sách Doraemon - người bạn đồng hành tin cậy của em',
      highlights: ['Từ gợi tả âm thanh & hình khối: vuông vắn, êm ái, giòn tan, phẳng phiu', 'Nghệ thuật nhân hóa: Chiếc cặp ngoan ngoãn nằm trên lưng em che chở cho sách vở', 'Câu ghép: Tuy chiếc cặp đã cùng em trải qua nhiều mùa mưa nắng, nhưng nó vẫn luôn bền đẹp và sáng màu'],
      text: `Vào đầu năm học lớp 5, mẹ đã mua tặng em một chiếc cặp sách màu xanh dương tuyệt đẹp. Kể từ ngày hôm đó, chiếc cặp đã trở thành người bạn đồng hành thân thiết nhất của em trên mọi nẻo đường đến trường.

Chiếc cặp có dáng hình chữ nhật vuông vắn, được may bằng chất liệu vải dù cao cấp rất dày dặn và có khả năng chống thấm nước tuyệt vời. Nắp cặp nổi bật với hình ảnh chú mèo máy Doraemon đang tươi cười giơ tay vẫy chào vui vẻ. Hai bên sườn cặp có hai ngăn lưới nhỏ tiện lợi, nơi em thường để bình nước và chiếc ô mini. Khóa cặp làm bằng nhựa dẻo cao cấp, mỗi lần đóng mở lại phát ra tiếng "tách" giòn tan vui tai. Bên trong cặp chia làm ba ngăn rộng rãi: ngăn chính em xếp ngay ngắn các cuốn sách giáo khoa và vở bài tập phẳng phiu; hai ngăn phụ nhỏ hơn là nơi trú ngụ của hộp bút chì màu và các dụng cụ học tập. Quai đeo có đệm mút dày dặn, giúp đôi vai em luôn êm ái dù cặp có nặng.

Mỗi ngày, chiếc cặp như một chiếc ba lô kỳ diệu chứa đựng cả kho tàng tri thức quý báu của em. Em luôn giữ gìn cặp thật cẩn thận, không để vấy bẩn để người bạn nhỏ này sẽ cùng em đi qua trọn vẹn những năm tháng tiểu học tươi đẹp.`
    },
    vocabularyHints: ['vuông vắn', 'êm ái', 'giòn tan', 'phẳng phiu', 'dày dặn', 'tuy... nhưng...'],
    socraticQuestions: [
      'Tiếng mở khóa cặp hay cảm giác sờ vào chất liệu vải dù mang lại cho em ấn tượng gì?',
      'Em chăm sóc và sắp xếp sách vở trong cặp mỗi tối ra sao để thể hiện sự ngăn nắp?'
    ]
  },
  {
    week: 21,
    semester: 2,
    theme: 'Người công dân',
    genre: 'ta_do_vat',
    genreLabel: 'Tả đồ vật',
    lessonTitle: 'Ôn tập về tả đồ vật (Đồ chơi gắn bó tuổi thơ)',
    prompt: 'Tả một món đồ chơi tuổi thơ mà em vô cùng yêu quý (chú gấu bông, chiếc xe cứu hỏa hoặc bộ xếp hình).',
    outlineGuide: {
      moBai: 'Giới thiệu món đồ chơi gắn bó (Được tặng dịp sinh nhật hoặc phần thưởng học tập).',
      thanBai: [
        'Hình dáng & kích thước: Chú gấu to bằng em bé một tuổi, bộ lông màu nâu hạt dẻ mềm mại như nhung.',
        'Các chi tiết ngộ nghĩnh: Đôi tai tròn xoe, đôi mắt đen láy bằng nhựa lấp lánh như hai hạt cườm, cái mũi gắn nút tròn đen ngộ nghĩnh; cổ thắt chiếc nơ đỏ xinh xắn.',
        'Kỷ niệm bên món đồ chơi: Luôn ôm ngủ mỗi tối, tâm sự những chuyện buồn vui học tập.'
      ],
      ketBai: 'Ý nghĩa của món đồ chơi trong tuổi thơ và lời hứa luôn trân trọng giữ gìn.'
    },
    sampleEssay: {
      id: 'tuan-21-chu-gau-bong',
      title: 'Chú gấu bông Misa ấm áp - kỷ vật sinh nhật tuổi lên mười',
      highlights: ['Từ tượng hình: mềm mại, tròn xoe, lấp lánh, ngộ nghĩnh, ấm áp', 'Biện pháp nhân hóa: Chú gấu chăm chú lắng nghe từng lời tâm sự của em', 'Câu ghép có cặp từ hô ứng: Hễ em đi học về là em lại chạy ngay vào phòng ôm chú gấu Misa vào lòng'],
      text: `Nhân dịp sinh nhật tròn mười tuổi, em được chị gái tặng một chú gấu bông vô cùng dễ thương tên là Misa. Chú gấu đã trở thành người bạn tâm sự tri kỉ của em mỗi ngày.

Chú gấu Misa có thân hình mập mạp, cao chừng bốn mươi xăng-ti-mét. Toàn thân chú được bao bọc bởi một lớp lông tơ màu nâu hạt dẻ mềm mại, sờ vào mịn màng như nhung. Cái đầu chú tròn xoe với hai chiếc tai vểnh lên như đang tò mò nghe ngóng. Đôi mắt Misa làm bằng hai hạt cườm đen láy, lấp lánh và trong veo như có hồn. Cái mũi màu đen ươn ướt nhô ra ngộ nghĩnh, bên dưới là chiếc miệng nhỏ luôn mỉm cười thân thiện. Ở cổ chú được thắt một chiếc nơ vải ca-rô màu đỏ rực rỡ, làm cho Misa trông chẳng khác nào một chàng hiệp sĩ tí hon bảnh bao. Bốn cái chân ngắn cũn có những đệm thịt màu hồng xinh xắn.

Mỗi đêm mùa đông lạnh giá, được ôm Misa vào lòng ngủ ấm áp vô cùng. Mỗi khi gặp chuyện buồn vui ở lớp, em đều thì thầm kể cho Misa nghe, chú như biết lắng nghe và luôn nhìn em mỉm cười an ủi. Dù sau này có lớn lên, em vẫn mãi trân trọng chú gấu Misa này.`
    },
    vocabularyHints: ['mập mạp', 'mịn màng', 'lấp lánh', 'ngộ nghĩnh', 'ấm áp', 'hễ... là...'],
    socraticQuestions: [
      'Khuôn mặt và nụ cười của chú gấu bông mang lại cho em sự ấm áp thế nào trong phòng ngủ?',
      'Em học được bài học gì về việc biết trân quý những món quà do người thân trao tặng?'
    ]
  },
  {
    week: 22,
    semester: 2,
    theme: 'Vì cuộc sống thanh bình',
    genre: 'ta_con_vat',
    genreLabel: 'Tả con vật',
    lessonTitle: 'Lập dàn ý bài văn tả con vật',
    prompt: 'Tả chú mèo mướp ngộ nghĩnh, tinh khôn nuôi trong gia đình em.',
    outlineGuide: {
      moBai: 'Giới thiệu con vật nuôi quen thuộc: Chú mèo mướp tên Miu Miu.',
      thanBai: [
        'Ngoại hình: Bộ lông màu vàng xen sọc xám đen óng mượt; đầu tròn như cuộn len, tai nhọn hoắt nghe ngóng.',
        'Đôi mắt & ria mép: Đôi mắt màu ngọc bích sáng rực trong đêm, chiếc mũi hồng ươn ướt, hàng ria mép rung rinh lợi hại.',
        'Thói quen sinh hoạt: Ban ngày thích nằm sưởi nắng hiên nhà, liếm láp vuốt ve bộ lông.',
        'Tài bắt chuột: Ban đêm thoăn thoắt rình mồi, bước đi êm ru nhờ đệm thịt dưới chân, vồ chuột nhanh như chớp.'
      ],
      ketBai: 'Tình cảm gắn bó yêu quý chú mèo và ích lợi của chú đối với gia đình.'
    },
    sampleEssay: {
      id: 'tuan-22-chu-meo-muop',
      title: 'Chú mèo Miu Miu - dũng sĩ bắt chuột cừ khôi',
      highlights: ['Từ gợi tả: óng mượt, nhọn hoắt, rung rinh, êm ru, thoăn thoắt', 'So sánh sinh động: Đôi mắt chú sáng long lanh như hai hòn bi ve trong bóng đêm', 'Câu ghép: Nhờ có bốn đệm thịt êm dưới bàn chân, chú mèo di chuyển nhẹ nhàng mà không hề phát ra một tiếng động nhỏ'],
      text: `Gia đình em có nuôi một chú mèo mướp rất kháu khỉnh và tinh ranh. Em đặt tên cho chú là Miu Miu.

Miu Miu khoác trên mình bộ lông dày mượt mà màu vàng nghệ xen kẽ những vệt vằn đen xám, trông chú chẳng khác nào một chú hổ con dũng mãnh. Đầu chú tròn xoe như một cuộn len nhỏ. Hai cái tai hình tam giác nhọn hoắt lúc nào cũng vểnh lên nghe ngóng mọi tiếng động xung quanh. Đôi mắt Miu màu xanh ngọc bích, ban ngày đồng tử thu nhỏ lại như một sợi chỉ mảnh nhưng khi màn đêm buông xuống, đôi mắt ấy lại mở to tròn xoe, sáng rực long lanh như hai viên ngọc phát sáng. Chiếc mũi màu hồng phấn lúc nào cũng ươn ướt, hai bên mép là hàng ria trắng như cước rung rinh giúp chú định vị đường đi trong bóng tối. Dưới bốn bàn chân là những đệm thịt êm ái, giấu kín bộ móng vuốt sắc nhọn chỉ giương ra khi vồ mồi.

Ban ngày, Miu Miu lười biếng cuộn tròn sưởi nắng ngoài hiên nhà. Nhưng khi đêm xuống, chú biến thành một dũng sĩ săn chuột cừ khôi: bước đi rón rén không tiếng động rồi bất ngờ lao vút tới tóm gọn tên chuột nhắt phá hoại. Em rất yêu chú mèo Miu Miu và luôn chăm sóc chú thật chu đáo mỗi ngày.`
    },
    vocabularyHints: ['óng mượt', 'nhọn hoắt', 'long lanh', 'rón rén', 'êm ái', 'nhờ... nên...'],
    socraticQuestions: [
      'Em có quan sát thấy đôi mắt chú mèo biến đổi kì diệu từ ban ngày sang ban đêm thế nào không?',
      'Em hãy đặt một câu văn dùng biện pháp nhân hóa để miêu tả lúc chú mèo rình bắt chuột nhé!'
    ]
  },
  {
    week: 23,
    semester: 2,
    theme: 'Vì cuộc sống thanh bình',
    genre: 'ta_con_vat',
    genreLabel: 'Tả con vật',
    lessonTitle: 'Luyện tập viết đoạn văn tả con vật (Ngoại hình & tiếng gáy)',
    prompt: 'Tả chú gà trống oai vệ cất tiếng gáy vang báo thức buổi sáng sớm.',
    outlineGuide: {
      moBai: 'Giới thiệu chú gà trống - "chiếc đồng hồ báo thức" sống động của xóm làng.',
      thanBai: [
        'Vóc dáng & bộ lông: Thân hình vạm vỡ, oai phong; bộ lông sặc sỡ màu đỏ tía và xanh đen óng ánh dưới ánh nắng.',
        'Mào gà & đôi mắt: Chiếc mào đỏ chót như chiếc vương miện hoàng gia; đôi mắt tròn xoe sáng quắc, mỏ khoằm vàng nhọn.',
        'Đôi chân & cựa: Đôi chân bọc vảy vàng cứng cáp, cặp cựa nhọn hoắt như hai mũi giáo.',
        'Tiếng gáy ban mai: Đậu trên đống rơm, vỗ cánh phành phạch, vươn cao cổ cất tiếng gáy vang rền "Ò... ó... o... o..." đánh thức xóm làng.'
      ],
      ketBai: 'Tình cảm yêu mến chú gà trống dũng cảm, chăm chỉ báo thức mỗi sớm mai.'
    },
    sampleEssay: {
      id: 'tuan-23-chu-ga-trong',
      title: 'Chú gà trống oai vệ - chàng hiệp sĩ của bình minh',
      highlights: ['Từ gợi hình gợi thanh: oai vệ, óng ánh, phành phạch, dõng dạc, sáng quắc', 'Nghệ thuật so sánh & nhân hóa: Chiếc mào đỏ chót như vương miện hoàng gia, dáng đi oai phong như một vị tướng quân', 'Câu ghép: Chú vừa vỗ cánh cất tiếng gáy vang rền thì cả xóm làng đã bừng tỉnh đón ngày mới'],
      text: `Mỗi sáng sớm mai, âm thanh quen thuộc đánh thức cả xóm làng em thức giấc chính là tiếng gáy vang dội, hào sảng của chú gà trống tía nhà em.

Chú gà trống có một thân hình to lớn, oai phong lẫm liệt tựa như một vị tướng quân dũng mãnh. Bộ lông của chú là một tuyệt tác sắc màu: phần cổ và lưng phủ lớp lông màu đỏ tía óng ả, còn phần đuôi cong vút như một chiếc cầu vồng nhỏ với những sợi lông màu xanh đen óng ánh ánh kim. Trên đỉnh đầu, chiếc mào đỏ chót hình răng cưa kiêu hãnh vươn cao như một chiếc vương miện danh giá. Đôi mắt chú tròn xoe, đen láy và sáng quắc. Chiếc mỏ màu vàng ngà nhọn hoắt có thể mổ thóc thoăn thoắt. Đôi chân chú cứng cáp được bao phủ bởi lớp vảy vàng sậm, sau gót chân nhô ra hai chiếc cựa nhọn như hai mũi dao sắc lẹm.

Sáng sớm, chú nhảy tót lên đống rơm cao nhất đầu ngõ. Chú ưỡn căng lồng ngực vạm vỡ, vỗ hai cánh "phành phạch" giòn giã rồi vươn dài cổ cất tiếng gáy: "Ò... ó... o... o..." vang rền khắp không gian. Chú gà trống thực sự là chiếc đồng hồ báo thức tuyệt vời và đáng tin cậy của gia đình em.`
    },
    vocabularyHints: ['oai vệ', 'óng ả', 'phành phạch', 'sáng quắc', 'lẫm liệt', 'vừa... thì...'],
    socraticQuestions: [
      'Điệu bộ của chú gà khi chuẩn bị cất tiếng gáy (nhảy lên cao, vỗ cánh, vươn cổ) thể hiện sự tự tin thế nào?',
      'Em có cảm xúc gì khi nghe tiếng gáy rộn rã ấy báo hiệu một ngày mới bắt đầu?'
    ]
  },
  {
    week: 24,
    semester: 2,
    theme: 'Vì cuộc sống thanh bình',
    genre: 'ta_con_vat',
    genreLabel: 'Tả con vật',
    lessonTitle: 'Luyện tập tả con vật (Hoạt động & đức tính trung thành)',
    prompt: 'Tả chú chó thông minh, trung thành nuôi trong nhà em (chú chó Mực hoặc chú Vàng).',
    outlineGuide: {
      moBai: 'Giới thiệu chú chó trung thành - người vệ sĩ đáng tin cậy của ngôi nhà.',
      thanBai: [
        'Ngoại hình: Toàn thân khoác bộ lông vàng óng (hoặc đen tuyền mượt mà); bốn chân cao gầy, bước đi vững chãi.',
        'Đầu và giác quan: Đôi tai dựng đứng tinh nghịch, chiếc mũi đen ươn ướt đánh hơi cực thính, đôi mắt nâu sẫm nhìn chủ đong đầy âu yếm.',
        'Tính trung thành & canh giữ nhà: Ban đêm nằm canh trước hiên, nghe tiếng động lạ là sủa vang cảnh giác.',
        'Mừng rỡ khi đón chủ: Ngoe nguẩy đuôi tít mù, chạy nhảy tung tăng quanh chân, dụi đầu vào tay em.'
      ],
      ketBai: 'Tình bạn thân thiết, gắn bó giữa người và vật nuôi; coi chú chó như một thành viên trong nhà.'
    },
    sampleEssay: {
      id: 'tuan-24-chu-cho-trung-thanh',
      title: 'Chú chó Vàng - người bạn trung thành giữ cửa',
      highlights: ['Từ tượng hình: mượt mà, ngoe nguẩy, tít mù, quấn quýt, âu yếm', 'Nghệ thuật nhân hóa: Chú chó như hiểu được nỗi vui buồn của chủ nhân', 'Câu ghép chỉ điều kiện: Hễ thấy bóng em từ đầu ngõ là chú Vàng đã lao tót ra đón mừng rối rít'],
      text: `Trong các loài vật nuôi, chú chó Vàng là người bạn bốn chân trung thành và gắn bó sâu sắc nhất với gia đình em suốt bốn năm qua.

Vàng khoác trên mình bộ lông màu vàng mượt mà như tơ tằm. Chú có thân hình săn chắc, khỏe khoắn với bốn cẳng chân thon dài giúp chú chạy nhanh như một làn gió thoảng. Cái đầu chú hơi thon dài, hai chiếc tai hình tam giác lúc nào cũng dựng đứng lên để nghe ngóng mọi thanh âm dù là nhỏ nhất. Đôi mắt Vàng màu nâu sẫm, tròn xoe và ánh lên sự thông minh, trung thành hiếm có. Chiếc mũi đen bóng lúc nào cũng ươn ướt, khịt khịt đánh hơi tài tình. Cái đuôi cong cong hình lưỡi liềm lúc nào cũng ngoe nguẩy tít mù mỗi khi chú vui mừng.

Vàng là một người gác cổng mẫn cán. Ban đêm, chú nằm phục trước thềm nhà, chỉ cần một tiếng bước chân lạ ngoài cổng là chú lập tức sủa vang từng tràng dõng dạc. Mỗi buổi chiều khi em đi học về, vừa nghe tiếng cạch cửa, Vàng đã lao tót ra ngõ, chồm hai chân trước lên người em rối rít rồi dụi đầu vào tay em nũng nịu. Em coi Vàng như một người em nhỏ thân thiết và luôn chăm sóc chú bằng cả tình yêu thương.`
    },
    vocabularyHints: ['mượt mà', 'ngoe nguẩy', 'tít mù', 'rối rít', 'thông minh', 'chỉ cần... là...'],
    socraticQuestions: [
      'Hành động mừng rỡ của chú chó khi đón em đi học về biểu lộ tình cảm gắn bó thế nào?',
      'Em đã bao giờ thấy chú chó dũng cảm bảo vệ ngôi nhà khỏi người lạ chưa?'
    ]
  },
  {
    week: 25,
    semester: 2,
    theme: 'Nhớ nguồn',
    genre: 'ta_con_vat',
    genreLabel: 'Tả con vật',
    lessonTitle: 'Luyện tập tả loài vật gắn bó với đồng quê Việt Nam',
    prompt: 'Tả con trâu hiền lành, cần cù gặm cỏ bên bờ đê làng quê Việt Nam.',
    outlineGuide: {
      moBai: 'Giới thiệu hình ảnh con trâu - "đầu cơ nghiệp" gắn bó thủy chung với người nông dân.',
      thanBai: [
        'Vóc dáng: Thân hình to lớn vạm vỡ, nước da đen bóng khỏe khoắn, bụng to tròn như cái chum.',
        'Đầu & sừng: Đầu trâu to, cặp sừng cong vút như hai cánh cung dũng mãnh bảo vệ mình; đôi mắt to tròn hiền lành.',
        'Hành động gặm cỏ: Miệng nhai cỏ ngấu nghiến chậm rãi, chiếc đuôi dài có chùm lông ở chóp phe phẩy xua ruồi muỗi.',
        'Sự cần mẫn: Kéo cày chăm chỉ suốt vụ mùa mà không một lời than vãn; tắm mát dưới dòng sông quê.'
      ],
      ketBai: 'Cảm nghĩ về vẻ đẹp mộc mạc của chú trâu và biểu tượng cần cù của làng quê Việt Nam.'
    },
    sampleEssay: {
      id: 'tuan-25-con-trau-lang-que',
      title: 'Con trâu hiền lành - người bạn thủy chung của nhà nông',
      highlights: ['Từ láy: cần cù, vạm vỡ, chậm rãi, phe phẩy, hiền lành', 'So sánh: Cặp sừng đen bóng cong vút như chiếc cung tên kiên cố', 'Câu ghép: Dù công việc cày bừa có nhọc nhằn vất vả, chú trâu vẫn luôn kiên nhẫn bước từng bước vững chãi trên thửa ruộng phù sa'],
      text: `"Trâu ơi ta bảo trâu này - Trâu ra ngoài ruộng trâu cày với ta". Câu ca dao quen thuộc ấy lại vang lên trong tâm trí em mỗi khi ngắm nhìn đàn trâu thong thả gặm cỏ bên bờ đê làng quê lộng gió.

Chú trâu có thân hình vạm vỡ, đồ sộ như một cỗ xe tăng tí hon. Toàn thân chú bao phủ bởi lớp da dày màu xám đen bóng loáng, rắn rỏi vì dãi dầu mưa nắng. Bốn chân chú to bè, móng trâu dày cộp cắm chắc xuống bùn lầy giúp chú bước đi vững chãi. Điểm nổi bật nhất trên đầu chú là cặp sừng cong vút hình cánh cung, đen nhánh và nhọn hoắt, vừa là vũ khí tự vệ vừa tôn thêm vẻ oai nghiêm. Thế nhưng, ẩn dưới cặp sừng dũng mãnh ấy lại là đôi mắt to tròn đen láy, ánh lên cái nhìn hiền từ, thuần hậu đến lạ kỳ.

Buổi chiều, chú trâu thong dong gặm cỏ bên triền đê xanh mướt. Miệng chú nhai chậm rãi từng ngọn cỏ non, chiếc đuôi dài phe phẩy xua lũ ruồi muỗi quấy rầy. Chú trâu không chỉ giúp nhà nông cày cấy làm ra hạt lúa mà còn là biểu tượng đẹp đẽ cho đức tính cần cù, chịu thương chịu khó của người nông dân Việt Nam.`
    },
    vocabularyHints: ['vạm vỡ', 'cần cù', 'chậm rãi', 'phe phẩy', 'thuần hậu', 'không những... mà còn...'],
    socraticQuestions: [
      'Ánh mắt hiền lành của chú trâu đối lập với cặp sừng cong vút dũng mãnh tạo nên ấn tượng gì?',
      'Em có suy nghĩ gì về vai trò gắn bó keo sơn giữa con trâu và người nông dân nước ta?'
    ]
  },
  {
    week: 26,
    semester: 2,
    theme: 'Nhớ nguồn',
    genre: 'ta_cay_coi',
    genreLabel: 'Tả cây cối',
    lessonTitle: 'Tả cây cối (Mùa thay lá và đâm chồi)',
    prompt: 'Tả cây bàng già trên sân trường em qua các mùa thay lá (mùa đông rụng lá và mùa xuân nảy lộc).',
    outlineGuide: {
      moBai: 'Giới thiệu cây bàng sừng sững nơi góc sân trường em.',
      thanBai: [
        'Vóc dáng bao quát: Thân cây xù xì to lớn, các cành xòe ra từng tầng từng lớp như những chiếc ô khổng lồ.',
        'Mùa đông: Lá bàng chuyển sang màu đỏ ối rồi rụng dần, cành cây trơ trụi khẳng khiu chống chọi với gió rét.',
        'Mùa xuân: Cây bừng tỉnh giấc, những búp non mơn mởn nhọn như búp măng xanh biếc nhú ra ngập tràn sức sống.',
        'Sự gắn bó: Tỏa bóng mát cho học sinh chơi đùa, chứng kiến bao thế hệ học trò trưởng thành.'
      ],
      ketBai: 'Tình cảm thân thương gắn bó với cây bàng và mái trường tiểu học.'
    },
    sampleEssay: {
      id: 'tuan-26-cay-bang-san-truong',
      title: 'Bác bàng già bốn mùa thay áo mới trên sân trường em',
      highlights: ['Từ gợi hình: khẳng khiu, mơn mởn, xù xì, trơ trụi, rực rỡ', 'Biện pháp nhân hóa: Bác bàng già kiên cường gồng mình qua mùa đông giá lạnh để đâm chồi mùa xuân', 'Câu ghép có quan hệ tương phản: Tuy mùa đông cây bàng trơ trụi khẳng khiu, nhưng khi mùa xuân về cây lại bừng lên sức sống mãnh liệt'],
      text: `Sừng sững nơi góc sân trường em là một cây bàng cổ thụ to lớn. Không ai biết bác bàng đã đứng đó tự bao giờ, chỉ biết rằng từ ngày em chập chững bước vào lớp Một, bác bàng đã ở đó che chở cho chúng em.

Thân cây bàng to bằng hai vòng tay em ôm, lớp vỏ nâu xám xù xì in hằn những vết nứt nẻ của thời gian. Các cành lớn xòe ngang thành từng tầng từng lớp đều đặn như những chiếc ô xanh khổng lồ xếp chồng lên nhau. Vào mùa đông, cây bàng như bước vào giấc ngủ trầm ngâm. Những chiếc lá chuyển sang màu đỏ ối rực rỡ rồi lần lượt rụng xuống xào xạc theo từng cơn gió bấc, để trơ lại những cành khẳng khiu kiên cường chống chọi với giá rét. Thế nhưng, khi những hạt mưa xuân ấm áp rơi xuống, cây bàng bừng tỉnh giấc nồng. Hàng ngàn búp non xanh mướt mọc ra chi chít trên các đầu cành, nhọn hoắt như những ngọn lửa xanh bừng sáng. Chỉ ít lâu sau, màu xanh mơn mởn lại bao phủ khắp sân trường, đem đến bóng mát rượi cho chúng em vui chơi trong giờ giải lao.

Cây bàng như một chứng nhân lịch sử lưu giữ bao kỷ niệm trong trẻo của tuổi học trò. Dù sau này có rời xa mái trường, hình ảnh cây bàng bốn mùa thay áo vẫn mãi in đậm trong ký ức của em.`
    },
    vocabularyHints: ['khẳng khiu', 'mơn mởn', 'xù xì', 'trầm ngâm', 'bừng tỉnh', 'tuy... nhưng...'],
    socraticQuestions: [
      'Sự đối lập giữa cây bàng mùa đông rụng lá và mùa xuân đâm chồi dạy cho em bài học gì về sức sống?',
      'Em có kỷ niệm nào vui nhất dưới gốc cây bàng cùng bạn bè trong giờ ra chơi?'
    ]
  },
  {
    week: 27,
    semester: 2,
    theme: 'Nhớ nguồn',
    genre: 'ta_cay_coi',
    genreLabel: 'Tả cây cối',
    lessonTitle: 'Luyện tập tả cây cối (Mùa hoa khoe sắc)',
    prompt: 'Tả cây phượng vĩ già trên sân trường em bừng nở ngàn đốm lửa đỏ rực rỡ khi mùa hè về.',
    outlineGuide: {
      moBai: 'Giới thiệu cây phượng vĩ già - loài cây gắn liền với tuổi học trò và tiếng ve gọi hè.',
      thanBai: [
        'Bao quát: Cây phượng sừng sững giữa sân trường như một chiếc ô hoa đỏ khổng lồ.',
        'Thân & rễ: Thân to, vỏ nâu sần sùi; rễ cây uốn lượn trồi lên mặt đất như những chú trăn khổng lồ.',
        'Lá & hoa: Lá phượng nhỏ li ti như lông chim; hoa phượng năm cánh đỏ rực rỡ, nhụy hoa cong cong duyên dáng.',
        'Âm thanh & kỷ niệm: Tiếng ve râm ran trong tán lá tạo nên bản hòa ca mùa hạ; hoa phượng báo hiệu mùa chia tay và thi cử.'
      ],
      ketBai: 'Cảm xúc bồi hồi, tình yêu tha thiết với cây phượng và mái trường mến yêu.'
    },
    sampleEssay: {
      id: 'tuan-27-cay-phuong-vi-mua-he',
      title: 'Tả cây phượng vĩ già trên sân trường em vào một ngày đầu hạ',
      highlights: ['So sánh: Cây phượng như chiếc ô khổng lồ, hoa phượng như hàng nghìn đốm lửa bập bùng', 'Từ tượng hình tượng thanh: sừng sững, li ti, e ấp, rực rỡ, râm ran', 'Câu ghép hô ứng: Hè vừa sang thì những chùm hoa phượng đã thắp lửa đỏ rực cả góc trời'],
      text: `Giữa sân trường em sừng sững một cây phượng vĩ già, người bạn lớn đã chứng kiến biết bao mùa tựu trường và chia tay của chúng em.

Nhìn từ xa, cây phượng như một chiếc ô khổng lồ màu xanh biếc che mát cả một góc sân. Thân cây to bằng một vòng tay em ôm, lớp vỏ nâu xù xì, nổi lên những vết nứt nẻ in hằn dấu vết của năm tháng. Rễ cây bò lan ngoằn ngoèo trồi lên khỏi mặt đất như những chú trăn khổng lồ đang nằm nghỉ ngơi. Từ thân cây, các cành lớn vươn dài như những cánh tay vững chãi đón lấy ánh nắng ban mai. Lá phượng nhỏ nhắn, mơn mởn, xếp đều nhau như những chiếc lông chim tí hon. Vào những ngày đầu hạ, từ các kẽ lá, những nụ hoa phượng e ấp bắt đầu thức giấc. Chỉ vài ngày sau, cả cây phượng bừng nở rực rỡ, tựa như hàng nghìn đốm lửa bập bùng thắp sáng góc trời. Những chú ve sầu nấp trong vòm lá cũng cất tiếng hát rộn ràng, làm nên bản hòa ca mùa hạ.

Mỗi giờ ra chơi, chúng em lại tụ tập dưới bóng râm mát rượi của bác phượng để đọc sách và chơi trò nhảy dây. Mặc dù sau này phải rời xa mái trường tiểu học, nhưng hình ảnh cây phượng vĩ thân thương vẫn sẽ in sâu trong tâm trí em.`
    },
    vocabularyHints: ['sừng sững', 'xù xì', 'e ấp', 'bập bùng', 'rộn ràng', 'mặc dù... nhưng...'],
    socraticQuestions: [
      'Màu sắc rực rỡ của hoa phượng gợi cho em những liên tưởng gì về tuổi học trò?',
      'Em cảm thấy thế nào khi tiếng ve ngân vang cùng lúc hoa phượng nở báo hiệu kì nghỉ hè sắp đến?'
    ]
  },
  {
    week: 28,
    semester: 2,
    theme: 'Ôn tập giữa học kì 2',
    genre: 'ta_cay_coi',
    genreLabel: 'Tả cây cối',
    lessonTitle: 'Ôn tập miêu tả cây ăn quả',
    prompt: 'Tả một cây ăn quả sai trĩu quả thơm ngon trong vườn nhà em hoặc vườn bà ngoại (cây xoài cát, cây bưởi hoặc cây nhãn).',
    outlineGuide: {
      moBai: 'Giới thiệu cây ăn quả do người thân trồng và chăm sóc trong vườn.',
      thanBai: [
        'Bao quát: Cây tỏa bóng râm mát rượi, tán lá xanh thẫm um tùm.',
        'Thân cây & cành lá: Thân màu nâu sẫm, các cành uốn lượn vươn dài đỡ lấy vô số trái ngọt.',
        'Quả ngọt mùa thu hoạch: Quả treo lủng lẳng từng chùm; màu sắc vỏ quả khi chín chuyển sang vàng ươm, tỏa hương thơm ngào ngạt.',
        'Thưởng thức vị ngọt: Vị ngọt lịm tan nơi đầu lưỡi, kết tinh từ giọt mồ hôi vun xới của người thân.'
      ],
      ketBai: 'Tình cảm yêu quý cây, lòng biết ơn người trồng cây mang lại quả ngọt cho đời.'
    },
    sampleEssay: {
      id: 'tuan-28-cay-xoai-cat',
      title: 'Cây xoài cát trĩu quả thơm lừng vườn ngoại',
      highlights: ['Từ láy: um tùm, lủng lẳng, vàng ươm, ngào ngạt, ngọt lịm', 'So sánh: Quả xoài uốn cong mềm mại như vầng trăng khuyết nhỏ xinh', 'Câu ghép: Nhờ có bàn tay chăm sóc sớm hôm của ông ngoại nên năm nào cây xoài cũng sai trĩu quả'],
      text: `Trong khu vườn nhỏ của ông ngoại em có trồng nhiều loại cây ăn trái, nhưng sai quả và ngọt lành nhất vẫn là cây xoài cát do chính tay ông vun trồng từ chục năm trước.

Cây xoài cao vượt quá mái nhà ngói, tán lá xòe rộng um tùm như một chiếc ô xanh mát rượi chắn gió che nắng cho cả góc vườn. Thân cây to bằng bắp đùi người lớn, màu nâu sẫm mốc thếch. Từ thân chính tỏa ra nhiều cành uốn lượn nâng đỡ từng chùm quả trĩu nặng. Vào mùa xoài chín, từng chùm xoài lúc lỉu treo lủng lẳng trên cành tựa như những chiếc đàn hồ tí hon đung đưa theo gió. Trái xoài cát to bằng bàn tay người lớn, dáng cong mềm mại thon thon ở đuôi. Khi chín, vỏ xoài chuyển dần từ màu xanh ngọc bích sang màu vàng ươm óng ả, tỏa ra mùi thơm ngọt ngào quyến rũ khắp cả khu vườn.

Gọt vỏ xoài ra, lớp thịt xoài vàng óng, mềm mịn và không hề có xơ. Cắn một miếng, vị ngọt lịm đậm đà lan tỏa nơi đầu lưỡi, mang theo cả tình cảm yêu thương và giọt mồ hôi nhọc nhằn của ông ngoại. Em rất yêu cây xoài và luôn cùng ông tưới nước bắt sâu cho cây mỗi ngày.`
    },
    vocabularyHints: ['um tùm', 'lủng lẳng', 'vàng ươm', 'ngọt lịm', 'lúc lỉu', 'nhờ... nên...'],
    socraticQuestions: [
      'Mùi hương và màu sắc của chùm quả chín kích thích khứu giác và vị giác của em thế nào?',
      'Em cảm nhận được sự chăm sóc cần mẫn của người trồng cây qua từng trái ngọt ra sao?'
    ]
  },
  {
    week: 29,
    semester: 2,
    theme: 'Nam và nữ',
    genre: 'ta_cay_coi',
    genreLabel: 'Tả cây cối',
    lessonTitle: 'Ôn tập về tả cây cối (Nghệ thuật nhân hóa, so sánh)',
    prompt: 'Tả khóm hoa hồng nhung kiêu sa, tỏa hương thơm ngát trong buổi sáng còn đọng sương mai.',
    outlineGuide: {
      moBai: 'Giới thiệu khóm hoa hồng nhung trồng trước ban công hoặc trong bồn hoa.',
      thanBai: [
        'Thân & gai: Thân cây mảnh mai màu xanh thẫm, điểm xuyết những chiếc gai nhọn hoắt như những vệ sĩ dũng cảm bảo vệ bông hoa.',
        'Lá cây: Lá màu xanh thẫm, viền lá có hình răng cưa nhỏ nhắn.',
        'Bông hoa & cánh hoa: Nụ hoa e ấp chúm chím; khi nở, từng lớp cánh hoa mịn như nhung màu đỏ thẫm xòe rộng; hạt sương long lanh đọng trên cánh hoa.',
        'Hương thơm & ong bướm: Hương thơm ngào ngạt, quyến rũ đàn ong bướm bay lượn rập rờn.'
      ],
      ketBai: 'Cảm xúc say mê trước vẻ đẹp kiêu sa của hoa hồng và ý thức chăm sóc cây mỗi ngày.'
    },
    sampleEssay: {
      id: 'tuan-29-hoa-hong-nhung',
      title: 'Nữ hoàng hoa hồng nhung kiêu hãnh khoe sắc sớm mai',
      highlights: ['Từ gợi cảm: kiêu sa, chúm chím, mịn màng, long lanh, rập rờn', 'So sánh: Cánh hoa mềm mại như dải lụa nhung đỏ thắm của nàng công chúa', 'Nghệ thuật nhân hóa: Những chiếc gai nhọn đứng gác nghiêm trang bảo vệ nữ hoàng'],
      text: `Trước ban công nhà em có trồng một chậu hoa hồng nhung. Mỗi buổi sáng sớm, khi bước ra hiên ngắm hoa, em đều bị mê hoặc bởi vẻ đẹp kiêu sa và lộng lẫy của "nữ hoàng các loài hoa".

Cây hoa hồng không quá cao, thân cây thon nhỏ màu xanh thẫm, điểm xuyết những chiếc gai nhọn hoắt cứng cáp như những chàng hiệp sĩ kiên trung ngày đêm đứng gác bảo vệ cho bông hoa. Lá hồng nhỏ nhắn, viền lá hình răng cưa duyên dáng. Đẹp nhất là bông hồng nhung đang độ nở rộ. Bông hoa to bằng chén trà, kết bởi hàng chục lớp cánh hoa xếp so le đan xen khít khao vào nhau. Cánh hoa mềm mại, mượt mà tựa như những tấm vải nhung đỏ thẫm đắt giá. Trên mặt cánh, vài giọt sương mai đọng lại long lanh như những hạt ngọc trai trong suốt lấp lánh dưới ánh nắng sớm. Ở giữa bông hoa là nhụy hoa màu vàng tươi e ấp tỏa ra mùi hương nồng nàn, ngọt ngào lan tỏa trong gió sớm.

Đứng trước bông hoa hồng nhung rực rỡ, em cảm thấy tâm hồn mình thư thái và tràn đầy niềm yêu đời. Em luôn nhớ tưới nước cho cây mỗi ngày để khóm hoa mãi xanh tươi khoe sắc thắm.`
    },
    vocabularyHints: ['kiêu sa', 'mịn màng', 'long lanh', 'nồng nàn', 'khít khao', 'chẳng những... mà còn...'],
    socraticQuestions: [
      'Em thấy những hạt sương đọng trên cánh hoa nhung đỏ tạo nên vẻ đẹp tương phản thế nào?',
      'Tại sao hoa hồng lại được mệnh danh là nữ hoàng của các loài hoa trong mắt em?'
    ]
  },
  {
    week: 30,
    semester: 2,
    theme: 'Nam và nữ',
    genre: 'ta_con_vat',
    genreLabel: 'Tả con vật',
    lessonTitle: 'Ôn tập về tả con vật (Vận dụng từ láy, câu ghép sinh động)',
    prompt: 'Tả đàn chim bồ câu trắng chao liệng thanh bình trên mái ngói đỏ tươi của trường em.',
    outlineGuide: {
      moBai: 'Giới thiệu đàn chim bồ câu trắng - biểu tượng của hòa bình và sự thanh bình nơi sân trường.',
      thanBai: [
        'Ngoại hình: Bộ lông trắng muốt như tuyết tinh khôi, thân hình nhỏ nhắn thon gọn.',
        'Đầu & mắt: Đầu chim tròn xoe gật gù ngộ nghĩnh, đôi mắt như hạt đỗ đen tròn xoe sáng ngời, chiếc mỏ nhỏ màu hồng phấn.',
        'Đôi cánh & chao liệng: Đôi cánh dang rộng bay lượn uyển chuyển giữa nền trời xanh biếc.',
        'Thói quen sinh hoạt: Đậu trên mái ngói đỏ rỉa lông, sà xuống sân trường nhặt hạt thóc dạn dĩ bên học sinh.'
      ],
      ketBai: 'Tình cảm yêu mến loài chim hiền lành, thông minh và ước vọng hòa bình.'
    },
    sampleEssay: {
      id: 'tuan-30-dan-chim-bo-cau',
      title: 'Đàn bồ câu trắng chao liệng giữa bầu trời thanh bình',
      highlights: ['Từ láy tượng hình tượng thanh: trắng muốt, nhỏ nhắn, gật gù, dạn dĩ, ríu rít', 'So sánh: Đôi cánh chim chao liệng như những cánh buồm trắng lướt trên sóng trời xanh', 'Câu ghép: Trời càng trong xanh thì những chú bồ câu lại càng bay lượn nhịp nhàng và duyên dáng'],
      text: `Trên mái ngói đỏ tươi của ngôi trường tiểu học thân yêu, có một đàn chim bồ câu trắng xinh đẹp đã sinh sống từ nhiều năm nay. Đàn chim bồ câu đã trở thành hình ảnh thân thuộc, biểu tượng cho sự thanh bình của mái trường em.

Những chú bồ câu khoác trên mình bộ lông trắng muốt, mịn màng và sạch sẽ như những cục bông gòn tinh khiết. Thân hình chim nhỏ nhắn, thon thả tựa như một bắp ngô nếp. Cái đầu bồ câu tròn xoe, mỗi khi bước đi lại gật gù về phía trước ngộ nghĩnh vô cùng. Đôi mắt chim tròn xoe như hai hạt cườm đen láy có viền hồng bao quanh, luôn nhìn vạn vật với vẻ hiền lành, thân thiện. Chiếc mỏ nhỏ nhắn màu hồng phấn khẽ khàng mổ thóc thoăn thoắt. Đẹp nhất là khoảnh khắc đàn chim tung cánh bay lên nền trời: đôi cánh trắng muốt dang rộng, chao liệng uyển chuyển như những cánh buồm lướt trên biển trời xanh thẳm.

Đàn bồ câu rất dạn dĩ với học sinh. Mỗi giờ ra chơi, khi chúng em vãi những vụn bánh mì xuống sân, đàn chim lại ríu rít sà xuống mổ thức ăn quanh chân chúng em. Ngắm nhìn đàn chim bồ câu chao liệng, lòng em ngập tràn niềm vui và niềm tin yêu cuộc sống thanh bình.`
    },
    vocabularyHints: ['trắng muốt', 'nhỏ nhắn', 'gật gù', 'dạn dĩ', 'uyển chuyển', 'càng... càng...'],
    socraticQuestions: [
      'Chuyển động chao liệng của cánh chim trên nền trời xanh gợi cho em cảm giác tự do ra sao?',
      'Hình ảnh bồ câu gắn liền với thông điệp hòa bình như thế nào trong suy nghĩ của em?'
    ]
  },
  {
    week: 31,
    semester: 2,
    theme: 'Nam và nữ',
    genre: 'ta_canh',
    genreLabel: 'Tả cảnh',
    lessonTitle: 'Ôn tập về tả cảnh sinh hoạt',
    prompt: 'Tả quang cảnh một phiên chợ quê tấp nập, đông vui và tươi rói vào buổi sớm mai.',
    outlineGuide: {
      moBai: 'Giới thiệu phiên chợ quê quen thuộc họp vào buổi sáng sớm.',
      thanBai: [
        'Không khí chợ sớm: Tiếng bước chân, tiếng xe cộ rộn rã, màn sương sớm còn vương trên những mái bạt.',
        'Các gian hàng phong phú: Khu bán rau quả tươi rói mơn mởn, khu bán cá tôm nhảy tanh tách, khu quà sáng khói nghi ngút thơm lừng.',
        'Con người và hoạt động: Người mua kẻ bán cười nói xôn xao, trả giá rôm rả nhưng luôn chan chứa tình làng nghĩa xóm.',
        'Mặt trời lên cao: Chợ bắt đầu vãn, ai nấy đều mang về những giỏ thức ăn tươi ngon và nụ cười rạng rỡ.'
      ],
      ketBai: 'Cảm xúc yêu mến nét đẹp mộc mạc, bình dị và ấm áp của chợ quê hương.'
    },
    sampleEssay: {
      id: 'tuan-31-phien-cho-que',
      title: 'Sắc màu rộn rã của phiên chợ quê buổi sớm mai',
      highlights: ['Từ tượng thanh tượng hình: tấp nập, tươi rói, tanh tách, xôn xao, rôm rả', 'So sánh: Chợ quê đông vui nhộn nhịp như một ngày hội làng rực rỡ sắc màu', 'Câu ghép: Trời vừa hửng sáng, dòng người từ khắp các ngả đường đã nườm nượp đổ về chợ'],
      text: `Mỗi lần về quê nghỉ hè cùng bà, niềm vui lớn nhất của em là được cùng bà đi chợ phiên vào buổi sớm mai tinh khôi. Phiên chợ quê mộc mạc, giản dị mà chứa chan tình làng nghĩa xóm thân thương.

Khi vầng đông vừa ửng hồng đằng chân trời, từ các ngả đường làng, dòng người gồng gánh, đi xe đạp đã nườm nượp đổ về khoảng sân chợ rộng rãi dưới gốc đa cổ thụ. Không khí chợ sớm tấp nập và rộn ràng khác hẳn vẻ yên tĩnh thường ngày. Các sạp hàng được bày biện san sát nhau rực rỡ sắc màu: góc bán rau củ với những mớ rau muống xanh non mơn mởn, những trái cà chua đỏ mọng còn đọng sương sớm; phía góc chợ bán hải sản, những chú cá trắm, tôm đồng còn tươi roi rói đang quẫy đuôi nhảy tanh tách trong chậu nước trong veo. Hấp dẫn nhất là khu quà quê với mùi thơm ngào ngạt của bánh đúc nóng, xôi bắp thơm lừng bốc khói nghi ngút.

Tiếng người mua kẻ bán trò chuyện, ngã giá rôm rả hòa cùng tiếng cười nói giòn tan xua tan đi sự se lạnh của buổi sớm. Dù bán buôn nhưng ai nấy đều niềm nở, chân chất và sẵn sàng cho thêm mớ rau, cọng hành thắm đượm tình người. Chợ quê không chỉ là nơi trao đổi hàng hóa mà còn là linh hồn văn hóa đậm đà của quê hương Việt Nam.`
    },
    vocabularyHints: ['tấp nập', 'tươi rói', 'tanh tách', 'xôn xao', 'rôm rả', 'vừa... đã...'],
    socraticQuestions: [
      'Âm thanh và màu sắc ở các gian hàng rau quả, hải sản, quà sáng tạo nên bức tranh sống động ra sao?',
      'Nụ cười và sự cởi mở của người dân quê ở chợ mang lại cho em cảm nhận gì về tình làng nghĩa xóm?'
    ]
  },
  {
    week: 32,
    semester: 2,
    theme: 'Những chủ nhân tương lai',
    genre: 'ta_nguoi',
    genreLabel: 'Tả người',
    lessonTitle: 'Ôn tập về tả người đang làm việc',
    prompt: 'Tả chú cảnh sát giao thông dũng cảm, tận tụy đứng phân luồng giữa ngã tư đường phố đông đúc.',
    outlineGuide: {
      moBai: 'Giới thiệu chú cảnh sát giao thông - người giữ gìn trật tự và an toàn trên đường phố.',
      thanBai: [
        'Vóc dáng & quân phục: Thân hình cao lớn, khỏe khoắn; bộ quân phục màu vàng rơm thẳng nếp, găng tay trắng nổi bật, chiếc còi đeo trước ngực.',
        'Hành động phân luồng: Bàn tay giơ gậy chỉ huy dứt khoát, tiếng còi tuýt vang hiệu lệnh chuẩn xác; bước chân thoăn thoắt di chuyển giữa dòng xe cộ.',
        'Thần thái & tinh thần: Giọt mồ hôi ướt đẫm lưng áo dưới nắng hè gay gắt, nhưng ánh mắt luôn nghiêm nghị, trách nhiệm.',
        'Hành động đẹp: Dắt tay cụ già và em nhỏ qua đường an toàn.'
      ],
      ketBai: 'Lòng khâm phục, biết ơn và ý thức tự giác chấp hành luật giao thông đường bộ.'
    },
    sampleEssay: {
      id: 'tuan-32-chu-canh-sat-giao-thong',
      title: 'Chú cảnh sát giao thông kiên cường giữa ngã tư đường phố',
      highlights: ['Từ láy: dứt khoát, khỏe khoắn, nghiêm nghị, tận tụy, thoăn thoắt', 'So sánh: Chú đứng sừng sững giữa ngã tư như ngọn đèn hải đăng dẫn lối cho dòng xe', 'Câu ghép: Dù trời nắng như đổ lửa hay mưa gió bão bùng, chú cảnh sát vẫn luôn túc trực giữ gìn bình yên cho các nẻo đường'],
      text: `Mỗi ngày đi học qua ngã tư đường phố sầm uất vào giờ cao điểm, hình ảnh khiến em luôn dõi theo với lòng kính trọng và ngưỡng mộ là chú cảnh sát giao thông đang tận tụy điều khiển giao thông.

Chú cảnh sát có dáng người cao ráo, vạm vỡ và đĩnh đạc. Bộ quân phục màu vàng rơm đặc trưng của ngành cảnh sát giao thông được mặc chỉnh tề, thẳng thớm. Trên vai chú đeo quân hàm lấp lánh, đầu đội mũ kê-pi nghiêm trang, tay đeo găng màu trắng tinh nổi bật. Đứng trên bục chỉ huy giữa ngã tư xe cộ qua lại như mắc cửi, chú thoăn thoắt di chuyển nhịp nhàng: một tay đưa gậy chỉ huy dứt khoát sang trái sang phải, miệng thổi còi "tuýt... tuýt..." từng hồi dõng dạc để hướng dẫn các phương tiện đi đúng làn đường. Dưới cái nắng hè gay gắt, từng giọt mồ hôi lăn dài trên gò má sạm đen làm ướt đẫm lưng áo chú, nhưng ánh mắt chú vẫn luôn nghiêm nghị và tập trung cao độ.

Thỉnh thoảng, khi dòng xe dừng đèn đỏ, chú lại nhanh chân chạy đến dắt tay một cụ già hay một em nhỏ qua đường an toàn. Nhờ có chú cảnh sát mà ngã tư không bao giờ bị ùn tắc, mọi người đều an toàn về đến nhà. Em rất khâm phục sự cống hiến thầm lặng của chú và luôn tự giác chấp hành tốt luật lệ an toàn giao thông.`
    },
    vocabularyHints: ['dứt khoát', 'vạm vỡ', 'nghiêm nghị', 'tận tụy', 'chỉnh tề', 'dù... nhưng...'],
    socraticQuestions: [
      'Động tác chỉ huy dứt khoát và tiếng còi dõng dạc của chú cảnh sát mang lại trật tự thế nào cho đường phố?',
      'Hình ảnh chú dắt cụ già qua đường thể hiện phẩm chất gì đẹp đẽ của người chiến sĩ công an?'
    ]
  },
  {
    week: 33,
    semester: 2,
    theme: 'Những chủ nhân tương lai',
    genre: 'ta_nguoi',
    genreLabel: 'Tả người',
    lessonTitle: 'Ôn tập về tả người',
    prompt: 'Tả cô thủ thư hiền từ, tận tụy hướng dẫn học sinh đọc sách trong thư viện trường em.',
    outlineGuide: {
      moBai: 'Giới thiệu thư viện trường em và cô thủ thư - người ươm mầm tình yêu sách cho học trò.',
      thanBai: [
        'Vóc dáng & phong cách: Dáng người nhỏ nhắn, ăn mặc giản dị thanh lịch, nụ cười hiền hậu luôn nở trên môi.',
        'Khuôn mặt & ánh mắt: Khuôn mặt đôn hậu, ánh mắt sáng ngời sau cặp kính cận; giọng nói nhẹ nhàng dịu ngọt.',
        'Hành động chăm sóc sách: Bàn tay nâng niu từng trang sách quý, sắp xếp các cuốn sách ngay ngắn trên giá theo từng chủ đề.',
        'Hướng dẫn học sinh: Ân cần tìm giúp sách hay, nhắc nhở các bạn giữ trật tự và giữ gìn sách cẩn thận.'
      ],
      ketBai: 'Lòng biết ơn cô thủ thư và tình yêu say mê với việc đọc sách mỗi ngày.'
    },
    sampleEssay: {
      id: 'tuan-33-co-thu-thu',
      title: 'Cô thủ thư - người gieo hạt giống tri thức trong thư viện trường em',
      highlights: ['Từ láy: hiền từ, nhỏ nhắn, nâng niu, dịu dàng, ngay ngắn', 'So sánh: Cô như người mẹ hiền thứ hai mở ra cánh cửa kỳ diệu của thế giới sách', 'Câu ghép: Mỗi khi bước vào thư viện, chúng em không chỉ tìm thấy những cuốn sách bổ ích mà còn nhận được sự chỉ bảo ân cần của cô'],
      text: `Nơi em yêu thích nhất trong trường tiểu học chính là góc thư viện xanh mát, nơi lưu giữ hàng ngàn cuốn sách hay. Và người luôn chào đón chúng em bằng nụ cười ấm áp ở đó chính là cô Lan – cô thủ thư thân thương của trường em.

Cô Lan có vóc người nhỏ nhắn, nước da trắng trẻo cùng phong thái nhẹ nhàng, thanh lịch. Khuôn mặt cô tròn trĩnh đôn hậu, nổi bật là đôi mắt đen sáng ngời ẩn sau cặp kính cận trí thức. Mỗi khi có học sinh bước vào thư viện, cô đều khẽ gật đầu mỉm cười dịu dàng khiến chúng em cảm thấy thật gần gũi. Đôi bàn tay cô Lan thon thả, khéo léo nâng niu từng cuốn sách như những báu vật vô giá. Cô cẩn thận dán lại những trang sách bị rách mép, phân loại từng tập truyện tranh, sách khoa học, văn học thiếu nhi xếp ngay ngắn thẳng tắp trên các kệ gỗ thơm mùi mùn cưa mới. Giọng cô nói nhẹ nhàng như tiếng thì thầm, ân cần gợi ý cho chúng em những cuốn sách hay phù hợp lứa tuổi.

Nhờ có sự chỉ bảo tận tình của cô Lan, tình yêu đọc sách của em đã lớn dần lên mỗi ngày. Cô thủ thư chính là người thầm lặng gieo những hạt mầm tri thức quý báu vào tâm hồn của bao thế hệ học sinh chúng em.`
    },
    vocabularyHints: ['hiền từ', 'nâng niu', 'ngay ngắn', 'dịu dàng', 'thanh lịch', 'không chỉ... mà còn...'],
    socraticQuestions: [
      'Cách cô thủ thư nâng niu cuốn sách và nụ cười của cô đối với học sinh gợi cho em suy nghĩ gì về giá trị của tri thức?',
      'Cuốn sách hay nhất mà cô thủ thư từng giới thiệu cho em là cuốn nào?'
    ]
  },
  {
    week: 34,
    semester: 2,
    theme: 'Những chủ nhân tương lai',
    genre: 'ta_canh',
    genreLabel: 'Tả cảnh',
    lessonTitle: 'Luyện tập viết đoạn văn cảm nghĩ & Miêu tả kết hợp',
    prompt: 'Tả quang cảnh sân trường rộn rã trong buổi lễ bế giảng và chia tay năm học cuối cấp tiểu học.',
    outlineGuide: {
      moBai: 'Giới thiệu buổi sáng bế giảng năm học lớp 5 tràn ngập cảm xúc vui buồn xen lẫn.',
      thanBai: [
        'Khung cảnh sân trường: Cờ hoa rực rỡ, hàng ghế xếp ngay ngắn, hoa phượng đỏ rực trên cành hòa cùng tiếng ve râm ran.',
        'Thầy cô và bạn bè: Thầy cô mặc áo dài trang trọng; các bạn học sinh khăn quàng đỏ thắm, ánh mắt đọng lại niềm bồi hồi bịn rịn.',
        'Khoảnh khắc lắng đọng: Tiếng trống bế giảng vang lên, giây phút nhận phần thưởng và những cái ôm siết chặt chia tay bạn bè thầy cô.'
      ],
      ketBai: 'Cảm xúc thiêng liêng khi tạm biệt mái trường tiểu học 5 năm gắn bó và lời hứa vững bước vào tương lai.'
    },
    sampleEssay: {
      id: 'tuan-34-le-be-giang-nam-hoc',
      title: 'Bồi hồi buổi lễ bế giảng chia tay mái trường tiểu học thân thương',
      highlights: ['Từ láy: rực rỡ, bồi hồi, bịn rịn, râm ran, xao xuyến', 'So sánh liên tưởng: Mái trường như tổ chim ấm áp chở che cho chúng em trước khi tung cánh bay xa', 'Câu ghép biểu thị cảm xúc: Dù mai này phải chia xa mái trường thân yêu, những kỷ niệm êm đềm suốt năm năm qua sẽ mãi theo em suốt cuộc đời'],
      text: `Sáng hôm nay, sân trường em bừng lên trong sắc màu rực rỡ của cờ hoa để tổ chức buổi lễ bế giảng năm học – buổi lễ thiêng liêng đánh dấu ngày chúng em chia tay mái trường tiểu học thân yêu sau năm năm gắn bó.

Sân trường ngập tràn ánh nắng hè vàng óng. Trên cành cao, những chùm hoa phượng đã thắp lửa đỏ rực rỡ, tiếng ve sầu râm ran cất lên bản tình ca tạm biệt mùa thi. Hàng trăm bộ bàn ghế được kê ngay ngắn thẳng hàng trên sân gạch đỏ tươi. Các thầy cô giáo mặc những tà áo dài thướt tha, gương mặt rạng ngời niềm tự hào nhưng đáy mắt cũng đượm vẻ bịn rịn luyến lưu. Các bạn học sinh ai nấy đều chỉnh tề trong bộ đồng phục trắng tinh khôi, chiếc khăn quàng đỏ thắm bay phấp phới trên vai. Khi hồi trống bế giảng cuối cùng của năm học vang lên trầm hùng, cả sân trường bỗng lặng đi trong giây lát vì niềm xúc động trào dâng. Những cái nắm tay thật chặt, những dòng lưu bút trao nhau vội vã và cả những giọt nước mắt lăn dài trên má của giây phút chia tay tuổi học trò ngây thơ.

Tạm biệt mái trường tiểu học, tạm biệt thầy cô và bè bạn thân thương. Em sẽ mang theo hành trang tri thức và tình yêu thương vô bờ bến của nơi đây để tự tin bước tiếp vào bậc học mới.`
    },
    vocabularyHints: ['bồi hồi', 'bịn rịn', 'rực rỡ', 'râm ran', 'xao xuyến', 'dù... nhưng...'],
    socraticQuestions: [
      'Âm thanh tiếng ve và màu hoa phượng đỏ trong buổi bế giảng gợi cho em cảm giác luyến lưu thế nào?',
      'Em muốn gửi lời tri ân sâu sắc nhất tới người thầy, người cô nào trong ngày chia tay?'
    ]
  },
  {
    week: 35,
    semester: 2,
    theme: 'Ôn tập cuối năm',
    genre: 'tong_hop',
    genreLabel: 'Đánh giá cuối năm',
    lessonTitle: 'Đánh giá năng lực làm văn cuối năm Lớp 5 (Bài tổng kết)',
    prompt: 'Hãy tả lại người bạn thân thiết nhất đã cùng em gắn bó dưới mái trường tiểu học suốt năm năm qua.',
    outlineGuide: {
      moBai: 'Dẫn dắt cảm xúc về tình bạn tuổi học trò dưới mái trường tiểu học 5 năm.',
      thanBai: [
        'Ngoại hình & nụ cười: Vóc dáng, gương mặt thông minh, nụ cười rạng rỡ thân quen.',
        'Tính cách & sở thích: Tốt bụng, khiêm tốn, thích đọc sách và yêu thể thao.',
        'Kỷ niệm đáng nhớ: Cùng nhau vượt qua kỳ thi khó, cùng nhau che chung chiếc ô dưới cơn mưa rào, chia sẻ từng cuốn vở câu chuyện vui.',
        'Sự gắn kết: Động viên nhau cùng tiến bộ trong học tập và rèn luyện đạo đức.'
      ],
      ketBai: 'Khẳng định tình bạn cao đẹp sẽ mãi bền chặt dẫu mai này mỗi đứa một ngả đường bước vào lớp Sáu.'
    },
    sampleEssay: {
      id: 'tuan-35-tong-ket-tinh-ban',
      title: 'Tình bạn năm năm dưới mái trường tiểu học dấu yêu',
      highlights: ['Vận dụng toàn diện các biện pháp tu từ so sánh, nhân hóa, câu ghép nhiều vế', 'Từ ngữ gợi cảm, chân thật và xúc động', 'Cấu trúc bài viết chặt chẽ chuẩn mực 3 phần theo chuẩn Bộ Giáo Dục'],
      text: `Năm năm tiểu học trôi qua nhanh như một cái chớp mắt, để lại trong em biết bao kỷ niệm ngọt ngào. Và món quà tuyệt vời nhất mà mái trường đã ban tặng cho em chính là tình bạn chân thành, sâu sắc với Tuấn Anh – người bạn thân thiết đã cùng em gắn bó suốt năm năm học vừa qua.

Tuấn Anh có vóc dáng dong dỏng cao, nước da ngăm đen khỏe khoắn của một cậu bạn yêu thích thể thao. Khuôn mặt vuông vức toát lên vẻ cương trực, nổi bật là đôi mắt đen sáng ngời luôn ánh lên niềm vui và sự hóm hỉnh. Nụ cười của bạn rất tươi tắn với chiếc răng khểnh duyên dáng, mỗi khi bạn cười là cả gương mặt bừng sáng như ánh ban mai. Trong lớp, Tuấn Anh là một học sinh gương mẫu, bạn không chỉ học giỏi môn Toán mà còn vẽ tranh rất đẹp. Đức tính đáng quý nhất ở Tuấn Anh là sự chân thành và luôn sẵn lòng giúp đỡ mọi người. Em vẫn nhớ như in một buổi chiều tan học gặp cơn mưa rào bất chợt, bạn đã nhường chiếc áo mưa duy nhất của mình cho em mặc để em không bị ốm, còn bạn thì vui vẻ chịu ướt chạy về cùng em.

Tình bạn trong sáng ấy đã nâng bước em khôn lớn từng ngày, dạy cho em biết sẻ chia và thấu hiểu. Mai này khi bước vào cánh cổng trường trung học cơ sở, dẫu có thể không còn học chung một lớp, em tin chắc rằng tình bạn đẹp đẽ giữa em và Tuấn Anh sẽ mãi mãi bền chặt theo năm tháng.`
    },
    vocabularyHints: ['gắn bó', 'cương trực', 'hóm hỉnh', 'chân thành', 'bền chặt', 'không những... mà còn...'],
    socraticQuestions: [
      'Kỷ niệm nào giữa em và người bạn ấy thể hiện rõ nhất sự sẻ chia và lòng tốt?',
      'Em có lời chúc hay lời hứa gì gửi tới người bạn thân thiết khi cùng nhau bước vào lớp 6 không?'
    ]
  }
];

export function getLessonsBySemester(semester: 1 | 2): WeeklyLesson[] {
  return GRADE_5_CURRICULUM.filter((lesson) => lesson.semester === semester);
}

export function getLessonByWeek(week: number): WeeklyLesson | undefined {
  return GRADE_5_CURRICULUM.find((lesson) => lesson.week === week);
}

export function getLessonsByGenre(genre: GenreType | 'all'): WeeklyLesson[] {
  if (genre === 'all') return GRADE_5_CURRICULUM;
  return GRADE_5_CURRICULUM.filter((lesson) => lesson.genre === genre);
}
