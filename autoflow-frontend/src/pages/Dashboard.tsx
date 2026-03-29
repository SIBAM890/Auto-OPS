import { Search, Bell, Copy } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="flex-1 flex flex-col overflow-y-auto w-full">
      {/* Top Header */}
      <header className="flex items-center justify-between border-b border-white/5 bg-[#0d0d0d]/80 backdrop-blur-md px-8 py-5 sticky top-0 z-10 w-full">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Overview</h2>
          <p className="text-sm text-gray-400 mt-1">Monitor your AI agents and MSME metrics here.</p>
        </div>
        <div className="flex items-center gap-5">
          <div className="relative group hidden sm:block">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-white transition-colors" />
            <input type="text" placeholder="Search interactions..." className="bg-white/5 border border-white/10 rounded-full pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-white/20 focus:bg-white/10 text-white w-64 placeholder:text-gray-500 transition-all font-medium" />
          </div>
          <div className="relative">
            <Bell className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
            <div className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-[#0d0d0d]"></div>
          </div>
        </div>
      </header>

      {/* Page Content */}
      <div className="p-8 max-w-7xl mx-auto w-full space-y-8">
        
        {/* Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-[#121212] border border-white/5 rounded-2xl p-6 shadow-sm hover:border-white/10 transition-colors">
            <h3 className="text-gray-400 text-sm font-medium mb-2">Total Contacts</h3>
            <div className="text-4xl font-bold text-white mb-2">8,047</div>
            <div className="text-xs text-green-500 font-medium bg-green-500/10 w-fit px-2 py-1 rounded inline-flex">+15% this week</div>
          </div>
          <div className="bg-[#121212] border border-white/5 rounded-2xl p-6 shadow-sm hover:border-white/10 transition-colors">
            <h3 className="text-gray-400 text-sm font-medium mb-2">Active Deals</h3>
            <div className="text-4xl font-bold text-white mb-2">127</div>
            <div className="text-xs text-green-500 font-medium bg-green-500/10 w-fit px-2 py-1 rounded inline-flex">+8% this week</div>
          </div>
          <div className="bg-[#121212] border border-white/5 rounded-2xl p-6 shadow-sm hover:border-white/10 transition-colors">
            <h3 className="text-gray-400 text-sm font-medium mb-2">Messages Handled</h3>
            <div className="text-4xl font-bold text-white mb-2">14,350</div>
            <div className="text-xs text-green-500 font-medium bg-green-500/10 w-fit px-2 py-1 rounded inline-flex">+22% this week</div>
          </div>
          <div className="bg-[#121212] border border-white/5 rounded-2xl p-6 shadow-sm hover:border-white/10 transition-colors lg:col-span-1 md:col-span-3 border-amber-600/30">
            <h3 className="text-amber-500 text-sm font-medium mb-2">Deployment Status</h3>
            <div className="text-xl font-bold text-white mb-1">2 Agents Live</div>
            <div className="text-xs text-gray-400 mt-2">WhatsApp: Connected</div>
            <div className="mt-4 pt-4 border-t border-white/10">
              <button className="text-xs w-full py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-lg font-medium transition-colors">Generate New Agent</button>
            </div>
          </div>
        </div>

        {/* Live Agents Section */}
        <div>
          <h3 className="text-lg font-bold text-white mb-4">Your Active Deployments</h3>
          <div className="bg-[#121212] border border-white/5 rounded-2xl overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-xs uppercase tracking-wider text-gray-500 bg-white/[0.02]">
                  <th className="px-6 py-4 font-medium">Agent Name</th>
                  <th className="px-6 py-4 font-medium">Platform</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium">Webhook URL</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="border-b border-white/5 hover:bg-white/[0.01] transition-colors">
                  <td className="px-6 py-4 font-medium text-white flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-xs font-bold shadow-lg">CS</div>
                    Customer Support
                  </td>
                  <td className="px-6 py-4 text-gray-300">WhatsApp Business</td>
                  <td className="px-6 py-4"><span className="px-2 py-1 bg-green-500/10 text-green-500 border border-green-500/20 rounded-md text-xs font-bold">LIVE</span></td>
                  <td className="px-6 py-4 text-gray-500 font-mono text-xs flex items-center gap-2">https://api.autoflow.in/wh/xyz <Copy className="w-3 h-3 hover:text-white cursor-pointer" /></td>
                </tr>
                <tr className="hover:bg-white/[0.01] transition-colors">
                  <td className="px-6 py-4 font-medium text-white flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center text-xs font-bold shadow-lg">FA</div>
                    FAQ & Catalog Bot
                  </td>
                  <td className="px-6 py-4 text-gray-300">Telegram</td>
                  <td className="px-6 py-4"><span className="px-2 py-1 bg-amber-500/10 text-amber-500 border border-amber-500/20 rounded-md text-xs font-bold">TESTING</span></td>
                  <td className="px-6 py-4 text-gray-500 font-mono text-xs flex items-center gap-2">https://api.autoflow.in/wh/abc <Copy className="w-3 h-3 hover:text-white cursor-pointer" /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
