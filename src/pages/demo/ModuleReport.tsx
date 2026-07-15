import React from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Printer, CheckCircle2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import GradeBadge, { GradeDot } from '@/components/revup/GradeBadge';
import { modules } from '@/data/revupDemoData';
import { severityStyles, integrationStyles } from './styles';

const ModuleReport = () => {
  const { id } = useParams();
  const moduleId = Number(id);
  const mod = modules.find((m) => m.id === moduleId);

  if (!mod) return <Navigate to="/demo/modules" replace />;

  const prev = modules.find((m) => m.id === moduleId - 1);
  const next = modules.find((m) => m.id === moduleId + 1);

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between print:hidden">
        <Link to="/demo/modules" className="text-xs text-slate-500 hover:text-teal-400 flex items-center gap-1">
          <ArrowLeft className="h-3.5 w-3.5" /> All modules
        </Link>
        <Button size="sm" variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800" onClick={() => window.print()}>
          <Printer className="h-3.5 w-3.5 mr-1.5" /> Print / Save as PDF
        </Button>
      </div>

      <Card className="p-8 bg-slate-900 border-slate-800">
        <div className="flex items-center gap-2 mb-2">
          <GradeDot grade={mod.grade} />
          <span className="text-xs uppercase tracking-widest text-slate-500">Module {mod.id} of 10 · Weight {mod.weight}% of composite</span>
        </div>
        <div className="flex items-start justify-between gap-4 mb-6">
          <h1 className="text-2xl font-bold text-slate-50">{mod.name}</h1>
          <GradeBadge grade={mod.grade} score={mod.score} />
        </div>

        <div className="space-y-4 text-slate-300 leading-relaxed mb-8">
          {mod.narrative.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        <Card className="p-4 bg-teal-500/5 border-teal-500/20 mb-8">
          <div className="text-[10px] uppercase tracking-widest text-teal-400 mb-1">Benchmark Context</div>
          <p className="text-sm text-slate-300">{mod.benchmark}</p>
        </Card>

        <h2 className="text-sm font-semibold uppercase tracking-widest text-slate-500 mb-3">What Was Examined</h2>
        <div className="space-y-2 mb-8">
          {mod.inputs.map((inp, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-slate-800/60 border border-slate-800">
              <div>
                <div className="text-sm text-slate-200">{inp.label}</div>
                <div className="text-xs text-slate-500">{inp.source}</div>
              </div>
              <Badge className={integrationStyles[inp.status === 'connected' ? 'connected' : inp.status === 'manual' ? 'manual_fallback' : 'not_started']}>
                {inp.status === 'connected' ? 'Connected' : inp.status === 'manual' ? 'Manual' : 'Missing'}
              </Badge>
            </div>
          ))}
        </div>

        <h2 className="text-sm font-semibold uppercase tracking-widest text-slate-500 mb-3">Findings</h2>
        <div className="space-y-3 mb-8">
          {mod.findings.map((f, i) => (
            <Card key={i} className="p-4 bg-slate-800/60 border-slate-800">
              <div className="flex items-center gap-2 mb-2">
                <Badge className={severityStyles[f.severity]}>{f.severity}</Badge>
                <span className="text-[10px] uppercase tracking-wider text-slate-500">Confidence: {f.confidence}</span>
              </div>
              <p className="text-sm text-slate-200 leading-relaxed mb-2">{f.text}</p>
              <p className="text-xs text-slate-500 italic">Evidence: {f.evidence}</p>
            </Card>
          ))}
        </div>

        <h2 className="text-sm font-semibold uppercase tracking-widest text-slate-500 mb-3">Recommendations</h2>
        <div className="space-y-2">
          {mod.recommendations.map((r, i) => (
            <div key={i} className="flex items-start gap-3">
              <CheckCircle2 className="h-4 w-4 text-teal-400 shrink-0 mt-0.5" />
              <span className="text-sm text-slate-300">{r}</span>
            </div>
          ))}
        </div>
      </Card>

      <div className="flex items-center justify-between print:hidden">
        {prev ? (
          <Link to={`/demo/modules/${prev.id}`} className="text-sm text-slate-400 hover:text-teal-400 flex items-center gap-1.5">
            <ArrowLeft className="h-4 w-4" /> M{prev.id} · {prev.shortName}
          </Link>
        ) : <span />}
        {next ? (
          <Link to={`/demo/modules/${next.id}`} className="text-sm text-slate-400 hover:text-teal-400 flex items-center gap-1.5">
            M{next.id} · {next.shortName} <ArrowRight className="h-4 w-4" />
          </Link>
        ) : <span />}
      </div>
    </div>
  );
};

export default ModuleReport;
