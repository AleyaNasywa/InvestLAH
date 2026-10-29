import React, { useState } from 'react';
import { motion } from 'motion/react';
import { fmtRM2, burstEmoji, fireBigConfetti, triggerShake } from '../utils/fx';
import { TabId } from './Sidebar';
import { SharedQuiz } from './SharedQuiz';

// ============================================================================
// TAB 7: KAMUS PELABUR (LINGO BUDAK FINANCIAL — SOFT-POP NEO-BRUTALISM)
// ============================================================================
const LINGO_DICTIONARY = [
  {
    frontEmoji: '📈',
    frontTitle: 'Risk / Risiko',
    backText: '"High risk, high return wei. Kalau tak, confirm terciduk."',
    backBg: 'bg-blue-100 text-black',
  },
  {
    frontEmoji: '🏢',
    frontTitle: 'Shares / Saham',
    backText: '"Beli syer company. Kau literally part-owner tbh."',
    backBg: 'bg-pink-100 text-black',
  },
  {
    frontEmoji: '🤝',
    frontTitle: 'Unit Trust (Macam ASB)',
    backText: '"Kumpul duit sama-sama, pass kat pro suruh tolong invest."',
    backBg: 'bg-[#FEF08A] text-black',
  },
  {
    frontEmoji: '🧺',
    frontTitle: 'ETF',
    backText:
      '"Beli one whole basket terus. Tak payah pening pick company satu-satu ngl."',
    backBg: 'bg-[#D1FAE5] text-black',
  },
];

const LINGO_QUIZ_DATA = [
  {
    q: '"ETF tu meaning dia beli satu company je."',
    correct: 'cap' as const,
    explanation: '"ETF = satu basket banyak company."',
  },
  {
    q: '"High risk = confirm rugi gila."',
    correct: 'cap' as const,
    explanation: '"High risk = naik turun laju besar. Boleh untung, boleh rugi."',
  },
  {
    q: '"Beli saham means kau actually jadi part-owner."',
    correct: 'fact' as const,
    explanation: '"Yup! Sikit pun, kau tetap owner."',
  },
];

interface Tab7Props {
  onAwardBadge: (badge: string) => void;
  onNavigate: (tab: TabId) => void;
}

export const Tab7Lingo: React.FC<Tab7Props> = ({
  onAwardBadge,
  onNavigate,
}) => {
  const [flipped, setFlipped] = useState<Record<number, boolean>>({});
  const [quizState, setQuizState] = useState<'start' | 'question' | 'end'>(
    'start'
  );
  const [qIdx, setQIdx] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [answered, setAnswered] = useState<{
    isCorrect: boolean;
    explanation: string;
  } | null>(null);

  const toggleCard = (idx: number, e: React.MouseEvent) => {
    const next = !flipped[idx];
    setFlipped((prev) => ({ ...prev, [idx]: next }));
    if (next) burstEmoji(e.clientX, e.clientY, '💡', 4);
  };

  const handleStartQuiz = () => {
    setQIdx(0);
    setScore(0);
    setAnswered(null);
    setQuizState('question');
  };

  const handlePickAnswer = (choice: 'cap' | 'fact', e: React.MouseEvent) => {
    if (answered) return;
    const current = LINGO_QUIZ_DATA[qIdx];
    const isCorrect = choice === current.correct;
    if (isCorrect) {
      setScore((s) => s + 1);
      burstEmoji(e.clientX, e.clientY, '🧠', 5);
    } else {
      triggerShake();
    }
    setAnswered({
      isCorrect,
      explanation: current.explanation,
    });
  };

  const handleNextQuestion = () => {
    setAnswered(null);
    if (qIdx + 1 < LINGO_QUIZ_DATA.length) {
      setQIdx((i) => i + 1);
    } else {
      setQuizState('end');
      onAwardBadge('Lingo Master');
      fireBigConfetti();
    }
  };

  const progressPct =
    ((qIdx + (answered ? 1 : 0)) / LINGO_QUIZ_DATA.length) * 100;

  return (
    <section className="max-w-4xl mx-auto font-jakarta bg-gradient-to-br from-[#ECFDF5] via-[#F0FDF4] to-[#E0F2FE] border-[3px] border-black rounded-3xl shadow-[5px_5px_0px_#0F172A] p-5 sm:p-7 flex flex-col gap-6 mb-10">
      {/* Header Section */}
      <div className="text-center flex flex-col items-center gap-2">
        <span className="inline-flex items-center gap-1.5 px-4 py-1 bg-[#FEF08A] border-2 border-black rounded-full shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] font-black text-xs sm:text-sm text-black">
          💬 Lingo
        </span>
        <h1 className="text-2xl sm:text-4xl font-black text-black tracking-tight">
          Lingo Budak Financial, Spill The Tea
        </h1>
        <p className="text-xs sm:text-sm font-bold text-gray-600">
          Fahamkan lingo ni so kau tak nampak noob sangat.
        </p>
      </div>

      {/* 3D Flip Cards (The Dictionary - 2x2 Grid) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {LINGO_DICTIONARY.map((card, idx) => {
          const isFlipped = Boolean(flipped[idx]);
          return (
            <div
              key={idx}
              onClick={(e) => toggleCard(idx, e)}
              className="perspective-1000 h-44 cursor-pointer select-none"
            >
              <div
                className={`relative w-full h-full transition-transform duration-500 preserve-3d ${
                  isFlipped ? 'rotate-y-180' : ''
                }`}
              >
                {/* Front Face */}
                <div className="absolute inset-0 backface-hidden bg-white hover:bg-[#FEFCE8] border-2 border-black rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-5 flex flex-col items-center justify-between text-center transition-colors">
                  <div className="flex-1 flex flex-col items-center justify-center gap-2">
                    <span className="text-4xl">{card.frontEmoji}</span>
                    <h3 className="text-lg sm:text-xl font-black text-black">
                      {card.frontTitle}
                    </h3>
                  </div>
                  <span className="text-xs font-extrabold text-gray-500">
                    Tap to flip
                  </span>
                </div>

                {/* Back Face */}
                <div
                  className={`absolute inset-0 backface-hidden rotate-y-180 ${card.backBg} border-2 border-black rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-5 flex flex-col items-center justify-center text-center`}
                >
                  <p className="text-base sm:text-lg font-black leading-snug">
                    {card.backText}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Quiz Section ("Brain Test: Fact or Cap?") */}
      <div className="flex flex-col gap-4 pt-1">
        <h2 className="text-lg sm:text-2xl font-black text-center text-black">
          Brain Test: Fact or Cap? 🧢
        </h2>

        {quizState === 'start' && (
          <div className="bg-white border-2 border-black rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-6 text-center flex flex-col items-center gap-3">
            <span className="text-4xl sm:text-5xl animate-bob">🧠</span>
            <h3 className="text-lg sm:text-xl font-black text-black">
              Ready Nak Test Otak? 🧠
            </h3>
            <p className="text-xs sm:text-sm font-bold text-gray-600">
              3 soalan. Flip kad atas dulu kalau blur.
            </p>
            <button
              type="button"
              onClick={handleStartQuiz}
              className="mt-1 px-7 py-3 bg-[#10D989] border-2 border-black rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-black text-sm sm:text-base text-black hover:translate-x-[1px] hover:translate-y-[1px] transition-all cursor-pointer"
            >
              Let&apos;s Go! 🔥
            </button>
          </div>
        )}

        {quizState === 'question' && (
          <div className="bg-white border-2 border-black rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-5 sm:p-6 flex flex-col gap-4">
            {/* Progress Bar */}
            <div className="w-full h-4 bg-gray-100 border-2 border-black rounded-full overflow-hidden">
              <div
                style={{ width: `${progressPct}%` }}
                className="h-full bg-[#10D989] transition-all duration-300"
              />
            </div>

            <div className="flex justify-center">
              <span className="px-3 py-0.5 bg-[#FEF08A] border-2 border-black rounded-full font-black text-xs">
                Soalan {qIdx + 1}/{LINGO_QUIZ_DATA.length}
              </span>
            </div>

            <p className="text-base sm:text-xl font-black text-center text-black py-1">
              {LINGO_QUIZ_DATA[qIdx].q}
            </p>

            {!answered ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <button
                  type="button"
                  onClick={(e) => handlePickAnswer('cap', e)}
                  className="py-3 px-5 bg-white hover:bg-red-100 border-2 border-black rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-black text-sm sm:text-base transition-colors cursor-pointer"
                >
                  Cap 🧢 (Mitos)
                </button>
                <button
                  type="button"
                  onClick={(e) => handlePickAnswer('fact', e)}
                  className="py-3 px-5 bg-white hover:bg-green-100 border-2 border-black rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-black text-sm sm:text-base transition-colors cursor-pointer"
                >
                  Fact 📠 (Betul)
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-3.5">
                <div
                  className={`w-full border-2 border-black rounded-2xl p-4 text-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${
                    answered.isCorrect
                      ? 'bg-[#D1FAE5] text-black'
                      : 'bg-[#FFE4E6] text-black'
                  }`}
                >
                  <div className="text-base sm:text-lg font-black mb-0.5">
                    {answered.isCorrect ? 'Big brain 🧠' : 'Salah bro!'}
                  </div>
                  <p className="text-xs sm:text-sm font-bold">
                    {answered.explanation}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleNextQuestion}
                  className="px-6 py-2.5 bg-[#FEF08A] border-2 border-black rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-black text-xs sm:text-sm text-black cursor-pointer"
                >
                  Seterusnya -&gt;
                </button>
              </div>
            )}
          </div>
        )}

        {quizState === 'end' && (
          <div className="bg-white border-2 border-black rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-6 text-center flex flex-col items-center gap-3">
            <div className="w-28 h-28 rounded-full bg-[#FEF08A] border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col items-center justify-center relative mb-2">
              <span className="text-4xl animate-bob">☕</span>
              <span className="absolute -bottom-3 px-3 py-0.5 bg-pink-200 text-black border-2 border-black rounded-full font-black text-xs whitespace-nowrap">
                Lingo Master
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-black mt-1">
              GGWP! Lencana Ter-loot 🎉
            </h3>
            <p className="text-xs sm:text-sm font-bold text-gray-600">
              Sekarang kau tak noob dah. Confirm.
            </p>

            <div className="px-4 py-1 bg-[#D1FAE5] border-2 border-black rounded-full font-black text-sm text-black">
              {score}/3 betul 👍
            </div>

            <div className="flex flex-wrap justify-center gap-3 mt-1">
              <button
                type="button"
                onClick={handleStartQuiz}
                className="px-5 py-2.5 bg-white hover:bg-gray-100 border-2 border-black rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-black text-xs sm:text-sm cursor-pointer"
              >
                Main Lagi 🔄
              </button>
              <button
                type="button"
                onClick={() => onNavigate('t8')}
                className="px-6 py-2.5 bg-[#10D989] border-2 border-black rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-black text-xs sm:text-sm text-black cursor-pointer"
              >
                Next Module: Halal or Nah? 🌙
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

// ============================================================================
// TAB 8: HALAL OR NAH? (RED FLAGS, DETOX DIVIDEN CLEANED, PORT GEMPAK)
// ============================================================================
const RED_FLAGS_DATA = [
  {
    tag: 'PANTANG LARANG SYARIAH',
    title: 'No Riba (Bunga / Interest)',
    subtitle: 'Duit beranak atas angin tanpa bisnes sebenar.',
    frontBg: 'bg-purple-200 text-black',
    backBg: 'bg-[#D1FAE5] text-black',
    bullet1: '❌ Haram ambil untung pinjaman.',
    bullet2: '✅ Tukar ke akaun Islamik/ASB.',
  },
  {
    tag: 'PANTANG LARANG SYARIAH',
    title: 'No Maysir (Unsur Judi)',
    subtitle: 'Main tikam-nasib macam kasino, zero analisis.',
    frontBg: 'bg-blue-200 text-black',
    backBg: 'bg-[#D1FAE5] text-black',
    bullet1: '❌ Binary option/tikam meme coin.',
    bullet2: '✅ Kena ada aset/bisnes legit.',
  },
  {
    tag: 'PANTANG LARANG SYARIAH',
    title: 'No Gharar (Kabur / Scam)',
    subtitle: 'Kontrak samar-samar, tak tahu duit pergi mana?',
    frontBg: 'bg-purple-200 text-black',
    backBg: 'bg-[#FEF08A] text-black',
    bullet1: '❌ Skim Telegram ganda duit.',
    bullet2: '✅ Guna platform SC Malaysia.',
  },
  {
    tag: 'PANTANG LARANG SYARIAH',
    title: 'Red Flag 🚩 Sektor Haram',
    subtitle: 'Syarikat jual benda terlarang walaupun untung besar.',
    frontBg: 'bg-[#FEF08A] text-black',
    backBg: 'bg-[#D1FAE5] text-black',
    bullet1: '❌ Arak, judi, kelab malam.',
    bullet2: '✅ Aktifkan Shariah Mode.',
  },
];

const CHARITY_LIST = [
  {
    title: 'Baitulmal MAIWP',
    desc: 'Saluran rasmi Majlis Agama Islam Wilayah Persekutuan untuk orang tak berkemampuan & asnaf.',
    url: 'https://www.maiwp.gov.my',
    bg: 'bg-[#FEF08A] text-black',
  },
  {
    title: 'Islamic Relief Malaysia',
    desc: 'Badan kemanusiaan untuk bantuan kecemasan, pendidikan & air bersih.',
    url: 'https://islamic-relief.org.my',
    bg: 'bg-blue-100 text-black',
  },
  {
    title: 'MERCY Malaysia',
    desc: 'Bantuan perubatan & bencana kemanusiaan di dalam dan luar negara.',
    url: 'https://www.mercy.org.my',
    bg: 'bg-[#D1FAE5] text-black',
  },
];

const PLATFORM_ECOSYSTEM = [
  {
    categoryTitle: 'Category 1: Robo-Advisor (Autopilot / Newbie)',
    icon: '🤖',
    headerBg: 'bg-blue-200 text-black',
    description:
      'Kau deposit duit, jawab kuiz sikit, pastu algoritma yang tolong belikan aset & uruskan portfolio.',
    cards: [
      {
        title: 'Wahed Invest',
        desc: '100% Patuh Syariah dari mula.',
        tier: 'Tier S',
        tierBg: 'bg-[#FEF08A] text-black',
        rec: 'Highly Recommended! Sesuai gila untuk student nak start invest 100% Halal tanpa pening kepala.',
        url: 'https://wahed.com/my',
      },
      {
        title: 'Akru Now',
        desc: 'Kos rendah. Pilihan portfolio Halal.',
        tier: 'Tier A',
        tierBg: 'bg-[#D1FAE5] text-black',
        rec: 'Bagus untuk mula dengan modal kecil & interface app yang sangat simple.',
        url: 'https://akrunow.com',
      },
    ],
  },
  {
    categoryTitle: 'Category 2: Broker Saham (DIY / Kaji Sendiri)',
    icon: '📈',
    headerBg: 'bg-pink-200 text-black',
    description:
      'Buka akaun CDS dan kau beli saham sendiri. ⚠️ AMARAN: Kau kena filter sendiri mana saham Halal atau Haram!',
    cards: [
      {
        title: 'Moomoo MY',
        desc: 'App trading paling moden & pantas.',
        tier: 'Tier A',
        tierBg: 'bg-[#D1FAE5] text-black',
        rec: 'Ngam kalau kau nak belajar trade. Hati-hati pilih saham Syariah je!',
        url: 'https://www.moomoo.com/my',
      },
      {
        title: 'FSMOne',
        desc: 'Fokus pada unit Amanah & ETF.',
        tier: 'Tier B',
        tierBg: 'bg-purple-200 text-black',
        rec: 'Sesuai kalau kau nak peram ETF atau Unit Trust berbanding trade saham hari-hari.',
        url: 'https://www.fsmone.com.my',
      },
    ],
  },
  {
    categoryTitle: 'Category 3: Pusat Ilmu & Tapisan (Belajar)',
    icon: '📚',
    headerBg: 'bg-[#D1FAE5] text-black',
    description:
      'Sebelum DIY beli saham, pergi sini dulu untuk check status Syariah syarikat dan belajar teknikal.',
    cards: [
      {
        title: 'Mahersaham',
        desc: 'Belajar teknikal saham tempatan.',
        tier: 'Tier S',
        tierBg: 'bg-[#FEF08A] text-black',
        rec: 'Lubuk ilmu wajib khatam sebelum kau pandai-pandai tekan buy/sell saham.',
        url: 'https://www.mahersaham.com',
      },
      {
        title: 'Bursa Marketplace',
        desc: 'Screener rasmi & info pasaran.',
        tier: 'Tier A',
        tierBg: 'bg-blue-200 text-black',
        rec: 'Tempat paling legit nak check fundamental company dari Bursa Malaysia.',
        url: 'https://www.bursamarketplace.com',
      },
    ],
  },
];

interface Tab8Props {
  onAwardBadge: (badge: string) => void;
  onNavigate: (tab: TabId) => void;
}

export const Tab8Halal: React.FC<Tab8Props> = ({
  onAwardBadge,
  onNavigate,
}) => {
  const [subtab, setSubtab] = useState<0 | 1 | 2>(0);
  const [rfFlipped, setRfFlipped] = useState<Record<number, boolean>>({});
  const [dividendVal, setDividendVal] = useState<number>(1800);

  const halal95 = dividendVal * 0.95;
  const detox5 = dividendVal * 0.05;
  const sliderPct = (dividendVal / 10000) * 100;

  return (
    <section className="max-w-5xl mx-auto font-jakarta flex flex-col gap-5 pb-12">
      {/* Top Sub-Navigation */}
      <div className="flex justify-center pt-1">
        <div className="inline-flex flex-wrap justify-center gap-1.5 p-1.5 bg-white border-[3px] border-black rounded-full shadow-[4px_4px_0px_#0F172A]">
          {(
            [
              [0, '🚩 Red Flags'],
              [1, '💸 Detox Dividen'],
              [2, '🕹️ Port Gempak'],
            ] as const
          ).map(([idx, label]) => {
            const active = subtab === idx;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setSubtab(idx)}
                className={`px-4 py-2 rounded-full font-black text-xs sm:text-sm transition-all cursor-pointer ${
                  active
                    ? 'bg-purple-200 text-black border-[2px] border-black shadow-[2px_2px_0px_#0F172A]'
                    : 'border-[2px] border-transparent hover:bg-slate-100'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* SUBTAB 1: 4 RED FLAGS (3D FLIP-IN-PLACE CARDS) */}
      {subtab === 0 && (
        <motion.div
          key="halal-rf"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-5"
        >
          <div className="text-center flex flex-col items-center gap-2">
            <span className="px-4 py-1 bg-[#FFE4E6] text-black border-[3px] border-black rounded-full shadow-[3px_3px_0px_#0F172A] font-black text-xs sm:text-sm">
              🚩 Red Flags
            </span>
            <h1 className="text-2xl sm:text-4xl font-black text-black tracking-tight">
              4 Red Flags 🚩 Wajib Elak Bila Melabur
            </h1>
            <p className="text-xs sm:text-sm font-bold text-slate-600 max-w-xl">
              Nak berkat &amp; tenang hati? Tekan butang &ldquo;Spill the Tea
              ☕&rdquo; kat setiap kad untuk flip!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {RED_FLAGS_DATA.map((card, idx) => {
              const isFlipped = Boolean(rfFlipped[idx]);
              return (
                <div
                  key={idx}
                  onClick={(e) => {
                    const next = !rfFlipped[idx];
                    setRfFlipped((prev) => ({ ...prev, [idx]: next }));
                    if (next) burstEmoji(e.clientX, e.clientY, '☕', 4);
                  }}
                  className="perspective-1000 h-52 cursor-pointer select-none"
                >
                  <div
                    className={`relative w-full h-full transition-transform duration-500 preserve-3d ${
                      isFlipped ? 'rotate-y-180' : ''
                    }`}
                  >
                    {/* Front Face */}
                    <div
                      className={`absolute inset-0 backface-hidden ${card.frontBg} border-[3px] border-black rounded-2xl shadow-[5px_5px_0px_#0F172A] p-5 flex flex-col items-center justify-between text-center`}
                    >
                      <span className="px-2.5 py-0.5 bg-white text-black border-[2px] border-black rounded-full font-black text-[10px] uppercase tracking-wider">
                        {card.tag}
                      </span>

                      <div>
                        <h3 className="text-lg sm:text-xl font-black">
                          {card.title}
                        </h3>
                        <p className="text-xs sm:text-sm font-bold opacity-85 mt-1">
                          {card.subtitle}
                        </p>
                      </div>

                      <span className="px-4 py-1.5 bg-white hover:bg-[#FEF08A] text-black border-[2px] border-black rounded-full shadow-[2px_2px_0px_#0F172A] font-black text-xs">
                        Spill the Tea ☕
                      </span>
                    </div>

                    {/* Back Face */}
                    <div
                      className={`absolute inset-0 backface-hidden rotate-y-180 ${card.backBg} border-[3px] border-black rounded-2xl shadow-[5px_5px_0px_#0F172A] p-5 flex flex-col justify-center gap-2.5 text-left`}
                    >
                      <div className="bg-white border-[2px] border-black rounded-xl p-3 font-black text-xs sm:text-sm text-black">
                        {card.bullet1}
                      </div>
                      <div className="bg-white border-[2px] border-black rounded-xl p-3 font-black text-xs sm:text-sm text-black">
                        {card.bullet2}
                      </div>
                      <div className="text-center text-[11px] font-black text-slate-600">
                        Tap to flip back 🔄
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-center pt-1">
            <button
              type="button"
              onClick={() => setSubtab(1)}
              className="neo-btn px-7 py-3 bg-[#10D989] rounded-2xl font-black text-xs sm:text-sm text-black cursor-pointer"
            >
              Next: Kalkulator Detox Dividen 💸
            </button>
          </div>
        </motion.div>
      )}

      {/* SUBTAB 2: KALKULATOR PENYUCIAN DIVIDEN (5%) & PORTAL SEDEKAH — CLEANED! */}
      {subtab === 1 && (
        <motion.div
          key="halal-detox"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-6"
        >
          <div className="bg-white border-[3px] border-black rounded-3xl shadow-[5px_5px_0px_#0F172A] p-5 sm:p-7 flex flex-col gap-6">
            <div className="flex flex-col items-center text-center gap-2">
              <span className="px-3 py-1 bg-purple-200 border-[2px] border-black rounded-full font-black text-[11px] uppercase tracking-wider">
                KALKULATOR PENYUCIAN DIVIDEN (5%)
              </span>
              <h2 className="text-xl sm:text-3xl font-black text-black">
                Detox Dividen 💸
              </h2>
              <p className="text-xs sm:text-sm font-bold text-slate-600 max-w-xl">
                Geser nilai dividen kat bawah untuk asingkan 5% bahagian tidak
                patuh Syariah supaya keuntungan kau 100% bersih &amp; berkat!
              </p>
            </div>

            {/* Interactive Slider Area */}
            <div className="bg-[#F7F9F6] border-[3px] border-black rounded-2xl p-4 sm:p-5 flex flex-col gap-3">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <label className="font-black text-xs sm:text-sm text-black">
                  💰 JUMLAH DIVIDEN DITERIMA (RM):
                </label>
                <span className="px-4 py-1 bg-[#FEF08A] border-[2px] border-black rounded-xl shadow-[2px_2px_0px_#0F172A] font-black text-sm sm:text-base text-black">
                  RM {dividendVal.toLocaleString('en-MY')}
                </span>
              </div>

              <input
                type="range"
                min={100}
                max={10000}
                step={50}
                value={dividendVal}
                onChange={(e) => setDividendVal(Number(e.target.value))}
                style={
                  {
                    '--p': `${sliderPct}%`,
                    '--fill': '#10D989',
                  } as React.CSSProperties
                }
                className="chunky"
                aria-label="Jumlah Dividen Diterima"
              />
              <div className="flex justify-between text-[11px] font-black text-slate-500">
                <span>RM 100</span>
                <span>RM 10,000</span>
              </div>
            </div>

            {/* Result Cards (Side-by-Side Grid) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Left Card: Soft Mint Green (95% Halal Bersih) */}
              <div className="bg-[#D1FAE5] text-black border-[3px] border-black rounded-2xl shadow-[5px_5px_0px_#0F172A] p-5 flex flex-col justify-between gap-2 text-center">
                <div className="text-xs font-black uppercase">
                  ✅ DIVIDEN HALAL BERSIH (95%)
                </div>
                <div className="font-mono-rubik text-2xl sm:text-4xl my-1">
                  {fmtRM2(halal95)}
                </div>
                <div className="text-xs font-black bg-white text-black border-[2px] border-black rounded-xl py-1.5 px-3">
                  100% Berkat ➔ Boleh Simpan &amp; Belanja!
                </div>
              </div>

              {/* Right Card: Soft Coral Blush (5% Wajib Salur/Detox) */}
              <div className="bg-pink-200 text-black border-[3px] border-black rounded-2xl shadow-[5px_5px_0px_#0F172A] p-5 flex flex-col justify-between gap-2 text-center">
                <div className="text-xs font-black uppercase">
                  🛑 WAJIB SALUR / DETOX (5%)
                </div>
                <div className="font-mono-rubik text-2xl sm:text-4xl my-1">
                  {fmtRM2(detox5)}
                </div>
                <div className="text-xs font-black bg-white text-black border-[2px] border-black rounded-xl py-1.5 px-3">
                  Salurkan terus ke Baitulmal atau Badan Kebajikan kat bawah!
                </div>
              </div>
            </div>

            <hr className="border-t-[3px] border-dashed border-black/25" />

            {/* Portal Rasmi Penyaluran Sedekah (3 Charity Cards) */}
            <div className="flex flex-col items-center gap-4">
              <span className="px-3 py-1 bg-[#FEF08A] border-[2px] border-black rounded-full font-black text-[11px] uppercase tracking-wider">
                PORTAL RASMI PENYALURAN SEDEKAH
              </span>
              <h3 className="text-lg sm:text-xl font-black text-center text-black">
                Kat Mana Nak Salurkan {fmtRM2(detox5)} ni?
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                {CHARITY_LIST.map((ch, idx) => (
                  <div
                    key={idx}
                    className={`${ch.bg} border-[3px] border-black rounded-2xl shadow-[5px_5px_0px_#0F172A] p-4 flex flex-col justify-between gap-3`}
                  >
                    <div>
                      <h4 className="font-black text-base">{ch.title}</h4>
                      <p className="text-xs font-bold opacity-85 mt-1">
                        {ch.desc}
                      </p>
                    </div>
                    <a
                      href={ch.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 py-2 px-3 bg-white hover:bg-black hover:text-white text-black border-[2px] border-black rounded-xl font-black text-xs transition-colors"
                    >
                      LAMAN RASMI 🔗
                    </a>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setSubtab(2)}
                className="neo-btn mt-2 px-7 py-3 bg-[#10D989] rounded-2xl font-black text-xs sm:text-sm text-black cursor-pointer"
              >
                Next: Port Gempak &amp; Mini-Game 🎮
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* SUBTAB 3: PORT GEMPAK (PLATFORM TIER LIST + HALAL KE HARAM MINI-GAME) */}
      {subtab === 2 && (
        <motion.div
          key="halal-platforms"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-6"
        >
          <div className="text-center flex flex-col items-center gap-2">
            <span className="px-4 py-1 bg-purple-200 text-black border-[3px] border-black rounded-full shadow-[3px_3px_0px_#0F172A] font-black text-xs uppercase tracking-wider">
              EKOSISTEM PELABUR
            </span>
            <h1 className="text-2xl sm:text-4xl font-black text-black tracking-tight">
              Platform Mana Nak Guna?
            </h1>
            <p className="text-xs sm:text-sm font-bold text-slate-600 max-w-2xl">
              Senarai platform berdaftar dengan SC Malaysia, dipecahkan ikut
              fungsi sebenar dorang.
            </p>
          </div>

          <div className="flex flex-col gap-5">
            {PLATFORM_ECOSYSTEM.map((cat, idx) => (
              <div
                key={idx}
                className="bg-white border-[3px] border-black rounded-3xl shadow-[5px_5px_0px_#0F172A] p-5 flex flex-col gap-4"
              >
                <div
                  className={`${cat.headerBg} border-[3px] border-black rounded-2xl px-4 py-2.5 flex items-center gap-2.5 shadow-[3px_3px_0px_#0F172A]`}
                >
                  <span className="text-xl">{cat.icon}</span>
                  <h2 className="text-sm sm:text-base font-black">
                    {cat.categoryTitle}
                  </h2>
                </div>

                <p className="text-xs sm:text-sm font-bold text-slate-700 px-1">
                  {cat.description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {cat.cards.map((card, cIdx) => (
                    <div
                      key={cIdx}
                      className="bg-[#F7F9F6] border-[3px] border-black rounded-2xl shadow-[4px_4px_0px_#0F172A] p-4 flex flex-col justify-between gap-3"
                    >
                      <div className="flex flex-col gap-1.5">
                        <div className="flex items-center justify-between gap-2">
                          <h3 className="text-base font-black text-black">
                            {card.title}
                          </h3>
                          <span
                            className={`px-2.5 py-0.5 ${card.tierBg} border-[2px] border-black rounded-full font-black text-xs whitespace-nowrap`}
                          >
                            {card.tier}
                          </span>
                        </div>

                        <p className="text-xs sm:text-sm font-extrabold text-black">
                          {card.desc}
                        </p>

                        <p className="text-xs italic font-semibold text-slate-600 leading-relaxed">
                          &ldquo;{card.rec}&rdquo;
                        </p>
                      </div>

                      <div className="flex justify-end pt-1">
                        <a
                          href={card.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3.5 py-1.5 bg-white hover:bg-black hover:text-white text-black border-[2px] border-black rounded-xl shadow-[2px_2px_0px_#0F172A] font-black text-xs transition-colors"
                        >
                          Buka 🔗
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Halal ke Haram Mini-Game Quiz at the bottom of Subtab 3 */}
          <div className="pt-2">
            <h2 className="text-lg sm:text-2xl font-black text-center mb-3">
              Halal ke Haram Bro? 🤔
            </h2>
            <SharedQuiz
              startEmoji="🎮"
              startTitle="Halal ke Haram Bro? 🤔"
              startSub="5 soalan chill. Teka instrumen ni patuh Syariah ke tak!"
              startBtn="Jom Main! 🎮"
              qLabel="Round"
              options={[
                {
                  key: 'halal',
                  label: 'Halal ✅',
                  hoverClass: 'hover:bg-[#D1FAE5]',
                },
                {
                  key: 'haram',
                  label: 'Haram 🚫',
                  hoverClass: 'hover:bg-pink-200',
                },
              ]}
              rightPhrases={[
                'Mantap! W Rizz 🔥',
                'Stonks 📈',
                'Big Brain Move 🧠',
              ]}
              wrongPhrases={[
                'Terciduk! 💀',
                'Alamak bestie 🚩',
                'Kurang tepat bro 📉',
              ]}
              questions={[
                {
                  e: '🍺',
                  q: 'Saham company buat minuman keras / arak.',
                  a: 'haram',
                  why: 'Sektor tak patuh Syariah. Auto skip!',
                },
                {
                  e: '📱',
                  q: 'Saham telco dalam senarai Syariah SC Malaysia.',
                  a: 'halal',
                  why: 'Dah lepas tapisan rasmi SC. Settle!',
                },
                {
                  e: '🎰',
                  q: 'Saham syarikat kasino & perjudian.',
                  a: 'haram',
                  why: 'Unsur Maysir (judi) = Red flag besar.',
                },
                {
                  e: '📜',
                  q: 'Sukuk (Bon Islamik berasaskan aset).',
                  a: 'halal',
                  why: 'Sukuk guna akad Syariah, bebas riba.',
                },
                {
                  e: '🏦',
                  q: 'Saham bank konvensional berasaskan faedah.',
                  a: 'haram',
                  why: 'Pendapatan utama daripada faedah = Riba.',
                },
              ]}
              badge={{
                emoji: '🕌',
                ribbon: 'Halal Hunter',
                bgClass: 'bg-[#D1FAE5]',
                ribbonClass: 'bg-purple-200 text-black',
                title: 'GGWP! Lencana Ter-loot 🎉',
                sub: 'Kau dah khatam asas pelaburan Syariah! Jom masuk Final Boss Quiz!',
              }}
              nextButton={{
                label: 'Masuk Final Boss Quiz (Tab 9) 🎓',
                onClick: () => onNavigate('t9'),
              }}
              onAwardBadge={onAwardBadge}
            />
          </div>
        </motion.div>
      )}
    </section>
  );
};
