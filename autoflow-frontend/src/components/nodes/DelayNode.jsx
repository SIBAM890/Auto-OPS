import React from 'react';
import { Handle, Position } from 'reactflow';
import { Clock } from 'lucide-react';

export default function DelayNode({ data, selected }) {
  return (
    <div className={`rounded-xl shadow-lg bg-purple-950 p-4 w-64 border-2 transition-all ${selected ? 'border-purple-400 shadow-purple-900/50' : 'border-purple-800'}`}>
      <Handle type="target" position={Position.Left} className="w-3 h-3 bg-purple-400" />
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 bg-purple-500/20 rounded-lg text-purple-400">
           <Clock size={20} />
        </div>
        <div className="flex-1">
          <div className="font-bold text-white text-sm">{data.label || 'Delay'}</div>
          <div className="text-xs text-purple-300 truncate">
             Wait: {data.config?.wait_seconds || 0}s
          </div>
        </div>
      </div>
      <Handle type="source" position={Position.Right} className="w-3 h-3 bg-purple-400" />
    </div>
  );
}
