export interface PillarScores {
  bo_cuc: number;
  von_tu: number;
  ngu_phap: number;
  cam_xuc: number;
  sang_tao: number;
  tong_ket: number;
}

export interface StudentFeedback {
  loi_chao_dong_hanh: string;
  diem_sang: {
    tieu_de: string;
    chi_tiet: string[];
  };
  goc_goi_mo: {
    tieu_de: string;
    phan_tich_loi: string;
    cau_hoi_socratic: string[];
    vi_du_goi_y?: string;
  };
  minigame_nhanh: {
    loai_game: string;
    cau_hoi: string;
    cac_lua_chon: string[];
    dap_an_dung: string;
    giai_thich_vui: string;
  };
  loi_chuc_va_hat_giong: {
    loi_chuc: string;
    so_hat_giong_tang: number;
    huy_hieu_khen_tang: string;
  };
}

export interface TeacherDashboardData {
  diem_so: PillarScores;
  lo_hong_kien_thuc: string[];
  chi_so_tang_truong: {
    tu_vung: string;
    cau_ghep: string;
    bien_phap_tu_tu: string;
  };
  canh_bao_dao_van: boolean;
  chi_tiet_dao_van?: string;
}

export interface ParentReportData {
  tieu_de_thu: string;
  thu_gui_phu_huynh: string;
  diem_tien_bo_noi_bat: string[];
  hoat_dong_dong_hanh_tai_nha: string[];
}

export interface EvaluationResult {
  phan_hoi_hoc_sinh: StudentFeedback;
  teacher_dashboard: TeacherDashboardData;
  parent_report: ParentReportData;
}

export interface TextHeuristics {
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
    riskScore: number;
  };
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: number;
}

export type StudentStatus = 'submitted' | 'drafting' | 'not_submitted' | 'needs_support';

export interface StudentRecord {
  id: string;
  stt: number;
  code?: string;
  name: string;
  gender?: 'Nam' | 'Nữ' | string;
  dob?: string;
  status: StudentStatus;
  lastSubmittedDate?: string;
  topic?: string;
  essay?: string;
  score?: number;
  scores?: PillarScores;
  teacherNote?: string;
  socraticAdvice?: string;
}

export interface StudentProfile {
  id: string;
  name: string;
  className: string;
  avatarId: string;
  avatarIcon: string;
  avatarName: string;
  totalPoints: number;
  submittedCount: number;
  badge: string;
  createdAt: string;
}

export interface EssaySubmission {
  id: string;
  studentId: string;
  studentName: string;
  className: string;
  avatarIcon: string;
  topic: string;
  essay: string;
  wordCount: number;
  submittedAt: string;
  score: number;
  pointsEarned: number;
  teacherNote?: string;
  owlFeedbackSummary?: string;
  scores?: PillarScores;
}

export interface GoogleSheetConfig {
  sheetUrl: string;
  sheetId: string;
  sheetName?: string;
  gid?: string;
  webhookUrl?: string;
  lastSyncedAt?: string;
  className: string;
  autoSync: boolean;
}

export interface ClassRosterResponse {
  success: boolean;
  className: string;
  totalStudents: number;
  students: StudentRecord[];
  source: 'google_sheet' | 'default_mock';
  sheetId?: string;
  sheetName?: string;
  lastSyncedAt: string;
  rawColumns?: string[];
  error?: string;
}
