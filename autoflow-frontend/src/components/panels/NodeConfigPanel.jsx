import React from 'react';
import { X } from 'lucide-react';
import { useWorkflowStore } from '../../store/workflowStore';

export default function NodeConfigPanel() {
  const { selectedNode, updateNodeData, setSelectedNode } = useWorkflowStore();

  if (!selectedNode) return null;

  const data = selectedNode.data || {};
  const config = data.config || {};

  const handleConfigChange = (field, value) => {
    updateNodeData(selectedNode.id, { config: { ...config, [field]: value } });
  };

  const renderFields = () => {
    switch(selectedNode.type) {
      case 'trigger':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-xs text-gray-400 mb-1">Keywords (Comma separated)</label>
              <input 
                 type="text" 
                 className="w-full bg-dark-800 border border-white/10 rounded-lg p-2 text-white"
                 value={config.keywords?.join(', ') || ''}
                 onChange={(e) => handleConfigChange('keywords', e.target.value.split(',').map(s=>s.trim()))}
              />
            </div>
          </div>
        );
      case 'whatsapp':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-xs text-gray-400 mb-1">To (Number or Variable)</label>
              <input 
                 type="text" 
                 className="w-full bg-dark-800 border border-white/10 rounded-lg p-2 text-white"
                 value={config.to || '{{trigger.from}}'}
                 onChange={(e) => handleConfigChange('to', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">Message Body</label>
              <textarea 
                 className="w-full bg-dark-800 border border-white/10 rounded-lg p-2 text-white h-32"
                 value={config.message || ''}
                 onChange={(e) => handleConfigChange('message', e.target.value)}
                 placeholder="Hello {{trigger.from}}, we have {{inventory.quantity}} left!"
              />
            </div>
          </div>
        );
      case 'condition':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-xs text-gray-400 mb-1">Field to Compare</label>
              <input 
                 type="text" 
                 className="w-full bg-dark-800 border border-white/10 rounded-lg p-2 text-white"
                 value={config.field || 'inventory.quantity'}
                 onChange={(e) => handleConfigChange('field', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">Operator</label>
              <select 
                 className="w-full bg-dark-800 border border-white/10 rounded-lg p-2 text-white"
                 value={config.operator || 'greater_than'}
                 onChange={(e) => handleConfigChange('operator', e.target.value)}
              >
                 <option value="greater_than">&gt; Greater Than</option>
                 <option value="equals">== Equals</option>
                 <option value="contains">Contains</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">Value</label>
              <input 
                 type="text" 
                 className="w-full bg-dark-800 border border-white/10 rounded-lg p-2 text-white"
                 value={config.value || ''}
                 onChange={(e) => handleConfigChange('value', e.target.value)}
              />
            </div>
          </div>
        );
      case 'delay':
         return (
             <div className="space-y-4">
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Wait Seconds</label>
                  <input 
                     type="number" 
                     className="w-full bg-dark-800 border border-white/10 rounded-lg p-2 text-white"
                     value={config.wait_seconds || 0}
                     onChange={(e) => handleConfigChange('wait_seconds', parseInt(e.target.value))}
                  />
                </div>
              </div>
         );
      case 'inventory':
         return (
             <div className="space-y-4">
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Inventory Source</label>
                  <select 
                     className="w-full bg-dark-800 border border-white/10 rounded-lg p-2 text-white"
                     value={config.source_id || ''}
                     onChange={(e) => handleConfigChange('source_id', e.target.value)}
                  >
                     <option value="csv_1">Products CSV</option>
                     <option value="csv_2">Udhaar List CSV</option>
                  </select>
                </div>
              </div>
         );
      default:
        return <p className="text-gray-500 text-sm">Select a specific node type to configure.</p>;
    }
  };

  return (
    <div className="absolute right-0 top-0 h-full w-80 bg-dark-900 border-l border-white/10 shadow-2xl p-6 z-50 flex flex-col overflow-y-auto transform transition-transform duration-300">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-white capitalize">{selectedNode.type} Node</h3>
        <button onClick={() => setSelectedNode(null)} className="text-gray-400 hover:text-white">
          <X size={20} />
        </button>
      </div>

      <div className="mb-6">
        <label className="block text-xs text-gray-400 mb-1">Node Label</label>
        <input 
           type="text" 
           className="w-full bg-dark-800 border border-white/10 rounded-lg p-2 text-white"
           value={data.label || ''}
           onChange={(e) => updateNodeData(selectedNode.id, { label: e.target.value })}
        />
      </div>

      {renderFields()}

      <div className="mt-auto pt-6">
         <button onClick={() => setSelectedNode(null)} className="w-full bg-primary hover:bg-primary-hover text-white py-2 rounded-lg font-medium">
             Done
         </button>
      </div>
    </div>
  );
}
