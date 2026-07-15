import React from 'react';
import { Plug } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { workspace } from '@/data/revupDemoData';
import { integrationStyles, integrationLabel } from './styles';

const Integrations = () => (
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

export default Integrations;
