import React from 'react';
import { Grade } from '@/data/revupDemoData';

const gradeStyles: Record<Grade, string> = {
  red: 'bg-rose-500/15 text-rose-400 border-rose-500/40',
  yellow: 'bg-amber-500/15 text-amber-400 border-amber-500/40',
  green: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/40',
};

const gradeDot: Record<Grade, string> = {
  red: 'bg-rose-400',
  yellow: 'bg-amber-400',
  green: 'bg-emerald-400',
};

export const GradeDot = ({ grade, className = '' }: { grade: Grade; className?: string }) => (
  <span className={`inline-block h-2.5 w-2.5 rounded-full ${gradeDot[grade]} ${className}`} />
);

const GradeBadge = ({ grade, score }: { grade: Grade; score: number }) => (
  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${gradeStyles[grade]}`}>
    <GradeDot grade={grade} />
    {score}
  </span>
);

export default GradeBadge;
