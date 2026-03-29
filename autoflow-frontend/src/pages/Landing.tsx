import { ArrowRight, Search, Bell, Settings, Home, BarChart2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-white/20 relative overflow-hidden flex flex-col items-center font-sans">
      {/* Navbar */}
      <nav className="w-full flex justify-between items-center px-8 py-6 z-10 max-w-7xl">
        <Link to="/" className="font-bold text-2xl tracking-tighter hover:text-gray-300 transition-colors flex items-center gap-4">
          <img src="/favicon.png" className="w-10 h-10 invert-[1] brightness-200" alt="AutoFlow Logo" />
          AutoFlow
        </Link>
        <div className="hidden md:flex gap-8 text-sm font-medium text-gray-400">
          <a href="#" className="hover:text-white transition-colors">Getting started</a>
          <a href="#" className="hover:text-white transition-colors">Components</a>
          <a href="#" className="hover:text-white transition-colors">Documentation</a>
        </div>
        <Link to="/dashboard" className="hidden md:inline-flex items-center justify-center text-white hover:bg-white/10 rounded-full px-6 py-2 text-sm font-medium transition-colors">Sign in</Link>
      </nav>

      {/* Dramatic Glow Effect background */}
      <div className="absolute top-[350px] left-1/2 -translate-x-1/2 w-[120%] max-w-[1200px] h-[400px] bg-gradient-to-t from-amber-700/30 to-transparent blur-[120px] rounded-[100%] pointer-events-none -z-0"></div>

      {/* Hero Content */}
      <main className="w-full max-w-[1000px] flex flex-col items-center text-center mt-20 px-4 z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-gray-300 hover:bg-white/10 transition-colors cursor-pointer group">
          <span>New version of AutoFlow is out!</span>
          <span className="flex items-center gap-1 text-white opacity-80 group-hover:opacity-100 transition-opacity">Read more <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" /></span>
        </div>

        <h1 className="text-5xl md:text-[5.5rem] font-bold tracking-tight md:tracking-tighter leading-[1.05] text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 mb-6 drop-shadow-sm pb-2">
          Empower your MSME<br />with instant AI agents
        </h1>

        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mb-12 leading-relaxed font-medium">
          Powered by open-source n8n. Type a prompt, scan a QR code, and deploy a live AI catalog and support agent to your favorite messaging app.
        </p>

        <Link to="/dashboard" className="bg-white text-black hover:bg-gray-200 rounded-full px-8 py-4 font-bold text-lg shadow-[0_0_40px_rgba(255,255,255,0.4)] transition-all hover:scale-105 active:scale-95 inline-flex items-center justify-center">
          Get started
        </Link>
      </main>

      {/* Dashboard Mockup Base View */}
      <div className="w-full max-w-[1200px] mt-40 px-4 md:px-8 z-10 relative">
        <div className="w-full bg-[#0d0d0d] border border-white/10 rounded-t-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[500px]">
          
          {/* Sidebar Area */}
          <div className="w-full md:w-[260px] border-r border-white/10 p-4 shrink-0 flex flex-col bg-[#0a0a0a]">
            <div className="flex items-center gap-3 font-semibold text-lg px-4 py-3 mb-6 text-white/90">
              <BarChart2 className="w-5 h-5 text-gray-400" /> CRM Studio
            </div>
            <div className="space-y-1 pl-2">
              <div className="flex items-center gap-3 bg-[#1a1a1a] text-white px-3 py-2.5 rounded-lg border border-white/5 cursor-pointer font-medium text-sm transition-colors">
                <Home className="w-4 h-4 text-gray-400" /> Dashboard
              </div>
              <div className="flex items-center gap-3 text-gray-400 px-3 py-2.5 rounded-lg hover:text-white hover:bg-white/5 transition-colors cursor-pointer font-medium text-sm">
                <Settings className="w-4 h-4 text-gray-400" /> Flow Settings
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 bg-[#121212] flex flex-col relative overflow-hidden">
            {/* Header */}
            <header className="flex items-center justify-between border-b border-white/5 px-8 py-5">
              <div>
                <h2 className="text-xl font-bold text-white tracking-tight">Dashboard</h2>
                <p className="text-sm text-gray-400 mt-1">Welcome back! Here's what's happening today.</p>
              </div>
              <div className="flex items-center gap-5">
                <div className="relative group hidden sm:block">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-gray-300 transition-colors" />
                  <input type="text" placeholder="Search..." className="bg-white/5 border border-white/5 rounded-md pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-white/20 focus:bg-white/10 text-white w-64 placeholder:text-gray-500 transition-all font-medium" />
                </div>
                <div className="relative">
                  <Bell className="w-5 h-5 text-gray-500 hover:text-white cursor-pointer transition-colors" />
                  <div className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-[#121212]"></div>
                </div>
              </div>
            </header>

            {/* Content Cards */}
            <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
               <div className="bg-[#1a1a1a] border border-white/5 rounded-xl p-5 shadow-sm transition-colors hover:border-white/10">
                  <div className="flex items-center justify-between mb-3"><h3 className="text-gray-400 text-sm font-medium">Total Contacts</h3></div>
                  <div className="text-3xl font-bold text-white mb-1">8,047</div>
                  <div className="text-xs text-green-500 font-medium">+15% from last week</div>
               </div>
               <div className="bg-[#1a1a1a] border border-white/5 rounded-xl p-5 shadow-sm transition-colors hover:border-white/10">
                  <div className="flex items-center justify-between mb-3"><h3 className="text-gray-400 text-sm font-medium">Active Deals</h3></div>
                  <div className="text-3xl font-bold text-white mb-1">127</div>
                  <div className="text-xs text-green-500 font-medium">+8% from last week</div>
               </div>
               <div className="bg-[#1a1a1a] border border-white/5 rounded-xl p-5 shadow-sm transition-colors hover:border-white/10">
                  <div className="flex items-center justify-between mb-3"><h3 className="text-gray-400 text-sm font-medium">Messages Handled</h3></div>
                  <div className="text-3xl font-bold text-white mb-1">14,350</div>
                  <div className="text-xs text-green-500 font-medium">+22% from last week</div>
               </div>
               
               {/* Large Activity Section Overlay */}
               <div className="md:col-span-3 bg-[#1a1a1a] border border-white/5 rounded-xl px-6 pt-6 pb-20 shadow-sm min-h-[150px] relative">
                  <h3 className="text-white font-semibold mb-6 flex items-center justify-between">
                    <span>Agent Activity Stream</span>
                    <span className="text-xs text-gray-400 border border-white/10 rounded px-2 py-1">Last 24 Hours</span>
                  </h3>
                  {/* Subtle fade to bottom */}
                  <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#121212] to-transparent z-10 rounded-b-xl border-b border-white/5"></div>
               </div>
            </div>
            
          </div>
        </div>
      </div>

      {/* Bento Grid Features Section */}
      <section className="w-full max-w-6xl mt-40 px-4 md:px-8 z-10 relative pb-32">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">Everything you need to automate.</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">Built with open-source tools for maximum flexibility and zero vendor lock-in.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-[250px]">
          {/* Card 1: Large */}
          <div className="md:col-span-2 md:row-span-2 bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 shadow-sm flex flex-col hover:border-white/20 transition-colors group">
             <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center mb-auto text-gray-400 group-hover:text-white transition-colors">
                <Settings className="w-6 h-6" />
             </div>
             <div>
                <h3 className="text-2xl font-bold text-white mb-2">Open Source n8n</h3>
                <p className="text-gray-400 text-sm leading-relaxed max-w-md">Fully transparent and extensible automation nodes generated instantly behind the scenes. Zero setup, zero vendor lock-in. Build powerful flows visually and securely on your own infrastructure.</p>
             </div>
          </div>

          {/* Card 2 */}
          <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 shadow-sm flex flex-col hover:border-white/20 transition-colors group">
             <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center mb-auto text-gray-400 group-hover:text-white transition-colors">
                <Search className="w-5 h-5" />
             </div>
             <div>
                <h3 className="text-lg font-bold text-white mb-1">Deep Intent Search</h3>
                <p className="text-gray-400 text-sm">Natural language processing to understand exactly what your customers need.</p>
             </div>
          </div>

          {/* Card 3 */}
          <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 shadow-sm flex flex-col hover:border-white/20 transition-colors group">
             <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center mb-auto text-gray-400 group-hover:text-white transition-colors">
                <Bell className="w-5 h-5" />
             </div>
             <div>
                <h3 className="text-lg font-bold text-white mb-1">Instant QR Deploy</h3>
                <p className="text-gray-400 text-sm">Scan to test and deploy your agent on any mobile device immediately.</p>
             </div>
          </div>

          {/* Card 4 */}
          <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 shadow-sm flex flex-col hover:border-white/20 transition-colors group">
             <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center mb-auto text-gray-400 group-hover:text-white transition-colors">
                <ArrowRight className="w-5 h-5" />
             </div>
             <div>
                <h3 className="text-lg font-bold text-white mb-1">Chat App Support</h3>
                <p className="text-gray-400 text-sm">Integrates naturally with your customers' favorite messaging applications.</p>
             </div>
          </div>

          {/* Card 5: Medium spanning 2 columns */}
          <div className="md:col-span-2 bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row items-start md:items-end justify-between hover:border-white/20 transition-colors group">
             <div>
                <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center mb-6 text-gray-400 group-hover:text-white transition-colors">
                  <Home className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white mb-1">24/7 AI Catalog</h3>
                <p className="text-gray-400 text-sm max-w-sm">Automated responses, product suggestions, and live support around the clock.</p>
             </div>
             <div className="mt-6 md:mt-0 px-5 py-2.5 bg-white/5 border border-white/10 rounded-full text-xs text-white font-medium cursor-pointer hover:bg-white/10 transition-colors">
                Explore capabilities &rarr;
             </div>
          </div>

        </div>
      </section>

      {/* How It Works Section */}
      <section className="w-full max-w-6xl mt-12 px-4 md:px-8 z-10 relative pb-40">
        <div className="flex flex-col md:flex-row gap-12 items-start justify-between">
          <div className="md:w-1/3 sticky top-24">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">How AutoFlow works</h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">No coding or hosting required. We bridge the gap between complex n8n workflows and your daily interactions.</p>
            <button className="bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-full px-6 py-3 font-medium transition-colors inline-flex items-center gap-2">
              Read the docs <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          
          <div className="md:w-3/5 flex flex-col gap-6">
            {/* Step 1 */}
            <div className="bg-[#0a0a0a] border border-white/10 p-8 rounded-2xl relative overflow-hidden group hover:border-white/20 transition-colors">
              <div className="text-[120px] font-black text-white/[0.02] absolute -top-10 -right-2 select-none group-hover:scale-110 transition-transform duration-700">01</div>
              <h3 className="text-xl font-bold text-white mb-3 relative z-10">Describe your business</h3>
              <p className="text-gray-400 leading-relaxed relative z-10">Type a simple prompt explaining your inventory or FAQ in plain language. Our system determines the exact automation logic required.</p>
            </div>
            {/* Step 2 */}
            <div className="bg-[#0a0a0a] border border-white/10 p-8 rounded-2xl relative overflow-hidden group hover:border-amber-600/40 transition-colors">
              <div className="text-[120px] font-black text-amber-600/[0.05] absolute -top-10 -right-2 select-none group-hover:scale-110 transition-transform duration-700">02</div>
              <h3 className="text-xl font-bold text-white mb-3 relative z-10">Auto-generate n8n nodes</h3>
              <p className="text-gray-400 leading-relaxed relative z-10">AutoFlow instantly spins up a secure, invisible n8n workspace and automatically wires the webhooks, LLM agents, and logic nodes for you instantly.</p>
            </div>
            {/* Step 3 */}
            <div className="bg-[#0a0a0a] border border-white/10 p-8 rounded-2xl relative overflow-hidden group hover:border-white/20 transition-colors">
              <div className="text-[120px] font-black text-white/[0.02] absolute -top-10 -right-2 select-none group-hover:scale-110 transition-transform duration-700">03</div>
              <h3 className="text-xl font-bold text-white mb-3 relative z-10">Scan and go live</h3>
              <p className="text-gray-400 leading-relaxed relative z-10">Pull out your phone, scan the generated QR code, and your fully autonomous AI agent is instantly tethered to your messaging app. Zero deployment hassle.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="w-full border-t border-white/10 py-8 text-center text-gray-500 text-sm z-10">
        <p>© 2026 AutoFlow FOSS Project. Built for Indian MSMEs.</p>
      </footer>
    </div>
  )
}
