import React, { useState } from 'react';
import { motion } from 'motion/react';
import { fmtRM, floatEmoji } from '../utils/fx';
import { TabId } from './Sidebar';

interface Tab5SimulatorProps {
  onNavigate: (tab: TabId) => void;
  onAwardBadge?: (badge: string) => void;
}

interface RaceLane {
  id: string;
  emoji: string;
  name: string;
  subtitle: string;
  rate: number;
  barBgClass: string;
}

const RACE_LANES: RaceLane[] = [
  {
    id: 'bantal',
    emoji: '🛏️',
    name: 'Bawah Bantal',
    subtitle: '0% • literally tidur',
    rate: 0,
    barBgClass: 'bg-neutral-400',
  },
  {
    id: 'bank',
    emoji: '💳',
    name: 'Akaun Simpanan Bank',
    subtitle: '~1% setahun',
    rate: 0.01,
    barBgClass: 'bg-[#3B82F6]',
  },
  {
    id: 'fdi',
    emoji: '🏦',
    name: 'FD-i',
    subtitle: '~3% setahun',
    rate: 0.03,
    barBgClass: 'bg-[#FB923C]',
  },
  {
    id: 'asb',
    emoji: '🟡',
    name: 'ASB',
    subtitle: '~5% setahun',
    rate: 0.05,
    barBgClass: 'bg-[#10D989]',
  },
  {
    id: 'etf',
    emoji: '📈',
    name: 'ETF Saham',
    subtitle: '~8% setahun, naik turun',
    rate: 0.08,
    barBgClass: 'bg-[#FDE047]',
  },
];

function calcFutureValue(
  monthly: number,
  years: number,
  initial: number,
  annualRate: number
): number {
  const n = years * 12;
  const i = annualRate / 12;
  if (i === 0) {
    return initial + monthly * n;
  }
  return (
    initial * Math.pow(1 + i, n) +
    monthly * ((Math.pow(1 + i, n) - 1) / i)
  );
}

export const Tab5Simulator: React.FC<Tab5SimulatorProps> = ({
  onNavigate,
  onAwardBadge,
}) => {
  const [monthly, setMonthly] = useState<number>(100);
  const [years, setYears] = useState<number>(10);
  const [initial, setInitial] = useState<number>(0);
  const [deductInflation, setDeductInflation] = useState<boolean>(false);

  const inflationFactor = deductInflation ? Math.pow(1.03, years) : 1;

  const laneValues = RACE_LANES.map((lane) => {
    const raw = calcFutureValue(monthly, years, initial, lane.rate);
    return raw / inflationFactor;
  });

  const maxVal = Math.max(...laneValues, 1);
  const bantalValue = laneValues[0];
  const etfValue = laneValues[4];
  const diffVsBantal = etfValue - bantalValue;

  const delayedYears = Math.max(0, years - 5);
  const delayedInflationFactor = deductInflation
    ? Math.pow(1.03, delayedYears)
    : 1;
  const etfDelayedValue =
    years > 5
      ? calcFutureValue(monthly, delayedYears, initial, 0.08) /
        delayedInflationFactor
      : 0;
  const lossFromDelay = Math.max(0, etfValue - etfDelayedValue);

  const monthlyPct = ((monthly - 10) / (2000 - 10)) * 100;
  const yearsPct = ((years - 1) / (40 - 1)) * 100;
  const initialPct = (initial / 20000) * 100;

  return (
    <section className="max-w-4xl mx-auto flex flex-col gap-5 pb-10">
      {/* 1. Header Section */}
      <div className="text-center flex flex-col items-center gap-2 pt-1">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-[#FDE047] border-[3px] border-black rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] font-black text-xs uppercase">
          🕹️ Simulator Arcade
        </span>

        <h1 className="text-xl sm:text-3xl font-black tracking-tight text-black leading-tight">
          Kalau Kau Start{' '}
          <span className="inline-block bg-[#10D989] px-3 py-0.5 border-[3px] border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -rotate-1">
            Sekarang...
          </span>
        </h1>

        <p className="text-xs sm:text-sm font-bold text-neutral-700">
          Main slider. Tengok bag siapa menang race.
        </p>
      </div>

      {/* 2. The Input Controls (3 Chunky Sliders side-by-side) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border-[3px] border-black rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-4 flex flex-col justify-between gap-2">
          <div className="px-2.5 py-0.5 bg-[#10D989] border-[2px] border-black rounded-md self-start text-[11px] font-black uppercase tracking-wider text-black">
            SIMPAN SEBULAN 💵
          </div>
          <div className="font-mono-rubik text-xl sm:text-2xl text-black">
            {fmtRM(monthly)}
          </div>
          <input
            type="range"
            min={10}
            max={2000}
            step={10}
            value={monthly}
            onChange={(e) => setMonthly(Number(e.target.value))}
            onMouseUp={(e) => {
              onAwardBadge?.('Time Traveler');
              const rect = e.currentTarget.getBoundingClientRect();
              floatEmoji(
                rect.left + rect.width * (monthly / 2000),
                rect.top,
                '💵'
              );
            }}
            style={
              {
                '--p': `${monthlyPct}%`,
                '--fill': '#10D989',
              } as React.CSSProperties
            }
            className="chunky"
            aria-label="Simpan Sebulan"
          />
        </div>

        <div className="bg-white border-[3px] border-black rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-4 flex flex-col justify-between gap-2">
          <div className="px-2.5 py-0.5 bg-[#3B82F6] text-white border-[2px] border-black rounded-md self-start text-[11px] font-black uppercase tracking-wider">
            BERAPA LAMA ⏳
          </div>
          <div className="font-mono-rubik text-xl sm:text-2xl text-black">
            {years} tahun
          </div>
          <input
            type="range"
            min={1}
            max={40}
            step={1}
            value={years}
            onChange={(e) => {
              setYears(Number(e.target.value));
              onAwardBadge?.('Time Traveler');
            }}
            style={
              {
                '--p': `${yearsPct}%`,
                '--fill': '#3B82F6',
              } as React.CSSProperties
            }
            className="chunky"
            aria-label="Berapa Lama"
          />
        </div>

        <div className="bg-white border-[3px] border-black rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-4 flex flex-col justify-between gap-2">
          <div className="px-2.5 py-0.5 bg-[#FB923C] text-black border-[2px] border-black rounded-md self-start text-[11px] font-black uppercase tracking-wider">
            MODAL AWAL 💰
          </div>
          <div className="font-mono-rubik text-xl sm:text-2xl text-black">
            {fmtRM(initial)}
          </div>
          <input
            type="range"
            min={0}
            max={20000}
            step={100}
            value={initial}
            onChange={(e) => {
              setInitial(Number(e.target.value));
              onAwardBadge?.('Time Traveler');
            }}
            style={
              {
                '--p': `${initialPct}%`,
                '--fill': '#FB923C',
              } as React.CSSProperties
            }
            className="chunky"
            aria-label="Modal Awal"
          />
        </div>
      </div>

      {/* 3. Inflation Toggle */}
      <div className="flex justify-center">
        <div className="inline-flex items-center p-1.5 bg-white border-[3px] border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] gap-1.5">
          <button
            type="button"
            onClick={() => setDeductInflation(false)}
            className={`px-4 py-1.5 rounded-lg font-black text-xs sm:text-sm transition-all cursor-pointer ${
              !deductInflation
                ? 'bg-[#10D989] text-black border-[2px] border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                : 'bg-transparent text-black border-[2px] border-transparent hover:bg-[#F3F4F6]'
            }`}
          >
            💵 Nilai Nominal
          </button>

          <button
            type="button"
            onClick={() => setDeductInflation(true)}
            className={`px-4 py-1.5 rounded-lg font-black text-xs sm:text-sm transition-all cursor-pointer ${
              deductInflation
                ? 'bg-[#FF4766] text-white border-[2px] border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                : 'bg-transparent text-black border-[2px] border-transparent hover:bg-[#F3F4F6]'
            }`}
          >
            🎈 Tolak Inflasi 3%
          </button>
        </div>
      </div>

      {/* 4. The Hero Result Card */}
      <div className="bg-[#FDE047] border-[3px] border-black rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-5 text-center flex flex-col items-center gap-1.5">
        <div className="text-xs font-black uppercase tracking-wider text-black">
          KALAU MASUK ETF SAHAM 📈, BAG KAU JADI
        </div>

        <div className="font-mono-rubik text-3xl sm:text-5xl text-black leading-none my-1 drop-shadow-[3px_3px_0px_#FFFFFF]">
          {fmtRM(etfValue)}
        </div>

        <div className="text-xs sm:text-sm font-black text-black">
          vs bawah bantal <u>{fmtRM(bantalValue)}</u>. Beza{' '}
          <span className="px-2 py-0.5 bg-[#10D989] border-[2px] border-black rounded-md">
            {fmtRM(diffVsBantal)}
          </span>{' '}
          🤯{deductInflation ? ' (nilai hari ni)' : ''}
        </div>
      </div>

      {/* 5. The "Race Bag" Visualization — Standard Height Bars + HUGE Bold RM Numbers */}
      <div className="bg-white border-[3px] border-black rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-4 sm:p-5 flex flex-col gap-3.5">
        <div className="text-xs sm:text-sm font-black tracking-wider text-black uppercase border-b-[2px] border-black pb-2">
          🏁 RACE BAG SIAPA PALING BESAR
        </div>

        <div className="flex flex-col gap-3">
          {RACE_LANES.map((lane, idx) => {
            const amount = laneValues[idx];
            const widthPercent = Math.max(
              6,
              Math.min(72, (amount / maxVal) * 72)
            );
            const isWinner = idx === RACE_LANES.length - 1;

            return (
              <div
                key={lane.id}
                className="grid grid-cols-1 sm:grid-cols-12 gap-1.5 sm:gap-3 items-center"
              >
                {/* Vehicle Label */}
                <div className="sm:col-span-4 leading-tight">
                  <div className="font-black text-xs sm:text-sm text-black">
                    {lane.emoji} {lane.name}
                  </div>
                  <small className="block text-[11px] font-bold text-neutral-600">
                    {lane.subtitle}
                  </small>
                </div>

                {/* Standard Height Bar Track (h-10) with Extra-Large Bold RM Number */}
                <div className="sm:col-span-8 h-10 bg-[#F3F4F6] border-[3px] border-black rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden flex items-center">
                  <motion.span
                    initial={{ width: '6%' }}
                    animate={{ width: `${widthPercent}%` }}
                    transition={{ type: 'spring', stiffness: 220, damping: 26 }}
                    className={`h-full border-r-[3px] border-black ${lane.barBgClass}`}
                  />

                  <span
                    style={{ left: `${widthPercent}%` }}
                    className="absolute top-1/2 -translate-y-1/2 pl-2.5 font-mono-rubik text-lg sm:text-2xl font-black text-black whitespace-nowrap pointer-events-none transition-all duration-300"
                  >
                    {fmtRM(amount)}
                    {isWinner ? ' 👑' : ''}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 6. Cost of Delay & Footer */}
      <div className="bg-[#FB923C] border-[3px] border-black rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-4 sm:p-5 text-center flex flex-col items-center gap-1.5">
        <h3 className="text-base sm:text-lg font-black text-black">
          ⏱️ Start lambat 5 tahun?
        </h3>
        {years > 5 ? (
          <p className="text-xs sm:text-sm font-black text-black">
            Kau rugi{' '}
            <b className="px-2 py-0.5 bg-[#FF4766] text-white border-[2px] border-black rounded-md">
              {fmtRM(lossFromDelay)}
            </b>{' '}
            💸 Start awal = compound lagi power.
          </p>
        ) : (
          <p className="text-xs sm:text-sm font-black text-black">
            Set tempoh lebih 5 tahun untuk tengok damage kalau kau bertangguh 👀
          </p>
        )}
      </div>

      <p className="text-xs font-bold text-neutral-600 text-center">
        Anggaran je. Return lepas != janji masa depan. Kadar: Bank 1%, FD-i 3%,
        ASB 5%, ETF saham 8% setahun.
      </p>

      <div className="flex justify-center pt-1">
        <button
          type="button"
          onClick={() => {
            onAwardBadge?.('Time Traveler');
            onNavigate('t6');
          }}
          className="neo-btn px-7 py-3.5 bg-[#10D989] rounded-xl font-black text-sm sm:text-base text-black cursor-pointer"
        >
          Next: Port Duit Pergi (Tab 6) 🗺️
        </button>
      </div>
    </section>
  );
};
