import React, { useState } from 'react';
import {
  Key,
  Sparkles,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  Cpu,
  ShieldCheck,
  RefreshCw,
  Zap,
  Check
} from 'lucide-react';
import {
  AVAILABLE_MODELS,
  getStoredApiKey,
  setStoredApiKey,
  getStoredModel,
  setStoredModel,
  verifyApiKey,
} from '../utils/geminiClient.ts';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaved: (apiKey: string, model: string) => void;
  isRequired?: boolean;
}

export const ApiKeyModal: React.FC<ApiKeyModalProps> = ({
  isOpen,
  onClose,
  onSaved,
  isRequired = false,
}) => {
  const [apiKey, setApiKey] = useState(() => getStoredApiKey());
  const [selectedModel, setSelectedModel] = useState(() => getStoredModel());
  const [showKey, setShowKey] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifyStatus, setVerifyStatus] = useState<{
    success?: boolean;
    error?: string;
  } | null>(null);

  if (!isOpen) return null;

  const handleTestAndSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!apiKey.trim()) {
      setVerifyStatus({ success: false, error: 'Vui lòng dán API Key của bạn để tiếp tục.' });
      return;
    }

    setIsVerifying(true);
    setVerifyStatus(null);

    const result = await verifyApiKey(apiKey, selectedModel);
    setIsVerifying(false);

    if (result.success) {
      setStoredApiKey(apiKey);
      setStoredModel(selectedModel);
      setVerifyStatus({ success: true });
      setTimeout(() => {
        onSaved(apiKey, selectedModel);
        onClose();
      }, 700);
    } else {
      setVerifyStatus({ success: false, error: result.error });
    }
  };

  const handleQuickSaveWithoutTest = () => {
    if (!apiKey.trim()) {
      setVerifyStatus({ success: false, error: 'Vui lòng nhập API Key.' });
      return;
    }
    setStoredApiKey(apiKey);
    setStoredModel(selectedModel);
    onSaved(apiKey, selectedModel);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6 animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-amber-100 text-amber-800">
              <Key className="w-6 h-6" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                <Sparkles className="w-3 h-3 text-amber-500" />
                <span>Google AI Studio Integration</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mt-0.5">
                Cài Đặt Gemini API Key & Model AI
              </h3>
            </div>
          </div>
          {!isRequired && (
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center font-bold text-sm cursor-pointer"
            >
              ✕
            </button>
          )}
        </div>

        {/* Guidance Alert with Direct Link */}
        <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/90 text-amber-950 space-y-2">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span className="text-xs font-bold flex items-center gap-1.5 text-amber-900">
              <Key className="w-4 h-4 text-amber-700" />
              <span>Chưa có API key? Tạo miễn phí trong 1 phút:</span>
            </span>
            <a
              href="https://aistudio.google.com/api-keys"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-3 py-1 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs transition-colors shadow-xs"
            >
              <span>Lấy API key tại Google AI Studio</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
          <p className="text-[11px] text-amber-900/80 leading-relaxed">
            API key của bạn được lưu an toàn trong <code>localStorage</code> trên trình duyệt của máy bạn, không gửi qua bất kỳ máy chủ trung gian nào.
          </p>
        </div>

        <form onSubmit={handleTestAndSave} className="space-y-5">
          {/* API Key Input */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Gemini API Key của bạn:
            </label>
            <div className="relative">
              <input
                type={showKey ? 'text' : 'password'}
                value={apiKey}
                onChange={(e) => {
                  setApiKey(e.target.value);
                  setVerifyStatus(null);
                }}
                placeholder="AIzaSy..."
                className="w-full pl-4 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-2xl font-mono text-xs sm:text-sm focus:border-emerald-500 focus:bg-white focus:outline-hidden"
              />
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-slate-600 cursor-pointer"
                title={showKey ? 'Ẩn key' : 'Hiện key'}
              >
                {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Verification Status */}
          {verifyStatus && (
            <div
              className={`p-3.5 rounded-2xl border text-xs flex items-start gap-2.5 ${
                verifyStatus.success
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-semibold'
                  : 'bg-rose-50 border-rose-300 text-rose-950 font-medium'
              }`}
            >
              {verifyStatus.success ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Kết nối thành công! API Key hợp lệ và đã sẵn sàng sử dụng.</span>
                </>
              ) : (
                <>
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">Lỗi kết nối API: </span>
                    <span className="font-mono text-[11px] block mt-0.5">{verifyStatus.error}</span>
                  </div>
                </>
              )}
            </div>
          )}

          {/* Model Selection Cards */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Chọn Model AI Mặc Định (Thứ tự Fallback tự động):
            </label>
            <div className="grid grid-cols-1 gap-2.5">
              {AVAILABLE_MODELS.map((m) => {
                const isSelected = selectedModel === m.id;
                return (
                  <div
                    key={m.id}
                    onClick={() => setSelectedModel(m.id)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                      isSelected
                        ? 'bg-emerald-50/80 border-emerald-500 ring-2 ring-emerald-300 shadow-xs'
                        : 'bg-slate-50/60 border-slate-200 hover:bg-slate-100/60'
                    }`}
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs sm:text-sm text-slate-900">{m.name}</span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            m.isDefault
                              ? 'bg-emerald-200 text-emerald-900'
                              : 'bg-slate-200 text-slate-700'
                          }`}
                        >
                          {m.badge}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 leading-snug">{m.desc}</p>
                    </div>

                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                        isSelected
                          ? 'bg-emerald-600 border-emerald-600 text-white'
                          : 'border-slate-300 bg-white'
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3" />}
                    </div>
                  </div>
                );
              })}
            </div>
            <p className="text-[11px] text-slate-500 italic">
              💡 Cơ chế Fallback: Nếu model đang chọn gặp lỗi hoặc quá tải (429), hệ thống sẽ tự động thử lần lượt các model tiếp theo.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={handleQuickSaveWithoutTest}
              className="text-xs text-slate-500 hover:text-slate-800 font-semibold cursor-pointer"
            >
              Lưu nhanh không kiểm tra
            </button>

            <div className="flex items-center gap-2">
              {!isRequired && (
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
                >
                  Đóng
                </button>
              )}
              <button
                type="submit"
                disabled={isVerifying}
                className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 active:scale-95 text-white font-bold text-xs flex items-center gap-2 shadow-xs cursor-pointer transition-all disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isVerifying ? 'animate-spin' : ''}`} />
                <span>{isVerifying ? 'Đang kiểm tra key...' : 'Kiểm Tra & Lưu Cấu Hình'}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
