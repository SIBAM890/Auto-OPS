import React from 'react';
import { Handle, Position } from 'reactflow';
import { MessageCircle } from 'lucide-react'; // Fallback icon instead of raw SVG for now

export default function WhatsAppNode({ data, selected }) {
  return (
    <div className={`rounded-xl shadow-lg bg-emerald-950 p-4 w-64 border-2 transition-all ${selected ? 'border-emerald-400 shadow-emerald-900/50' : 'border-emerald-800'}`}>
      <Handle type="target" position={Position.Left} className="w-3 h-3 bg-emerald-400" />
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 bg-emerald-500/20 rounded-lg text-emerald-400">
           <MessageCircle size={20} />
        </div>
        <div className="flex-1">
          <div className="font-bold text-white text-sm">{data.label || 'WhatsApp'}</div>
          <div className="text-xs text-emerald-300 truncate opacity-80" title={data.config?.message}>
             {data.config?.message || 'Send Message'}
          </div>
        </div>
      </div>
      <Handle type="source" position={Position.Right} className="w-3 h-3 bg-emerald-400" />
    </div>
  );
}
