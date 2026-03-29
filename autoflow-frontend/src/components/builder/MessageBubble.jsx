import clsx from 'clsx';
import { User, AlertCircle, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export const MessageBubble = ({ message }) => {
    const isUser = message.role === 'user';
    const isSystem = message.role === 'system';
    const isError = message.error;

    if (isSystem) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-center"
            >
                <div className="flex items-center gap-1.5 px-3 py-1 bg-[#1e1e2e] border border-white/10 rounded-full text-[11px] text-gray-400">
                    <CheckCircle size={11} className="text-green-400" />
                    {message.content}
                </div>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className={clsx(
                "flex items-end gap-2.5 w-full",
                isUser ? "flex-row-reverse" : "flex-row"
            )}
        >
            {/* Avatar */}
            <div className={clsx(
                "w-7 h-7 rounded-full flex items-center justify-center shrink-0 mb-0.5 overflow-hidden border border-white/10",
                isUser
                    ? "bg-gradient-to-br from-amber-500 to-orange-600 shadow"
                    : "bg-[#1e1e2e] shadow"
            )}>
                {isUser
                    ? <User size={13} className="text-white" />
                    : <img src="/favicon.png" className="w-4 h-4 invert opacity-90" alt="AutoFlow" />
                }
            </div>

            {/* Bubble */}
            <div className={clsx(
                "max-w-[80%] px-4 py-2.5 rounded-2xl text-[13px] leading-relaxed whitespace-pre-wrap",
                isUser
                    ? "bg-amber-500/90 text-white rounded-br-sm shadow-md"
                    : isError
                        ? "bg-red-500/10 text-red-300 border border-red-500/20 rounded-bl-sm"
                        : "bg-[#1e1e2e] text-gray-200 border border-white/5 rounded-bl-sm shadow"
            )}>
                {isError && (
                    <div className="flex items-center gap-1 text-red-400 text-[11px] font-medium mb-1">
                        <AlertCircle size={11} /> Error
                    </div>
                )}
                {message.content}
            </div>
        </motion.div>
    );
};
