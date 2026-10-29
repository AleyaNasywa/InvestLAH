import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  burstEmoji,
  playCheerAndClap,
  triggerShake,
  fireMassiveBossConfetti,
} from '../utils/fx';
import { TabId } from './Sidebar';

export interface BadgeSlot {
  id: TabId;
  badgeKey: string;
  emoji: string;
  label: string;
  moduleTitle: string;
}

export const EIGHT_MODULE_BADGES: BadgeSlot[] = [
  {
    id: 't1',
    badgeKey: 'Boba Survivor',
    emoji: '🧋',
    label: 'Boba Survivor',
    moduleTitle: 'Tab 1: Baru Nak Up',
  },
  {
    id: 't2',
    badgeKey: 'Risk Checked',
    emoji: '🎲',
    label: 'Risk Checked',
    moduleTitle: 'Tab 2: Vibe Check Risiko',
  },
  {
    id: 't3',
    badgeKey: 'Budget Boss',
    emoji: '💸',
    label: 'Budget Boss',
    moduleTitle: 'Tab 3: Pokai Tapi Bajet',
  },
  {
    id: 't4',
    badgeKey: 'Goal Getter',
    emoji: '🎯',
    label: 'Goal Getter',
    moduleTitle: 'Tab 4: Mission Get Rich',
  },
  {
    id: 't5',
    badgeKey: 'Time Traveler',
    emoji: '🕹️',
    label: 'Time Traveler',
    moduleTitle: 'Tab 5: Simulator Arcade',
  },
  {
    id: 't6',
    badgeKey: 'Asset Master',
    emoji: '🛡️',
    label: 'Asset Master',
    moduleTitle: 'Tab 6: Port Duit Pergi',
  },
  {
    id: 't7',
    badgeKey: 'Lingo Master',
    emoji: '☕',
    label: 'Lingo Master',
    moduleTitle: 'Tab 7: Kamus Pelabur',
  },
  {
    id: 't8',
    badgeKey: 'Halal Hunter',
    emoji: '🕌',
    label: 'Halal Hunter',
    moduleTitle: 'Tab 8: Halal Or Nah?',
  },
];

interface BossQuestion {
  id: number;
  tag: string;
  emoji: string;
  question: string;
  options: [string, string, string, string];
  correctIndex: number;
  explanation: string;
}

const BOSS_QUESTIONS: BossQuestion[] = [
  {
    id: 1,
    tag: 'INFLASI & KUASA BELI',
    emoji: '🧋',
    question:
      'Kau simpan RM5,000 bawah bantal selama 10 tahun. Apa jadi kat kuasa beli duit tu bila inflasi 3% setahun?',
    options: [
      'Duit makin banyak sebab peram lama',
      'Nombor kekal RM5,000 tapi barang boleh beli makin sikit (susut nilai)',
      'Bank Negara auto gandakan jadi RM10,000',
      'Takde kesan langsung sebab duit fizikal kebal',
    ],
    correctIndex: 1,
    explanation:
      'Simpan bawah bantal 0% return wei! Walaupun kertas kekal RM5,000, harga barang naik buat kuasa beli kau lesap macam cawan boba.',
  },
  {
    id: 2,
    tag: 'SCAM ALERT TIKTOK / TELEGRAM',
    emoji: '🚩',
    question:
      'Ada "Sifu Kripto" kat TikTok DM kau: "Labur RM300 hari ni, esok confirm cair RM3,000 tanpa risiko!" Apa move paling bijak?',
    options: [
      'Pinjam duit member untuk labur RM1,000 terus',
      'Test masukkan RM100 dulu tengok legit ke tak',
      'Auto block & report! Return tinggi tanpa risiko = 100% Scam (Gharar)',
      'Share link tu kat group WhatsApp kelas',
    ],
    correctIndex: 2,
    explanation:
      'Dalam dunia pelaburan sebenar, TIADA istilah untung besar sekelip mata tanpa risiko. Janji manis macam ni confirm scammer!',
  },
  {
    id: 3,
    tag: 'PENGURUSAN PTPTN & CASHFLOW',
    emoji: '💸',
    question:
      'Duit PTPTN baru masuk RM3,500 satu sem. Yuran kolej RM1,200. Ikut cara student bijak, apa kena buat dulu?',
    options: [
      'Checkout Shopee & belanja member makan besar dulu',
      'Tolak siap-siap yuran RM1,200, pastu bahagi baki RM2,300 ikut minggu semester',
      'All-in semua RM3,500 dalam saham goreng',
      'Simpan semua tak payah bayar yuran lagi',
    ],
    correctIndex: 1,
    explanation:
      'Tolak komitmen wajib (yuran) dulu, baru bahagi ikut minggu semester supaya kau tahu bajet bulanan sebenar & tak pokai hujung sem!',
  },
  {
    id: 4,
    tag: 'RULE 50/30/20 & HEALING',
    emoji: '☕',
    question:
      'Ikut Rule 50/30/20, kalau duit belanja bulanan kau RM1,000, berapa had maksimum untuk "Healing & Wants" (kopi, Netflix, shopping)?',
    options: [
      'RM800 (80% sebab muda hanya sekali)',
      'RM500 (50% separuh daripada bajet)',
      'RM300 (Maksimum 30% supaya tak terciduk)',
      'RM0 (Tak boleh healing langsung)',
    ],
    correctIndex: 2,
    explanation:
      'Rule 50/30/20: 50% Komitmen Wajib (Needs), maksimum 30% Healing (Wants), dan 20% Simpanan/Pelaburan. Lebih 30% nanti pokai bro!',
  },
  {
    id: 5,
    tag: 'COMPOUND MAGIC',
    emoji: '🚀',
    question:
      'Kenapa orang yang mula melabur RM100 sebulan sejak umur 20 tahun boleh kalahkan orang yang mula umur 30 tahun?',
    options: [
      'Sebab kuasa Compounding (untung atas untung) perlukan MASA untuk membesar gila-gila',
      'Sebab broker bagi diskaun khas untuk budak umur 20 tahun',
      'Sebab orang umur 30 tahun tak dibenarkan beli ETF',
      'Sebab cukai pelaburan lagi tinggi bila tua',
    ],
    correctIndex: 0,
    explanation:
      'Masa adalah senjata paling padu dalam compound growth! Lagi awal kau start, lagi banyak "free money" beranak atas untung tahun-tahun lepas.',
  },
  {
    id: 6,
    tag: 'ASET KEBAL VS ROLLERCOASTER',
    emoji: '🛡️',
    question:
      'Antara instrumen kat bawah ni, mana satu dikategorikan sebagai "Aset Kebal" (harga unit tetap & sesuai untuk Emergency Fund)?',
    options: [
      'Meme Coin & NFT',
      'ASB (Amanah Saham Bumiputera) & Tabung Haji',
      'Saham individu teknologi US',
      'Forex leverage tinggi',
    ],
    correctIndex: 1,
    explanation:
      'ASB & Tabung Haji adalah aset kebal sebab modal pokok tak menyusut ikut turun-naik chart harian. Ngam untuk park Emergency Fund!',
  },
  {
    id: 7,
    tag: 'KAMUS PELABUR (ETF)',
    emoji: '🧺',
    question:
      'Apa maksud sebenar bila kau beli satu unit ETF (Exchange-Traded Fund)?',
    options: [
      'Kau bagi pinjam duit kat scammer Telegram',
      'Kau beli satu bakul yang mengandungi banyak saham syarikat sekali gus',
      'Kau cuma beli satu syarikat tunggal je',
      'Kau kunci duit tak boleh keluar selama 20 tahun',
    ],
    correctIndex: 1,
    explanation:
      'ETF ibarat beli satu bakul penuh buah-buahan (banyak syarikat). Kalau satu syarikat goyang, syarikat lain dalam bakul tu tolong cover!',
  },
  {
    id: 8,
    tag: 'PRINSIP SYARIAH',
    emoji: '🌙',
    question:
      'Dalam pelaburan Islamik, "Maysir" adalah salah satu Red Flag besar yang wajib dielakkan. Apa maksud Maysir?',
    options: [
      'Untung daripada dividen perniagaan sebenar',
      'Jual beli saham patuh Syariah di Bursa Malaysia',
      'Unsur perjudian / tikam nasib buta-buta tanpa analisis & aset sebenar',
      'Simpanan dalam akaun Al-Awfar / Tabung Haji',
    ],
    correctIndex: 2,
    explanation:
      'Maysir = unsur judi / tikam nasib (contohnya binary option). Pelaburan Halal wajib ada aset sebenar & analisis jelas!',
  },
  {
    id: 9,
    tag: 'DETOX DIVIDEN',
    emoji: '💸',
    question:
      'Kalau kau dapat RM1,000 dividen dan 5% daripadanya perlu dibuat "penyucian dividen" (detox), berapa jumlah yang kena disalurkan ke Baitulmal/kebajikan?',
    options: ['RM500', 'RM50', 'RM5', 'RM950'],
    correctIndex: 1,
    explanation:
      '5% daripada RM1,000 ialah RM50! Baki RM950 (95%) adalah bersih & berkat untuk kau simpan atau belanja.',
  },
  {
    id: 10,
    tag: 'PSIKOLOGI PELABUR',
    emoji: '💎',
    question:
      'Bila pasaran saham tiba-tiba jatuh 15% sebab berita ekonomi global, apa tindakan pelabur long-term yang bijak?',
    options: [
      'Jual semua aset sambil menangis sebab takut lebur',
      'Marah broker dekat ruangan komen Facebook',
      'Kekal tenang, semak fundamental, dan teruskan DCA ikut bajet bulanan',
      'Pinjam Ah Long untuk balas dendam kat market',
    ],
    correctIndex: 2,
    explanation:
      'Pelabur bijak tak panik bila market koreksi! Selagi fundamental aset kukuh & kau guna duit lebihan, teruskan DCA dengan tenang.',
  },
];

interface Tab9BossQuizProps {
  earnedBadges: string[];
  visitedTabs: TabId[];
  riskVibeLabel: string;
  onAwardBadge: (badge: string) => void;
  onUnlockAllBadges: () => void;
  onNavigate: (tab: TabId) => void;
}

export const Tab9BossQuiz: React.FC<Tab9BossQuizProps> = ({
  earnedBadges,
  visitedTabs,
  riskVibeLabel,
  onAwardBadge,
  onUnlockAllBadges,
  onNavigate,
}) => {
  const [devUnlocked, setDevUnlocked] = useState<boolean>(true);
  const [stage, setStage] = useState<'gate' | 'quiz' | 'result'>('gate');
  const [qIdx, setQIdx] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<number, number>
  >({});
  const [showReview, setShowReview] = useState<boolean>(false);
  const [shareToast, setShareToast] = useState<string | null>(null);

  const unlockedBadgeKeys = EIGHT_MODULE_BADGES.filter(
    (slot) =>
      earnedBadges.includes(slot.badgeKey) || visitedTabs.includes(slot.id)
  ).map((s) => s.badgeKey);

  const earnedCount = devUnlocked ? 8 : unlockedBadgeKeys.length;
  const isUnlocked = devUnlocked || earnedCount >= 8;

  const currentQuestion = BOSS_QUESTIONS[qIdx];
  const currentPicked =
    selectedAnswers[qIdx] !== undefined ? selectedAnswers[qIdx] : null;
  const progressPct =
    ((qIdx + (currentPicked !== null ? 1 : 0)) / BOSS_QUESTIONS.length) * 100;

  const totalScore = BOSS_QUESTIONS.reduce((acc, q, idx) => {
    return acc + (selectedAnswers[idx] === q.correctIndex ? 1 : 0);
  }, 0);

  const handleSelectOption = (optIdx: number, e: React.MouseEvent) => {
    if (currentPicked !== null) return;
    const isCorrect = optIdx === currentQuestion.correctIndex;
    setSelectedAnswers((prev) => ({ ...prev, [qIdx]: optIdx }));

    if (isCorrect) {
      playCheerAndClap();
      burstEmoji(e.clientX, e.clientY, '✅', 6);
    } else {
      triggerShake();
    }
  };

  const handleNext = () => {
    if (qIdx + 1 < BOSS_QUESTIONS.length) {
      setQIdx((i) => i + 1);
    } else {
      setStage('result');
      onAwardBadge('InvestLAH Certified');
      fireMassiveBossConfetti();
    }
  };

  const handleRestartQuiz = () => {
    setSelectedAnswers({});
    setQIdx(0);
    setShowReview(false);
    setStage('quiz');
  };

  const handleShareResult = async () => {
    const rankTitle =
      totalScore <= 4
        ? 'Half-Past-Six Bro 💀'
        : totalScore <= 8
        ? 'Financial Guru Wannabe 🤔'
        : 'Senior Investor Boss 👑';
    const text = `🎓 Aku baru lepas Final Boss Quiz kat InvestLAH!\n🏆 Skor: ${totalScore}/10 (${rankTitle})\n⚡ Risk Vibe: ${riskVibeLabel}\nJom test street smarts kewangan kau!`;
    try {
      await navigator.clipboard.writeText(text);
      setShareToast('Result dah copy! Paste kat WhatsApp / IG Story kau 🔥');
    } catch {
      setShareToast('Skor kau dah sedia untuk dikongsi! 🔥');
    }
    setTimeout(() => setShareToast(null), 3000);
  };

  const rankingInfo =
    totalScore <= 4
      ? {
          title: 'Half-Past-Six Bro 💀',
          bg: 'bg-[#FFE4E6] text-black',
          sub: 'Masih senang kena gula-gula dengan scammer ni bro! Jangan risau, ulang balik modul 1–8 bagi padu.',
        }
      : totalScore <= 8
      ? {
          title: 'Financial Guru Wannabe 🤔',
          bg: 'bg-[#FEF08A] text-black',
          sub: 'Not bad wei! Asas kau dah kukuh, tinggal tajamkan lagi ilmu Syariah & compound growth.',
        }
      : {
          title: 'Senior Investor Boss 👑',
          bg: 'bg-[#C8F7E1] text-black',
          sub: 'Padu teruk! Street smarts kewangan kau memang level Boss. Scammer tengok kau pun auto lari!',
        };

  return (
    <section className="max-w-4xl mx-auto font-jakarta flex flex-col gap-5 pb-12">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-[#D1FAE5] via-[#E0F2FE] to-[#FCE7F3] border-[3px] border-black rounded-3xl shadow-[5px_5px_0px_#0F172A] p-5 sm:p-6 text-center flex flex-col items-center gap-2">
        <span className="px-4 py-1 bg-[#FEF08A] border-[3px] border-black rounded-full shadow-[3px_3px_0px_#0F172A] font-black text-xs sm:text-sm text-black">
          🎓 TAB 9: FINAL BOSS QUIZ
        </span>
        <h1 className="text-2xl sm:text-4xl font-black text-black tracking-tight">
          Graduate Dari InvestLAH? Boss Level Quiz! 🎓
        </h1>
        <p className="text-xs sm:text-sm font-bold text-slate-700 max-w-xl">
          Dah khatam semua modul? Jom test street smarts kau.
        </p>
      </div>

      {/* =================================================================== */}
      {/* STAGE 1: START STATE (8-BADGE PROGRESS GRID & PADLOCK GATE)         */}
      {/* =================================================================== */}
      {stage === 'gate' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border-[3px] border-black rounded-3xl shadow-[5px_5px_0px_#0F172A] p-5 sm:p-7 flex flex-col gap-5"
        >
          {/* Top Bar with Dev Simulate Toggle */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b-[2px] border-black/15 pb-3">
            <div className="flex items-center gap-2">
              <span className="font-black text-sm sm:text-base text-black">
                🏅 PROGRESS LENCANA MODUL ({earnedCount}/8)
              </span>
            </div>

            <button
              type="button"
              onClick={() => {
                const next = !devUnlocked;
                setDevUnlocked(next);
                if (next) onUnlockAllBadges();
              }}
              className={`px-3.5 py-1 border-[2px] border-black rounded-full font-black text-xs cursor-pointer shadow-[2px_2px_0px_#0F172A] ${
                devUnlocked
                  ? 'bg-[#C8F7E1] text-black'
                  : 'bg-[#FEF08A] text-black'
              }`}
            >
              {devUnlocked
                ? '🔓 Mode: Unlocked (Klik untuk Simulasi Lock 🔒)'
                : '🔒 Mode: Locked (Klik untuk Unlock Semua 🔓)'}
            </button>
          </div>

          {/* Grid of 8 Badge Icons representing Tabs 1-8 */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {EIGHT_MODULE_BADGES.map((slot) => {
              const hasIt =
                devUnlocked || unlockedBadgeKeys.includes(slot.badgeKey);
              return (
                <button
                  key={slot.id}
                  type="button"
                  onClick={() => onNavigate(slot.id)}
                  className={`p-3.5 border-[3px] border-black rounded-2xl text-center flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    hasIt
                      ? 'bg-[#C8F7E1] text-black shadow-[4px_4px_0px_#0F172A] hover:-translate-y-0.5'
                      : 'bg-[#F7F9F6] text-slate-500 border-dashed hover:bg-slate-100'
                  }`}
                >
                  <span className="text-3xl">
                    {hasIt ? slot.emoji : '🔒'}
                  </span>
                  <span className="font-black text-xs text-black leading-tight">
                    {slot.label}
                  </span>
                  <span className="text-[10px] font-bold text-slate-600">
                    {slot.moduleTitle}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Padlock Gate Box */}
          <div
            className={`border-[3px] border-black rounded-3xl shadow-[5px_5px_0px_#0F172A] p-6 text-center flex flex-col items-center gap-3 ${
              isUnlocked
                ? 'bg-gradient-to-br from-[#FEF08A] via-[#C8F7E1] to-[#BEE3FF]'
                : 'bg-[#F7F9F6]'
            }`}
          >
            <div className="w-20 h-20 bg-white border-[3px] border-black rounded-2xl shadow-[4px_4px_0px_#0F172A] flex items-center justify-center text-5xl animate-bob">
              {isUnlocked ? '🔓' : '🔒'}
            </div>

            {isUnlocked ? (
              <>
                <h2 className="text-lg sm:text-2xl font-black text-black">
                  Padlock Dah Pecah! Boss Arena Dibuka 🔓
                </h2>
                <p className="text-xs sm:text-sm font-bold text-slate-800 max-w-md">
                  10 soalan situasi sebenar (compound growth, TikTok scam,
                  PTPTN, Syariah &amp; ETF). Buktikan kau bukan lagi noob!
                </p>
                <button
                  type="button"
                  onClick={handleRestartQuiz}
                  className="neo-btn mt-1 px-8 py-3.5 bg-[#10D989] rounded-2xl font-black text-base sm:text-lg text-black cursor-pointer"
                >
                  Mulakan Final Boss Quiz 🎮
                </button>
              </>
            ) : (
              <>
                <h2 className="text-lg sm:text-2xl font-black text-black">
                  Arena Masih Berkunci Bro 🔒
                </h2>
                <p className="text-xs sm:text-sm font-bold text-slate-700 max-w-md">
                  Kau baru kumpul <b>{earnedCount}/8 lencana</b>. Selesaikan
                  modul yang belum khatam atau tekan butang unlock kat bawah!
                </p>
                <div className="flex flex-wrap justify-center gap-3 mt-1">
                  <button
                    type="button"
                    onClick={() => triggerShake()}
                    className="neo-btn px-6 py-3 bg-[#FF4766] text-white rounded-2xl font-black text-xs sm:text-sm cursor-pointer"
                  >
                    Kumpul 8 Lencana Dulu Bro 🛑
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setDevUnlocked(true);
                      onUnlockAllBadges();
                    }}
                    className="neo-btn px-6 py-3 bg-[#10D989] text-black rounded-2xl font-black text-xs sm:text-sm cursor-pointer"
                  >
                    Unlock Sekarang (Dev Simulate) 🔓
                  </button>
                </div>
              </>
            )}
          </div>
        </motion.div>
      )}

      {/* =================================================================== */}
      {/* STAGE 2: 10-QUESTION BOSS QUIZ INTERFACE                            */}
      {/* =================================================================== */}
      {stage === 'quiz' && (
        <motion.div
          key="boss-quiz"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-4"
        >
          {/* Thick Progress Bar */}
          <div className="bg-white border-[3px] border-black rounded-2xl shadow-[4px_4px_0px_#0F172A] p-3 flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs font-black uppercase">
              <span>
                🔥 SOALAN {qIdx + 1} / {BOSS_QUESTIONS.length}
              </span>
              <span className="px-2.5 py-0.5 bg-purple-200 border-[2px] border-black rounded-full">
                {currentQuestion.tag}
              </span>
            </div>
            <div className="w-full h-5 bg-[#F7F9F6] border-[3px] border-black rounded-full overflow-hidden">
              <div
                style={{ width: `${progressPct}%` }}
                className="h-full bg-[#10D989] border-r-[3px] border-black transition-all duration-300"
              />
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-white border-[3px] border-black rounded-3xl shadow-[5px_5px_0px_#0F172A] p-5 sm:p-7 flex flex-col gap-5">
            <div className="flex flex-col items-center text-center gap-2">
              <div className="w-14 h-14 bg-[#FEF08A] border-[3px] border-black rounded-2xl shadow-[3px_3px_0px_#0F172A] flex items-center justify-center text-3xl">
                {currentQuestion.emoji}
              </div>
              <h2 className="text-base sm:text-xl font-black text-black leading-snug max-w-2xl mt-1">
                {currentQuestion.question}
              </h2>
            </div>

            {/* 4 Multiple-Choice Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentQuestion.options.map((optText, idx) => {
                const isSelected = currentPicked === idx;
                const isCorrectOption = idx === currentQuestion.correctIndex;

                const softOptionBgs = [
                  'bg-blue-100 hover:bg-blue-200 text-black',
                  'bg-[#C8F7E1] hover:bg-emerald-200 text-black',
                  'bg-[#FEF08A] hover:bg-yellow-300 text-black',
                  'bg-pink-100 hover:bg-pink-200 text-black',
                ];
                let btnStyle = softOptionBgs[idx];
                let badgeIcon = 'ABCD'[idx];

                if (currentPicked !== null) {
                  if (isCorrectOption) {
                    btnStyle = 'bg-[#10D989] text-black';
                    badgeIcon = '✅';
                  } else if (isSelected && !isCorrectOption) {
                    btnStyle = 'bg-[#FF4766] text-white';
                    badgeIcon = '❌';
                  } else {
                    btnStyle = 'bg-white text-slate-400 opacity-65';
                  }
                }

                return (
                  <button
                    key={idx}
                    type="button"
                    disabled={currentPicked !== null}
                    onClick={(e) => handleSelectOption(idx, e)}
                    className={`neo-btn ${btnStyle} rounded-2xl p-3.5 flex items-start gap-3 text-left font-extrabold text-xs sm:text-sm cursor-pointer disabled:cursor-default`}
                  >
                    <span className="w-7 h-7 shrink-0 bg-white text-black border-[2px] border-black rounded-lg flex items-center justify-center font-black text-xs">
                      {badgeIcon}
                    </span>
                    <span className="leading-snug">{optText}</span>
                  </button>
                );
              })}
            </div>

            {/* Instant Feedback & Explanation */}
            <AnimatePresence>
              {currentPicked !== null && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col gap-3 pt-1"
                >
                  <div
                    className={`border-[3px] border-black rounded-2xl p-4 shadow-[4px_4px_0px_#0F172A] ${
                      currentPicked === currentQuestion.correctIndex
                        ? 'bg-[#D1FAE5] text-black'
                        : 'bg-[#FFE4E6] text-black'
                    }`}
                  >
                    <div className="font-black text-sm sm:text-base mb-1">
                      {currentPicked === currentQuestion.correctIndex
                        ? '✅ Mantap Bro! Stonks Brain 🧠'
                        : '❌ Terciduk Bro! 💀'}
                    </div>
                    <p className="text-xs sm:text-sm font-bold leading-relaxed">
                      {currentQuestion.explanation}
                    </p>
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={handleNext}
                      className="neo-btn px-7 py-3 bg-[#FEF08A] text-black rounded-2xl font-black text-xs sm:text-sm cursor-pointer"
                    >
                      {qIdx + 1 < BOSS_QUESTIONS.length
                        ? 'Soalan Seterusnya ➡️'
                        : 'Tengok Keputusan Final Boss 🏆'}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}

      {/* =================================================================== */}
      {/* STAGE 3: FINAL SCORE, RANKING & DIGITAL "INVESTLAH CERTIFIED" BADGE */}
      {/* =================================================================== */}
      {stage === 'result' && (
        <motion.div
          key="boss-result"
          initial={{ scale: 0.96, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex flex-col gap-5"
        >
          {/* Main Graduation Certificate & Score Card */}
          <div className="bg-white border-[3px] border-black rounded-3xl shadow-[5px_5px_0px_#0F172A] p-6 sm:p-8 text-center flex flex-col items-center gap-4">
            {/* Digital "InvestLAH Certified" Graphic Badge */}
            <div className="w-full max-w-md bg-gradient-to-br from-[#FEF08A] via-[#C8F7E1] to-[#BEE3FF] border-[3px] border-black rounded-3xl shadow-[5px_5px_0px_#0F172A] p-5 flex flex-col items-center gap-2 relative">
              <span className="px-3 py-0.5 bg-purple-200 text-black border-[2px] border-black rounded-full font-black text-[10px] uppercase tracking-widest">
                OFFICIAL DIGITAL CREDENTIAL
              </span>
              <div className="w-20 h-20 rounded-full bg-white border-[3px] border-black shadow-[3px_3px_0px_#0F172A] flex items-center justify-center text-4xl my-1">
                🎓
              </div>
              <div className="font-mono-rubik text-xl sm:text-2xl text-black tracking-tight">
                InvestLAH Certified
              </div>
              <div className="text-xs font-black text-slate-800">
                GEN-Z FINANCIAL LITERACY GRADUATE • {riskVibeLabel}
              </div>
            </div>

            {/* Score Readout */}
            <div className="flex flex-col items-center gap-2 mt-1">
              <span className="text-xs font-black uppercase tracking-wider text-slate-600">
                SKOR FINAL BOSS KAU:
              </span>
              <div className="font-mono-rubik text-4xl sm:text-6xl text-black">
                {totalScore} / {BOSS_QUESTIONS.length}
              </div>

              <span
                className={`px-4 py-1.5 ${rankingInfo.bg} border-[3px] border-black rounded-full shadow-[4px_4px_0px_#0F172A] font-black text-sm sm:text-base`}
              >
                Ranking: {rankingInfo.title}
              </span>

              <p className="text-xs sm:text-sm font-bold text-slate-700 max-w-lg mt-1">
                {rankingInfo.sub}
              </p>
            </div>

            {/* Share Toast */}
            {shareToast && (
              <div className="px-4 py-2 bg-[#C8F7E1] text-black border-[2px] border-black rounded-xl font-black text-xs shadow-[3px_3px_0px_#0F172A]">
                {shareToast}
              </div>
            )}

            {/* 3 Action Buttons required by spec */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowReview((prev) => !prev)}
                className="neo-btn px-5 py-3 bg-blue-200 text-black rounded-2xl font-black text-xs sm:text-sm cursor-pointer"
              >
                Review Salah Kat Mana 🔍
              </button>

              <button
                type="button"
                onClick={handleShareResult}
                className="neo-btn px-5 py-3 bg-[#10D989] text-black rounded-2xl font-black text-xs sm:text-sm cursor-pointer"
              >
                Share Result 📲
              </button>

              <button
                type="button"
                onClick={handleRestartQuiz}
                className="neo-btn px-5 py-3 bg-[#FEF08A] text-black rounded-2xl font-black text-xs sm:text-sm cursor-pointer"
              >
                Ulang Kuiz 🔄
              </button>
            </div>
          </div>

          {/* Expandable Review Breakdown */}
          <AnimatePresence>
            {showReview && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-white border-[3px] border-black rounded-3xl shadow-[5px_5px_0px_#0F172A] p-5 flex flex-col gap-3.5"
              >
                <h3 className="text-base sm:text-lg font-black text-black border-b-[2px] border-black/15 pb-2">
                  🔍 Post-Mortem Jawapan Kau (10 Soalan)
                </h3>

                {BOSS_QUESTIONS.map((q, idx) => {
                  const userPick = selectedAnswers[idx];
                  const isCorrect = userPick === q.correctIndex;
                  return (
                    <div
                      key={q.id}
                      className={`border-[2px] border-black rounded-2xl p-3.5 flex flex-col gap-1.5 ${
                        isCorrect ? 'bg-[#D1FAE5]' : 'bg-[#FFE4E6]'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-black text-xs uppercase">
                          Soalan {idx + 1}: {q.tag}
                        </span>
                        <span
                          className={`px-2.5 py-0.5 border border-black rounded-full font-black text-[11px] ${
                            isCorrect
                              ? 'bg-[#10D989] text-black'
                              : 'bg-[#FF4766] text-white'
                          }`}
                        >
                          {isCorrect ? 'BETUL ✅' : 'SALAH ❌'}
                        </span>
                      </div>

                      <p className="font-black text-xs sm:text-sm text-black">
                        {q.question}
                      </p>

                      {!isCorrect && userPick !== undefined && (
                        <div className="text-xs font-bold text-[#FF4766]">
                          Jawapan kau: {q.options[userPick]}
                        </div>
                      )}

                      <div className="text-xs font-black text-black">
                        Jawapan tepat: {q.options[q.correctIndex]}
                      </div>

                      <p className="text-xs font-semibold text-slate-700">
                        💡 {q.explanation}
                      </p>
                    </div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </section>
  );
};
