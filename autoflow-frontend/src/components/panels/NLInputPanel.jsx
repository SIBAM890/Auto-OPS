import React, { useState } from 'react';
import { Sparkles, Loader2, Send } from 'lucide-react';
import { useWorkflowStore } from '../../store/workflowStore';
import { workflowAPI } from '../../api/client';

export default function NLInputPanel() {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { setNodes, setEdges, setExplanation, setCurrentWorkflow } = useWorkflowStore();

  const handleGenerate = async () => {
    if (!input.trim()) return;
    setIsLoading(true);
    
    try {
      const response = await workflowAPI.generate(input);
      if (response.data && response.data.success) {
        const wf = response.data.workflow;
        setNodes(wf.nodes || []);
        setEdges(wf.edges || []);
        setCurrentWorkflow({ name: wf.name || 'AI Generated Flow', nl_input: input });
        setExplanation(response.data.explanation);
      }
    } catch (error) {
      alert("Failed to generate workflow. Error: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-full max-w-3xl z-40">
      <div className="bg-dark-900 border border-white/10 p-3 rounded-2xl shadow-2xl flex items-center gap-3 backdrop-blur-xl">
        <div className="p-3 bg-primary/10 rounded-xl text-primary flex-shrink-0">
          <Sparkles size={20} />
        </div>
        
        <input 
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
          placeholder="Describe your automation in plain English... (e.g. 'If user asks for stock, check inventory')"
          className="bg-transparent border-none text-white w-full focus:outline-none placeholder:text-gray-500 text-lg"
          disabled={isLoading}
        />
        
        <button 
          onClick={handleGenerate}
          disabled={isLoading || !input.trim()}
          className="bg-primary hover:bg-primary-hover disabled:bg-gray-700 disabled:text-gray-400 text-white px-6 py-3 rounded-xl font-medium transition-all flex items-center gap-2 flex-shrink-0"
        >
          {isLoading ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Building...
            </>
          ) : (
            <>
              Generate Built <Send size={18} />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
