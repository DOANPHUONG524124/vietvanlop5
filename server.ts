import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';
import { analyzeText, calculateAverageScore, calculateSeedsEarned } from './src/utils/rules.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: '20mb' }));

// Shared Gemini client
const apiKey = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({
  apiKey: apiKey || '',
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

const OWL_SYSTEM_INSTRUCTION = `
Bạn là **Trợ lý Cú Mèo Thông Thái**, một chuyên gia giáo dục AI chuyên biệt trong lĩnh vực giảng dạy Tiếng Việt và phát triển tư duy ngôn ngữ cho học sinh lớp 5. Bạn đóng vai trò là người dẫn đường (Mentor) trong "Hành trình thám hiểm Rừng Tri Thức", sử dụng phương pháp Socratic để khơi gợi tiềm năng sáng tạo và khả năng tự hoàn thiện bài viết của học sinh.

### Mục tiêu & Phương pháp:
1. **Phân tích sâu sắc 5 Cột trụ:**
   - **Bố cục:** Kiểm tra sự cân đối giữa Mở bài - Thân bài - Kết bài; sự mạch lạc giữa các đoạn văn.
   - **Vốn từ:** Đánh giá độ phong phú, cách dùng từ láy, từ gợi hình, gợi thanh.
   - **Ngữ pháp:** Tập trung vào cách dùng câu ghép (quan hệ từ như vì... nên, tuy... nhưng, không những... mà còn), dấu câu (dấu phẩy, dấu chấm, dấu hai chấm).
   - **Cảm xúc:** Đánh giá khả năng bộc lộ tình cảm, sự chân thực trong lời văn.
   - **Sáng tạo:** Ghi nhận những cách so sánh mới lạ, góc nhìn độc đáo, nhân hóa không theo khuôn mẫu.
2. **Dẫn dắt Socratic:** Tuyệt đối không cung cấp lời giải hoặc viết lại bài. Thay vào đó, đặt các câu hỏi gợi mở để học sinh tự nhận ra lỗi và tìm cách diễn đạt hay hơn. Ví dụ: "Bác Cú thấy từ 'đẹp' hơi đơn giản, em có biết từ láy nào gợi tả vẻ đẹp lấp lánh của những giọt sương không?".
3. **Cá nhân hóa lộ trình:** Định hướng học sinh sử dụng đúng chuẩn chương trình Tiếng Việt lớp 5 (câu ghép, từ láy, từ đồng nghĩa, biện pháp tu từ so sánh, nhân hóa).
4. **Gamification & An toàn:**
   - Khen thưởng bằng "Hạt giống thông thái" để nâng cấp "Tổ chim học tập".
   - Phát hiện đạo văn/văn mẫu: Nếu bài viết trùng khớp văn mẫu mạng hoặc rập khuôn, hãy nhắc nhở nhẹ nhàng: "Bác Cú hình như đã gặp ý văn này ở đâu đó rồi. Bác tin là nhà thám hiểm nhí của chúng ta có những suy nghĩ riêng còn hay hơn nhiều. Em hãy thử tả lại theo cách của mình nhé!".
   - Môi trường sạch: Chặn và cảnh báo ngay lập tức nếu học sinh nhập từ ngữ thô tục hoặc không phù hợp lứa tuổi.
5. **Tone & Persona:** Bác Cú Thông Thái; gọi học sinh là "Nhà thám hiểm nhí", "Bạn nhỏ", hoặc "Em". Ấm áp, kiên nhẫn, hóm hỉnh và tràn đầy năng lượng khích lệ.

### Output Format cho phản hồi học sinh (5 phần):
1. **Lời chào đồng hành:** Câu chào thân thiện gắn với bối cảnh "Rừng Tri Thức".
2. **Điểm sáng (Khen ngợi):** Nêu bật 1-2 điểm xuất sắc nhất dựa trên 5 tiêu chí.
3. **Góc gợi mở (Phân tích & Câu hỏi):** Phân tích ngắn gọn lỗi hoặc điểm cần cải thiện và đặt câu hỏi gợi ý để học sinh tự sửa (dùng "Thử thách cho em", "Em nghĩ sao nếu...").
4. **Minigame nhanh (Củng cố):** Đưa ra một câu đố ngắn (Đuổi hình bắt chữ, giải đố thành ngữ hoặc phân loại từ láy/câu ghép) liên quan đến bài làm.
5. **Lời chúc & Hạt giống:** Nhắc nhở nộp bài đúng hạn và tặng "Hạt giống thông thái" ảo.
`;

// Sample Grade 5 essays for instant testing
const SAMPLE_ESSAYS = [
  {
    id: 'phuong-vi',
    title: 'Tả cây phượng vĩ sân trường em',
    topic: 'Tả cây cối (Lớp 5)',
    description: 'Bài văn giàu hình ảnh, sử dụng nhân hóa và so sánh sinh động.',
    text: `Giữa sân trường em sừng sững một cây phượng vĩ già, người bạn lớn đã chứng kiến biết bao mùa tựu trường của chúng em.

Nhìn từ xa, cây phượng như một chiếc ô khổng lồ màu xanh biếc che mát cả một góc sân. Thân cây to bằng một vòng tay em ôm, lớp vỏ nâu xù xì, nổi lên những vết nứt nẻ in hằn dấu vết của năm tháng. Từ thân cây, các cành lớn vươn dài như những cánh tay vững chãi đón lấy ánh nắng ban mai. Lá phượng nhỏ nhắn, mơn mởn, xếp đều nhau như những chiếc lông chim tí hon. Vào những ngày đầu hạ, từ các kẽ lá, những nụ hoa phượng e ấp bắt đầu thức giấc. Chỉ vài ngày sau, cả cây phượng bừng nở rực rỡ, tựa như hàng nghìn đốm lửa bập bùng thắp sáng góc trời. Những chú ve sầu nấp trong vòm lá cũng cất tiếng hát rộn ràng, làm nên bản hòa ca mùa hạ.

Mỗi giờ ra chơi, chúng em lại tụ tập dưới bóng râm mát rượi của bác phượng để đọc sách và chơi trò nhảy dây. Mặc dù sau này phải rời xa mái trường tiểu học, nhưng hình ảnh cây phượng vĩ thân thương vẫn sẽ in sâu trong tâm trí em.`
  },
  {
    id: 'chu-meo',
    title: 'Tả chú mèo mướp ngộ nghĩnh',
    topic: 'Tả con vật (Lớp 5)',
    description: 'Bài viết chân thật nhưng vốn từ còn đơn giản, thiếu câu ghép và cần nhân hóa.',
    text: `Nhà em có nuôi một chú mèo mướp rất đẹp. Chú tên là Miu Miu.

Miu có bộ lông màu vàng xen lẫn sọc đen nhìn rất đẹp. Đầu chú tròn như cuộn len. Hai tai chú nhọn hoắt lúc nào cũng vểnh lên nghe ngóng. Đôi mắt Miu màu xanh biếc sáng long lanh như hai hòn bi ve trong bóng tối. Cái mũi hồng hào lúc nào cũng ươn ướt. Chú có bốn cái chân ngắn, dưới bàn chân có đệm thịt êm nên chú đi lại rất nhẹ nhàng không phát ra tiếng động. Cái đuôi dài ngoe nguẩy rất đáng yêu. Ban ngày chú hay nằm sưởi nắng ở hiên nhà, ban đêm chú đi bắt chuột rất giỏi.

Em rất yêu chú mèo Miu của em. Em thường cho Miu ăn cá và vuốt ve bộ lông của chú mỗi khi đi học về.`
  },
  {
    id: 'con-mua-sao-chep',
    title: 'Tả cơn mưa rào mùa hạ (Mẫu mạng quen thuộc)',
    topic: 'Tả cảnh (Lớp 5)',
    description: 'Bài văn chứa nhiều câu văn mẫu Internet rập khuôn để kiểm tra tính năng phát hiện đạo văn.',
    text: `Mặt trời như một quả cầu lửa khổng lồ từ từ nhô lên. Quê hương em có rất nhiều cảnh đẹp nhưng em thích nhất là cơn mưa rào mùa hạ.

Trời đang nắng chang chang bỗng mây đen ùn ùn kéo đến tối sầm cả góc trời. Gió thổi ào ào làm cây cối ngả nghiêng. Một tia chớp rạch ngang bầu trời kèm theo tiếng sấm đùng đoàng. Cơn mưa rào bắt đầu đổ xuống. Mưa rơi lộp độp trên mái tôn rồi tuôn xối xả. Mọi người trên đường hối hả tìm chỗ trú mưa. Cây cối ven đường được tắm mưa thỏa thích như được tiếp thêm sức sống mới. Nước mưa chảy lênh láng khắp các ngõ ngách.

Một lát sau mưa ngớt hạt dần rồi tạnh hẳn. Mặt trời lại chiếu những tia nắng vàng rực rỡ. Cầu vồng bảy sắc lung linh hiện ra. Cơn mưa mùa hạ đã xua tan đi cái nóng oi ả.`
  },
  {
    id: 'nguoi-ba',
    title: 'Tả người bà kính yêu của em',
    topic: 'Tả người (Lớp 5)',
    description: 'Giàu cảm xúc nhưng còn thiếu dấu câu, lỗi lặp từ và cần gợi ý kết nối câu ghép.',
    text: `Trong gia đình người em yêu quý nhất là bà nội của em năm nay bà đã ngoài bảy mươi tuổi rồi nhưng bà vẫn còn minh mẫn lắm.

Bà có dáng người nhỏ nhắn lưng bà đã hơi còng vì cả đời vất vả nuôi bố em khôn lớn. Mái tóc bà bạc trắng như những sợi cước lúc nào cũng được bà búi gọn gàng sau gáy. Khuôn mặt bà có nhiều nếp nhăn đuôi mắt hằn sâu vết chân chim của thời gian. Đôi mắt bà đục mờ nhưng ánh nhìn lúc nào cũng ấm áp hiền từ. Bàn tay bà gầy gầy gân guốc thô ráp vì lao động sớm hôm. Bà hay nấu cho em những món ăn ngon bà còn dạy em học bài và kể cho em nghe những câu chuyện cổ tích ngày xưa.

Em yêu bà nhiều lắm em ước mong bà luôn mạnh khỏe sống lâu trăm tuổi cùng con cháu.`
  }
];

// Endpoint: get sample essays
app.get('/api/owl/sample-essays', (_req, res) => {
  res.json({ samples: SAMPLE_ESSAYS });
});

// Endpoint: Evaluate Essay
app.post('/api/owl/evaluate', async (req, res) => {
  try {
    const { essay, topic = 'Tập làm văn Lớp 5', imageBase64 } = req.body;

    if (!essay && !imageBase64) {
      return res.status(400).json({ error: 'Vui lòng cung cấp nội dung bài văn hoặc ảnh bài viết.' });
    }

    // Run local text heuristics first
    const heuristics = analyzeText(essay || '');

    // Prepare prompt for Gemini
    const contents: any[] = [];
    if (imageBase64) {
      const mimeType = imageBase64.startsWith('data:image/png')
        ? 'image/png'
        : imageBase64.startsWith('data:image/jpeg')
        ? 'image/jpeg'
        : 'image/jpeg';
      const cleanBase64 = imageBase64.replace(/^data:image\/\w+;base64,/, '');
      contents.push({
        inlineData: {
          mimeType,
          data: cleanBase64,
        },
      });
    }

    const evaluationPrompt = `
Đề bài/Chủ đề: "${topic}"
Nội dung bài làm của học sinh:
"""
${essay}
"""

Phân tích số liệu sơ bộ từ hệ thống:
- Số từ: ${heuristics.wordCount}
- Số đoạn: ${heuristics.paragraphCount}
- Số từ láy phát hiện: ${heuristics.detectedTuLay.join(', ') || 'Chưa nhiều'}
- Cặp quan hệ từ câu ghép phát hiện: ${heuristics.detectedCompoundPairs.join(', ') || 'Chưa rõ'}
- Nguy cơ văn mẫu Internet: ${heuristics.plagiarismRisk.riskScore}% (${heuristics.plagiarismRisk.reason || 'Sáng tạo tự nhiên'})

YÊU CẦU:
Thực hiện đánh giá với vai trò Bác Cú Thông Thái tuân thủ nghiêm ngặt 5 phần phản hồi học sinh (Socratic, không sửa trực tiếp, không viết lại văn mẫu) đồng thời trích xuất dữ liệu phân tích cho Teacher Dashboard và Thư gửi Phụ huynh theo cấu trúc JSON.
`;

    contents.push({ text: evaluationPrompt });

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: {
        parts: contents,
      },
      config: {
        systemInstruction: OWL_SYSTEM_INSTRUCTION,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            phan_hoi_hoc_sinh: {
              type: Type.OBJECT,
              properties: {
                loi_chao_dong_hanh: {
                  type: Type.STRING,
                  description: '1. Lời chào thân thiện mang màu sắc Rừng Tri Thức',
                },
                diem_sang: {
                  type: Type.OBJECT,
                  properties: {
                    tieu_de: { type: Type.STRING },
                    chi_tiet: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING },
                      description: '1-2 điểm xuất sắc nhất dựa trên 5 tiêu chí',
                    },
                  },
                  required: ['tieu_de', 'chi_tiet'],
                },
                goc_goi_mo: {
                  type: Type.OBJECT,
                  properties: {
                    tieu_de: { type: Type.STRING },
                    phan_tich_loi: {
                      type: Type.STRING,
                      description: 'Nhận xét nhẹ nhàng về lỗi hoặc điểm cần trau chuốt (dấu câu, từ láy, câu ghép, v.v.)',
                    },
                    cau_hoi_socratic: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING },
                      description: 'Các câu hỏi dẫn dắt theo phương pháp Socratic để em tự suy ngẫm và sửa lại (tuyệt đối không sửa thay)',
                    },
                    vi_du_goi_y: {
                      type: Type.STRING,
                      description: 'Gợi ý phương pháp hoặc hình tượng gợi mở (không phải đáp án chép lại)',
                    },
                  },
                  required: ['tieu_de', 'phan_tich_loi', 'cau_hoi_socratic'],
                },
                minigame_nhanh: {
                  type: Type.OBJECT,
                  properties: {
                    loai_game: { type: Type.STRING, description: 'Đố thành ngữ / Đuổi hình bắt chữ / Từ láy kỳ diệu / Thử thách câu ghép' },
                    cau_hoi: { type: Type.STRING },
                    cac_lua_chon: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING },
                      description: '3-4 lựa chọn trả lời',
                    },
                    dap_an_dung: { type: Type.STRING },
                    giai_thich_vui: { type: Type.STRING },
                  },
                  required: ['loai_game', 'cau_hoi', 'cac_lua_chon', 'dap_an_dung', 'giai_thich_vui'],
                },
                loi_chuc_va_hat_giong: {
                  type: Type.OBJECT,
                  properties: {
                    loi_chuc: { type: Type.STRING },
                    so_hat_giong_tang: { type: Type.INTEGER, description: 'Số hạt giống thông thái được thưởng (5 đến 15)' },
                    huy_hieu_khen_tang: { type: Type.STRING, description: 'Tên huy hiệu sinh động, e.g. Nhà Thám Hiểm Từ Láy, Bậc Thầy Nhân Hóa' },
                  },
                  required: ['loi_chuc', 'so_hat_giong_tang', 'huy_hieu_khen_tang'],
                },
              },
              required: ['loi_chao_dong_hanh', 'diem_sang', 'goc_goi_mo', 'minigame_nhanh', 'loi_chuc_va_hat_giong'],
            },
            teacher_dashboard: {
              type: Type.OBJECT,
              properties: {
                diem_so: {
                  type: Type.OBJECT,
                  properties: {
                    bo_cuc: { type: Type.NUMBER, description: 'Thang điểm 10' },
                    von_tu: { type: Type.NUMBER, description: 'Thang điểm 10' },
                    ngu_phap: { type: Type.NUMBER, description: 'Thang điểm 10' },
                    cam_xuc: { type: Type.NUMBER, description: 'Thang điểm 10' },
                    sang_tao: { type: Type.NUMBER, description: 'Thang điểm 10' },
                    tong_ket: { type: Type.NUMBER, description: 'Điểm trung bình thang điểm 10' },
                  },
                  required: ['bo_cuc', 'von_tu', 'ngu_phap', 'cam_xuc', 'sang_tao', 'tong_ket'],
                },
                lo_hong_kien_thuc: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: 'Các lỗ hổng cụ thể như: thiếu vế câu ghép, nhầm lẫn dấu phẩy và chấm, thiếu từ láy gợi hình, lặp từ...',
                },
                chi_so_tang_truong: {
                  type: Type.OBJECT,
                  properties: {
                    tu_vung: { type: Type.STRING, description: 'Đánh giá mức độ phong phú' },
                    cau_ghep: { type: Type.STRING, description: 'Khả năng vận dụng quan hệ từ' },
                    bien_phap_tu_tu: { type: Type.STRING, description: 'Mức độ sử dụng so sánh, nhân hóa' },
                  },
                  required: ['tu_vung', 'cau_ghep', 'bien_phap_tu_tu'],
                },
                canh_bao_dao_van: {
                  type: Type.BOOLEAN,
                  description: 'True nếu phát hiện sao chép văn mẫu mạng, False nếu tự sáng tác',
                },
                chi_tiet_dao_van: {
                  type: Type.STRING,
                  description: 'Phân tích cụ thể các đoạn trùng lặp hoặc lời nhắc nhở sư phạm',
                },
              },
              required: ['diem_so', 'lo_hong_kien_thuc', 'chi_so_tang_truong', 'canh_bao_dao_van'],
            },
            parent_report: {
              type: Type.OBJECT,
              properties: {
                tieu_de_thu: { type: Type.STRING },
                thu_gui_phu_huynh: {
                  type: Type.STRING,
                  description: 'Thư ngắn gọn, ấm áp gửi phụ huynh tóm tắt tiến bộ của con và động viên tinh thần',
                },
                diem_tien_bo_noi_bat: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: 'Những điểm con đã làm rất tốt',
                },
                hoat_dong_dong_hanh_tai_nha: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: 'Gợi ý 2-3 hoạt động cụ thể (đọc sách cùng con, đố vui câu ghép khi nấu ăn...)',
                },
              },
              required: ['tieu_de_thu', 'thu_gui_phu_huynh', 'diem_tien_bo_noi_bat', 'hoat_dong_dong_hanh_tai_nha'],
            },
          },
          required: ['phan_hoi_hoc_sinh', 'teacher_dashboard', 'parent_report'],
        },
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    
    // Supplement with local heuristics metadata
    res.json({
      success: true,
      data: parsed,
      heuristics,
    });
  } catch (error: any) {
    console.error('Error evaluating essay:', error);
    res.status(500).json({
      error: 'Không thể phân tích bài làm lúc này. Bác Cú đang nghỉ ngơi một chút, em hãy thử lại nhé!',
      details: error?.message,
    });
  }
});

// Endpoint: Socratic Chat with Bac Cu
app.post('/api/owl/chat', async (req, res) => {
  try {
    const { history, message, essayContext, topic } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Vui lòng nhập tin nhắn gửi Bác Cú.' });
    }

    const chatPrompt = `
Bối cảnh bài văn học sinh đang viết:
- Chủ đề: "${topic || 'Tập làm văn'}"
- Bài viết hiện tại:
"""
${essayContext || '(Chưa có bài viết cụ thể)'}
"""

Lịch sử trò chuyện trước đó:
${(history || [])
  .map((h: any) => `${h.role === 'user' ? 'Học sinh' : 'Bác Cú'}: ${h.text}`)
  .join('\n')}

Học sinh vừa hỏi hoặc gửi câu viết mới:
"${message}"

HƯỚNG DẪN TRẢ LỜI:
1. Đóng vai Bác Cú Thông Thái (ấm áp, hóm hỉnh, khen ngợi sự chủ động của em).
2. Dùng phương pháp Socratic: KHÔNG viết hộ, KHÔNG đưa ra câu hoàn chỉnh để học sinh chép.
3. Nếu học sinh thử sửa một câu và câu đó hay hơn, hãy khen ngợi chi tiết vì sao nó hay (ví dụ: "Bác Cú khen ngợi em đã biết dùng từ láy 'long lanh' và hình ảnh so sánh 'viên ngọc' rực rỡ!").
4. Nếu học sinh bế tắc, hãy đưa ra gợi ý liên tưởng (ví dụ: gợi ý âm thanh, màu sắc, cảm xúc hoặc một sự vật gần gũi).
5. Độ dài ngắn gọn, dễ hiểu cho học sinh lớp 5 (khoảng 3-5 câu).
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: chatPrompt,
      config: {
        systemInstruction: OWL_SYSTEM_INSTRUCTION,
      },
    });

    res.json({
      success: true,
      reply: response.text,
    });
  } catch (error: any) {
    console.error('Error in Socratic chat:', error);
    res.status(500).json({
      error: 'Bác Cú chưa nghe rõ lời em, em nhắn lại một lần nữa nhé!',
      details: error?.message,
    });
  }
});

// Endpoint: OCR notebook handwriting extraction
app.post('/api/owl/ocr', async (req, res) => {
  try {
    const { imageBase64 } = req.body;

    if (!imageBase64) {
      return res.status(400).json({ error: 'Vui lòng cung cấp hình ảnh chụp trang vở.' });
    }

    const cleanBase64 = imageBase64.replace(/^data:image\/\w+;base64,/, '');

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: 'image/jpeg',
              data: cleanBase64,
            },
          },
          {
            text: `Bạn là trợ lý OCR chuyên đọc chữ viết tay tiếng Việt của học sinh tiểu học.
Hãy trích xuất chính xác từng câu chữ, đoạn văn trong hình ảnh này.
Giữ nguyên cách ngắt dòng và dấu câu của bài viết. Không thêm thắt lời bình. Chỉ trả về nội dung văn bản đã nhận dạng.`,
          },
        ],
      },
    });

    res.json({
      success: true,
      extractedText: response.text?.trim() || '',
    });
  } catch (error: any) {
    console.error('OCR Error:', error);
    res.status(500).json({
      error: 'Không thể nhận dạng chữ viết từ ảnh này. Em hãy chụp rõ hơn hoặc gõ trực tiếp nhé!',
      details: error?.message,
    });
  }
});

// Helper: Extract Google Sheet ID from URL or ID string
function extractSheetId(input: string): string | null {
  if (!input || typeof input !== 'string') return null;
  const trimmed = input.trim();
  const match = trimmed.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
  if (match && match[1]) return match[1];
  if (/^[a-zA-Z0-9-_]{20,60}$/.test(trimmed)) return trimmed;
  return null;
}

// Helper: Normalize Student Status
function normalizeStudentStatus(raw: any): 'submitted' | 'drafting' | 'not_submitted' | 'needs_support' {
  if (!raw) return 'not_submitted';
  const str = String(raw).toLowerCase().trim();
  if (str.includes('đã nộp') || str.includes('hoàn thành') || str.includes('xong') || str.includes('submitted') || str.includes('done')) {
    return 'submitted';
  }
  if (str.includes('hỗ trợ') || str.includes('bồi dưỡng') || str.includes('socratic') || str.includes('support') || str.includes('cảnh báo')) {
    return 'needs_support';
  }
  if (str.includes('đang viết') || str.includes('bản nháp') || str.includes('draft') || str.includes('writing') || str.includes('chưa')) {
    return 'drafting';
  }
  return 'not_submitted';
}

// Endpoint: Fetch Class Roster from Google Sheet
app.post('/api/sheets/fetch-roster', async (req, res) => {
  try {
    const { sheetUrl, sheetId: directSheetId, sheetName, gid } = req.body;
    const sheetId = directSheetId || extractSheetId(sheetUrl || '');

    if (!sheetId) {
      return res.status(400).json({
        error: 'Vui lòng cung cấp đường link Google Sheet hợp lệ (ví dụ: https://docs.google.com/spreadsheets/d/.../edit).',
      });
    }

    // Try Google Visualization API endpoint (GViz)
    const gvizUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json${
      sheetName ? `&sheet=${encodeURIComponent(sheetName)}` : ''
    }${gid ? `&gid=${gid}` : ''}`;

    let response = await fetch(gvizUrl);
    let rawText = '';

    if (response.ok) {
      rawText = await response.text();
    }

    // Check if GViz response contains permission error or HTML login
    if (!response.ok || rawText.includes('google.visualization.Query.setResponse') === false) {
      // Fallback: try CSV export endpoint
      const csvUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv${
        gid ? `&gid=${gid}` : ''
      }`;
      const csvResponse = await fetch(csvUrl);
      if (!csvResponse.ok) {
        return res.status(403).json({
          error:
            'Không thể truy cập Google Sheet. Thầy/Cô vui lòng mở Google Sheet, bấm nút [Chia sẻ] (Share) và chọn [Bất kỳ ai có đường liên kết đều có thể xem] (Viewer).',
          sheetId,
        });
      }

      // Parse CSV
      const csvText = await csvResponse.text();
      const lines = csvText.split(/\r?\n/).filter((l) => l.trim().length > 0);
      if (lines.length < 2) {
        return res.status(400).json({ error: 'Bảng tính Google Sheet chưa có đủ dữ liệu học sinh.' });
      }

      const headers = lines[0].split(',').map((h) => h.replace(/^"|"$/g, '').trim());
      const students: any[] = [];

      for (let i = 1; i < lines.length; i++) {
        // Regex to handle quoted commas in CSV
        const row = lines[i].match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g) || lines[i].split(',');
        const cleanRow = row.map((c) => c.replace(/^"|"$/g, '').trim());
        
        let name = '';
        let stt = i;
        let code = `5A-${String(i).padStart(2, '0')}`;
        let gender = 'Nam';
        let dob = '';
        let status = 'not_submitted';
        let score: number | undefined = undefined;
        let topic = '';
        let essay = '';
        let teacherNote = '';

        headers.forEach((header, colIdx) => {
          const val = cleanRow[colIdx] || '';
          const h = header.toLowerCase();
          if (/họ.*tên|tên|student.*name|name/i.test(h)) name = val;
          else if (/stt|số.*thứ.*tự/i.test(h)) stt = parseInt(val, 10) || i;
          else if (/mã.*hs|mã.*số|id|code/i.test(h)) code = val;
          else if (/giới.*tính|gender|sex/i.test(h)) gender = val;
          else if (/ngày.*sinh|năm.*sinh|dob|birth/i.test(h)) dob = val;
          else if (/trạng.*thái|tình.*trạng|status|nộp/i.test(h)) status = normalizeStudentStatus(val);
          else if (/điểm|score|grade/i.test(h)) score = val ? parseFloat(val) : undefined;
          else if (/chủ.*đề|đề.*bài|tên.*bài|topic/i.test(h)) topic = val;
          else if (/bài.*làm|nội.*dung|essay/i.test(h)) essay = val;
          else if (/ghi.*chú|nhận.*xét|note/i.test(h)) teacherNote = val;
        });

        if (name) {
          students.push({
            id: `HS-${sheetId.slice(0, 4)}-${i}`,
            stt,
            code,
            name,
            gender,
            dob,
            status,
            score: score !== undefined && !isNaN(score) ? score : undefined,
            topic: topic || 'Tập làm văn Lớp 5',
            essay: essay || undefined,
            teacherNote: teacherNote || undefined,
          });
        }
      }

      return res.json({
        success: true,
        source: 'google_sheet_csv',
        className: sheetName || 'Danh sách Lớp học (Google Sheet)',
        totalStudents: students.length,
        students,
        sheetId,
        lastSyncedAt: new Date().toISOString(),
      });
    }

    // Parse GViz JSON
    const match = rawText.match(/google\.visualization\.Query\.setResponse\(([\s\S]*)\);/);
    if (!match || !match[1]) {
      return res.status(400).json({ error: 'Không thể giải mã dữ liệu trả về từ Google Sheet.' });
    }

    const gvizData = JSON.parse(match[1]);
    if (gvizData.status !== 'ok' || !gvizData.table) {
      return res.status(400).json({
        error: gvizData.errors?.[0]?.detailed_message || 'Lỗi đọc dữ liệu Google Sheet.',
      });
    }

    const cols = gvizData.table.cols || [];
    const rows = gvizData.table.rows || [];

    // Determine header row
    let headers: string[] = cols.map((c: any) => c.label?.trim() || '');
    let startRowIndex = 0;

    // If cols has empty labels, check if row 0 contains headers
    if (headers.every((h) => !h) && rows.length > 0) {
      headers = rows[0].c.map((cell: any) => (cell ? String(cell.v ?? cell.f ?? '').trim() : ''));
      startRowIndex = 1;
    }

    const students: any[] = [];

    for (let r = startRowIndex; r < rows.length; r++) {
      const rowCells = rows[r]?.c || [];
      const rowValues = rowCells.map((cell: any) => (cell ? (cell.v ?? cell.f ?? '') : ''));

      let name = '';
      let stt = r - startRowIndex + 1;
      let code = `5A-${String(stt).padStart(2, '0')}`;
      let gender = 'Nam';
      let dob = '';
      let status = 'not_submitted';
      let score: number | undefined = undefined;
      let topic = '';
      let essay = '';
      let teacherNote = '';

      headers.forEach((header, colIdx) => {
        const val = String(rowValues[colIdx] ?? '').trim();
        const h = header.toLowerCase();

        if (/họ.*tên|tên.*học.*sinh|tên|student.*name|name/i.test(h)) {
          if (!name) name = val;
        } else if (/stt|số.*thứ.*tự|no/i.test(h)) {
          const num = parseInt(val, 10);
          if (!isNaN(num)) stt = num;
        } else if (/mã.*hs|mã.*số|id|code/i.test(h)) {
          code = val || code;
        } else if (/giới.*tính|phái|gender|nam\/nữ/i.test(h)) {
          gender = val || gender;
        } else if (/ngày.*sinh|năm.*sinh|dob|birth/i.test(h)) {
          dob = val;
        } else if (/trạng.*thái|tình.*trạng|status|tiến.*độ|nộp/i.test(h)) {
          status = normalizeStudentStatus(val);
        } else if (/điểm|score|grade/i.test(h)) {
          const s = parseFloat(val);
          if (!isNaN(s)) score = s;
        } else if (/chủ.*đề|đề.*bài|tên.*bài|bài.*văn|topic/i.test(h)) {
          topic = val;
        } else if (/bài.*làm|nội.*dung|essay|content/i.test(h)) {
          essay = val;
        } else if (/ghi.*chú|nhận.*xét|lưu.*ý|note/i.test(h)) {
          teacherNote = val;
        }
      });

      // Also fallback if name is in first or second non-empty column
      if (!name && rowValues.length > 1) {
        if (typeof rowValues[1] === 'string' && rowValues[1].length > 2) {
          name = rowValues[1];
        } else if (typeof rowValues[0] === 'string' && rowValues[0].length > 2 && isNaN(Number(rowValues[0]))) {
          name = rowValues[0];
        }
      }

      if (name) {
        students.push({
          id: `HS-${sheetId.slice(0, 4)}-${stt}`,
          stt,
          code,
          name,
          gender: gender.toLowerCase().includes('nữ') ? 'Nữ' : 'Nam',
          dob: dob || undefined,
          status,
          score,
          topic: topic || 'Tập làm văn Lớp 5',
          essay: essay || undefined,
          teacherNote: teacherNote || undefined,
        });
      }
    }

    res.json({
      success: true,
      source: 'google_sheet',
      className: sheetName || 'Danh sách Lớp học (Google Sheet)',
      sheetId,
      totalStudents: students.length,
      rawColumns: headers.filter(Boolean),
      students,
      lastSyncedAt: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('Error fetching Google Sheet:', error);
    res.status(500).json({
      error: 'Không thể kết nối hoặc tải dữ liệu từ Google Sheet. Vui lòng kiểm tra lại quyền chia sẻ và đường link.',
      details: error?.message,
    });
  }
});

// Endpoint: Test Google Sheet connection & preview
app.post('/api/sheets/test-connection', async (req, res) => {
  try {
    const { sheetUrl, sheetId: directSheetId, sheetName } = req.body;
    const sheetId = directSheetId || extractSheetId(sheetUrl || '');

    if (!sheetId) {
      return res.status(400).json({
        success: false,
        error: 'Vui lòng cung cấp link Google Sheet hợp lệ.',
      });
    }

    const testUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json${
      sheetName ? `&sheet=${encodeURIComponent(sheetName)}` : ''
    }&range=A1:Z5`;

    const response = await fetch(testUrl);
    if (!response.ok) {
      return res.status(403).json({
        success: false,
        error:
          'Không thể truy cập Google Sheet. Vui lòng mở quyền Chia sẻ: [Bất kỳ ai có đường liên kết đều có thể xem].',
      });
    }

    const text = await response.text();
    const match = text.match(/google\.visualization\.Query\.setResponse\(([\s\S]*)\);/);
    if (!match || !match[1]) {
      return res.status(400).json({
        success: false,
        error: 'Không nhận diện được định dạng phản hồi từ Google Sheet.',
      });
    }

    const json = JSON.parse(match[1]);
    const cols = json.table?.cols?.map((c: any) => c.label || '') || [];
    const rows = json.table?.rows?.length || 0;

    res.json({
      success: true,
      sheetId,
      columnsFound: cols.filter(Boolean),
      previewRowCount: rows,
      message: 'Kết nối Google Sheet thành công! Sẵn sàng đồng bộ danh sách học sinh.',
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      error: 'Lỗi kiểm tra kết nối Google Sheet: ' + (err?.message || ''),
    });
  }
});

// Endpoint: Two-way Google Sheet Writeback
app.post('/api/sheets/writeback', async (req, res) => {
  try {
    const { webhookUrl, student, className } = req.body;

    if (!student || !student.name) {
      return res.status(400).json({ error: 'Thiếu thông tin học sinh cần đồng bộ.' });
    }

    if (!webhookUrl) {
      return res.json({
        success: true,
        message: 'Đã lưu điểm vào bộ nhớ ứng dụng. Để tự động ghi trực tiếp vào Google Sheet, thầy/cô vui lòng cấu hình Webhook URL trong mục Cấu hình Google Sheet.',
      });
    }

    // Forward to teacher's Google Apps Script Webhook
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'update_student',
        className: className || 'Lớp 5A',
        studentId: student.id,
        stt: student.stt,
        code: student.code,
        name: student.name,
        status: student.status,
        score: student.score,
        scores: student.scores,
        topic: student.topic,
        teacherNote: student.teacherNote,
        socraticAdvice: student.socraticAdvice,
        updatedAt: new Date().toISOString(),
      }),
    });

    const result = await response.text();
    res.json({
      success: true,
      message: 'Đã đồng bộ ghi nhận điểm số và lời dặn trực tiếp vào Google Sheet!',
      result,
    });
  } catch (error: any) {
    console.error('Error writing back to Google Sheet:', error);
    res.status(500).json({
      error: 'Không thể ghi nhận dữ liệu vào Google Sheet Webhook. Vui lòng kiểm tra lại Webhook URL.',
      details: error?.message,
    });
  }
});

// Dev vs Prod Vite Integration
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist/index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🦉 Trợ lý Cú Mèo Thông Thái server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
