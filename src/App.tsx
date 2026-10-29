/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Sidebar, TabId, ViewportMode } from './components/Sidebar';
import {
  Tab1BaruNakUp,
  Tab2RiskProfile,
  Tab3Bajet,
  Tab4Goals,
  RiskKey,
  RISK_PROFILES,
  BudgetState,
  DEFAULT_BUDGET_STATE,
  computeBudgetTotals,
  SavedGoalItem,
} from './components/Tabs1To4';
import { Tab5Simulator } from './components/Tab5Simulator';
import { Tab6Assets } from './components/Tab6Assets';
import { Tab7Lingo, Tab8Halal } from './components/Tabs7To8';
import {
  Tab9BossQuiz,
  EIGHT_MODULE_BADGES,
} from './components/Tab9BossQuiz';
import { storage } from './utils/fx';

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<TabId>('t1');
  const [viewportMode, setViewportMode] = useState<ViewportMode>('desktop');
  const [visitedTabs, setVisitedTabs] = useState<TabId[]>(() =>
    storage.get<TabId[]>('visited', ['t1'])
  );

  // Persistent Risk Profile state
  const [riskKey, setRiskKey] = useState<RiskKey | null>(() =>
    storage.get<RiskKey | null>('risk', null)
  );
  const [riskScore, setRiskScore] = useState<number>(() =>
    storage.get<number>('riskS', 12)
  );

  // Persistent Budget state
  const [budget, setBudget] = useState<BudgetState>(() =>
    storage.get<BudgetState>('budget_v3', DEFAULT_BUDGET_STATE)
  );

  // Persistent Goals state
  const [savedGoals, setSavedGoals] = useState<SavedGoalItem[]>(() =>
    storage.get<SavedGoalItem[]>('goals', [])
  );

  // Persistent Tab 6 Asset Sorting state
  const [sortedDone, setSortedDone] = useState<boolean>(() =>
    storage.get<boolean>('sorted', false)
  );

  // Persistent Badges state
  const [badges, setBadges] = useState<string[]>(() =>
    storage.get<string[]>('badges', [])
  );

  const handleSelectTab = (tab: TabId) => {
    setActiveTab(tab);
    if (!visitedTabs.includes(tab)) {
      const nextVisited = [...visitedTabs, tab];
      setVisitedTabs(nextVisited);
      storage.set('visited', nextVisited);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSaveRisk = (rk: RiskKey, score: number) => {
    setRiskKey(rk);
    setRiskScore(score);
    storage.set('risk', rk);
    storage.set('riskS', score);
  };

  const handleChangeBudget = (next: BudgetState) => {
    setBudget(next);
    storage.set('budget_v3', next);
  };

  const handleSaveGoals = (next: SavedGoalItem[]) => {
    setSavedGoals(next);
    storage.set('goals', next);
  };

  const handleUnlockSort = () => {
    setSortedDone(true);
    storage.set('sorted', true);
  };

  const handleAwardBadge = (ribbon: string) => {
    if (!badges.includes(ribbon)) {
      const next = [...badges, ribbon];
      setBadges(next);
      storage.set('badges', next);
    }
  };

  const handleUnlockAllBadges = () => {
    const allEight = EIGHT_MODULE_BADGES.map((b) => b.badgeKey);
    const merged = Array.from(new Set([...badges, ...allEight]));
    setBadges(merged);
    storage.set('badges', merged);
  };

  // Sync URL hash if present on initial load
  useEffect(() => {
    const hash = window.location.hash.replace('#', '') as TabId;
    if (
      ['t1', 't2', 't3', 't4', 't5', 't6', 't7', 't8', 't9'].includes(hash)
    ) {
      setActiveTab(hash);
    }
  }, []);

  const { totalIn: monthlyBudget, surplus: monthlySurplus } =
    computeBudgetTotals(budget);

  const riskVibeLabel = riskKey
    ? RISK_PROFILES[riskKey].sidebarLabel
    : 'Balanced Bestie ⚖️';

  // Count how many of the 8 core module badges are earned
  const eightBadgeCount = EIGHT_MODULE_BADGES.filter(
    (b) => badges.includes(b.badgeKey) || visitedTabs.includes(b.id)
  ).length;

  // Container width class based on user's selected viewport mode (Desktop / Tablet / Mobile)
  const stageContainerClass =
    viewportMode === 'mobile'
      ? 'max-w-[410px] mx-auto my-6 bg-[#F7F9F6] border-[4px] border-black rounded-[32px] shadow-[10px_10px_0px_#0F172A] px-3.5 pt-5 pb-12 transition-all duration-300'
      : viewportMode === 'tablet'
      ? 'max-w-[768px] mx-auto my-6 bg-[#F7F9F6] border-[4px] border-black rounded-[28px] shadow-[10px_10px_0px_#0F172A] px-6 pt-6 pb-14 transition-all duration-300'
      : 'px-4 sm:px-6 md:px-10 pt-5 pb-16 transition-all duration-300';

  return (
    <div
      className={`min-h-screen text-[#0F172A] relative ${
        viewportMode === 'desktop' ? 'bg-[#F7F9F6]' : 'bg-[#E2E8F0]'
      }`}
    >
      {/* Full-Screen Confetti Canvas Overlay */}
      <canvas
        id="confetti-canvas"
        className="fixed inset-0 pointer-events-none z-[9999] w-screen h-screen"
      />

      {/* Sticky Global Navbar & Off-Canvas Sidebar (9 Modules) */}
      <Sidebar
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen((prev) => !prev)}
        onClose={() => setIsSidebarOpen(false)}
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        visitedTabs={visitedTabs}
        riskVibeLabel={riskVibeLabel}
        monthlyBudget={monthlyBudget}
        monthlySurplus={monthlySurplus}
        badgeCount={eightBadgeCount}
        viewportMode={viewportMode}
        onChangeViewport={setViewportMode}
      />

      {/* Main Content Area (Dynamically adapts to Desktop 💻 | Tablet 📱 | Mobile 📲) */}
      <main className={stageContainerClass}>
        {activeTab === 't1' && (
          <Tab1BaruNakUp
            onNavigate={handleSelectTab}
            onAwardBadge={handleAwardBadge}
          />
        )}
        {activeTab === 't2' && (
          <Tab2RiskProfile
            savedRisk={riskKey}
            savedScore={riskScore}
            onSaveRisk={handleSaveRisk}
            onNavigate={handleSelectTab}
            onAwardBadge={handleAwardBadge}
          />
        )}
        {activeTab === 't3' && (
          <Tab3Bajet
            budget={budget}
            onChangeBudget={handleChangeBudget}
            onNavigate={handleSelectTab}
            riskVibeLabel={riskVibeLabel}
            badgeCount={eightBadgeCount}
            onAwardBadge={handleAwardBadge}
          />
        )}
        {activeTab === 't4' && (
          <Tab4Goals
            surplus={monthlySurplus}
            defaultRisk={riskKey || 'mid'}
            savedGoals={savedGoals}
            onSaveGoals={handleSaveGoals}
            onNavigate={handleSelectTab}
            onAwardBadge={handleAwardBadge}
          />
        )}
        {activeTab === 't5' && (
          <Tab5Simulator
            onNavigate={handleSelectTab}
            onAwardBadge={handleAwardBadge}
          />
        )}
        {activeTab === 't6' && (
          <Tab6Assets
            sortedDone={sortedDone}
            onUnlockSort={handleUnlockSort}
            onAwardBadge={handleAwardBadge}
            onNavigate={handleSelectTab}
          />
        )}
        {activeTab === 't7' && (
          <Tab7Lingo
            onAwardBadge={handleAwardBadge}
            onNavigate={handleSelectTab}
          />
        )}
        {activeTab === 't8' && (
          <Tab8Halal
            onAwardBadge={handleAwardBadge}
            onNavigate={handleSelectTab}
          />
        )}
        {activeTab === 't9' && (
          <Tab9BossQuiz
            earnedBadges={badges}
            visitedTabs={visitedTabs}
            riskVibeLabel={riskVibeLabel}
            onAwardBadge={handleAwardBadge}
            onUnlockAllBadges={handleUnlockAllBadges}
            onNavigate={handleSelectTab}
          />
        )}
      </main>
    </div>
  );
}
