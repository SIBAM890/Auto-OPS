import { Send, Bot, User } from "lucide-react";

export default function Chat() {
  return (
    <div className="flex-1 flex flex-col h-full bg-[#0a0a0a]">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-white/5 px-8 py-5 shrink-0 bg-[#0d0d0d]/80 backdrop-blur-md z-10 w-full">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">AI Agent Sandbox</h2>
          <p className="text-sm text-gray-400 mt-1">Test your workflow endpoints before deploying to WhatsApp.</p>
        </div>
        <div className="text-xs font-medium px-3 py-1.5 bg-amber-600/20 text-amber-500 border border-amber-500/30 rounded-full">
          Sandbox Mode: Active
        </div>
      </header>

      {/* Chat History Viewport */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-6 flex flex-col items-center">
        
        {/* System Greeting */}
        <div className="w-full max-w-3xl flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shrink-0 shadow-lg">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <div className="font-semibold text-white mb-1 flex items-center gap-2">AutoFlow Native Agent <span className="text-xs text-gray-500 font-normal">Just now</span></div>
            <div className="bg-[#121212] border border-white/10 rounded-2xl rounded-tl-sm p-4 text-gray-300 text-sm max-w-2xl leading-relaxed shadow-sm">
              Hello! This is a secure testing environment connected directly to your n8n workflow. Try asking me about shipping policies, product inventory, or anything you've trained me on.
            </div>
          </div>
        </div>

        {/* User Message */}
        <div className="w-full max-w-3xl flex items-start flex-row-reverse gap-4">
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0 border border-white/20">
            <User className="w-5 h-5 text-gray-300" />
          </div>
          <div className="flex-1 flex flex-col items-end">
            <div className="font-semibold text-white mb-1 flex items-center gap-2"><span className="text-xs text-gray-500 font-normal">2 minutes ago</span> You</div>
            <div className="bg-amber-600 text-white rounded-2xl rounded-tr-sm p-4 text-sm max-w-2xl leading-relaxed shadow-md">
              Do you offer bulk discounts for B2B distributors on the new FOSS automation tier?
            </div>
          </div>
        </div>

        {/* System Response */}
        <div className="w-full max-w-3xl flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shrink-0 shadow-lg">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <div className="font-semibold text-white mb-1 flex items-center gap-2">AutoFlow Native Agent <span className="text-xs text-gray-500 font-normal">1 minute ago</span></div>
            <div className="bg-[#121212] border border-white/10 rounded-2xl rounded-tl-sm p-4 text-gray-300 text-sm max-w-2xl leading-relaxed shadow-sm">
              Yes, absolutely! We offer special bulk pricing for MSMEs and B2B distributors ordering more than 10 licenses. 
              <br/><br/>
              Would you like me to connect you with our enterprise sales automation flow to process a purchase order automatically?
            </div>
            <div className="mt-2 flex gap-2">
              <button className="px-3 py-1.5 border border-white/10 bg-white/5 hover:bg-white/10 rounded-lg text-xs font-medium text-white transition-colors">Yes, connect me</button>
              <button className="px-3 py-1.5 border border-white/10 bg-white/5 hover:bg-white/10 rounded-lg text-xs font-medium text-white transition-colors">View pricing tier list</button>
            </div>
          </div>
        </div>

      </div>

      {/* Input Area */}
      <div className="p-4 sm:px-8 sm:pb-8 shrink-0 bg-transparent flex justify-center w-full">
        <div className="relative w-full max-w-3xl group">
          <input 
            type="text" 
            placeholder="Test your agent's responses..." 
            className="w-full bg-[#121212] border border-white/10 rounded-xl pl-5 pr-14 py-4 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 focus:bg-[#1a1a1a] text-white placeholder:text-gray-500 transition-all shadow-lg"
          />
          <button className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-amber-600 hover:bg-amber-500 rounded-lg flex items-center justify-center text-white transition-colors">
            <Send className="w-4 h-4 ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
}
