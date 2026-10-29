import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { rnd, burstEmoji, fireBigConfetti, triggerShake } from '../utils/fx';
import { TabId } from './Sidebar';

export interface QuizQuestionItem {
  e: string;
  q: string;
  a: string;
  why: string;
}

export interface QuizOptionItem {
  key: string;
  label: string;
  hoverClass: string;
}

export interface QuizBadgeConfig {
  emoji: string;
  ribbon: string;
  title: string;
  sub: string;
  bg?: string;
  bgClass?: string;
  ribbonClass?: string;
}

interface SharedQuizProps {
  startEmoji: string;
  startTitle: string;
  startSub: string;
  startBtn?: string;
  qLabel?: string;
  options: QuizOptionItem[];
  rightPhrases: string[];
  wrongPhrases: string[];
  questions: QuizQuestionItem[];
  badge: QuizBadgeConfig;
  nextTab?: TabId;
  nextLabel?: string;
  nextButton?: {
    label: string;
    onClick: () => void;
  };
  onNavigate?: (tab: TabId) => void;
  onAwardBadge?: (ribbon: string) => void;
  onAnswerCallback?: (isCorrect: boolean) => void;
}

export const SharedQuiz: React.FC<SharedQuizProps> = ({
  startEmoji,
  startTitle,
  startSub,
  startBtn = "Let's Go! 🔥",
  qLabel = 'Soalan',
  options,
  rightPhrases,
  wrongPhrases,
  questions,
  badge,
  nextTab,
  nextLabel,
  nextButton,
  onNavigate,
  onAwardBadge,
  onAnswerCallback,
}) => {
  const [phase, setPhase] = useState<'start' | 'quiz' | 'end'>('start');
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<{
    ok: boolean;
    title: string;
    why: string;
  } | null>(null);

  const total = questions.length;
  const current = questions[index];

  const handleStart = () => {
    setIndex(0);
    setScore(0);
    setFeedback(null);
    setPhase('quiz');
  };

  const handleAnswer = (key: string, e: React.MouseEvent) => {
    if (feedback) return;
    const ok = key === current.a;
    if (ok) {
      setScore((s) => s + 1);
      burstEmoji(e.clientX, e.clientY, rnd(['🔥', '⚡', '✅', '🎉']), 6);
    } else {
      triggerShake();
    }
    onAnswerCallback?.(ok);

    setFeedback({
      ok,
      title: rnd(ok ? rightPhrases : wrongPhrases),
      why: current.why,
    });

    setTimeout(() => {
      setFeedback(null);
      if (index + 1 < total) {
        setIndex((i) => i + 1);
      } else {
        setPhase('end');
        onAwardBadge?.(badge.ribbon);
        fireBigConfetti();
      }
    }, 1650);
  };

  if (phase === 'start') {
    return (
      <div className="max-w-2xl mx-auto bg-white border-[3px] border-black rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6 sm:p-8 text-center flex flex-col items-center gap-3.5">
        <span className="text-5xl sm:text-6xl animate-bob">{startEmoji}</span>
        <h3 className="text-xl sm:text-2xl font-black text-black">
          {startTitle}
        </h3>
        <p className="text-xs sm:text-sm font-bold text-neutral-700 max-w-md">
          {startSub}
        </p>
        <button
          type="button"
          onClick={handleStart}
          className="neo-btn mt-1 px-7 py-3 bg-[#10D989] rounded-xl font-black text-sm sm:text-base text-black cursor-pointer"
        >
          {startBtn}
        </button>
      </div>
    );
  }

  if (phase === 'end') {
    return (
      <motion.div
        initial={{ scale: 0.94, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="max-w-2xl mx-auto bg-white border-[3px] border-black rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6 sm:p-8 text-center flex flex-col items-center gap-3.5"
      >
        <div
          style={badge.bg ? { backgroundColor: badge.bg } : undefined}
          className={`w-32 h-32 rounded-full ${
            badge.bgClass || 'bg-[#FDE047]'
          } border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col items-center justify-center relative mb-2`}
        >
          <span className="text-5xl animate-bob">{badge.emoji}</span>
          <span
            className={`absolute -bottom-3 px-3.5 py-0.5 ${
              badge.ribbonClass || 'bg-[#FF4766] text-white'
            } border-[2px] border-black rounded-full font-black text-xs whitespace-nowrap`}
          >
            {badge.ribbon}
          </span>
        </div>

        <h3 className="text-xl sm:text-2xl font-black text-black mt-1">
          {badge.title}
        </h3>
        <p className="text-xs sm:text-sm font-bold text-neutral-700">
          {badge.sub}
        </p>

        <div className="px-4 py-1 bg-[#FDE047] border-[2px] border-black rounded-lg font-black text-sm text-black">
          {score}/{total} betul{' '}
          {score === total ? '💯' : score >= total / 2 ? '👍' : '😅'}
        </div>

        <div className="flex flex-wrap justify-center gap-3 mt-1">
          <button
            type="button"
            onClick={handleStart}
            className="neo-btn px-5 py-2.5 bg-white hover:bg-[#FDE047] rounded-xl font-black text-xs sm:text-sm cursor-pointer"
          >
            Main Lagi 🔄
          </button>
          {nextButton && (
            <button
              type="button"
              onClick={nextButton.onClick}
              className="neo-btn px-6 py-2.5 bg-[#10D989] rounded-xl font-black text-xs sm:text-sm cursor-pointer"
            >
              {nextButton.label}
            </button>
          )}
          {nextTab && nextLabel && onNavigate && (
            <button
              type="button"
              onClick={() => onNavigate(nextTab)}
              className="neo-btn px-6 py-2.5 bg-[#10D989] rounded-xl font-black text-xs sm:text-sm cursor-pointer"
            >
              {nextLabel}
            </button>
          )}
        </div>
      </motion.div>
    );
  }

  const prog = ((index + (feedback ? 1 : 0)) / total) * 100;

  return (
    <div className="max-w-2xl mx-auto flex flex-col gap-4">
      <div className="w-full h-4 bg-white border-[3px] border-black rounded-full shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
        <div
          style={{ width: `${prog}%` }}
          className="h-full bg-[#10D989] border-r-[2px] border-black transition-all duration-300"
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={`${index}-${feedback ? 'fb' : 'q'}`}
          initial={{ opacity: 0, x: 25 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -25 }}
          className={`min-h-[200px] border-[3px] border-black rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6 flex flex-col items-center justify-center text-center gap-2.5 ${
            feedback
              ? feedback.ok
                ? 'bg-[#10D989] text-black'
                : 'bg-[#FF4766] text-white'
              : 'bg-white text-black'
          }`}
        >
          <span className="px-3 py-0.5 bg-[#FDE047] text-black border-[2px] border-black rounded-md font-black text-xs">
            {qLabel} {index + 1}/{total}
          </span>
          <span className="text-4xl sm:text-5xl">{current.e}</span>
          {feedback ? (
            <>
              <div className="text-xl sm:text-2xl font-black">
                {feedback.title}
              </div>
              <p className="text-xs sm:text-sm font-bold max-w-md">
                {feedback.why}
              </p>
            </>
          ) : (
            <p className="text-lg sm:text-xl font-black max-w-lg leading-snug">
              {current.q}
            </p>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {options.map((opt) => (
          <button
            key={opt.key}
            type="button"
            disabled={Boolean(feedback)}
            onClick={(e) => handleAnswer(opt.key, e)}
            className={`neo-btn py-3.5 px-5 bg-white ${opt.hoverClass} rounded-xl font-black text-base sm:text-lg transition-colors cursor-pointer disabled:opacity-50`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
};
