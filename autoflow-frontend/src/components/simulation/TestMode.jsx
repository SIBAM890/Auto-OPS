import { useState, useEffect, useCallback, useRef } from 'react';
import { Send, CheckCircle, RefreshCw, Smartphone, Rocket, WifiOff, Clock } from 'lucide-react';
import { workflowApi } from '../../services/workflowApi';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';

// Phase machine: idle → deploying → waiting_qr → qr_ready → connected → error
const PHASES = { IDLE: 'idle', DEPLOYING: 'deploying', WAITING_QR: 'waiting_qr', QR_READY: 'qr_ready', CONNECTED: 'connected', ERROR: 'error' };

export const TestMode = () => {
    const [phase, setPhase] = useState(PHASES.IDLE);
    const [qrCode, setQrCode] = useState(null);
    const [statusText, setStatusText] = useState('Ready to start a test session');
    const [errorText, setErrorText] = useState(null);

    const isMounted = useRef(true);
    const pollRef = useRef(null);
    const phaseRef = useRef(PHASES.IDLE);

    useEffect(() => { phaseRef.current = phase; }, [phase]);
    useEffect(() => {
        // On mount, just check if already connected — don't auto-deploy
        checkCurrentStatus();
        return () => {
            isMounted.current = false;
            if (pollRef.current) clearTimeout(pollRef.current);
        };
    }, []);

    const checkCurrentStatus = async () => {
        try {
            const data = await workflowApi.getStatus();
            if (!isMounted.current) return;
            if (data.connected) {
                setPhase(PHASES.CONNECTED);
                setStatusText('WhatsApp Connected');
            } else if (data.qr) {
                // Was already deploying — pick up where we left off
                setQrCode(data.qr);
                setPhase(PHASES.QR_READY);
                setStatusText('Scan QR Code to connect');
                scheduleNextPoll(2000);
            }
            // Otherwise stay idle — user must press the button
        } catch (_) {}
    };

    const scheduleNextPoll = useCallback((delayMs = 2000) => {
        if (pollRef.current) clearTimeout(pollRef.current);
        pollRef.current = setTimeout(pollStatus, delayMs);
    }, []);

    const pollStatus = useCallback(async () => {
        if (!isMounted.current || phaseRef.current === PHASES.CONNECTED) return;
        try {
            const data = await workflowApi.getStatus();
            if (!isMounted.current) return;

            if (data.connected) {
                setPhase(PHASES.CONNECTED);
                setQrCode(null);
                setStatusText('WhatsApp connected! Send a message to test live.');
            } else if (data.qr) {
                setQrCode(data.qr);
                setPhase(PHASES.QR_READY);
                setStatusText('Scan with WhatsApp');
                scheduleNextPoll(2000);
            } else if (data.connecting) {
                setPhase(PHASES.WAITING_QR);
                setStatusText('Waiting for QR code...');
                scheduleNextPoll(1500);
            } else {
                scheduleNextPoll(3000);
            }
        } catch (e) {
            if (isMounted.current) scheduleNextPoll(3000);
        }
    }, [scheduleNextPoll]);

    const startSession = async () => {
        if (pollRef.current) clearTimeout(pollRef.current);
        setPhase(PHASES.DEPLOYING);
        setQrCode(null);
        setErrorText(null);
        setStatusText('Starting WhatsApp bridge...');
        try {
            await workflowApi.deploy();
            setPhase(PHASES.WAITING_QR);
            setStatusText('Waiting for QR code...');
            scheduleNextPoll(1500); // poll fast while Baileys initialises
        } catch (err) {
            const msg = err?.response?.data?.error || err?.message || 'Unknown error';
            setPhase(PHASES.ERROR);
            setErrorText(msg);
            setStatusText('Session start failed');
        }
    };

    const handleLogout = async () => {
        if (!confirm('Stop current testing session?')) return;
        if (pollRef.current) clearTimeout(pollRef.current);
        try { await workflowApi.logout(); } catch (_) {}
        setPhase(PHASES.IDLE);
        setQrCode(null);
        setStatusText('Session ended. Press the button to start again.');
    };

    const isConnected = phase === PHASES.CONNECTED;
    const isBusy = phase === PHASES.DEPLOYING || phase === PHASES.WAITING_QR;

    return (
        <div className="flex h-[520px] bg-[#121212] rounded-xl overflow-hidden shadow-2xl border border-white/5">

            {/* ── Left: QR / Controls ────────────────────────────────────── */}
            <div className="w-1/2 p-8 flex flex-col items-center justify-center bg-[#1e1e1e] border-r border-white/5">
                <AnimatePresence mode="wait">

                    {/* Idle / Error */}
                    {(phase === PHASES.IDLE || phase === PHASES.ERROR) && (
                        <motion.div
                            key="idle"
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="flex flex-col items-center text-center gap-5"
                        >
                            {errorText && (
                                <div className="text-[11px] text-red-400 bg-red-500/10 border border-red-500/20 px-4 py-2.5 rounded-xl mb-1 max-w-[220px] leading-relaxed">
                                    {errorText}
                                </div>
                            )}
                            <div className="p-6 bg-[#252526] rounded-3xl shadow-xl border border-white/10">
                                <div className="w-[140px] h-[140px] flex items-center justify-center bg-[#121212] rounded-2xl border border-dashed border-white/10">
                                    <Smartphone className="text-gray-600" size={52} />
                                </div>
                            </div>
                            <div>
                                <h4 className="text-xl font-black text-white mb-1">{statusText}</h4>
                                <p className="text-sm text-gray-500 max-w-[220px] leading-relaxed">
                                    Connect your WhatsApp to run live agent tests directly on your phone.
                                </p>
                            </div>
                            <button
                                onClick={startSession}
                                className="bg-purple-600 text-white px-10 py-4 rounded-2xl hover:bg-purple-500 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-purple-900/40 font-black flex items-center gap-3"
                            >
                                <Rocket size={18} className="fill-current" />
                                {phase === PHASES.ERROR ? 'Retry Session' : 'Initiate Test Bridge'}
                            </button>
                        </motion.div>
                    )}

                    {/* Busy — connecting / waiting for QR */}
                    {isBusy && (
                        <motion.div
                            key="busy"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex flex-col items-center text-center gap-5"
                        >
                            <div className="p-6 bg-[#252526] rounded-3xl shadow-xl border border-white/10">
                                <div className="w-[140px] h-[140px] flex items-center justify-center bg-[#121212] rounded-2xl border border-dashed border-purple-500/20">
                                    <RefreshCw className="animate-spin text-purple-500" size={48} />
                                </div>
                            </div>
                            <h4 className="text-xl font-black text-white">{statusText}</h4>
                            <p className="text-sm text-gray-500 max-w-[220px] leading-relaxed">
                                Opening WebSocket to WhatsApp servers... this takes 3–10 seconds.
                            </p>
                        </motion.div>
                    )}

                    {/* QR Ready */}
                    {phase === PHASES.QR_READY && qrCode && (
                        <motion.div
                            key="qr"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex flex-col items-center text-center gap-5"
                        >
                            <div className="p-6 bg-[#252526] rounded-3xl shadow-xl border border-white/10">
                                <div className="p-3 bg-white rounded-2xl shadow-lg">
                                    <QRCodeSVG value={qrCode} size={180} />
                                </div>
                                <p className="text-[10px] text-amber-500 uppercase tracking-widest font-black mt-4">
                                    Scan to Link Device
                                </p>
                            </div>
                            <h4 className="text-xl font-black text-white">{statusText}</h4>
                            <p className="text-sm text-gray-500 max-w-[220px] leading-relaxed">
                                Open WhatsApp → Linked Devices → Link a Device, then scan this QR code.
                            </p>
                        </motion.div>
                    )}

                    {/* Connected */}
                    {isConnected && (
                        <motion.div
                            key="connected"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="w-full flex flex-col items-center gap-5"
                        >
                            <div className="bg-green-500/10 border border-green-500/20 p-5 rounded-3xl w-full text-center">
                                <div className="flex items-center justify-center gap-2 mb-2">
                                    <div className="h-2.5 w-2.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                                    <span className="text-green-400 font-black text-xs uppercase tracking-widest">Live Link Active</span>
                                </div>
                                <p className="text-[11px] text-green-300 font-medium leading-relaxed">
                                    Your agent is listening. Send any message to your WhatsApp number to test.
                                </p>
                            </div>

                            <div className="flex-1 bg-[#252526] rounded-[30px] p-6 border border-white/5 shadow-2xl flex flex-col items-center justify-center text-center w-full">
                                <div className="w-16 h-16 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mb-4 ring-4 ring-green-500/5">
                                    <Send size={28} />
                                </div>
                                <h5 className="font-black text-white text-base mb-2">Live Testing Phase</h5>
                                <p className="text-sm text-gray-400 leading-relaxed font-medium">
                                    Real interactions on your phone are processed by the AutoFlow engine in real-time.
                                </p>
                            </div>

                            <button
                                onClick={handleLogout}
                                className="text-[10px] font-black uppercase tracking-widest text-red-400/60 hover:text-red-400 bg-red-500/5 hover:bg-red-500/10 px-6 py-3 rounded-xl transition-all border border-red-500/10 flex items-center gap-2"
                            >
                                <WifiOff size={12} /> Disconnect Session
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* ── Right: Execution Log ────────────────────────────────────── */}
            <div className="w-1/2 flex flex-col bg-[#0d0d0d]">
                <div className="p-5 border-b border-white/5 flex justify-between items-center bg-[#121212]">
                    <h3 className="font-black text-xs text-amber-500 uppercase tracking-widest flex items-center gap-2">
                        <Clock size={14} className="text-amber-500/70" />
                        Execution Engine Logs
                    </h3>
                    <span className={clsx(
                        'text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-full border',
                        isConnected
                            ? 'text-green-400 bg-green-500/10 border-green-500/20'
                            : isBusy
                                ? 'text-amber-400 bg-amber-500/10 border-amber-500/20 animate-pulse'
                                : 'text-gray-600 bg-white/5 border-white/5'
                    )}>
                        {isConnected ? '● Live' : isBusy ? '⟳ Connecting' : '○ Offline'}
                    </span>
                </div>

                <div className="flex-1 p-8 flex flex-col items-center justify-center text-center opacity-40">
                    <div className="w-14 h-14 bg-[#121212] rounded-full flex items-center justify-center mb-5 border border-white/5">
                        <Smartphone size={28} className="text-gray-500" />
                    </div>
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-widest max-w-[180px]">
                        {isConnected
                            ? 'Incoming WhatsApp activity will sync here in real-time.'
                            : 'Link your device to view live execution logs.'}
                    </p>
                </div>

                <div className="p-5 bg-[#1a1a1b] border-t border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className={clsx('h-1.5 w-1.5 rounded-full', isConnected ? 'bg-green-500' : 'bg-amber-500/40')} />
                        <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Engine Mode</span>
                    </div>
                    <span className="text-[10px] text-amber-500/80 font-black uppercase tracking-widest">v2.0 Beta</span>
                </div>
            </div>
        </div>
    );
};