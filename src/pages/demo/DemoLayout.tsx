import React from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import {
  Gauge,
  LayoutGrid,
  ClipboardList,
  DollarSign,
  ListChecks,
  Compass,
  Plug,
  ArrowLeft,
  BarChart3,
  FolderOpen,
  FileText,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { workspace } from '@/data/revupDemoData';

const navItems = [
  { to: '/demo', label: 'Workspace Overview', icon: <LayoutGrid className="h-4 w-4" />, end: true },
  { to: '/demo/dashboard', label: 'Reporting Dashboard', icon: <BarChart3 className="h-4 w-4" /> },
  { to: '/demo/modules', label: '10 Audit Modules', icon: <ClipboardList className="h-4 w-4" /> },
  { to: '/demo/scorecard', label: 'Revenue Scorecard', icon: <Gauge className="h-4 w-4" /> },
  { to: '/demo/spend', label: 'SaaS Spend Recovery', icon: <DollarSign className="h-4 w-4" /> },
  { to: '/demo/fixlist', label: '90-Day Action Plan', icon: <ListChecks className="h-4 w-4" /> },
  { to: '/demo/gtm', label: 'GTM Blueprint', icon: <Compass className="h-4 w-4" /> },
  { to: '/demo/resources', label: 'Resources / Data Room', icon: <FolderOpen className="h-4 w-4" /> },
  { to: '/demo/report', label: 'Full Audit Report', icon: <FileText className="h-4 w-4" /> },
  { to: '/demo/integrations', label: 'Integrations', icon: <Plug className="h-4 w-4" /> },
];

const titleFor = (pathname: string) => {
  const exact = navItems.find((n) => n.to === pathname);
  if (exact) return exact.label;
  if (pathname.startsWith('/demo/modules/')) return 'Module Report';
  return 'RevUp Engine';
};

const DemoLayout = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex">
      <aside className="w-64 shrink-0 bg-slate-900 border-r border-slate-800 flex flex-col fixed inset-y-0 overflow-y-auto">
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
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-teal-500/15 text-teal-300 border border-teal-500/30'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-transparent'
                }`
              }
            >
              {item.icon}
              {item.label}
            </NavLink>
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

      <main className="flex-1 ml-64">
        <header className="sticky top-0 z-10 bg-slate-950/90 backdrop-blur border-b border-slate-800 px-8 py-4 flex items-center justify-between print:hidden">
          <div>
            <h1 className="text-lg font-bold text-slate-50">{titleFor(location.pathname)}</h1>
            <p className="text-xs text-slate-500">RevCarto — First Test Engagement · Snapshot {workspace.engagement.snapshotDate}</p>
          </div>
          <Badge className="bg-amber-500/15 text-amber-400 border-amber-500/40">Demo Workspace</Badge>
        </header>

        <div className="p-8 max-w-6xl">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DemoLayout;
