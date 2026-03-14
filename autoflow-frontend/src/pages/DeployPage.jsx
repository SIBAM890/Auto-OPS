import { useState, useEffect, useCallback, useRef } from 'react';
import { Send, CheckCircle, Clock } from 'lucide-react';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { useNavigate } from 'react-router-dom';

export default function DeployPage() {
    const navigate = useNavigate();
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState("");
    const [qrCode, setQrCode] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const [isDeploying, setIsDeploying] = useState(true);
    const [statusText, setStatusText] = useState("Initializing Agent...");

    const deployAgent = async () => {
        setIsDeploying(true);
        setStatusText("Initializing Agent...");
        try {
            const response = await fetch('http://localhost:3000/api/whatsapp/deploy', { method: 'POST' });
            if (!response.ok) throw new Error('Deployment failed');
            // The polling (checkStatus) will handle the rest
        } catch (err) {
            console.error("Deployment failed", err);
            setStatusText("Deployment failed. Please try again.");
            setIsDeploying(false);
        }
    };

    useEffect(() => {
        // Start deployment immediately
        deployAgent();
    }, []);

    // Use a ref to track if component is mounted
    const isMounted = useRef(true);
    const isConnectedRef = useRef(isConnected);

    useEffect(() => {
        return () => { isMounted.current = false; };
    }, []);

    useEffect(() => {
        isConnectedRef.current = isConnected;
    }, [isConnected]);

    const checkStatus = useCallback(async () => {
        try {
            const response = await fetch('http://localhost:3000/api/whatsapp/status');
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

            const data = await response.json();

            if (!isMounted.current) return;

            if (data.success) {
                if (data.connected) {
                    setIsConnected(true);
                    setQrCode(null);
                    setIsDeploying(false);
                    setStatusText("Agent Active & Listening");

                    setMessages(prev => {
                        if (prev.length === 0) {
                            return [{
                                role: 'bot',
                                text: "🚀 Agent Deployed! I'm now live and responding to messages on this number.",
                                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                            }];
                        }
                        return prev;
                    });
                } else if (data.qr) {
                    setQrCode(data.qr);
                    setIsDeploying(false);
                    setStatusText("Scan QR Code to Connect");
                } else if (!data.connecting && !data.connected && !data.qr) {
                    setIsDeploying(false);
                    setStatusText("Agent Stopped. Click 'Reset Connection' to restart.");
                }
            }
        } catch (err) {
            if (!isMounted.current) return;
            console.warn("Status check failed", err.message);
            setStatusText("Connecting to server...");
        }
    }, []);

    useEffect(() => {
        let timeoutId;
        const poll = async () => {
            if (isConnectedRef.current) return;
            await checkStatus();
            if (!isConnectedRef.current && isMounted.current) {
                timeoutId = setTimeout(poll, 2000);
            }
        };
        poll();
        return () => clearTimeout(timeoutId);
    }, [checkStatus]);

    const handleLogout = async () => {
        if (!confirm("Are you sure? This will disconnect the current WhatsApp session.")) return;
        try {
            await fetch('http://localhost:3000/api/whatsapp/logout', { method: 'POST' });
            setIsConnected(false);
            setQrCode(null);
            setIsDeploying(true);
            setMessages([]);
            deployAgent();
        } catch (err) {
            console.error("Logout failed", err);
        }
    };

    return (
        <div className="flex h-screen bg-gray-50 relative">
            {/* Back to Builder Button */}
            <button
                onClick={() => navigate('/builder')}
                className="absolute top-6 left-6 z-50 flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-200 text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all font-medium"
            >
                ← Back to Builder
            </button>
            {/* Phone Simulator - Left Side */}
            <div className="w-1/2 p-8 flex flex-col items-center justify-center bg-gray-100 border-r border-gray-200">
                <div className="mb-6 text-center">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Deploy Your Agent</h1>
                    <p className="text-gray-500">{statusText}</p>
                    {isConnected && (
                        <button
                            onClick={handleLogout}
                            className="mt-2 text-xs text-red-500 hover:text-red-700 underline"
                        >
                            Reset Connection / Log out
                        </button>
                    )}
                </div>

                <div className="w-[320px] h-[650px] bg-black rounded-[50px] p-4 shadow-2xl relative ring-4 ring-gray-300">
                    {/* Notch */}
                    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-28 h-7 bg-black rounded-full z-20"></div>

                    {/* Phone Screen */}
                    <div className="w-full h-full bg-[#EFE7DE] rounded-[40px] overflow-hidden flex flex-col relative">

                        {/* Status Bar */}
                        <div className="bg-[#075E54] h-12 pt-3 px-6 flex justify-between items-start text-white text-[10px] z-10">
                            <span>10:41</span>
                            <div className="flex gap-1.5 opacity-90">
                                <div className="w-3 h-3 bg-white rounded-full"></div>
                                <div className="w-3 h-3 bg-white rounded-full"></div>
                            </div>
                        </div>

                        {/* WhatsApp Header */}
                        <div className="bg-[#075E54] px-4 pb-3 flex items-center gap-3 text-white shadow-sm z-10">
                            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-xs">🤖</div>
                            <div className="flex-1">
                                <div className="text-sm font-medium">AutoFlow Bot</div>
                                <div className="text-[10px] text-white/80">
                                    {isConnected ? "Online" : "Connecting..."}
                                </div>
                            </div>
                        </div>

                        {/* Main Content Area */}
                        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">

                            {/* State 1: Loading */}
                            {isDeploying && !qrCode && (
                                <div className="flex flex-col items-center gap-4">
                                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
                                    <p className="text-gray-500 text-sm">Initializing WhatsApp Agent...</p>
                                </div>
                            )}

                            {/* State 4: Failed/Stopped */}
                            {!isDeploying && !qrCode && !isConnected && (
                                <div className="flex flex-col items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-500">
                                        ⚠️
                                    </div>
                                    <p className="text-gray-500 text-sm">Agent is stopped.</p>
                                    <button
                                        onClick={deployAgent}
                                        className="bg-[#075E54] text-white px-6 py-2 rounded-full hover:bg-[#128C7E] transition-colors"
                                    >
                                        Start Deployment
                                    </button>
                                </div>
                            )}

                            {/* State 2: QR Code */}
                            {qrCode && !isConnected && (
                                <div className="bg-white p-4 rounded-xl shadow-lg">
                                    <QRCodeSVG value={qrCode} size={200} />
                                    <p className="mt-4 text-xs text-gray-500 max-w-[200px]">
                                        Open WhatsApp &gt; Settings &gt; Linked Devices &gt; Link a Device
                                    </p>
                                </div>
                            )}

                            {/* State 3: Chat Interface (Live) */}
                            {isConnected && (
                                <div className="w-full h-full flex flex-col">
                                    <div className="flex-1 overflow-y-auto space-y-3 custom-scrollbar text-left">
                                        {messages.map((msg, idx) => (
                                            <motion.div
                                                key={idx}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className={clsx(
                                                    "max-w-[85%] px-3 py-2 rounded-xl text-sm shadow-sm relative pb-5 whitespace-pre-wrap",
                                                    msg.role === 'user'
                                                        ? "ml-auto bg-[#E7FFDB] text-[#111B21] rounded-tr-none"
                                                        : "mr-auto bg-white text-[#111B21] rounded-tl-none"
                                                )}
                                            >
                                                {msg.text}
                                                <span className="text-[10px] text-gray-500 absolute bottom-1 right-2">{msg.time}</span>
                                            </motion.div>
                                        ))}
                                    </div>

                                    <div className="mt-4 p-2 bg-green-100 text-green-800 text-xs rounded-lg border border-green-200">
                                        🚀 Agent is active! Messages sent to this number will be handled automatically.
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side - Logs / Info */}
            <div className="w-1/2 bg-white p-12 overflow-y-auto">
                <div className="max-w-xl mx-auto">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-8 flex items-center gap-3">
                        <Clock className="text-blue-600" />
                        Deployment Live Log
                    </h2>

                    <div className="space-y-8 relative border-l-2 border-gray-100 pl-8 ml-3">
                        {/* Step 1 */}
                        <div className="relative">
                            <span className="absolute -left-[41px] bg-green-100 text-green-600 w-8 h-8 rounded-full flex items-center justify-center ring-4 ring-white">
                                <CheckCircle size={16} />
                            </span>
                            <h3 className="font-semibold text-gray-900">Environment Setup</h3>
                            <p className="text-gray-500 text-sm mt-1">Backend services initialized. Google Sheets connection established.</p>
                        </div>

                        {/* Step 2 */}
                        <div className="relative">
                            <span className={clsx(
                                "absolute -left-[41px] w-8 h-8 rounded-full flex items-center justify-center ring-4 ring-white transition-colors",
                                qrCode || isConnected ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-400"
                            )}>
                                <CheckCircle size={16} />
                            </span>
                            <h3 className={clsx("font-semibold", qrCode || isConnected ? "text-gray-900" : "text-gray-400")}>
                                WhatsApp Instance Created
                            </h3>
                            <p className="text-gray-500 text-sm mt-1">QR Code generated securely for session linking.</p>
                        </div>

                        {/* Step 3 */}
                        <div className="relative">
                            <span className={clsx(
                                "absolute -left-[41px] w-8 h-8 rounded-full flex items-center justify-center ring-4 ring-white transition-colors",
                                isConnected ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-400"
                            )}>
                                <CheckCircle size={16} />
                            </span>
                            <h3 className={clsx("font-semibold", isConnected ? "text-gray-900" : "text-gray-400")}>
                                Agent Live
                            </h3>
                            <p className="text-gray-500 text-sm mt-1">Session authenticated. Engine is now processing incoming messages.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
