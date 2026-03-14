import { useState, useEffect } from 'react';
import { Send, Mic, MicOff, Loader2 } from 'lucide-react';
import { useVoiceInput } from '../../hooks/useVoiceInput';
import clsx from 'clsx';

export const ChatInput = ({ onSend, disabled }) => {
    const [text, setText] = useState('');
    const { isListening, transcript, startListening, stopListening, error } = useVoiceInput();

    // Track previous listening state to detect stop
    const [wasListening, setWasListening] = useState(false);

    useEffect(() => {
        if (wasListening && !isListening && transcript) {
            // Commit transcript when tracking stops
            setText(prev => (prev ? `${prev} ${transcript}` : transcript));
        }
        setWasListening(isListening);
    }, [isListening, transcript, wasListening]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (text.trim() && !disabled) {
            onSend(text);
            setText('');
        }
    };

    const toggleVoice = () => {
        if (isListening) {
            stopListening();
        } else {
            startListening();
        }
    };

    return (
        <form onSubmit={handleSubmit} className="border-t border-gray-200 bg-white p-4">
            <div className={clsx(
                "flex items-center gap-2 border rounded-full px-4 py-2 transition-all",
                isListening ? "bg-red-50 border-red-200 ring-2 ring-red-100" : "bg-gray-50 border-gray-200 focus-within:ring-2 focus-within:ring-blue-500"
            )}>
                <button
                    type="button"
                    onClick={toggleVoice}
                    className={clsx(
                        "p-2 transition-colors rounded-full",
                        isListening ? "text-red-500 hover:bg-red-100" : "text-gray-400 hover:text-blue-600 hover:bg-blue-50"
                    )}
                    title={isListening ? "Stop Listening" : "Start Voice Input"}
                >
                    {isListening ? <MicOff size={20} className="animate-pulse" /> : <Mic size={20} />}
                </button>

                <input
                    type="text"
                    value={isListening ? (text + (text && transcript ? ' ' : '') + transcript) : text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder={isListening ? "Listening..." : "Describe your workflow..."}
                    className="flex-1 bg-transparent border-none focus:ring-0 text-gray-900 placeholder-gray-400"
                    disabled={disabled || isListening} // Disable typing while listening to avoid conflicts
                />

                <button
                    type="submit"
                    disabled={!text.trim() || disabled}
                    className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
                >
                    <Send size={18} />
                </button>
            </div>
            {error && <div className="text-xs text-red-500 mt-1 ml-4">{error}</div>}
        </form>
    );
};
