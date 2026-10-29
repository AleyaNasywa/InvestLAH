import React, { useState } from 'react';
import { motion } from 'motion/react';
import { fmtRM2, burstEmoji, fireBigConfetti, triggerShake } from '../utils/fx';
import { TabId } from './Sidebar';
import { SharedQuiz } from './SharedQuiz';

// ============================================================================
// TAB 7: KAMUS PELABUR (LINGO BUDAK FINANCIAL — HIGH-CONTRAST NEO-BRUTALISM)
// ============================================================================
const LINGO_DICTIONARY = [
  {
    frontEmoji: '📈',
    frontTitle: 'Risiko',
    backText: '"High risk, high return wei. Kalau tak, confirm terciduk."',
    backBg: 'bg-[#3B82F6] text-white',
  },
  {
    frontEmoji: '🏢',
    frontTitle: 'Saham',
    backText: '"Beli syer company. Kau literally part-owner tbh."',
    backBg: 'bg-[#FB923C] text-black',
  },
  {
    frontEmoji: '🤝',
    frontTitle: 'Unit Trust',
    backText: '"Kumpul duit sama-sama, pass kat pro suruh tolong invest."',
    backBg: 'bg-[#FDE047] text-black',
  },
  {
    frontEmoji: '🧺',
    frontTitle: 'ETF',
    backText:
      '"Beli one whole basket terus. Tak payah pening pick company satu-satu ngl."',
    backBg: 'bg-[#10D989] text-black',
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
    <section className="max-w-4xl mx-auto font-jakarta bg-white border-[3px] border-black rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-5 sm:p-7 flex flex-col gap-6 mb-10">
      {/* Header Section */}
      <div className="text-center flex flex-col items-center gap-2">
        <span className="inline-flex items-center gap-1.5 px-4 py-1 bg-[#FDE047] border-[3px] border-black rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] font-black text-xs text-black uppercase">
          💬 Lingo
        </span>
        <h1 className="text-xl sm:text-3xl font-black text-black tracking-tight">
          Lingo Budak Financial, Spill The Tea
        </h1>
        <p className="text-xs sm:text-sm font-bold text-neutral-600">
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
                <div className="absolute inset-0 backface-hidden bg-[#F3F4F6] hover:bg-[#FDE047] border-[3px] border-black rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-5 flex flex-col items-center justify-between text-center transition-colors">
                  <div className="flex-1 flex flex-col items-center justify-center gap-2">
                    <span className="text-4xl">{card.frontEmoji}</span>
                    <h3 className="text-lg sm:text-xl font-black text-black">
                      {card.frontTitle}
                    </h3>
                  </div>
                  <span className="px-2.5 py-0.5 bg-white border-[2px] border-black rounded-md text-[11px] font-black text-black">
                    Tap to flip 🔄
                  </span>
                </div>

                {/* Back Face */}
                <div
                  className={`absolute inset-0 backface-hidden rotate-y-180 ${card.backBg} border-[3px] border-black rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-5 flex flex-col items-center justify-center text-center`}
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
          <div className="bg-[#F3F4F6] border-[3px] border-black rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6 text-center flex flex-col items-center gap-3">
            <span className="text-4xl sm:text-5xl animate-bob">🧠</span>
            <h3 className="text-lg sm:text-xl font-black text-black">
              Ready Nak Test Otak? 🧠
            </h3>
            <p className="text-xs sm:text-sm font-bold text-neutral-700">
              3 soalan. Flip kad atas dulu kalau blur.
            </p>
            <button
              type="button"
              onClick={handleStartQuiz}
              className="neo-btn mt-1 px-7 py-3 bg-[#10D989] rounded-xl font-black text-sm sm:text-base text-black cursor-pointer"
            >
              Let&apos;s Go! 🔥
            </button>
          </div>
        )}

        {quizState === 'question' && (
          <div className="bg-[#F3F4F6] border-[3px] border-black rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-5 sm:p-6 flex flex-col gap-4">
            {/* Progress Bar */}
            <div className="w-full h-4 bg-white border-[2px] border-black rounded-full overflow-hidden">
              <div
                style={{ width: `${progressPct}%` }}
                className="h-full bg-[#10D989] transition-all duration-300"
              />
            </div>

            <div className="flex justify-center">
              <span className="px-3 py-0.5 bg-[#FDE047] border-[2px] border-black rounded-md font-black text-xs">
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
                  className="neo-btn py-3 px-5 bg-white hover:bg-[#FF4766] hover:text-white rounded-xl font-black text-sm sm:text-base transition-colors cursor-pointer"
                >
                  Cap 🧢 (Mitos)
                </button>
                <button
                  type="button"
                  onClick={(e) => handlePickAnswer('fact', e)}
                  className="neo-btn py-3 px-5 bg-white hover:bg-[#10D989] rounded-xl font-black text-sm sm:text-base transition-colors cursor-pointer"
                >
                  Fact 📠 (Betul)
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-3.5">
                <div
                  className={`w-full border-[3px] border-black rounded-xl p-4 text-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${
                    answered.isCorrect
                      ? 'bg-[#10D989] text-black'
                      : 'bg-[#FF4766] text-white'
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
                  className="neo-btn px-6 py-2.5 bg-[#FDE047] rounded-xl font-black text-xs sm:text-sm text-black cursor-pointer"
                >
                  Seterusnya -&gt;
                </button>
              </div>
            )}
          </div>
        )}

        {quizState === 'end' && (
          <div className="bg-[#F3F4F6] border-[3px] border-black rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6 text-center flex flex-col items-center gap-3">
            <div className="w-28 h-28 rounded-full bg-[#FDE047] border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col items-center justify-center relative mb-2">
              <span className="text-4xl animate-bob">☕</span>
              <span className="absolute -bottom-3 px-3 py-0.5 bg-[#FF4766] text-white border-[2px] border-black rounded-full font-black text-xs whitespace-nowrap">
                Lingo Master
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-black mt-1">
              GGWP! Lencana Ter-loot 🎉
            </h3>
            <p className="text-xs sm:text-sm font-bold text-neutral-700">
              Sekarang kau tak noob dah. Confirm.
            </p>

            <div className="px-4 py-1 bg-[#10D989] border-[2px] border-black rounded-lg font-black text-sm text-black">
              {score}/3 betul 👍
            </div>

            <div className="flex flex-wrap justify-center gap-3 mt-1">
              <button
                type="button"
                onClick={handleStartQuiz}
                className="neo-btn px-5 py-2.5 bg-white hover:bg-[#FDE047] rounded-xl font-black text-xs sm:text-sm cursor-pointer"
              >
                Main Lagi 🔄
              </button>
              <button
                type="button"
                onClick={() => onNavigate('t8')}
                className="neo-btn px-6 py-2.5 bg-[#10D989] rounded-xl font-black text-xs sm:text-sm text-black cursor-pointer"
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
    frontBg: 'bg-[#06B6D4] text-black',
    backBg: 'bg-[#10D989] text-black',
    bullet1: '❌ Haram ambil untung pinjaman.',
    bullet2: '✅ Tukar ke akaun Islamik/ASB.',
  },
  {
    tag: 'PANTANG LARANG SYARIAH',
    title: 'No Maysir (Unsur Judi)',
    subtitle: 'Main tikam-nasib macam kasino, zero analisis.',
    frontBg: 'bg-[#22D3EE] text-black',
    backBg: 'bg-[#10D989] text-black',
    bullet1: '❌ Binary option/tikam meme coin.',
    bullet2: '✅ Kena ada aset/bisnes legit.',
  },
  {
    tag: 'PANTANG LARANG SYARIAH',
    title: 'No Gharar (Kabur / Scam)',
    subtitle: 'Kontrak samar-samar, tak tahu duit pergi mana?',
    frontBg: 'bg-[#3B82F6] text-white',
    backBg: 'bg-[#10D989] text-black',
    bullet1: '❌ Skim Telegram ganda duit.',
    bullet2: '✅ Guna platform SC Malaysia.',
  },
  {
    tag: 'PANTANG LARANG SYARIAH',
    title: 'Red Flag 🚩 Sektor Haram',
    subtitle: 'Syarikat jual benda terlarang walaupun untung besar.',
    frontBg: 'bg-[#FDE047] text-black',
    backBg: 'bg-[#10D989] text-black',
    bullet1: '❌ Arak, judi, kelab malam.',
    bullet2: '✅ Aktifkan Shariah Mode.',
  },
];

const CHARITY_LIST = [
  {
    title: 'Baitulmal MAIWP',
    desc: 'Saluran rasmi Majlis Agama Islam Wilayah Persekutuan untuk orang tak berkemampuan & asnaf.',
    url: 'https://www.maiwp.gov.my',
    bg: 'bg-[#FDE047] text-black',
  },
  {
    title: 'Islamic Relief Malaysia',
    desc: 'Badan kemanusiaan untuk bantuan kecemasan, pendidikan & air bersih.',
    url: 'https://islamic-relief.org.my',
    bg: 'bg-[#3B82F6] text-white',
  },
  {
    title: 'MERCY Malaysia',
    desc: 'Bantuan perubatan & bencana kemanusiaan di dalam dan luar negara.',
    url: 'https://www.mercy.org.my',
    bg: 'bg-[#10D989] text-black',
  },
];

const PLATFORM_ECOSYSTEM = [
  {
    categoryTitle: 'Cat 1: Robo-Advisor (Autopilot / Newbie)',
    icon: '🤖',
    headerBg: 'bg-[#3B82F6] text-white',
    description:
      'Kau deposit duit, jawab kuiz sikit, pastu algoritma yang tolong belikan aset & uruskan portfolio.',
    cards: [
      {
        title: 'Wahed Invest',
        desc: '100% Patuh Syariah dari mula.',
        tier: 'Tier S',
        tierBg: 'bg-[#FDE047] text-black',
        rec: 'Highly Recommended! Sesuai gila untuk student nak start invest 100% Halal tanpa pening kepala.',
        url: 'https://wahed.com/my',
      },
      {
        title: 'Akru Now',
        desc: 'Kos rendah. Pilihan portfolio Halal.',
        tier: 'Tier A',
        tierBg: 'bg-[#10D989] text-black',
        rec: 'Bagus untuk mula dengan modal kecil & interface app yang sangat simple.',
        url: 'https://akrunow.com',
      },
    ],
  },
  {
    categoryTitle: 'Cat 2: Broker Saham (DIY)',
    icon: '📈',
    headerBg: 'bg-[#FB923C] text-black',
    description:
      'Buka akaun CDS dan kau beli saham sendiri. ⚠️ AMARAN: Kau kena filter sendiri mana saham Halal atau Haram!',
    cards: [
      {
        title: 'Moomoo MY',
        desc: 'App trading paling moden & pantas.',
        tier: 'Tier A',
        tierBg: 'bg-[#10D989] text-black',
        rec: 'Ngam kalau kau nak belajar trade. Hati-hati pilih saham Syariah je!',
        url: 'https://www.moomoo.com/my',
      },
      {
        title: 'FSMOne',
        desc: 'Fokus pada unit Amanah & ETF.',
        tier: 'Tier B',
        tierBg: 'bg-[#FDE047] text-black',
        rec: 'Sesuai kalau kau nak peram ETF atau Unit Trust berbanding trade saham hari-hari.',
        url: 'https://www.fsmone.com.my',
      },
    ],
  },
  {
    categoryTitle: 'Cat 3: Pusat Ilmu',
    icon: '📚',
    headerBg: 'bg-[#10D989] text-black',
    description:
      'Sebelum DIY beli saham, pergi sini dulu untuk check status Syariah syarikat dan belajar teknikal.',
    cards: [
      {
        title: 'Mahersaham',
        desc: 'Belajar teknikal saham tempatan.',
        tier: 'Tier S',
        tierBg: 'bg-[#FDE047] text-black',
        rec: 'Lubuk ilmu wajib khatam sebelum kau pandai-pandai tekan buy/sell saham.',
        url: 'https://www.mahersaham.com',
      },
      {
        title: 'Bursa Marketplace',
        desc: 'Screener rasmi & info pasaran.',
        tier: 'Tier A',
        tierBg: 'bg-[#3B82F6] text-white',
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
        <div className="inline-flex flex-wrap justify-center gap-1.5 p-1.5 bg-white border-[3px] border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
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
                className={`px-4 py-2 rounded-lg font-black text-xs sm:text-sm transition-all cursor-pointer ${
                  active
                    ? 'bg-[#10D989] text-black border-[2px] border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                    : 'border-[2px] border-transparent hover:bg-[#FDE047]'
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
            <span className="px-3.5 py-1 bg-[#FF4766] text-white border-[3px] border-black rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] font-black text-xs uppercase">
              🚩 Red Flags
            </span>
            <h1 className="text-xl sm:text-3xl font-black text-black tracking-tight">
              4 Red Flags 🚩 Wajib Elak Bila Melabur
            </h1>
            <p className="text-xs sm:text-sm font-bold text-neutral-700 max-w-xl">
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
                      className={`absolute inset-0 backface-hidden ${card.frontBg} border-[3px] border-black rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-5 flex flex-col items-center justify-between text-center`}
                    >
                      <span className="px-2.5 py-0.5 bg-white text-black border-[2px] border-black rounded-md font-black text-[10px] uppercase tracking-wider">
                        {card.tag}
                      </span>

                      <div>
                        <h3 className="text-lg sm:text-xl font-black">
                          {card.title}
                        </h3>
                        <p className="text-xs sm:text-sm font-bold opacity-90 mt-1">
                          {card.subtitle}
                        </p>
                      </div>

                      <span className="px-4 py-1.5 bg-white hover:bg-[#FDE047] text-black border-[2px] border-black rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-black text-xs">
                        Spill the Tea ☕
                      </span>
                    </div>

                    {/* Back Face (Mint Green) */}
                    <div
                      className={`absolute inset-0 backface-hidden rotate-y-180 ${card.backBg} border-[3px] border-black rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-5 flex flex-col justify-center gap-2.5 text-left`}
                    >
                      <div className="bg-white border-[2px] border-black rounded-xl p-3 font-black text-xs sm:text-sm text-black">
                        {card.bullet1}
                      </div>
                      <div className="bg-white border-[2px] border-black rounded-xl p-3 font-black text-xs sm:text-sm text-black">
                        {card.bullet2}
                      </div>
                      <div className="text-center text-[11px] font-black text-black">
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
              className="neo-btn px-7 py-3 bg-[#10D989] rounded-xl font-black text-xs sm:text-sm text-black cursor-pointer"
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
          <div className="bg-white border-[3px] border-black rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-5 sm:p-7 flex flex-col gap-6">
            <div className="flex flex-col items-center text-center gap-2">
              <span className="px-3 py-1 bg-[#FDE047] border-[2px] border-black rounded-lg font-black text-[11px] uppercase tracking-wider">
                KALKULATOR PENYUCIAN DIVIDEN (5%)
              </span>
              <h2 className="text-xl sm:text-3xl font-black text-black">
                Detox Dividen 💸
              </h2>
              <p className="text-xs sm:text-sm font-bold text-neutral-600 max-w-xl">
                Geser nilai dividen kat bawah untuk asingkan 5% bahagian tidak
                patuh Syariah supaya keuntungan kau 100% bersih &amp; berkat!
              </p>
            </div>

            {/* Interactive Slider Area */}
            <div className="bg-[#F3F4F6] border-[3px] border-black rounded-xl p-4 sm:p-5 flex flex-col gap-3">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <label className="font-black text-xs sm:text-sm text-black">
                  💰 JUMLAH DIVIDEN DITERIMA (RM):
                </label>
                <span className="px-4 py-1 bg-[#FDE047] border-[2px] border-black rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-black text-sm sm:text-base text-black">
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
              <div className="flex justify-between text-[11px] font-black text-neutral-600">
                <span>RM 100</span>
                <span>RM 10,000</span>
              </div>
            </div>

            {/* Result Cards (Side-by-Side Grid) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Left Card: Solid Green (95% Halal Bersih) */}
              <div className="bg-[#10D989] text-black border-[3px] border-black rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-5 flex flex-col justify-between gap-2 text-center">
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

              {/* Right Card: Solid Cyber Red (5% Wajib Salur/Detox) */}
              <div className="bg-[#FF4766] text-white border-[3px] border-black rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-5 flex flex-col justify-between gap-2 text-center">
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

            <hr className="border-t-[3px] border-dashed border-black/30" />

            {/* Portal Rasmi Penyaluran Sedekah (3 Charity Cards) */}
            <div className="flex flex-col items-center gap-4">
              <span className="px-3 py-1 bg-[#FDE047] border-[2px] border-black rounded-lg font-black text-[11px] uppercase tracking-wider">
                PORTAL RASMI PENYALURAN SEDEKAH
              </span>
              <h3 className="text-lg sm:text-xl font-black text-center text-black">
                Kat Mana Nak Salurkan {fmtRM2(detox5)} ni?
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                {CHARITY_LIST.map((ch, idx) => (
                  <div
                    key={idx}
                    className={`${ch.bg} border-[3px] border-black rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-4 flex flex-col justify-between gap-3`}
                  >
                    <div>
                      <h4 className="font-black text-base">{ch.title}</h4>
                      <p className="text-xs font-bold opacity-90 mt-1">
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
                className="neo-btn mt-2 px-7 py-3 bg-[#10D989] rounded-xl font-black text-xs sm:text-sm text-black cursor-pointer"
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
            <span className="px-3.5 py-1 bg-[#3B82F6] text-white border-[3px] border-black rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] font-black text-[11px] uppercase tracking-wider">
              EKOSISTEM PELABUR
            </span>
            <h1 className="text-xl sm:text-3xl font-black text-black tracking-tight">
              Platform Mana Nak Guna?
            </h1>
            <p className="text-xs sm:text-sm font-bold text-neutral-700 max-w-2xl">
              Senarai platform berdaftar dengan SC Malaysia, dipecahkan ikut
              fungsi sebenar dorang.
            </p>
          </div>

          <div className="flex flex-col gap-5">
            {PLATFORM_ECOSYSTEM.map((cat, idx) => (
              <div
                key={idx}
                className="bg-white border-[3px] border-black rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-5 flex flex-col gap-4"
              >
                <div
                  className={`${cat.headerBg} border-[3px] border-black rounded-xl px-4 py-2.5 flex items-center gap-2.5 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]`}
                >
                  <span className="text-xl">{cat.icon}</span>
                  <h2 className="text-sm sm:text-base font-black">
                    {cat.categoryTitle}
                  </h2>
                </div>

                <p className="text-xs sm:text-sm font-bold text-neutral-800 px-1">
                  {cat.description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {cat.cards.map((card, cIdx) => (
                    <div
                      key={cIdx}
                      className="bg-[#F3F4F6] border-[3px] border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-4 flex flex-col justify-between gap-3"
                    >
                      <div className="flex flex-col gap-1.5">
                        <div className="flex items-center justify-between gap-2">
                          <h3 className="text-base font-black text-black">
                            {card.title}
                          </h3>
                          <span
                            className={`px-2.5 py-0.5 ${card.tierBg} border-[2px] border-black rounded-md font-black text-xs whitespace-nowrap`}
                          >
                            {card.tier}
                          </span>
                        </div>

                        <p className="text-xs sm:text-sm font-extrabold text-black">
                          {card.desc}
                        </p>

                        <p className="text-xs italic font-semibold text-neutral-700 leading-relaxed">
                          &ldquo;{card.rec}&rdquo;
                        </p>
                      </div>

                      <div className="flex justify-end pt-1">
                        <a
                          href={card.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3.5 py-1.5 bg-white hover:bg-black hover:text-white text-black border-[2px] border-black rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-black text-xs transition-colors"
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
                  hoverClass: 'hover:bg-[#10D989]',
                },
                {
                  key: 'haram',
                  label: 'Haram 🚫',
                  hoverClass: 'hover:bg-[#FF4766] hover:text-white',
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
                bgClass: 'bg-[#10D989]',
                ribbonClass: 'bg-[#3B82F6] text-white',
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
