import React from 'react';
import { Handle, Position } from 'reactflow';
import { PackageSearch } from 'lucide-react';

export default function InventoryNode({ data, selected }) {
  return (
    <div className={`rounded-xl shadow-lg bg-orange-950 p-4 w-64 border-2 transition-all ${selected ? 'border-orange-400 shadow-orange-900/50' : 'border-orange-800'}`}>
      <Handle type="target" position={Position.Left} className="w-3 h-3 bg-orange-400" />
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 bg-orange-500/20 rounded-lg text-orange-400">
           <PackageSearch size={20} />
        </div>
        <div className="flex-1">
          <div className="font-bold text-white text-sm">{data.label || 'Inventory'}</div>
          <div className="text-xs text-orange-300 truncate">
             Source: {data.config?.source_id || 'CSV'}
          </div>
        </div>
      </div>
      <Handle type="source" position={Position.Right} className="w-3 h-3 bg-orange-400" />
    </div>
  );
}
