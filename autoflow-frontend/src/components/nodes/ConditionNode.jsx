import React from 'react';
import { Handle, Position } from 'reactflow';
import { Split } from 'lucide-react';

export default function ConditionNode({ data, selected }) {
  return (
    <div className={`rounded-xl shadow-lg bg-yellow-950 p-4 w-64 border-2 transition-all ${selected ? 'border-yellow-400 shadow-yellow-900/50' : 'border-yellow-800'}`}>
      <Handle type="target" position={Position.Left} className="w-3 h-3 bg-yellow-400" />
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 bg-yellow-500/20 rounded-lg text-yellow-400">
           <Split size={20} />
        </div>
        <div className="flex-1">
          <div className="font-bold text-white text-sm">{data.label || 'Condition'}</div>
          <div className="text-xs text-yellow-300 truncate">
             {data.config ? `${data.config.field} ${data.config.operator}` : 'Compare'}
          </div>
        </div>
      </div>
      
      {/* Two outputs for Condition: True and False */}
      <div className="flex justify-end mt-4 gap-2 text-xs relative">
          <div className="absolute -right-2 top-0 text-green-400">true</div>
          <Handle type="source" position={Position.Right} id="true" className="w-3 h-3 bg-green-500 top-[60%]" />
          
          <div className="absolute -right-2 top-6 text-red-400">false</div>
          <Handle type="source" position={Position.Right} id="false" className="w-3 h-3 bg-red-500 top-[85%]" />
      </div>
    </div>
  );
}
