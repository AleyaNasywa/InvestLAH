import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  fmtRM,
  rnd,
  burstEmoji,
  floatEmoji,
  fireBigConfetti,
  triggerShake,
} from '../utils/fx';
import { TabId } from './Sidebar';

// ============================================================================
// TAB 1: BARU NAK UP (THE HOOK — INFLATION TIME MACHINE & SWIPEABLE CAROUSEL)
// ============================================================================
interface YearData {
  year: number;
  cups: number;
  price: number;
  alertMessage: string;
}

const BOBA_TIMELINE: Record<number, YearData> = {
  2019: {
    year: 2019,
    cups: 10,
    price: 5.0,
    alertMessage:
      '2019: Peak era wei! RM50 boleh belanja member 10 cawan boba siap ada balance lagi. Cuba tarik slider ke kanan tengok apa jadi 👉',
  },
  2020: {
    year: 2020,
    cups: 9,
    price: 5.5,
    alertMessage:
      '2020: Baru setahun, 1 cawan boba dah lesap! RM50 dapat 9 cawan je sebab barang dah start naik harga.',
  },
  2021: {
    year: 2021,
    cups: 8,
    price: 6.2,
    alertMessage:
      '2021: 2 cawan boba dah lesap! RM50 tinggal 8 cawan je. Duit kat bank makin kecut kuasa beli dia.',
  },
  2022: {
    year: 2022,
    cups: 7,
    price: 7.0,
    alertMessage:
      '2022: 3 cawan dah lesap! RM50 cuma dapat 7 cawan boba. Inflasi tengah buat hal bro!',
  },
  2023: {
    year: 2023,
    cups: 6,
    price: 8.3,
    alertMessage:
      '2023: Lowkey sakit! RM50 cuma dapat 6 cawan boba je, 4 cawan dah lesap ditelan inflasi!',
  },
  2024: {
    year: 2024,
    cups: 5,
    price: 10.0,
    alertMessage:
      '2024: Separuh boba kau dah lesap! RM50 tinggal 5 cawan je wei. Secawan dah RM10, no cap!',
  },
  2025: {
    year: 2025,
    cups: 4,
    price: 12.5,
    alertMessage:
      '2025: Terciduk! RM50 cuma dapat 4 cawan boba, 6 cawan dah lesap! Simpan bawah bantal memang rugi.',
  },
  2026: {
    year: 2026,
    cups: 3,
    price: 15.9,
    alertMessage:
      '2026: Terciduk teruk! RM50 cuma dapat 3 cawan boba je wei! Sebab tu kau wajib belajar invest sekarang untuk lawan inflasi!',
  },
};

const FEATURE_CARDS = [
  {
    badge: 'SENANG HADAM',
    badgeBg: 'bg-[#3B82F6] text-white',
    cardBg: 'bg-[#DBEAFE]',
    emoji: '🎉',
    title: '🤓 Takde Ayat Skema Nerd',
    body: 'Bahasa pasar je. Zero jargon, takde pening kepala.',
  },
  {
    badge: 'MESRA NOOB',
    badgeBg: 'bg-[#10D989] text-black',
    cardBg: 'bg-[#D1FAE5]',
    emoji: '📈',
    title: '🚀 Belajar Invest Dari Zero',
    body: 'Step-by-step untuk beginner. Dari noob terus reti gandakan duit!',
  },
  {
    badge: 'REALISTIK',
    badgeBg: 'bg-[#FDE047] text-black',
    cardBg: 'bg-[#FEF9C3]',
    emoji: '📉',
    title: '💸 Reality Check (No Delulu)',
    body: 'Kira betul-betul ikut bajet student. Tolak siap-siap duit healing & Maggi.',
  },
];

export const Tab1BaruNakUp: React.FC<{
  onNavigate: (t: TabId) => void;
  onAwardBadge?: (badge: string) => void;
}> = ({ onNavigate, onAwardBadge }) => {
  const [subtab, setSubtab] = useState<'boba' | 'why'>('boba');
  const [year, setYear] = useState<number>(2019);
  const [activeSlide, setActiveSlide] = useState<number>(0);

  const currentData = BOBA_TIMELINE[year] || BOBA_TIMELINE[2019];
  const cupsRemaining = currentData.cups;
  const sliderPct = ((year - 2019) / (2026 - 2019)) * 100;

  return (
    <section className="max-w-4xl mx-auto flex flex-col gap-5 pb-10">
      {/* Sharp High-Contrast Hero Header — Solid White with Bold Accents */}
      <div className="relative overflow-hidden bg-white border-[3px] border-black rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] px-5 py-6 text-center flex flex-col items-center gap-2.5">
        <div
          className="hidden sm:flex absolute left-5 top-5 w-11 h-11 bg-[#FDE047] border-[3px] border-black rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] items-center justify-center text-xl select-none"
          aria-hidden="true"
        >
          🧋
        </div>

        <div
          className="hidden sm:flex absolute right-5 top-5 w-11 h-11 bg-[#10D989] border-[3px] border-black rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] items-center justify-center text-xl select-none"
          aria-hidden="true"
        >
          💸
        </div>

        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FDE047] border-[3px] border-black rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] font-black text-xs text-black uppercase">
          ⚡ InvestLAH
        </span>

        <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-black tracking-tight leading-tight">
          Duit Sentiasa Susut Nilai.{' '}
          <span className="inline-block bg-[#10D989] px-3 py-0.5 border-[3px] border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -rotate-1 mt-1 sm:mt-0">
            Kau Sedar Tak?
          </span>
        </h1>

        <p className="text-xs sm:text-sm font-extrabold text-neutral-700 max-w-lg">
          Tarik mesin masa ni. Tengok boba kau lesap satu-satu.
        </p>
      </div>

      {/* Compact Subtab Switcher to Prevent Excessive Vertical Scrolling */}
      <div className="flex justify-center">
        <div className="inline-flex p-1.5 bg-white border-[3px] border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] gap-1.5">
          <button
            type="button"
            onClick={() => setSubtab('boba')}
            className={`px-4 py-2 rounded-lg font-black text-xs sm:text-sm transition-all cursor-pointer ${
              subtab === 'boba'
                ? 'bg-[#FDE047] text-black border-[2px] border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                : 'border-[2px] border-transparent hover:bg-[#F3F4F6]'
            }`}
          >
            1️⃣ Mesin Masa Boba 🧋
          </button>
          <button
            type="button"
            onClick={() => setSubtab('why')}
            className={`px-4 py-2 rounded-lg font-black text-xs sm:text-sm transition-all cursor-pointer ${
              subtab === 'why'
                ? 'bg-[#10D989] text-black border-[2px] border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                : 'border-[2px] border-transparent hover:bg-[#F3F4F6]'
            }`}
          >
            2️⃣ Kenapa InvestLAH? ⚡
          </button>
        </div>
      </div>

      {/* SUBTAB 1: INTERACTIVE INFLATION TIME MACHINE */}
      {subtab === 'boba' && (
        <motion.div
          key="tab1-boba"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border-[3px] border-black rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-5 flex flex-col gap-4"
        >
          <div className="flex items-center justify-between flex-wrap gap-3 border-b-[3px] border-black pb-3">
            <div className="flex items-center gap-2.5">
              <span className="px-3 py-1 bg-[#FDE047] border-[2px] border-black rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-black text-xs uppercase">
                ⏳ Time Machine
              </span>
              <span className="font-mono-rubik text-xl sm:text-2xl text-black">
                {year}
              </span>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 bg-[#3B82F6] text-white border-[2px] border-black rounded-lg font-extrabold text-xs">
                1 Cup ≈ RM{currentData.price.toFixed(2)}
              </span>
              <span
                className={`px-3 py-1 border-[2px] border-black rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-black text-xs sm:text-sm ${
                  cupsRemaining <= 4
                    ? 'bg-[#FF4766] text-white'
                    : cupsRemaining <= 7
                    ? 'bg-[#FB923C] text-black'
                    : 'bg-[#10D989] text-black'
                }`}
              >
                RM50 = {cupsRemaining} Boba 🧋
              </span>
            </div>
          </div>

          {/* 10 Boba Cups Grid */}
          <div className="grid grid-cols-5 gap-2.5">
            {Array.from({ length: 10 }, (_, idx) => {
              const isLesap = idx >= cupsRemaining;
              return (
                <motion.div
                  key={idx}
                  layout
                  whileTap={{ scale: 0.94 }}
                  onClick={(e) =>
                    burstEmoji(
                      e.clientX,
                      e.clientY,
                      isLesap ? '💥' : '🧋',
                      4
                    )
                  }
                  className={`h-20 rounded-xl flex flex-col items-center justify-center gap-1 cursor-pointer select-none transition-colors ${
                    isLesap
                      ? 'bg-[#F3F4F6] border-[2px] border-dashed border-black/50 text-neutral-500'
                      : 'bg-[#FDE047] border-[3px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] text-black hover:bg-[#10D989]'
                  }`}
                >
                  {isLesap ? (
                    <>
                      <span className="text-xl sm:text-2xl leading-none">
                        💥
                      </span>
                      <span className="font-black text-[10px] uppercase tracking-wider text-[#FF4766]">
                        Lesap!
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="text-2xl sm:text-3xl leading-none">
                        🧋
                      </span>
                      <span className="font-black text-[10px] text-black">
                        #{idx + 1}
                      </span>
                    </>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Slider */}
          <div className="flex flex-col gap-2 pt-1">
            <input
              type="range"
              min={2019}
              max={2026}
              step={1}
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
              style={
                {
                  '--p': `${sliderPct}%`,
                  '--fill': cupsRemaining <= 4 ? '#FF4766' : '#10D989',
                } as React.CSSProperties
              }
              className="chunky"
              aria-label="Slider Tahun 2019 hingga 2026"
            />

            <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-wide text-black gap-2">
              <button
                type="button"
                onClick={() => setYear(2019)}
                className="text-left hover:underline cursor-pointer"
              >
                2019 (Murah Meriah)
              </button>
              <span className="px-2.5 py-0.5 bg-[#FDE047] border-[2px] border-black rounded-md text-[10px] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                ↔️ GESER SLIDER TAHUN
              </span>
              <button
                type="button"
                onClick={() => setYear(2026)}
                className="text-right hover:underline cursor-pointer text-[#FF4766]"
              >
                2026 (Harga Kayangan)
              </button>
            </div>
          </div>

          {/* High-Contrast Alert Box */}
          <div
            className={`border-[3px] border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-3.5 flex items-center gap-3 ${
              year >= 2024 ? 'bg-[#FF4766] text-white' : 'bg-[#F3F4F6] text-black'
            }`}
          >
            <span className="text-2xl shrink-0">
              {year === 2026 ? '🚨' : cupsRemaining <= 6 ? '😱' : '🧋'}
            </span>
            <p className="font-extrabold text-xs sm:text-sm leading-snug">
              {currentData.alertMessage}
            </p>
          </div>

          <div className="flex justify-center pt-1">
            <button
              type="button"
              onClick={() => setSubtab('why')}
              className="neo-btn px-6 py-3 bg-[#10D989] rounded-xl font-black text-xs sm:text-sm text-black cursor-pointer"
            >
              Habis Tu, Macam Mana Nak Selamatkan Duit? 👉
            </button>
          </div>
        </motion.div>
      )}

      {/* SUBTAB 2: SWIPEABLE / BOUNCY FEATURE CAROUSEL + GLOWING GREEN CTA */}
      {subtab === 'why' && (
        <motion.div
          key="tab1-why"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-5"
        >
          <div className="bg-white border-[3px] border-black rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-5 text-center flex flex-col items-center gap-2">
            <span className="px-3 py-1 bg-[#FDE047] border-[2px] border-black rounded-lg font-black text-[11px] uppercase tracking-wider shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              PLAYBOOK KEWANGAN BUDAK UNI
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-black tracking-tight">
              ⚡ Sebab Tu Kitorang Bina INVESTLAH!
            </h2>
            <p className="text-xs sm:text-sm font-bold text-neutral-700 max-w-xl">
              Swipe atau tap kad kat bawah. Zero ayat skema, terus masuk point!
            </p>
          </div>

          {/* Horizontal Swipeable / Bouncy Feature Carousel */}
          <div className="flex flex-col gap-3">
            <div className="flex md:grid md:grid-cols-3 gap-4 overflow-x-auto snap-x snap-mandatory pb-2">
              {FEATURE_CARDS.map((card, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.96, rotate: -1 }}
                  onClick={() => setActiveSlide(idx)}
                  className={`min-w-[82%] sm:min-w-[65%] md:min-w-0 snap-center ${card.cardBg} border-[3px] border-black rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-5 flex flex-col justify-between gap-3 cursor-pointer select-none`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`px-3 py-1 ${card.badgeBg} border-[2px] border-black rounded-lg font-black text-[11px] uppercase tracking-wider shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]`}
                    >
                      {card.badge}
                    </span>
                    <span className="text-2xl sm:text-3xl">{card.emoji}</span>
                  </div>

                  <div>
                    <h3 className="text-base sm:text-lg font-black text-black leading-tight">
                      {card.title}
                    </h3>
                    <p className="text-xs sm:text-sm font-bold text-neutral-900 leading-relaxed mt-1.5">
                      {card.body}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Carousel Indicators for Mobile/Tablet */}
            <div className="flex md:hidden justify-center gap-2">
              {FEATURE_CARDS.map((_, idx) => (
                <span
                  key={idx}
                  className={`h-2.5 border-[2px] border-black rounded-full transition-all ${
                    activeSlide === idx
                      ? 'w-7 bg-[#10D989]'
                      : 'w-2.5 bg-white'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Glowing Green CTA Button */}
          <div className="flex justify-center pt-1">
            <button
              type="button"
              onClick={() => {
                onAwardBadge?.('Boba Survivor');
                onNavigate('t2');
              }}
              className="neo-btn w-full max-w-xl py-3.5 px-6 bg-[#10D989] hover:bg-[#05c47a] rounded-2xl font-black text-base sm:text-lg text-black text-center cursor-pointer drop-shadow-[0_0_14px_rgba(16,217,137,0.45)]"
            >
              Okay, Ajar Aku Macam Mana Nak Start! 🚀
            </button>
          </div>
        </motion.div>
      )}
    </section>
  );
};

// ============================================================================
// TAB 2: VIBE CHECK RISIKO (TINDER-STYLE FLASHCARDS & GEN-Z PERSONAS)
// ============================================================================
export type RiskKey = 'safe' | 'mid' | 'aggr';

const RISK_QUESTIONS = [
  {
    e: '⏳',
    q: 'Bila kau plan nak guna duit yang kau park kat pelaburan ni?',
    o: [
      'Nak guna cepat (< 1 tahun) 🏃',
      'Lepas convo nanti (1–3 tahun) 🎓',
      'Mid-term (3–5 tahun) 💼',
      'Long-term (5 tahun++) 🧘',
    ],
  },
  {
    e: '📉',
    q: 'Tiber market crash, portfolio kau drop 20%! Apa move kau?',
    o: [
      'Panik wei! Cash out semua 😱',
      'Goyang sikit, jual separuh dulu 😰',
      'Chill & hold je, nanti recover 😌',
      'Waktu sale! Topup beli lagi murah 🛒',
    ],
  },
  {
    e: '💸',
    q: 'Macam mana vibe cashflow bulanan kau sekarang tbh?',
    o: [
      'Ngam-ngam cukup makan Maggi je 🍜',
      'Harap PTPTN / Biasiswa semata 🏦',
      'Ada lebih sikit tiap-tiap bulan 👍',
      'Steady + siap ada income side hustle 💪',
    ],
  },
  {
    e: '🧠',
    q: 'Jujur, level knowledge investing kau kat tahap mana?',
    o: [
      'Zero terus, baru nak explore 😵',
      'Tahu ASB & Tabung Haji je 🟡',
      'Faham basic saham, ETF & risiko 📚',
      'Selalu study market & chart 😎',
    ],
  },
  {
    e: '📱',
    q: 'Member kat TikTok flex untung Kripto 100% seminggu (FOMO). Kau?',
    o: [
      'Auto skip, tak berani langsung 🙅',
      'Tengok je, malas nak pening 👀',
      'Study dulu & test guna duit lebihan 🔍',
      'Rasa nak terus all-in kejar stonks 🚀',
    ],
  },
  {
    e: '🛟',
    q: 'Kalau laptop jem esok, kau ada Emergency Fund tak?',
    o: [
      'Kosong wei, kena pinjam member 🫠',
      'Ada sikit bawah RM500 😅',
      'Cukup cover 1–3 bulan survival 🛡️',
      'Solid! Lebih 3–6 bulan backup 🔥',
    ],
  },
  {
    e: '💧',
    q: 'Penting tak untuk kau boleh withdraw duit tu bila-bila masa?',
    o: [
      'Wajib instant withdraw kalau sesak ⚡',
      'Okay je kalau lock 3–6 bulan 🗓️',
      'Boleh peram 1–3 tahun tak kacau 🔒',
      'Biar peram lama janji compound padu 💎',
    ],
  },
  {
    e: '🎰',
    q: 'Kalau ada RM1,000 untuk setahun, mana satu vibe kau?',
    o: [
      'Confirm dapat RM1,040 zero drama 🛡️',
      'Peluang dapat RM1,080 atau turun RM960 ⚖️',
      'Peluang dapat RM1,200 atau turun RM850 📈',
      'Peluang dapat RM1,500 atau drop RM600 🎢',
    ],
  },
  {
    e: '🥧',
    q: 'Berapa % duit lebihan bulanan kau sanggup lock untuk invest?',
    o: [
      'Bawah 10% je dulu 🌱',
      'Dalam 10% – 20% (Rule 50/30/20) ✅',
      'Antara 20% – 40% setiap bulan 💰',
      'Lebih 40% sebab komitmen rendah 🚀',
    ],
  },
  {
    e: '🎯',
    q: 'Apa main goal kau mula invest waktu tengah belajar ni?',
    o: [
      'Janji modal selamat & tak susut 🛡️',
      'Nak beat inflasi & tambah duit poket 🧋',
      'Nak bina wealth steady lepas grad 🎓',
      'Nak maximize return paling gempak 🔥',
    ],
  },
];

export const RISK_PROFILES: Record<
  RiskKey,
  {
    name: string;
    sidebarLabel: string;
    emoji: string;
    nick: string;
    tag: string;
    bgClass: string;
    line: string;
    mix: number;
    stats: [number, number, number];
    pack: string[];
    tip: string;
  }
> = {
  safe: {
    name: 'Safe Space Defender 🛡️',
    sidebarLabel: 'Safe Defender 🛡️',
    emoji: '🛡️',
    nick: 'Main ASB je, tidur lena.',
    tag: '0–5 Pts • Safe Space Defender',
    bgClass: 'bg-[#3B82F6] text-white',
    line: 'Main ASB je, tidur lena! Kau tak kuasa nak pening tengok chart merah. Janji modal 100% selamat & return masuk steady tiap tahun.',
    mix: 80,
    stats: [95, 30, 20],
    pack: [
      '🟡 ASB',
      '🏦 FD-i / Versa Cash-i',
      '🕋 Tabung Haji',
      '🤖 Robo Syariah (Conservative)',
    ],
    tip: '💡 Move paling ngam: Lock Emergency Fund dalam ASB / Cash App dulu. Bila dah selesa baru try ETF sikit-sikit.',
  },
  mid: {
    name: 'Balanced Bestie ⚖️',
    sidebarLabel: 'Balanced Bestie ⚖️',
    emoji: '⚖️',
    nick: 'Main tengah-tengah, chill tapi masyuk.',
    tag: '6–15 Pts • Balanced Bestie',
    bgClass: 'bg-[#FDE047] text-black',
    line: 'Main tengah-tengah, chill tapi masyuk! Separuh duit kau park kat tempat kebal, separuh lagi biar kerja keras kejar compound growth.',
    mix: 60,
    stats: [65, 65, 55],
    pack: [
      '🤖 Robo-Advisor Balanced',
      '🧺 ETF Patuh Syariah',
      '🤝 Unit Trust',
      '🟡 ASB (Backup)',
    ],
    tip: '💡 Move paling ngam: Guna kombo 60% Aset Kebal + 40% Aset Growth (ETF/Robo) dan konsisten DCA tiap bulan.',
  },
  aggr: {
    name: 'Diamond Hands Bro 🎢',
    sidebarLabel: 'Diamond Hands 🎢',
    emoji: '🎢',
    nick: 'Suka volatility, jantung kental.',
    tag: '>15 Pts • Diamond Hands Bro',
    bgClass: 'bg-[#FB923C] text-black',
    line: 'Suka volatility, jantung kental! Market merah kau nampak macam diskaun 11.11. Target kau nak grow bag paling maksimum long-term!',
    mix: 30,
    stats: [35, 95, 90],
    pack: [
      '📈 Saham Bursa Syariah',
      '🌍 ETF Global (Wahed/MyETF)',
      '🤖 Robo Aggressive',
      '🛟 30% Backup ASB Wajib!',
    ],
    tip: '💡 Move paling ngam: Walaupun hati kering, pastikan ada backup 3 bulan belanja kat ASB dulu sebelum all-out kat saham/ETF!',
  },
};

interface Tab2Props {
  savedRisk: RiskKey | null;
  savedScore: number;
  onSaveRisk: (risk: RiskKey, score: number) => void;
  onNavigate: (tab: TabId) => void;
  onAwardBadge?: (badge: string) => void;
}

export const Tab2RiskProfile: React.FC<Tab2Props> = ({
  savedRisk,
  savedScore,
  onSaveRisk,
  onNavigate,
  onAwardBadge,
}) => {
  const [phase, setPhase] = useState<'start' | 'quiz' | 'result'>('start');
  const [qIdx, setQIdx] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);

  const handleSelectOption = (optIndex: number, e: React.MouseEvent) => {
    burstEmoji(e.clientX, e.clientY, rnd(['⚡', '🔥', '👌']), 4);
    // Each question awards 0, 1, 2, or 3 pts (0-5 pts = Safe Space Defender, 6-15 pts = Balanced Bestie, >15 pts = Diamond Hands Bro)
    const nextAns = [...answers];
    nextAns[qIdx] = optIndex;
    setAnswers(nextAns);

    if (qIdx + 1 < RISK_QUESTIONS.length) {
      setQIdx(qIdx + 1);
    } else {
      const totalScore = nextAns.reduce((a, b) => a + b, 0);
      const rk: RiskKey =
        totalScore <= 5 ? 'safe' : totalScore <= 15 ? 'mid' : 'aggr';
      onSaveRisk(rk, totalScore);
      onAwardBadge?.('Risk Checked');
      setPhase('result');
      fireBigConfetti();
    }
  };

  const activeRiskKey: RiskKey = savedRisk || 'mid';
  const profile = RISK_PROFILES[activeRiskKey];
  const needleAngle =
    -90 + Math.min(1, Math.max(0, savedScore / 25)) * 180;

  return (
    <section className="max-w-4xl mx-auto flex flex-col gap-5 pb-10">
      <div className="text-center flex flex-col items-center gap-2 pt-1">
        <span className="px-3.5 py-1 bg-[#FDE047] border-[3px] border-black rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] font-black text-xs uppercase">
          🎲 TAB 2: VIBE CHECK RISIKO
        </span>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-black tracking-tight leading-tight">
          Are You Ready?!{' '}
          <span className="inline-block bg-[#10D989] px-3 py-0.5 border-[3px] border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -rotate-1">
            Check Jiwa Pelabur Kau!
          </span>
        </h1>
        <p className="text-xs sm:text-sm font-bold text-neutral-700 max-w-lg">
          10 flashcard pantas nak check DNA pelabur kau. Jujur je, takde jawapan
          salah!
        </p>
      </div>

      {phase === 'start' && (
        <div className="bg-white border-[3px] border-black rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6 sm:p-8 text-center flex flex-col items-center gap-3.5">
          <span className="text-5xl sm:text-6xl animate-bob">🧬</span>
          <h2 className="text-xl sm:text-2xl font-black text-black">
            Apa Vibe Pelabur Kau Sebenarnya? 👀
          </h2>
          <p className="text-xs sm:text-sm font-bold text-neutral-800 max-w-md">
            Adakah kau geng <b>Safe Space Defender 🛡️</b>,{' '}
            <b>Balanced Bestie ⚖️</b>, atau <b>Diamond Hands Bro 🎢</b>? Jom
            test sekarang!
          </p>

          <button
            type="button"
            onClick={() => {
              setQIdx(0);
              setAnswers([]);
              setPhase('quiz');
            }}
            className="neo-btn mt-1 px-7 py-3.5 bg-[#10D989] rounded-xl font-black text-sm sm:text-base text-black cursor-pointer"
          >
            Start Vibe Check Sekarang! 🔥
          </button>

          {savedRisk && (
            <button
              type="button"
              onClick={() => setPhase('result')}
              className="mt-1 px-4 py-1.5 bg-[#F3F4F6] hover:bg-[#FDE047] border-[2px] border-black rounded-lg font-extrabold text-xs shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] cursor-pointer"
            >
              Tengok Result Kau Sebelum Ni ({RISK_PROFILES[savedRisk].name})
            </button>
          )}
        </div>
      )}

      {phase === 'quiz' && (
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between text-xs font-black uppercase px-1">
            <span>Tinder-Style Risk Flashcard</span>
            <span>
              Soalan {qIdx + 1} / {RISK_QUESTIONS.length}
            </span>
          </div>
          <div className="w-full h-5 bg-white border-[3px] border-black rounded-full shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{
                width: `${((qIdx + 1) / RISK_QUESTIONS.length) * 100}%`,
              }}
              className="h-full bg-[#10D989] border-r-[3px] border-black"
            />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={qIdx}
              initial={{ opacity: 0, x: 40, rotate: 1.5 }}
              animate={{ opacity: 1, x: 0, rotate: 0 }}
              exit={{ opacity: 0, x: -40, rotate: -1.5 }}
              transition={{ duration: 0.22 }}
              className="bg-white border-[3px] border-black rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6 text-center flex flex-col items-center gap-2.5"
            >
              <span className="px-3 py-0.5 bg-[#FDE047] border-[2px] border-black rounded-md font-black text-xs uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                FLASHCARD {qIdx + 1} / 10
              </span>
              <span className="text-4xl sm:text-5xl my-1">
                {RISK_QUESTIONS[qIdx].e}
              </span>
              <p className="text-lg sm:text-xl font-black text-black max-w-xl leading-snug">
                {RISK_QUESTIONS[qIdx].q}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {RISK_QUESTIONS[qIdx].o.map((optText, j) => {
              const bgs = [
                'bg-white hover:bg-[#3B82F6] hover:text-white',
                'bg-white hover:bg-[#10D989] hover:text-black',
                'bg-white hover:bg-[#FDE047] hover:text-black',
                'bg-white hover:bg-[#FB923C] hover:text-black',
              ];
              return (
                <button
                  key={j}
                  type="button"
                  onClick={(e) => handleSelectOption(j, e)}
                  className={`neo-btn ${bgs[j]} rounded-xl p-3.5 flex items-center gap-3 text-left font-extrabold text-xs sm:text-sm text-black cursor-pointer`}
                >
                  <span className="w-7 h-7 shrink-0 bg-[#FDE047] text-black border-[2px] border-black rounded-lg flex items-center justify-center font-black text-xs">
                    {j}pt
                  </span>
                  <span>{optText}</span>
                </button>
              );
            })}
          </div>

          {qIdx > 0 && (
            <div className="text-center">
              <button
                type="button"
                onClick={() => setQIdx(qIdx - 1)}
                className="px-3.5 py-1.5 bg-white border-[2px] border-black rounded-lg font-extrabold text-xs shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] cursor-pointer"
              >
                ⬅️ Undo Soalan Sebelum
              </button>
            </div>
          )}
        </div>
      )}

      {phase === 'result' && (
        <div className="flex flex-col gap-5">
          <div
            className={`${profile.bgClass} border-[3px] border-black rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6 text-center flex flex-col items-center gap-2`}
          >
            <div className="px-3 py-0.5 bg-white text-black border-[2px] border-black rounded-md text-[11px] font-black uppercase tracking-wider shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              ⚡ DNA PELABUR KAU DAH LOCK!
            </div>
            <div className="text-6xl animate-bob my-1">{profile.emoji}</div>
            <h2 className="font-mono-rubik text-2xl sm:text-3xl">
              {profile.name}
            </h2>
            <span className="px-3.5 py-1 bg-white text-black border-[2px] border-black rounded-lg font-black text-xs shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              {profile.tag} (Skor: {savedScore} pts)
            </span>
            <div className="text-base sm:text-lg font-black mt-1">
              &ldquo;{profile.nick}&rdquo;
            </div>
            <p className="text-xs sm:text-sm font-bold max-w-lg opacity-95">
              {profile.line}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Aura Meter */}
            <div className="bg-white border-[3px] border-black rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-5">
              <div className="text-xs font-black uppercase tracking-wider text-black">
                METER RISIKO KAU 📊
              </div>
              <svg
                className="w-full max-w-[240px] mx-auto mt-2 block"
                viewBox="0 0 200 112"
              >
                <path
                  d="M20 100 A80 80 0 0 1 180 100"
                  fill="none"
                  stroke="#000000"
                  strokeWidth="30"
                />
                <path
                  d="M20 100 A80 80 0 0 1 60 30.7"
                  fill="none"
                  stroke="#3B82F6"
                  strokeWidth="22"
                />
                <path
                  d="M60 30.7 A80 80 0 0 1 140 30.7"
                  fill="none"
                  stroke="#FDE047"
                  strokeWidth="22"
                />
                <path
                  d="M140 30.7 A80 80 0 0 1 180 100"
                  fill="none"
                  stroke="#FB923C"
                  strokeWidth="22"
                />
                <g
                  style={{
                    transform: `rotate(${needleAngle}deg)`,
                    transformOrigin: '100px 100px',
                    transition: 'transform 1s cubic-bezier(.3,1.6,.5,1)',
                  }}
                >
                  <line
                    x1="100"
                    y1="100"
                    x2="100"
                    y2="34"
                    stroke="#000000"
                    strokeWidth="7"
                    strokeLinecap="round"
                  />
                  <circle
                    cx="100"
                    cy="100"
                    r="11"
                    fill="#10D989"
                    stroke="#000000"
                    strokeWidth="4"
                  />
                </g>
              </svg>
              <div className="flex justify-between font-black text-[11px] max-w-[240px] mx-auto mt-1">
                <span>🛡️ Safe (0-5)</span>
                <span>⚖️ Balanced (6-15)</span>
                <span>🎢 Diamond (&gt;15)</span>
              </div>
            </div>

            {/* Vibe Stats */}
            <div className="bg-white border-[3px] border-black rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-5 flex flex-col gap-3">
              <div className="text-xs font-black uppercase tracking-wider text-black">
                STATS KARAKTER PELABUR ⚡
              </div>
              {[
                {
                  label: '🛡️ Peace of Mind (Safe)',
                  bg: 'bg-[#3B82F6]',
                  w: profile.stats[0],
                },
                {
                  label: '📈 Hunger For Stonks',
                  bg: 'bg-[#10D989]',
                  w: profile.stats[1],
                },
                {
                  label: '🎢 Jantung Tahan Volatiliti',
                  bg: 'bg-[#FB923C]',
                  w: profile.stats[2],
                },
              ].map((st, idx) => (
                <div key={idx} className="flex flex-col gap-1">
                  <div className="flex justify-between font-extrabold text-xs">
                    <span>{st.label}</span>
                    <span>{st.w}%</span>
                  </div>
                  <div className="h-4 border-[2px] border-black rounded-full bg-[#F3F4F6] overflow-hidden">
                    <div
                      style={{ width: `${st.w}%` }}
                      className={`h-full ${st.bg} border-r-[2px] border-black transition-all duration-700`}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Portfolio Breakdown Pie Chart */}
            <div className="bg-white border-[3px] border-black rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-5 text-center flex flex-col items-center justify-center gap-2.5">
              <div className="text-xs font-black uppercase tracking-wider text-black">
                KOMBO PORTFOLIO NGAM 🥧
              </div>
              <div
                style={{
                  background: `conic-gradient(#3B82F6 0 ${profile.mix}%, #FF4766 0)`,
                }}
                className="w-28 h-28 rounded-full border-[3px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] relative flex items-center justify-center"
              >
                <div className="w-12 h-12 rounded-full bg-white border-[2px] border-black flex items-center justify-center text-lg">
                  🧪
                </div>
              </div>
              <div className="flex gap-2 flex-wrap justify-center">
                <span className="px-3 py-0.5 bg-[#3B82F6] text-white border-[2px] border-black rounded-lg font-extrabold text-xs">
                  🛡️ Aset Kebal {profile.mix}%
                </span>
                <span className="px-3 py-0.5 bg-[#FF4766] text-white border-[2px] border-black rounded-lg font-extrabold text-xs">
                  🎢 Aset Growth {100 - profile.mix}%
                </span>
              </div>
            </div>

            {/* Starter Pack */}
            <div className="bg-white border-[3px] border-black rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-5 flex flex-col justify-between gap-3">
              <div>
                <div className="text-xs font-black uppercase tracking-wider text-black mb-2">
                  STARTER PACK CADANGAN 🎒
                </div>
                <div className="flex flex-wrap gap-2">
                  {profile.pack.map((item, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 bg-[#F3F4F6] border-[2px] border-black rounded-lg font-extrabold text-xs"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              <p className="font-bold text-xs text-black bg-[#FDE047] p-3 border-[2px] border-black rounded-xl">
                {profile.tip}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-3 pt-1">
            <button
              type="button"
              onClick={() => {
                setQIdx(0);
                setAnswers([]);
                setPhase('quiz');
              }}
              className="neo-btn px-5 py-3 bg-white hover:bg-[#FDE047] rounded-xl font-extrabold text-xs sm:text-sm cursor-pointer"
            >
              Retake Vibe Check 🔄
            </button>
            <button
              type="button"
              onClick={() => onNavigate('t3')}
              className="neo-btn px-7 py-3 bg-[#10D989] rounded-xl font-black text-sm sm:text-base cursor-pointer"
            >
              Next: Kira Bajet Kau (Tab 3) 💸
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

// ============================================================================
// TAB 3: POKAI TAPI BAJET (ZERO MATH FORMULAS — DIRECT BAKI BERSIH!)
// ============================================================================
export interface NeedsItems {
  sewa: number;
  makan: number;
  transport: number;
  internet: number;
  study: number;
}

export interface WantsItems {
  kopi: number;
  subs: number;
  sport: number;
  shopping: number;
}

export interface BudgetState {
  pinjaman: number;
  yuran: number;
  minggu: number;
  elaun: number;
  sideHustle: number;
  mode: 'manual' | 'auto';
  needs: NeedsItems;
  wants: WantsItems;
}

export const DEFAULT_BUDGET_STATE: BudgetState = {
  pinjaman: 3500,
  yuran: 1200,
  minggu: 14,
  elaun: 300,
  sideHustle: 250,
  mode: 'manual',
  needs: {
    sewa: 250,
    makan: 300,
    transport: 80,
    internet: 40,
    study: 30,
  },
  wants: {
    kopi: 60,
    subs: 20,
    sport: 20,
    shopping: 50,
  },
};

export function computeBudgetTotals(raw: Partial<BudgetState>) {
  const bj: BudgetState = {
    ...DEFAULT_BUDGET_STATE,
    ...raw,
    needs: { ...DEFAULT_BUDGET_STATE.needs, ...(raw.needs || {}) },
    wants: { ...DEFAULT_BUDGET_STATE.wants, ...(raw.wants || {}) },
  };

  const pinjaman = Math.max(0, Number(bj.pinjaman) || 0);
  const yuran = Math.max(0, Number(bj.yuran) || 0);
  const minggu = Math.max(1, Number(bj.minggu) || 14);
  const elaun = Math.max(0, Number(bj.elaun) || 0);
  const sideHustle = Math.max(0, Number(bj.sideHustle) || 0);

  const bakiPinjamanSem = Math.max(0, pinjaman - yuran);
  const pinjamanBulanan = (bakiPinjamanSem / minggu) * 4;
  const totalIn = pinjamanBulanan + elaun + sideHustle;

  const sumNeeds =
    (Number(bj.needs.sewa) || 0) +
    (Number(bj.needs.makan) || 0) +
    (Number(bj.needs.transport) || 0) +
    (Number(bj.needs.internet) || 0) +
    (Number(bj.needs.study) || 0);

  const sumWants =
    (Number(bj.wants.kopi) || 0) +
    (Number(bj.wants.subs) || 0) +
    (Number(bj.wants.sport) || 0) +
    (Number(bj.wants.shopping) || 0);

  const totalOut = sumNeeds + sumWants;
  const surplus = totalIn - totalOut;
  const hadSelamat30 = totalIn * 0.3;

  return {
    bakiPinjamanSem,
    pinjamanBulanan,
    elaun,
    sideHustle,
    totalIn,
    sumNeeds,
    sumWants,
    totalOut,
    surplus,
    hadSelamat30,
  };
}

const NEEDS_CONFIG: {
  key: keyof NeedsItems;
  label: string;
  emoji: string;
  max: number;
}[] = [
  { key: 'sewa', label: 'Sewa Bilik / Kolej', emoji: '🏠', max: 1000 },
  { key: 'makan', label: 'Makan Minum Harian', emoji: '🍜', max: 1000 },
  {
    key: 'transport',
    label: 'Transport (LRT, Bas, Minyak, Grab)',
    emoji: '🚌',
    max: 500,
  },
  { key: 'internet', label: 'Internet & Telco Pass', emoji: '📱', max: 150 },
  {
    key: 'study',
    label: 'Study Stuff (Printing, Buku, Assignment)',
    emoji: '📚',
    max: 200,
  },
];

const WANTS_CONFIG: {
  key: keyof WantsItems;
  label: string;
  emoji: string;
  max: number;
}[] = [
  {
    key: 'kopi',
    label: 'Healing & Kopi (Cafe Hunting, Lepak)',
    emoji: '☕',
    max: 500,
  },
  {
    key: 'subs',
    label: 'Subs (Netflix, Spotify, iCloud)',
    emoji: '🎧',
    max: 150,
  },
  {
    key: 'sport',
    label: 'Sport & Fitness (Futsal, Gym, Pickleball)',
    emoji: '🏸',
    max: 200,
  },
  {
    key: 'shopping',
    label: 'Racun Shopee / TikTok Shop',
    emoji: '🛍️',
    max: 500,
  },
];

interface Tab3Props {
  budget: BudgetState;
  onChangeBudget: (next: BudgetState) => void;
  onNavigate: (tab: TabId) => void;
  riskVibeLabel?: string;
  badgeCount?: number;
  onAwardBadge?: (badge: string) => void;
}

export const Tab3Bajet: React.FC<Tab3Props> = ({
  budget,
  onChangeBudget,
  onNavigate,
  riskVibeLabel = 'Balanced Bestie ⚖️',
  badgeCount = 1,
  onAwardBadge,
}) => {
  const [subtab, setSubtab] = useState<0 | 1 | 2>(0);
  const prevOverRef = useRef<boolean>(false);

  const normalizedBudget = useMemo<BudgetState>(
    () => ({
      ...DEFAULT_BUDGET_STATE,
      ...budget,
      needs: { ...DEFAULT_BUDGET_STATE.needs, ...(budget.needs || {}) },
      wants: { ...DEFAULT_BUDGET_STATE.wants, ...(budget.wants || {}) },
    }),
    [budget]
  );

  const {
    bakiPinjamanSem,
    pinjamanBulanan,
    elaun,
    sideHustle,
    totalIn,
    sumNeeds,
    sumWants,
    totalOut,
    surplus,
    hadSelamat30,
  } = useMemo(() => computeBudgetTotals(normalizedBudget), [normalizedBudget]);

  const isWantsOverLimit = totalIn > 0 && sumWants > hadSelamat30;

  useEffect(() => {
    if (isWantsOverLimit && !prevOverRef.current) {
      triggerShake();
    }
    prevOverRef.current = isWantsOverLimit;
  }, [isWantsOverLimit]);

  const updateBag = <K extends keyof BudgetState>(
    key: K,
    val: BudgetState[K]
  ) => {
    onChangeBudget({
      ...normalizedBudget,
      [key]: val,
    });
  };

  const updateNeed = (key: keyof NeedsItems, val: number, max: number) => {
    const clamped = Math.max(0, Math.min(max * 2, val));
    onChangeBudget({
      ...normalizedBudget,
      mode: 'manual',
      needs: {
        ...normalizedBudget.needs,
        [key]: clamped,
      },
    });
  };

  const updateWant = (key: keyof WantsItems, val: number, max: number) => {
    const clamped = Math.max(0, Math.min(max * 2, val));
    onChangeBudget({
      ...normalizedBudget,
      mode: 'manual',
      wants: {
        ...normalizedBudget.wants,
        [key]: clamped,
      },
    });
  };

  const handleTogglePresetMode = (mode: 'manual' | 'auto') => {
    if (mode === 'manual') {
      onChangeBudget({ ...normalizedBudget, mode: 'manual' });
      return;
    }
    const targetNeeds = totalIn * 0.5;
    const targetWants = totalIn * 0.3;
    onChangeBudget({
      ...normalizedBudget,
      mode: 'auto',
      needs: {
        sewa: Math.min(1000, Math.round(targetNeeds * 0.38)),
        makan: Math.min(1000, Math.round(targetNeeds * 0.38)),
        transport: Math.min(500, Math.round(targetNeeds * 0.12)),
        internet: Math.min(150, Math.round(targetNeeds * 0.06)),
        study: Math.min(200, Math.round(targetNeeds * 0.06)),
      },
      wants: {
        kopi: Math.min(500, Math.round(targetWants * 0.35)),
        subs: Math.min(150, Math.round(targetWants * 0.15)),
        sport: Math.min(200, Math.round(targetWants * 0.15)),
        shopping: Math.min(500, Math.round(targetWants * 0.35)),
      },
    });
  };

  return (
    <section className="max-w-5xl mx-auto flex flex-col gap-5 pb-12">
      {/* Persistent Top Status Bar */}
      <div className="bg-white border-[3px] border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] px-4 py-2.5 flex items-center justify-between flex-wrap gap-2">
        <span className="px-3 py-0.5 bg-[#FDE047] border-[2px] border-black rounded-md font-black text-xs uppercase tracking-wide">
          💸 TAB 3: POKAI TAPI BAJET
        </span>

        <span className="px-3 py-0.5 bg-[#3B82F6] text-white border-[2px] border-black rounded-md font-extrabold text-xs">
          🏅 {Math.max(1, badgeCount)}/8 Lencana • {riskVibeLabel}
        </span>

        <span
          className={`px-3.5 py-0.5 border-[2px] border-black rounded-md font-black text-xs ${
            surplus >= 0
              ? 'bg-[#10D989] text-black'
              : 'bg-[#FF4766] text-white'
          }`}
        >
          {surplus >= 0
            ? `Baki Bersih: +RM${Math.round(surplus)}`
            : `Defisit: -RM${Math.round(Math.abs(surplus))}`}
        </span>
      </div>

      {/* Main Title */}
      <div className="text-center flex flex-col items-center gap-1.5">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-black tracking-tight">
          Pokai?{' '}
          <span className="inline-block bg-[#10D989] px-3 py-0.5 border-[3px] border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -rotate-1">
            Bajet La Dulu.
          </span>
        </h1>
      </div>

      {/* 3 Sticky Pill Navigation Steps */}
      <div className="flex justify-center">
        <div className="inline-flex flex-wrap justify-center gap-1.5 p-1.5 bg-white border-[3px] border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          {[
            '1️⃣ Duit Masuk (The Bag)',
            '2️⃣ Duit Terbang (The Damage)',
            '3️⃣ Vibe Check (Summary)',
          ].map((label, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setSubtab(idx as 0 | 1 | 2);
                if (idx === 2) {
                  onAwardBadge?.('Budget Boss');
                  if (surplus >= 0 && totalIn > 0) {
                    setTimeout(fireBigConfetti, 120);
                  } else {
                    setTimeout(triggerShake, 120);
                  }
                }
              }}
              className={`px-4 py-2 rounded-lg font-black text-xs sm:text-sm transition-colors cursor-pointer ${
                subtab === idx
                  ? 'bg-[#FDE047] border-[2px] border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                  : 'border-[2px] border-transparent hover:bg-[#F3F4F6]'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* STEP 1: Duit Masuk (The Bag) — Lump-Sum PTPTN Converter */}
      {subtab === 0 && (
        <motion.div
          key="bag"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-4"
        >
          <div className="bg-white border-[3px] border-black rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-5 flex flex-col gap-4">
            <div className="flex items-center justify-between flex-wrap gap-2 border-b-[2px] border-black pb-3">
              <h3 className="text-base sm:text-lg font-black text-black flex items-center gap-2">
                <span>🎓</span>
                <span>Lump-Sum PTPTN / Biasiswa Converter</span>
              </h3>
              <span className="px-3 py-1 bg-[#10D989] border-[2px] border-black rounded-lg font-black text-xs shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                ⚡ Bulanan: {fmtRM(pinjamanBulanan)}/bln
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-[#F3F4F6] border-[2px] border-black rounded-xl p-3.5 flex flex-col gap-1.5">
                <label className="font-black text-xs text-black">
                  🏅 Masuk Satu Sem (RM)
                </label>
                <div className="flex items-center bg-white border-[2px] border-black rounded-lg px-3 py-1.5">
                  <span className="font-black text-neutral-500 mr-2">RM</span>
                  <input
                    type="number"
                    min={0}
                    value={normalizedBudget.pinjaman}
                    onChange={(e) =>
                      updateBag('pinjaman', Math.max(0, Number(e.target.value)))
                    }
                    className="w-full font-mono-rubik text-lg outline-none bg-transparent"
                  />
                </div>
              </div>

              <div className="bg-[#F3F4F6] border-[2px] border-black rounded-xl p-3.5 flex flex-col gap-1.5">
                <label className="font-black text-xs text-black">
                  🧾 Tolak Yuran &amp; Kolej (RM)
                </label>
                <div className="flex items-center bg-white border-[2px] border-black rounded-lg px-3 py-1.5">
                  <span className="font-black text-neutral-500 mr-2">RM</span>
                  <input
                    type="number"
                    min={0}
                    value={normalizedBudget.yuran}
                    onChange={(e) =>
                      updateBag('yuran', Math.max(0, Number(e.target.value)))
                    }
                    className="w-full font-mono-rubik text-lg outline-none bg-transparent"
                  />
                </div>
              </div>

              <div className="bg-[#F3F4F6] border-[2px] border-black rounded-xl p-3.5 flex flex-col justify-between gap-1.5">
                <label className="font-black text-xs text-black">
                  📆 Tempoh Sem ({normalizedBudget.minggu} Minggu)
                </label>
                <div className="grid grid-cols-4 gap-1.5">
                  {[12, 14, 16, 20].map((w) => (
                    <button
                      key={w}
                      type="button"
                      onClick={() => updateBag('minggu', w)}
                      className={`py-1.5 border-[2px] border-black rounded-lg font-black text-xs cursor-pointer ${
                        normalizedBudget.minggu === w
                          ? 'bg-[#FDE047] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                          : 'bg-white hover:bg-neutral-200'
                      }`}
                    >
                      {w}w
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="text-xs font-extrabold text-neutral-700 flex items-center justify-between flex-wrap gap-2 px-1">
              <span>
                Baki bersih satu sem: <b>{fmtRM(bakiPinjamanSem)}</b>
              </span>
              <span>
                Sebulan boleh belanja: <b>{fmtRM(pinjamanBulanan)}/bln</b>
              </span>
            </div>
          </div>

          {/* Section 2: Elaun Keluarga & Side Hustle */}
          <div className="bg-white border-[3px] border-black rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-5 flex flex-col gap-3.5">
            <h3 className="text-base sm:text-lg font-black text-black flex items-center gap-2">
              <span>🔁</span>
              <span>Duit Poket Bulanan (Parent &amp; Side Hustle)</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#F3F4F6] border-[2px] border-black rounded-xl p-3.5 flex flex-col gap-1.5">
                <label className="font-black text-xs text-black">
                  👨‍👩‍👧 Elaun Mak Ayah (RM / bulan)
                </label>
                <div className="flex items-center bg-white border-[2px] border-black rounded-lg px-3 py-1.5">
                  <span className="font-black text-neutral-500 mr-2">RM</span>
                  <input
                    type="number"
                    min={0}
                    value={normalizedBudget.elaun}
                    onChange={(e) =>
                      updateBag('elaun', Math.max(0, Number(e.target.value)))
                    }
                    className="w-full font-mono-rubik text-lg outline-none bg-transparent"
                  />
                </div>
              </div>

              <div className="bg-[#F3F4F6] border-[2px] border-black rounded-xl p-3.5 flex flex-col gap-1.5">
                <label className="font-black text-xs text-black">
                  💻 Side Hustle / Part-time (RM / bulan)
                </label>
                <div className="flex items-center bg-white border-[2px] border-black rounded-lg px-3 py-1.5">
                  <span className="font-black text-neutral-500 mr-2">RM</span>
                  <input
                    type="number"
                    min={0}
                    value={normalizedBudget.sideHustle}
                    onChange={(e) =>
                      updateBag(
                        'sideHustle',
                        Math.max(0, Number(e.target.value))
                      )
                    }
                    className="w-full font-mono-rubik text-lg outline-none bg-transparent"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Summary Output Card */}
          <div className="bg-[#FDE047] border-[3px] border-black rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-5 text-center flex flex-col items-center gap-2">
            <span className="px-3 py-0.5 bg-white border-[2px] border-black rounded-md font-black text-xs uppercase tracking-wider">
              TOTAL THE BAG KAU SEBULAN
            </span>

            <div className="font-mono-rubik text-3xl sm:text-5xl text-black leading-none my-1">
              {fmtRM(totalIn)}{' '}
              <span className="text-base sm:text-lg font-extrabold">/bln</span>
            </div>

            <button
              type="button"
              onClick={() => setSubtab(1)}
              className="neo-btn mt-1 px-7 py-3 bg-[#10D989] rounded-xl font-black text-sm sm:text-base text-black cursor-pointer"
            >
              Next: Check Duit Terbang (The Damage) 💸
            </button>
          </div>
        </motion.div>
      )}

      {/* STEP 2: Duit Terbang (The Damage) */}
      {subtab === 1 && (
        <motion.div
          key="damage"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-4"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <h2 className="text-lg sm:text-xl font-black text-black">
              Duit Terbang: Ke Mana Duit Kau Pergi? 💸
            </h2>

            <div className="inline-flex p-1 bg-white border-[3px] border-black rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] gap-1">
              <button
                type="button"
                onClick={() => handleTogglePresetMode('manual')}
                className={`px-3 py-1.5 rounded-lg font-black text-xs cursor-pointer ${
                  normalizedBudget.mode === 'manual'
                    ? 'bg-[#FDE047] border-[2px] border-black'
                    : 'hover:bg-neutral-100'
                }`}
              >
                ✍️ Adjust Sendiri
              </button>
              <button
                type="button"
                onClick={() => handleTogglePresetMode('auto')}
                className={`px-3 py-1.5 rounded-lg font-black text-xs cursor-pointer ${
                  normalizedBudget.mode === 'auto'
                    ? 'bg-[#10D989] border-[2px] border-black'
                    : 'hover:bg-neutral-100'
                }`}
              >
                🤖 Autopilot 50/30/20
              </button>
            </div>
          </div>

          {/* Violent Red Warning Banner if Healing / Wants > 30% */}
          <AnimatePresence>
            {isWantsOverLimit && (
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{
                  scale: 1,
                  opacity: 1,
                  x: [0, -10, 10, -8, 8, -4, 4, 0],
                }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.45 }}
                className="bg-[#FF4766] text-white border-[3px] border-black rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-4 flex items-center gap-3"
              >
                <span className="text-3xl shrink-0">🚨</span>
                <div className="font-black text-xs sm:text-sm leading-snug">
                  🚨 Amaran: Duit healing kau over-limit teruk ni. Potong sikit
                  bro! (Total Healing: {fmtRM(sumWants)} vs Limit 30%:{' '}
                  {fmtRM(hadSelamat30)})
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-start">
            {/* Komitmen Wajib (Needs) */}
            <div className="bg-white border-[3px] border-black rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-4 flex flex-col gap-3">
              <div className="bg-[#3B82F6] text-white border-[2px] border-black rounded-xl p-3 flex items-center justify-between gap-2">
                <span className="font-black text-xs sm:text-sm">
                  🏠 KOMITMEN WAJIB (NEEDS)
                </span>
                <span className="px-2.5 py-0.5 bg-white text-black border-[2px] border-black rounded-md font-mono-rubik text-xs">
                  {fmtRM(sumNeeds)}
                </span>
              </div>

              {NEEDS_CONFIG.map((item) => {
                const val = normalizedBudget.needs[item.key] || 0;
                const sliderVal = Math.min(item.max, val);
                const pct = (sliderVal / item.max) * 100;
                return (
                  <div
                    key={item.key}
                    className="bg-[#F3F4F6] border-[2px] border-black rounded-xl p-3 flex flex-col gap-1.5"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-extrabold text-xs sm:text-sm flex items-center gap-1.5">
                        <span>{item.emoji}</span>
                        <span>{item.label}</span>
                      </span>
                      <div className="flex items-center bg-white border-[2px] border-black rounded-lg px-2 py-0.5 w-24 shrink-0">
                        <span className="text-[11px] font-black text-neutral-500 mr-1">
                          RM
                        </span>
                        <input
                          type="number"
                          min={0}
                          max={item.max * 2}
                          value={val}
                          onChange={(e) =>
                            updateNeed(
                              item.key,
                              Number(e.target.value),
                              item.max
                            )
                          }
                          className="w-full font-black text-xs sm:text-sm outline-none bg-transparent"
                        />
                      </div>
                    </div>

                    <input
                      type="range"
                      min={0}
                      max={item.max}
                      step={10}
                      value={sliderVal}
                      onChange={(e) =>
                        updateNeed(item.key, Number(e.target.value), item.max)
                      }
                      style={
                        {
                          '--p': `${pct}%`,
                          '--fill': '#3B82F6',
                        } as React.CSSProperties
                      }
                      className="chunky thin"
                    />
                  </div>
                );
              })}
            </div>

            {/* Healing & Gaya Hidup (Wants) */}
            <div className="bg-white border-[3px] border-black rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-4 flex flex-col gap-3">
              <div className="bg-[#FB923C] text-black border-[2px] border-black rounded-xl p-3 flex flex-wrap items-center justify-between gap-2">
                <span className="font-black text-xs sm:text-sm">
                  ☕ HEALING &amp; LIFESTYLE (WANTS)
                </span>
                <div className="flex items-center gap-1.5">
                  <span
                    className={`px-2.5 py-0.5 border-[2px] border-black rounded-md font-mono-rubik text-xs ${
                      isWantsOverLimit
                        ? 'bg-[#FF4766] text-white'
                        : 'bg-white text-black'
                    }`}
                  >
                    {fmtRM(sumWants)}
                  </span>
                  <span className="px-2 py-0.5 bg-[#FDE047] border-[2px] border-black rounded-md font-black text-[11px]">
                    Max 30%: {fmtRM(hadSelamat30)}
                  </span>
                </div>
              </div>

              {WANTS_CONFIG.map((item) => {
                const val = normalizedBudget.wants[item.key] || 0;
                const sliderVal = Math.min(item.max, val);
                const pct = (sliderVal / item.max) * 100;
                return (
                  <div
                    key={item.key}
                    className="bg-[#F3F4F6] border-[2px] border-black rounded-xl p-3 flex flex-col gap-1.5"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-extrabold text-xs sm:text-sm flex items-center gap-1.5">
                        <span>{item.emoji}</span>
                        <span>{item.label}</span>
                      </span>
                      <div className="flex items-center bg-white border-[2px] border-black rounded-lg px-2 py-0.5 w-24 shrink-0">
                        <span className="text-[11px] font-black text-neutral-500 mr-1">
                          RM
                        </span>
                        <input
                          type="number"
                          min={0}
                          max={item.max * 2}
                          value={val}
                          onChange={(e) =>
                            updateWant(
                              item.key,
                              Number(e.target.value),
                              item.max
                            )
                          }
                          className="w-full font-black text-xs sm:text-sm outline-none bg-transparent"
                        />
                      </div>
                    </div>

                    <input
                      type="range"
                      min={0}
                      max={item.max}
                      step={10}
                      value={sliderVal}
                      onChange={(e) => {
                        updateWant(item.key, Number(e.target.value), item.max);
                        const rect = e.currentTarget.getBoundingClientRect();
                        floatEmoji(
                          rect.left + (rect.width * pct) / 100,
                          rect.top,
                          item.emoji
                        );
                      }}
                      style={
                        {
                          '--p': `${pct}%`,
                          '--fill': '#FB923C',
                        } as React.CSSProperties
                      }
                      className="chunky thin"
                    />
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-white border-[3px] border-black rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-center sm:text-left">
              <div className="text-[11px] font-black uppercase text-neutral-600">
                TOTAL DUIT TERBANG SEBULAN
              </div>
              <div className="font-mono-rubik text-xl sm:text-2xl text-black">
                {fmtRM(totalOut)}
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setSubtab(2);
                onAwardBadge?.('Budget Boss');
                if (surplus >= 0 && totalIn > 0) {
                  setTimeout(fireBigConfetti, 120);
                } else {
                  setTimeout(triggerShake, 120);
                }
              }}
              className="neo-btn px-7 py-3 bg-[#10D989] rounded-xl font-black text-sm sm:text-base text-black cursor-pointer"
            >
              Tengok Baki Bersih (Vibe Check) 👀
            </button>
          </div>
        </motion.div>
      )}

      {/* STEP 3: Vibe Check (Summary — Massive Readout for Surplus or Deficit) */}
      {subtab === 2 && (
        <motion.div
          key="reality"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-5"
        >
          {surplus < 0 ? (
            <div className="bg-[#FF4766] text-white border-[3px] border-black rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6 sm:p-8 text-center flex flex-col items-center gap-3">
              <span className="px-3.5 py-1 bg-black text-white border-[2px] border-white rounded-lg font-black text-xs uppercase tracking-wider">
                TERCIDUK BRO 💀 (DEFISIT BULANAN)
              </span>

              <div className="font-mono-rubik text-4xl sm:text-6xl text-white leading-none drop-shadow-[4px_4px_0px_#000000]">
                -RM {Math.round(Math.abs(surplus)).toLocaleString('en-MY')}
              </div>

              <p className="text-sm sm:text-lg font-black text-white max-w-xl leading-snug">
                Terciduk Bro 💀 Kau short RM {Math.round(Math.abs(surplus))}{' '}
                sebulan sebab belanja lagi laju dari duit masuk. Potong sikit
                duit healing sebelum pokai hujung bulan!
              </p>

              <button
                type="button"
                onClick={() => setSubtab(1)}
                className="neo-btn mt-1 px-7 py-3 bg-[#FDE047] text-black rounded-xl font-black text-sm sm:text-base cursor-pointer"
              >
                Adjust Bajet Balik 🔧
              </button>
            </div>
          ) : (
            <div className="bg-[#10D989] text-black border-[3px] border-black rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6 sm:p-8 text-center flex flex-col items-center gap-3">
              <span className="px-3.5 py-1 bg-white text-black border-[2px] border-black rounded-lg font-black text-xs uppercase tracking-wider shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                BAG SECURED ✅ (BAKI BERSIH BULANAN)
              </span>

              <div className="font-mono-rubik text-4xl sm:text-6xl text-black leading-none drop-shadow-[3px_3px_0px_#FFFFFF]">
                +RM {Math.round(surplus).toLocaleString('en-MY')}
              </div>

              <p className="text-sm sm:text-lg font-black text-black max-w-xl leading-snug">
                Bag Secured ✅ Ada lebihan RM {Math.round(surplus)} sebulan
                untuk kau park &amp; gandakan kat Mission Get Rich!
              </p>

              <button
                type="button"
                onClick={() => onNavigate('t4')}
                className="neo-btn mt-1 px-7 py-3 bg-[#FDE047] text-black rounded-xl font-black text-sm sm:text-base cursor-pointer"
              >
                Proceed Mission: Get Rich 🚀
              </button>
            </div>
          )}

          {/* Comparison Split Widget */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center text-center">
            <div className="bg-white border-[3px] border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-4">
              <div className="text-xs font-black uppercase tracking-wider">
                💰 DUIT MASUK
              </div>
              <div className="font-mono-rubik text-xl sm:text-2xl mt-1 text-[#10D989]">
                {fmtRM(totalIn)}
              </div>
            </div>

            <div className="font-mono-rubik text-xl text-black">VS</div>

            <div className="bg-white border-[3px] border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-4">
              <div className="text-xs font-black uppercase tracking-wider">
                💸 DUIT TERBANG
              </div>
              <div className="font-mono-rubik text-xl sm:text-2xl mt-1 text-[#FF4766]">
                {fmtRM(totalOut)}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </section>
  );
};

// ============================================================================
// TAB 4: MISSION GET RICH — 3-STEP HORIZONTAL SLIDING WIZARD (VIDEO MATCH)
// ============================================================================
export interface SavedGoalItem {
  id: number;
  e: string;
  n: string;
  amt: number;
  year: number;
  pmt: number;
  risk: RiskKey;
  saved: number;
}

const VIDEO_GOALS = [
  { k: 'travel', e: '✈️', n: 'Healing / Travel', bg: 'bg-[#3B82F6] text-white' },
  {
    k: 'big',
    e: '🚗',
    n: 'Ride / Kereta',
    s: 'Kereta, motor, etc',
    bg: 'bg-[#FB923C] text-black',
  },
  { k: 'tech', e: '💻', n: 'Tech Gear / Gadget', bg: 'bg-[#FDE047] text-black' },
  { k: 'wed', e: '💍', n: 'Dana Kahwin', bg: 'bg-[#FF4766] text-white' },
  { k: 'edu', e: '🎓', n: 'Education', bg: 'bg-[#DBEAFE] text-black' },
  { k: 'ef', e: '🛡️', n: 'Emergency Fund', bg: 'bg-[#10D989] text-black' },
  {
    k: 'custom',
    e: '✍️',
    n: 'Custom Goal',
    s: 'Tulis sendiri',
    bg: 'bg-white border-dashed text-black',
  },
];

const GOAL_RATES: Record<RiskKey, number> = {
  safe: 0.05,
  mid: 0.085,
  aggr: 0.125,
};

const GOAL_RISK_COLORS: Record<RiskKey, string> = {
  safe: '#DBEAFE',
  mid: '#FDE047',
  aggr: '#FB923C',
};

const GOAL_RISK_NAMES: Record<RiskKey, string> = {
  safe: '🛡️ Safe (5%)',
  mid: '⚖️ Balanced (8.5%)',
  aggr: '🎢 Aggressive (12.5%)',
};

interface Tab4Props {
  surplus: number;
  defaultRisk: RiskKey;
  savedGoals: SavedGoalItem[];
  onSaveGoals: (goals: SavedGoalItem[]) => void;
  onNavigate: (tab: TabId) => void;
  onAwardBadge?: (badge: string) => void;
}

export const Tab4Goals: React.FC<Tab4Props> = ({
  surplus,
  defaultRisk,
  savedGoals,
  onSaveGoals,
  onNavigate,
  onAwardBadge,
}) => {
  const currentYear = new Date().getFullYear();
  const [subtab, setSubtab] = useState<0 | 1 | 2>(0);
  const [wizStep, setWizStep] = useState<0 | 1 | 2>(0);

  const [pickedGoalKey, setPickedGoalKey] = useState<string | null>(null);
  const [customTxt, setCustomTxt] = useState<string>('');
  const [amtInput, setAmtInput] = useState<string>('10000');
  const [amtErr, setAmtErr] = useState<string>('');
  const [yearInput, setYearInput] = useState<number>(currentYear + 5);
  const [yrErr, setYrErr] = useState<string>('');

  const [bpReady, setBpReady] = useState<boolean>(false);
  const [bpGoal, setBpGoal] = useState<{ e: string; n: string }>({
    e: '🎓',
    n: 'Education',
  });
  const [bpAmt, setBpAmt] = useState<number>(10000);
  const [bpYear, setBpYear] = useState<number>(currentYear + 5);
  const [risk, setRisk] = useState<RiskKey>(defaultRisk);

  const [topupInputs, setTopupInputs] = useState<Record<number, string>>({});
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const pathRef = useRef<SVGPathElement | null>(null);
  const [rocketPos, setRocketPos] = useState<{
    xPct: number;
    yPct: number;
    angle: number;
  }>({ xPct: 98, yPct: 12, angle: 15 });

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2500);
  };

  const pickedGoalObj = VIDEO_GOALS.find((g) => g.k === pickedGoalKey) || null;
  const canStep0Next =
    pickedGoalObj !== null &&
    (pickedGoalObj.k !== 'custom' || customTxt.trim().length > 0);

  const yearsDiff = bpYear - currentYear;
  const nMonths = Math.max(12, yearsDiff * 12);
  const rMonthly = GOAL_RATES[risk] / 12;
  const pmt = (bpAmt * rMonthly) / (Math.pow(1 + rMonthly, nMonths) - 1);

  const chartData = useMemo(() => {
    const W = 600;
    const H = 300;
    const ymax = bpAmt * 1.15;
    const Y = (v: number) => H - (v / ymax) * (H - 14);
    const steps = Math.min(nMonths, 60);
    let line = '';
    let dep = '';

    for (let j = 0; j <= steps; j++) {
      const k = Math.round((j / steps) * nMonths);
      const x = (j / steps) * W;
      const b =
        rMonthly > 0
          ? pmt * ((Math.pow(1 + rMonthly, k) - 1) / rMonthly)
          : pmt * k;
      line += `${j ? 'L' : 'M'}${x.toFixed(1)} ${Y(b).toFixed(1)}`;
      dep += `${j ? 'L' : 'M'}${x.toFixed(1)} ${Y(pmt * k).toFixed(1)}`;
    }
    const area = `${line}L${W} ${H}L0 ${H}Z`;
    const ty = Y(bpAmt);
    return { W, H, line, dep, area, ty };
  }, [bpAmt, nMonths, rMonthly, pmt]);

  useEffect(() => {
    if (subtab !== 1 || !bpReady) return;
    const pathEl = pathRef.current;
    if (!pathEl) return;
    const totalLen = pathEl.getTotalLength();
    if (!totalLen) return;

    let raf = 0;
    const t0 = performance.now();
    const dur = 1000;

    const frame = (t: number) => {
      const p = Math.min(1, (t - t0) / dur);
      const ease = 1 - Math.pow(1 - p, 2.2);
      const pt = pathEl.getPointAtLength(totalLen * ease);
      const pt2 = pathEl.getPointAtLength(
        Math.min(totalLen, totalLen * ease + 4)
      );
      const ang = (Math.atan2(pt2.y - pt.y, pt2.x - pt.x) * 180) / Math.PI;
      setRocketPos({
        xPct: (pt.x / 600) * 100,
        yPct: (pt.y / 300) * 100,
        angle: ang + 45,
      });
      if (p < 1) {
        raf = requestAnimationFrame(frame);
      }
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [subtab, bpReady, risk, bpAmt, bpYear]);

  const handleStep1Next = () => {
    const val = parseFloat(amtInput);
    if (!(val > 0)) {
      setAmtErr('Isi amount dulu bro 👆');
      triggerShake();
      return;
    }
    setAmtErr('');
    setWizStep(2);
  };

  const handleGenerateBlueprint = (e: React.MouseEvent) => {
    const diff = yearInput - currentYear;
    if (diff < 1) {
      setYrErr(
        `Kena at least ${currentYear + 1} bro. Time machine takde lagi 😅`
      );
      triggerShake();
      return;
    }
    setYrErr('');
    const gObj = pickedGoalObj || VIDEO_GOALS[4];
    const finalName =
      gObj.k === 'custom' && customTxt.trim() ? customTxt.trim() : gObj.n;
    setBpGoal({ e: gObj.e, n: finalName });
    setBpAmt(parseFloat(amtInput) || 10000);
    setBpYear(yearInput);
    setBpReady(true);
    onAwardBadge?.('Goal Getter');
    burstEmoji(e.clientX, e.clientY, '🚀', 6);
    setSubtab(1);
  };

  const handleLockAndSave = (e: React.MouseEvent) => {
    const newGoal: SavedGoalItem = {
      id: Date.now(),
      e: bpGoal.e,
      n: bpGoal.n,
      amt: bpAmt,
      year: bpYear,
      pmt: Math.round(pmt),
      risk,
      saved: 0,
    };
    onSaveGoals([newGoal, ...savedGoals]);
    onAwardBadge?.('Goal Getter');
    fireBigConfetti();
    burstEmoji(e.clientX, e.clientY, '💾', 6);
    showToast('💾 Saved! Check kat Saved Goals.');
    setTimeout(() => setSubtab(2), 850);
  };

  const yrDiffPreview = yearInput - currentYear;

  return (
    <section className="max-w-4xl mx-auto flex flex-col gap-5 pb-12 relative">
      <AnimatePresence>
        {toastMsg && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            className="fixed left-1/2 -translate-x-1/2 bottom-6 z-50 px-5 py-3 bg-[#FDE047] border-[3px] border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-black text-xs sm:text-sm text-black whitespace-nowrap"
          >
            {toastMsg}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Header */}
      <div className="text-center flex flex-col items-center gap-2 pt-1">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-[#FDE047] border-[3px] border-black rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] font-black text-xs text-black uppercase">
          🎯 Mission Get Rich
        </span>
        <h1 className="text-xl sm:text-3xl font-black text-black tracking-tight leading-tight">
          Nak Kaya?{' '}
          <span className="inline-block bg-[#10D989] px-3 py-0.5 border-[3px] border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -rotate-1">
            Set Target.
          </span>
        </h1>
      </div>

      {/* Subnav Pill Bar */}
      <div className="flex justify-center">
        <div className="inline-flex gap-1.5 p-1.5 bg-white border-[3px] border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          {(['Target 🎯', 'Blueprint 📈', 'Saved Goals 💾'] as const).map(
            (label, idx) => {
              const isOn = subtab === idx;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSubtab(idx as 0 | 1 | 2)}
                  className={`px-4 py-2 rounded-lg font-black text-xs sm:text-sm transition-all cursor-pointer ${
                    isOn
                      ? 'bg-[#10D989] text-black border-[2px] border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                      : 'border-[2px] border-transparent hover:bg-[#FDE047]'
                  }`}
                >
                  {label}
                </button>
              );
            }
          )}
        </div>
      </div>

      {/* PANEL 0: TARGET WIZARD (3 SLIDING STEPS + 3D FLIP TILES) */}
      {subtab === 0 && (
        <div className="bg-white border-[3px] border-black rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-5 flex flex-col gap-4">
          {/* 3 Wizard Progress Dots */}
          <div className="flex justify-center gap-2.5">
            {[0, 1, 2].map((dotIdx) => (
              <span
                key={dotIdx}
                className={`h-3.5 border-[2px] border-black transition-all duration-300 ${
                  wizStep === dotIdx
                    ? 'w-10 rounded-full bg-[#10D989]'
                    : 'w-3.5 rounded-full bg-[#F3F4F6]'
                }`}
              />
            ))}
          </div>

          <div className="overflow-hidden rounded-xl">
            <div
              style={{
                transform: `translateX(-${wizStep * 100}%)`,
                transition: 'transform 0.55s cubic-bezier(0.3, 1.6, 0.5, 1)',
              }}
              className="flex"
            >
              {/* STEP 0: Pick Goal */}
              <div className="min-w-full p-1 flex flex-col gap-4">
                <h2 className="text-lg sm:text-2xl font-black text-center text-black">
                  Apa end-goal kau actually? 🤔
                </h2>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {VIDEO_GOALS.map((g) => {
                    const isPicked = pickedGoalKey === g.k;
                    return (
                      <button
                        key={g.k}
                        type="button"
                        onClick={(e) => {
                          setPickedGoalKey(g.k);
                          burstEmoji(e.clientX, e.clientY, g.e, 5);
                        }}
                        className="perspective-1000 h-28 sm:h-32 cursor-pointer bg-transparent border-none p-0 text-center"
                      >
                        <div
                          className={`relative w-full h-full transition-transform duration-500 preserve-3d ${
                            isPicked ? 'rotate-y-180' : ''
                          }`}
                        >
                          <div
                            className={`absolute inset-0 backface-hidden ${g.bg} border-[3px] border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col items-center justify-center gap-1 p-2 font-black hover:-translate-y-0.5 transition-transform`}
                          >
                            <span className="text-2xl sm:text-3xl">{g.e}</span>
                            <span className="text-xs sm:text-sm leading-tight">
                              {g.n}
                            </span>
                            {g.s && (
                              <small className="text-[10px] opacity-80 font-bold">
                                {g.s}
                              </small>
                            )}
                          </div>

                          <div className="absolute inset-0 backface-hidden rotate-y-180 bg-[#10D989] text-black border-[3px] border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col items-center justify-center gap-1 p-2 font-black">
                            <span className="text-2xl sm:text-3xl">{g.e}</span>
                            <span className="text-xs sm:text-sm">
                              Locked in ✅
                            </span>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {pickedGoalKey === 'custom' && (
                  <div className="flex flex-col gap-1.5 max-w-xl mx-auto w-full">
                    <label className="text-xs font-black uppercase tracking-wider text-black">
                      GOAL KAU APA? ✍️
                    </label>
                    <input
                      type="text"
                      maxLength={40}
                      value={customTxt}
                      onChange={(e) => setCustomTxt(e.target.value)}
                      placeholder="cth: Konsert Coldplay 🎤"
                      className="w-full border-[3px] border-black rounded-xl px-4 py-2.5 text-sm sm:text-base font-bold bg-[#F3F4F6] focus:bg-[#FDE047] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] outline-none"
                    />
                  </div>
                )}

                {canStep0Next && (
                  <div className="flex justify-center pt-1">
                    <button
                      type="button"
                      onClick={() => setWizStep(1)}
                      className="neo-btn px-7 py-3 bg-[#10D989] rounded-xl font-black text-sm sm:text-base text-black cursor-pointer"
                    >
                      Next ➡️
                    </button>
                  </div>
                )}
              </div>

              {/* STEP 1: Budget Amount */}
              <div className="min-w-full p-1 flex flex-col items-center gap-4">
                <h2 className="text-lg sm:text-2xl font-black text-center text-black">
                  Berapa budget kau perlukan tbh? 💰
                </h2>

                <div className="w-full max-w-md mt-1">
                  <label className="flex items-center border-[3px] border-black rounded-xl bg-[#F3F4F6] focus-within:bg-[#FDE047] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] px-4 py-2.5 transition-colors">
                    <span className="font-black text-xl sm:text-2xl mr-2">
                      RM
                    </span>
                    <input
                      type="number"
                      min={1}
                      value={amtInput}
                      onChange={(e) => {
                        setAmtInput(e.target.value);
                        setAmtErr('');
                      }}
                      placeholder="10000"
                      className="w-full text-center font-mono-rubik text-2xl sm:text-4xl outline-none bg-transparent"
                    />
                  </label>
                </div>

                <div className="flex flex-wrap justify-center gap-2">
                  {[5000, 10000, 30000, 50000, 100000].map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={(e) => {
                        setAmtInput(String(val));
                        setAmtErr('');
                        burstEmoji(e.clientX, e.clientY, '💰', 4);
                      }}
                      className="px-3.5 py-1.5 bg-[#FDE047] border-[2px] border-black rounded-lg shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] font-black text-xs cursor-pointer"
                    >
                      RM{val / 1000}K
                    </button>
                  ))}
                </div>

                {amtErr && (
                  <div className="text-xs font-black text-[#FF4766]">
                    {amtErr}
                  </div>
                )}

                <div className="flex items-center justify-center gap-3 mt-1">
                  <button
                    type="button"
                    onClick={() => setWizStep(0)}
                    className="neo-btn px-5 py-2.5 bg-white rounded-xl font-black text-xs sm:text-sm cursor-pointer"
                  >
                    ⬅️ Back
                  </button>
                  <button
                    type="button"
                    onClick={handleStep1Next}
                    className="neo-btn px-7 py-2.5 bg-[#10D989] rounded-xl font-black text-sm sm:text-base cursor-pointer"
                  >
                    Next ➡️
                  </button>
                </div>
              </div>

              {/* STEP 2: Target Year */}
              <div className="min-w-full p-1 flex flex-col items-center gap-4">
                <h2 className="text-lg sm:text-2xl font-black text-center text-black">
                  Bila kau nak hit target ni? 🗓️
                </h2>

                <div className="flex items-center justify-center gap-3 mt-1">
                  <button
                    type="button"
                    onClick={() => setYearInput((y) => y - 1)}
                    className="w-12 h-12 rounded-xl bg-[#FF4766] text-white border-[3px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] font-black text-xl flex items-center justify-center cursor-pointer"
                  >
                    −
                  </button>

                  <label className="w-44 border-[3px] border-black rounded-xl bg-[#F3F4F6] focus-within:bg-[#FDE047] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] py-2 px-3">
                    <input
                      type="number"
                      value={yearInput}
                      onChange={(e) =>
                        setYearInput(
                          parseInt(e.target.value, 10) || currentYear
                        )
                      }
                      className="w-full text-center font-mono-rubik text-2xl sm:text-3xl outline-none bg-transparent"
                    />
                  </label>

                  <button
                    type="button"
                    onClick={() => setYearInput((y) => y + 1)}
                    className="w-12 h-12 rounded-xl bg-[#10D989] text-black border-[3px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] font-black text-xl flex items-center justify-center cursor-pointer"
                  >
                    +
                  </button>
                </div>

                <div className="flex flex-wrap justify-center gap-2">
                  {[1, 3, 5, 10].map((addY) => (
                    <button
                      key={addY}
                      type="button"
                      onClick={() => setYearInput(currentYear + addY)}
                      className="px-3.5 py-1.5 bg-[#3B82F6] text-white border-[2px] border-black rounded-lg shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] font-black text-xs cursor-pointer"
                    >
                      +{addY} tahun
                    </button>
                  ))}
                </div>

                {yrDiffPreview >= 1 ? (
                  <div className="text-sm sm:text-base font-black text-black">
                    Lagi {yrDiffPreview} tahun ({yrDiffPreview * 12} bulan){' '}
                    {yrDiffPreview <= 2
                      ? '⚡ Laju!'
                      : yrDiffPreview <= 5
                      ? '👌 Ngam'
                      : '🧘 Long game'}
                  </div>
                ) : (
                  <div className="text-xs font-black text-[#FF4766]">
                    {yrErr ||
                      `Kena at least ${currentYear + 1} bro. Time machine takde lagi 😅`}
                  </div>
                )}

                <div className="flex items-center justify-center gap-3 mt-1 flex-wrap">
                  <button
                    type="button"
                    onClick={() => setWizStep(1)}
                    className="neo-btn px-5 py-2.5 bg-white rounded-xl font-black text-xs sm:text-sm cursor-pointer"
                  >
                    ⬅️ Back
                  </button>
                  <button
                    type="button"
                    onClick={handleGenerateBlueprint}
                    className="neo-btn px-7 py-3 bg-[#10D989] rounded-xl font-black text-sm sm:text-base text-black cursor-pointer"
                  >
                    Generate Blueprint Sekarang! 🚀
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PANEL 1: BLUEPRINT */}
      {subtab === 1 && (
        <div>
          {!bpReady ? (
            <div className="bg-white border-[3px] border-dashed border-black rounded-2xl p-8 text-center flex flex-col items-center gap-3 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <span className="text-5xl animate-bob">🎯</span>
              <h3 className="text-lg font-black">Set target dulu bro</h3>
              <p className="text-xs font-bold text-neutral-600">
                Pilih goal, amount, tahun. Then baru magic jadi.
              </p>
              <button
                type="button"
                onClick={() => setSubtab(0)}
                className="neo-btn mt-1 px-5 py-2.5 bg-[#10D989] rounded-xl font-black text-xs sm:text-sm cursor-pointer"
              >
                Gi Set Target 🎯
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <div className="text-center">
                <span className="inline-flex items-center gap-1.5 px-4 py-1 bg-[#FDE047] border-[2px] border-black rounded-lg shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] font-black text-xs sm:text-sm">
                  {bpGoal.e} {bpGoal.n} • {fmtRM(bpAmt)} • {bpYear}
                </span>
              </div>

              {/* 3-Way Risk Profile Selector */}
              <div className="grid grid-cols-3 border-[3px] border-black rounded-xl bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-1.5 max-w-2xl mx-auto w-full gap-1">
                {(
                  [
                    ['safe', '🛡️ Safe', '5% setahun', 'bg-[#3B82F6] text-white'],
                    [
                      'mid',
                      '⚖️ Balanced',
                      '8.5% setahun',
                      'bg-[#FDE047] text-black',
                    ],
                    [
                      'aggr',
                      '🎢 Aggressive',
                      '12.5% setahun',
                      'bg-[#FB923C] text-black',
                    ],
                  ] as const
                ).map(([rk, label, sub, bg]) => {
                  const active = risk === rk;
                  return (
                    <button
                      key={rk}
                      type="button"
                      onClick={() => setRisk(rk)}
                      className={`py-2 px-2 rounded-lg font-black text-xs leading-tight transition-all cursor-pointer ${
                        active
                          ? `${bg} border-[2px] border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]`
                          : 'border-[2px] border-transparent hover:bg-[#F3F4F6]'
                      }`}
                    >
                      <div>{label}</div>
                      <small className="block text-[10px] opacity-85">
                        {sub}
                      </small>
                    </button>
                  );
                })}
              </div>

              {/* Monthly Target Readout */}
              <div className="bg-white border-[3px] border-black rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-5 text-center flex flex-col items-center gap-1">
                <div className="text-sm sm:text-base font-black uppercase">
                  Kau kena park setiap bulan:
                </div>
                <div className="font-mono-rubik text-4xl sm:text-6xl text-[#10D989] leading-none my-1 drop-shadow-[3px_3px_0px_#000000]">
                  {fmtRM(pmt)}
                </div>

                <div className="mt-2">
                  {surplus >= pmt ? (
                    <span className="inline-block px-4 py-1.5 bg-[#10D989] border-[2px] border-black rounded-lg font-black text-xs">
                      ✅ Baki bajet kau {fmtRM(surplus)}/bln. Cukup! Legit boleh.
                    </span>
                  ) : (
                    <span className="inline-block px-4 py-1.5 bg-[#FF4766] text-white border-[2px] border-black rounded-lg font-black text-xs">
                      😬 Baki bajet kau {fmtRM(surplus)}/bln. Kurang{' '}
                      {fmtRM(pmt - Math.max(0, surplus))}. Tambah tahun atau
                      potong healing.
                    </span>
                  )}
                </div>
              </div>

              {/* Compound Magic Chart Card */}
              <div className="bg-white border-[3px] border-black rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-4 sm:p-5">
                <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
                  <b className="font-black text-sm sm:text-base">
                    📈 Compound Magic
                  </b>
                  <span className="text-xs font-extrabold text-neutral-700">
                    🟩 Bag kau • ➖ Modal kau
                  </span>
                </div>

                <div
                  style={{
                    background:
                      'repeating-linear-gradient(0deg, #fff 0 39px, #e5e7eb 39px 40px)',
                  }}
                  className="relative h-60 sm:h-64 border-[3px] border-black rounded-xl overflow-hidden"
                >
                  <svg
                    viewBox="0 0 600 300"
                    preserveAspectRatio="none"
                    className="absolute inset-0 w-full h-full"
                  >
                    <path
                      d={chartData.area}
                      fill="#10D989"
                      fillOpacity="0.5"
                    />
                    <path
                      d={chartData.dep}
                      fill="none"
                      stroke="#000000"
                      strokeWidth="3"
                      strokeDasharray="8 8"
                      vectorEffect="non-scaling-stroke"
                    />
                    <path
                      ref={pathRef}
                      d={chartData.line}
                      fill="none"
                      stroke="#000000"
                      strokeWidth="5"
                      strokeLinejoin="round"
                      vectorEffect="non-scaling-stroke"
                    />
                    <line
                      x1="0"
                      x2="600"
                      y1={chartData.ty}
                      y2={chartData.ty}
                      stroke="#FF4766"
                      strokeWidth="3"
                      strokeDasharray="10 6"
                      vectorEffect="non-scaling-stroke"
                    />
                  </svg>

                  <span
                    style={{ top: `${(chartData.ty / 300) * 100}%` }}
                    className="absolute right-2.5 -translate-y-full bg-[#FDE047] border-[2px] border-black rounded-lg px-2.5 py-0.5 font-black text-xs"
                  >
                    🎯 {fmtRM(bpAmt)}
                  </span>

                  <span
                    style={{
                      left: `${rocketPos.xPct}%`,
                      top: `${rocketPos.yPct}%`,
                      transform: `translate(-50%, -60%) rotate(${rocketPos.angle}deg)`,
                    }}
                    className="absolute text-3xl pointer-events-none"
                  >
                    🚀
                  </span>
                </div>

                <div className="flex justify-between font-black text-xs mt-2">
                  <span>{currentYear} (now)</span>
                  <span>{bpYear} 🏁</span>
                </div>

                {/* 3 Bold Stat Boxes */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
                  <div className="bg-[#3B82F6] text-white border-[3px] border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-3 text-center">
                    <div className="text-[11px] font-black uppercase">
                      MODAL KAU 💵
                    </div>
                    <div className="font-mono-rubik text-base sm:text-lg mt-0.5">
                      {fmtRM(pmt * nMonths)}
                    </div>
                  </div>

                  <div className="bg-[#10D989] text-black border-[3px] border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-3 text-center">
                    <div className="text-[11px] font-black uppercase">
                      FREE MONEY 🤑
                    </div>
                    <div className="font-mono-rubik text-base sm:text-lg mt-0.5">
                      {fmtRM(Math.max(0, bpAmt - pmt * nMonths))}
                    </div>
                  </div>

                  <div className="bg-[#FDE047] text-black border-[3px] border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-3 text-center">
                    <div className="text-[11px] font-black uppercase">
                      TEMPOH ⏳
                    </div>
                    <div className="font-mono-rubik text-base sm:text-lg mt-0.5">
                      {nMonths / 12} TAHUN
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={handleLockAndSave}
                  className="neo-btn px-7 py-3.5 bg-[#10D989] rounded-xl font-black text-sm sm:text-base text-black cursor-pointer"
                >
                  Lock In &amp; Save Blueprint Ni 💾
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('t5')}
                  className="neo-btn px-6 py-3.5 bg-[#FDE047] rounded-xl font-black text-sm sm:text-base text-black cursor-pointer"
                >
                  Next: Simulator Arcade 🕹️
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* PANEL 2: SAVED GOALS */}
      {subtab === 2 && (
        <div className="flex flex-col gap-4">
          <h2 className="text-xl sm:text-2xl font-black text-center text-black">
            Saved Goals Kau 💾
          </h2>

          {savedGoals.length === 0 ? (
            <div className="bg-white border-[3px] border-dashed border-black rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-8 text-center flex flex-col items-center gap-2.5">
              <span className="text-5xl animate-bob">🫙</span>
              <h3 className="text-lg font-black">Kosong lagi ngl</h3>
              <p className="text-xs font-bold text-neutral-700 mb-2">
                Buat blueprint pertama kau. Literally 30 saat je.
              </p>
              <button
                type="button"
                onClick={() => setSubtab(0)}
                className="neo-btn px-5 py-2.5 bg-[#10D989] rounded-xl font-black text-xs sm:text-sm cursor-pointer"
              >
                Set Target 🎯
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {savedGoals.map((x) => {
                const p = Math.min(100, (x.saved / x.amt) * 100);
                const isConfirming = confirmDeleteId === x.id;
                return (
                  <div
                    key={x.id}
                    style={{
                      backgroundColor: GOAL_RISK_COLORS[x.risk] || '#FDE047',
                    }}
                    className="relative border-[3px] border-black rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-4 flex flex-col gap-2.5 overflow-hidden"
                  >
                    <div className="flex justify-between items-start gap-2">
                      <span className="text-3xl">{x.e}</span>
                      <button
                        type="button"
                        onClick={() => setConfirmDeleteId(x.id)}
                        aria-label="Delete goal"
                        className="w-10 h-10 rounded-xl bg-[#FF4766] text-white border-[3px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center text-base cursor-pointer"
                      >
                        🗑️
                      </button>
                    </div>

                    <h4 className="text-base font-black text-black">
                      {x.n}
                    </h4>

                    <div className="flex flex-wrap gap-1.5">
                      <span className="text-[11px] font-black border-[2px] border-black rounded-md px-2 py-0.5 bg-white">
                        🎯 {fmtRM(x.amt)}
                      </span>
                      <span className="text-[11px] font-black border-[2px] border-black rounded-md px-2 py-0.5 bg-white">
                        🗓️ {x.year}
                      </span>
                      <span className="text-[11px] font-black border-[2px] border-black rounded-md px-2 py-0.5 bg-white">
                        🅿️ {fmtRM(x.pmt)}/bln
                      </span>
                    </div>

                    <div className="flex justify-between font-black text-xs">
                      <span>Progress</span>
                      <span>
                        {fmtRM(x.saved)} ({p.toFixed(0)}%)
                        {p >= 100 ? ' 🏆' : ''}
                      </span>
                    </div>

                    <div className="h-3.5 border-[2px] border-black rounded-full bg-white overflow-hidden">
                      <div
                        style={{ width: `${p}%` }}
                        className="h-full bg-[#10D989] border-r-[2px] border-black transition-all duration-500"
                      />
                    </div>

                    <div className="flex gap-2 mt-1">
                      <label className="flex-1 flex items-center border-[2px] border-black rounded-lg bg-white px-2.5 py-1">
                        <span className="text-xs font-black mr-1">RM</span>
                        <input
                          type="number"
                          min={0}
                          placeholder="Topup?"
                          value={topupInputs[x.id] || ''}
                          onChange={(e) =>
                            setTopupInputs({
                              ...topupInputs,
                              [x.id]: e.target.value,
                            })
                          }
                          className="w-full font-black text-xs outline-none bg-transparent"
                        />
                      </label>
                      <button
                        type="button"
                        onClick={(e) => {
                          const add = Math.max(
                            0,
                            parseFloat(topupInputs[x.id] || '0') || 0
                          );
                          if (!add) return;
                          const next = savedGoals.map((item) =>
                            item.id === x.id
                              ? { ...item, saved: item.saved + add }
                              : item
                          );
                          onSaveGoals(next);
                          setTopupInputs({ ...topupInputs, [x.id]: '' });
                          burstEmoji(e.clientX, e.clientY, '💵', 5);
                        }}
                        className="px-3 py-1 bg-[#10D989] border-[2px] border-black rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-black text-xs cursor-pointer"
                      >
                        + Add
                      </button>
                    </div>

                    {/* Full-card Red Delete Confirmation Overlay */}
                    {isConfirming && (
                      <div className="absolute inset-0 bg-[#FF4766] text-white p-4 flex flex-col items-center justify-center text-center gap-2.5 z-10">
                        <div className="text-base font-black">
                          Kau sure nak delete ni? 😳
                        </div>
                        <div className="flex gap-2.5">
                          <button
                            type="button"
                            onClick={() => setConfirmDeleteId(null)}
                            className="px-3.5 py-1.5 bg-white text-black border-[2px] border-black rounded-lg font-black text-xs cursor-pointer"
                          >
                            Batal
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              onSaveGoals(
                                savedGoals.filter((item) => item.id !== x.id)
                              );
                              setConfirmDeleteId(null);
                              showToast('🗑️ Goal dah kena delete.');
                            }}
                            className="px-3.5 py-1.5 bg-black text-white border-[2px] border-white rounded-lg font-black text-xs cursor-pointer"
                          >
                            Delete 🗑️
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </section>
  );
};
