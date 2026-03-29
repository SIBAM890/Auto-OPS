import { useState, useEffect, useRef } from 'react';
import { MessageBubble } from './MessageBubble';
import { TypingIndicator } from './TypingIndicator';
import { workflowApi } from '../../services/workflowApi';
import { Paperclip, FileText, X, Send, Mic, MicOff } from 'lucide-react';
import { useVoiceInput } from '../../hooks/useVoiceInput';
import clsx from 'clsx';

export const ChatInterface = ({ onWorkflowGenerated }) => {
    const [messages, setMessages] = useState([
        { role: 'ai', content: "Hello! I'm AutoFlow AI. Describe the automation you need and I'll generate a workflow for you.\n\nYou can also upload an inventory or data file for more accurate results." }
    ]);
    const [text, setText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [uploadedFile, setUploadedFile] = useState(null);
    const messagesEndRef = useRef(null);
    const fileInputRef = useRef(null);
    const inputRef = useRef(null);
    const { isListening, transcript, startListening, stopListening, error: voiceError } = useVoiceInput();
    const [wasListening, setWasListening] = useState(false);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isLoading]);

    useEffect(() => {
        if (wasListening && !isListening && transcript) {
            setText(prev => (prev ? `${prev} ${transcript}` : transcript));
        }
        setWasListening(isListening);
    }, [isListening, transcript, wasListening]);

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setIsLoading(true);
        try {
            const data = await workflowApi.uploadFile(file);
            setUploadedFile({ name: data.name || file.name, id: data.id });
            setMessages(prev => [...prev, {
                role: 'system',
                content: `Attached: ${file.name}`
            }]);
        } catch (error) {
            setMessages(prev => [...prev, { role: 'system', content: `Upload failed: ${error.message}` }]);
        } finally {
            setIsLoading(false);
            if (fileInputRef.current) fileInputRef.current.value = "";
        }
    };

    const handleSend = async () => {
        const trimmed = text.trim();
        if (!trimmed || isLoading) return;
        setText('');
        setMessages(prev => [...prev, { role: 'user', content: trimmed }]);
        setIsLoading(true);
        try {
            const data = await workflowApi.generate(trimmed);
            if (data.success && data.workflow) {
                setMessages(prev => [...prev, {
                    role: 'ai',
                    content: data.explanation
                        ? `✅ Workflow generated!\n\n${data.explanation}`
                        : "✅ Your workflow is ready! Check the canvas."
                }]);
                if (onWorkflowGenerated) onWorkflowGenerated(data.workflow);
            } else {
                setMessages(prev => [...prev, {
                    role: 'ai',
                    content: "⚠️ I couldn't parse a valid workflow. Try being more specific about your automation steps.",
                    error: true
                }]);
            }
        } catch (error) {
            const detail = error.response?.data?.detail || error.message;
            setMessages(prev => [...prev, {
                role: 'ai',
                content: `${detail}`,
                error: true
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const toggleVoice = () => isListening ? stopListening() : startListening();
    const liveText = isListening ? (text + (text && transcript ? ' ' : '') + transcript) : text;

    return (
        <div className="flex flex-col h-full bg-[#0d0d0f]">

            {/* Header */}
            <div className="px-4 py-3 border-b border-white/5 flex items-center gap-2.5 shrink-0">
                <div className="w-7 h-7 rounded-full bg-[#1e1e2e] border border-white/10 flex items-center justify-center shadow overflow-hidden">
                    <img src="/favicon.png" className="w-5 h-5 invert opacity-90" alt="AutoFlow" />
                </div>
                <div>
                    <p className="text-[12px] font-semibold text-white">AutoFlow AI</p>
                    <p className="text-[10px] text-green-400 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block animate-pulse" />
                        Ready
                    </p>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
                {messages.map((msg, i) => (
                    <MessageBubble key={i} message={msg} />
                ))}
                {isLoading && (
                    <div className="flex items-end gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-[#1e1e2e] border border-white/10 flex items-center justify-center shrink-0 overflow-hidden">
                            <img src="/favicon.png" className="w-5 h-5 invert opacity-90" alt="AutoFlow" />
                        </div>
                        <div className="bg-[#1e1e2e] border border-white/5 px-4 py-3 rounded-2xl rounded-bl-sm">
                            <TypingIndicator />
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* File badge */}
            {uploadedFile && (
                <div className="mx-4 mb-2 flex items-center justify-between px-3 py-1.5 bg-[#1e1e2e] border border-white/10 rounded-lg text-xs text-gray-300">
                    <div className="flex items-center gap-1.5">
                        <FileText size={12} className="text-amber-400" />
                        <span className="truncate">{uploadedFile.name}</span>
                    </div>
                    <button onClick={() => setUploadedFile(null)} className="text-gray-500 hover:text-red-400 ml-2">
                        <X size={13} />
                    </button>
                </div>
            )}

            {/* Input bar */}
            <div className="px-4 pb-4 shrink-0">
                <div className={clsx(
                    "flex items-end gap-2 rounded-xl border px-3 py-2 transition-all",
                    isListening
                        ? "bg-red-950/40 border-red-500/40 ring-1 ring-red-500/20"
                        : "bg-[#111114] border-white/10 focus-within:border-amber-500/40 focus-within:ring-1 focus-within:ring-amber-500/10"
                )}>
                    {/* File attach */}
                    <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" accept=".csv,.xlsx,.xls" />
                    <button
                        onClick={() => fileInputRef.current?.click()}
                        className="text-gray-500 hover:text-amber-400 transition-colors shrink-0 pb-0.5"
                        title="Attach file"
                    >
                        <Paperclip size={16} />
                    </button>

                    {/* Textarea */}
                    <textarea
                        ref={inputRef}
                        rows={1}
                        value={liveText}
                        onChange={(e) => setText(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder={isListening ? "Listening…" : "Describe your automation…"}
                        disabled={isLoading || isListening}
                        className="flex-1 bg-transparent border-none outline-none resize-none text-[13px] text-gray-200 placeholder-gray-600 py-0.5 max-h-32 leading-relaxed"
                        style={{ scrollbarWidth: 'none' }}
                    />

                    {/* Voice */}
                    <button
                        onClick={toggleVoice}
                        className={clsx(
                            "shrink-0 pb-0.5 transition-colors",
                            isListening ? "text-red-400 animate-pulse" : "text-gray-500 hover:text-amber-400"
                        )}
                        title={isListening ? "Stop recording" : "Voice input"}
                    >
                        {isListening ? <MicOff size={16} /> : <Mic size={16} />}
                    </button>

                    {/* Send */}
                    <button
                        onClick={handleSend}
                        disabled={!liveText.trim() || isLoading}
                        className="shrink-0 w-7 h-7 rounded-lg bg-amber-500 hover:bg-amber-400 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-colors shadow"
                    >
                        <Send size={13} className="text-black" />
                    </button>
                </div>
                {voiceError && <p className="text-[10px] text-red-400 mt-1 ml-1">{voiceError}</p>}
                <p className="text-[10px] text-gray-600 mt-1.5 text-center">Enter to send · Shift+Enter for new line</p>
            </div>
        </div>
    );
};
