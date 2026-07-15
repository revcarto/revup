import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { gtmBlueprint } from '@/data/revupDemoData';

const GtmBlueprint = () => (
  <div className="space-y-8">
    <Card className="p-6 bg-slate-900 border-slate-800">
      <h3 className="text-sm font-semibold uppercase tracking-widest text-slate-500 mb-2">Validated ICP</h3>
      <p className="text-slate-200 leading-relaxed">{gtmBlueprint.validatedICP}</p>
    </Card>

    <div>
      <h3 className="text-sm font-semibold uppercase tracking-widest text-slate-500 mb-3">Channel Priority</h3>
      <div className="space-y-3">
        {gtmBlueprint.channelPriority.map((c, i) => (
          <Card key={i} className="p-4 bg-slate-900 border-slate-800">
            <div className="flex justify-between items-center mb-2">
              <span className="text-slate-200 font-medium">{c.channel}</span>
              <span className="text-teal-400 font-bold">{c.allocation}</span>
            </div>
            <Progress value={parseInt(c.allocation)} className="h-1.5 mb-2 bg-slate-800" indicatorClassName="bg-teal-400" />
            <p className="text-xs text-slate-500">{c.note}</p>
          </Card>
        ))}
      </div>
    </div>

    <div className="grid md:grid-cols-2 gap-6">
      <Card className="p-5 bg-slate-900 border-slate-800">
        <h3 className="text-sm font-semibold uppercase tracking-widest text-slate-500 mb-3">Messaging Pillars</h3>
        <ul className="space-y-2">
          {gtmBlueprint.messagingPillars.map((p, i) => (
            <li key={i} className="text-sm text-slate-300 flex gap-2">
              <span className="text-teal-400">{i + 1}.</span> {p}
            </li>
          ))}
        </ul>
      </Card>
      <Card className="p-5 bg-slate-900 border-slate-800">
        <h3 className="text-sm font-semibold uppercase tracking-widest text-slate-500 mb-3">2-Quarter Targets</h3>
        <div className="space-y-3">
          {gtmBlueprint.targets.map((t, i) => (
            <div key={i}>
              <div className="text-teal-400 text-xs font-bold mb-1">{t.period}</div>
              <div className="text-sm text-slate-300">{t.target}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>

    <Card className="p-5 bg-slate-900 border-slate-800">
      <h3 className="text-sm font-semibold uppercase tracking-widest text-slate-500 mb-3">Weekly Metrics Scoreboard</h3>
      <ul className="grid sm:grid-cols-2 gap-2">
        {gtmBlueprint.scoreboard.map((s, i) => (
          <li key={i} className="text-sm text-slate-300 flex items-center gap-2">
            <ChevronRight className="h-3 w-3 text-teal-400" /> {s}
          </li>
        ))}
      </ul>
    </Card>
  </div>
);

export default GtmBlueprint;
