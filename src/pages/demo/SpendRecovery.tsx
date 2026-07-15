import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { spendSheet, spendRecoveryNote } from '@/data/revupDemoData';

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

export default SpendRecovery;
