import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { fixList } from '@/data/revupDemoData';
import { severityStyles } from './styles';

const sprintMeta: Record<number, { range: string; goal: string }> = {
  1: { range: 'Days 1–30', goal: 'Two visible, low-effort wins first — momentum design. Fix the things that cost a decision, not a hire.' },
  2: { range: 'Days 31–60', goal: 'Test the first new channel and close the process-documentation gap while the wins from Sprint 1 are still fresh.' },
  3: { range: 'Days 61–90', goal: 'The structural fixes — the ones that require headcount or a build, not just a decision.' },
};

const FixList = () => (
  <div className="space-y-8">
    <Card className="p-6 bg-slate-900 border-slate-800">
      <h2 className="text-sm font-semibold uppercase tracking-widest text-slate-500 mb-2">90-Day Action Plan</h2>
      <p className="text-sm text-slate-300 leading-relaxed">
        Every P0/P1/P2 finding from the 10 modules becomes a task here — owned, sequenced, and effort-scored across three
        30-day sprints. Sprint 1 is deliberately front-loaded with cheap, high-visibility wins; Sprint 3 carries the
        structural fixes that take longer because they require a hire or a build, not just a decision.
      </p>
    </Card>

    <div className="grid md:grid-cols-3 gap-5">
      {[1, 2, 3].map((sprint) => (
        <div key={sprint}>
          <div className="mb-3">
            <div className="text-xs uppercase tracking-widest text-slate-500">
              Sprint {sprint} · {sprintMeta[sprint].range}
            </div>
            <p className="text-xs text-slate-500 mt-1">{sprintMeta[sprint].goal}</p>
          </div>
          <div className="space-y-3">
            {fixList.filter((f) => f.sprint === sprint).map((f, i) => (
              <Card key={i} className="p-4 bg-slate-900 border-slate-800">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className={severityStyles[f.severity]}>{f.severity}</Badge>
                  <span className="text-[10px] text-slate-500">{f.module}</span>
                </div>
                <p className="text-sm text-slate-200 leading-relaxed mb-3">{f.title}</p>
                <div className="flex justify-between text-xs text-slate-500">
                  <span>Owner: {f.owner}</span>
                  <span>Effort: {f.effort}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default FixList;
