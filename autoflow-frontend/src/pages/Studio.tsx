// @ts-nocheck
import React, { useState } from 'react';
import { ReactFlowProvider } from 'reactflow';
import { WorkflowGraph } from '../components/visualization/WorkflowGraph';
import { ChatInterface } from '../components/builder/ChatInterface';
import { NodePalette } from '../components/builder/NodePalette';
import { Play, Download, Settings, MousePointer2, Move, ChevronLeft, ChevronRight, Smartphone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Modal } from '../components/ui/Modal';
import { TestMode } from '../components/simulation/TestMode';
import 'reactflow/dist/style.css';

export default function Studio() {
  const [workflowData, setWorkflowData] = useState(null);
  const [activeTab, setActiveTab] = useState("chat"); // 'chat' | 'settings'
  const [isLeftOpen, setIsLeftOpen] = useState(true);
  const [isRightOpen, setIsRightOpen] = useState(true);
  const [isTestOpen, setIsTestOpen] = useState(false);
  const navigate = useNavigate();

  const handleWorkflowGenerated = (workflow) => {
    setWorkflowData(workflow);
  };

  return (
    <div className="flex w-full h-full bg-[#1e1e1e] overflow-hidden text-sm font-sans">
      
      {/* ── LEFT PANEL: Toolbox ──────────────────────────────── */}
      <aside className={`border-r border-black/40 bg-[#252526] shrink-0 flex flex-col z-20 shadow-xl transition-all duration-300 ${isLeftOpen ? 'w-64' : 'w-0 opacity-0'}`}>
        <div className={`p-4 border-b border-black/40 flex justify-between items-center ${!isLeftOpen && 'hidden'}`}>
           <h3 className="font-semibold text-white tracking-wide uppercase text-xs flex items-center gap-2">
             <span className="w-2 h-2 rounded-full bg-purple-500"></span> Toolbox
           </h3>
        </div>
        
        {/* Real functional palette embedded here */}
        <div className={`flex-1 overflow-y-auto ${!isLeftOpen && 'hidden'}`}>
           {/* If NodePalette has white backgrounds, we might need to modify it later, but here is the logic integration */}
           <NodePalette />
        </div>
        
        <div className={`p-3 border-t border-black/40 text-center text-xs text-gray-500 ${!isLeftOpen && 'hidden'}`}>
           Drag & Drop to build
        </div>
      </aside>

      {/* ── CENTER PANEL: Canvas ──────────────────────────────── */}
      <main className="flex-1 relative flex flex-col bg-[#1e1e1e]">
        
        {/* Toggle Left Panel */}
        <button 
           onClick={() => setIsLeftOpen(!isLeftOpen)}
           className="absolute top-1/2 left-0 -translate-y-1/2 bg-[#252526] border border-l-0 border-black/40 p-1.5 rounded-r-md z-40 text-gray-400 hover:text-white shadow-md transition-colors"
        >
           {isLeftOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
        </button>

        {/* Toggle Right Panel */}
        <button 
           onClick={() => setIsRightOpen(!isRightOpen)}
           className="absolute top-1/2 right-0 -translate-y-1/2 bg-[#121212] border border-r-0 border-black/40 p-1.5 rounded-l-md z-40 text-gray-400 hover:text-white shadow-[-2px_0_5px_rgba(0,0,0,0.3)] transition-colors"
        >
           {isRightOpen ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>

        {/* Header toolbar over canvas */}
        <header className="absolute top-0 left-0 right-0 flex items-center justify-between border-b border-black/40 px-6 py-4 bg-[#252526]/90 backdrop-blur z-50 w-full shadow-sm">
          <div className="flex items-center gap-4">
            <h2 className="text-sm font-semibold text-white">AutoFlow Lead Generation</h2>
            <div className="px-2 py-0.5 bg-green-500/10 text-green-400 border border-green-500/20 rounded text-[10px] font-bold uppercase tracking-wide">Saved</div>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsTestOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 bg-amber-500/10 border border-amber-500/20 hover:bg-amber-500/20 text-amber-500 rounded font-medium text-xs transition-colors animate-pulse"
            >
              <Smartphone className="w-3.5 h-3.5" /> Test Automation
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 hover:bg-white/10 text-gray-300 rounded font-medium text-xs transition-colors">
              <Download className="w-3.5 h-3.5" /> Export
            </button>
            <button 
              onClick={() => navigate('/deploy-agent')}
              className="flex items-center gap-2 px-3 py-1.5 bg-[#ff6d5a] hover:bg-[#ff6d5a]/90 text-white rounded font-medium text-xs shadow-md transition-colors"
            >
              <Play className="w-3.5 h-3.5 fill-current" /> Deploy Agent
            </button>
          </div>
        </header>

        {/* Canvas controls */}
        <div className="absolute top-20 left-6 flex gap-2 z-40">
           <div className="bg-[#252526] border border-black/40 p-2 rounded-lg shadow-lg flex items-center justify-center cursor-pointer hover:bg-[#2d2d2d] transition-colors"><MousePointer2 className="w-4 h-4 text-amber-500" /></div>
           <div className="bg-[#252526] border border-black/40 p-2 rounded-lg shadow-lg flex items-center justify-center cursor-pointer hover:bg-[#2d2d2d] transition-colors"><Move className="w-4 h-4 text-gray-400" /></div>
        </div>

        {/* React Flow Canvas */}
        <div className="absolute inset-0 z-0">
          <ReactFlowProvider>
            <WorkflowGraph workflowData={workflowData} />
          </ReactFlowProvider>
        </div>

      </main>

      {/* ── RIGHT PANEL: Sandbox & Insights ──────────────────────────────── */}
      <aside className={`border-l border-black/40 bg-[#121212] shrink-0 flex flex-col z-20 transition-all duration-300 shadow-[-10px_0_20px_rgba(0,0,0,0.3)] ${isRightOpen ? 'w-[380px]' : 'w-0 opacity-0'}`}>
        {/* Tabs */}
        <div className={`flex border-b border-white/10 text-xs shrink-0 ${!isRightOpen && 'hidden'}`}>
          <button 
            onClick={() => setActiveTab('chat')} 
            className={`flex-1 py-4 font-semibold transition-colors ${activeTab === 'chat' ? 'text-amber-500 border-b-2 border-amber-500' : 'text-gray-400 hover:text-white'}`}
          >
            AI Insight Builder
          </button>
          <button 
            onClick={() => setActiveTab('settings')} 
            className={`flex-1 py-4 font-semibold transition-colors ${activeTab === 'settings' ? 'text-amber-500 border-b-2 border-amber-500' : 'text-gray-400 hover:text-white'}`}
          >
            Settings
          </button>
        </div>

        {activeTab === 'chat' && isRightOpen && (
          <div className="flex-1 flex flex-col overflow-hidden">
             {/* The existing functional Chat Interface */}
             <ChatInterface onWorkflowGenerated={handleWorkflowGenerated} />
          </div>
        )}

        {activeTab === 'settings' && isRightOpen && (
          <div className="flex-1 overflow-y-auto p-5 bg-[#0d0d0d] space-y-6">
             <div className="text-gray-400 text-xs">Workflow settings and properties will appear here.</div>
          </div>
        )}
      </aside>

      {/* ── TEST MODAL ──────────────────────────────── */}
      <Modal 
        isOpen={isTestOpen} 
        onClose={() => setIsTestOpen(false)}
        title="Testing & Execution Phase"
      >
        <TestMode />
      </Modal>
    </div>
  );
}
