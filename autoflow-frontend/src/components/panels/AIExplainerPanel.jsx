import React from 'react';
import { useWorkflowStore } from '../../store/workflowStore';
import { Bot, RefreshCw, X } from 'lucide-react';
import { workflowAPI } from '../../api/client';

export default function AIExplainerPanel() {
  const { explanation, setExplanation, currentWorkflow, nodes, edges } = useWorkflowStore();

  if (!explanation) return null;

  const handleReXplain = async () => {
      try {
          const res = await workflowAPI.explain({ nodes, edges });
          setExplanation(res.data.explanation || res.data); // Based on how backend wraps it
      } catch(e) { /* ignore */ }
  };

  return (
    <div className="absolute bottom-28 left-1/2 -translate-x-1/2 w-full max-w-3xl z-30">
        <div className="bg-purple-900/90 border border-purple-500/50 p-4 rounded-xl shadow-2xl backdrop-blur-md">
            <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2 text-purple-300 font-bold">
                    <Bot size={18} /> AI Explanation
                </div>
                <button onClick={() => setExplanation(null)} className="text-purple-400 hover:text-white">
                    <X size={16} />
                </button>
            </div>
            <p className="text-white text-sm leading-relaxed mb-3">
               {explanation}
            </p>
            <div className="flex justify-end gap-3">
                <button onClick={handleReXplain} className="text-xs flex items-center gap-1 text-purple-300 hover:text-white">
                    <RefreshCw size={12} /> Re-explain
                </button>
                <button onClick={() => setExplanation(null)} className="px-3 py-1 bg-purple-600 hover:bg-purple-500 text-white text-xs rounded-md">
                    Got it
                </button>
            </div>
        </div>
    </div>
  );
}
