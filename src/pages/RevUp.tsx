import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  ArrowRight,
  Gauge,
  DollarSign,
  Users,
  Workflow,
  Database,
  Bot,
  Target,
  Layers,
  Building2,
  TrendingUp,
  CheckCircle2,
} from 'lucide-react';

const modules = [
  { icon: <Building2 className="h-5 w-5" />, name: 'Company & Revenue Baseline' },
  { icon: <TrendingUp className="h-5 w-5" />, name: 'Market & Competitive Position' },
  { icon: <Target className="h-5 w-5" />, name: 'ICP & Buyer Intelligence' },
  { icon: <ArrowRight className="h-5 w-5" />, name: 'Sales Channels & Pipeline' },
  { icon: <Layers className="h-5 w-5" />, name: 'Tech Stack & Systems' },
  { icon: <DollarSign className="h-5 w-5" />, name: 'SaaS & Tool Spend' },
  { icon: <Users className="h-5 w-5" />, name: 'People & Org Coverage' },
  { icon: <Workflow className="h-5 w-5" />, name: 'Process & Workflow' },
  { icon: <Database className="h-5 w-5" />, name: 'Data & Reporting Integrity' },
  { icon: <Bot className="h-5 w-5" />, name: 'AI Readiness & Automation' },
];

const whoItsFor = [
  'B2B companies $1M–$25M revenue with a sales team of 2–25',
  "Founders who know revenue is leaking but can't see where",
  'Companies who bought tools (HubSpot, Apollo, ad platforms, AI) that never got wired together',
  'PE/VC-backed companies post-funding or post-merger needing a revenue operations baseline',
  'Companies about to hire a RevOps/CRO and wanting the map before the hire',
];

const problems = [
  { stat: '20–40%', label: 'of SaaS spend is redundant, unused, or overlapping' },
  { stat: '~30%/yr', label: 'CRM data decay rate — reports built on it are fiction' },
  { stat: '15+', label: 'revenue tools typically owned, only ~3 actually integrated' },
  { stat: '$0', label: 'measured workflow impact from most paid AI subscriptions' },
];

const deliverables = [
  'The Revenue System Scorecard™ — every module graded Red/Yellow/Green with a composite Revenue Health Score (0–100)',
  'The Full Audit Report (40–60 pages) — findings, evidence, and benchmarks per module',
  'SaaS Spend Recovery Sheet — line-by-line spend analysis with identified savings',
  'The 90-Day Fix List — prioritized, sequenced, owner-assigned remediation plan (P0/P1/P2)',
  'The GTM Blueprint — channel priorities, budget allocation, messaging framework, 2-quarter targets',
  'Executive Walkthrough — 90-minute live session with leadership, recorded',
  'The Data Room — every artifact and raw finding organized in a shared drive you keep forever',
];

const timeline = [
  { week: 'Week 1', focus: 'Kickoff, access provisioning, Company + Market + ICP modules', time: '2 hrs' },
  { week: 'Week 2', focus: 'Systems, Spend, Channels modules', time: '1 hr' },
  { week: 'Week 3', focus: 'People, Process, Data, AI modules', time: '1–2 hrs' },
  { week: 'Week 4', focus: 'Synthesis, Scorecard, GTM Blueprint, Executive Walkthrough', time: '90 min' },
];

const retainerTiers = [
  { name: 'Maintain', price: '$1,500/mo', desc: 'CRM admin, hygiene, reporting, 48-hr change SLA' },
  { name: 'Optimize', price: '$3,000/mo', desc: 'Maintain + process buildouts, automation, monthly strategy review' },
  { name: 'Scale', price: '$5,000/mo', desc: 'Optimize + outbound infrastructure, AI workflow deployment, quarterly GTM refresh' },
];

const RevUp = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-teal-500/10 via-transparent to-transparent pointer-events-none" />
        <div className="container mx-auto max-w-5xl relative">
          <div className="flex items-center gap-2 mb-6">
            <div className="p-2 rounded-lg bg-teal-500/10 border border-teal-500/30">
              <Gauge className="h-5 w-5 text-teal-400" />
            </div>
            <span className="text-sm font-semibold tracking-widest text-teal-400 uppercase">
              A RevCarto Product
            </span>
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black mb-6 leading-tight">
            <span className="bg-gradient-to-r from-teal-300 via-emerald-400 to-teal-500 bg-clip-text text-transparent">
              RevUp™
            </span>
            <span className="block text-2xl sm:text-3xl lg:text-4xl mt-4 text-foreground font-bold">
              Revenue Audit &amp; GTM Blueprint
            </span>
          </h1>
          <p className="text-xl sm:text-2xl text-foreground max-w-3xl leading-relaxed mb-4">
            Your entire revenue engine, mapped, scored, and fixed — in 30 days.
          </p>
          <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed mb-10">
            We audit every system that touches revenue — your CRM, your tools, your spend, your people,
            your processes, your data, your AI — and hand you a graded scorecard, a 90-day fix list, and
            a go-to-market blueprint your team can execute Monday morning.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/demo">
              <Button size="lg" className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-6 text-lg group shadow-xl shadow-teal-500/20">
                See It Run on RevCarto
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform" />
              </Button>
            </Link>
            <a href="mailto:jason@revcarto.com?subject=RevUp%E2%84%A2%20Walkthrough">
              <Button size="lg" variant="outline" className="border-teal-500/40 text-foreground hover:bg-teal-500/10 px-8 py-6 text-lg">
                Book a Walkthrough
              </Button>
            </a>
          </div>
          <p className="text-sm text-muted-foreground mt-6 italic">
            "A 30-day X-ray of your revenue engine — every tool, dollar, person, and process — scored and fixed."
          </p>
        </div>
      </section>

      {/* Who it's for */}
      <section className="py-16 px-4 bg-secondary/50">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-foreground">Who It's For</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {whoItsFor.map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-4 rounded-lg bg-card border border-border">
                <CheckCircle2 className="h-5 w-5 text-teal-400 shrink-0 mt-0.5" />
                <span className="text-foreground/90">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The problem */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl sm:text-4xl font-bold mb-2 text-foreground">
            You Don't Have a Revenue Problem
          </h2>
          <p className="text-xl text-teal-400 font-semibold mb-8">You have a visibility problem.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {problems.map((p, i) => (
              <Card key={i} className="p-6 bg-card border-border text-center">
                <div className="text-3xl font-black text-teal-400 mb-2">{p.stat}</div>
                <div className="text-sm text-muted-foreground">{p.label}</div>
              </Card>
            ))}
          </div>
          <p className="text-muted-foreground mt-8 max-w-3xl">
            RevUp™ exists because you can't fix what you can't see, and you can't see it while you're
            running the business.
          </p>
        </div>
      </section>

      {/* 10 modules */}
      <section className="py-16 px-4 bg-secondary/50">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl sm:text-4xl font-bold mb-2 text-foreground">The 10 Audit Modules</h2>
          <p className="text-muted-foreground mb-8">Every system that touches revenue, examined.</p>
          <div className="grid sm:grid-cols-2 gap-4">
            {modules.map((m, i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-lg bg-card border border-border hover:border-teal-500/40 transition-colors">
                <div className="p-2 rounded-md bg-teal-500/10 text-teal-400">{m.icon}</div>
                <div>
                  <div className="text-xs text-muted-foreground">Module {i + 1}</div>
                  <div className="font-medium text-foreground">{m.name}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deliverables */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-foreground">Deliverables</h2>
          <div className="space-y-3">
            {deliverables.map((d, i) => (
              <div key={i} className="flex items-start gap-3">
                <Badge className="bg-teal-500/15 text-teal-400 border-teal-500/30 shrink-0 mt-0.5">{i + 1}</Badge>
                <span className="text-foreground/90">{d}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 px-4 bg-secondary/50">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl sm:text-4xl font-bold mb-2 text-foreground">Timeline</h2>
          <p className="text-muted-foreground mb-8">Total client lift: under 6 hours. We pull from systems, not from your calendar.</p>
          <div className="grid md:grid-cols-4 gap-4">
            {timeline.map((t, i) => (
              <Card key={i} className="p-5 bg-card border-border">
                <div className="text-teal-400 font-bold text-sm mb-2">{t.week}</div>
                <div className="text-foreground/90 text-sm mb-3">{t.focus}</div>
                <div className="text-xs text-muted-foreground">Client time: {t.time}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-foreground">Pricing &amp; Terms</h2>
          <Card className="p-8 bg-gradient-to-br from-teal-500/10 to-emerald-500/10 border-teal-500/20">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-6">
              <div>
                <div className="text-sm text-muted-foreground mb-1">RevUp™ Audit &amp; Blueprint</div>
                <div className="text-5xl font-black text-foreground">$4,500 <span className="text-lg font-normal text-muted-foreground">flat</span></div>
              </div>
              <div className="text-sm text-muted-foreground">No hourly billing. No scope creep.</div>
            </div>
            <ul className="space-y-2 text-sm text-foreground/90">
              <li>• Conversion credit: 100% of the audit fee credits against your first month of a RevPod™ retainer if you start within 30 days of the walkthrough.</li>
              <li>• Savings guarantee: if the SaaS Spend Recovery Sheet doesn't identify at least the audit fee in annualized recoverable spend or measurable pipeline leakage, we'll say so plainly — and you still own the full blueprint.</li>
              <li>• Payment: 50% at kickoff, 50% at walkthrough.</li>
            </ul>
          </Card>
        </div>
      </section>

      {/* The Bridge */}
      <section className="py-16 px-4 bg-secondary/50">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-foreground">The Bridge</h2>
          <Card className="p-8 bg-card border-border mb-8">
            <p className="text-lg text-foreground/90 italic leading-relaxed">
              "You now have 14 red boxes and 9 yellow ones. You can fix them yourself with the 90-day
              list — everything you need is in there. Or the pod that found them turns them green for a
              flat monthly fee, and this scorecard becomes your monthly scoreboard."
            </p>
          </Card>
          <div className="grid md:grid-cols-3 gap-4">
            {retainerTiers.map((t, i) => (
              <Card key={i} className="p-6 bg-card border-border">
                <div className="text-teal-400 font-bold mb-1">{t.name}</div>
                <div className="text-2xl font-black text-foreground mb-3">{t.price}</div>
                <div className="text-sm text-muted-foreground">{t.desc}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-foreground">
            Want to see what your scorecard would look like?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            We ran RevUp™ on RevCarto itself as the first test engagement — 14 findings, a composite
            score, a fix list, everything. See it live.
          </p>
          <Link to="/demo">
            <Button size="lg" className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-6 text-lg group shadow-xl shadow-teal-500/20">
              Launch the RevCarto Demo Workspace
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default RevUp;
