/**
 * Core pedagogical and gamification rules for Trợ lý Cú Mèo Thông Thái
 * Grade 5 Vietnamese (Tiếng Việt Lớp 5) - Hành trình thám hiểm Rừng Tri Thức
 */

export interface PillarScores {
  bo_cuc: number;     // 1. Bố cục (0-10)
  von_tu: number;     // 2. Vốn từ (0-10)
  ngu_phap: number;   // 3. Ngữ pháp (0-10)
  cam_xuc: number;    // 4. Cảm xúc (0-10)
  sang_tao: number;   // 5. Sáng tạo (0-10)
}

export interface NestLevelInfo {
  level: number;
  name: string;
  badge: string;
  description: string;
  minSeeds: number;
  maxSeeds: number;
  icon: string;
}

export const NEST_TIERS: NestLevelInfo[] = [
  {
    level: 1,
    name: "Tổ Rơm Non Xanh",
    badge: "Mầm Non Tri Thức",
    description: "Chiếc tổ đơn sơ ấm cúng nơi khởi đầu chuyến hành trình thám hiểm ngôn từ.",
    minSeeds: 0,
    maxSeeds: 30,
    icon: "🪺",
  },
  {
    level: 2,
    name: "Tổ Cành Khô Ấm Áp",
    badge: "Thợ Săn Từ Láy",
    description: "Được đan cài từ những cành bách thảo kiên cố, sẵn sàng đón nhận những bài văn sinh động.",
    minSeeds: 31,
    maxSeeds: 80,
    icon: "🪵",
  },
  {
    level: 3,
    name: "Nhà Cây Gỗ Mộc",
    badge: "Bậc Thầy Câu Ghép",
    description: "Căn nhà gỗ cổ tích giữa tán lá xanh ngát với ô cửa sổ nhìn ra bến bờ sông chữ.",
    minSeeds: 81,
    maxSeeds: 150,
    icon: "🏡",
  },
  {
    level: 4,
    name: "Thư Viện Cổ Thụ Xanh",
    badge: "Nhà Thơ Nhí",
    description: "Tàng kinh các ngập tràn sách cổ và những câu văn giàu hình ảnh, nhân hóa kỳ diệu.",
    minSeeds: 151,
    maxSeeds: 250,
    icon: "📚",
  },
  {
    level: 5,
    name: "Lâu Đài Tri Thức Rừng Già",
    badge: "Đại Sứ Ngôn Từ",
    description: "Đỉnh cao thám hiểm với tháp ngắm sao rực rỡ, nơi chữ nghĩa hóa thành muôn vì tinh tú.",
    minSeeds: 251,
    maxSeeds: 9999,
    icon: "🏰",
  },
];

export function getNestTier(seeds: number): NestLevelInfo {
  const safeSeeds = Math.max(0, seeds);
  for (let i = NEST_TIERS.length - 1; i >= 0; i--) {
    if (safeSeeds >= NEST_TIERS[i].minSeeds) {
      return NEST_TIERS[i];
    }
  }
  return NEST_TIERS[0];
}

export function calculateAverageScore(scores: PillarScores): number {
  const sum =
    scores.bo_cuc +
    scores.von_tu +
    scores.ngu_phap +
    scores.cam_xuc +
    scores.sang_tao;
  return Math.round((sum / 5) * 10) / 10;
}

export function calculateSeedsEarned(scores: PillarScores, isPlagiarized: boolean = false): number {
  if (isPlagiarized) {
    return 2; // Khích lệ nhỏ để em tự viết lại
  }
  const avg = calculateAverageScore(scores);
  if (avg >= 9) return 15;
  if (avg >= 8) return 12;
  if (avg >= 7) return 10;
  if (avg >= 6) return 8;
  return 5;
}

// Common reduplicative words (từ láy) in Grade 5
export const KNOWN_TU_LAY = [
  "long lanh", "róc rách", "thoang thoảng", "lung linh", "chập chờn",
  "xanh biếc", "thì thầm", "rộn ràng", "lấp lánh", "dịu dàng",
  "chăm chỉ", "mơn mởn", "xào xạc", "la đà", "rực rỡ", "bát ngát",
  "mênh mông", "chót vót", "chập chùng", "líu lo", "nhỏ nhắn",
  "xinh xắn", "trắng muốt", "ngào ngạt", "chập chững", "lất phất",
  "hối hả", "tấp nập", "lung linh", "êm ả", "thánh thót"
];

// Grade 5 paired connectives for compound sentences (cặp quan hệ từ câu ghép)
export const COMPOUND_PAIRS = [
  { start: "vì", end: "nên", type: "Nguyên nhân - kết quả" },
  { start: "do", end: "nên", type: "Nguyên nhân - kết quả" },
  { start: "nhờ", end: "mà", type: "Nguyên nhân - kết quả" },
  { start: "nếu", end: "thì", type: "Điều kiện / Giả thiết - kết quả" },
  { start: "hễ", end: "thì", type: "Điều kiện / Giả thiết - kết quả" },
  { start: "giá", end: "thì", type: "Điều kiện / Giả thiết - kết quả" },
  { start: "tuy", end: "nhưng", type: "Tương phản" },
  { start: "mặc dù", end: "nhưng", type: "Tương phản" },
  { start: "dù", end: "nhưng", type: "Tương phản" },
  { start: "không những", end: "mà còn", type: "Tăng tiến" },
  { start: "chẳng những", end: "mà còn", type: "Tăng tiến" },
  { start: "không chỉ", end: "mà còn", type: "Tăng tiến" },
];

export interface TextAnalysisHeuristic {
  wordCount: number;
  sentenceCount: number;
  paragraphCount: number;
  detectedTuLay: string[];
  detectedCompoundPairs: string[];
  comparisonCount: number;
  personificationCount: number;
  plagiarismRisk: {
    isPlagiarized: boolean;
    reason?: string;
    riskScore: number; // 0 to 100
  };
}

export const CLICHE_PLAGIARISM_PATTERNS = [
  "trong tất cả các loài cây em thích nhất là",
  "quê hương em có rất nhiều cảnh đẹp nhưng em thích nhất",
  "mỗi người ai cũng có một",
  "mặt trời như một quả cầu lửa khổng lồ từ từ nhô lên",
  "mùa hè đến mang theo những tiếng ve râm ran và những bông hoa phượng đỏ rực một góc trời",
  "chú mèo nhà em có bộ lông màu vàng óng mượt như tơ",
  "bà em năm nay đã ngoài sáu mươi tuổi mái tóc bà đã bạc trắng như cước",
];

export function analyzeText(text: string): TextAnalysisHeuristic {
  const normalized = text.toLowerCase();
  
  // Word count
  const words = text.trim().split(/\s+/).filter(Boolean);
  const wordCount = words.length;

  // Paragraph count
  const paragraphs = text.split(/\n+/).filter((p) => p.trim().length > 0);
  const paragraphCount = paragraphs.length;

  // Sentence count (ends with ., !, ?, ...)
  const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0);
  const sentenceCount = sentences.length;

  // Detect Tu Lay
  const detectedTuLay: string[] = [];
  for (const tl of KNOWN_TU_LAY) {
    if (normalized.includes(tl) && !detectedTuLay.includes(tl)) {
      detectedTuLay.push(tl);
    }
  }

  // Detect Compound Pairs
  const detectedCompoundPairs: string[] = [];
  for (const pair of COMPOUND_PAIRS) {
    if (normalized.includes(pair.start) && normalized.includes(pair.end)) {
      const label = `${pair.start}... ${pair.end} (${pair.type})`;
      if (!detectedCompoundPairs.includes(label)) {
        detectedCompoundPairs.push(label);
      }
    }
  }

  // Comparison markers
  const comparisonMarkers = ["như", "tựa như", "tựa", "giống như", "chẳng khác nào", "tưởng như"];
  let comparisonCount = 0;
  for (const m of comparisonMarkers) {
    const matches = normalized.split(m).length - 1;
    comparisonCount += matches;
  }

  // Personification markers (bác, chú, cô, chị + cây/hoa/mèo/gió...)
  const personificationKeywords = [
    "bác cây", "chú mèo", "cô gió", "chị nắng", "ông mặt trời", "bác phượng",
    "bạn chim", "thì thầm trò chuyện", "vẫy tay", "khoác lên mình tấm áo", "khoác áo"
  ];
  let personificationCount = 0;
  for (const pk of personificationKeywords) {
    if (normalized.includes(pk)) {
      personificationCount++;
    }
  }

  // Plagiarism heuristic
  let matchedCliches = 0;
  for (const pattern of CLICHE_PLAGIARISM_PATTERNS) {
    if (normalized.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, " ").includes(pattern)) {
      matchedCliches++;
    }
  }

  let riskScore = 0;
  let reason: string | undefined = undefined;
  if (matchedCliches >= 2) {
    riskScore = 85;
    reason = "Bài viết có chứa nhiều đoạn câu rập khuôn giống hệt các bài văn mẫu phổ biến trên mạng.";
  } else if (matchedCliches === 1) {
    riskScore = 55;
    reason = "Có 1 cấu trúc mở bài/kết bài quen thuộc thường thấy ở văn mẫu Internet.";
  }

  return {
    wordCount,
    sentenceCount,
    paragraphCount,
    detectedTuLay,
    detectedCompoundPairs,
    comparisonCount,
    personificationCount,
    plagiarismRisk: {
      isPlagiarized: riskScore >= 70,
      reason,
      riskScore,
    },
  };
}
