import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

export type TabId =
  | 't1'
  | 't2'
  | 't3'
  | 't4'
  | 't5'
  | 't6'
  | 't7'
  | 't8'
  | 't9';

export type ViewportMode = 'desktop' | 'tablet' | 'mobile';

export interface ModuleItem {
  id: TabId;
  emoji: string;
  title: string;
  subtitle: string;
  badgeName: string;
}

export const MODULES: ModuleItem[] = [
  {
    id: 't1',
    emoji: '🌱',
    title: '1. Baru Nak Up',
    subtitle: 'Inflasi & Boba',
    badgeName: 'Boba Survivor',
  },
  {
    id: 't2',
    emoji: '🎲',
    title: '2. Vibe Check Risiko',
    subtitle: '10 Soalan DNA',
    badgeName: 'Risk Checked',
  },
  {
    id: 't3',
    emoji: '💸',
    title: '3. Pokai Tapi Bajet',
    subtitle: 'Kira Duit & Damage',
    badgeName: 'Budget Boss',
  },
  {
    id: 't4',
    emoji: '🎯',
    title: '4. Mission Get Rich',
    subtitle: 'Lock Impian Kau',
    badgeName: 'Goal Getter',
  },
  {
    id: 't5',
    emoji: '🕹️',
    title: '5. Simulator Arcade',
    subtitle: 'Time Travel Market',
    badgeName: 'Time Traveler',
  },
  {
    id: 't6',
    emoji: '🗺️',
    title: '6. Port Duit Pergi',
    subtitle: 'Safe vs Risky Asset',
    badgeName: 'Asset Master',
  },
  {
    id: 't7',
    emoji: '📖',
    title: '7. Kamus Pelabur',
    subtitle: 'Lingo & Brain Test',
    badgeName: 'Lingo Master',
  },
  {
    id: 't8',
    emoji: '🌙',
    title: '8. Halal Or Nah?',
    subtitle: 'Syariah & Platform',
    badgeName: 'Halal Hunter',
  },
  {
    id: 't9',
    emoji: '🎓',
    title: '9. Final Boss Quiz',
    subtitle: 'Boss Level Check',
    badgeName: 'InvestLAH Certified',
  },
];

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  activeTab: TabId;
  onSelectTab: (tab: TabId) => void;
  visitedTabs: TabId[];
  riskVibeLabel: string;
  monthlyBudget: number;
  monthlySurplus: number;
  badgeCount: number;
  viewportMode: ViewportMode;
  onChangeViewport: (mode: ViewportMode) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onToggle,
  onClose,
  activeTab,
  onSelectTab,
  riskVibeLabel,
  monthlyBudget,
  monthlySurplus,
  badgeCount,
  viewportMode,
  onChangeViewport,
}) => {
  const activeModule = MODULES.find((m) => m.id === activeTab) || MODULES[0];
  const surplusPrefix = monthlySurplus >= 0 ? '+' : '-';
  const formattedSurplus = `${surplusPrefix}RM ${Math.round(
    Math.abs(monthlySurplus)
  )}`;

  return (
    <>
      {/* Global Sticky Top Navbar */}
      <header className="sticky top-0 z-40 w-full bg-white border-b-[3px] border-black px-3 sm:px-6 py-2.5">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-2 sm:gap-4 flex-wrap">
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Trigger Button: Menu Tab */}
            <motion.button
              type="button"
              onClick={onToggle}
              whileHover={{ x: -1, y: -1 }}
              whileTap={{ x: 4, y: 4 }}
              className="inline-flex items-center gap-2 px-3.5 py-2 bg-[#FDE047] border-[3px] border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none font-black text-xs sm:text-sm text-black cursor-pointer select-none whitespace-nowrap"
            >
              <span className="text-lg leading-none font-black">≡</span>
              <span>Menu Tab</span>
            </motion.button>

            {/* Brand Pill */}
            <button
              type="button"
              onClick={() => onSelectTab('t1')}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#10D989] border-[3px] border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-none font-black text-xs sm:text-sm text-black whitespace-nowrap cursor-pointer"
            >
              <span>⚡ InvestLAH</span>
            </button>
          </div>

          {/* Current Active Module Indicator */}
          <div className="hidden lg:flex items-center gap-2 px-3.5 py-1.5 bg-[#F3F4F6] border-[3px] border-black rounded-xl font-extrabold text-xs text-black">
            <span>{activeModule.emoji}</span>
            <span>{activeModule.title}</span>
            <span className="text-neutral-600 font-bold">
              · {activeModule.subtitle}
            </span>
          </div>

          {/* Viewport Toggle Group (Desktop 💻 | Tablet 📱 | Mobile 📲) */}
          <div
            className="inline-flex items-center bg-[#F3F4F6] border-[3px] border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-1 gap-1"
            role="group"
            aria-label="Switch viewport size"
          >
            {(
              [
                { id: 'desktop', label: 'Desktop 💻' },
                { id: 'tablet', label: 'Tablet 📱' },
                { id: 'mobile', label: 'Mobile 📲' },
              ] as const
            ).map(({ id, label }) => {
              const isActive = viewportMode === id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => onChangeViewport(id)}
                  title={`Switch to ${label}`}
                  className={`px-2.5 py-1 rounded-lg font-black text-xs transition-all cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-[#3B82F6] text-white border-[2px] border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                      : 'text-black hover:bg-[#FDE047] border-[2px] border-transparent'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Off-Canvas Drawer & Backdrop Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Dark Semi-Transparent Backdrop Overlay */}
            <motion.div
              key="sidebar-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/65 z-50 cursor-pointer"
              aria-label="Close sidebar overlay"
            />

            {/* Full-Height Sidebar Container */}
            <motion.aside
              key="sidebar-panel"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 360, damping: 32 }}
              className="fixed top-0 left-0 bottom-0 w-full max-w-[360px] bg-white border-r-[3px] border-black shadow-[8px_0px_0px_0px_rgba(0,0,0,1)] z-50 flex flex-col justify-between overflow-y-auto p-4 sm:p-5 gap-4"
            >
              {/* 1. Header Section */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between gap-2">
                  {/* Logo Badge */}
                  <div className="flex flex-col px-3.5 py-1.5 bg-[#10D989] border-[3px] border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <span className="font-black text-sm leading-tight text-black tracking-tight">
                      ⚡ InvestLAH
                    </span>
                    <span className="text-[9px] font-black tracking-wider text-black uppercase">
                      GEN Z MONEY PLAYBOOK
                    </span>
                  </div>

                  {/* Close Button */}
                  <motion.button
                    type="button"
                    onClick={onClose}
                    whileHover={{ scale: 1.04, y: -1 }}
                    whileTap={{ x: 3, y: 3 }}
                    className="px-3.5 py-2 bg-[#FF4766] text-white font-black text-xs border-[3px] border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] cursor-pointer whitespace-nowrap"
                  >
                    ❌ Tutup
                  </motion.button>
                </div>

                {/* 2. Module Navigation (9 Tabs) */}
                <div className="flex flex-col gap-2">
                  <div className="text-[11px] font-black tracking-wider text-black uppercase px-1">
                    ⚡ PILIH BAB PEMBELAJARAN (9 MODUL)
                  </div>

                  <nav className="flex flex-col gap-2">
                    {MODULES.map((mod) => {
                      const isActive = activeTab === mod.id;
                      const isBoss = mod.id === 't9';
                      return (
                        <motion.button
                          key={mod.id}
                          type="button"
                          onClick={() => {
                            onSelectTab(mod.id);
                            onClose();
                          }}
                          whileHover={{ x: 2, y: 2 }}
                          whileTap={{ x: 4, y: 4 }}
                          className={`w-full flex items-center justify-between gap-2 px-3.5 py-2.5 border-[3px] border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-colors text-left cursor-pointer ${
                            isActive
                              ? 'bg-[#10D989] text-black'
                              : isBoss
                              ? 'bg-[#FDE047] hover:bg-[#FB923C] text-black'
                              : 'bg-[#F3F4F6] hover:bg-[#FDE047] text-black'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <span className="text-lg shrink-0">
                              {mod.emoji}
                            </span>
                            <div className="flex flex-col min-w-0">
                              <span className="font-black text-xs sm:text-sm text-black truncate">
                                {mod.title}
                              </span>
                              <span className="text-[11px] font-bold text-neutral-700 truncate">
                                ({mod.subtitle})
                              </span>
                            </div>
                          </div>

                          {isActive && (
                            <span className="shrink-0 px-2 py-0.5 bg-white text-black font-black text-[10px] border-[2px] border-black rounded-md">
                              AKTIF
                            </span>
                          )}
                        </motion.button>
                      );
                    })}
                  </nav>
                </div>
              </div>

              {/* 3. Stats & Gamification Section (Bottom) */}
              <div className="flex flex-col gap-2 pt-1">
                <div className="flex items-center justify-between gap-2 px-1">
                  <span className="text-[11px] font-black tracking-wider text-black uppercase">
                    📈 STATS AKAUN KAU
                  </span>
                  <span className="px-2.5 py-0.5 bg-[#FDE047] border-[2px] border-black rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-black text-xs text-black">
                    {badgeCount}/8 Lencana 🏅
                  </span>
                </div>

                <div className="bg-[#F3F4F6] border-[3px] border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-3 flex flex-col divide-y-2 divide-dashed divide-black/30">
                  <div className="flex items-center justify-between gap-2 pb-2">
                    <span className="text-xs font-extrabold text-black">
                      Risk Vibe:
                    </span>
                    <span className="px-2.5 py-0.5 bg-[#3B82F6] text-white border-[2px] border-black rounded-lg font-black text-xs">
                      {riskVibeLabel}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-2 py-2">
                    <span className="text-xs font-extrabold text-black">
                      Bajet Bulanan:
                    </span>
                    <span className="text-xs font-black text-black">
                      RM {Math.round(monthlyBudget)}/bln
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-2 pt-2">
                    <span className="text-xs font-extrabold text-black">
                      Baki Bersih:
                    </span>
                    <span
                      className={`px-2 py-0.5 border-[2px] border-black rounded-md text-xs font-black ${
                        monthlySurplus >= 0
                          ? 'bg-[#10D989] text-black'
                          : 'bg-[#FF4766] text-white'
                      }`}
                    >
                      {formattedSurplus}
                    </span>
                  </div>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
