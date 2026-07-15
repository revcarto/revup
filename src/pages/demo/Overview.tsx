import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, Mail, MapPin, Users2, ChevronRight, FileText, BarChart3 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import GradeBadge, { GradeDot } from '@/components/revup/GradeBadge';
import ScoreDial from '@/components/revup/ScoreDial';
import { workspace, modules, compositeScore, topWins, topRisks } from '@/data/revupDemoData';

const Overview = () => (
  <div className="space-y-8">
    <Card className="p-6 bg-slate-900 border-slate-800">
      <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start">
        <ScoreDial score={compositeScore} label="Composite Revenue Health Score" />
        <div className="flex-1 grid sm:grid-cols-2 gap-6 w-full">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-slate-300">
              <Building2 className="h-4 w-4 text-teal-400" />
              <span className="text-sm">{workspace.industry}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <Users2 className="h-4 w-4 text-teal-400" />
              <span className="text-sm">{workspace.employeeCount} employees · {workspace.revenueBand}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <MapPin className="h-4 w-4 text-teal-400" />
              <span className="text-sm">{workspace.hqLocation}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <Mail className="h-4 w-4 text-teal-400" />
              <span className="text-sm">{workspace.primaryContact.name} · {workspace.primaryContact.role}</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="text-xs uppercase tracking-widest text-slate-500 mb-2">Engagement</div>
            <div className="flex justify-between text-sm"><span className="text-slate-400">Status</span><span className="text-slate-200 capitalize">{workspace.engagement.status}</span></div>
            <div className="flex justify-between text-sm"><span className="text-slate-400">Price</span><span className="text-slate-200">{workspace.engagement.price}</span></div>
            <div className="flex justify-between text-sm"><span className="text-slate-400">Kickoff</span><span className="text-slate-200">{workspace.engagement.startDate}</span></div>
            <div className="flex justify-between text-sm"><span className="text-slate-400">Walkthrough</span><span className="text-slate-200">{workspace.engagement.walkthroughDate}</span></div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-slate-800">
        <Link to="/demo/report">
          <Button size="sm" className="bg-teal-500 hover:bg-teal-600 text-white">
            <FileText className="h-4 w-4 mr-1.5" /> Open Full Audit Report
          </Button>
        </Link>
        <Link to="/demo/dashboard">
          <Button size="sm" variant="outline" className="border-slate-700 text-slate-200 hover:bg-slate-800">
            <BarChart3 className="h-4 w-4 mr-1.5" /> Open Reporting Dashboard
          </Button>
        </Link>
      </div>
    </Card>

    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-slate-500">Module Progress</h2>
        <Link to="/demo/modules" className="text-xs text-teal-400 flex items-center gap-1 hover:underline">
          View all <ChevronRight className="h-3 w-3" />
        </Link>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {modules.map((m) => (
          <Link
            key={m.id}
            to={`/demo/modules/${m.id}`}
            className="text-left p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-teal-500/40 transition-colors block"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] uppercase tracking-wider text-slate-500">M{m.id}</span>
              <GradeDot grade={m.grade} />
            </div>
            <div className="text-sm font-medium text-slate-200 mb-2">{m.shortName}</div>
            <div className="text-lg font-bold text-slate-50">{m.score}</div>
          </Link>
        ))}
      </div>
    </div>

    <div className="grid md:grid-cols-2 gap-6">
      <Card className="p-5 bg-slate-900 border-slate-800">
        <h3 className="text-sm font-semibold text-emerald-400 mb-3">Top Wins</h3>
        <div className="space-y-2">
          {topWins.map((m) => (
            <Link key={m.id} to={`/demo/modules/${m.id}`} className="flex items-center justify-between text-sm hover:bg-slate-800/60 rounded-md px-1 py-0.5 -mx-1">
              <span className="text-slate-300">{m.name}</span>
              <GradeBadge grade={m.grade} score={m.score} />
            </Link>
          ))}
        </div>
      </Card>
      <Card className="p-5 bg-slate-900 border-slate-800">
        <h3 className="text-sm font-semibold text-rose-400 mb-3">Top Risks</h3>
        <div className="space-y-2">
          {topRisks.map((m) => (
            <Link key={m.id} to={`/demo/modules/${m.id}`} className="flex items-center justify-between text-sm hover:bg-slate-800/60 rounded-md px-1 py-0.5 -mx-1">
              <span className="text-slate-300">{m.name}</span>
              <GradeBadge grade={m.grade} score={m.score} />
            </Link>
          ))}
        </div>
      </Card>
    </div>
  </div>
);

export default Overview;
