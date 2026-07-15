import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { GradeDot } from '@/components/revup/GradeBadge';
import ScoreDial from '@/components/revup/ScoreDial';
import { modules, compositeScore } from '@/data/revupDemoData';

const Scorecard = () => (
  <div className="space-y-8">
    <Card className="p-8 bg-slate-900 border-slate-800 flex flex-col items-center">
      <ScoreDial score={compositeScore} size={200} />
      <p className="text-slate-400 text-sm mt-4 text-center max-w-md">
        RevCarto — audited by its own methodology — lands in the Yellow band. The cobbler's kids need shoes too.
      </p>
    </Card>
    <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
      {modules.map((m) => (
        <Link key={m.id} to={`/demo/modules/${m.id}`}>
          <Card className="p-4 bg-slate-900 border-slate-800 hover:border-teal-500/40 transition-colors h-full">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] uppercase tracking-wider text-slate-500">M{m.id} · {m.weight}%</span>
              <GradeDot grade={m.grade} />
            </div>
            <div className="text-sm font-medium text-slate-200 mb-1">{m.shortName}</div>
            <div className="text-2xl font-black text-slate-50 mb-2">{m.score}</div>
            <Progress value={m.score} className="h-1.5 bg-slate-800" indicatorClassName="bg-teal-400" />
          </Card>
        </Link>
      ))}
    </div>
  </div>
);

export default Scorecard;
