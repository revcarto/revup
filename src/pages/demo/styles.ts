export const severityStyles: Record<string, string> = {
  P0: 'bg-rose-500/15 text-rose-400 border-rose-500/40',
  P1: 'bg-amber-500/15 text-amber-400 border-amber-500/40',
  P2: 'bg-slate-500/15 text-slate-300 border-slate-500/40',
};

export const integrationStyles: Record<string, string> = {
  connected: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/40',
  manual_fallback: 'bg-amber-500/15 text-amber-400 border-amber-500/40',
  not_started: 'bg-slate-600/20 text-slate-400 border-slate-600/40',
};

export const integrationLabel: Record<string, string> = {
  connected: 'Connected',
  manual_fallback: 'Manual Fallback',
  not_started: 'Not Started',
};
