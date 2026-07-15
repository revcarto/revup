import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { GradeDot } from '@/components/revup/GradeBadge';
import { modules, compositeScore, spendSheet, fixList } from '@/data/revupDemoData';

const scoreColor = (score: number) => (score >= 75 ? '#34d399' : score >= 50 ? '#fbbf24' : '#fb7185');

const gradeCounts = modules.reduce(
  (acc, m) => {
    acc[m.grade] += 1;
    return acc;
  },
  { red: 0, yellow: 0, green: 0 } as Record<'red' | 'yellow' | 'green', number>
);

const allFindings = modules.flatMap((m) => m.findings.map((f) => ({ ...f, moduleId: m.id })));
const severityCounts = allFindings.reduce(
  (acc, f) => {
    acc[f.severity] += 1;
    return acc;
  },
  { P0: 0, P1: 0, P2: 0 } as Record<'P0' | 'P1' | 'P2', number>
);

const cutCount = spendSheet.filter((s) => s.verdict === 'Cut').length;
const consolidateCount = spendSheet.filter((s) => s.verdict === 'Consolidate').length;

const Donut = () => {
  const total = modules.length;
  const size = 160;
  const stroke = 22;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const segments: { color: string; count: number }[] = [
    { color: '#fb7185', count: gradeCounts.red },
    { color: '#fbbf24', count: gradeCounts.yellow },
    { color: '#34d399', count: gradeCounts.green },
  ];
  let offsetAcc = 0;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
      <circle cx={size / 2} cy={size / 2} r={radius} stroke="rgba(148,163,184,0.12)" strokeWidth={stroke} fill="none" />
      {segments.map((seg, i) => {
        const frac = seg.count / total;
        const dash = frac * circumference;
        const el = (
          <circle
            key={i}
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={seg.color}
            strokeWidth={stroke}
            fill="none"
            strokeDasharray={`${dash} ${circumference - dash}`}
            strokeDashoffset={-offsetAcc}
          />
        );
        offsetAcc += dash;
        return el;
      })}
    </svg>
  );
};

const ReportingDashboard = () => (
  <div className="space-y-8">
    <div className="grid md:grid-cols-3 gap-5">
      <Card className="p-6 bg-slate-900 border-slate-800 flex flex-col items-center justify-center">
        <div className="relative flex items-center justify-center">
          <Donut />
          <div className="absolute flex flex-col items-center">
            <span className="text-3xl font-black text-slate-50">{compositeScore}</span>
            <span className="text-[10px] uppercase tracking-widest text-slate-500">composite</span>
          </div>
        </div>
        <div className="flex gap-4 mt-4 text-xs">
          <span className="flex items-center gap-1.5 text-slate-400"><GradeDot grade="red" /> {gradeCounts.red} red</span>
          <span className="flex items-center gap-1.5 text-slate-400"><GradeDot grade="yellow" /> {gradeCounts.yellow} yellow</span>
          <span className="flex items-center gap-1.5 text-slate-400"><GradeDot grade="green" /> {gradeCounts.green} green</span>
        </div>
      </Card>

      <Card className="p-6 bg-slate-900 border-slate-800">
        <div className="text-xs uppercase tracking-widest text-slate-500 mb-4">Findings by Severity</div>
        <div className="space-y-3">
          {(['P0', 'P1', 'P2'] as const).map((sev) => (
            <div key={sev}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-300">{sev} {sev === 'P0' ? '(fix now)' : sev === 'P1' ? '(this quarter)' : '(when convenient)'}</span>
                <span className="text-slate-400">{severityCounts[sev]}</span>
              </div>
              <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                <div
                  className={`h-full ${sev === 'P0' ? 'bg-rose-400' : sev === 'P1' ? 'bg-amber-400' : 'bg-slate-400'}`}
                  style={{ width: `${(severityCounts[sev] / allFindings.length) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="text-xs text-slate-500 mt-4">{allFindings.length} total findings across 10 modules · {fixList.length} converted to action-plan items</div>
      </Card>

      <Card className="p-6 bg-slate-900 border-slate-800">
        <div className="text-xs uppercase tracking-widest text-slate-500 mb-4">SaaS Spend Verdicts</div>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between"><span className="text-slate-300">Keep</span><span className="text-emerald-400 font-semibold">{spendSheet.filter((s) => s.verdict === 'Keep').length} tools</span></div>
          <div className="flex justify-between"><span className="text-slate-300">Consolidate</span><span className="text-amber-400 font-semibold">{consolidateCount} tools</span></div>
          <div className="flex justify-between"><span className="text-slate-300">Cut</span><span className="text-rose-400 font-semibold">{cutCount} tools</span></div>
        </div>
        <Link to="/demo/spend" className="text-xs text-teal-400 hover:underline mt-4 inline-block">View full Spend Recovery Sheet →</Link>
      </Card>
    </div>

    <Card className="p-6 bg-slate-900 border-slate-800">
      <div className="text-xs uppercase tracking-widest text-slate-500 mb-4">Module Scores — Ranked</div>
      <div className="space-y-3">
        {[...modules].sort((a, b) => b.score - a.score).map((m) => (
          <Link key={m.id} to={`/demo/modules/${m.id}`} className="block group">
            <div className="flex items-center gap-4">
              <span className="text-xs text-slate-500 w-6 shrink-0">M{m.id}</span>
              <span className="text-sm text-slate-300 w-44 shrink-0 truncate group-hover:text-teal-400 transition-colors">{m.shortName}</span>
              <div className="flex-1 h-2.5 rounded-full bg-slate-800 overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${m.score}%`, backgroundColor: scoreColor(m.score) }} />
              </div>
              <span className="text-sm font-semibold text-slate-200 w-8 text-right shrink-0">{m.score}</span>
            </div>
          </Link>
        ))}
      </div>
    </Card>

    <Card className="p-6 bg-slate-900 border-slate-800">
      <div className="text-xs uppercase tracking-widest text-slate-500 mb-2">Score Trend</div>
      <p className="text-sm text-slate-400">
        This is engagement #001 — there's no history yet to trend against. Once RevCarto converts to a RevPod™ retainer,
        this dashboard re-runs the scorecard quarterly and this panel becomes a real delta chart (composite score over
        time, module-by-module movement). That delta is the retainer's core ROI story.
      </p>
    </Card>
  </div>
);

export default ReportingDashboard;
