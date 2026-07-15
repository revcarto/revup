import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import GradeBadge from '@/components/revup/GradeBadge';
import { modules } from '@/data/revupDemoData';

const ModulesGrid = () => (
  <div className="grid sm:grid-cols-2 gap-4">
    {modules.map((m) => (
      <Link key={m.id} to={`/demo/modules/${m.id}`}>
        <Card className="p-5 bg-slate-900 border-slate-800 hover:border-teal-500/40 transition-colors cursor-pointer h-full">
          <div className="flex items-start justify-between mb-3">
            <div>
              <div className="text-[10px] uppercase tracking-wider text-slate-500 mb-1">Module {m.id}</div>
              <div className="font-semibold text-slate-100">{m.name}</div>
            </div>
            <GradeBadge grade={m.grade} score={m.score} />
          </div>
          <p className="text-sm text-slate-400 leading-relaxed mb-3">{m.rationale}</p>
          <div className="text-xs text-teal-400">{m.findings.length} findings · view full report →</div>
        </Card>
      </Link>
    ))}
  </div>
);

export default ModulesGrid;
