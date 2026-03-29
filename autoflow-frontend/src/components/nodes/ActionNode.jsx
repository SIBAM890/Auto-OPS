import React from 'react';
import { Handle, Position } from 'reactflow';
import { Settings } from 'lucide-react';

export default function ActionNode({ data, selected }) {
  return (
    <div className={`rounded-xl shadow-lg bg-blue-950 p-4 w-64 border-2 transition-all ${selected ? 'border-blue-400 shadow-blue-900/50' : 'border-blue-800'}`}>
      <Handle type="target" position={Position.Left} className="w-3 h-3 bg-blue-400" />
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400">
           <Settings size={20} />
        </div>
        <div className="flex-1">
          <div className="font-bold text-white text-sm">{data.label || 'Action'}</div>
          <div className="text-xs text-blue-300 truncate">
             {data.action_type || 'Action'}
          </div>
        </div>
      </div>
      <Handle type="source" position={Position.Right} className="w-3 h-3 bg-blue-400" />
    </div>
  );
}
