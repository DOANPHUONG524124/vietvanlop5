import React, { useState, useRef, useEffect } from 'react';
import { OwlAvatar } from './OwlAvatar.tsx';
import { ChatMessage } from '../types/index.ts';
import { Send, X, Sparkles, Volume2, VolumeX, Lightbulb, Bot } from 'lucide-react';
import { speakVietnamese, stopSpeaking } from '../utils/audio.ts';
import { chatWithBacCuSocratic } from '../utils/geminiClient.ts';

interface SocraticChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  essayContext: string;
  topic: string;
  initialPrompt?: string;
  onOpenApiKeyModal?: () => void;
}

export const SocraticChatModal: React.FC<SocraticChatModalProps> = ({
  isOpen,
  onClose,
  essayContext,
  topic,
  initialPrompt,
  onOpenApiKeyModal,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      text: 'Chào nhà thám hiểm nhí! Bác Cú Thông Thái đây! Em đang muốn tìm từ ngữ hay, viết mở bài sinh động hay hoàn thiện câu văn nào trong bài? Cứ chia sẻ cùng Bác Cú nhé! 🦉✨',
      timestamp: Date.now(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [speakingMsgId, setSpeakingMsgId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialPrompt && isOpen) {
      handleSend(initialPrompt);
    }
  }, [initialPrompt, isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  if (!isOpen) return null;

  const quickPrompts = [
    '🦉 Gợi ý giúp em mở bài gián tiếp thật hấp dẫn',
    '✨ Tìm cho em 3 từ láy gợi hình cho bài văn này',
    '🌈 Làm sao để đặt câu so sánh thật giàu cảm xúc?',
    '🎯 Giúp em viết kết bài mở rộng đạt điểm cao!',
  ];

  const handleSpeak = (msgId: string, text: string) => {
    if (speakingMsgId === msgId) {
      stopSpeaking();
      setSpeakingMsgId(null);
      return;
    }

    setSpeakingMsgId(msgId);
    speakVietnamese(
      text,
      () => setSpeakingMsgId(null),
      () => setSpeakingMsgId(null)
    );
  };

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const reply = await chatWithBacCuSocratic(
        messages.slice(-6),
        text,
        essayContext,
        topic
      );

      if (reply) {
        const assistantMsg: ChatMessage = {
          id: `owl-${Date.now()}`,
          role: 'assistant',
          text: reply,
          timestamp: Date.now(),
        };
        setMessages((prev) => [...prev, assistantMsg]);

        // Auto speak the response in Vietnamese for high accessibility
        handleSpeak(assistantMsg.id, reply);
      }
    } catch (err: any) {
      console.error('Chat error:', err);
      const isApiKeyErr = err?.message?.includes('API Key');
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          role: 'assistant',
          text: isApiKeyErr
            ? 'Em ơi, chưa có Gemini API Key để Bác Cú trò chuyện. Em hãy bấm nút cài đặt chìa khóa (Key) ở đầu trang nhé!'
            : `Bác Cú chưa thể phản hồi lúc này do gián đoạn: ${err?.message || 'Lỗi kết nối'}. Em thử gửi lại nhé!`,
          timestamp: Date.now(),
        },
      ]);
      if (isApiKeyErr && onOpenApiKeyModal) {
        onOpenApiKeyModal();
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border-4 border-emerald-300 overflow-hidden flex flex-col h-[85vh] max-h-[750px]">
        {/* Header with Mascot */}
        <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 p-4 text-white flex items-center justify-between shrink-0 shadow-md">
          <div className="flex items-center gap-3">
            <OwlAvatar size="md" mood={isLoading ? 'thinking' : 'mentoring'} isSpeaking={Boolean(speakingMsgId)} />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-black text-white">
                  Trò Chuyện Cùng Bác Cú Thông Thái
                </h3>
                <span className="text-[10px] bg-amber-400 text-amber-950 px-2 py-0.5 rounded-full font-black">
                  Socratic AI
                </span>
              </div>
              <p className="text-xs text-emerald-100 flex items-center gap-1 mt-0.5">
                <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                <span>Phương pháp gợi mở • Tự do sáng tạo ngôn từ</span>
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              stopSpeaking();
              onClose();
            }}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            title="Đóng hộp thoại"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Topic Reminder Pill */}
        {topic && (
          <div className="px-4 py-2 bg-emerald-50 border-b border-emerald-100 text-xs text-emerald-900 flex items-center gap-2 shrink-0">
            <span className="font-black text-emerald-700">Đề bài đang viết:</span>
            <span className="truncate italic font-medium">"{topic}"</span>
          </div>
        )}

        {/* Messages List Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50/60">
          {messages.map((m) => {
            const isUser = m.role === 'user';
            const isSpeakingThis = speakingMsgId === m.id;

            return (
              <div
                key={m.id}
                className={`flex gap-3 items-end ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="shrink-0 mb-1">
                    <OwlAvatar size="sm" mood={isSpeakingThis ? 'happy' : 'mentoring'} />
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-3xl p-3.5 text-xs sm:text-sm leading-relaxed shadow-xs relative ${
                    isUser
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-br-xs font-medium'
                      : 'bg-white text-slate-800 border-2 border-emerald-100 rounded-bl-xs'
                  }`}
                >
                  <div className="whitespace-pre-wrap">{m.text}</div>

                  {/* Read aloud button for owl messages */}
                  {!isUser && (
                    <div className="mt-2 pt-1.5 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[10px] text-slate-400 font-semibold">Bác Cú Lớp 5</span>
                      <button
                        type="button"
                        onClick={() => handleSpeak(m.id, m.text)}
                        className={`px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1 transition-all cursor-pointer ${
                          isSpeakingThis
                            ? 'bg-amber-100 text-amber-900 border border-amber-300 animate-pulse'
                            : 'bg-slate-100 hover:bg-emerald-100 text-slate-600 hover:text-emerald-800'
                        }`}
                        title={isSpeakingThis ? 'Dừng đọc' : 'Nghe Bác Cú đọc'}
                      >
                        {isSpeakingThis ? (
                          <>
                            <VolumeX className="w-3.5 h-3.5 text-amber-700" />
                            <span>Dừng đọc</span>
                          </>
                        ) : (
                          <>
                            <Volume2 className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Nghe đọc</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div className="flex gap-3 items-center">
              <OwlAvatar size="sm" mood="thinking" />
              <div className="bg-white border border-emerald-200 rounded-2xl px-4 py-3 text-xs text-emerald-800 flex items-center gap-2 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce [animation-delay:0ms]" />
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce [animation-delay:150ms]" />
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce [animation-delay:300ms]" />
                <span className="font-bold">Bác Cú đang suy ngẫm câu trả lời cho em...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Prompts */}
        <div className="p-2.5 bg-emerald-50/80 border-t border-emerald-100 flex gap-1.5 overflow-x-auto scrollbar-none shrink-0">
          {quickPrompts.map((qp, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSend(qp)}
              disabled={isLoading}
              className="px-3 py-1.5 rounded-full bg-white hover:bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-bold whitespace-nowrap shadow-2xs hover:scale-105 active:scale-95 transition-all cursor-pointer disabled:opacity-50"
            >
              {qp}
            </button>
          ))}
        </div>

        {/* Chat Input Field */}
        <div className="p-3 bg-white border-t border-slate-200 shrink-0">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Nhập câu hỏi hoặc câu văn muốn Bác Cú góp ý..."
              disabled={isLoading}
              className="flex-1 px-4 py-3 text-xs sm:text-sm bg-slate-50 border-2 border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 rounded-2xl outline-none font-medium transition-all"
            />
            <button
              type="button"
              onClick={() => handleSend()}
              disabled={isLoading || !input.trim()}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 disabled:opacity-50 text-white font-black text-xs sm:text-sm flex items-center gap-1.5 shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              <span>Gửi</span>
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
