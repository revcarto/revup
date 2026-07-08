import React from 'react';

const colorForScore = (score: number) => {
  if (score >= 75) return '#34d399'; // emerald-400
  if (score >= 50) return '#fbbf24'; // amber-400
  return '#fb7185'; // rose-400
};

const ScoreDial = ({ score, size = 160, label }: { score: number; size?: number; label?: string }) => {
  const stroke = size * 0.09;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - score / 100);
  const color = colorForScore(score);

  return (
    <div className="flex flex-col items-center justify-center" style={{ width: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} stroke="rgba(148,163,184,0.15)" strokeWidth={stroke} fill="none" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={stroke}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 0.6s ease' }}
        />
      </svg>
      <div className="-mt-[5.5rem] flex flex-col items-center">
        <span className="text-4xl font-black text-slate-50">{score}</span>
        <span className="text-[10px] uppercase tracking-widest text-slate-400">/ 100</span>
      </div>
      {label && <span className="mt-3 text-sm text-slate-400 text-center">{label}</span>}
    </div>
  );
};

export default ScoreDial;
