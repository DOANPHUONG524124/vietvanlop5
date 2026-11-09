import React, { useState, useMemo } from 'react';
import { VOCABULARY_TOPICS, VocabTopic, VocabWord } from '../utils/vocabularyBank.ts';
import { speakVietnamese } from '../utils/audio.ts';
import { Sparkles, BookOpen, Volume2, Plus, X, Search, Check, Lightbulb } from 'lucide-react';

interface VocabularyModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTopic: string;
  onInsertWord: (text: string) => void;
}

export const VocabularyModal: React.FC<VocabularyModalProps> = ({
  isOpen,
  onClose,
  currentTopic,
  onInsertWord,
}) => {
  // Auto-detect topic match based on currentTopic keywords
  const matchedTopicId = useMemo(() => {
    const lower = currentTopic.toLowerCase();
    for (const top of VOCABULARY_TOPICS) {
      if (top.suggestedKeywords.some((kw) => lower.includes(kw))) {
        return top.id;
      }
    }
    return VOCABULARY_TOPICS[0].id;
  }, [currentTopic]);

  const [selectedTopicId, setSelectedTopicId] = useState<string>(matchedTopicId);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [speakingWord, setSpeakingWord] = useState<string | null>(null);
  const [copiedWord, setCopiedWord] = useState<string | null>(null);

  if (!isOpen) return null;

  const currentCategoryTopic =
    VOCABULARY_TOPICS.find((t) => t.id === selectedTopicId) || VOCABULARY_TOPICS[0];

  // Filter words
  const filteredWords = currentCategoryTopic.words.filter((w) => {
    const matchSearch =
      w.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.meaning.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.example.toLowerCase().includes(searchQuery.toLowerCase());

    const matchCat = filterCategory === 'all' || w.category === filterCategory;
    return matchSearch && matchCat;
  });

  const handleSpeak = (w: VocabWord) => {
    setSpeakingWord(w.text);
    const speechText = `${w.text}. Ví dụ: ${w.example}`;
    speakVietnamese(speechText, () => setSpeakingWord(null));
  };

  const handleInsert = (w: VocabWord) => {
    onInsertWord(w.text);
    setCopiedWord(w.text);
    setTimeout(() => setCopiedWord(null), 1500);
  };

  const categoryBadges: Record<string, { bg: string; text: string }> = {
    tu_lay: { bg: 'bg-emerald-100 border-emerald-300 text-emerald-800', text: 'Từ Láy Gợi Cảm' },
    so_sanh: { bg: 'bg-amber-100 border-amber-300 text-amber-900', text: 'Hình Ảnh So Sánh' },
    nhan_hoa: { bg: 'bg-rose-100 border-rose-300 text-rose-900', text: 'Nghệ Thuật Nhân Hóa' },
    cau_ghep: { bg: 'bg-purple-100 border-purple-300 text-purple-900', text: 'Cặp Từ Hô Ứng' },
    ket_bai: { bg: 'bg-sky-100 border-sky-300 text-sky-900', text: 'Kết Bài Cảm Xúc' },
    mo_bai: { bg: 'bg-teal-100 border-teal-300 text-teal-900', text: 'Mở Bài Gián Tiếp' },
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-4xl w-full shadow-2xl border-4 border-emerald-300 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 p-5 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/20 rounded-2xl text-2xl shadow-inner">
              🎒
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black text-white">
                  Túi Bối Bối Từ Vựng Văn Lớp 5
                </h2>
                <span className="text-[10px] bg-amber-400 text-amber-950 font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Chương trình GDPT
                </span>
              </div>
              <p className="text-emerald-100 text-xs mt-0.5">
                Kho từ láy, hình ảnh so sánh & câu văn hay giúp bé viết văn bay bổng, sinh động!
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            title="Đóng túi từ vựng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Topic Selector Tabs */}
        <div className="p-3 bg-emerald-50/60 border-b border-emerald-100 flex gap-2 overflow-x-auto scrollbar-none shrink-0">
          {VOCABULARY_TOPICS.map((topic) => {
            const isSelected = selectedTopicId === topic.id;
            return (
              <button
                key={topic.id}
                onClick={() => {
                  setSelectedTopicId(topic.id);
                  setSearchQuery('');
                  setFilterCategory('all');
                }}
                className={`px-3.5 py-2 rounded-2xl text-xs font-bold whitespace-nowrap flex items-center gap-2 transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-600 text-white shadow-md scale-105'
                    : 'bg-white text-slate-700 hover:bg-emerald-100 border border-emerald-200'
                }`}
              >
                <span>{topic.icon}</span>
                <span>{topic.title.split('(')[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Search & Filter Bar */}
        <div className="p-3 bg-white border-b border-slate-100 flex flex-col sm:flex-row gap-2 shrink-0">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm từ láy, câu ví dụ, ý nghĩa..."
              className="w-full pl-9 pr-3 py-2 text-xs font-medium rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="flex gap-1.5 overflow-x-auto text-xs">
            {[
              { id: 'all', label: 'Tất cả' },
              { id: 'tu_lay', label: 'Từ láy' },
              { id: 'so_sanh', label: 'So sánh' },
              { id: 'nhan_hoa', label: 'Nhân hóa' },
              { id: 'cau_ghep', label: 'Câu ghép' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setFilterCategory(f.id)}
                className={`px-2.5 py-1.5 rounded-xl font-bold cursor-pointer transition-colors ${
                  filterCategory === f.id
                    ? 'bg-emerald-700 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Words Grid Container */}
        <div className="p-4 overflow-y-auto space-y-3 flex-1 bg-slate-50/50">
          <div className="flex items-center justify-between text-xs text-slate-600 mb-1">
            <span className="font-bold flex items-center gap-1">
              <Lightbulb className="w-4 h-4 text-amber-500" />
              <span>Gợi ý cho chủ đề: <b>{currentCategoryTopic.title}</b></span>
            </span>
            <span>{filteredWords.length} từ ngữ & câu mẫu</span>
          </div>

          {filteredWords.length === 0 ? (
            <div className="p-8 text-center text-slate-400 text-xs">
              Không tìm thấy từ ngữ phù hợp với từ khóa này. Em hãy thử tìm từ khóa khác nhé!
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {filteredWords.map((word, idx) => {
                const badge = categoryBadges[word.category] || {
                  bg: 'bg-slate-100 text-slate-700 border-slate-200',
                  text: word.categoryLabel,
                };
                const isSpeakingThis = speakingWord === word.text;
                const isCopied = copiedWord === word.text;

                return (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-white border border-emerald-100 hover:border-emerald-300 hover:shadow-md transition-all flex flex-col justify-between gap-2.5"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-base font-black text-emerald-950">
                          {word.text}
                        </span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${badge.bg}`}
                        >
                          {badge.text}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 mt-1">
                        <strong>Ý nghĩa:</strong> {word.meaning}
                      </p>
                      <div className="mt-1.5 p-2 rounded-xl bg-amber-50/60 border border-amber-200/80 text-xs text-slate-700 italic">
                        <span className="text-amber-700 font-bold not-italic">Ví dụ: </span>
                        "{word.example}"
                      </div>
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-1 border-t border-slate-100">
                      {/* Speak button with natural Vietnamese voice */}
                      <button
                        type="button"
                        onClick={() => handleSpeak(word)}
                        className={`px-2.5 py-1 rounded-xl text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer ${
                          isSpeakingThis
                            ? 'bg-amber-200 text-amber-900 animate-pulse'
                            : 'bg-slate-100 hover:bg-amber-100 text-slate-700'
                        }`}
                        title="Nghe Cú Mèo đọc từ này"
                      >
                        <Volume2 className="w-3.5 h-3.5 text-amber-700" />
                        <span>{isSpeakingThis ? 'Đang đọc...' : 'Nghe đọc'}</span>
                      </button>

                      {/* Insert word into essay button */}
                      <button
                        type="button"
                        onClick={() => handleInsert(word)}
                        className={`px-3 py-1 rounded-xl text-xs font-black flex items-center gap-1 transition-all cursor-pointer ${
                          isCopied
                            ? 'bg-emerald-600 text-white'
                            : 'bg-emerald-100 hover:bg-emerald-200 text-emerald-900'
                        }`}
                        title="Chèn ngay từ này vào bài văn của em"
                      >
                        {isCopied ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Đã chèn!</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5" />
                            <span>Chèn vào bài</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-emerald-50/80 border-t border-emerald-100 text-center text-xs text-emerald-800 font-semibold flex items-center justify-between">
          <span>🦉 Mẹo từ Cú Mèo: Dùng từ 2-3 từ láy và 1 hình ảnh so sánh để bài văn đạt điểm cao nhé!</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold cursor-pointer"
          >
            Đã Xong
          </button>
        </div>
      </div>
    </div>
  );
};
