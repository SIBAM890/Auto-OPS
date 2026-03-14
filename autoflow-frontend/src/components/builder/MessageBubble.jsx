import clsx from 'clsx';
import { User, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export const MessageBubble = ({ message }) => {
    const isUser = message.role === 'user';
    const isError = message.error;

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={clsx(
                "flex items-start gap-3 max-w-[85%]",
                isUser ? "ml-auto flex-row-reverse" : "mr-auto"
            )}
        >
            <div className={clsx(
                "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                isUser ? "bg-blue-100 text-blue-600" : "bg-purple-100 text-purple-600"
            )}>
                {isUser ? <User size={18} /> : <Sparkles size={18} />}
            </div>

            <div className={clsx(
                "p-3 rounded-2xl text-sm leading-relaxed",
                isUser ? "bg-blue-600 text-white rounded-tr-none" : "bg-white border border-gray-100 text-gray-800 rounded-tl-none shadow-sm",
                isError && "bg-red-50 text-red-600 border-red-200"
            )}>
                {message.content}
            </div>
        </motion.div>
    );
};
