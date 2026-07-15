import React from 'react';
import { Printer } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import GradeBadge, { GradeDot } from '@/components/revup/GradeBadge';
import { Button } from '@/components/ui/button';
import { workspace, modules, compositeScore, topWins, topRisks } from '@/data/revupDemoData';
import { severityStyles } from './styles';

const FullReport = () => (
  <div className="space-y-8 max-w-4xl">
    <div className="flex items-center justify-between print:hidden">
      <div className="text-xs text-slate-500">The Full Audit Report — Deliverable 2 of 7</div>
      <Button size="sm" variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800" onClick={() => window.print()}>
        <Printer className="h-3.5 w-3.5 mr-1.5" /> Print / Save as PDF
      </Button>
    </div>

    <Card className="p-8 bg-slate-900 border-slate-800">
      <div className="text-xs uppercase tracking-widest text-teal-400 mb-2">RevUp™ Full Audit Report</div>
      <h1 className="text-3xl font-bold text-slate-50 mb-1">{workspace.companyName}</h1>
      <p className="text-sm text-slate-500 mb-6">
        Snapshot {workspace.engagement.snapshotDate} · Engagement #001 · Prepared for {workspace.primaryContact.name}, {workspace.primaryContact.role}
      </p>

      <h2 className="text-sm font-semibold uppercase tracking-widest text-slate-500 mb-3">Executive Summary</h2>
      <div className="space-y-3 text-slate-300 leading-relaxed">
        <p>
          RevCarto — an 8-person, Philadelphia-based revenue operations consultancy — was audited using its own RevUp™
          methodology as the first test engagement of the platform. The composite Revenue Health Score is <strong className="text-slate-100">{compositeScore}/100</strong>,
          landing in the Yellow band: a real, working business with genuine technical strength, undermined by gaps that
          are common at this stage — inconsistent self-reported numbers, single-channel pipeline, and founder-concentration risk.
        </p>
        <p>
          The strongest module is Tech Stack &amp; Systems ({modules.find((m) => m.shortName === 'Systems')?.score}) — deep HubSpot
          expertise paired with a production AI ops layer that is measurably saving time, not just theater. The weakest is
          Data &amp; Reporting Integrity ({modules.find((m) => m.shortName === 'Data')?.score}), which failed the dashboard truth-test on the
          company's own headline revenue number — two different figures, never reconciled, cited in two different external documents.
        </p>
        <p>
          None of the findings in this report require new hires or new tools to begin fixing. The 90-Day Action Plan sequences
          all nine highest-priority items into three sprints, front-loaded with fixes that cost a decision, not a budget.
        </p>
      </div>
    </Card>

    <Card className="p-8 bg-slate-900 border-slate-800">
      <h2 className="text-sm font-semibold uppercase tracking-widest text-slate-500 mb-4">The Revenue System Scorecard™</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-6">
        {modules.map((m) => (
          <div key={m.id} className="p-3 rounded-lg bg-slate-800/60 border border-slate-800">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] text-slate-500">M{m.id}</span>
              <GradeDot grade={m.grade} />
            </div>
            <div className="text-xs text-slate-300">{m.shortName}</div>
            <div className="text-lg font-bold text-slate-50">{m.score}</div>
          </div>
        ))}
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <div className="text-xs font-semibold text-emerald-400 mb-2">Top 3 Wins</div>
          {topWins.map((m) => (
            <div key={m.id} className="flex justify-between text-sm py-1">
              <span className="text-slate-300">{m.name}</span>
              <GradeBadge grade={m.grade} score={m.score} />
            </div>
          ))}
        </div>
        <div>
          <div className="text-xs font-semibold text-rose-400 mb-2">Top 3 Risks</div>
          {topRisks.map((m) => (
            <div key={m.id} className="flex justify-between text-sm py-1">
              <span className="text-slate-300">{m.name}</span>
              <GradeBadge grade={m.grade} score={m.score} />
            </div>
          ))}
        </div>
      </div>
    </Card>

    {modules.map((m) => (
      <Card key={m.id} id={`chapter-${m.id}`} className="p-8 bg-slate-900 border-slate-800">
        <div className="flex items-center gap-2 mb-2">
          <GradeDot grade={m.grade} />
          <span className="text-xs uppercase tracking-widest text-slate-500">Chapter {m.id} · Weight {m.weight}%</span>
        </div>
        <div className="flex items-start justify-between gap-4 mb-4">
          <h2 className="text-xl font-bold text-slate-50">{m.name}</h2>
          <GradeBadge grade={m.grade} score={m.score} />
        </div>
        <div className="space-y-3 text-slate-300 leading-relaxed mb-6">
          {m.narrative.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        <div className="text-xs text-slate-500 italic mb-6">{m.benchmark}</div>
        <div className="space-y-2 mb-6">
          {m.findings.map((f, i) => (
            <div key={i} className="flex items-start gap-3 text-sm">
              <Badge className={`${severityStyles[f.severity]} shrink-0 mt-0.5`}>{f.severity}</Badge>
              <span className="text-slate-300">{f.text}</span>
            </div>
          ))}
        </div>
        <div className="text-xs uppercase tracking-widest text-slate-500 mb-2">Recommendations</div>
        <ul className="text-sm text-slate-300 space-y-1 list-disc list-inside">
          {m.recommendations.map((r, i) => (
            <li key={i}>{r}</li>
          ))}
        </ul>
      </Card>
    ))}

    <Card className="p-8 bg-slate-900 border-slate-800">
      <h2 className="text-sm font-semibold uppercase tracking-widest text-slate-500 mb-3">Appendix — Integration Map</h2>
      <p className="text-sm text-slate-400 mb-4">Full integration status is in the Integrations view. This engagement snapshot connected {workspace.integrations.filter((i) => i.status === 'connected').length} of {workspace.integrations.length} systems live, with the remainder on manual fallback or not yet started.</p>
    </Card>
  </div>
);

export default FullReport;
