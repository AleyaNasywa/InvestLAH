import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { burstEmoji, fireBigConfetti, triggerShake } from '../utils/fx';
import { TabId } from './Sidebar';

interface Tab6AssetsProps {
  sortedDone: boolean;
  onUnlockSort: () => void;
  onAwardBadge: (badge: string) => void;
  onNavigate: (tab: TabId) => void;
}

interface ClassifyAssetItem {
  id: string;
  shortName: string;
  fullName: string;
  emoji: string;
  category: 'kebal' | 'risky';
  subtitle: string;
  secretWhy: string;
  secretNote: string;
}

const CLASSIFY_ASSETS: ClassifyAssetItem[] = [
  {
    id: 'asb',
    shortName: 'ASB (Amanah',
    fullName: 'ASB (Amanah Saham Bumiputera)',
    emoji: '🏛️',
    category: 'kebal',
    subtitle:
      'Pulangan: ~5.0% - 5.5% setahun • Tahap Risiko: Zero Risiko Modal Susut',
    secretWhy:
      '💡 Kenapa? Harga tetap RM1.00 seunit! Takkan jatuh jadi RM0.80 walaupun ekonomi gawat.',
    secretNote: 'Sesuai park duit kecemasan & simpanan wajib.',
  },
  {
    id: 'th',
    shortName: 'Tabung Haji',
    fullName: 'Tabung Haji (TH)',
    emoji: '🕋',
    category: 'kebal',
    subtitle:
      'Pulangan: ~3.1% setahun (Siap Zakat) • Tahap Risiko: Dijamin Kerajaan',
    secretWhy:
      '💡 Kenapa? Simpanan dijamin kerajaan & 100% patuh Syariah. Duit pokok takkan lebur.',
    secretNote: 'Port paling selamat untuk kumpul modal haji & backup.',
  },
  {
    id: 'fd',
    shortName: 'Fixed Deposit',
    fullName: 'Fixed Deposit Islamik / Cash App',
    emoji: '🛡️',
    category: 'kebal',
    subtitle:
      'Pulangan: ~3.5% - 4.0% setahun • Tahap Risiko: Sangat Rendah (Dilindung PIDM)',
    secretWhy:
      '💡 Kenapa? Kadar keuntungan dah tetap awal-awal. Confirm dapat untung tanpa drama chart merah.',
    secretNote: 'Contoh: Versa Cash-i, KDI Save, FD Bank Islam.',
  },
  {
    id: 'etf',
    shortName: 'ETF (Exchange-Traded',
    fullName: 'ETF (Exchange-Traded Fund)',
    emoji: '🧺',
    category: 'risky',
    subtitle:
      'Pulangan: ~8% - 11% setahun (Purata) • Tahap Risiko: Sederhana - Tinggi (Turun Naik)',
    secretWhy:
      '💡 Kenapa? Beli sebakul saham syarikat gergasi. Harga naik turun ikut pasaran saham dunia.',
    secretNote: 'Contoh: Wahed FTSE USA Shariah ETF, MyETF.',
  },
  {
    id: 'saham',
    shortName: 'Saham Syarikat',
    fullName: 'Saham Syarikat (Individual Stocks)',
    emoji: '📈',
    category: 'risky',
    subtitle:
      'Pulangan: -30% hingga +50% setahun • Tahap Risiko: Tinggi (Bergantung Prestasi Syarikat)',
    secretWhy:
      '💡 Kenapa? Kalau bisnes untung besar saham meroket, kalau syarikat rugi harga saham boleh junam!',
    secretNote: 'Contoh: Saham Tenaga, Maybank, Apple, Nvidia.',
  },
  {
    id: 'kripto',
    shortName: 'Kripto /',
    fullName: 'Kripto / Digital Assets',
    emoji: '🚀',
    category: 'risky',
    subtitle:
      'Pulangan: -70% hingga +100% • Tahap Risiko: Ekstrem Tinggi (Rollercoaster Gila!)',
    secretWhy:
      '💡 Kenapa? Tiada jaminan modal. Hari ni boleh naik 30%, esok boleh crash 50% sekelip mata!',
    secretNote:
      'Hanya guna duit lebihan yang sanggup lebur (Luno Malaysia).',
  },
];

interface VibeQuestion {
  id: number;
  emoji: string;
  question: string;
  answer: 'fact' | 'cap';
  feedbackCorrect: string;
  feedbackIncorrect: string;
}

const VIBE_QUESTIONS: VibeQuestion[] = [
  {
    id: 1,
    emoji: '🟡',
    question: 'ASB harga unit tetap RM1. Kebal tu bro.',
    answer: 'fact',
    feedbackCorrect: 'Stonks brain 📈. Betul, takkan jatuh.',
    feedbackIncorrect: 'Salah bro 📉. ASB tu fix RM1 lah.',
  },
  {
    id: 2,
    emoji: '🧪',
    question:
      'Diversify tu maksudnya bancuh aset selamat dengan aset berisiko.',
    answer: 'fact',
    feedbackCorrect: 'Stonks brain 📈. Pandai balance!',
    feedbackIncorrect:
      'Salah bro 📉. Yes! Jangan letak semua telur dalam satu bakul.',
  },
  {
    id: 3,
    emoji: '🪙',
    question: 'Kripto tu aset kebal, tak boleh jatuh.',
    answer: 'cap',
    feedbackCorrect: 'Stonks brain 📈. Kripto tu rollercoaster gila.',
    feedbackIncorrect:
      'Terciduk bro 🚩. Kripto boleh drop 50% dalam seminggu. Rollercoaster level max.',
  },
];

const KEBAL_BULLETS = [
  '📉 Risiko: rendah gila',
  '💰 Return: ~2-5% setahun',
  '😌 Vibe: tidur lena',
  '🏦 Contoh: FD-i, ASB, Tabung Haji',
];

const ROLLER_BULLETS = [
  '📈 Risiko: tinggi',
  '💸 Return: tak tentu (-50% sampai +100%)',
  '🫀 Vibe: jantung kena kental',
  '📱 Contoh: Saham, Kripto, ETF saham',
];

export const Tab6Assets: React.FC<Tab6AssetsProps> = ({
  sortedDone,
  onUnlockSort,
  onAwardBadge,
  onNavigate,
}) => {
  const [subtab, setSubtab] = useState<'bancuh' | 'vibe'>('bancuh');

  const [selectedAssetId, setSelectedAssetId] = useState<string>('th');
  const [classifiedMap, setClassifiedMap] = useState<
    Record<string, 'kebal' | 'risky'>
  >(() =>
    sortedDone
      ? Object.fromEntries(CLASSIFY_ASSETS.map((a) => [a.id, a.category]))
      : { th: 'kebal' }
  );
  const [feedbackMap, setFeedbackMap] = useState<
    Record<string, { ok: boolean; message: string }>
  >(() => ({
    th: {
      ok: true,
      message: '✅ Ngam! Tabung Haji (TH) memang Aset Kebal 🛡️!',
    },
  }));

  const activeAsset =
    CLASSIFY_ASSETS.find((a) => a.id === selectedAssetId) ||
    CLASSIFY_ASSETS[0];
  const classifiedCount = Object.keys(classifiedMap).length;
  const activeFeedback = feedbackMap[activeAsset.id] || null;

  const handleGuessCategory = (
    asset: ClassifyAssetItem,
    guess: 'kebal' | 'risky',
    e: React.MouseEvent
  ) => {
    const isCorrect = guess === asset.category;
    if (isCorrect) {
      const nextMap = { ...classifiedMap, [asset.id]: asset.category };
      setClassifiedMap(nextMap);
      setFeedbackMap({
        ...feedbackMap,
        [asset.id]: {
          ok: true,
          message:
            asset.category === 'kebal'
              ? `✅ Ngam! ${asset.fullName} memang Aset Kebal 🛡️!`
              : `✅ Ngam! ${asset.fullName} memang Aset Rollercoaster 🎢!`,
        },
      });
      burstEmoji(
        e.clientX,
        e.clientY,
        asset.category === 'kebal' ? '🛡️' : '🎢',
        5
      );
      if (Object.keys(nextMap).length === CLASSIFY_ASSETS.length) {
        onUnlockSort();
        fireBigConfetti();
      }
    } else {
      triggerShake();
      setFeedbackMap({
        ...feedbackMap,
        [asset.id]: {
          ok: false,
          message: `❌ Terciduk! Cuba tengok balik ciri-ciri ${asset.fullName} kat atas bro.`,
        },
      });
    }
  };

  // Subtab 2: Vibe Check Quiz State (CRUCIAL: Starts with "Ready Nak Test Otak? 🧠" + "Let's Go! 🔥")
  const [quizStarted, setQuizStarted] = useState<boolean>(false);
  const [qIndex, setQIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [quizFeedback, setQuizFeedback] = useState<{
    type: 'correct' | 'wrong';
    text: string;
  } | null>(null);
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);

  const currentQ = VIBE_QUESTIONS[qIndex];
  const progressPercent = quizCompleted
    ? 100
    : ((qIndex + (quizFeedback ? 1 : 0)) / VIBE_QUESTIONS.length) * 100;

  const handleQuizAnswer = (
    choice: 'cap' | 'fact',
    e: React.MouseEvent
  ) => {
    if (quizFeedback) return;
    const isCorrect = choice === currentQ.answer;
    const nextScore = isCorrect ? score + 1 : score;
    if (isCorrect) {
      setScore(nextScore);
      burstEmoji(e.clientX, e.clientY, '📈', 6);
    } else {
      triggerShake();
    }

    setQuizFeedback({
      type: isCorrect ? 'correct' : 'wrong',
      text: isCorrect
        ? currentQ.feedbackCorrect
        : currentQ.feedbackIncorrect,
    });

    setTimeout(() => {
      setQuizFeedback(null);
      if (qIndex + 1 < VIBE_QUESTIONS.length) {
        setQIndex(qIndex + 1);
      } else {
        setQuizCompleted(true);
        onAwardBadge('Asset Master');
        fireBigConfetti();
      }
    }, 1600);
  };

  const handleRestartQuiz = () => {
    setQIndex(0);
    setScore(0);
    setQuizFeedback(null);
    setQuizCompleted(false);
    setQuizStarted(true);
  };

  return (
    <section className="max-w-5xl mx-auto flex flex-col gap-5 pb-10">
      {/* Top Navigation & Headers */}
      <div className="flex flex-col items-center gap-2.5 pt-1 text-center">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-[#FDE047] border-[3px] border-black rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] font-black text-xs text-black uppercase">
          🗺️ Port Duit Pergi
        </span>

        <h1 className="text-xl sm:text-3xl font-black text-black tracking-tight">
          Aset Kebal vs{' '}
          <span className="inline-block bg-[#10D989] px-3 py-0.5 border-[3px] border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -rotate-1">
            Rollercoaster
          </span>
        </h1>

        {/* Subtab Navigation */}
        <div className="inline-flex p-1.5 bg-white border-[3px] border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] gap-1.5">
          <button
            type="button"
            onClick={() => setSubtab('bancuh')}
            className={`px-4 py-2 rounded-lg font-black text-xs sm:text-sm transition-colors cursor-pointer ${
              subtab === 'bancuh'
                ? 'bg-[#3B82F6] text-white border-[2px] border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                : 'bg-transparent text-black border-[2px] border-transparent hover:bg-[#F3F4F6]'
            }`}
          >
            Bancuh Portfolio 🧪
          </button>

          <button
            type="button"
            onClick={() => setSubtab('vibe')}
            className={`px-4 py-2 rounded-lg font-black text-xs sm:text-sm transition-colors cursor-pointer ${
              subtab === 'vibe'
                ? 'bg-[#10D989] text-black border-[2px] border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                : 'bg-transparent text-black border-[2px] border-transparent hover:bg-[#F3F4F6]'
            }`}
          >
            Asset Vibe Check Quiz 🧠
          </button>
        </div>
      </div>

      {/* SUBTAB 1: BANCUH PORTFOLIO (SOLID ELECTRIC BLUE vs SOLID CYBER RED + KLIK & UJI) */}
      {subtab === 'bancuh' && (
        <motion.div
          key="subtab-bancuh"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-5"
        >
          {/* Side-by-Side Comparison Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Left Card: Solid Electric Blue (#3B82F6) */}
            <div className="bg-[#3B82F6] text-white border-[3px] border-black rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-5 flex flex-col gap-3">
              <div>
                <h3 className="text-lg sm:text-xl font-black text-white">
                  🛡️ Aset Kebal (Risk-Free)
                </h3>
                <p className="text-xs sm:text-sm font-bold text-white/90 mt-0.5">
                  Duit steady. Return kecil, tapi confirm-ish.
                </p>
              </div>

              <div className="flex flex-col gap-2">
                {KEBAL_BULLETS.map((item, i) => (
                  <div
                    key={i}
                    className="bg-white text-black border-[2px] border-black rounded-xl px-3.5 py-2 font-black text-xs sm:text-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Right Card: Solid Cyber Red (#FF4766) */}
            <div className="bg-[#FF4766] text-white border-[3px] border-black rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-5 flex flex-col gap-3">
              <div>
                <h3 className="text-lg sm:text-xl font-black text-white">
                  🎢 Aset Rollercoaster (Risky)
                </h3>
                <p className="text-xs sm:text-sm font-bold text-white/90 mt-0.5">
                  Harga naik turun. Boleh stonks, boleh lebur.
                </p>
              </div>

              <div className="flex flex-col gap-2">
                {ROLLER_BULLETS.map((item, i) => (
                  <div
                    key={i}
                    className="bg-white text-black border-[2px] border-black rounded-xl px-3.5 py-2 font-black text-xs sm:text-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Interactive Klik & Uji Classifier with Bold Colors */}
          <div className="bg-white border-[3px] border-black rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-5 flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b-[2px] border-black pb-3">
              <div>
                <h3 className="text-base sm:text-lg font-black text-black flex items-center gap-2">
                  <span>🔍</span>
                  <span>Klik &amp; Uji: Aset Ni Kebal Ke Rollercoaster?</span>
                </h3>
                <p className="text-xs font-bold text-neutral-600 mt-0.5">
                  Klik mana-mana aset kat bawah untuk baca rahsia dia &amp; teka
                  kategori dia!
                </p>
              </div>

              <span className="self-start sm:self-center px-3 py-1 bg-[#10D989] border-[2px] border-black rounded-lg font-black text-xs text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] whitespace-nowrap">
                Klasifikasi: {classifiedCount}/{CLASSIFY_ASSETS.length} Aset ✅
              </span>
            </div>

            {/* 6 Selectable Asset Cards Row */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {CLASSIFY_ASSETS.map((asset) => {
                const isSelected = selectedAssetId === asset.id;
                const classifiedCat = classifiedMap[asset.id];

                let cardBg = 'bg-[#F3F4F6] hover:bg-neutral-200 text-black';
                if (isSelected) {
                  cardBg = 'bg-[#FDE047] text-black';
                } else if (classifiedCat) {
                  cardBg = 'bg-[#10D989] text-black';
                }

                return (
                  <button
                    key={asset.id}
                    type="button"
                    onClick={() => setSelectedAssetId(asset.id)}
                    className={`${cardBg} border-[3px] border-black rounded-xl p-3 min-h-[104px] flex flex-col items-center justify-center text-center gap-1 transition-all cursor-pointer ${
                      isSelected
                        ? 'shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -translate-y-0.5'
                        : 'shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                    }`}
                  >
                    <span className="text-2xl sm:text-3xl">{asset.emoji}</span>
                    <span className="font-black text-xs leading-tight">
                      {asset.shortName}
                    </span>

                    {classifiedCat && (
                      <span className="mt-1 px-2 py-0.5 bg-white text-black border-[2px] border-black rounded-md font-black text-[10px] flex items-center gap-1">
                        {classifiedCat === 'kebal' ? '🛡️ Kebal' : '🎢 Risky'}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Active Selected Asset Detail & Classification Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeAsset.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.15 }}
                className="bg-[#F3F4F6] border-[3px] border-black rounded-xl p-4 flex flex-col gap-3"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                  <div className="flex items-start sm:items-center gap-3">
                    <div className="w-12 h-12 shrink-0 bg-white border-[2px] border-black rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center text-2xl">
                      {activeAsset.emoji}
                    </div>
                    <div>
                      <h4 className="text-base sm:text-lg font-black text-black leading-tight">
                        {activeAsset.fullName}
                      </h4>
                      <p className="text-xs font-bold text-neutral-700 mt-0.5">
                        {activeAsset.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
                    <button
                      type="button"
                      onClick={(e) =>
                        handleGuessCategory(activeAsset, 'kebal', e)
                      }
                      className="neo-btn px-3.5 py-2 bg-[#3B82F6] text-white rounded-xl font-black text-xs cursor-pointer"
                    >
                      🛡️ Ini Aset Kebal!
                    </button>

                    <button
                      type="button"
                      onClick={(e) =>
                        handleGuessCategory(activeAsset, 'risky', e)
                      }
                      className="neo-btn px-3.5 py-2 bg-[#FF4766] text-white rounded-xl font-black text-xs cursor-pointer"
                    >
                      🎢 Ini Rollercoaster!
                    </button>
                  </div>
                </div>

                <div className="bg-white border-[2px] border-black rounded-xl p-3 flex flex-col gap-0.5">
                  <div className="font-black text-xs sm:text-sm text-black">
                    {activeAsset.secretWhy}
                  </div>
                  <div className="text-xs font-bold text-neutral-600">
                    {activeAsset.secretNote}
                  </div>
                </div>

                {activeFeedback && (
                  <div
                    className={`border-[2px] border-black rounded-xl px-3.5 py-2 font-black text-xs sm:text-sm ${
                      activeFeedback.ok
                        ? 'bg-[#10D989] text-black'
                        : 'bg-[#FF4766] text-white'
                    }`}
                  >
                    {activeFeedback.message}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-center pt-1">
            <button
              type="button"
              onClick={() => setSubtab('vibe')}
              className="neo-btn px-7 py-3 bg-[#10D989] rounded-xl font-black text-sm sm:text-base text-black cursor-pointer"
            >
              Next: Asset Vibe Check Quiz 🧠
            </button>
          </div>
        </motion.div>
      )}

      {/* SUBTAB 2: ASSET VIBE CHECK QUIZ (START STATE -> QUIZ -> BADGE) */}
      {subtab === 'vibe' && (
        <motion.div
          key="subtab-vibe"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto w-full flex flex-col gap-4"
        >
          {!quizStarted ? (
            <div className="bg-white border-[3px] border-black rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-7 sm:p-8 text-center flex flex-col items-center gap-3.5">
              <div className="w-16 h-16 bg-[#FDE047] border-[3px] border-black rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center text-4xl animate-bob">
                🧠
              </div>
              <span className="px-3 py-0.5 bg-[#3B82F6] text-white border-[2px] border-black rounded-md font-black text-xs uppercase tracking-wider">
                ASSET VIBE CHECK • 3 SOALAN
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-black">
                Ready Nak Test Otak? 🧠
              </h3>
              <p className="text-xs sm:text-sm font-bold text-neutral-700 max-w-md">
                Teka sama ada statement pasal ASB, Kripto &amp; Diversification
                ni <b>Fact 📠</b> atau <b>Cap 🧢</b>!
              </p>
              <button
                type="button"
                onClick={() => setQuizStarted(true)}
                className="neo-btn mt-1 px-8 py-3.5 bg-[#10D989] rounded-xl font-black text-base sm:text-lg text-black cursor-pointer"
              >
                Let&apos;s Go! 🔥
              </button>
            </div>
          ) : !quizCompleted ? (
            <>
              <div className="w-full h-5 bg-white border-[3px] border-black rounded-full shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ type: 'spring', stiffness: 260, damping: 24 }}
                  className="h-full bg-[#10D989] border-r-[3px] border-black"
                />
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={`${currentQ.id}-${quizFeedback?.type || 'idle'}`}
                  initial={{ opacity: 0, x: 25 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -25 }}
                  transition={{ duration: 0.2 }}
                  className={`min-h-[210px] border-[3px] border-black rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6 flex flex-col items-center justify-center text-center gap-3 transition-colors ${
                    quizFeedback?.type === 'correct'
                      ? 'bg-[#10D989] text-black'
                      : quizFeedback?.type === 'wrong'
                      ? 'bg-[#FF4766] text-white'
                      : 'bg-white text-black'
                  }`}
                >
                  <span className="px-3 py-0.5 bg-[#FDE047] text-black border-[2px] border-black rounded-md font-black text-xs">
                    Soalan {qIndex + 1}/{VIBE_QUESTIONS.length}
                  </span>

                  <div className="text-4xl sm:text-5xl select-none">
                    {quizFeedback?.type === 'correct'
                      ? '📈'
                      : quizFeedback?.type === 'wrong'
                      ? '📉'
                      : currentQ.emoji}
                  </div>

                  {quizFeedback ? (
                    <div className="text-lg sm:text-xl font-black leading-tight max-w-md">
                      {quizFeedback.text}
                    </div>
                  ) : (
                    <p className="text-lg sm:text-xl font-black leading-tight max-w-md">
                      &ldquo;{currentQ.question}&rdquo;
                    </p>
                  )}
                </motion.div>
              </AnimatePresence>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <button
                  type="button"
                  disabled={Boolean(quizFeedback)}
                  onClick={(e) => handleQuizAnswer('cap', e)}
                  className="neo-btn py-3.5 px-5 bg-white hover:bg-[#FF4766] hover:text-white text-black rounded-xl font-black text-base sm:text-lg cursor-pointer disabled:opacity-50"
                >
                  Cap 🧢 (Mitos)
                </button>

                <button
                  type="button"
                  disabled={Boolean(quizFeedback)}
                  onClick={(e) => handleQuizAnswer('fact', e)}
                  className="neo-btn py-3.5 px-5 bg-white hover:bg-[#10D989] text-black rounded-xl font-black text-base sm:text-lg cursor-pointer disabled:opacity-50"
                >
                  Fact 📠 (Legit)
                </button>
              </div>
            </>
          ) : (
            <div className="bg-white border-[3px] border-black rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-7 text-center flex flex-col items-center gap-3.5">
              <div className="w-32 h-32 rounded-full bg-[#FDE047] border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col items-center justify-center relative mb-2">
                <span className="text-5xl animate-bob">🛡️</span>
                <span className="absolute -bottom-3 px-3 py-0.5 bg-[#3B82F6] text-white border-[2px] border-black rounded-full font-black text-xs whitespace-nowrap">
                  Asset Master 🛡️
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-black mt-1">
                GGWP! Lencana Ter-loot 🎉
              </h3>

              <p className="text-xs sm:text-sm font-bold text-neutral-700 max-w-md">
                Kau dah boleh beza kebal vs rollercoaster. Mantap!
              </p>

              <div className="px-4 py-1 bg-[#10D989] border-[2px] border-black rounded-lg font-black text-sm text-black">
                {score}/{VIBE_QUESTIONS.length} betul 👍
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 mt-1">
                <button
                  type="button"
                  onClick={handleRestartQuiz}
                  className="neo-btn px-5 py-2.5 bg-white hover:bg-[#FDE047] rounded-xl font-black text-xs sm:text-sm text-black cursor-pointer"
                >
                  Main Lagi 🔄
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate('t7')}
                  className="neo-btn px-6 py-2.5 bg-[#10D989] rounded-xl font-black text-xs sm:text-sm text-black cursor-pointer"
                >
                  Next: Kamus Pelabur (Tab 7) 📖
                </button>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </section>
  );
};
