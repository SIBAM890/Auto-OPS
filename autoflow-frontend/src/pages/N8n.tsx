import { Play, Download, Search, Settings } from "lucide-react";

export default function N8n() {
  return (
    <div className="flex-1 flex flex-col h-full bg-[#1e1e1e]">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-black/40 px-6 py-4 bg-[#252526] z-10 w-full shrink-0 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded bg-[#ff6d5a] flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-white" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
          </div>
          <h2 className="text-lg font-semibold text-white">AutoFlow Lead Generation Webhook</h2>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded font-medium text-sm transition-colors">
            <Download className="w-4 h-4" /> Export
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#ff6d5a] hover:bg-[#ff6d5a]/90 text-white rounded font-medium text-sm shadow-md transition-colors">
            <Play className="w-4 h-4 fill-current" /> Execute Workflow
          </button>
        </div>
      </header>

      {/* Canvas Viewport */}
      <div className="flex-1 relative overflow-hidden bg-[#1e1e1e]" style={{ backgroundImage: "linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)", backgroundSize: "40px 40px" }}>
         <div className="absolute top-6 left-6 flex gap-2">
            <div className="bg-[#252526] border border-black/40 p-2.5 rounded-lg shadow-lg flex items-center justify-center cursor-pointer hover:bg-[#2d2d2d] transition-colors"><Search className="w-4 h-4 text-gray-300" /></div>
            <div className="bg-[#252526] border border-black/40 p-2.5 rounded-lg shadow-lg flex items-center justify-center cursor-pointer hover:bg-[#2d2d2d] transition-colors"><Settings className="w-4 h-4 text-gray-300" /></div>
         </div>

         {/* Node Mockups */}
         <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex items-center gap-16">
               
               {/* Webhook Node */}
               <div className="bg-[#252526] border border-[#ff6d5a] rounded-lg shadow-xl w-64 relative cursor-grab hover:shadow-2xl hover:-translate-y-1 transition-all">
                  <div className="bg-[#1e1e1e] border-b border-black/40 p-3 flex items-center gap-3 rounded-t-lg">
                    <div className="w-6 h-6 rounded bg-[#ff6d5a] flex items-center justify-center"><Settings className="w-3 h-3 text-white" /></div>
                    <span className="text-white font-medium text-sm">Webhook Lead Ingestion</span>
                  </div>
                  <div className="p-4 bg-[#252526] rounded-b-lg">
                    <div className="text-xs bg-green-500/10 text-green-400 border border-green-500/20 px-2 py-1 rounded inline-block mb-2 font-mono">POST /api/leads</div>
                    <p className="text-xs text-gray-400 leading-relaxed">Listens constantly for WhatsApp mobile intents</p>
                  </div>
                  {/* Output Port */}
                  <div className="absolute top-1/2 -right-3 -translate-y-1/2 w-4 h-4 bg-[#ff6d5a] rounded-full border-2 border-[#252526]"></div>
               </div>

               {/* Connection Line */}
               <div className="w-16 h-0.5 bg-gray-600 relative">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 -mt-[5px] border-[6px] border-transparent border-l-gray-600"></div>
               </div>

               {/* AI Node */}
               <div className="bg-[#252526] border border-blue-500 rounded-lg shadow-xl w-64 relative cursor-grab hover:shadow-2xl hover:-translate-y-1 transition-all">
                  {/* Input Port */}
                  <div className="absolute top-1/2 -left-3 -translate-y-1/2 w-4 h-4 bg-gray-500 rounded-full border-2 border-[#252526]"></div>
                  
                  <div className="bg-[#1e1e1e] border-b border-black/40 p-3 flex items-center gap-3 rounded-t-lg">
                    <div className="w-6 h-6 rounded bg-blue-500 flex items-center justify-center"><Settings className="w-3 h-3 text-white" /></div>
                    <span className="text-white font-medium text-sm">OpenAI Agent</span>
                  </div>
                  <div className="p-4 bg-[#252526] rounded-b-lg">
                    <div className="text-xs bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-1 rounded inline-block mb-2 font-mono">gpt-4o-mini</div>
                    <p className="text-xs text-gray-400 leading-relaxed">Classifies intents mapping MSME business data</p>
                  </div>
               </div>

            </div>
         </div>
      </div>
    </div>
  );
}
