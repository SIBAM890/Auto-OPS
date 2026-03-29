// @ts-nocheck
import { useState, useEffect, useCallback, useRef } from 'react';
import { Send, CheckCircle, RefreshCw, Smartphone, ChevronLeft, WifiOff, Zap } from 'lucide-react';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { useNavigate } from 'react-router-dom';
import { workflowApi } from '../services/workflowApi';

// ─── Types ────────────────────────────────────────────────────────────────────
type Phase = 'idle' | 'deploying' | 'waiting_qr' | 'qr_ready' | 'connected' | 'error';

export default function DeployPage() {
    const navigate = useNavigate();
    const [phase, setPhase] = useState<Phase>('idle');
    const [qrCode, setQrCode] = useState<string | null>(null);
    const [statusText, setStatusText] = useState('Press "Deploy" to start');
    const [errorText, setErrorText] = useState<string | null>(null);
    const [messages, setMessages] = useState<any[]>([]);

    const isMounted = useRef(true);
    const pollRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const phaseRef = useRef<Phase>('idle');

    // Keep phaseRef in sync so the polling closure always reads the latest value
    useEffect(() => { phaseRef.current = phase; }, [phase]);
    useEffect(() => () => {
        isMounted.current = false;
        if (pollRef.current) clearTimeout(pollRef.current);
    }, []);

    // ── Polling ───────────────────────────────────────────────────────────────
    const scheduleNextPoll = useCallback((delayMs = 2000) => {
        if (pollRef.current) clearTimeout(pollRef.current);
        pollRef.current = setTimeout(pollStatus, delayMs);
    }, []);

    const pollStatus = useCallback(async () => {
        if (!isMounted.current) return;
        // Stop polling once fully connected
        if (phaseRef.current === 'connected') return;

        try {
            const data = await workflowApi.getStatus();
            if (!isMounted.current) return;

            if (data.connected) {
                // ✅ WhatsApp authenticated
                setPhase('connected');
                setQrCode(null);
                setStatusText('Agent Active & Listening');
                setMessages([{
                    role: 'bot',
                    text: '🚀 Agent Deployed!\n\nI am live and responding to messages using your workflow logic.',
                    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                }]);
            } else if (data.qr) {
                // 📱 QR code available – show it
                setQrCode(data.qr);
                setPhase('qr_ready');
                setStatusText('Scan QR Code with WhatsApp');
                scheduleNextPoll(2000); // keep polling — user might scan
            } else if (data.connecting) {
                // ⏳ Still connecting, waiting for QR
                setPhase('waiting_qr');
                setStatusText('Waiting for QR code...');
                scheduleNextPoll(1500); // poll fast while connecting
            } else {
                // Backend is up but nothing is happening — just wait
                scheduleNextPoll(3000);
            }
        } catch (err: any) {
            if (!isMounted.current) return;
            console.warn('Status poll failed:', err.message);
            // Backend might be starting, keep trying
            scheduleNextPoll(3000);
        }
    }, [scheduleNextPoll]);

    // ── Deploy ────────────────────────────────────────────────────────────────
    const handleDeploy = useCallback(async () => {
        if (pollRef.current) clearTimeout(pollRef.current);
        setPhase('deploying');
        setQrCode(null);
        setErrorText(null);
        setStatusText('Starting WhatsApp bridge...');

        try {
            await workflowApi.deploy();
            // Bridge is starting asynchronously — begin polling for QR
            setPhase('waiting_qr');
            setStatusText('Waiting for QR code...');
            scheduleNextPoll(1500); // poll frequently while Baileys initialises
        } catch (err: any) {
            if (!isMounted.current) return;
            const msg = err.response?.data?.error || err.message || 'Unknown error';
            setPhase('error');
            setErrorText(msg);
            setStatusText('Deployment failed');
        }
    }, [scheduleNextPoll]);

    // ── Logout ────────────────────────────────────────────────────────────────
    const handleLogout = useCallback(async () => {
        if (!confirm('This will disconnect the current WhatsApp session. Continue?')) return;
        if (pollRef.current) clearTimeout(pollRef.current);
        try {
            await workflowApi.logout();
        } catch (_) {}
        setPhase('idle');
        setQrCode(null);
        setMessages([]);
        setStatusText('Session reset. Press "Deploy" to reconnect.');
    }, []);

    // ─── Derived ─────────────────────────────────────────────────────────────
    const isConnected = phase === 'connected';
    const isBusy = phase === 'deploying' || phase === 'waiting_qr';

    return (
        <div className="flex h-screen bg-[#0d0d0d] relative overflow-hidden text-sm">
            {/* Accent line */}
            <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 via-amber-500 to-purple-500 animate-pulse z-50 opacity-40" />

            {/* Back */}
            <button
                onClick={() => navigate('/studio')}
                className="absolute top-8 left-8 z-50 flex items-center gap-2 px-5 py-2.5 bg-[#252526] hover:bg-[#2d2d2d] rounded-xl shadow-2xl border border-white/5 text-gray-400 hover:text-white transition-all font-bold group"
            >
                <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                Return to Studio
            </button>

            {/* ── LEFT: Phone mock ─────────────────────────────────────────── */}
            <div className="w-1/2 flex flex-col items-center justify-center p-12 bg-[#121212] relative border-r border-white/5">
                <div className="text-center mb-10 max-w-sm">
                    <div className="inline-block px-3 py-1 bg-amber-500/10 text-amber-500 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-4">
                        Production Link
                    </div>
                    <h1 className="text-4xl font-black text-white mb-3 tracking-tight">Final Deployment</h1>
                    <p className="text-gray-500 font-medium leading-relaxed">
                        Deploy your AI agent to WhatsApp in seconds.
                    </p>
                </div>

                {/* iPhone frame */}
                <div className="relative group">
                    <div className="absolute inset-0 bg-purple-500/5 blur-[100px] rounded-full group-hover:bg-purple-500/10 transition-all duration-1000" />
                    <div className="w-[300px] h-[600px] bg-[#1a1a1a] rounded-[55px] p-4 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.6)] relative ring-8 ring-[#252526] border border-white/5">
                        {/* Notch */}
                        <div className="absolute top-5 left-1/2 -translate-x-1/2 w-24 h-6 bg-[#1a1a1a] rounded-full z-20 border-b border-white/5" />

                        {/* Screen */}
                        <div className="w-full h-full bg-[#0d0d0d] rounded-[42px] overflow-hidden flex flex-col border border-white/5">
                            {/* Chat header */}
                            <div className="bg-[#1e1e1e] px-5 pt-9 pb-3 border-b border-white/5 flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-base border border-purple-500/20">🤖</div>
                                <div>
                                    <div className="text-[12px] font-black text-white">AutoFlow Agent</div>
                                    <div className="text-[9px] font-bold uppercase tracking-widest text-amber-500/80">
                                        {isConnected ? '● Live' : isBusy ? '⟳ Connecting...' : '○ Offline'}
                                    </div>
                                </div>
                            </div>

                            {/* Screen content */}
                            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
                                <AnimatePresence mode="wait">
                                    {/* IDLE / ERROR — show deploy button */}
                                    {(phase === 'idle' || phase === 'error') && (
                                        <motion.div
                                            key="idle"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="flex flex-col items-center gap-4"
                                        >
                                            {phase === 'error' && (
                                                <div className="text-[10px] text-red-400 bg-red-500/10 border border-red-500/20 px-3 py-2 rounded-lg mb-2 max-w-[200px] font-medium">
                                                    {errorText}
                                                </div>
                                            )}
                                            <div className="w-16 h-16 bg-[#1e1e1e] rounded-full flex items-center justify-center border border-white/10">
                                                <Smartphone size={28} className="text-gray-500" />
                                            </div>
                                            <button
                                                onClick={handleDeploy}
                                                className="mt-2 px-8 py-3 bg-purple-600 hover:bg-purple-500 active:scale-95 text-white rounded-2xl font-black text-xs shadow-xl shadow-purple-900/40 flex items-center gap-2 transition-all"
                                            >
                                                <Zap size={14} className="fill-current" />
                                                {phase === 'error' ? 'Retry Deploy' : 'Start Deploy'}
                                            </button>
                                        </motion.div>
                                    )}

                                    {/* DEPLOYING / WAITING QR — spinner */}
                                    {isBusy && (
                                        <motion.div
                                            key="busy"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="flex flex-col items-center gap-4"
                                        >
                                            <RefreshCw className="animate-spin text-purple-500" size={36} />
                                            <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em]">
                                                {phase === 'deploying' ? 'Starting bridge...' : 'Waiting for QR...'}
                                            </p>
                                            <p className="text-[9px] text-gray-600 max-w-[180px] leading-relaxed">
                                                Baileys is opening a secure WebSocket to WhatsApp servers
                                            </p>
                                        </motion.div>
                                    )}

                                    {/* QR READY */}
                                    {phase === 'qr_ready' && qrCode && (
                                        <motion.div
                                            key="qr"
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="flex flex-col items-center gap-3"
                                        >
                                            <div className="bg-white p-4 rounded-[20px] shadow-2xl">
                                                <QRCodeSVG value={qrCode} size={180} />
                                            </div>
                                            <div className="flex items-center gap-1.5 text-amber-500">
                                                <Smartphone size={11} />
                                                <span className="text-[9px] font-black uppercase tracking-widest">
                                                    Scan with WhatsApp
                                                </span>
                                            </div>
                                        </motion.div>
                                    )}

                                    {/* CONNECTED */}
                                    {isConnected && (
                                        <motion.div
                                            key="connected"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="w-full h-full flex flex-col pt-2"
                                        >
                                            <div className="flex-1 overflow-y-auto space-y-3 text-left pr-1">
                                                {messages.map((msg, idx) => (
                                                    <motion.div
                                                        key={idx}
                                                        initial={{ opacity: 0, scale: 0.95 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        className="max-w-[90%] px-3 py-2.5 rounded-xl text-[11px] bg-[#1e1e1e] text-gray-300 border-l-2 border-amber-500 leading-relaxed"
                                                    >
                                                        {msg.text}
                                                    </motion.div>
                                                ))}
                                            </div>
                                            <div className="mt-3 p-3 bg-amber-500/5 rounded-xl border border-amber-500/10 flex items-center gap-2">
                                                <CheckCircle size={14} className="text-amber-500/60" />
                                                <span className="text-[9px] font-black text-amber-500/80 uppercase tracking-widest">Bridge Synchronized</span>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Status label below phone */}
                <p className="mt-6 text-[11px] text-gray-500 font-medium tracking-wide">{statusText}</p>
            </div>

            {/* ── RIGHT: Progress timeline ─────────────────────────────────── */}
            <div className="w-1/2 bg-[#0d0d0d] p-16 overflow-y-auto flex flex-col justify-center relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 blur-[120px] rounded-full pointer-events-none" />

                <div className="max-w-md mx-auto w-full z-10">
                    <div className="mb-12">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#1e1e1e] text-gray-500 rounded-full text-[9px] font-black uppercase tracking-[0.3em] mb-4 border border-white/5">
                            Status Cluster
                        </div>
                        <h2 className="text-3xl font-black text-white tracking-tight">System Initialization</h2>
                        <p className="text-gray-600 text-sm mt-2 font-medium">
                            Follow the steps to bring your agent live.
                        </p>
                    </div>

                    <div className="space-y-10 relative border-l border-white/10 pl-10 ml-5">
                        <DeploymentStep
                            active
                            completed
                            title="Engine Ready"
                            desc="AI workflow logic and Gemini tools are loaded and ready to execute."
                        />
                        <DeploymentStep
                            active={phase !== 'idle'}
                            completed={phase === 'qr_ready' || isConnected}
                            title="WhatsApp Bridge"
                            desc="Baileys opens a WebSocket to WhatsApp servers and generates a QR code."
                            badge={isBusy ? 'Connecting...' : phase === 'qr_ready' ? 'Scan QR' : undefined}
                        />
                        <DeploymentStep
                            active={isConnected}
                            completed={isConnected}
                            title="Live Production Mode"
                            desc="Agent is autonomous. All traffic is routed through the AI engine."
                        />
                    </div>

                    {/* Action buttons */}
                    <div className="mt-14 space-y-3">
                        {(phase === 'idle' || phase === 'error') && (
                            <motion.button
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                onClick={handleDeploy}
                                className="w-full py-4 bg-purple-600 hover:bg-purple-500 text-white rounded-2xl shadow-2xl shadow-purple-900/30 font-black text-xs uppercase tracking-[0.15em] transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3"
                            >
                                <Zap size={16} className="fill-current" />
                                {phase === 'error' ? 'Retry Deployment' : 'Deploy Agent'}
                            </motion.button>
                        )}

                        {isConnected && (
                            <motion.button
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                onClick={handleLogout}
                                className="w-full py-4 bg-[#1a1a1b] hover:bg-red-500/10 text-red-500/60 hover:text-red-500 rounded-2xl border border-white/5 font-black text-[10px] uppercase tracking-[0.2em] transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                            >
                                <WifiOff size={14} /> Reset Production Session
                            </motion.button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

// ─── Step component ───────────────────────────────────────────────────────────
const DeploymentStep = ({ active, completed, title, desc, badge }: any) => (
    <div className={clsx('relative transition-all duration-700', !active && 'opacity-20 translate-x-3')}>
        <div className={clsx(
            'absolute -left-[51px] w-10 h-10 rounded-full flex items-center justify-center ring-8 ring-[#0d0d0d] transition-all duration-700 shadow-2xl',
            completed
                ? 'bg-amber-500 text-black'
                : active
                    ? 'bg-[#1e1e1e] text-amber-500 border border-amber-500/40 animate-pulse'
                    : 'bg-[#1e1e1e] text-gray-700 border border-white/5'
        )}>
            {completed ? <CheckCircle size={18} /> : <div className="w-1.5 h-1.5 rounded-full bg-current" />}
        </div>
        <div>
            <div className="flex items-center gap-2 mb-1">
                <h3 className={clsx('text-base font-black tracking-tight', active ? 'text-white' : 'text-gray-500')}>{title}</h3>
                {badge && (
                    <span className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 bg-amber-500/10 text-amber-500 rounded-full border border-amber-500/20">
                        {badge}
                    </span>
                )}
            </div>
            <p className="text-[13px] text-gray-500 leading-relaxed font-medium">{desc}</p>
        </div>
    </div>
);
