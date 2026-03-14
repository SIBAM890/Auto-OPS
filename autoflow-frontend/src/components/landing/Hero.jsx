import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Hero = () => {
    useEffect(() => {
        // --- Animation Sequence Logic ---
        const sequence = [
            // 1. Initial State (Wait 500ms)
            { time: 500, id: 'msg1', action: 'showMsg' }, // User: "Help with order"

            // 2. AI Processing (Node Visualization)
            { time: 600, id: 'node-trigger', action: 'activateNode' },
            { time: 800, id: 'stat-query', action: 'showBadge' },

            {
                time: 1200, action: () => {
                    deactivateNode('node-trigger');
                    activateNode('node-intent');
                    activateLine('line-1');
                }
            },
            { time: 1400, id: 'stat-confidence', action: 'showBadge' },

            {
                time: 1800, action: () => {
                    deactivateNode('node-intent');
                    activateNode('node-database');
                    activateLine('line-2');
                }
            },

            // 3. AI Responds (Order Status)
            {
                time: 2500, action: () => {
                    deactivateNode('node-database');
                    showMessage('msg2'); // AI: "Found order..."
                    showBadge('stat-automated');
                }
            },

            // 4. User Replies (Address Change)
            { time: 4000, id: 'msg3', action: 'showMsg' }, // User: "Change address?"

            // 5. AI Reasoning for 2nd Request
            {
                time: 4200, action: () => {
                    activateNode('node-intent'); // Direct to intent
                }
            },
            {
                time: 4600, action: () => {
                    deactivateNode('node-intent');
                    activateNode('node-format'); // Formatting response
                    activateLine('line-3');
                }
            },

            // 6. Typing Indicator
            {
                time: 5000, action: () => {
                    deactivateNode('node-format');
                    activateNode('node-send');
                    showTyping();
                }
            },

            // 7. Final Response (Confirmation)
            {
                time: 6500, action: () => {
                    hideTyping();
                    showMessage('msg4'); // AI: "Updated!"
                    deactivateNode('node-send');
                    showBadge('stat-response');
                }
            },

            // 8. Loop Reset
            { time: 12000, action: 'reset' }
        ];

        let timeouts = [];

        const runSequence = () => {
            sequence.forEach(step => {
                const t = setTimeout(() => {
                    if (step.action === 'showMsg') showMessage(step.id);
                    else if (step.action === 'activateNode') activateNode(step.id);
                    else if (step.action === 'showBadge') showBadge(step.id);
                    else if (step.action === 'reset') resetSequence();
                    else if (typeof step.action === 'function') step.action();
                }, step.time);
                timeouts.push(t);
            });
        };

        // --- Helper Functions (Updated for Tailwind) ---
        const showMessage = (id) => {
            const el = document.getElementById(id);
            if (el) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }
        };

        const showTyping = () => {
            const el = document.getElementById('typing');
            if (el) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }
        };

        const hideTyping = () => {
            const el = document.getElementById('typing');
            if (el) el.style.opacity = '0';
        };

        const activateNode = (id) => document.getElementById(id)?.setAttribute('data-active', 'true');
        const deactivateNode = (id) => document.getElementById(id)?.setAttribute('data-active', 'false');

        const activateLine = (id) => {
            const line = document.getElementById(id);
            if (line) {
                // Energize (Bright & Fast)
                line.style.opacity = '1';
                line.style.filter = 'url(#neonGlow) drop-shadow(0 0 5px #10B981)'; // Extra glow

                // Return to Idle (Dim & Slow)
                const t = setTimeout(() => {
                    line.style.opacity = '0.2';
                    line.style.filter = 'url(#neonGlow)';
                }, 1000);

                timeouts.push(t);
            }
        };

        const showBadge = (id) => {
            const el = document.getElementById(id);
            if (el) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0) scale(1)';
            }
        };

        const hideBadge = (id) => {
            const el = document.getElementById(id);
            if (el) {
                el.style.opacity = '0';
                el.style.transform = 'translateY(-10px) scale(0.95)';
            }
        };

        const resetSequence = () => {
            ['msg1', 'msg2', 'msg3', 'msg4'].forEach(id => {
                const el = document.getElementById(id);
                if (el) {
                    el.style.opacity = '0';
                    el.style.transform = 'translateY(20px)';
                }
            });
            hideTyping();
            document.querySelectorAll('.workflow-node').forEach(n => n.setAttribute('data-active', 'false'));
            document.querySelectorAll('.stat-badge').forEach(b => {
                b.style.opacity = '0';
                b.style.transform = 'translateY(10px) scale(0.9)';
            });
            const t = setTimeout(runSequence, 100);
            timeouts.push(t);
        };

        // Start
        runSequence();

        // Cleanup on unmount
        return () => {
            timeouts.forEach(clearTimeout);
            timeouts = [];
        };
    }, []);

    return (
        <section className="relative z-10 min-h-[90vh] flex items-center py-20 px-6 overflow-hidden">
            <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                {/* Left Side: Content */}
                <div className="max-w-xl">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] mb-6 tracking-tight text-white">
                            Deploy <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-purple-500 animate-gradient-slow">AI agents</span> that actually understand your customers
                        </h1>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-xl text-gray-400 mb-10 leading-relaxed font-light"
                    >
                        From prompt to live WhatsApp agent in 60 seconds. No code, no setup, no bullshit.
                    </motion.p>

                    {/* CTA Button */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="mb-10"
                    >
                        <Link to="/dashboard" className="group relative inline-flex items-center gap-3 px-10 py-4 text-lg font-semibold text-white bg-gradient-to-br from-primary to-secondary border border-white/20 rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_50px_rgba(16,185,129,0.5)] active:translate-y-0 active:scale-95">
                            {/* Shine Effect */}
                            <span className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:left-[100%] transition-all duration-500 ease-in-out"></span>

                            <span className="relative z-10">Build Your First Agent</span>
                            <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </Link>
                        <p className="mt-3 text-sm text-gray-500">Free • No credit card required</p>
                    </motion.div>

                    {/* Trust Indicators */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.8 }}
                        className="flex flex-wrap gap-6"
                    >
                        {['1000+ queries automated daily', '2.3s avg response time', '24/7 uptime'].map((text, i) => (
                            <div key={i} className="flex items-center gap-2 text-sm text-gray-300">
                                <svg className="text-primary w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                                </svg>
                                <span>{text}</span>
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* Right Side: Demo & Phone */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative flex justify-center items-center min-h-[600px] perspective-[1000px]"
                >

                    {/* 1. Background Glow */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[600px] bg-primary/20 blur-[100px] rounded-full pointer-events-none -z-10"></div>

                    {/* Workflow Visualization */}
                    <div className="absolute w-[150%] h-full -left-1/4 pointer-events-none blur-[0.5px] opacity-90">
                        {/* Nodes */}
                        {[
                            { id: 'trigger', label: 'TRIGGER', top: '5%', left: '-5%' },
                            { id: 'intent', label: 'INTENT', top: '25%', left: '0%' },
                            { id: 'database', label: 'DATABASE', top: '60%', left: '-5%' },
                            { id: 'format', label: 'FORMAT', top: '80%', left: '10%' },
                            { id: 'send', label: 'SEND', top: '75%', right: '0%' },
                        ].map(node => (
                            <div
                                key={node.id}
                                id={`node-${node.id}`}
                                className="absolute flex flex-col items-center gap-2 opacity-60 transition-all duration-300 data-[active=true]:opacity-100 data-[active=true]:scale-110 data-[active=true]:drop-shadow-[0_0_15px_rgba(16,185,129,0.6)] workflow-node"
                                style={{ top: node.top, left: node.left, right: node.right }}
                            >
                                <div className="w-14 h-14 bg-primary/10 backdrop-blur-md border border-white/10 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-300 data-[active=true]:bg-primary/20 data-[active=true]:border-primary node-content">
                                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-accent"><circle cx="12" cy="12" r="10" /></svg>
                                </div>
                                <span className="text-[10px] font-medium text-gray-400 tracking-wider bg-black/50 px-2 py-0.5 rounded">{node.label}</span>
                            </div>
                        ))}

                        {/* Connection Lines */}
                        {/* Connection Lines - Continuous Dashed Flow */}
                        <svg className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-visible" viewBox="0 0 600 400">
                            <defs>
                                <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#10B981" stopOpacity="0.3" />
                                    <stop offset="50%" stopColor="#34D399" stopOpacity="1" />
                                    <stop offset="100%" stopColor="#10B981" stopOpacity="0.3" />
                                </linearGradient>
                                <filter id="neonGlow">
                                    <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                                    <feMerge>
                                        <feMergeNode in="coloredBlur" />
                                        <feMergeNode in="SourceGraphic" />
                                    </feMerge>
                                </filter>
                                <style>
                                    {`
                                        @keyframes flow {
                                            to { stroke-dashoffset: -24; }
                                        }
                                        .flowing-line {
                                            animation: flow 1s linear infinite;
                                        }
                                    `}
                                </style>
                            </defs>

                            {/* Line 1: Trigger -> Intent */}
                            <path id="line-1" className="transition-all duration-300 opacity-20 flowing-line" d="M 50 40 L 90 90" stroke="url(#flowGradient)" strokeWidth="3" fill="none" strokeDasharray="6 6" strokeLinecap="round" filter="url(#neonGlow)" />

                            {/* Line 2: Intent -> Database */}
                            <path id="line-2" className="transition-all duration-300 opacity-20 flowing-line" d="M 90 120 L 60 220" stroke="url(#flowGradient)" strokeWidth="3" fill="none" strokeDasharray="6 6" strokeLinecap="round" filter="url(#neonGlow)" />

                            {/* Line 3: Database -> Format */}
                            <path id="line-3" className="transition-all duration-300 opacity-20 flowing-line" d="M 80 260 L 140 310" stroke="url(#flowGradient)" strokeWidth="3" fill="none" strokeDasharray="6 6" strokeLinecap="round" filter="url(#neonGlow)" />

                            {/* Line 4: Format -> Send/Phone */}
                            <path id="line-4" className="transition-all duration-300 opacity-20 flowing-line" d="M 160 330 Q 300 380 540 320" stroke="url(#flowGradient)" strokeWidth="3" fill="none" strokeDasharray="6 6" strokeLinecap="round" filter="url(#neonGlow)" />
                        </svg>
                    </div>

                    {/* Floating Badges */}
                    <div className="absolute w-full h-full pointer-events-none z-20">
                        <div id="stat-response" className="stat-badge absolute top-[15%] -right-[15%] transition-all duration-500 opacity-0 px-4 py-2 bg-dark-900/90 backdrop-blur-md border border-primary/30 rounded-xl text-sm font-medium text-white shadow-xl translate-y-2">⚡ Response in 2.3s</div>
                        <div id="stat-confidence" className="stat-badge absolute top-[45%] -left-[20%] transition-all duration-500 opacity-0 px-4 py-2 bg-dark-900/90 backdrop-blur-md border border-primary/30 rounded-xl text-sm font-medium text-white shadow-xl translate-y-2">🤖 AI Confidence: 98%</div>
                        <div id="stat-automated" className="stat-badge absolute bottom-[20%] -right-[10%] transition-all duration-500 opacity-0 px-4 py-2 bg-dark-900/90 backdrop-blur-md border border-primary/30 rounded-xl text-sm font-medium text-white shadow-xl translate-y-2">✅ Automated</div>
                        <div id="stat-query" className="stat-badge absolute top-[2%] -left-[15%] transition-all duration-500 opacity-0 px-4 py-2 bg-dark-900/90 backdrop-blur-md border border-primary/30 rounded-xl text-sm font-medium text-white shadow-xl translate-y-2">💬 Query #47 today</div>
                    </div>

                    {/* Phone Mockup with 3D Float */}
                    <div className="relative z-10 animate-phone-float preserve-3d">
                        <div className="w-[300px] h-[600px] bg-dark-800 rounded-[45px] p-3 shadow-2xl border-[6px] border-dark-700 relative overflow-hidden backdrop-blur-xl">

                            {/* Screen Reflection */}
                            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none z-50 rounded-[40px]"></div>

                            {/* Notch */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-black rounded-b-xl z-20 flex justify-center items-center">
                                {/* Only visible on close inspection but adds realism */}
                                <div className="w-16 h-4 bg-black rounded-full" />
                            </div>

                            {/* WhatsApp Interface */}
                            <div className="w-full h-full bg-[#0B141A] rounded-[34px] overflow-hidden flex flex-col font-sans">

                                {/* Status Bar (Fake) */}
                                <div className="h-11 w-full bg-[#075E54] flex justify-between items-center px-6 pt-2 select-none">
                                    <span className="text-white text-[10px] font-medium opacity-90">9:41</span>
                                    <div className="flex gap-1">
                                        <svg className="w-3 h-3 text-white opacity-90" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9v-2h2v2zm0-4H9V7h2v5z" /></svg> {/* Signal */}
                                        <svg className="w-3 h-3 text-white opacity-90" viewBox="0 0 24 24" fill="currentColor"><path d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4z" /></svg> {/* Battery */}
                                    </div>
                                </div>

                                {/* Header */}
                                <div className="bg-[#075E54] p-3 pt-0 flex items-center gap-2 pb-3 shadow-[0_1px_3px_rgba(0,0,0,0.3)] z-10">
                                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white cursor-pointer"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" /></svg>
                                    <div className="w-9 h-9 bg-gradient-to-br from-[#128C7E] to-[#25D366] rounded-full flex items-center justify-center font-bold text-sm text-white shadow-inner border border-white/10 overflow-hidden">
                                        <div className="w-full h-full flex items-center justify-center bg-white/10 text-white font-bold">T</div>
                                    </div>
                                    <div className="flex-1 flex flex-col justify-center translate-y-[1px]">
                                        <span className="text-white font-semibold text-[15px] leading-tight">TechStore Support</span>
                                        <span className="text-[11px] text-white/80 leading-tight">online</span>
                                    </div>
                                    <div className="flex gap-4 pr-1">
                                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white cursor-pointer hover:opacity-80"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" /></svg>
                                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white cursor-pointer hover:opacity-80"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" /></svg>
                                    </div>
                                </div>

                                {/* Chat Area */}
                                <div className="flex-1 px-4 py-3 flex flex-col gap-3 overflow-hidden bg-[url('/chat-bg.png')] bg-opacity-5 relative">
                                    {/* Msg 1 */}
                                    <div id="msg1" className="flex justify-start opacity-0 translate-y-4 transition-all duration-300 w-full">
                                        <div className="bg-[#202C33] text-[#e9edef] px-3 py-1.5 rounded-lg rounded-tl-none text-[13px] leading-[1.3] shadow-sm max-w-[85%] relative group">
                                            {/* Small visual tail hack */}
                                            <div className="absolute top-0 -left-[6px] w-0 h-0 border-t-[0px] border-r-[10px] border-b-[10px] border-t-transparent border-r-[#202C33] border-b-transparent"></div>
                                            <span className="block pt-1">Hi, I need help with my order #12345</span>
                                            <span className="block text-[10px] text-white/50 text-right mt-1 font-light tracking-wide -mr-1">10:30 AM</span>
                                        </div>
                                    </div>

                                    {/* Msg 2 (AI) */}
                                    <div id="msg2" className="flex justify-end opacity-0 translate-y-4 transition-all duration-300 w-full pl-8">
                                        <div className="bg-[#005c4b] text-[#e9edef] px-3 py-1.5 rounded-lg rounded-tr-none text-[13px] leading-[1.3] shadow-sm max-w-full relative min-w-[200px]">
                                            {/* Tail Hack */}
                                            <div className="absolute top-0 -right-[6px] w-0 h-0 border-t-[0px] border-l-[10px] border-b-[10px] border-t-transparent border-l-[#005c4b] border-b-transparent"></div>

                                            <div className="flex items-center gap-1.5 mb-1 opacity-90">
                                                <span className="text-[10px] font-bold text-[#25D366]">AI</span>
                                                <span className="text-[10px] text-white/60">• AgentFlow</span>
                                            </div>
                                            <span className="block">Hi! 👋 I found your order. It's currently out for delivery and should arrive by 3 PM today.</span>
                                            <div className="flex justify-end items-end gap-1 mt-1 -mr-1">
                                                <span className="text-[10px] text-white/50 font-light tracking-wide">10:30 AM</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Msg 3 */}
                                    <div id="msg3" className="flex justify-start opacity-0 translate-y-4 transition-all duration-300 w-full">
                                        <div className="bg-[#202C33] text-[#e9edef] px-3 py-1.5 rounded-lg rounded-tl-none text-[13px] leading-[1.3] shadow-sm max-w-[85%] relative">
                                            <div className="absolute top-0 -left-[6px] w-0 h-0 border-t-[0px] border-r-[10px] border-b-[10px] border-t-transparent border-r-[#202C33] border-b-transparent"></div>
                                            <span className="block pt-1">Can I change the delivery address?</span>
                                            <span className="block text-[10px] text-white/50 text-right mt-1 font-light tracking-wide -mr-1">10:31 AM</span>
                                        </div>
                                    </div>

                                    {/* Typing */}
                                    <div id="typing" className="flex justify-end opacity-0 transition-opacity duration-300 w-full">
                                        <div className="bg-[#005c4b] px-4 py-2.5 rounded-lg rounded-tr-none shadow-sm relative mr-2">
                                            <div className="absolute top-0 -right-[6px] w-0 h-0 border-t-[0px] border-l-[10px] border-b-[10px] border-t-transparent border-l-[#005c4b] border-b-transparent"></div>
                                            <div className="flex gap-1">
                                                <span className="w-1.5 h-1.5 bg-white/60 rounded-full animate-bounce"></span>
                                                <span className="w-1.5 h-1.5 bg-white/60 rounded-full animate-bounce delay-75"></span>
                                                <span className="w-1.5 h-1.5 bg-white/60 rounded-full animate-bounce delay-150"></span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Msg 4 (AI) */}
                                    <div id="msg4" className="flex justify-end opacity-0 translate-y-4 transition-all duration-300 w-full pl-8">
                                        <div className="bg-[#005c4b] text-[#e9edef] px-3 py-1.5 rounded-lg rounded-tr-none text-[13px] leading-[1.3] shadow-sm max-w-full relative">
                                            <div className="absolute top-0 -right-[6px] w-0 h-0 border-t-[0px] border-l-[10px] border-b-[10px] border-t-transparent border-l-[#005c4b] border-b-transparent"></div>
                                            <div className="flex items-center gap-1.5 mb-1 opacity-90">
                                                <span className="text-[10px] font-bold text-[#25D366]">AI</span>
                                            </div>
                                            <span className="block">Of course! I've updated your delivery address. The driver has been notified. ✅</span>
                                            <div className="flex justify-end items-end gap-1 mt-1 -mr-1">
                                                <span className="text-[10px] text-white/50 font-light tracking-wide">10:31 AM</span>
                                                <svg viewBox="0 0 16 15" width="12" height="12" className="text-[#53bdeb]"><path fill="currentColor" d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.319.319 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.283a2.203 2.203 0 0 0 3.123 0l6.094-6.64a.434.434 0 0 0-.125-.632l-.375-.325z" /></svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Input Bar */}
                                <div className="p-2 pb-5 flex gap-2 items-center bg-[#202C33] z-20 shadow-[0_-1px_3px_rgba(0,0,0,0.2)]">
                                    <div className="w-8 h-8 flex items-center justify-center text-[#8696a0] cursor-pointer hover:bg-white/10 rounded-full">
                                        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M9.153 11.603c.795 0 1.439-.879 1.439-1.962s-.644-1.962-1.439-1.962-1.439.879-1.439 1.962.644 1.962 1.439 1.962zm-3.204 1.362c-.026-.307-.131 5.218 6.063 5.551 6.066-.25 6.066-5.551 6.066-5.551-6.088 1.436-12.098 1.436-12.129 0zm11.363 1.108s-.669 1.959-5.051 1.959c-3.505 0-5.388-1.164-5.607-1.959 0 0 5.912 1.055 10.658 0zM11.804 1.011C5.609 1.011.978 6.033.978 12.228s4.826 10.761 11.021 10.761S23.02 18.423 23.02 12.228c.001-6.195-5.021-11.217-11.216-11.217zM12 21.354c-5.273 0-9.381-3.886-9.381-9.159s3.942-9.548 9.215-9.548 9.548 4.275 9.548 9.548c-.001 5.272-4.109 9.159-9.382 9.159zm3.108-9.751c.795 0 1.439-.879 1.439-1.962s-.644-1.962-1.439-1.962-1.439.879-1.439 1.962.644 1.962 1.439 1.962z"></path></svg>
                                    </div>
                                    <div className="flex-1 bg-[#2A3942] rounded-2xl px-4 py-2 flex items-center justify-between">
                                        <input type="text" placeholder="Type a message" disabled className="bg-transparent border-none outline-none text-[15px] text-[#d1d7db] w-full placeholder-[#8696a0]" />
                                        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" className="text-[#8696a0] rotate-45 transform ml-2 cursor-pointer"><path d="M1.993 12.63l17.47.01c1.07 0 1.54-.88.63-1.8L9.84.41c-.44-.45-1.16-.44-1.61.02-.45.45-.45 1.18-.01 1.63L14.7 9H4c-.55 0-1 .45-1 1s.45 1 1 1h8.77l-4.23 4.23c-.45.45-.45 1.18.01 1.63.45.47 1.18.47 1.62.03l8.03-7.98c.5-.5.5-1.32.01-1.8L12.01 1.99" /></svg>
                                    </div>
                                    <div className="w-10 h-10 bg-[#00A884] rounded-full flex items-center justify-center text-white shadow-md cursor-pointer hover:bg-[#008f6f] transition-colors">
                                        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M1.101 21.757L23.8 12.028 1.101 2.3l.011 7.912 13.623 1.816-13.623 1.817-.011 7.912z"></path></svg>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Bottom Shadow */}
                        <div className="absolute -bottom-14 left-1/2 -translate-x-1/2 w-[80%] h-[40px] bg-primary/30 blur-2xl rounded-[100%]"></div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;