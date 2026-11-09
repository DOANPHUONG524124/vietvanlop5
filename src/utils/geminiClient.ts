import { GoogleGenAI, Type } from '@google/genai';
import { EvaluationResult, ChatMessage } from '../types/index.ts';
import { analyzeText } from './rules.ts';

// 1. Danh sách model AI và thứ tự fallback theo AI_INSTRUCTIONS.md
export const AVAILABLE_MODELS = [
  {
    id: 'gemini-3-flash-preview',
    name: 'Gemini 3 Flash Preview',
    badge: 'Mặc định (Khuyên dùng)',
    desc: 'Tốc độ phản hồi cực nhanh, tối ưu cho gợi mở Socratic và phân tích ngữ văn lớp 5.',
    isDefault: true,
  },
  {
    id: 'gemini-3-pro-preview',
    name: 'Gemini 3 Pro Preview',
    badge: 'Mạnh mẽ nhất',
    desc: 'Lập luận sư phạm chuyên sâu, phân tích cấu trúc bài viết và tu từ sắc bén.',
    isDefault: false,
  },
  {
    id: 'gemini-2.5-flash',
    name: 'Gemini 2.5 Flash',
    badge: 'Dự phòng ổn định',
    desc: 'Model ổn định cao, tiết kiệm quota và xử lý mượt mà khi các model 3.0 quá tải.',
    isDefault: false,
  },
] as const;

export type ModelId = (typeof AVAILABLE_MODELS)[number]['id'];

export const STORAGE_KEYS = {
  API_KEY: 'owl_gemini_api_key',
  MODEL: 'owl_gemini_model',
};

export function getStoredApiKey(): string {
  if (typeof window === 'undefined') return '';
  const key = localStorage.getItem(STORAGE_KEYS.API_KEY);
  if (key && key.trim()) return key.trim();
  // Fallback to build-time env if present
  try {
    const envKey = (import.meta as any).env?.VITE_GEMINI_API_KEY;
    if (envKey) return envKey.trim();
  } catch {}
  return '';
}

export function setStoredApiKey(key: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.API_KEY, key.trim());
}

export function getStoredModel(): string {
  if (typeof window === 'undefined') return 'gemini-3-flash-preview';
  return localStorage.getItem(STORAGE_KEYS.MODEL) || 'gemini-3-flash-preview';
}

export function setStoredModel(modelId: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.MODEL, modelId);
}

const OWL_SYSTEM_INSTRUCTION = `
Bạn là **Trợ lý Cú Mèo Thông Thái**, chuyên gia giáo dục AI chuyên biệt trong giảng dạy Tiếng Việt và phát triển tư duy ngôn ngữ cho học sinh lớp 5 theo phương pháp Socratic trong "Hành trình thám hiểm Rừng Tri Thức".

### Mục tiêu & Phương pháp:
1. **Phân tích sâu sắc 5 Cột trụ:**
   - **Bố cục:** Kiểm tra sự cân đối Mở bài - Thân bài - Kết bài; sự mạch lạc giữa các đoạn.
   - **Vốn từ:** Đánh giá từ láy, từ gợi hình, gợi thanh.
   - **Ngữ pháp:** Câu ghép (quan hệ từ vì... nên, tuy... nhưng, không những... mà còn), dấu câu (phẩy, chấm, hai chấm).
   - **Cảm xúc:** Tình cảm chân thật, sự gắn bó với đối tượng tả.
   - **Sáng tạo:** So sánh độc đáo, nhân hóa giàu tưởng tượng, không sao chép văn mẫu.
2. **Dẫn dắt Socratic:** Tuyệt đối KHÔNG viết hộ bài hay đưa lời giải trực tiếp. Đặt câu hỏi gợi mở để học sinh tự nhận ra lỗi và tự sửa.
3. **Gamification & An toàn:**
   - Thưởng Hạt giống thông thái để nâng cấp Tổ chim học tập.
   - Nhắc nhở nhẹ nhàng nếu phát hiện văn mẫu rập khuôn.
4. **Tone:** Bác Cú Thông Thái ấm áp, kiên nhẫn, vui vẻ và khích lệ.
`;

// Helper: Get fallback models list starting from preferred
export function getFallbackModelList(preferredModel: string): string[] {
  const allIds = AVAILABLE_MODELS.map((m) => m.id);
  const reordered = [preferredModel, ...allIds.filter((id) => id !== preferredModel)];
  return Array.from(new Set(reordered));
}

export interface ProgressStepCallback {
  onStepChange?: (step: 1 | 2 | 3, status: 'running' | 'done' | 'stopped', message?: string) => void;
  onModelFallback?: (fromModel: string, toModel: string, reason: string) => void;
}

/**
 * Đánh giá bài văn với cơ chế tự động Fallback & Retry qua các model
 */
export async function evaluateEssayWithClientFallback(
  essay: string,
  topic: string,
  imageBase64?: string,
  callbacks?: ProgressStepCallback
): Promise<{ data: EvaluationResult; modelUsed: string }> {
  const apiKey = getStoredApiKey();
  if (!apiKey) {
    throw new Error('Chưa thiết lập Gemini API Key. Vui lòng bấm nút Settings (API Key) trên Header để nhập key.');
  }

  const preferredModel = getStoredModel();
  const modelsToTry = getFallbackModelList(preferredModel);

  // Step 1: Phân tích số liệu sơ bộ
  callbacks?.onStepChange?.(1, 'running', 'Đang phân tích số liệu sơ bộ từ vựng & câu ghép...');
  const heuristics = analyzeText(essay || '');
  callbacks?.onStepChange?.(1, 'done', 'Đã phân tích xong số liệu sơ bộ.');

  // Step 2: Đánh giá Socratic 5 Cột Trụ
  callbacks?.onStepChange?.(2, 'running', 'Đang kết nối Bác Cú Thông Thái để phân tích 5 Cột Trụ...');

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

  let lastError: any = null;

  for (let i = 0; i < modelsToTry.length; i++) {
    const currentModel = modelsToTry[i];
    try {
      const ai = new GoogleGenAI({
        apiKey,
      });

      const response = await ai.models.generateContent({
        model: currentModel,
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
                  loi_chao_dong_hanh: { type: Type.STRING },
                  diem_sang: {
                    type: Type.OBJECT,
                    properties: {
                      tieu_de: { type: Type.STRING },
                      chi_tiet: {
                        type: Type.ARRAY,
                        items: { type: Type.STRING },
                      },
                    },
                    required: ['tieu_de', 'chi_tiet'],
                  },
                  goc_goi_mo: {
                    type: Type.OBJECT,
                    properties: {
                      tieu_de: { type: Type.STRING },
                      phan_tich_loi: { type: Type.STRING },
                      cau_hoi_socratic: {
                        type: Type.ARRAY,
                        items: { type: Type.STRING },
                      },
                      vi_du_goi_y: { type: Type.STRING },
                    },
                    required: ['tieu_de', 'phan_tich_loi', 'cau_hoi_socratic'],
                  },
                  minigame_nhanh: {
                    type: Type.OBJECT,
                    properties: {
                      loai_game: { type: Type.STRING },
                      cau_hoi: { type: Type.STRING },
                      cac_lua_chon: {
                        type: Type.ARRAY,
                        items: { type: Type.STRING },
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
                      so_hat_giong_tang: { type: Type.INTEGER },
                      huy_hieu_khen_tang: { type: Type.STRING },
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
                      bo_cuc: { type: Type.NUMBER },
                      von_tu: { type: Type.NUMBER },
                      ngu_phap: { type: Type.NUMBER },
                      cam_xuc: { type: Type.NUMBER },
                      sang_tao: { type: Type.NUMBER },
                      tong_ket: { type: Type.NUMBER },
                    },
                    required: ['bo_cuc', 'von_tu', 'ngu_phap', 'cam_xuc', 'sang_tao', 'tong_ket'],
                  },
                  lo_hong_kien_thuc: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                  },
                  chi_so_tang_truong: {
                    type: Type.OBJECT,
                    properties: {
                      tu_vung: { type: Type.STRING },
                      cau_ghep: { type: Type.STRING },
                      bien_phap_tu_tu: { type: Type.STRING },
                    },
                    required: ['tu_vung', 'cau_ghep', 'bien_phap_tu_tu'],
                  },
                  canh_bao_dao_van: { type: Type.BOOLEAN },
                  chi_tiet_dao_van: { type: Type.STRING },
                },
                required: ['diem_so', 'lo_hong_kien_thuc', 'chi_so_tang_truong', 'canh_bao_dao_van'],
              },
              parent_report: {
                type: Type.OBJECT,
                properties: {
                  tieu_de_thu: { type: Type.STRING },
                  thu_gui_phu_huynh: { type: Type.STRING },
                  diem_tien_bo_noi_bat: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                  },
                  hoat_dong_dong_hanh_tai_nha: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                  },
                },
                required: ['tieu_de_thu', 'thu_gui_phu_huynh', 'diem_tien_bo_noi_bat', 'hoat_dong_dong_hanh_tai_nha'],
              },
            },
            required: ['phan_hoi_hoc_sinh', 'teacher_dashboard', 'parent_report'],
          },
        },
      });

      const parsed: EvaluationResult = JSON.parse(response.text || '{}');
      callbacks?.onStepChange?.(2, 'done', `Đã đánh giá thành công bằng ${currentModel}.`);

      // Step 3: Tạo báo cáo phụ huynh & Minigame
      callbacks?.onStepChange?.(3, 'done', 'Đã tổng hợp thư phụ huynh và minigame củng cố.');

      return {
        data: parsed,
        modelUsed: currentModel,
      };
    } catch (err: any) {
      console.warn(`Model ${currentModel} gặp lỗi:`, err?.message || err);
      lastError = err;

      // Check if there is a next model in fallback list
      const nextModel = modelsToTry[i + 1];
      if (nextModel) {
        callbacks?.onModelFallback?.(
          currentModel,
          nextModel,
          err?.message?.includes('429')
            ? 'Hết hạn ngạch (429 RESOURCE_EXHAUSTED)'
            : err?.message || 'Quá tải API'
        );
      }
    }
  }

  // If all models failed, halt and report stopped
  callbacks?.onStepChange?.(2, 'stopped', 'Đã dừng do lỗi');
  callbacks?.onStepChange?.(3, 'stopped', 'Đã dừng do lỗi');

  const rawErrorMessage =
    lastError?.message || lastError?.toString() || 'Lỗi không xác định khi kết nối Gemini API.';

  throw new Error(rawErrorMessage);
}

/**
 * Trò chuyện Socratic với Bác Cú có fallback
 */
export async function chatWithBacCuSocratic(
  history: ChatMessage[],
  message: string,
  essayContext: string,
  topic: string
): Promise<string> {
  const apiKey = getStoredApiKey();
  if (!apiKey) {
    throw new Error('Chưa thiết lập Gemini API Key. Vui lòng bấm nút Settings (API Key) trên Header.');
  }

  const preferredModel = getStoredModel();
  const modelsToTry = getFallbackModelList(preferredModel);

  const chatPrompt = `
Bối cảnh bài văn học sinh đang viết:
- Chủ đề: "${topic || 'Tập làm văn'}"
- Bài viết hiện tại:
"""
${essayContext || '(Chưa có bài viết cụ thể)'}
"""

Lịch sử trò chuyện trước đó:
${history.map((h) => `${h.role === 'user' ? 'Học sinh' : 'Bác Cú'}: ${h.text}`).join('\n')}

Học sinh vừa hỏi hoặc gửi câu viết mới:
"${message}"

HƯỚNG DẪN TRẢ LỜI:
1. Đóng vai Bác Cú Thông Thái (ấm áp, hóm hỉnh, khen ngợi sự chủ động của em).
2. Dùng phương pháp Socratic: KHÔNG viết hộ, KHÔNG đưa ra câu hoàn chỉnh để học sinh chép.
3. Nếu học sinh thử sửa một câu và câu đó hay hơn, hãy khen ngợi chi tiết vì sao nó hay.
4. Độ dài ngắn gọn, dễ hiểu cho học sinh lớp 5 (khoảng 3-5 câu).
`;

  let lastErr: any = null;
  for (const model of modelsToTry) {
    try {
      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model,
        contents: chatPrompt,
        config: { systemInstruction: OWL_SYSTEM_INSTRUCTION },
      });
      if (response.text) return response.text;
    } catch (err: any) {
      lastErr = err;
    }
  }

  throw new Error(lastErr?.message || 'Không thể trò chuyện cùng Bác Cú lúc này.');
}

/**
 * Trích xuất chữ viết tay từ hình ảnh bài làm qua Gemini Vision
 */
export async function extractTextFromImage(imageBase64: string): Promise<string> {
  const apiKey = getStoredApiKey();
  if (!apiKey) {
    throw new Error('Chưa thiết lập Gemini API Key. Vui lòng bấm nút Settings (API Key) trên Header.');
  }

  const preferredModel = getStoredModel();
  const modelsToTry = getFallbackModelList(preferredModel);

  const mimeType = imageBase64.startsWith('data:image/png')
    ? 'image/png'
    : imageBase64.startsWith('data:image/jpeg')
    ? 'image/jpeg'
    : 'image/jpeg';
  const cleanBase64 = imageBase64.replace(/^data:image\/\w+;base64,/, '');

  let lastErr: any = null;
  for (const model of modelsToTry) {
    try {
      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model,
        contents: [
          {
            inlineData: {
              mimeType,
              data: cleanBase64,
            },
          },
          {
            text: 'Hãy trích xuất nguyên văn toàn bộ chữ viết tiếng Việt từ trang vở hoặc bài kiểm tra này. Giữ nguyên cấu trúc các đoạn văn, dấu câu. Chỉ trả về văn bản trích xuất thuần túy, tuyệt đối không thêm lời bình hay nhận xét.',
          },
        ],
      });
      if (response.text) {
        return response.text.trim();
      }
    } catch (err: any) {
      console.warn(`OCR với model ${model} thất bại:`, err?.message);
      lastErr = err;
    }
  }

  throw new Error(lastErr?.message || 'Không thể trích xuất chữ viết tay từ hình ảnh.');
}

/**
 * Kiểm tra kết nối với API Key
 */
export async function verifyApiKey(testKey: string, model: string = 'gemini-3-flash-preview'): Promise<{ success: boolean; error?: string }> {
  if (!testKey || !testKey.trim()) {
    return { success: false, error: 'Vui lòng nhập API Key.' };
  }
  try {
    const ai = new GoogleGenAI({ apiKey: testKey.trim() });
    const res = await ai.models.generateContent({
      model,
      contents: 'Chào bạn! Hãy trả lời đúng 1 từ: "OK"',
    });
    if (res.text) {
      return { success: true };
    }
    return { success: false, error: 'Phản hồi trống từ Gemini API.' };
  } catch (err: any) {
    return { success: false, error: err?.message || 'API Key không hợp lệ hoặc đã hết hạn.' };
  }
}
