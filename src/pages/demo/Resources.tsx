import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Gauge, DollarSign, ListChecks, Compass, Plug, BarChart3, ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { workspace } from '@/data/revupDemoData';

const documents = [
  {
    title: 'The Full Audit Report',
    description: 'Executive summary, scorecard, and all 10 module chapters — findings, evidence, and benchmarks in one document.',
    icon: <FileText className="h-5 w-5" />,
    to: '/demo/report',
    meta: '10 chapters',
  },
  {
    title: 'The Revenue System Scorecard™',
    description: 'Composite Revenue Health Score plus every module graded Red / Yellow / Green.',
    icon: <Gauge className="h-5 w-5" />,
    to: '/demo/scorecard',
    meta: 'Score: 55/100',
  },
  {
    title: 'Reporting Dashboard',
    description: 'Grade distribution, findings by severity, spend verdicts, and ranked module scores.',
    icon: <BarChart3 className="h-5 w-5" />,
    to: '/demo/dashboard',
    meta: 'Live view',
  },
  {
    title: 'SaaS Spend Recovery Sheet',
    description: 'Line-by-line tool spend analysis with keep / consolidate / cut verdicts.',
    icon: <DollarSign className="h-5 w-5" />,
    to: '/demo/spend',
    meta: '~$10K–$21K/yr identified',
  },
  {
    title: 'The 90-Day Action Plan',
    description: 'Every finding sequenced into owner-assigned tasks across three 30-day sprints.',
    icon: <ListChecks className="h-5 w-5" />,
    to: '/demo/fixlist',
    meta: '9 tasks · 3 sprints',
  },
  {
    title: 'The GTM Blueprint',
    description: 'Validated ICP, channel priority stack, messaging pillars, 2-quarter targets, weekly scoreboard.',
    icon: <Compass className="h-5 w-5" />,
    to: '/demo/gtm',
    meta: 'Q1–Q2 targets',
  },
  {
    title: 'Integration Map',
    description: 'Every connected system, scope, and sync status for this engagement.',
    icon: <Plug className="h-5 w-5" />,
    to: '/demo/integrations',
    meta: '10 systems',
  },
];

const Resources = () => (
  <div className="space-y-6">
    <Card className="p-6 bg-slate-900 border-slate-800">
      <h2 className="text-sm font-semibold uppercase tracking-widest text-slate-500 mb-2">The Data Room</h2>
      <p className="text-sm text-slate-300 leading-relaxed">
        Every artifact and raw finding from this engagement, organized in one place. In a live engagement this is a
        shared drive the client keeps forever — snapshot dated {workspace.engagement.snapshotDate}, with a one-click
        revoke-and-purge available from the client portal per the engagement's security policy.
      </p>
    </Card>

    <div className="grid sm:grid-cols-2 gap-4">
      {documents.map((doc, i) => (
        <Link key={i} to={doc.to}>
          <Card className="p-5 bg-slate-900 border-slate-800 hover:border-teal-500/40 transition-colors h-full flex flex-col">
            <div className="flex items-start justify-between mb-3">
              <div className="p-2 rounded-md bg-teal-500/10 text-teal-400">{doc.icon}</div>
              <span className="text-[10px] uppercase tracking-wider text-slate-500">{doc.meta}</span>
            </div>
            <div className="font-semibold text-slate-100 mb-1">{doc.title}</div>
            <p className="text-sm text-slate-400 leading-relaxed flex-1">{doc.description}</p>
            <div className="text-xs text-teal-400 flex items-center gap-1 mt-3">
              Open <ArrowRight className="h-3 w-3" />
            </div>
          </Card>
        </Link>
      ))}
    </div>
  </div>
);

export default Resources;
