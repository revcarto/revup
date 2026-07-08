import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Gauge,
  LayoutGrid,
  ClipboardList,
  DollarSign,
  ListChecks,
  Compass,
  Plug,
  ArrowLeft,
  Building2,
  Mail,
  MapPin,
  Users2,
  ChevronRight,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import GradeBadge, { GradeDot } from '@/components/revup/GradeBadge';
import ScoreDial from '@/components/revup/ScoreDial';
import {
  workspace,
  modules,
  compositeScore,
  topWins,
  topRisks,
  spendSheet,
  spendRecoveryNote,
  fixList,
  gtmBlueprint,
  type Grade,
} from '@/data/revupDemoData';

type View = 'overview' | 'modules' | 'scorecard' | 'spend' | 'fixlist' | 'gtm' | 'integrations';

const navItems: { id: View; label: string; icon: React.ReactNode }[] = [
  { id: 'overview', label: 'Workspace Overview', icon: <LayoutGrid className="h-4 w-4" /> },
  { id: 'modules', label: '10 Audit Modules', icon: <ClipboardList className="h-4 w-4" /> },
  { id: 'scorecard', label: 'Revenue Scorecard', icon: <Gauge className="h-4 w-4" /> },
  { id: 'spend', label: 'SaaS Spend Recovery', icon: <DollarSign className="h-4 w-4" /> },
  { id: 'fixlist', label: '90-Day Fix List', icon: <ListChecks className="h-4 w-4" /> },
  { id: 'gtm', label: 'GTM Blueprint', icon: <Compass className="h-4 w-4" /> },
  { id: 'integrations', label: 'Integrations', icon: <Plug className="h-4 w-4" /> },
];

const severityStyles: Record<string, string> = {
  P0: 'bg-rose-500/15 text-rose-400 border-rose-500/40',
  P1: 'bg-amber-500/15 text-amber-400 border-amber-500/40',
  P2: 'bg-slate-500/15 text-slate-300 border-slate-500/40',
};

const integrationStyles: Record<string, string> = {
  connected: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/40',
  manual_fallback: 'bg-amber-500/15 text-amber-400 border-amber-500/40',
  not_started: 'bg-slate-600/20 text-slate-400 border-slate-600/40',
};

const integrationLabel: Record<string, string> = {
  connected: 'Connected',
  manual_fallback: 'Manual Fallback',
  not_started: 'Not Started',
};

const RevUpDemo = () => {
  const [view, setView] = useState<View>('overview');
  const [selectedModuleId, setSelectedModuleId] = useState<number | null>(null);
  const selectedModule = modules.find((m) => m.id === selectedModuleId) ?? null;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex">
      {/* Sidebar */}
      <aside className="w-64 shrink-0 bg-slate-900 border-r border-slate-800 flex flex-col fixed inset-y-0">
        <div className="px-5 py-5 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-md bg-teal-500/15 border border-teal-500/30">
              <Gauge className="h-4 w-4 text-teal-400" />
            </div>
            <span className="font-bold text-slate-50">RevUp Engine</span>
          </div>
          <div className="text-[11px] text-slate-500 mt-1 tracking-wide uppercase">Internal Delivery Platform</div>
        </div>

        <div className="px-5 py-4 border-b border-slate-800">
          <div className="text-[11px] uppercase tracking-widest text-slate-500 mb-2">Active Workspace</div>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-md bg-teal-500/15 border border-teal-500/30 flex items-center justify-center text-teal-400 font-bold text-sm">
              RC
            </div>
            <div>
              <div className="text-sm font-semibold text-slate-100">{workspace.companyName}</div>
              <div className="text-[11px] text-slate-500 capitalize">{workspace.engagement.status} · Engagement #001</div>
            </div>
          </div>
        </div>

        <nav className="flex-1 py-4 px-3 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                view === item.id
                  ? 'bg-teal-500/15 text-teal-300 border border-teal-500/30'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-transparent'
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        <div className="px-5 py-4 border-t border-slate-800">
          <Link to="/" className="flex items-center gap-2 text-xs text-slate-500 hover:text-teal-400 transition-colors">
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to RevUp™ overview
          </Link>
          <div className="text-[10px] text-slate-600 mt-2">Demo Mode — sample &amp; illustrative data</div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 ml-64">
        <header className="sticky top-0 z-10 bg-slate-950/90 backdrop-blur border-b border-slate-800 px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-slate-50">
              {navItems.find((n) => n.id === view)?.label}
            </h1>
            <p className="text-xs text-slate-500">RevCarto — First Test Engagement · Snapshot {workspace.engagement.snapshotDate}</p>
          </div>
          <Badge className="bg-amber-500/15 text-amber-400 border-amber-500/40">Demo Workspace</Badge>
        </header>

        <div className="p-8 max-w-6xl">
          {view === 'overview' && <Overview onOpenModule={setSelectedModuleId} setView={setView} />}
          {view === 'modules' && <ModulesGrid onOpenModule={setSelectedModuleId} />}
          {view === 'scorecard' && <Scorecard />}
          {view === 'spend' && <SpendRecovery />}
          {view === 'fixlist' && <FixListView />}
          {view === 'gtm' && <GtmBlueprintView />}
          {view === 'integrations' && <IntegrationsView />}
        </div>
      </main>

      {/* Module detail sheet */}
      <Sheet open={!!selectedModule} onOpenChange={(open) => !open && setSelectedModuleId(null)}>
        <SheetContent side="right" className="bg-slate-900 border-slate-800 text-slate-100 w-full sm:max-w-xl overflow-y-auto">
          {selectedModule && (
            <>
              <SheetHeader className="text-left">
                <div className="flex items-center gap-2 mb-1">
                  <GradeDot grade={selectedModule.grade} />
                  <span className="text-xs uppercase tracking-widest text-slate-500">Module {selectedModule.id}</span>
                </div>
                <SheetTitle className="text-slate-50 text-xl">{selectedModule.name}</SheetTitle>
                <SheetDescription className="text-slate-400">{selectedModule.rationale}</SheetDescription>
              </SheetHeader>

              <div className="mt-6 flex items-center gap-4">
                <GradeBadge grade={selectedModule.grade} score={selectedModule.score} />
                <span className="text-xs text-slate-500">Composite weight: {selectedModule.weight}%</span>
              </div>

              <Tabs defaultValue="findings" className="mt-6">
                <TabsList className="bg-slate-800">
                  <TabsTrigger value="inputs">Inputs</TabsTrigger>
                  <TabsTrigger value="findings">Findings</TabsTrigger>
                </TabsList>
                <TabsContent value="inputs" className="mt-4 space-y-2">
                  {selectedModule.inputs.map((inp, i) => (
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
                </TabsContent>
                <TabsContent value="findings" className="mt-4 space-y-3">
                  {selectedModule.findings.map((f, i) => (
                    <Card key={i} className="p-4 bg-slate-800/60 border-slate-800">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className={severityStyles[f.severity]}>{f.severity}</Badge>
                        <span className="text-[10px] uppercase tracking-wider text-slate-500">Confidence: {f.confidence}</span>
                      </div>
                      <p className="text-sm text-slate-200 leading-relaxed mb-2">{f.text}</p>
                      <p className="text-xs text-slate-500 italic">Evidence: {f.evidence}</p>
                    </Card>
                  ))}
                </TabsContent>
              </Tabs>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

const Overview = ({ onOpenModule, setView }: { onOpenModule: (id: number) => void; setView: (v: View) => void }) => (
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
    </Card>

    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-slate-500">Module Progress</h2>
        <button onClick={() => setView('modules')} className="text-xs text-teal-400 flex items-center gap-1 hover:underline">
          View all <ChevronRight className="h-3 w-3" />
        </button>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {modules.map((m) => (
          <button
            key={m.id}
            onClick={() => onOpenModule(m.id)}
            className="text-left p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-teal-500/40 transition-colors"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] uppercase tracking-wider text-slate-500">M{m.id}</span>
              <GradeDot grade={m.grade} />
            </div>
            <div className="text-sm font-medium text-slate-200 mb-2">{m.shortName}</div>
            <div className="text-lg font-bold text-slate-50">{m.score}</div>
          </button>
        ))}
      </div>
    </div>

    <div className="grid md:grid-cols-2 gap-6">
      <Card className="p-5 bg-slate-900 border-slate-800">
        <h3 className="text-sm font-semibold text-emerald-400 mb-3">Top Wins</h3>
        <div className="space-y-2">
          {topWins.map((m) => (
            <div key={m.id} className="flex items-center justify-between text-sm">
              <span className="text-slate-300">{m.name}</span>
              <GradeBadge grade={m.grade} score={m.score} />
            </div>
          ))}
        </div>
      </Card>
      <Card className="p-5 bg-slate-900 border-slate-800">
        <h3 className="text-sm font-semibold text-rose-400 mb-3">Top Risks</h3>
        <div className="space-y-2">
          {topRisks.map((m) => (
            <div key={m.id} className="flex items-center justify-between text-sm">
              <span className="text-slate-300">{m.name}</span>
              <GradeBadge grade={m.grade} score={m.score} />
            </div>
          ))}
        </div>
      </Card>
    </div>
  </div>
);

const ModulesGrid = ({ onOpenModule }: { onOpenModule: (id: number) => void }) => (
  <div className="grid sm:grid-cols-2 gap-4">
    {modules.map((m) => (
      <Card
        key={m.id}
        onClick={() => onOpenModule(m.id)}
        className="p-5 bg-slate-900 border-slate-800 hover:border-teal-500/40 transition-colors cursor-pointer"
      >
        <div className="flex items-start justify-between mb-3">
          <div>
            <div className="text-[10px] uppercase tracking-wider text-slate-500 mb-1">Module {m.id}</div>
            <div className="font-semibold text-slate-100">{m.name}</div>
          </div>
          <GradeBadge grade={m.grade} score={m.score} />
        </div>
        <p className="text-sm text-slate-400 leading-relaxed mb-3">{m.rationale}</p>
        <div className="text-xs text-slate-500">{m.findings.length} findings · click to review</div>
      </Card>
    ))}
  </div>
);

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
        <Card key={m.id} className="p-4 bg-slate-900 border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] uppercase tracking-wider text-slate-500">M{m.id} · {m.weight}%</span>
            <GradeDot grade={m.grade} />
          </div>
          <div className="text-sm font-medium text-slate-200 mb-1">{m.shortName}</div>
          <div className="text-2xl font-black text-slate-50 mb-2">{m.score}</div>
          <Progress value={m.score} className="h-1.5 bg-slate-800" indicatorClassName="bg-teal-400" />
        </Card>
      ))}
    </div>
  </div>
);

const SpendRecovery = () => (
  <div className="space-y-6">
    <Card className="p-6 bg-gradient-to-br from-teal-500/10 to-emerald-500/10 border-teal-500/20">
      <div className="text-xs uppercase tracking-widest text-slate-400 mb-1">Total Identified Recovery Opportunity</div>
      <div className="text-4xl font-black text-slate-50">~$10,000–$21,000/yr</div>
      <p className="text-sm text-slate-400 mt-2 max-w-2xl">{spendRecoveryNote}</p>
    </Card>
    <Card className="bg-slate-900 border-slate-800 overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="border-slate-800 hover:bg-transparent">
            <TableHead className="text-slate-400">Tool</TableHead>
            <TableHead className="text-slate-400">Category</TableHead>
            <TableHead className="text-slate-400">Est. Annual Cost</TableHead>
            <TableHead className="text-slate-400">Seats</TableHead>
            <TableHead className="text-slate-400">Utilization</TableHead>
            <TableHead className="text-slate-400">Verdict</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {spendSheet.map((s, i) => (
            <TableRow key={i} className="border-slate-800">
              <TableCell className="text-slate-200 font-medium">{s.tool}</TableCell>
              <TableCell className="text-slate-400">{s.category}</TableCell>
              <TableCell className="text-slate-400">{s.estAnnualCost}</TableCell>
              <TableCell className="text-slate-400">{s.seats}</TableCell>
              <TableCell className="text-slate-400">{s.utilization}</TableCell>
              <TableCell>
                <Badge
                  className={
                    s.verdict === 'Keep'
                      ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/40'
                      : s.verdict === 'Cut'
                      ? 'bg-rose-500/15 text-rose-400 border-rose-500/40'
                      : 'bg-amber-500/15 text-amber-400 border-amber-500/40'
                  }
                >
                  {s.verdict}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  </div>
);

const FixListView = () => (
  <div className="grid md:grid-cols-3 gap-5">
    {[1, 2, 3].map((sprint) => (
      <div key={sprint}>
        <div className="text-xs uppercase tracking-widest text-slate-500 mb-3">
          Sprint {sprint} · Days {sprint === 1 ? '1–30' : sprint === 2 ? '31–60' : '61–90'}
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
);

const GtmBlueprintView = () => (
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

const IntegrationsView = () => (
  <div className="space-y-3">
    {workspace.integrations.map((int, i) => (
      <Card key={i} className="p-4 bg-slate-900 border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Plug className="h-4 w-4 text-slate-500" />
          <div>
            <div className="text-sm font-medium text-slate-200">{int.provider}</div>
            <div className="text-xs text-slate-500">{int.note}</div>
          </div>
        </div>
        <Badge className={integrationStyles[int.status]}>{integrationLabel[int.status]}</Badge>
      </Card>
    ))}
  </div>
);

export default RevUpDemo;
