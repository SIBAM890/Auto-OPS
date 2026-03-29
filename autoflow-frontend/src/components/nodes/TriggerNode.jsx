import React from 'react';
import { Handle, Position } from 'reactflow';
import { Zap } from 'lucide-react';

export default function TriggerNode({ data, selected }) {
  return (
    <div className={`rounded-xl shadow-lg bg-green-950 p-4 w-64 border-2 transition-all ${selected ? 'border-green-400 shadow-green-900/50' : 'border-green-800'}`}>
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 bg-green-500/20 rounded-lg text-green-400 text-xl">
           <Zap size={20} />
        </div>
        <div className="flex-1">
          <div className="font-bold text-white text-sm">{data.label || 'Trigger'}</div>
          <div className="text-xs text-green-300">
             {data.config?.keywords ? `Keywords: ${data.config.keywords.join(', ')}` : data.trigger_type || 'whatsapp_message'}
          </div>
        </div>
      </div>
      <Handle type="source" position={Position.Right} id="a" className="w-3 h-3 bg-green-400" />
    </div>
  );
}
